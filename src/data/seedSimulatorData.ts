import { LocalizedText } from '../types';

export interface SymptomOption {
  id: string;
  label: LocalizedText;
}

export interface DiagnosticRuleResult {
  id: string;
  cause: LocalizedText;
  matchedSymptoms: string[];
  baseWeight: number;
  checks: {
    uz: string[];
    ru: string[];
    en: string[];
  };
}

export const SIMULATOR_SYMPTOMS: SymptomOption[] = [
  { id: 'rough_idle', label: { uz: 'Salt yurishda titrash (notekis ishlash)', ru: 'Неровный холостой ход / вибрация', en: 'Rough or unstable idle' } },
  { id: 'hard_start', label: { uz: 'Qiyin o‘t olish (starter uzoq aylanadi)', ru: 'Затруднённый запуск двигателя', en: 'Hard start / extended cranking' } },
  { id: 'high_fuel', label: { uz: 'Yonilg‘i sarfi keskin oshgan', ru: 'Повышенный расход топлива', en: 'High fuel consumption' } },
  { id: 'blue_smoke', label: { uz: 'Egzozdan ko‘k tutun chiqishi', ru: 'Сизый/синий дым из выхлопа', en: 'Blue exhaust smoke' } },
  { id: 'white_smoke', label: { uz: 'Shirin hidli quyuq oq tutun', ru: 'Густой белый дым со сладким запахом', en: 'Thick sweet-smelling white smoke' } },
  { id: 'black_smoke', label: { uz: 'Qora tutun (quvvat pasayishi)', ru: 'Чёрный дым из выхлопной трубы', en: 'Black exhaust smoke' } },
  { id: 'overheating', label: { uz: 'Dvigatel qizib ketishi (Overheating)', ru: 'Перегрев двигателя', en: 'Engine overheating' } },
  { id: 'knocking', label: { uz: 'Tezlanishda metall taqillashi (Detonatsiya)', ru: 'Детонационный стук под нагрузкой', en: 'Metallic knocking / pinging under load' } },
  { id: 'cel', label: { uz: 'Check Engine chirog‘i yonib-o‘chmoqda', ru: 'Мигает или горит Check Engine', en: 'Check Engine Light (flashing or solid)' } },
  { id: 'power_loss', label: { uz: 'Tezlanishda quvvat yetishmasligi', ru: 'Потеря мощности при разгоне', en: 'Lack of power / sluggish acceleration' } },
];

export const DIAGNOSTIC_RULES: DiagnosticRuleResult[] = [
  {
    id: 'rule_misfire',
    cause: {
      uz: "O't oldirish g'altagi (COP) yoki uchqun shami nosozligi (Misfire)",
      ru: 'Неисправность катушки зажигания (COP) или свечи',
      en: 'Faulty Ignition Coil (COP) or Worn Spark Plugs (Misfire)',
    },
    matchedSymptoms: ['rough_idle', 'cel', 'power_loss', 'high_fuel'],
    baseWeight: 25,
    checks: {
      uz: [
        "OBD-II skanerda P0300–P0304 kodlari va Mode $06 hisoblagichini o'qing.",
        "G'altakni qo'shni silindrga almashtirib xato ko'chishini tekshiring.",
        'Uchqun shamlari zazori (0.8–1.1 mm) va izolyator yoriqlarini ko‘zdan kechiring.',
      ],
      ru: [
        'Считайте коды P0300–P0304 и счётчики пропусков Mode $06.',
        'Выполните перестановку катушки на соседний цилиндр.',
        'Проверьте зазор свечей (0.8–1.1 мм) и следы пробоя на изоляторе.',
      ],
      en: [
        'Read P0300–P0304 codes and Mode $06 misfire counters.',
        'Swap the suspect ignition coil to an adjacent cylinder.',
        'Inspect spark plug gap (0.8–1.1 mm) and check boots for carbon tracking.',
      ],
    },
  },
  {
    id: 'rule_vacuum_leak',
    cause: {
      uz: 'Kiritish tizimida vakuum havo so‘rishi (Vacuum Leak)',
      ru: 'Подсос неучтённого воздуха во впускном тракте',
      en: 'Intake Manifold or Vacuum Hose Air Leak',
    },
    matchedSymptoms: ['rough_idle', 'hard_start', 'cel', 'power_loss'],
    baseWeight: 22,
    checks: {
      uz: [
        'Salt yurishda STFT + LTFT +15% dan yuqori bo‘lib, 2500 ayl/min da tushishini tekshiring.',
        'Tutun generatori (Smoke machine) bilan kiritish kollektori va PCV shlanglarini tekshiring.',
      ],
      ru: [
        'Сравните STFT+LTFT на холостом ходу и при 2500 об/мин.',
        'Проведите опрессовку впуска дымогенератором, особое внимание уделите клапану PCV.',
      ],
      en: [
        'Compare STFT+LTFT at idle vs. 2,500 RPM for lean shift normalization.',
        'Smoke-test intake boots, gaskets, and PCV hoses.',
      ],
    },
  },
  {
    id: 'rule_rich_fuel',
    cause: {
      uz: 'Injektor oqishi yoki MAF/O2 xatosi (Boy aralashma)',
      ru: 'Перелив форсунок или сбой ДМРВ / лямбда-зонда (богатая смесь)',
      en: 'Leaking Fuel Injector or Skewed MAF/O2 Sensor (Rich Condition)',
    },
    matchedSymptoms: ['black_smoke', 'high_fuel', 'rough_idle', 'hard_start'],
    baseWeight: 24,
    checks: {
      uz: [
        'Qoldiq yonilg‘i bosimi tez tushishini manometrda tekshiring.',
        'LTFT -12% dan past bo‘lsa EVAP klapani va injektorlarni tekshiring.',
        'Havo filtri va MAF datchigi tozaligini nazorat qiling.',
      ],
      ru: [
        'Проверьте удержание остаточного давления топлива в рампе.',
        'При LTFT ниже -12% проверьте герметичность форсунок и клапана EVAP.',
        'Осмотрите воздушный фильтр и очистите ДМРВ.',
      ],
      en: [
        'Test fuel rail residual pressure retention after key-off.',
        'Inspect injectors and EVAP purge valve if LTFT is below -12%.',
        'Check air filter restriction and clean MAF sensing wire.',
      ],
    },
  },
  {
    id: 'rule_head_gasket',
    cause: {
      uz: 'GBS prokladkasi kuyishi (Antifriz yonish kamerasiga o‘tishi)',
      ru: 'Пробой прокладки ГБЦ (попадание антифриза в цилиндры)',
      en: 'Blown Cylinder Head Gasket (Coolant Ingress)',
    },
    matchedSymptoms: ['white_smoke', 'overheating', 'rough_idle', 'hard_start'],
    baseWeight: 26,
    checks: {
      uz: [
        'Sovutish bachogida kimyoviy CO2 bloka-testi va pufakchalarni tekshiring.',
        'Qo‘shni silindrlar kompressiyasini o‘lchang va moy qopqog‘ida emulsiya borligini ko‘ring.',
      ],
      ru: [
        'Проведите химический тест на наличие выхлопных газов в антифризе.',
        'Замерьте компрессию в соседних цилиндрах и проверьте масло на эмульсию.',
      ],
      en: [
        'Perform a combustion-leak chemical block test on the coolant reservoir.',
        'Check adjacent cylinders for matching low compression and inspect oil for milky emulsion.',
      ],
    },
  },
  {
    id: 'rule_oil_burn',
    cause: {
      uz: 'Porshen halqalari yoki klapan salniklari yeyilishi',
      ru: 'Износ поршневых колец или маслосъёмных колпачков',
      en: 'Worn Piston Rings or Valve Stem Seals (Oil Burning)',
    },
    matchedSymptoms: ['blue_smoke', 'power_loss', 'rough_idle'],
    baseWeight: 23,
    checks: {
      uz: [
        'Quruq va moyli kompressiya testini bajaring.',
        'Uchqun shamlari uchida qora yog‘li qurum borligini tekshiring.',
        'PCV karter ventilyatsiyasi klapani tiqilmaganligini ko‘ring.',
      ],
      ru: [
        'Выполните сухой и масляный замер компрессии.',
        'Осмотрите свечи на наличие масляного нагара.',
        'Проверьте клапан вентиляции картерных газов (PCV).',
      ],
      en: [
        'Run dry and wet compression tests across all cylinders.',
        'Inspect spark plugs for wet oily fouling.',
        'Verify PCV valve operation to rule out crankcase pressure oil blow-by.',
      ],
    },
  },
  {
    id: 'rule_cooling_knock',
    cause: {
      uz: 'Sovutish tizimi / Termostat nosozligi va Detonatsiya',
      ru: 'Неисправность термостата/охлаждения и детонация',
      en: 'Cooling System Fault / Thermostat Failure & Detonation',
    },
    matchedSymptoms: ['overheating', 'knocking', 'power_loss'],
    baseWeight: 21,
    checks: {
      uz: [
        'Termostat ochilish haroratini va radiator ventilyatori ishlashini tekshiring.',
        'Sovutish tizimini 1.2 bar bosimda germetiklikka sinang.',
        'Yonilg‘i oktan sonini va detonatsiya datchigini (P0325) tekshiring.',
      ],
      ru: [
        'Проверьте температуру открытия термостата и включение вентиляторов.',
        'Выполните опрессовку системы охлаждения (1.2 бар).',
        'Проверьте датчик детонации и качество используемого топлива.',
      ],
      en: [
        'Verify thermostat opening temperature and radiator fan relay operation.',
        'Pressure-test cooling system to 1.2 bar for leaks.',
        'Check Knock Sensor signal and verify fuel octane quality.',
      ],
    },
  },
  {
    id: 'rule_fuel_pump',
    cause: {
      uz: 'Yonilg‘i nasosi bosimi past yoki filtr tiqilgan',
      ru: 'Недостаточное давление бензонасоса или забит фильтр',
      en: 'Weak Fuel Pump or Restricted Fuel Filter',
    },
    matchedSymptoms: ['hard_start', 'power_loss', 'knocking', 'cel'],
    baseWeight: 20,
    checks: {
      uz: [
        'Yonilg‘i rampasiga manometr ulab statik va yuklama ostidagi bosimni (3–4 bar) o‘lchang.',
        'Yonilg‘i filtri va nasos to‘rining tozaligini tekshiring.',
      ],
      ru: [
        'Подключите манометр к рампе и проверьте давление под нагрузкой.',
        'Проверьте фильтр тонкой очистки и сетку топливного модуля.',
      ],
      en: [
        'Measure fuel rail pressure under cranking and WOT acceleration.',
        'Inspect in-tank strainer sock and inline fuel filter.',
      ],
    },
  },
];

export interface EngineHotspot {
  id: string;
  x: number;
  y: number;
  name: LocalizedText;
  role: LocalizedText;
  faults: { uz: string[]; ru: string[]; en: string[] };
}

export const ENGINE_HOTSPOTS: EngineHotspot[] = [
  {
    id: 'hs_coil',
    x: 42,
    y: 19,
    name: { uz: "COP O't Oldirish G'altagi", ru: 'Катушка зажигания (COP)', en: 'Coil-on-Plug (COP) Unit' },
    role: {
      uz: '12V kuchlanishni 25,000–40,000V gacha oshirib, ECU buyrug‘i bilan uchqun beradi.',
      ru: 'Преобразует 12 В в 25–40 кВ для создания искры по команде ЭБУ.',
      en: 'Steps 12V up to 25–40 kV to fire the spark plug on ECU IGT trigger.',
    },
    faults: {
      uz: ['P0351–P0354 birlamchi zanjir xatosi', 'Rezinka uchlik teshilishi (misfire)', 'Qiziganda uzilib qolish'],
      ru: ['Ошибки P0351–P0354', 'Пробой резинового наконечника', 'Межвитковое замыкание при нагреве'],
      en: ['P0351–P0354 coil circuit faults', 'Carbon-tracked rubber boot', 'Thermal breakdown under load'],
    },
  },
  {
    id: 'hs_plug',
    x: 42,
    y: 34,
    name: { uz: 'Uchqun Shami (Spark Plug)', ru: 'Свеча зажигания', en: 'Spark Plug' },
    role: {
      uz: 'Siqilgan havo-yonilg‘i aralashmasini yonish kamerasida alangalatadi va issiqlikni chiqaradi.',
      ru: 'Воспламеняет топливовоздушную смесь в камере сгорания.',
      en: 'Ignites the compressed air-fuel charge and dissipates combustion heat.',
    },
    faults: {
      uz: ['Elektrod yeyilishi va zazor kengayishi', 'Moy yoki qurum bosishi', 'Izolyator yorilishi'],
      ru: ['Увеличенный зазор электрода', 'Масляный/сажистый нагар', 'Трещина керамического изолятора'],
      en: ['Eroded electrode gap', 'Oil or carbon fouling', 'Cracked ceramic insulator'],
    },
  },
  {
    id: 'hs_cam',
    x: 62,
    y: 23,
    name: { uz: 'Taqsimlash Vali va CMP Datchigi', ru: 'Распредвал и датчик ДПРВ', en: 'Camshaft & CMP Sensor' },
    role: {
      uz: 'Kiritish va chiqarish klapanlarini aniq fazada ochib-yopadi; CMP ECU ga 1-silindr fazasini bildiradi.',
      ru: 'Управляет открытием клапанов; ДПРВ сообщает ЭБУ фазу сжатия 1-го цилиндра.',
      en: 'Actuates intake/exhaust valves; CMP reports valve phase for sequential injection.',
    },
    faults: {
      uz: ['P0340 / P0341 CMP signal xatosi', 'VVT fazoregulyator tiqilishi (P0011)', 'GRM zanjiri cho‘zilishi (P0016)'],
      ru: ['Ошибки ДПРВ P0340/P0341', 'Заклинивание муфты VVT (P0011)', 'Растяжение цепи ГРМ (P0016)'],
      en: ['P0340/P0341 CMP sensor faults', 'Stuck VVT cam phaser (P0011)', 'Timing chain stretch (P0016)'],
    },
  },
  {
    id: 'hs_injector',
    x: 72,
    y: 38,
    name: { uz: 'Yonilg‘i Injektori', ru: 'Топливная форсунка', en: 'Fuel Injector' },
    role: {
      uz: 'ECU impuls davomiyligiga qarab yonilg‘ini mayda tuman shaklida kiritish kanaliga purkaydi.',
      ru: 'Дозирует и распыляет топливо по длительности импульса ЭБУ.',
      en: 'Atomizes pressurized fuel into the intake port or cylinder via ECU pulse width.',
    },
    faults: {
      uz: ['Smola bilan tiqilish (kambag‘al aralashma P0171)', 'Klapan oqishi (boy aralashma P0172)', 'G‘altak uzilishi (P0201–P0204)'],
      ru: ['Засорение распылителя (бедная смесь)', 'Течь форсунки (богатая смесь)', 'Обрыв обмотки (P0201–P0204)'],
      en: ['Clogged spray holes (lean P0171)', 'Leaking pintle (rich P0172)', 'Open solenoid coil (P0201–P0204)'],
    },
  },
  {
    id: 'hs_valve',
    x: 28,
    y: 41,
    name: { uz: 'Kiritish / Chiqarish Klapanlari', ru: 'Впускной и выпускной клапаны', en: 'Intake & Exhaust Valves' },
    role: {
      uz: 'Yonish kamerasini germetik yopib, gaz almashinuvini boshqaradi.',
      ru: 'Герметизируют камеру сгорания и регулируют газообмен.',
      en: 'Seal combustion pressure and control fresh air intake and exhaust blowdown.',
    },
    faults: {
      uz: ['Klapan kuyishi (kompressiya yo‘qolishi)', 'Klapan salnigi qotishi (ko‘k tutun)', 'Gidrokompensator shovqini'],
      ru: ['Прогар кромки клапана', 'Износ маслосъёмных колпачков', 'Стук гидрокомпенсаторов'],
      en: ['Burned exhaust valve seat', 'Hardened valve stem seals', 'Collapsed hydraulic lifter'],
    },
  },
  {
    id: 'hs_piston',
    x: 42,
    y: 58,
    name: { uz: 'Porshen va Halqalar (Silindr)', ru: 'Поршень и кольца', en: 'Piston, Rings & Cylinder Wall' },
    role: {
      uz: 'Gaz bosimini qabul qiladi; kompressiya va moy sidirish halqalari germetiklikni ta’minlaydi.',
      ru: 'Воспринимает давление газов; кольца обеспечивают компрессию и съём масла.',
      en: 'Transfers combustion force to the rod while rings seal compression and scrape oil.',
    },
    faults: {
      uz: ['Halqalar yeyilishi (moyli testda kompressiya oshadi)', 'Halqalar kokslanishi', 'Silindr devorida tirnalish'],
      ru: ['Залегание/износ колец (сизый дым)', 'Падение компрессии', 'Задиры стенки цилиндра'],
      en: ['Worn/seized rings (wet test jump)', 'Excessive oil consumption', 'Cylinder wall scoring'],
    },
  },
  {
    id: 'hs_crank',
    x: 43,
    y: 78,
    name: { uz: 'Tirsakli Val va CKP Datchigi', ru: 'Коленвал и датчик ДПКВ', en: 'Crankshaft & CKP Sensor' },
    role: {
      uz: 'Ilganlanma harakatni aylanish momentiga aylantiradi; CKP asosiy RPM va sinxronizatsiyani beradi.',
      ru: 'Преобразует ход поршня в крутящий момент; ДПКВ задаёт синхронизацию зажигания и впрыска.',
      en: 'Converts piston thrust into torque; CKP provides fundamental RPM and TDC sync.',
    },
    faults: {
      uz: ['P0335 CKP uzilishi (dvigatel o‘t olmaydi)', 'Korennoy/shatun vkladishlari taqillashi', '60-2 shkiv tishi sinishi'],
      ru: ['Отказ ДПКВ P0335 (нет запуска)', 'Стук коренных/шатунных вкладышей', 'Повреждение зубьев шкива'],
      en: ['P0335 CKP fault (crank-no-start)', 'Bearing knock from low oil pressure', 'Damaged reluctor wheel teeth'],
    },
  },
];
