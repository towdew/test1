$(function () {
  /* ---------- Region List Count ---------- */
  $('.total-num').text(regionList.length);
  $('.status-num').text(0);

  /* ---------- Region List ---------- */
  $('.group').each(function () {
    const $ul = $(this).find('.gnb-wrap').empty();
    const groupTxt = $(this).find('h3').text().trim();
    regionList
      .filter(r => r.group === groupTxt)
      .forEach(r => {
        $ul.append(`
          <li>
            <div class="region-wrap">
              <input type="checkbox" id="ck${r.code}" class="region-checkbox">
              <label for="ck${r.code}" class="label-box">
                <span class="check-icon" aria-hidden="true"></span>
              </label>
              <button class="region-name" data-code="${r.code}">
                <p class="region">${r.region}</p>
                <pre class="status"></pre>
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              </div>
              <div class="gnb-list">
                <div id="GnbList_${r.code}"></div>
              </div>
          </li>
        `);
      });
  });

  const MAX_CONCURRENCY = 10;
  const queue   = [...regionList];
  let   active  = 0;

  function runQueue() {
    while (active < MAX_CONCURRENCY && queue.length) {
      const r = queue.shift();
      active++;
      const $gnb    = $(`#GnbList_${r.code}`);
      const $status = $gnb.parent().prevAll('.region-wrap').first().find('.status');
      fetchRegionGnb(r.code, $gnb, $status)
        .finally(() => { active--; runQueue(); });
    }
  }
  runQueue();

  const successRegions = new Set();
  function updateCounter() {
    $('.status-num').text(successRegions.size);
    if (successRegions.size === regionList.length) hideDim();
  }

  /* ---------- dim show/hide---------- */
  function showDim()  { $('.dim').show();}
  function hideDim()  { $('.dim').hide(); }

  /* ---------- GNB loader ---------- */
  function fetchRegionGnb(regionCode, $gnb, $status, retry = 0) {
    return new Promise(resolve => {
      const proxy = 'https://api.allorigins.win/raw?url=';
      const url = (regionCode === 'be_fr' || regionCode === 'dz')
      ? `https://www.lg.com/${regionCode}/plan-du-site/`
      : (regionCode === 'global')
      ? `https://www.lg.com/${regionCode}/site-map/`
      : `https://www.lg.com/${regionCode}/sitemap/`;

      $status.text('⏳ing...');
      $gnb.empty();

      $.get(proxy + encodeURIComponent(url)).done(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const $anchors = $(doc).find([
          '.c-sitemap-list__depth1 a','.c-sitemap-list__depth2 a','.c-sitemap-list__depth3 a',
          '.level-1 a','.level-2 a','.level-3 a',
          '.depth-1 a','.depth-2 a','.depth-3 a',
          'ul.nav-menu a','ul.nav-menu span.nav-item',
        ].join(','));
        if (!$anchors.length) return retryOrFail();

        /* --- depth --- */
        const getDepth = $el => {
          let depth = 0, found = false;
          $el.parents().each(function () {
            const cls = this.className || '';
            if (/depth[-_]?3|level[-_]?3|c-sitemap-list__depth3/.test(cls)) { depth = 3; found = true; return false; }
            if (/depth[-_]?2|level[-_]?2|c-sitemap-list__depth2/.test(cls)) { depth = Math.max(depth, 2); found = true; }
            if (/depth[-_]?1|level[-_]?1|c-sitemap-list__depth1/.test(cls)) { depth = Math.max(depth, 1); found = true; }
          });
          if (!found) {
            let ulDepth = 0, p = $el.parent()[0];
            while (p && p !== doc.body) {
              if (p.tagName?.toLowerCase() === 'ul') ulDepth++;
              p = p.parentElement;
            }
            depth = Math.max(depth, ulDepth);
          }
          return Math.min(depth || 1, 3);
        };

        /* --- rendering --- */
        const seenTop = new Set();
        let groupDiv  = null;

        $anchors.each(function () {
          const $el  = $(this);
          const text = $el.text().trim();
          if (!text || text.toLowerCase() === '(no text)') return;
          const depth = getDepth($el);
          if (depth === 1) {
            if (seenTop.has(text)) return;
            seenTop.add(text);
            groupDiv = $('<div/>', { class: 'menu-group' }).appendTo($gnb);
            $('<p/>', { class: 'indent-1', text }).appendTo(groupDiv);
          }
          if (depth > 1 && groupDiv) {
            const href = $el.attr('href') ? new URL($el.attr('href'), url).href : null;
            const $p   = $('<p/>', { class: `indent-${depth}` }).text(text).appendTo(groupDiv);
            if (href) {
              $p.append(' ', $('<a/>', { class: 'link', href, target: '_blank' }));
            }
          }
        });

        $status.text('✅');
        successRegions.add(regionCode);
        updateCounter();
        resolve();
      }).fail(retryOrFail);
      function retryOrFail() {
        if (retry < 3) {
          return setTimeout(() => fetchRegionGnb(regionCode, $gnb, $status, retry + 1).then(resolve), 600);
        }
        $status.text('❌');
        queue.push(regionList.find(r => r.code === regionCode)); // reload
        runQueue();
        resolve();
      }
    });
  }

  /* ---------- toggle ---------- */
  $('.g-title h3').on('click', function () {
    $(this).parent().parent().siblings().find('.gnb-wrap, .g-title').removeClass('on');
    $(this).parent().toggleClass('on').next('.gnb-wrap').toggleClass('on');
  });
  $('.region-name').on('click', function () {
    // $(this).parent().siblings().removeClass('on');
    $(this).toggleClass('on').parent().next('.gnb-list').toggleClass('on');
  });
  /* ---------- Checkbox Control ---------- */
  $('.g-title input[type="checkbox"]').on('change', function () {
    const $group = $(this).closest('.group');
    const checked = $(this).is(':checked');
    $group.find('.gnb-wrap input[type="checkbox"]').prop('checked', checked).trigger('change');
  });
  $(document).on('change', '.gnb-wrap input[type="checkbox"]', function () {
    const $group = $(this).closest('.group');
    const $children = $group.find('.gnb-wrap input[type="checkbox"]');
    const $groupCheck = $group.find('.g-title input[type="checkbox"]');
  
    const allChecked = $children.length && $children.length === $children.filter(':checked').length;
    $groupCheck.prop('checked', allChecked);
  
    const anyChecked = $('.region-checkbox:checked').length > 0;
    $('.down-btn').prop('disabled', !anyChecked);
  });
  $('.top').on('click', function(){
    $('html,body').animate({scrollTop: 0}, 1000)
  });

  function updateActionButtons () {
    const checked = $('.region-checkbox:checked').length;
    $('#compareBtn').prop('disabled', checked < 2);
    $('.down-btn').prop('disabled', checked === 0);
  }
  $(document).on('change', '.region-checkbox', updateActionButtons);
  $('.g-title input[type="checkbox"]').on('change', updateActionButtons);
  

  /* ---------- dim ---------- */
  showDim();

  /* ---------- excel download ---------- */
  $('.down-btn').on('click', makeXlsxAndDownload);

  function makeXlsxAndDownload () {
    const rows = [['GROUP','REGION','DEPTH','TITLE','URL']];
    $('.region-checkbox:checked').each(function(){
      const $li = $(this).closest('li');
      const region = $li.find('.region').text().trim();
      const group = $li.closest('.group').find('h3').text().trim();

      $li.find('.menu-group').each(function(){
        $(this).find('p').each(function(){
          const depth = (this.className.match(/indent-(\d)/) || ['', 1])[1];
          const title = $(this).clone().children('a').remove().end().text().trim();
          const url = $(this).find('a').attr('href') || '';
          rows.push([group, region, depth, title, url]);
        });
      });
    });

    if (rows.length === 1) { alert('No region selected!'); return; }

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{wch:16},{wch:36},{wch:8},{wch:42},{wch:80}];
    ['A1','B1','C1','D1','E1'].forEach(c=>ws[c]&&(ws[c].s={fill:{pattern:'solid',fgColor:{rgb:'DCE6F1'}},font:{bold:true}}));
    ws['!autofilter'] = { ref:'A1:E1' };

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'GNB');
    const d  = new Date();
    const f  = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
    XLSX.writeFile(wb, `Gnb_Status_${f}.xlsx`, { cellStyles: true });
  }
  /* ---------- Compare  ---------- */
  $('#compareBtn').on('click', function () {
    const selected = $('.region-checkbox:checked').closest('li');
    if (selected.length > 5) {
      alert('Comparison is limited to a maximum of 5 countries.');
      return;
    }

    const compareData = selected.map(function () {
      const $li = $(this);
      const regionName = $li.find('.region').text().trim();
      const html = $li.find('.gnb-list').html();
      return { region: regionName, content: html };
    }).get();

    const win = window.open('GNB_status_compare.html', '_blank');
    if (!win) {
      alert('Popup blocked! Please allow popups for this site.');
      return;
    }
    const interval = setInterval(() => {
      if (!win.document || !win.document.body) return;
  
      const $body = $(win.document.body);
      const $list = $body.find('.compare-list').empty();
  
      compareData.forEach(d => {
        const $li = $('<li/>');
        $li.append($('<p/>', { class: 'region-name', text: d.region }));
        const $wrap = $('<div/>', { class: 'compare-wrap' }).html(d.content);
        $li.append($wrap);
        $list.append($li);
      });
  
      clearInterval(interval);
    }, 200);
  });
});