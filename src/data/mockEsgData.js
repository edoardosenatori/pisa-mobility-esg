/**
 * Mock Dataset Tecnico PM-ESG (Pisa Mobility & ESG Data Dashboard)
 * Comune di Pisa - Direzione Mobilità Urbana e Transizione Ecologica
 * Piano Urbano della Mobilità Sostenibile (PUMS 2020-2030)
 */

export const ESG_DIMENSIONS = {
  environmental: {
    id: 'environmental',
    code: 'E.1',
    title: 'Environmental (E)',
    subtitle: 'Impatto Ambientale & Decarbonizzazione',
    termKey: 'CO2 Evitata',
    primaryMetric: {
      value: '1.420',
      unit: 't CO₂ evitate',
      raw: 1420,
    },
    citizenSubtitle: '🌳 Equivale a oltre 700 automobili tolte dal traffico cittadino.',
    delta: {
      value: '+14.8%',
      isPositive: true,
      period: 'vs stesso periodo 2025',
    },
    semaphore: {
      status: 'green',
      color: '#10B981',
      label: 'Obiettivo PUMS Superato',
    },
    description: 'Riduzione emissioni climalteranti e polveri sottili grazie allo shift verso mobilità dolce e TPL elettrico.',
    secondaryMetrics: [
      { label: 'PM10 medio urbano', termKey: 'PM10 / NO2', value: '18.2 µg/m³', delta: '-12.4%', status: 'green', citizenNote: '✨ Aria Ottima (Ampiamente sotto la soglia di allerta UE di 50 µg/m³).' },
      { label: 'Modal Split Dolce', termKey: 'Modal Split', value: '28.6%', delta: '+3.8%', status: 'green', citizenNote: '🚶‍♂️ Circa 3 pisani su 10 si muovono a piedi, in bici o in autobus.' },
      { label: 'Carburante risparmiato', value: '542.000 L', delta: '+15.2%', status: 'green' }
    ]
  },
  social: {
    id: 'social',
    code: 'S.1',
    title: 'Social (S)',
    subtitle: 'Inclusività, PEBA & Utenze Deboli',
    termKey: 'PEBA / IAU',
    primaryMetric: {
      value: '74.2%',
      unit: 'Banchine PEBA (IAU)',
      raw: 74.2,
    },
    citizenSubtitle: '🟢 Quasi 3 fermate su 4 sono accessibili a tutti senza gradini.',
    delta: {
      value: '+6.5%',
      isPositive: true,
      period: 'vs Q3 2025',
    },
    semaphore: {
      status: 'amber',
      color: '#F59E0B',
      label: 'In linea con Target di Fase',
    },
    description: 'Adeguamento fermate TPL con percorsi tattilo-vocali LOGES, rampe a norma e accessibilità poli universitari.',
    secondaryMetrics: [
      { label: 'Incidentalità utenze deboli', value: '-22.0%', delta: '-4.1%', status: 'green' },
      { label: 'Indice Accessibilità UniPi', termKey: 'PEBA / IAU', value: '88/100', delta: '+5 pt', status: 'green' },
      { label: 'Gradimento Ciclopi Sharing', termKey: 'GBFS / GTFS', value: '4.6 / 5', delta: '+0.3', status: 'green' }
    ]
  },
  economic: {
    id: 'economic',
    code: 'Ec.1',
    title: 'Economic (Ec)',
    subtitle: 'Efficienza & Risparmio per la Collettività',
    primaryMetric: {
      value: '€ 2.15 M',
      unit: 'Risparmio Diretto Cittadini',
      raw: 2150000,
    },
    citizenSubtitle: '💶 Risparmio medio di ~142,50 €/mese per famiglia che sceglie mobilità attiva.',
    delta: {
      value: '+18.2%',
      isPositive: true,
      period: 'risparmio carburante & sosta',
    },
    semaphore: {
      status: 'green',
      color: '#10B981',
      label: 'Elevata Redditività Sociale',
    },
    description: 'Benefici economici diretti e indiretti generati per famiglie, studenti e riduzione costi sanitari comunali.',
    secondaryMetrics: [
      { label: 'Costi sanitari evitati (ASL)', value: '€ 890.000', delta: '+11.0%', status: 'green' },
      { label: 'ROI Sociale Investimenti PUMS', value: '3.4x', delta: '+0.4x', status: 'green' },
      { label: 'Ricavi reinvestiti in mobilità', value: '€ 420.000', delta: '+8.5%', status: 'green' }
    ]
  },
  governance: {
    id: 'governance',
    code: 'G.1',
    title: 'Governance (G)',
    subtitle: 'Attuazione PUMS, Trasparenza & Open Data',
    termKey: 'SLA Risoluzione (IRS)',
    primaryMetric: {
      value: '68.0%',
      unit: 'Avanzamento PUMS 2030',
      raw: 68.0,
    },
    citizenSubtitle: '📋 Risolto l\'84% delle segnalazioni di barriere o guasti dei cittadini.',
    delta: {
      value: '+3.0%',
      isPositive: true,
      period: 'sopra la traiettoria programmata (+65%)',
    },
    semaphore: {
      status: 'green',
      color: '#10B981',
      label: 'Conforme Milestone PNRR',
    },
    description: 'Monitoraggio costante dei cantieri, rilascio Open Data certificati e gestione partecipata dei feedback civici.',
    secondaryMetrics: [
      { label: 'Open Data Maturity Index', termKey: 'GBFS / GTFS', value: '96%', delta: '+4%', status: 'green' },
      { label: 'Trasparenza Fondi PNRR/UE', value: '100%', delta: '0%', status: 'green' },
      { label: 'SLA Risoluzione Segnalazioni', termKey: 'SLA Risoluzione (IRS)', value: '84.2%', delta: '+7.1%', status: 'green' }
    ]
  }
};

export const HISTORICAL_CO2_SERIES = [
  { month: 'Set 25', co2Evitata: 92, targetPUMS: 85, quotaDolce: 24.2, veicoliRimossi: 1240 },
  { month: 'Ott 25', co2Evitata: 104, targetPUMS: 90, quotaDolce: 25.1, veicoliRimossi: 1390 },
  { month: 'Nov 25', co2Evitata: 110, targetPUMS: 95, quotaDolce: 25.8, veicoliRimossi: 1480 },
  { month: 'Dic 25', co2Evitata: 98, targetPUMS: 100, quotaDolce: 23.9, veicoliRimossi: 1310 },
  { month: 'Gen 26', co2Evitata: 105, targetPUMS: 102, quotaDolce: 24.8, veicoliRimossi: 1410 },
  { month: 'Feb 26', co2Evitata: 115, targetPUMS: 105, quotaDolce: 26.2, veicoliRimossi: 1540 },
  { month: 'Mar 26', co2Evitata: 128, targetPUMS: 110, quotaDolce: 27.5, veicoliRimossi: 1720 },
  { month: 'Apr 26', co2Evitata: 135, targetPUMS: 115, quotaDolce: 28.1, veicoliRimossi: 1810 },
  { month: 'Mag 26', co2Evitata: 148, targetPUMS: 120, quotaDolce: 29.4, veicoliRimossi: 1980 },
  { month: 'Giu 26', co2Evitata: 142, targetPUMS: 125, quotaDolce: 28.9, veicoliRimossi: 1910 },
  { month: 'Lug 26', co2Evitata: 118, targetPUMS: 115, quotaDolce: 27.0, veicoliRimossi: 1590 },
  { month: 'Ago 26', co2Evitata: 125, targetPUMS: 118, quotaDolce: 28.6, veicoliRimossi: 1680 },
];

export const MUNICIPAL_TARGETS = [
  {
    id: 'ciclabili',
    title: 'Estensione Rete Ciclopolitana Urbana',
    current: 78.5,
    target: 95.0,
    unit: 'km realizzati',
    percentage: 82.6,
    status: 'green',
    deadline: 'Dicembre 2026',
    category: 'Infrastruttura'
  },
  {
    id: 'elettrificazione_tpl',
    title: 'Elettrificazione Flotta Bus TPL Urbano (Autolinee Toscane)',
    current: 62,
    target: 80,
    unit: 'bus elettrici/ibridi',
    percentage: 77.5,
    status: 'green',
    deadline: 'Giugno 2026',
    category: 'Flotta Sostenibile'
  },
  {
    id: 'peba_banchine',
    title: 'Adeguamento Banchine TPL Standard PEBA',
    current: 142,
    target: 180,
    unit: 'fermate a norma',
    percentage: 78.8,
    status: 'amber',
    deadline: 'Settembre 2026',
    category: 'Accessibilità Sociale'
  },
  {
    id: 'sharing_green',
    title: 'Flotta Sharing a Zero Emissioni (Ciclopi + E-scooter)',
    current: 550,
    target: 600,
    unit: 'mezzi operativi',
    percentage: 91.6,
    status: 'green',
    deadline: 'Marzo 2026',
    category: 'Micro-mobilità'
  },
  {
    id: 'ztl_pedonali',
    title: 'Ampliamento Isole Pedonali & Zone 30 Lungarni',
    current: 14.2,
    target: 15.0,
    unit: 'ettari protetti',
    percentage: 94.6,
    status: 'green',
    deadline: 'Novembre 2026',
    category: 'Spazio Pubblico'
  }
];

// Asse Pilota Pisa: Stazione Centrale -> Corso Italia -> Ponte di Mezzo -> Polo Fibonacci -> Piazza dei Miracoli
export const PISA_PILOT_AXIS = {
  center: [43.7167, 10.4019], // Pisa Centro
  zoom: 14,
  corridorPath: [
    [43.7085, 10.3986], // 1. Stazione FS
    [43.7120, 10.3998], // 2. Corso Italia Sud / Piazza Vittorio Emanuele
    [43.7145, 10.4010], // 3. Corso Italia Centro
    [43.7161, 10.4015], // 4. Logge dei Banchi
    [43.7166, 10.4019], // 5. Ponte di Mezzo
    [43.7175, 10.4023], // 6. Piazza Garibaldi / Borgo Stretto
    [43.7196, 10.4075], // 7. Polo Fibonacci (Università)
    [43.7198, 10.4005], // 8. Piazza dei Cavalieri
    [43.7230, 10.3966], // 9. Piazza dei Miracoli (Torre Pendente)
  ],
  bikeLanes: [
    {
      id: 'lane-1',
      name: 'Asse Nord-Sud (Stazione FS - Ponte di Mezzo)',
      lengthKm: 1.2,
      type: 'Pista ciclabile in sede riservata / ZTL ciclabile',
      passaggiMediGiorno: 4850,
      statoManutenzione: 'Ottimo',
      status: 'active',
      coordinates: [
        [43.7085, 10.3986],
        [43.7120, 10.3998],
        [43.7145, 10.4010],
        [43.7161, 10.4015],
        [43.7166, 10.4019]
      ]
    },
    {
      id: 'lane-2',
      name: 'Ciclovia dei Lungarni & Ponte di Mezzo',
      lengthKm: 2.8,
      type: 'Pista ciclabile bidirezionale su corsia protetta',
      passaggiMediGiorno: 6200,
      statoManutenzione: 'Buono',
      status: 'active',
      coordinates: [
        [43.7155, 10.3920],
        [43.7163, 10.3970],
        [43.7166, 10.4019],
        [43.7172, 10.4080],
        [43.7180, 10.4130]
      ]
    },
    {
      id: 'lane-3',
      name: 'Asse Universitario (Ponte di Mezzo - Polo Fibonacci)',
      lengthKm: 1.1,
      type: 'Itinerario ciclabile prioritario per studenti',
      passaggiMediGiorno: 5400,
      statoManutenzione: 'Ottimo',
      status: 'active',
      coordinates: [
        [43.7166, 10.4019],
        [43.7175, 10.4023],
        [43.7185, 10.4050],
        [43.7196, 10.4075]
      ]
    },
    {
      id: 'lane-4',
      name: 'Corridoio Monumentale (Ponte di Mezzo - Cavalieri - Miracoli)',
      lengthKm: 1.4,
      type: 'Percorso misto pedonale/ciclabile Zona 30',
      passaggiMediGiorno: 3950,
      statoManutenzione: 'Buono (Pavimentazione storica)',
      status: 'active',
      coordinates: [
        [43.7166, 10.4019],
        [43.7175, 10.4023],
        [43.7198, 10.4005],
        [43.7215, 10.3980],
        [43.7230, 10.3966]
      ]
    }
  ],
  sharingStations: [
    {
      id: 'st-1',
      name: 'Stazione Centrale FS (Piazza Vitt. Emanuele)',
      type: 'Ciclopi Bike Sharing + Monopattini',
      capacity: 32,
      availableBikes: 29,
      emptySlots: 3,
      alert: 'full', // Quasi pieno
      alertMessage: 'Stallo quasi saturo (91%) - Richiesto ribilanciamento flotta',
      position: [43.7090, 10.3989],
      eBikes: 12,
      traditionalBikes: 17
    },
    {
      id: 'st-2',
      name: 'Ponte di Mezzo (Lungarno Gambacorti)',
      type: 'Ciclopi Bike Sharing Hub',
      capacity: 24,
      availableBikes: 14,
      emptySlots: 10,
      alert: 'optimal',
      alertMessage: 'Disponibilità ottimale',
      position: [43.7163, 10.4015],
      eBikes: 8,
      traditionalBikes: 6
    },
    {
      id: 'st-3',
      name: 'Polo Universitario Fibonacci (Largo Pontecorvo)',
      type: 'Ciclopi Hub Universitario',
      capacity: 40,
      availableBikes: 2,
      emptySlots: 38,
      alert: 'empty', // Quasi vuoto
      alertMessage: 'Stallo quasi esaurito (5%) - Bici in arrivo con furgone elettrico',
      position: [43.7194, 10.4072],
      eBikes: 1,
      traditionalBikes: 1
    },
    {
      id: 'st-4',
      name: 'Piazza dei Miracoli (Largo Cocco Griffi)',
      type: 'Ciclopi Hub Turistico',
      capacity: 28,
      availableBikes: 16,
      emptySlots: 12,
      alert: 'optimal',
      alertMessage: 'Disponibilità ottimale',
      position: [43.7228, 10.3955],
      eBikes: 10,
      traditionalBikes: 6
    },
    {
      id: 'st-5',
      name: 'Piazza dei Cavalieri (Scuola Normale)',
      type: 'Ciclopi Smart Point',
      capacity: 16,
      availableBikes: 15,
      emptySlots: 1,
      alert: 'full',
      alertMessage: 'Stallo quasi pieno (94%)',
      position: [43.7197, 10.4002],
      eBikes: 7,
      traditionalBikes: 8
    },
    {
      id: 'st-6',
      name: 'Polo Porta Nuova / Via Bonanno',
      type: 'Ciclopi + Monopattini Hub',
      capacity: 20,
      availableBikes: 1,
      emptySlots: 19,
      alert: 'empty',
      alertMessage: 'Disponibilità critica (5%)',
      position: [43.7220, 10.3910],
      eBikes: 0,
      traditionalBikes: 1
    }
  ],
  pebaPlatforms: [
    {
      id: 'peba-1',
      name: 'Fermata Stazione FS - Capolinea LAM Rossa',
      accessible: true,
      features: ['Rampa < 4%', 'Percorso Tattile LOGES', 'Palina Vocale Smart', 'Copertura Antipioggia'],
      scorePEBA: '100/100',
      lineeTPL: ['LAM Rossa', 'LAM Verde', 'Linea 4'],
      position: [43.7082, 10.3992],
      note: 'Completamente adeguata nel piano PNRR 2025'
    },
    {
      id: 'peba-2',
      name: 'Fermata Corso Italia / Piazza Vittorio',
      accessible: true,
      features: ['Banchina rialzata a raso bus', 'Guida Tattile', 'Display QR Code'],
      scorePEBA: '95/100',
      lineeTPL: ['LAM Rossa', 'Linea 5'],
      position: [43.7118, 10.4002],
      note: 'Ottima accessibilità per carrozzine'
    },
    {
      id: 'peba-3',
      name: 'Fermata Lungarno Pacinotti (Ponte di Mezzo)',
      accessible: false,
      features: ['Manca percorso LOGES a terra', 'Gradino dislivello marciapiede 14cm'],
      scorePEBA: '45/100',
      lineeTPL: ['LAM Rossa', 'LAM Verde', 'Linea 2'],
      position: [43.7168, 10.4028],
      note: 'In programma adeguamento cantiere Autunno 2026'
    },
    {
      id: 'peba-4',
      name: 'Fermata Polo Fibonacci / Via Buonarroti',
      accessible: true,
      features: ['Accesso a raso', 'Percorsi LOGES completi verso aule', 'Pulsante chiamata vocale'],
      scorePEBA: '100/100',
      lineeTPL: ['Linea 4', 'Linea 13', 'Navetta E'],
      position: [43.7198, 10.4080],
      note: 'Interamente inclusiva per studenti con disabilità'
    },
    {
      id: 'peba-5',
      name: 'Fermata Torre 1 (Piazza dei Miracoli)',
      accessible: true,
      features: ['Rampa dolce', 'Mappa tattile monumentale', 'Annunci multilingue'],
      scorePEBA: '100/100',
      lineeTPL: ['LAM Rossa', 'Linea 21'],
      position: [43.7235, 10.3950],
      note: 'Standard europeo di eccellenza turistica'
    },
    {
      id: 'peba-6',
      name: 'Fermata Via Santa Maria / Cavalieri',
      accessible: false,
      features: ['Marciapiede stretto < 90cm', 'Pavimentazione in ciottoli sconnessa'],
      scorePEBA: '35/100',
      lineeTPL: ['Linea 4'],
      position: [43.7205, 10.3990],
      note: 'Criticità segnalata dalla Consulta Disabilità'
    }
  ],
  trafficSegments: [
    {
      id: 'traf-1',
      name: 'Lungarno Pacinotti & Lungarno Mediceo',
      type: 'Arteria Principale Nord Arno',
      congestionPercent: 78,
      status: 'congested',
      statusLabel: 'Rallentamenti / Congestione',
      color: '#EF4444', // Rosso
      avgSpeedCar: 14.5,
      avgSpeedBike: 20.0,
      delayMinutes: '+8 min',
      bikeAdvantage: 'Bici più veloce di 8 min rispetto all\'auto',
      coordinates: [
        [43.7155, 10.3920],
        [43.7163, 10.3970],
        [43.7166, 10.4019],
        [43.7172, 10.4080],
        [43.7180, 10.4130]
      ]
    },
    {
      id: 'traf-2',
      name: 'Ponte di Mezzo & Piazza Garibaldi (ZTL)',
      type: 'Varco ZTL & Ponte Storico',
      congestionPercent: 22,
      status: 'fluid',
      statusLabel: 'Fluido (Accesso Regolato ZTL)',
      color: '#10B981', // Verde
      avgSpeedCar: 12.0,
      avgSpeedBike: 16.0,
      delayMinutes: '0 min',
      bikeAdvantage: 'Priorità assoluta a bici e pedoni',
      coordinates: [
        [43.7161, 10.4015],
        [43.7166, 10.4019],
        [43.7175, 10.4023]
      ]
    },
    {
      id: 'traf-3',
      name: 'Viale Bonanno Pisano ➔ Piazza dei Miracoli',
      type: 'Asse Turistico Porta Nuova',
      congestionPercent: 65,
      status: 'moderate',
      statusLabel: 'Traffico Sostenuto (Bus Turistici)',
      color: '#F59E0B', // Giallo
      avgSpeedCar: 18.0,
      avgSpeedBike: 21.0,
      delayMinutes: '+4 min',
      bikeAdvantage: 'Bici consigliata per evitare stop & go',
      coordinates: [
        [43.7190, 10.3900],
        [43.7210, 10.3925],
        [43.7225, 10.3950],
        [43.7230, 10.3966]
      ]
    },
    {
      id: 'traf-4',
      name: 'Corso Italia ➔ Stazione FS (Piazza Vitt. Emanuele)',
      type: 'Corridoio Pedonale/Ciclabile Nord-Sud',
      congestionPercent: 30,
      status: 'fluid',
      statusLabel: 'Fluido (Area Pedonale & Bus Elettrici)',
      color: '#10B981',
      avgSpeedCar: 15.0,
      avgSpeedBike: 18.5,
      delayMinutes: '0 min',
      bikeAdvantage: 'Attraversamento fluido in 4 minuti',
      coordinates: [
        [43.7085, 10.3986],
        [43.7120, 10.3998],
        [43.7145, 10.4010],
        [43.7161, 10.4015]
      ]
    },
    {
      id: 'traf-5',
      name: 'Asse Fibonacci ➔ Viale delle Piagge',
      type: 'Corridoio Universitario & Fiume Arno',
      congestionPercent: 25,
      status: 'fluid',
      statusLabel: 'Scorrevole (Alta ciclabilità)',
      color: '#10B981',
      avgSpeedCar: 28.0,
      avgSpeedBike: 22.0,
      delayMinutes: '0 min',
      bikeAdvantage: 'Percorso verde consigliato',
      coordinates: [
        [43.7196, 10.4075],
        [43.7190, 10.4130],
        [43.7185, 10.4180],
        [43.7170, 10.4250]
      ]
    },
    {
      id: 'traf-6',
      name: 'Asse Stazione FS ➔ Ospedale Cisanello',
      type: 'Direttrice TPL LAM Rossa',
      congestionPercent: 72,
      status: 'congested',
      statusLabel: 'Congestione Oraria (Uffici & Sanità)',
      color: '#EF4444',
      avgSpeedCar: 16.0,
      avgSpeedBike: 20.0,
      delayMinutes: '+7 min',
      bikeAdvantage: 'Corsia ciclabile Cisanello +7 min risparmiati',
      coordinates: [
        [43.7085, 10.3986],
        [43.7095, 10.4120],
        [43.7080, 10.4260],
        [43.7075, 10.4400]
      ]
    }
  ]
};

// Strategic Focus Points for Pisa Map FlyTo
export const PISA_QUICK_NODES = [
  { id: 'all', name: '🌍 Vista Totale Asse', coords: [43.7167, 10.4019], zoom: 14 },
  { id: 'stazione', name: '🚉 Stazione FS', coords: [43.7085, 10.3986], zoom: 16 },
  { id: 'ponte', name: '🌉 Ponte di Mezzo', coords: [43.7166, 10.4019], zoom: 16 },
  { id: 'fibonacci', name: '🎓 Polo Fibonacci', coords: [43.7196, 10.4075], zoom: 16 },
  { id: 'miracoli', name: '🏛️ Piazza dei Miracoli', coords: [43.7230, 10.3966], zoom: 16 },
  { id: 'cisanello', name: '🏥 Polo Cisanello', coords: [43.7075, 10.4400], zoom: 15 }
];

// Dati Analitici Bivariati: Passaggi Orari Bici vs Saturazione Bus TPL
export const ANALYST_HOURLY_DATA = {
  all: [
    { hour: '06:00', biciCount: 140, busSaturation: 35, avgSpeedBus: 24.5, co2Hourly: 18 },
    { hour: '07:00', biciCount: 420, busSaturation: 78, avgSpeedBus: 19.2, co2Hourly: 54 },
    { hour: '08:00', biciCount: 980, busSaturation: 94, avgSpeedBus: 14.8, co2Hourly: 135 }, // Picco Pendolari/Studenti
    { hour: '09:00', biciCount: 750, busSaturation: 82, avgSpeedBus: 16.5, co2Hourly: 102 },
    { hour: '10:00', biciCount: 520, busSaturation: 58, avgSpeedBus: 18.9, co2Hourly: 72 },
    { hour: '11:00', biciCount: 580, busSaturation: 62, avgSpeedBus: 18.2, co2Hourly: 80 },
    { hour: '12:00', biciCount: 720, busSaturation: 75, avgSpeedBus: 16.8, co2Hourly: 98 },
    { hour: '13:00', biciCount: 890, busSaturation: 88, avgSpeedBus: 15.2, co2Hourly: 122 }, // Picco Uscita UniPi/Uffici
    { hour: '14:00', biciCount: 610, busSaturation: 68, avgSpeedBus: 17.5, co2Hourly: 84 },
    { hour: '15:00', biciCount: 540, busSaturation: 60, avgSpeedBus: 18.1, co2Hourly: 75 },
    { hour: '16:00', biciCount: 680, busSaturation: 72, avgSpeedBus: 17.0, co2Hourly: 94 },
    { hour: '17:00', biciCount: 840, busSaturation: 85, avgSpeedBus: 15.6, co2Hourly: 116 },
    { hour: '18:00', biciCount: 960, busSaturation: 92, avgSpeedBus: 14.2, co2Hourly: 132 }, // Picco Rientro
    { hour: '19:00', biciCount: 780, busSaturation: 76, avgSpeedBus: 16.9, co2Hourly: 108 },
    { hour: '20:00', biciCount: 460, busSaturation: 52, avgSpeedBus: 20.4, co2Hourly: 64 },
    { hour: '21:00', biciCount: 290, busSaturation: 38, avgSpeedBus: 22.8, co2Hourly: 40 },
    { hour: '22:00', biciCount: 190, busSaturation: 25, avgSpeedBus: 24.0, co2Hourly: 26 },
    { hour: '23:00', biciCount: 110, busSaturation: 18, avgSpeedBus: 25.0, co2Hourly: 15 },
  ],
  studenti: [
    { hour: '06:00', biciCount: 40, busSaturation: 20, avgSpeedBus: 24.5, co2Hourly: 6 },
    { hour: '07:00', biciCount: 180, busSaturation: 65, avgSpeedBus: 19.5, co2Hourly: 25 },
    { hour: '08:00', biciCount: 620, busSaturation: 96, avgSpeedBus: 14.2, co2Hourly: 86 }, // Lezioni 08:30 Polo Fibonacci & Ingegneria
    { hour: '09:00', biciCount: 410, busSaturation: 74, avgSpeedBus: 16.8, co2Hourly: 57 },
    { hour: '10:00', biciCount: 260, busSaturation: 45, avgSpeedBus: 19.0, co2Hourly: 36 },
    { hour: '11:00', biciCount: 310, busSaturation: 50, avgSpeedBus: 18.5, co2Hourly: 43 },
    { hour: '12:00', biciCount: 480, busSaturation: 70, avgSpeedBus: 16.5, co2Hourly: 67 },
    { hour: '13:00', biciCount: 650, busSaturation: 89, avgSpeedBus: 15.0, co2Hourly: 90 }, // Pranzo & cambio aule
    { hour: '14:00', biciCount: 380, busSaturation: 55, avgSpeedBus: 17.8, co2Hourly: 53 },
    { hour: '15:00', biciCount: 320, busSaturation: 48, avgSpeedBus: 18.4, co2Hourly: 45 },
    { hour: '16:00', biciCount: 430, busSaturation: 62, avgSpeedBus: 17.2, co2Hourly: 60 },
    { hour: '17:00', biciCount: 560, busSaturation: 79, avgSpeedBus: 15.8, co2Hourly: 78 },
    { hour: '18:00', biciCount: 680, busSaturation: 91, avgSpeedBus: 14.5, co2Hourly: 95 }, // Chiusura biblioteche
    { hour: '19:00', biciCount: 490, busSaturation: 66, avgSpeedBus: 17.2, co2Hourly: 68 },
    { hour: '20:00', biciCount: 310, busSaturation: 42, avgSpeedBus: 21.0, co2Hourly: 43 },
    { hour: '21:00', biciCount: 220, busSaturation: 30, avgSpeedBus: 23.0, co2Hourly: 31 },
    { hour: '22:00', biciCount: 160, busSaturation: 22, avgSpeedBus: 24.2, co2Hourly: 22 },
    { hour: '23:00', biciCount: 95, busSaturation: 15, avgSpeedBus: 25.1, co2Hourly: 13 },
  ],
  turisti: [
    { hour: '06:00', biciCount: 10, busSaturation: 10, avgSpeedBus: 25.0, co2Hourly: 2 },
    { hour: '07:00', biciCount: 30, busSaturation: 25, avgSpeedBus: 20.0, co2Hourly: 5 },
    { hour: '08:00', biciCount: 80, busSaturation: 40, avgSpeedBus: 16.0, co2Hourly: 12 },
    { hour: '09:00', biciCount: 220, busSaturation: 65, avgSpeedBus: 15.5, co2Hourly: 31 }, // Arrivo treni turistici
    { hour: '10:00', biciCount: 420, busSaturation: 85, avgSpeedBus: 15.0, co2Hourly: 59 }, // Massimo afflusso Miracoli
    { hour: '11:00', biciCount: 490, busSaturation: 88, avgSpeedBus: 14.8, co2Hourly: 69 },
    { hour: '12:00', biciCount: 450, busSaturation: 82, avgSpeedBus: 15.2, co2Hourly: 63 },
    { hour: '13:00', biciCount: 380, busSaturation: 70, avgSpeedBus: 16.0, co2Hourly: 53 },
    { hour: '14:00', biciCount: 390, busSaturation: 74, avgSpeedBus: 15.8, co2Hourly: 55 },
    { hour: '15:00', biciCount: 440, busSaturation: 80, avgSpeedBus: 15.3, co2Hourly: 62 },
    { hour: '16:00', biciCount: 480, busSaturation: 84, avgSpeedBus: 15.0, co2Hourly: 67 },
    { hour: '17:00', biciCount: 420, busSaturation: 76, avgSpeedBus: 15.6, co2Hourly: 59 },
    { hour: '18:00', biciCount: 310, busSaturation: 60, avgSpeedBus: 16.5, co2Hourly: 43 },
    { hour: '19:00', biciCount: 210, busSaturation: 45, avgSpeedBus: 18.0, co2Hourly: 29 },
    { hour: '20:00', biciCount: 150, busSaturation: 35, avgSpeedBus: 21.0, co2Hourly: 21 },
    { hour: '21:00', biciCount: 90, busSaturation: 22, avgSpeedBus: 23.5, co2Hourly: 13 },
    { hour: '22:00', biciCount: 45, busSaturation: 15, avgSpeedBus: 24.5, co2Hourly: 6 },
    { hour: '23:00', biciCount: 20, busSaturation: 10, avgSpeedBus: 25.2, co2Hourly: 3 },
  ],
  pendolari: [
    { hour: '06:00', biciCount: 90, busSaturation: 45, avgSpeedBus: 24.0, co2Hourly: 12 },
    { hour: '07:00', biciCount: 380, busSaturation: 85, avgSpeedBus: 17.5, co2Hourly: 53 },
    { hour: '08:00', biciCount: 790, busSaturation: 98, avgSpeedBus: 13.5, co2Hourly: 110 }, // Picco Lavoratori Stazione FS / Ospedale
    { hour: '09:00', biciCount: 360, busSaturation: 68, avgSpeedBus: 17.0, co2Hourly: 50 },
    { hour: '10:00', biciCount: 180, busSaturation: 42, avgSpeedBus: 19.5, co2Hourly: 25 },
    { hour: '11:00', biciCount: 190, busSaturation: 45, avgSpeedBus: 19.2, co2Hourly: 26 },
    { hour: '12:00', biciCount: 280, busSaturation: 60, avgSpeedBus: 17.8, co2Hourly: 39 },
    { hour: '13:00', biciCount: 410, busSaturation: 78, avgSpeedBus: 16.0, co2Hourly: 57 },
    { hour: '14:00', biciCount: 260, busSaturation: 52, avgSpeedBus: 18.2, co2Hourly: 36 },
    { hour: '15:00', biciCount: 190, busSaturation: 46, avgSpeedBus: 18.9, co2Hourly: 26 },
    { hour: '16:00', biciCount: 290, busSaturation: 64, avgSpeedBus: 17.5, co2Hourly: 40 },
    { hour: '17:00', biciCount: 580, busSaturation: 88, avgSpeedBus: 15.0, co2Hourly: 81 },
    { hour: '18:00', biciCount: 780, busSaturation: 97, avgSpeedBus: 13.8, co2Hourly: 109 }, // Picco Rientro Treni FS
    { hour: '19:00', biciCount: 480, busSaturation: 72, avgSpeedBus: 17.0, co2Hourly: 67 },
    { hour: '20:00', biciCount: 210, busSaturation: 45, avgSpeedBus: 20.8, co2Hourly: 29 },
    { hour: '21:00', biciCount: 110, busSaturation: 28, avgSpeedBus: 23.0, co2Hourly: 15 },
    { hour: '22:00', biciCount: 60, busSaturation: 18, avgSpeedBus: 24.5, co2Hourly: 8 },
    { hour: '23:00', biciCount: 25, busSaturation: 12, avgSpeedBus: 25.2, co2Hourly: 3 },
  ]
};

// Contatori Divulgativi per la Cittadinanza
export const CITIZEN_METRICS = {
  treesEquivalent: 118400,
  kmZeroEmissions: 4820000,
  fuelSavedLiters: 615000,
  moneySavedCitizensEuros: 2150000,
  caloriesBurnedKcal: 96400000
};

// Dataset Open Data Completo per Download & Tabella
export const OPEN_DATA_RECORDS = [
  { id: 'OD-001', data: '2026-08-23', asse: 'Ponte di Mezzo', tipo: 'Spira Conta-Bici', valore: '6.420 passaggi', targetPums: '5.500', co2EvitataKg: '898', stato: 'Valido', fonte: 'Sensori IoT Comune Pisa' },
  { id: 'OD-002', data: '2026-08-23', asse: 'Corso Italia / Stazione', tipo: 'Flusso Pedonale/Ciclo', valore: '9.850 transiti', targetPums: '8.000', co2EvitataKg: '1.380', stato: 'Valido', fonte: 'Telecamere Smart City' },
  { id: 'OD-003', data: '2026-08-23', asse: 'Polo Fibonacci', tipo: 'Stallo Ciclopi Hub', valore: '890 utilizzi/die', targetPums: '750', co2EvitataKg: '420', stato: 'Valido', fonte: 'Pisamo S.r.l.' },
  { id: 'OD-004', data: '2026-08-23', asse: 'Piazza dei Miracoli', tipo: 'Accessibilità PEBA', valore: '100% Conforme', targetPums: '100%', co2EvitataKg: 'N/A', stato: 'Certificato', fonte: 'Ufficio Disabilità Pisa' },
  { id: 'OD-005', data: '2026-08-22', asse: 'Lungarno Pacinotti', tipo: 'Spira Conta-Bici', valore: '5.180 passaggi', targetPums: '4.800', co2EvitataKg: '725', stato: 'Valido', fonte: 'Sensori IoT Comune Pisa' },
  { id: 'OD-006', data: '2026-08-22', asse: 'LAM Rossa (Stazione-Osp)', tipo: 'Saturazione Media TPL', valore: '72.4%', targetPums: '< 80%', co2EvitataKg: '2.140', stato: 'Valido', fonte: 'Autolinee Toscane' },
  { id: 'OD-007', data: '2026-08-22', asse: 'Ciclopista del Trammino', tipo: 'Flusso Cicloturistico', valore: '3.210 passaggi', targetPums: '2.500', co2EvitataKg: '1.450', stato: 'Valido', fonte: 'Fiab Pisa / Pisamo' },
  { id: 'OD-008', data: '2026-08-21', asse: 'Stazione FS', tipo: 'Interscambio Modale', valore: '3.890 cambi TPL/Bici', targetPums: '3.200', co2EvitataKg: '1.620', stato: 'Valido', fonte: 'RFI / Pisamo' },
  { id: 'OD-009', data: '2026-08-21', asse: 'Borgo Stretto / Cavalieri', tipo: 'Area Pedonale ZTL', valore: '0 infrazioni TPL', targetPums: '0', co2EvitataKg: 'N/A', stato: 'Regolare', fonte: 'Polizia Municipale' },
  { id: 'OD-010', data: '2026-08-20', asse: 'Cisanello Hub', tipo: 'Banchina PEBA', valore: 'Conforme Livello A', targetPums: '100%', co2EvitataKg: 'N/A', stato: 'Certificato', fonte: 'Commissione PEBA' },
  { id: 'OD-011', data: '2026-08-20', asse: 'Ponte della Cittadella', tipo: 'Pista Ciclabile', valore: '2.940 passaggi', targetPums: '2.400', co2EvitataKg: '410', stato: 'Valido', fonte: 'Sensori IoT Comune Pisa' },
  { id: 'OD-012', data: '2026-08-19', asse: 'Piazza Garibaldi', tipo: 'Micro-mobilità Sharing', valore: '412 noleggi', targetPums: '350', co2EvitataKg: '185', stato: 'Valido', fonte: 'Operatori Accreditati' },
];

// Registro iniziale Segnalazioni Civiche (Crowdsourcing)
export const INITIAL_CIVIC_REPORTS = [
  {
    id: 'SEG-PSA-2026-0841',
    categoria: 'Barriera Architettonica PEBA',
    luogo: 'Fermata Lungarno Pacinotti / Ponte di Mezzo',
    coordinate: '43.7168, 10.4028',
    dataOra: '2026-08-23 11:20',
    descrizione: 'Dislivello tra banchina e pedana bus troppo elevato per sedia a rotelle; manca rampa di raccordo.',
    stato: 'In Lavorazione',
    priorita: 'Alta',
    protocollo: 'PROT-MOB-2026/892'
  },
  {
    id: 'SEG-PSA-2026-0839',
    categoria: 'Stallo Sharing Critico',
    luogo: 'Polo Universitario Fibonacci',
    coordinate: '43.7194, 10.4072',
    dataOra: '2026-08-23 09:15',
    descrizione: 'Stallo Ciclopi costantemente vuoto nelle ore di inizio lezioni. Necessario aumento rastrelliere.',
    stato: 'Verificato',
    priorita: 'Media',
    protocollo: 'PROT-MOB-2026/884'
  },
  {
    id: 'SEG-PSA-2026-0835',
    categoria: 'Danno Manto Pista Ciclabile',
    luogo: 'Ciclopista Asse Nord-Sud (Corso Italia altezza civico 44)',
    coordinate: '43.7145, 10.4010',
    dataOra: '2026-08-22 16:40',
    descrizione: 'Avvallamento pericoloso con ciottoli sconnessi dopo pioggia intensa.',
    stato: 'Programmato Intervento',
    priorita: 'Alta',
    protocollo: 'PROT-MOB-2026/871'
  },
  {
    id: 'SEG-PSA-2026-0828',
    categoria: 'Ostacolo / Occupazione Indebita',
    luogo: 'Piazza dei Cavalieri angolo Via Santa Maria',
    coordinate: '43.7198, 10.4005',
    dataOra: '2026-08-21 14:10',
    descrizione: 'Furgone per scarico merci parcheggiato sulla corsia riservata ai non vedenti LOGES.',
    stato: 'Risolto',
    priorita: 'Risolta',
    protocollo: 'PROT-MOB-2026/850'
  }
];
