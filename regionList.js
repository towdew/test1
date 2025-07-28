const regionList = [
    {
      group: 'Global',
      region: 'Global',
      code: 'global'
    },{
      group: 'ASIA',
      region: 'Australia',
      code: 'au'
    },{
      group: 'ASIA',
      region: 'Bangladesh',
      code: 'bd'
    },{
      group: 'ASIA',
      region: 'China',
      code: 'cn'
    },{
      group: 'ASIA',
      region: 'Hong Kong',
      code: 'hk'
    },{
      group: 'ASIA',
      region: 'Hong Kong(EN)',
      code: 'hk_en'
    },{
      group: 'ASIA',
      region: 'India',
      code: 'in'
    },{
      group: 'ASIA',
      region: 'Indonesia',
      code: 'id'
    },{
      group: 'ASIA',
      region: 'Japan',
      code: 'jp'
    },{
      group: 'ASIA',
      region: 'Malaysia',
      code: 'my'
    },{
      group: 'ASIA',
      region: 'Nepal',
      code: 'np'
    },{
      group: 'ASIA',
      region: 'New Zealand',
      code: 'nz'
    },{
      group: 'ASIA',
      region: 'Philippines',
      code: 'ph'
    },{
      group: 'ASIA',
      region: 'Singapore',
      code: 'sg'
    },{
      group: 'ASIA',
      region: 'Sri Lanka',
      code: 'lk'
    },{
      group: 'ASIA',
      region: 'Taiwan',
      code: 'tw'
    },{
      group: 'ASIA',
      region: 'Thailand',
      code: 'th'
    },{
      group: 'ASIA',
      region: 'Vietnam',
      code: 'vn'
    },{
      group: 'ASIA',
      region: 'Kazakhstan',
      code: 'kz'
    },{
      group: 'ASIA',
      region: 'Uzbekistan',
      code: 'uz'
    },{
      group: 'ASIA',
      region: 'Uzbekistan(RU)',
      code: 'uz_ru'
    },{
      group: 'EUROPE',
      region: 'Bulgaria',
      code: 'bg'
    },{
      group: 'EUROPE',
      region: 'Croatia',
      code: 'hr'
    },{
      group: 'EUROPE',
      region: 'Czech Republic',
      code: 'cz'
    },{
      group: 'EUROPE',
      region: 'Denmark',
      code: 'dk'
    },{
      group: 'EUROPE',
      region: 'Estonia',
      code: 'ee'
    },{
      group: 'EUROPE',
      region: 'Finland',
      code: 'fi'
    },{
      group: 'EUROPE',
      region: 'France',
      code: 'fr'
    },{
      group: 'EUROPE',
      region: 'Germany',
      code: 'de'
    },{
      group: 'EUROPE',
      region: 'Greece',
      code: 'gr'
    },{
      group: 'EUROPE',
      region: 'Hungary',
      code: 'hu'
    },{
      group: 'EUROPE',
      region: 'Italy',
      code: 'it'
    },{
      group: 'EUROPE',
      region: 'Latvia',
      code: 'lv'
    },{
      group: 'EUROPE',
      region: 'Lithuania',
      code: 'lt'
    },{
      group: 'EUROPE',
      region: 'Norway',
      code: 'no'
    },{
      group: 'EUROPE',
      region: 'Poland',
      code: 'pl'
    },{
      group: 'EUROPE',
      region: 'Portugal',
      code: 'pt'
    },{
      group: 'EUROPE',
      region: 'Romania',
      code: 'ro'
    },{
      group: 'EUROPE',
      region: 'Russia',
      code: 'ru'
    },{
      group: 'EUROPE',
      region: 'Serbia',
      code: 'rs'
    },{
      group: 'EUROPE',
      region: 'Slovakia',
      code: 'sk'
    },{
      group: 'EUROPE',
      region: 'Spain',
      code: 'es'
    },{
      group: 'EUROPE',
      region: 'Sweden',
      code: 'se'
    },{
      group: 'EUROPE',
      region: 'Türkiye',
      code: 'tr'
    },{
      group: 'EUROPE',
      region: 'Ukraine',
      code: 'ua'
    },{
      group: 'EUROPE',
      region: 'BELGIUM',
      code: 'be_fr'
    },{
      group: 'EUROPE',
      region: 'SWITZERLAND',
      code: 'ch_de'
    },{
      group: 'EUROPE',
      region: 'SWITZERLAND(FR)',
      code: 'ch_fr'
    },{
      group: 'EUROPE',
      region: 'UK',
      code: 'uk'
    },{
      group: 'EUROPE',
      region: 'THE NETHERLANDS',
      code: 'nl'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'Algeria',
      code: 'dz'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'Egypt',
      code: 'eg_ar'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'Egypt(EN)',
      code: 'eg_en'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'Iran',
      code: 'ir'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'Israel',
      code: 'il'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'Morocco',
      code: 'ma'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'Saudi Arabia',
      code: 'sa'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'Saudi Arabia(EN)',
      code: 'sa_en'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'South Africa',
      code: 'za'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'Tunisia',
      code: 'tn'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'EAST AFRICA',
      code: 'eastafrica'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'GULF',
      code: 'ae'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'GULF',
      code: 'ae_ar'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'LEVANT',
      code: 'levant_ar'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'LEVANT(EN)',
      code: 'levant_en'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'WEST AFRICA',
      code: 'africa'
    },{
      group: 'MIDDLE EAST & AFRICA',
      region: 'WEST AFRICA(FR)',
      code: 'africa_fr'
    },{
      group: 'NORTH AMERICA',
      region: 'Canada',
      code: 'ca_en'
    },{
      group: 'NORTH AMERICA',
      region: 'Canada(FR)',
      code: 'ca_fr'
    },{
      group: 'NORTH AMERICA',
      region: 'Mexico',
      code: 'mx'
    },{
      group: 'NORTH AMERICA',
      region: 'U.S.A',
      code: 'us'
    },{
      group: 'CENTRAL AMERICA AND CARIBBEAN',
      region: 'Panama',
      code: 'pa'
    },{
      group: 'SOUTH AMERICA',
      region: 'Argentina',
      code: 'ar'
    },{
      group: 'SOUTH AMERICA',
      region: 'Brazil',
      code: 'br'
    },{
      group: 'SOUTH AMERICA',
      region: 'Chile',
      code: 'cl'
    },{
      group: 'SOUTH AMERICA',
      region: 'Colombia',
      code: 'co'
    },{
      group: 'SOUTH AMERICA',
      region: 'Ecuador',
      code: 'ec'
    },{
      group: 'SOUTH AMERICA',
      region: 'Venezuela',
      code: 'cac'
    },{
      group: 'SOUTH AMERICA',
      region: 'BOLIVIA, PARAGUAY, PERU,URUGUAY',
      code: 'pe'
    }
  ];

  /* {
    group: 'CENTRAL AMERICA AND CARIBBEAN',
    region: 'Central America and Caribbean',
    code: 'cac'
  },*/