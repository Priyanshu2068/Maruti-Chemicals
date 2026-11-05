const catalogUrl = 'https://www.3mindia.in/3M/en_IN/p/c/medical/';
const mediaUrl = 'https://multimedia.3m.com/mws/media/';
const categoryImage = {
  surgical: `${mediaUrl}1882552J/surgical-supplies.jpg`,
  wound: `${mediaUrl}1848905J/bandages-dressings.jpg`,
  infection: `${mediaUrl}1848919J/hand-antiseptics-surgical-scrubs.jpg`,
  sterilisation: `${mediaUrl}1882556J/sterilization-monitoring.jpg`,
  monitoring: `${mediaUrl}1848943J/patient-monitoring.jpg`
};

const confirmVariants = ['Confirm model, size, and pack quantity with 3M'];

export const INDUSTRY_CATEGORIES = [
  {
    name: 'Hospitals & Healthcare',
    icon: 'healthcare',
    productCategories: [
      'Surgical Tapes & Medical Fixation',
      'Wound Care & Dressings',
      'Advanced Wound Management',
      'Infection Prevention',
      'Skin Protection',
      'Patient Temperature Management',
      'Patient Monitoring Accessories'
    ]
  },
  {
    name: 'Diagnostic Laboratories',
    icon: 'laboratory',
    productCategories: [
      'Sterilisation & Monitoring',
      'Patient Monitoring Accessories'
    ]
  },
  {
    name: 'Pharmaceutical Manufacturing',
    icon: 'pharmaceutical',
    productCategories: [
      'Infection Prevention',
      'Skin Protection',
      'Sterilisation & Monitoring'
    ]
  },
  {
    name: 'Operation Theatres & CSSD',
    icon: 'theatre',
    productCategories: [
      'Surgical Tapes & Medical Fixation',
      'Wound Care & Dressings',
      'Advanced Wound Management',
      'Infection Prevention',
      'Skin Protection',
      'Sterilisation & Monitoring',
      'Patient Temperature Management',
      'Patient Monitoring Accessories'
    ]
  },
  {
    name: 'Clinics & Nursing Homes',
    icon: 'clinic',
    productCategories: [
      'Surgical Tapes & Medical Fixation',
      'Wound Care & Dressings',
      'Infection Prevention',
      'Skin Protection',
      'Patient Monitoring Accessories'
    ]
  },
  {
    name: 'Biotechnology & Research',
    icon: 'research',
    productCategories: [
      'Infection Prevention',
      'Sterilisation & Monitoring',
      'Patient Monitoring Accessories'
    ]
  }
];

export const MEDICAL_CATEGORIES = [
  { name: 'Surgical Tapes & Medical Fixation', icon: 'tape' },
  { name: 'Wound Care & Dressings', icon: 'wound' },
  { name: 'Advanced Wound Management', icon: 'therapy' },
  { name: 'Infection Prevention', icon: 'infection' },
  { name: 'Skin Protection', icon: 'skin' },
  { name: 'Sterilisation & Monitoring', icon: 'sterilisation' },
  { name: 'Patient Temperature Management', icon: 'temperature' },
  { name: 'Patient Monitoring Accessories', icon: 'monitoring' }
];

export const MEDICAL_PRODUCTS = [
  {
    id: 'micropore-tape',
    name: 'Micropore Surgical Tape',
    brand: '3M',
    line: 'Micropore',
    category: 'Surgical Tapes & Medical Fixation',
    model: '1530 / 1535 / 2770 series',
    packaging: 'Select a model and size',
    packOptions: [
      '1535-1 — 2.5 cm × 9.14 m · 12 rolls/box',
      '1535-2 — 5 cm × 9.14 m · 6 rolls/box',
      '1535-3 — 7.6 cm × 9.14 m · 4 rolls/box',
      '2770-1 — 2.5 cm × 5 m · 12 rolls/carton',
      '2770S-1 — 2.5 cm × 1.3 m · 100 rolls/bag',
      '2770S-2 — 5 cm × 1.3 m · 50 rolls/bag'
    ],
    image: `${mediaUrl}2155944J/3m-micropore-surgical-tape-b-image-1.jpg`,
    gallery: [
      `${mediaUrl}2155944J/3m-micropore-surgical-tape-b-image-1.jpg`,
      `${mediaUrl}2155946J/3m-micropore-surgical-tape-b-image-2.jpg`
    ],
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/d/b10057822/',
    description: 'Breathable paper medical tape for lightweight dressings and secondary securement of IV lines. The 3M listing describes it as conformable and latex-free.',
    applications: ['Lightweight dressings', 'Medical device securement'],
    specifications: {
      'Material': 'Paper',
      'Product type': 'Medical tape',
      'Product family': 'Micropore 1530 / 1535 / 2770 series'
    }
  },
  {
    id: 'durapore-tape',
    name: 'Durapore Surgical Tape',
    brand: '3M',
    line: 'Durapore',
    category: 'Surgical Tapes & Medical Fixation',
    model: 'Durapore surgical tape',
    packaging: 'Confirm model and size',
    packOptions: confirmVariants,
    image: `${mediaUrl}1013736J/durapore-family-photo.jpg`,
    gallery: [
      `${mediaUrl}1013736J/durapore-family-photo.jpg`,
      `${mediaUrl}1963214J/3m-durapore-surgical-tape-1538-2-2-inch-x-10-yard-5cm-x-9-1m.jpg`,
      `${mediaUrl}1963217J/3m-durapore-surgical-tape-1538-2-2-inch-x-10-yard-5cm-x-9-1m.jpg`,
      `${mediaUrl}1963218J/3m-durapore-surgical-tape-1538-2-2-inch-x-10-yard-5cm-x-9-1m.jpg`
    ],
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/d/b00042420/',
    description: 'Silk-like cloth surgical tape. Confirm exact width, roll length, and pack size for the required product code.',
    applications: ['Medical tape', 'Securement'],
    specifications: { 'Brand': 'Durapore', 'Product type': 'Surgical tape' }
  },
  {
    id: 'medipore-h-tape',
    name: 'Medipore H Surgical Tape',
    brand: '3M',
    line: 'Medipore H',
    category: 'Surgical Tapes & Medical Fixation',
    model: '286XX',
    packaging: 'Select a width',
    packOptions: [
      '2861 — 2.54 cm width · confirm roll length and pack',
      '2862 — 5.08 cm width · confirm roll length and pack',
      '2863 — 7.62 cm width · confirm roll length and pack',
      '2864 — 10.16 cm width · confirm roll length and pack'
    ],
    image: `${mediaUrl}2140596J/3m-medipore-h-soft-cloth-surgical-tape-b-image-1.jpg`,
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/d/b00042428/',
    description: 'Conformable, breathable soft cloth medical tape with multi-directional stretch. 3M lists four widths in the 286XX family.',
    applications: ['Catheter securement', 'Medical device fixation'],
    specifications: {
      'Material': 'Soft cloth',
      'Product type': 'Medical tape',
      'Available widths': '2.54 cm, 5.08 cm, 7.62 cm, 10.16 cm'
    }
  },
  {
    id: 'kind-removal-silicone-tape',
    name: 'Kind Removal Silicone Tape',
    brand: '3M',
    line: 'Kind Removal',
    category: 'Surgical Tapes & Medical Fixation',
    model: 'Confirm product code',
    packaging: 'Confirm size',
    packOptions: confirmVariants,
    image: categoryImage.surgical,
    imageIsRepresentative: true,
    sourceUrl: catalogUrl,
    description: 'Silicone medical tape product family. Confirm the current India listing, size, and pack format with 3M.',
    applications: ['Medical fixation', 'Gentle removal'],
    specifications: { 'Product type': 'Silicone medical tape', 'Variant details': 'Confirm with 3M' }
  },
  {
    id: 'tegaderm-transparent-film',
    name: 'Tegaderm Transparent Film Dressings',
    brand: '3M',
    line: 'Tegaderm',
    category: 'Wound Care & Dressings',
    model: 'HP+Pad examples',
    packaging: 'Select a listed dressing size',
    packOptions: [
      '8590 — 9 cm × 20 cm',
      '8593 — 9 cm × 35 cm',
      '8584 — 6 cm × 10 cm',
      '8586 — 9 cm × 10 cm',
      '8589 — 9 cm × 15 cm'
    ],
    image: `${mediaUrl}1156869J/3m-tm-tegaderm-hp-plus-pad-8590-in-dressing-pouch-tif.jpg`,
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/d/v000511856/',
    description: 'Transparent film dressing options shown here include Tegaderm HP+Pad variants listed by 3M India. Confirm the appropriate dressing type and pack quantity.',
    applications: ['Transparent film dressing', 'Wound care'],
    specifications: { 'Product family': 'Tegaderm HP+Pad', 'Available sizes': 'See listed options' }
  },
  {
    id: 'vac-granufoam',
    name: 'V.A.C. Granufoam Dressings',
    brand: '3M',
    line: 'V.A.C.',
    category: 'Wound Care & Dressings',
    model: 'Confirm dressing kit',
    packaging: 'Confirm kit and size',
    packOptions: confirmVariants,
    image: categoryImage.wound,
    imageIsRepresentative: true,
    sourceUrl: catalogUrl,
    description: 'V.A.C. therapy dressing family. Confirm current product code, kit contents, size, and compatibility with the therapy unit.',
    applications: ['Negative pressure wound therapy'],
    specifications: { 'Product family': 'V.A.C. Granufoam', 'System compatibility': 'Confirm before ordering' }
  },
  {
    id: 'vac-veraflo-dressings',
    name: 'V.A.C. Veraflo Dressings',
    brand: '3M',
    line: 'V.A.C. Veraflo',
    category: 'Wound Care & Dressings',
    model: 'Confirm dressing kit',
    packaging: 'Confirm kit and size',
    packOptions: confirmVariants,
    image: categoryImage.wound,
    imageIsRepresentative: true,
    sourceUrl: catalogUrl,
    description: 'V.A.C. Veraflo dressing family. Confirm current kit size, components, and compatibility with the prescribed system.',
    applications: ['Instillation therapy dressing'],
    specifications: { 'Product family': 'V.A.C. Veraflo', 'System compatibility': 'Confirm before ordering' }
  },
  {
    id: 'vac-canisters',
    name: 'V.A.C. Canisters',
    brand: '3M',
    line: 'V.A.C.',
    category: 'Wound Care & Dressings',
    model: 'Confirm capacity and model',
    packaging: 'Confirm canister capacity',
    packOptions: ['Confirm canister capacity and therapy unit compatibility'],
    image: categoryImage.wound,
    imageIsRepresentative: true,
    sourceUrl: catalogUrl,
    description: 'Replacement canisters for compatible V.A.C. therapy systems. Confirm capacity and system compatibility.',
    applications: ['Negative pressure wound therapy'],
    specifications: { 'Variant details': 'Confirm capacity and compatibility with 3M' }
  },
  {
    id: 'vac-therapy-systems',
    name: 'V.A.C. Therapy Systems',
    brand: '3M',
    line: 'V.A.C.',
    category: 'Advanced Wound Management',
    model: 'Confirm system configuration',
    packaging: 'Confirm system configuration',
    packOptions: ['Confirm therapy unit model and configuration'],
    image: categoryImage.wound,
    imageIsRepresentative: true,
    sourceUrl: catalogUrl,
    description: 'Negative pressure wound therapy systems. Confirm current model, accessories, and regional availability with 3M.',
    applications: ['Negative pressure wound therapy'],
    specifications: { 'System model': 'Confirm with 3M', 'Accessories': 'System-dependent' }
  },
  {
    id: 'negative-pressure-accessories',
    name: 'Negative Pressure Wound Therapy Dressings and Accessories',
    brand: '3M',
    line: 'V.A.C.',
    category: 'Advanced Wound Management',
    model: 'Multiple accessories',
    packaging: 'Select compatible item',
    packOptions: ['Confirm dressing or accessory type, size, and system compatibility'],
    image: categoryImage.wound,
    imageIsRepresentative: true,
    sourceUrl: catalogUrl,
    description: 'Dressing and accessory family for negative pressure wound therapy. Confirm the required item and system compatibility.',
    applications: ['Negative pressure wound therapy'],
    specifications: { 'Product type': 'Dressings and accessories', 'System compatibility': 'Confirm before ordering' }
  },
  {
    id: 'avagard-hand-antiseptic',
    name: 'Avagard Surgical Hand Antiseptic',
    brand: '3M',
    line: 'Avagard',
    category: 'Infection Prevention',
    model: 'CHG Handrub',
    packaging: 'Select a listed bottle size',
    packOptions: [
      '100 mL bottle',
      '100 mL bottle with pump',
      '500 mL bottle · 24 bottles/case'
    ],
    image: `${mediaUrl}935718J`,
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/d/b00041984/',
    description: '3M India lists Avagard surgical and healthcare personnel hand antiseptic products in multiple bottle formats.',
    applications: ['Surgical hand antisepsis', 'Healthcare personnel hand antisepsis'],
    specifications: {
      'Active ingredients (listed product)': 'Chlorhexidine gluconate 1% and ethyl alcohol 61% w/w',
      'Product type': 'Hand antiseptic'
    }
  },
  {
    id: 'curos-disinfecting-caps',
    name: 'Curos Disinfecting Caps',
    brand: '3M',
    line: 'Curos',
    category: 'Infection Prevention',
    model: 'Confirm connector and cap type',
    packaging: 'Confirm pack size',
    packOptions: ['Confirm connector type and pack size with 3M'],
    image: categoryImage.infection,
    imageIsRepresentative: true,
    sourceUrl: catalogUrl,
    description: 'Disinfecting cap product family. Confirm connector compatibility, cap type, and pack quantity.',
    applications: ['Needleless connector disinfection'],
    specifications: { 'Variant details': 'Confirm connector compatibility with 3M' }
  },
  {
    id: 'cavilon-barrier-film',
    name: 'Cavilon No Sting Barrier Film',
    brand: '3M',
    line: 'Cavilon',
    category: 'Skin Protection',
    model: '3343 / 3344 / 3345 / 3346 family',
    packaging: 'Confirm applicator or wipe size',
    packOptions: ['Confirm applicator or wipe format and pack quantity with 3M'],
    image: `${mediaUrl}801975J/cavilon-no-sting-barrier-film-family-3343-3344-3345-3346.jpg`,
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/d/b00042019/',
    description: 'No-sting barrier film for skin protection. Confirm format, size, and pack quantity for the selected product code.',
    applications: ['Skin protection', 'Moisture barrier'],
    specifications: { 'Product family': 'Cavilon No Sting Barrier Film', 'Variant formats': 'Confirm with 3M' }
  },
  {
    id: 'attest-biological-indicators',
    name: 'Attest Biological Indicators',
    brand: '3M',
    line: 'Attest',
    category: 'Sterilisation & Monitoring',
    model: 'Steam / ethylene oxide indicators',
    packaging: 'Select a listed indicator type',
    packOptions: [
      '1264-S — Ethylene oxide biological indicator',
      '1262-S — Steam biological indicator',
      '1292E — Rapid steam biological indicator · 50/box'
    ],
    image: `${mediaUrl}881160J/3m-attest-rapid-readout-biological-indicator-1292.jpg`,
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/d/v000095051/',
    description: 'Biological indicators for monitoring sterilisation processes. Select the indicator type and verify process compatibility.',
    applications: ['Sterilisation monitoring'],
    specifications: { 'Product types': 'Steam and ethylene oxide indicators', 'Compatibility': 'Confirm process and reader requirements' }
  },
  {
    id: 'comply-chemical-indicators',
    name: 'Comply Chemical Indicators',
    brand: '3M',
    line: 'Comply',
    category: 'Sterilisation & Monitoring',
    model: '1250 / 1251 / 1248',
    packaging: 'Select the indicator type',
    packOptions: [
      '1251 — Ethylene oxide chemical indicator strip',
      '1248 — Hydrogen peroxide chemical indicator',
      '1250 — Steam Type 4 chemical indicator strip'
    ],
    image: `${mediaUrl}11156J/comply-eo-steam-chemical-indicator-strips-1251.jpg`,
    gallery: [
      `${mediaUrl}11156J/comply-eo-steam-chemical-indicator-strips-1251.jpg`,
      `${mediaUrl}1216493J/comply-hydrogen-peroxide-chemical-indicator-1248.jpg`,
      `${mediaUrl}11155J/comply-steam-chemical-indicator-strip-1250.jpg`
    ],
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/d/b00042802/',
    description: 'Chemical indicator products for different sterilisation processes. Confirm indicator type and pack quantity.',
    applications: ['Ethylene oxide monitoring', 'Steam monitoring', 'Hydrogen peroxide monitoring'],
    specifications: { 'Product family': 'Comply', 'Indicator types': 'Ethylene oxide, steam, and hydrogen peroxide' }
  },
  {
    id: 'sterilisation-monitoring-products',
    name: 'Sterilisation Monitoring Products',
    brand: '3M',
    line: 'Attest / Comply',
    category: 'Sterilisation & Monitoring',
    model: 'Monitoring products',
    packaging: 'Confirm process and product type',
    packOptions: ['Confirm sterilisation process, product code, and pack quantity'],
    image: `${mediaUrl}458672J/biological-indicator-1262-s-tif.jpg`,
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/c/medical/sterilization-monitoring/',
    description: 'Sterilisation monitoring products include biological and chemical indicators. Select the process-specific product code.',
    applications: ['Sterilisation process monitoring'],
    specifications: { 'Product families': 'Attest and Comply', 'Process compatibility': 'Confirm before ordering' }
  },
  {
    id: 'bair-hugger-warming-units',
    name: 'Bair Hugger Warming Units',
    brand: '3M',
    line: 'Bair Hugger',
    category: 'Patient Temperature Management',
    model: 'Model 77500',
    packaging: 'Confirm unit model and configuration',
    packOptions: ['Model 77500 — confirm current configuration and availability'],
    image: `${mediaUrl}804008J/3m-bair-hugger-temperature-management-unit-model-775.jpg`,
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/d/b00042359/',
    description: 'Forced-air warming unit for patient temperature management. Confirm compatible warming blankets and current model configuration.',
    applications: ['Patient temperature management'],
    specifications: { 'Listed model': '77500', 'Accessories': 'Compatible warming blankets' }
  },
  {
    id: 'bair-hugger-warming-blankets',
    name: 'Bair Hugger Warming Blankets',
    brand: '3M',
    line: 'Bair Hugger',
    category: 'Patient Temperature Management',
    model: 'Multiple patient-position options',
    packaging: 'Select a blanket type',
    packOptions: [
      '52500 — Lower Body · 10/case',
      '54500 — Adult Underbody · 10/case',
      '55000 — Large Pediatric Underbody · 10/case',
      '55501 — Pediatric Underbody · 10/case',
      '58501 — Lithotomy Underbody · 10/case',
      '63500 — Full Access Underbody · 5/case'
    ],
    image: `${mediaUrl}804018J/3m-bair-hugger-adult-underbody-blanket-model-545.jpg`,
    gallery: [
      `${mediaUrl}803980J/3m-bair-hugger-lower-body-blanket-model-525.jpg`,
      `${mediaUrl}804018J/3m-bair-hugger-adult-underbody-blanket-model-545.jpg`,
      `${mediaUrl}804037J/3m-bair-hugger-large-pediatric-underbody-blanket-model-550.jpg`,
      `${mediaUrl}804040J/3m-bair-hugger-pediatric-underbody-blanket-model-555.jpg`,
      `${mediaUrl}803979J/3m-bair-hugger-lithotomy-underbody-blanket-model-585.jpg`,
      `${mediaUrl}803977J/3m-bair-hugger-full-access-underbody-blanket-model-635-637.jpg`
    ],
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/d/v000253000/',
    description: 'Warming blankets in different patient-position configurations. Confirm unit compatibility and case quantity for the selected model.',
    applications: ['Patient warming'],
    specifications: { 'Product type': 'Forced-air warming blankets', 'Options': 'Patient-position and model dependent' }
  },
  {
    id: 'bair-hugger-patient-sensors',
    name: 'Patient Temperature Monitoring Sensors',
    brand: '3M',
    line: 'Bair Hugger / SpotOn',
    category: 'Patient Temperature Management',
    model: '36000',
    packaging: 'Confirm compatible sensor and pack',
    packOptions: ['36000 — confirm compatible monitor and pack quantity'],
    image: `${mediaUrl}879797J/3m-spoton-temperature-monitoring-system.jpg`,
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/d/b00042343/',
    description: 'Patient temperature monitoring sensor product listing. Confirm compatible monitor, sensor type, and pack quantity.',
    applications: ['Patient temperature monitoring'],
    specifications: { 'Listed model': '36000', 'Compatibility': 'Confirm monitor compatibility' }
  },
  {
    id: 'ecg-electrodes',
    name: 'ECG Electrodes',
    brand: '3M',
    line: '3M Patient Monitoring',
    category: 'Patient Monitoring Accessories',
    model: 'Confirm electrode type',
    packaging: 'Confirm size and pack',
    packOptions: ['Confirm electrode model, size, and pack quantity with 3M'],
    image: categoryImage.monitoring,
    imageIsRepresentative: true,
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/c/medical/patient-monitoring/',
    description: 'ECG electrode product range. Confirm the required electrode type, size, connector, and pack quantity.',
    applications: ['ECG monitoring'],
    specifications: { 'Product type': 'ECG electrodes', 'Variant details': 'Confirm with 3M' }
  },
  {
    id: 'monitoring-electrodes',
    name: 'Monitoring Electrodes',
    brand: '3M',
    line: '3M Patient Monitoring',
    category: 'Patient Monitoring Accessories',
    model: 'Confirm electrode type',
    packaging: 'Confirm size and pack',
    packOptions: ['Confirm electrode type, size, and pack quantity with 3M'],
    image: categoryImage.monitoring,
    imageIsRepresentative: true,
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/c/medical/patient-monitoring/',
    description: 'Medical monitoring electrodes. Confirm patient group, electrode design, connector, and pack quantity.',
    applications: ['Patient monitoring'],
    specifications: { 'Product type': 'Monitoring electrodes', 'Variant details': 'Confirm with 3M' }
  },
  {
    id: 'medical-monitoring-accessories',
    name: 'Medical Monitoring Accessories',
    brand: '3M',
    line: '3M Patient Monitoring',
    category: 'Patient Monitoring Accessories',
    model: 'Confirm accessory type',
    packaging: 'Confirm compatible accessory',
    packOptions: ['Confirm accessory type, monitor compatibility, and pack quantity'],
    image: categoryImage.monitoring,
    imageIsRepresentative: true,
    sourceUrl: 'https://www.3mindia.in/3M/en_IN/p/c/medical/patient-monitoring/',
    description: 'Patient monitoring accessory range. Confirm monitor compatibility and the required product code.',
    applications: ['Patient monitoring'],
    specifications: { 'Product type': 'Medical monitoring accessories', 'Compatibility': 'Confirm before ordering' }
  }
];
