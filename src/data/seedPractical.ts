import { Assignment, DtcCode } from '../types';

export const SEED_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assign_1',
    order: 1,
    title: {
      uz: "1-amaliy ish: OBD-II skaner yordamida STFT/LTFT tahlili",
      ru: 'Практическая работа 1: Анализ STFT/LTFT сканером OBD-II',
      en: 'Lab 1: OBD-II Live Data & Fuel Trim Analysis',
    },
    description: {
      uz: "Qizigan dvigatelda salt yurish va 2500 ayl/min rejimlarida STFT, LTFT, MAF va O2 datchik qiymatlarini yozib oling va tahlil qiling.",
      ru: 'Зафиксируйте значения STFT, LTFT, ДМРВ и O2 на холостом ходу и при 2500 об/мин на прогретом двигателе.',
      en: 'Record and analyze STFT, LTFT, MAF, and O2 sensor data at hot idle and 2,500 RPM steady cruise.',
    },
    estimatedMinutes: 35,
    tools: {
      uz: ['OBD-II Bluetooth/USB skaner', 'Noutbuk yoki smartfon', 'Haroratni tekshirish (ECT >= 85°C)'],
      ru: ['Сканер OBD-II', 'Смартфон или ноутбук с ПО', 'Прогретый двигатель (ECT >= 85 °C)'],
      en: ['OBD-II Diagnostic Scanner', 'Laptop or Mobile App', 'Fully warmed engine (ECT >= 85°C)'],
    },
    safetyWarnings: {
      uz: [
        "Avtomobilni qo'l tormoziga (P/N) qo'ying va g'ildiraklarga tayanch qo'ying.",
        "Yopiq binoda ishlayotganda gaz chiqarish shlangini ulang.",
      ],
      ru: [
        'Поставьте автомобиль на стояночный тормоз и нейтраль/паркинг.',
        'Обеспечьте отвод выхлопных газов в закрытом помещении.',
      ],
      en: [
        'Engage parking brake, select Park/Neutral, and chock wheels.',
        'Connect exhaust extraction hose when running an engine indoors.',
      ],
    },
    steps: {
      uz: [
        "Dvigatelni 85°C gacha qizdiring va barcha elektr iste'molchilarni (konditsioner, chiroqlar) o'chiring.",
        "Skanerda Closed Loop holatini tasdiqlang.",
        "Salt yurishda (Idle) STFT, LTFT, MAF (g/s) va B1S1 kuchlanishini yozib oling.",
        "2500 ayl/min ni 30 soniya ushlab turing va qiymatlarni qaytadan yozing.",
        "Ikkala rejim farqidan kelib chiqib aralashma holati haqida xulosa yozing.",
      ],
      ru: [
        'Прогрейте ДВС до 85 °C и выключите кондиционер и фары.',
        'Убедитесь в статусе Closed Loop в потоке данных.',
        'Запишите STFT, LTFT, расход воздуха (г/с) и сигнал ДК1 на холостом ходу.',
        'Удерживайте 2500 об/мин в течение 30 секунд и снимите повторные показания.',
        'Сделайте вывод о состоянии топливоподачи и герметичности впуска.',
      ],
      en: [
        'Warm engine to at least 85°C coolant temperature with A/C and accessories off.',
        'Verify Fuel System Status indicates Closed Loop.',
        'Record STFT, LTFT, MAF (g/s), and B1S1 O2 voltage at idle.',
        'Hold engine speed steady at 2,500 RPM for 30 seconds and record readings.',
        'Write a diagnostic conclusion comparing idle vs. load fuel trim shifts.',
      ],
    },
    published: true,
  },
  {
    id: 'assign_2',
    order: 2,
    title: {
      uz: "2-amaliy ish: Quruq va moyli kompressiya o'lchash",
      ru: 'Практическая работа 2: Сухой и масляный замер компрессии',
      en: 'Lab 2: Dry & Wet Cylinder Compression Testing',
    },
    description: {
      uz: "4 silindrli dvigatelda har bir silindr kompressiyasini o'lchang, foiz farqini hisoblang va natijani izohlang.",
      ru: 'Выполните замер компрессии по всем цилиндрам, рассчитайте разброс в процентах и дайте заключение.',
      en: 'Measure dry and wet compression across all cylinders, compute percentage variance, and document your verdict.',
    },
    estimatedMinutes: 45,
    tools: {
      uz: ['Kompressometr (rezbali adapter bilan)', '16mm sham kaliti', 'Toza motor moyi va shprits (5 ml)'],
      ru: ['Компрессометр с резьбовым штуцером', 'Свечной ключ', 'Шприц с 5 мл чистого моторного масла'],
      en: ['Threaded Compression Gauge', 'Spark Plug Socket & Torque Wrench', 'Clean Engine Oil & 5mL Syringe'],
    },
    safetyWarnings: {
      uz: [
        "Yonilg'i nasosi sug'urtasini va o't oldirish g'altaklarini albatta uzing.",
        "Issiq chiqarish kollektoriga tegmaslik uchun himoya qo'lqop kiying.",
      ],
      ru: [
        'Обязательно отключите предохранитель топливного насоса и разъёмы катушек зажигания.',
        'Используйте термозащитные перчатки вблизи горячего выпускного коллектора.',
      ],
      en: [
        'Disable both fuel pump fuse and ignition coils before cranking.',
        'Wear heat-resistant gloves around the exhaust manifold and hot cylinder head.',
      ],
    },
    steps: {
      uz: [
        "Dvigatelni ishchi haroratga keltiring va o'chiring.",
        "Yonilg'i nasosi relesi/sug'urtasini chiqaring hamda barcha shamlarni yeching.",
        "Gaz pedalini oxirigacha bosib, har bir silindrda 5–6 marta starter aylantiring.",
        "Agar silindrlar orasidagi farq >10% bo'lsa, zaif silindrga 5 ml moy quyib takrorlang.",
        "Hisobotga o'lchov jadvalini va yakuniy xulosani kiriting.",
      ],
      ru: [
        'Прогрейте двигатель и заглушите его.',
        'Отключите подачу топлива/зажигание и выкрутите все свечи.',
        'При полностью нажатой педали газа прокрутите стартер 5–6 циклов на каждом цилиндре.',
        'При разбросе >10% добавьте 5 мл масла в слабый цилиндр и повторите замер.',
        'Оформите таблицу замеров и диагностическое заключение.',
      ],
      en: [
        'Bring engine to operating temperature and shut off ignition.',
        'Disable fuel injection/ignition and remove all spark plugs.',
        'Hold throttle wide open (WOT) and crank 5–6 compression strokes per cylinder.',
        'If variance exceeds 10%, add 5 mL of oil to any weak cylinder and re-test.',
        'Submit all dry/wet readings and your mechanical diagnosis.',
      ],
    },
    published: true,
  },
  {
    id: 'assign_3',
    order: 3,
    title: {
      uz: "3-amaliy ish: COP o't oldirish g'altaklari va shamlarni tekshirish",
      ru: 'Практическая работа 3: Проверка катушек COP и свечей зажигания',
      en: 'Lab 3: COP Ignition Coil & Spark Plug Inspection',
    },
    description: {
      uz: "Uchqun shamlari zazorini shuplar bilan o'lchang, izolyator holatini baholang va multimetrda g'altak qarshiligini tekshiring.",
      ru: 'Измерьте зазор свечей щупом, оцените состояние изолятора и проверьте сопротивление обмоток катушек.',
      en: 'Measure spark plug electrode gap, inspect ceramic insulators for carbon tracking, and test coil resistance.',
    },
    estimatedMinutes: 30,
    tools: {
      uz: ['Raqamli multimetr', 'Simli/plastinkali shup (Feeler gauge)', 'Lupa va chiroq'],
      ru: ['Цифровой мультиметр', 'Набор щупов для свечей', 'Фонарик и лупа'],
      en: ['Digital Multimeter', 'Spark Plug Gap Gauge', 'Inspection Light'],
    },
    safetyWarnings: {
      uz: [
        "Dvigatel ishlab turganda yuqori kuchlanishli g'altaklarga qo'l tekkizmang.",
        "Iridiy shamlari zazorini egishda markaziy elektrodga bosim bermang.",
      ],
      ru: [
        'Не прикасайтесь к высоковольтным узлам при работающем двигателе.',
        'Не давите на тонкий центральный электрод иридиевых свечей при регулировке зазора.',
      ],
      en: [
        'Never touch high-voltage ignition coils while the engine is cranking or running.',
        'Do not pry against the fine-wire center electrode on iridium plugs when checking gap.',
      ],
    },
    steps: {
      uz: [
        "G'altak rezinka uchliklarini yoriq va oqish (carbon tracking) izlariga tekshiring.",
        "Har bir sham zazorini o'lchang (odatda 0.8–1.1 mm).",
        "Multimetrda 2 simli g'altakning birlamchi (0.5–1.5 Ω) va ikkilamchi (6–12 kΩ) qarshiligini o'lchang.",
        "Sham rangiga qarab yonish sifatini baholang va hisobot yozing.",
      ],
      ru: [
        'Осмотрите резиновые наконечники катушек на наличие трещин и следов пробоя.',
        'Измерьте искровой зазор каждой свечи (норма обычно 0.8–1.1 мм).',
        'Проверьте сопротивление первичной (0.5–1.5 Ом) и вторичной (6–12 кОм) обмоток.',
        'Оцените цвет нагара свечей и приложите фото в отчёт.',
      ],
      en: [
        'Inspect coil boots for hairline cracks or white carbon-tracking lines.',
        'Measure electrode gap on each spark plug (typical spec 0.8–1.1 mm).',
        'Measure primary (0.5–1.5 Ω) and secondary (6–12 kΩ) coil resistance where applicable.',
        'Document insulator color reading and upload inspection photos.',
      ],
    },
    published: true,
  },
  {
    id: 'assign_4',
    order: 4,
    title: {
      uz: "4-amaliy ish: Akkumulyator, starter va massa kuchlanish tushishi testi",
      ru: 'Практическая работа 4: Тест АКБ и падения напряжения на массах',
      en: 'Lab 4: Battery Load & Starter Circuit Voltage Drop Test',
    },
    description: {
      uz: "Multimetr yordamida musbat va manfiy zanjirlarda kuchlanish tushishini (Voltage Drop) o'lchab kontakt sifatini tekshiring.",
      ru: 'Измерьте падение напряжения в плюсовой и минусовой цепях стартера под нагрузкой.',
      en: 'Perform dynamic positive and negative voltage drop tests across battery cables and engine ground straps.',
    },
    estimatedMinutes: 25,
    tools: {
      uz: ['Raqamli multimetr', 'Krokodil qisqichlar', 'Cho‘tka va kontakt tozalagich'],
      ru: ['Цифровой мультиметр', 'Зажимы-крокодилы', 'Щётка для клемм и очиститель контактов'],
      en: ['Digital Multimeter', 'Test Leads with Alligator Clips', 'Terminal Brush & Contact Cleaner'],
    },
    safetyWarnings: {
      uz: [
        "Akkumulyator yaqinida uchqun chiqarmang — vodorod gazi portlashi mumkin.",
        "Aylanuvchi kamarlar va ventilyatordan uzoq turing.",
      ],
      ru: [
        'Избегайте искрения возле АКБ из-за риска воспламенения водорода.',
        'Держите провода мультиметра подальше от приводных ремней и вентилятора.',
      ],
      en: [
        'Avoid creating sparks near the battery due to explosive hydrogen gas.',
        'Keep meter leads clear of rotating serpentine belts and cooling fans.',
      ],
    },
    steps: {
      uz: [
        "Tinch holatda AKB kuchlanishini o'lchang (me'yor >= 12.6V).",
        "Starter aylantirganda musbat klemmadan starter boltigacha bo'lgan kuchlanish tushishini o'lchang (< 0.5V).",
        "Manfiy klemmadan dvigatel blokigacha bo'lgan kuchlanish tushishini o'lchang (< 0.2V).",
        "Zaryadlash kuchlanishini (13.8–14.5V) tekshiring va xulosa yozing.",
      ],
      ru: [
        'Замерьте напряжение покоя АКБ (норма >= 12.6 В).',
        'При прокрутке стартером замерьте падение напряжения по плюсу (< 0.5 В).',
        'Замерьте падение напряжения от минусовой клеммы к блоку ДВС (< 0.2 В).',
        'Проверьте напряжение зарядки генератора (13.8–14.5 В) и оформите отчёт.',
      ],
      en: [
        'Measure battery resting open-circuit voltage (healthy >= 12.6V).',
        'While cranking, measure voltage drop from battery (+) post to starter B+ terminal (< 0.5V).',
        'Measure ground-side voltage drop from battery (-) post to engine block (< 0.2V).',
        'Verify alternator charging voltage (13.8–14.5V) and submit your findings.',
      ],
    },
    published: true,
  },
];

// Compact builder for 65 authentic OBD-II DTC codes in uz, ru, en
type RawDtc = [
  string, // code
  DtcCode['system'],
  DtcCode['severity'],
  [string, string, string], // meaning uz, ru, en
  [string[], string[], string[]], // causes uz, ru, en
  [string[], string[], string[]] // checks uz, ru, en
];

const RAW_DTC_LIST: RawDtc[] = [
  ['P0100', 'sensors', 'medium',
    ['MAF (havo sarfi) datchigi zanjirida nosozlik', 'Неисправность цепи датчика массового расхода воздуха (ДМРВ)', 'Mass or Volume Air Flow (MAF) Circuit Malfunction'],
    [['MAF raz’yomi uzilgan', 'Simda qisqa tutashuv', 'MAF elementi ishdan chiqqan'], ['Обрыв разъёма ДМРВ', 'Короткое замыкание проводки', 'Отказ элемента ДМРВ'], ['Disconnected MAF harness', 'Wiring short/open', 'Failed MAF sensor element']],
    [['5V va massa ta’minotini tekshiring', 'Salt yurishda g/s qiymatini ko‘ring'], ['Проверьте питание 5В и массу', 'Оцените показания г/с на ХХ'], ['Verify 5V reference & ground', 'Check idle g/s reading on scan tool']]
  ],
  ['P0101', 'sensors', 'medium',
    ['MAF datchigi diapazoni / unumdorlik muammosi', 'Выход сигнала ДМРВ за допустимый диапазон', 'Mass Air Flow (MAF) Circuit Range/Performance'],
    [['Havo filtri ifloslangan', 'MAF dan keyin havo so‘rishi', 'MAF sensori kirlangan'], ['Забитый воздушный фильтр', 'Подсос воздуха после ДМРВ', 'Загрязнение нити ДМРВ'], ['Clogged air filter', 'Unmetered air leak after MAF', 'Contaminated MAF hot-wire']],
    [['Kiritish gofrasini yoriqlarga tekshiring', 'MAF tozalagich bilan tozalang'], ['Осмотрите гофру впуска', 'Очистите ДМРВ спецспреем'], ['Inspect intake boot for tears', 'Clean MAF element with dedicated cleaner']]
  ],
  ['P0102', 'sensors', 'medium',
    ['MAF datchigi signali juda past', 'Низкий уровень сигнала ДМРВ', 'Mass Air Flow (MAF) Circuit Low Input'],
    [['Signal simi massaga tutashgan', 'Sug‘urta kuygan', 'Katta havo sizishi'], ['Замыкание сигнального провода на массу', 'Перегорел предохранитель', 'Сильный подсос воздуха'], ['Signal wire shorted to ground', 'Blown sensor fuse', 'Major intake air leak']],
    [['Signal pinida kuchlanishni o‘lchang', 'Ta’minot sug‘urtasini tekshiring'], ['Замерьте напряжение на сигнальном пине', 'Проверьте предохранитель'], ['Test signal voltage at harness', 'Check ECU sensor power fuse']]
  ],
  ['P0103', 'sensors', 'medium',
    ['MAF datchigi signali juda yuqori', 'Высокий уровень сигнала ДМРВ', 'Mass Air Flow (MAF) Circuit High Input'],
    [['Massa simi uzilgan', 'Signal +5V ga tutashgan', 'MAF ichki nosozligi'], ['Обрыв массы датчика', 'Замыкание сигнала на +5В', 'Внутренний дефект ДМРВ'], ['Open ground circuit', 'Signal shorted to reference voltage', 'Internal MAF fault']],
    [['Massa zanjirida kuchlanish tushishini tekshiring', 'Signal simini alohida tekshiring'], ['Проверьте массу под нагрузкой', 'Прозвоните сигнальный провод'], ['Perform ground drop test', 'Check harness continuity']]
  ],
  ['P0105', 'sensors', 'medium',
    ['MAP (kollektor bosimi) datchigi zanjirida nosozlik', 'Неисправность цепи датчика абсолютного давления (ДАД)', 'Manifold Absolute Pressure (MAP) Circuit Malfunction'],
    [['MAP raz’yomi bo‘shagan', 'Vakuum shlangi yorilgan', 'MAP sensori buzilgan'], ['Окисление разъёма ДАД', 'Трещина вакуумной трубки', 'Отказ датчика ДАД'], ['Corroded MAP connector', 'Cracked vacuum hose', 'Faulty MAP sensor']],
    [['Kalit yoqilganda barometrik bosim (~100 kPa) ko‘rsatishini tekshiring'], ['Проверьте показания атмосферного давления (~100 кПа) при включённом зажигании'], ['Verify KOEO reading matches ~100 kPa barometric pressure']]
  ],
  ['P0106', 'sensors', 'medium',
    ['MAP datchigi diapazon/unumdorlik xatosi', 'Некорректный диапазон сигнала ДАД (MAP)', 'MAP Sensor Range/Performance Problem'],
    [['Vakuum shlangi tiqilgan', 'EGR klapani ochiq qolgan', 'Drossel kirlangan'], ['Забит канал ДАД', 'Заклинивший клапан EGR', 'Загрязнён дроссель'], ['Plugged MAP port', 'Stuck open EGR valve', 'Dirty throttle body']],
    [['Vakuum nasosi bilan MAP chiziqliligini tekshiring'], ['Проверьте линейность сигнала вакуумным пистолетом'], ['Test MAP linearity using handheld vacuum pump']]
  ],
  ['P0107', 'sensors', 'medium',
    ['MAP datchigi past kuchlanish', 'Низкое напряжение цепи ДАД', 'MAP Circuit Low Input'],
    [['+5V ta’minot yo‘q', 'Signal massaga tutashgan'], ['Нет опорного питания +5В', 'Замыкание на массу'], ['Missing 5V reference', 'Signal shorted to ground']],
    [['5V ref va signal simini tekshiring'], ['Проверьте опорное напряжение 5В'], ['Verify 5V reference wire']]
  ],
  ['P0108', 'sensors', 'medium',
    ['MAP datchigi yuqori kuchlanish', 'Высокое напряжение цепи ДАД', 'MAP Circuit High Input'],
    [['Massa uzilgan', 'Katalizator tiqilgan', 'Signal +5V ga tutashgan'], ['Обрыв массы ДАД', 'Забитый катализатор', 'Замыкание на +5В'], ['Open sensor ground', 'Restricted exhaust', 'Short to 5V reference']],
    [['Sensor massasini tekshiring', 'Egzoz bosimini baholang'], ['Проверьте массу датчика', 'Оцените противодавление выхлопа'], ['Check ground wire', 'Inspect exhaust backpressure']]
  ],
  ['P0110', 'sensors', 'low',
    ['IAT (kiruvchi havo harorati) datchigi xatosi', 'Неисправность цепи датчика температуры впускаемого воздуха (ДТВВ)', 'Intake Air Temperature (IAT) Circuit Malfunction'],
    [['IAT raz’yomi uzilgan', 'Termistor buzilgan'], ['Обрыв цепи ДТВВ', 'Неисправен термистор'], ['Disconnected IAT plug', 'Failed NTC thermistor']],
    [['Sovuq dvigatelda IAT atrof-muhit haroratiga tengligini tekshiring'], ['Сравните IAT с температурой окружающей среды на холодном ДВС'], ['Compare cold IAT against ambient air temperature']]
  ],
  ['P0113', 'sensors', 'low',
    ['IAT datchigi yuqori signal (-40°C ko‘rsatishi)', 'Высокий уровень сигнала ДТВВ (обрыв цепи)', 'IAT Sensor Circuit High Input'],
    [['Zanjir uzilgan (open circuit)', 'Raz’yom ulanmagan'], ['Обрыв проводки', 'Снят разъём'], ['Open circuit in harness', 'Unplugged sensor']],
    [['Qarshilik va 5V pull-up kuchlanishini tekshiring'], ['Проверьте подтяжку 5В на разъёме'], ['Check for 5V pull-up on unplugged connector']]
  ],
  ['P0115', 'cooling_idle', 'high',
    ['ECT (sovutish suyuqligi harorati) datchigi zanjiri xatosi', 'Неисправность цепи датчика температуры ОЖ (ДТОЖ)', 'Engine Coolant Temperature (ECT) Circuit Malfunction'],
    [['ECT raz’yomi oksidlangan', 'Sim uzilgan', 'Datchik ishdan chiqqan'], ['Окисление контактов ДТОЖ', 'Обрыв провода', 'Выход датчика из строя'], ['Corroded ECT terminals', 'Broken wire', 'Faulty ECT thermistor']],
    [['Skanerda harorat sakrashini kuzating', 'Datchik qarshiligini jadval bilan solishtiring'], ['Проверьте плавность роста температуры по сканеру'], ['Watch scan data for erratic temperature spikes']]
  ],
  ['P0117', 'cooling_idle', 'high',
    ['ECT datchigi past kuchlanish (juda issiq ko‘rsatishi)', 'Низкий уровень сигнала ДТОЖ (замыкание на массу)', 'ECT Circuit Low Input'],
    [['Signal simi massaga tutashgan', 'ECT ichki qisqa tutashuvi'], ['Замыкание провода на массу', 'Внутреннее КЗ датчика'], ['Signal wire shorted to ground', 'Internal sensor short']],
    [['Raz’yomni uzganda harorat -40°C ga tushishini tekshiring'], ['При снятии фишки сканер должен показать -40 °C'], ['Unplug sensor and verify scan tool drops to -40°C']]
  ],
  ['P0118', 'cooling_idle', 'high',
    ['ECT datchigi yuqori kuchlanish (zanjir uzilishi)', 'Высокий уровень сигнала ДТОЖ (обрыв цепи)', 'ECT Circuit High Input'],
    [['Sim uzilgan', 'Massa yo‘q', 'Sovutish tizimida havo tiqini'], ['Обрыв цепи ДТОЖ', 'Плохая масса', 'Воздушная пробка'], ['Open signal or ground wire', 'Corroded plug', 'Failed sensor']],
    [['5V kuchlanishni o‘lchang', 'Simlarni tortib tekshiring'], ['Проверьте наличие 5В на снятом разъёме'], ['Check 5V bias on disconnected plug']]
  ],
  ['P0120', 'sensors', 'high',
    ['TPS (drossel holati) datchigi A zanjiri xatosi', 'Неисправность цепи датчика положения дросселя (ДПДЗ A)', 'Throttle Position Sensor (TPS) A Circuit Malfunction'],
    [['TPS rezistor yo‘li yeyilgan', 'Sim uzilgan'], ['Износ дорожки ДПДЗ', 'Обрыв проводки'], ['Worn TPS potentiometer track', 'Damaged wiring']],
    [['Pedal bosilganda kuchlanish 0.5V dan 4.5V gacha uzilishsiz oshishini ossillografda ko‘ring'], ['Проверьте плавность роста напряжения 0.5–4.5 В осциллографом'], ['Sweep TPS voltage from 0.5V to 4.5V looking for dropouts']]
  ],
  ['P0121', 'sensors', 'high',
    ['TPS A diapazon / unumdorlik muammosi', 'Выход сигнала ДПДЗ A за диапазон / сбой калибровки', 'TPS/Pedal Position Sensor A Range/Performance'],
    [['Drossel qopqog‘i kirlangan', 'TPS va MAP ko‘rsatkichi mos kelmayapti'], ['Загрязнение дроссельной заслонки', 'Рассогласование ДПДЗ и ДАД'], ['Carbon buildup on throttle plate', 'TPS/MAP correlation mismatch']],
    [['Drosselni tozalang va adaptatsiya qiling'], ['Очистите дроссельный узел и выполните адаптацию'], ['Clean throttle bore and perform idle relearn']]
  ],
  ['P0122', 'sensors', 'high',
    ['TPS A past kuchlanish', 'Низкое напряжение цепи ДПДЗ A', 'TPS Sensor A Circuit Low Input'],
    [['5V ta’minot yo‘q', 'Signal massaga tutashgan'], ['Потеря опорного +5В', 'Замыкание на массу'], ['Lost 5V reference', 'Signal shorted to ground']],
    [['5V ref va signal simini tekshiring'], ['Проверьте 5В на разъёме дросселя'], ['Verify 5V reference supply']]
  ],
  ['P0123', 'sensors', 'high',
    ['TPS A yuqori kuchlanish', 'Высокое напряжение цепи ДПДЗ A', 'TPS Sensor A Circuit High Input'],
    [['Massa uzilgan', 'Signal +5V ga tutashgan'], ['Обрыв массы ДПДЗ', 'Замыкание на +5В'], ['Open ground circuit', 'Signal shorted to 5V']],
    [['Massa qarshiligini tekshiring'], ['Прозвоните массу датчика'], ['Test sensor ground integrity']]
  ],
  ['P0125', 'cooling_idle', 'medium',
    ['Yopiq kontur uchun harorat yetarli emas', 'Недостаточная температура ОЖ для перехода в Closed Loop', 'Insufficient Coolant Temperature for Closed Loop Fuel Control'],
    [['Termostat ochiq holatda qotib qolgan', 'ECT noto‘g‘ri ko‘rsatmoqda'], ['Заклинил термостат в открытом положении', 'Врёт датчик ДТОЖ'], ['Thermostat stuck open', 'Skewed ECT sensor']],
    [['Dvigatel 10 daqiqada 85°C ga chiqishini tekshiring'], ['Проверьте время прогрева и температуру патрубков радиатора'], ['Check radiator hoses during warm-up for stuck-open thermostat']]
  ],
  ['P0128', 'cooling_idle', 'medium',
    ['Termostat harorati me’yordan past (sekin qizish)', 'Температура ОЖ ниже температуры регулирования термостата', 'Coolant Thermostat (Coolant Temp Below Regulating Temp)'],
    [['Termostat klapani to‘liq yopilmayapti', 'Sovutish suyuqligi kam', 'ECT xatosi'], ['Термостат заклинил приоткрытым', 'Низкий уровень ОЖ', 'Неисправен ДТОЖ'], ['Stuck-open thermostat', 'Low coolant level', 'Biased ECT sensor']],
    [['Sovuq startda yuqori radiator shlangi darhol isishini tekshiring'], ['Потрогайте верхний патрубок радиатора при прогреве'], ['Feel upper radiator hose during warm-up; if warm early, replace thermostat']]
  ],
  ['P0130', 'emissions', 'medium',
    ['O2 datchigi Bank 1 Sensor 1 zanjirida nosozlik', 'Неисправность цепи датчика кислорода B1S1', 'O2 Sensor Circuit Malfunction (Bank 1 Sensor 1)'],
    [['Lyambda zond simi kuygan', 'Datchik eskirgan', 'Raz’yomda namlik'], ['Обрыв/оплавление провода ДК1', 'Отравление датчика', 'Влага в разъёме'], ['Melted O2 harness', 'Aged sensor', 'Moisture in connector']],
    [['B1S1 signalining 0.1–0.9V oralig‘ida tebranishini tekshiring'], ['Проверьте размах сигнала B1S1 (0.1–0.9 В)'], ['Graph B1S1 voltage switching between 0.1V and 0.9V']]
  ],
  ['P0131', 'emissions', 'medium',
    ['B1S1 O2 datchigi past kuchlanish (kambag‘al)', 'Низкое напряжение ДК1 B1S1 (бедная смесь)', 'O2 Sensor Circuit Low Voltage (Bank 1 Sensor 1)'],
    [['Signal massaga tutashgan', 'Kuchli havo so‘rishi', 'Yonilg‘i yetishmasligi'], ['Замыкание сигнала на массу', 'Сильный подсос воздуха', 'Низкое давление топлива'], ['O2 signal short to ground', 'Severe vacuum leak', 'Low fuel pressure']],
    [['Tormozni ko‘paytirib (yoki propan berib) O2 0.9V ga ko‘tarilishini tekshiring'], ['Обогатите смесь и проверьте реакцию зонда'], ['Add enrichment briefly to confirm if O2 sensor responds above 0.8V']]
  ],
  ['P0132', 'emissions', 'medium',
    ['B1S1 O2 datchigi yuqori kuchlanish (boy)', 'Высокое напряжение ДК1 B1S1 (богатая смесь)', 'O2 Sensor Circuit High Voltage (Bank 1 Sensor 1)'],
    [['Signal qizdirgich (+12V) ga tutashgan', 'Injektor oqayapti', 'Yonilg‘i bosimi haddan yuqori'], ['Замыкание на +12В подогрева', 'Льёт форсунка', 'Высокое давление топлива'], ['Signal shorted to heater 12V', 'Leaking injector', 'Excessive fuel pressure']],
    [['Raz’yomni uzganda kuchlanish 0.45V ga qaytishini tekshiring'], ['Отключите разъём и проверьте опорные 0.45 В'], ['Disconnect O2 sensor and verify ECU bias voltage is ~0.45V']]
  ],
  ['P0133', 'emissions', 'medium',
    ['B1S1 O2 datchigi javobi sekinlashgan', 'Медленный отклик датчика кислорода B1S1', 'O2 Sensor Circuit Slow Response (Bank 1 Sensor 1)'],
    [['Zond elementi zaharlangan (kremniy/qo‘rg‘oshin)', 'Egzoz kollektorida tirqish'], ['Отравление элемента ДК1', 'Трещина выпускного коллектора'], ['Contaminated O2 sensor element', 'Pre-sensor exhaust leak']],
    [['2500 ayl/min da 10 soniyada kamida 8–10 marta almashishini sanang'], ['Подсчитайте количество переключений за 10 с на 2500 об/мин'], ['Count rich/lean transitions over 10 seconds at 2,500 RPM']]
  ],
  ['P0134', 'emissions', 'medium',
    ['B1S1 O2 datchigi faolligi aniqlanmadi', 'Нет активности сигнала ДК1 B1S1', 'O2 Sensor Circuit No Activity Detected (Bank 1 Sensor 1)'],
    [['Signal simi uzilgan', 'Zond ishdan chiqqan', 'Qizdirgich ishlamayapti'], ['Обрыв сигнального провода', 'Умерший датчик', 'Нет подогрева'], ['Open signal circuit', 'Dead sensor', 'Failed heater circuit']],
    [['Zond 0.45V da qotib qolganini skanerda tekshiring'], ['Проверьте зависание сигнала на опорных 0.45 В'], ['Check if B1S1 stays frozen at ~0.45V bias']]
  ],
  ['P0135', 'emissions', 'low',
    ['B1S1 O2 datchigi qizdirish zanjiri xatosi', 'Неисправность цепи подогрева ДК1 B1S1', 'O2 Sensor Heater Circuit Malfunction (Bank 1 Sensor 1)'],
    [['Ichki qizdirgich spiral kuygan', 'Sug‘urta kuygan'], ['Перегорела спираль подогрева', 'Сгорел предохранитель'], ['Open internal heater element', 'Blown heater fuse']],
    [['Qizdirgich pinlari orasida qarshilikni o‘lchang (3–15 Ω)'], ['Измерьте сопротивление подогревателя (обычно 3–15 Ом)'], ['Measure heater resistance across heater pins (typically 3–15 Ω)']]
  ],
  ['P0141', 'emissions', 'low',
    ['B1S2 (katalizatordan keyingi) O2 qizdirish zanjiri xatosi', 'Неисправность цепи подогрева второго ДК B1S2', 'O2 Sensor Heater Circuit Malfunction (Bank 1 Sensor 2)'],
    [['Qizdirgich spirali uzilgan', 'Pastki sim shikastlangan'], ['Обрыв подогревателя ДК2', 'Повреждён жгут под днищем'], ['Burned-out heater coil', 'Damaged underbody harness']],
    [['12V ta’minot va ECU boshqaruv massasini tekshiring'], ['Проверьте питание 12В и управление от ЭБУ'], ['Check 12V feed and ECU ground pulse at B1S2']]
  ],
  ['P0171', 'fuel_air', 'high',
    ['Aralashma juda kambag‘al (Bank 1 — System Too Lean)', 'Слишком бедная смесь (Банк 1)', 'System Too Lean (Bank 1)'],
    [['Vakuum shlangi yoki kollektor havo so‘rayapti', 'MAF datchigi kirlangan', 'Yonilg‘i nasosi bosimi past', 'PCV klapani yirtilgan'], ['Подсос воздуха во впуск', 'Загрязнён ДМРВ', 'Низкое давление топлива', 'Порвана мембрана КВКГ (PCV)'], ['Intake vacuum leak', 'Dirty/skewed MAF', 'Weak fuel pump / clogged filter', 'Torn PCV diaphragm']],
    [['Salt yurish vs 2500 ayl/min STFT/LTFT ni solishtiring', 'Tutun generatori ulang', 'Yonilg‘i bosimini o‘lchang'], ['Сравните коррекции на ХХ и 2500 об/мин', 'Подключите дымогенератор', 'Замерьте давление в рампе'], ['Compare idle vs. 2,500 RPM trims', 'Smoke-test intake', 'Measure fuel rail pressure']]
  ],
  ['P0172', 'fuel_air', 'high',
    ['Aralashma juda boy (Bank 1 — System Too Rich)', 'Слишком богатая смесь (Банк 1)', 'System Too Rich (Bank 1)'],
    [['Injektor sizmoqda (oqmoqda)', 'EVAP klapani ochiq qolgan', 'Yonilg‘i bosim regulyatori nosoz', 'Havo filtri butunlay tiqilgan'], ['Негерметичная форсунка', 'Заклинил клапан адсорбера EVAP', 'Высокое давление топлива', 'Забит воздушный фильтр'], ['Leaking fuel injector', 'Stuck-open EVAP purge valve', 'Faulty fuel pressure regulator', 'Severely restricted air filter']],
    [['Qoldiq yonilg‘i bosimini tekshiring', 'EVAP shlangini siqib LTFT ni kuzating'], ['Проверьте падение остаточного давления', 'Пережмите трубку адсорбера'], ['Check residual fuel pressure drop', 'Pinch EVAP purge hose and watch STFT']]
  ],
  ['P0174', 'fuel_air', 'high',
    ['Aralashma juda kambag‘al (Bank 2)', 'Слишком бедная смесь (Банк 2)', 'System Too Lean (Bank 2)'],
    [['2-qator kiritish qistirmasi havo so‘rmoqda', 'Umumiy MAF/nasos muammosi (agar P0171 ham bo‘lsa)'], ['Подсос воздуха по 2-й ГБЦ', 'Общая нехватка топлива (в паре с P0171)'], ['Bank 2 intake gasket leak', 'Shared MAF/fuel issue if paired with P0171']],
    [['P0171 bilan birga chiqqanligini tekshiring'], ['Проверьте, есть ли ошибка P0171 одновременно'], ['Check whether P0171 is also stored']]
  ],
  ['P0175', 'fuel_air', 'high',
    ['Aralashma juda boy (Bank 2)', 'Слишком богатая смесь (Банк 2)', 'System Too Rich (Bank 2)'],
    [['Bank 2 injektorlari oqmoqda', 'Karter gazlariga moy/benzin tushishi'], ['Течь форсунок Банка 2', 'Попадание топлива в масло'], ['Leaking Bank 2 injector', 'Fuel-contaminated engine oil']],
    [['Moy sathini va benzin hidini tekshiring'], ['Проверьте уровень масла и запах бензина'], ['Inspect oil level/smell and test injector balance']]
  ],
  ['P0190', 'fuel_air', 'high',
    ['Yonilg‘i rampasi bosimi datchigi (FRP) zanjiri xatosi', 'Неисправность цепи датчика давления в рампе (FRP)', 'Fuel Rail Pressure Sensor Circuit Malfunction'],
    [['FRP raz’yomi bo‘shagan', 'Datchik ishdan chiqqan'], ['Плохой контакт датчика давления', 'Отказ датчика FRP'], ['Loose FRP connector', 'Faulty rail pressure sensor']],
    [['Kalit yoqilganda bosim qiymatini skanerda tekshiring'], ['Проверьте показания давления в рампе по сканеру'], ['Inspect live FRP reading and 5V supply']]
  ],
  ['P0191', 'fuel_air', 'high',
    ['Yonilg‘i rampasi bosimi diapazon/unumdorlik xatosi', 'Выход сигнала датчика давления топлива за пределы', 'Fuel Rail Pressure Sensor Range/Performance'],
    [['HPFP yoki LPFP yetarli bosim bermayapti', 'Bosim regulyatori qotib qolgan'], ['Недостаточная подача насоса', 'Заклинил регулятор давления'], ['Failing fuel pump', 'Sticking pressure control valve']],
    [['Mexanik manometr bilan skaner ko‘rsatkichini solishtiring'], ['Сравните показания сканера с механическим манометром'], ['Compare FRP scan value against mechanical gauge']]
  ],
  ['P0201', 'fuel_air', 'high',
    ['1-silindr injektori zanjiri nosozligi', 'Неисправность цепи форсунки 1-го цилиндра', 'Injector Circuit Malfunction - Cylinder 1'],
    [['Injektor g‘altagi kuygan', 'Sim uzilgan', 'ECU drayveri nosoz'], ['Обрыв обмотки форсунки', 'Повреждение проводки', 'Сбой драйвера ЭБУ'], ['Open injector coil', 'Broken harness wire', 'ECU driver fault']],
    [['Injektor qarshiligini o‘lchang (11–16 Ω standart)', 'Noid lampa bilan impulsni tekshiring'], ['Замерьте сопротивление форсунки (11–16 Ом)', 'Проверьте импульс тестером'], ['Measure coil resistance (11–16 Ω) and test pulse with noid light']]
  ],
  ['P0202', 'fuel_air', 'high',
    ['2-silindr injektori zanjiri nosozligi', 'Неисправность цепи форсунки 2-го цилиндра', 'Injector Circuit Malfunction - Cylinder 2'],
    [['Injektor g‘altagi uzilgan', 'Raz’yom oksidlangan'], ['Обрыв форсунки 2', 'Плохой контакт в разъёме'], ['Open injector winding', 'Corroded plug']],
    [['2-injektor qarshiligi va +12V ta’minotini tekshiring'], ['Проверьте питание 12В и сопротивление обмотки'], ['Test 12V supply and injector resistance']]
  ],
  ['P0203', 'fuel_air', 'high',
    ['3-silindr injektori zanjiri nosozligi', 'Неисправность цепи форсунки 3-го цилиндра', 'Injector Circuit Malfunction - Cylinder 3'],
    [['Sim uzilgan (ko‘pincha kemiruvchilar)', 'Injektor ichki uzilishi'], ['Повреждение жгута', 'Обрыв обмотки форсунки'], ['Wiring open/short', 'Failed injector solenoid']],
    [['Boshqa silindr bilan taqqoslab qarshilik o‘lchang'], ['Сравните сопротивление с исправной форсункой'], ['Compare resistance against known-good cylinder']]
  ],
  ['P0204', 'fuel_air', 'high',
    ['4-silindr injektori zanjiri nosozligi', 'Неисправность цепи форсунки 4-го цилиндра', 'Injector Circuit Malfunction - Cylinder 4'],
    [['Injektor ishdan chiqqan', 'ECU boshqaruv simi uzilgan'], ['Отказ форсунки 4', 'Обрыв управляющего провода'], ['Failed injector #4', 'Open ECU control wire']],
    [['Ossillografda injektor kuchlanish impulsini tekshiring'], ['Снимите осциллограмму импульса форсунки'], ['Check injector voltage waveform on scope']]
  ],
  ['P0300', 'ignition', 'high',
    ['Tasodifiy / bir nechta silindrlarda o‘t olish uzilishi (Misfire)', 'Множественные/случайные пропуски воспламенения (Misfire)', 'Random/Multiple Cylinder Misfire Detected'],
    [['Yonilg‘i bosimi past', 'Kiritish tizimida havo so‘rishi', 'Uchqun shamlari eskirgan', 'GRM fazasi siljigan', 'EGR ochiq qolgan'], ['Низкое давление топлива', 'Подсос воздуха', 'Износ свечей', 'Сбиты фазы ГРМ', 'Заклинил EGR'], ['Low fuel pressure', 'Intake vacuum leak', 'Worn spark plugs', 'Jumped timing', 'Stuck EGR valve']],
    [['Mode $06 misfire hisoblagichlarini ko‘ring', 'STFT/LTFT va kompressiyani tekshiring'], ['Проверьте счётчики пропусков Mode $06', 'Оцените коррекции и компрессию'], ['Inspect Mode $06 misfire counters, fuel trims, and compression']]
  ],
  ['P0301', 'ignition', 'high',
    ['1-silindrda o‘t olish uzilishi (Misfire)', 'Пропуски воспламенения в 1-м цилиндре', 'Cylinder 1 Misfire Detected'],
    [['1-sham yoki g‘altak nosoz', '1-injektor tiqilgan', '1-silindr kompressiyasi past'], ['Неисправна свеча или катушка 1', 'Забита форсунка 1', 'Низкая компрессия в 1-м цилиндре'], ['Faulty #1 coil/plug', 'Clogged #1 injector', 'Low compression in cyl #1']],
    [['G‘altakni 2-silindr bilan almashtirib xato ko‘chishini tekshiring'], ['Поменяйте катушку местами со 2-м цилиндром'], ['Swap coil #1 to cylinder #2 and see if code moves to P0302']]
  ],
  ['P0302', 'ignition', 'high',
    ['2-silindrda o‘t olish uzilishi (Misfire)', 'Пропуски воспламенения во 2-м цилиндре', 'Cylinder 2 Misfire Detected'],
    [['2-g‘altak/sham nosoz', '2-injektor muammosi', 'Klapan kuygan'], ['Отказ катушки/свечи 2', 'Сбой форсунки 2', 'Прогар клапана'], ['Defective #2 coil/plug', 'Injector #2 fault', 'Burnt valve']],
    [['Sham va g‘altakni almashtirib sinang, so‘ng kompressiyani o‘lchang'], ['Переставьте свечу/катушку, затем проверьте компрессию'], ['Swap ignition components, then verify compression']]
  ],
  ['P0303', 'ignition', 'high',
    ['3-silindrda o‘t olish uzilishi (Misfire)', 'Пропуски воспламенения в 3-м цилиндре', 'Cylinder 3 Misfire Detected'],
    [['3-g‘altak teshilgan', 'Antifriz silindrga o‘tayapti', '3-injektor nosoz'], ['Пробой катушки 3', 'Попадание антифриза в цилиндр', 'Отказ форсунки 3'], ['Carbon-tracked #3 coil', 'Coolant ingress in #3', 'Faulty #3 injector']],
    [['Sham uchida antifriz/moy izini ko‘zdan kechiring'], ['Осмотрите свечу 3-го цилиндра на следы антифриза/масла'], ['Inspect #3 spark plug tip for coolant or oil fouling']]
  ],
  ['P0304', 'ignition', 'high',
    ['4-silindrda o‘t olish uzilishi (Misfire)', 'Пропуски воспламенения в 4-м цилиндре', 'Cylinder 4 Misfire Detected'],
    [['4-g‘altak yoki sham nosoz', '4-silindr vakuum shlangi sizishi', 'Past kompressiya'], ['Сбой зажигания 4-го цилиндра', 'Подсос воздуха у 4-го ранера', 'Низкая компрессия'], ['Failed #4 coil/plug', 'Intake runner leak at #4', 'Low mechanical compression']],
    [['G‘altak almashinuvi, injektor balansi va kompressiya testi'], ['Перестановка катушки, тест форсунки и компрессии'], ['Perform coil swap, injector click/balance, and compression check']]
  ],
  ['P0325', 'sensors', 'medium',
    ['Detonatsiya datchigi (Knock Sensor) 1 zanjiri xatosi', 'Неисправность цепи датчика детонации (ДД)', 'Knock Sensor 1 Circuit Malfunction'],
    [['Knock sensor uzilgan yoki yorilgan', 'Sim ekranlanishi shikastlangan'], ['Обрыв цепи ДД или трещина корпуса', 'Повреждён экранированный провод'], ['Open knock sensor circuit', 'Cracked piezo sensor', 'Damaged shielded wire']],
    [['Sensor moment bilan qotirilganini (20 Nm) va AC mV chiqishini tekshiring'], ['Проверьте момент затяжки ДД и отклик при лёгком простукивании'], ['Verify torque spec and tap block while watching AC voltage on scope']]
  ],
  ['P0335', 'sensors', 'high',
    ['CKP (tirsakli val holati) datchigi A zanjiri xatosi', 'Неисправность цепи датчика положения коленвала (ДПКВ)', 'Crankshaft Position (CKP) Sensor A Circuit Malfunction'],
    [['CKP sensori qiziganda uzilib qolmoqda', 'Shkiv tishlari shikastlangan', 'Sim uzilgan'], ['Отказ ДПКВ при нагреве', 'Повреждение зубьев задающего диска', 'Обрыв жгута'], ['Thermal failure of CKP sensor', 'Damaged reluctor teeth', 'Open harness']],
    [['Starter aylanganda skanerda RPM ko‘rsatishini va ossillogrammani tekshiring'], ['Проверьте наличие сигнала оборотов при прокрутке и осциллограмму ДПКВ'], ['Check RPM readout during cranking and capture CKP waveform']]
  ],
  ['P0340', 'sensors', 'high',
    ['CMP (taqsimlash vali holati) datchigi A zanjiri xatosi', 'Неисправность цепи датчика распредвала (ДПРВ)', 'Camshaft Position (CMP) Sensor A Circuit Malfunction'],
    [['CMP datchigi ishdan chiqqan', 'Ta’minot/massa yo‘q', 'GRM fazasi qattiq siljigan'], ['Неисправен ДПРВ', 'Нет питания/массы', 'Сильное смещение фаз ГРМ'], ['Failed CMP sensor', 'Missing 5V/12V or ground', 'Severe timing misalignment']],
    [['CMP 3-simini va chiqish kvadrat impulsini tekshiring'], ['Проверьте питание и выходной сигнал Холла на ДПРВ'], ['Test CMP power, ground, and square-wave signal']]
  ],
  ['P0341', 'sensors', 'medium',
    ['CMP datchigi diapazon/unumdorlik xatosi', 'Выход сигнала ДПРВ за допустимые пределы', 'CMP Sensor A Circuit Range/Performance'],
    [['GRM zanjiri cho‘zilgan', 'Signal shovqinli'], ['Растяжение цепи ГРМ', 'Помехи по сигналу'], ['Stretched timing chain', 'Signal noise/interference']],
    [['CKP + CMP bir vaqtda ossillogramma olib etalon bilan solishtiring'], ['Снимите двухканальную осциллограмму ДПКВ+ДПРВ'], ['Overlay CKP and CMP waveforms against OEM reference']]
  ],
  ['P0351', 'ignition', 'high',
    ['A (1-silindr) o‘t oldirish g‘altagi birlamchi/ikkilamchi xatosi', 'Неисправность цепи катушки зажигания A', 'Ignition Coil A Primary/Secondary Circuit'],
    [['G‘altak ichki uzilishi', 'ECU boshqaruv simi uzilgan'], ['Отказ катушки A', 'Обрыв управляющего провода'], ['Failed ignition coil A', 'Open IGT trigger wire']],
    [['G‘altak +12V, massa va IGT trigger impulsini tekshiring'], ['Проверьте питание катушки и управляющий импульс'], ['Verify coil 12V feed, ground, and trigger pulse']]
  ],
  ['P0352', 'ignition', 'high',
    ['B (2-silindr) o‘t oldirish g‘altagi zanjiri xatosi', 'Неисправность цепи катушки зажигания B', 'Ignition Coil B Primary/Secondary Circuit'],
    [['2-g‘altak nosoz', 'Raz’yom pinlari kengaygan'], ['Отказ катушки B', 'Разболтаны пины разъёма'], ['Failed coil B', 'Loose connector pins']],
    [['G‘altakni almashtirib xato kodining o‘zgarishini tekshiring'], ['Переставьте катушку и проверьте код ошибки'], ['Swap coil B and verify if code follows coil']]
  ],
  ['P0401', 'emissions', 'medium',
    ['EGR tizimi oqimi yetarli emas', 'Недостаточная пропускная способность системы EGR', 'Exhaust Gas Recirculation Flow Insufficient Detected'],
    [['EGR kanallari qurum bilan tiqilgan', 'EGR klapani ochilmayapti'], ['Забиты каналы EGR сажей', 'Заклинил клапан EGR'], ['Carbon-clogged EGR passages', 'Faulty EGR valve']],
    [['EGR ni qo‘lda ochib dvigatel o‘chishga moyilligini (stumble) tekshiring'], ['Принудительно откройте EGR на ХХ — двигатель должен заглохнуть'], ['Command EGR open at idle; engine should stumble or stall']]
  ],
  ['P0402', 'emissions', 'medium',
    ['EGR tizimi oqimi haddan tashqari ko‘p', 'Чрезмерный поток рециркуляции EGR', 'EGR Flow Excessive Detected'],
    [['EGR klapani ochiq holda qotib qolgan (salt yurishda titrash)'], ['Клапан EGR заклинил в открытом положении'], ['EGR valve stuck partially open']],
    [['Klapan ostiga qurum tushib qolmaganligini tekshiring'], ['Снимите клапан EGR и проверьте герметичность седла'], ['Remove EGR valve and inspect pintle for carbon debris']]
  ],
  ['P0420', 'emissions', 'medium',
    ['Katalizator samaradorligi me’yordan past (Bank 1)', 'Эффективность катализатора ниже порога (Банк 1)', 'Catalyst System Efficiency Below Threshold (Bank 1)'],
    [['Katalizator keramikasi erigan yoki eskirgan', 'Katalizatordan oldin egzoz teshilgan', 'B1S2 datchigi noto‘g‘ri ishlayapti'], ['Деградация катализатора', 'Утечка выхлопа до второго ДК', 'Неисправен задний зонд B1S2'], ['Degraded catalytic converter', 'Exhaust leak before B1S2', 'Faulty downstream O2 sensor']],
    [['B1S1 va B1S2 grafiklarini taqqoslang', 'Egzoz tizimini germetiklikka tekshiring'], ['Сравните графики B1S1 и B1S2', 'Проверьте герметичность выхлопа'], ['Compare B1S1 vs B1S2 waveforms and inspect exhaust for leaks']]
  ],
  ['P0430', 'emissions', 'medium',
    ['Katalizator samaradorligi me’yordan past (Bank 2)', 'Эффективность катализатора ниже порога (Банк 2)', 'Catalyst System Efficiency Below Threshold (Bank 2)'],
    [['Bank 2 katalizatori samaradorligini yo‘qotgan', 'Misfire tufayli erib ketgan'], ['Разрушение катализатора Банка 2', 'Перегрев от пропусков зажигания'], ['Bank 2 catalyst degradation', 'Thermal damage from misfires']],
    [['B2S1 va B2S2 signallarini grafikda solishtiring'], ['Сравните осциллограммы B2S1 и B2S2'], ['Compare B2S1 and B2S2 O2 waveforms']]
  ],
  ['P0440', 'emissions', 'low',
    ['EVAP (yonilg‘i bug‘larini ushlash) tizimi nosozligi', 'Неисправность системы улавливания паров топлива (EVAP)', 'Evaporative Emission Control System Malfunction'],
    [['Benzin baki qopqog‘i yaxshi yopilmagan', 'EVAP shlangi yorilgan'], ['Не закручена крышка бензобака', 'Трещина трубки адсорбера'], ['Loose/faulty fuel cap', 'Cracked EVAP vapor line']],
    [['Bak qopqog‘i rezinkasini tekshiring va EVAP tutun testini o‘tkazing'], ['Проверьте уплотнитель пробки бака и проведите дым-тест'], ['Inspect gas cap seal and smoke-test EVAP system']]
  ],
  ['P0442', 'emissions', 'low',
    ['EVAP tizimida kichik sizish (0.040")', 'Обнаружена малая утечка в системе EVAP', 'EVAP System Leak Detected (small leak)'],
    [['Bak qopqog‘i rezinkasi qotgan', 'Purge klapani yengil o‘tkazmoqda'], ['Износ уплотнения крышки бака', 'Неплотность клапана продувки'], ['Worn fuel cap gasket', 'Slightly leaking purge/vent valve']],
    [['Ventilyatsiya klapanini yopib tutun generatori bilan tekshiring'], ['Закройте дренажный клапан и подайте дым в систему'], ['Command vent valve closed and smoke-test EVAP lines']]
  ],
  ['P0443', 'emissions', 'low',
    ['EVAP purge (tozalash) klapani zanjiri xatosi', 'Неисправность цепи клапана продувки адсорбера', 'EVAP Purge Control Valve Circuit Malfunction'],
    [['Klapan g‘altagi kuygan', 'Sim uzilgan'], ['Обрыв обмотки клапана продувки', 'Повреждён провод'], ['Open purge solenoid coil', 'Damaged harness']],
    [['Klapan qarshiligi va +12V ni tekshiring'], ['Проверьте сопротивление соленоида и питание +12В'], ['Check purge solenoid resistance and 12V feed']]
  ],
  ['P0455', 'emissions', 'low',
    ['EVAP tizimida katta sizish aniqlangan', 'Обнаружена крупная утечка в системе EVAP', 'EVAP System Leak Detected (gross leak)'],
    [['Bak qopqog‘i umuman yopilmagan', 'Shlang chiqib ketgan'], ['Отсутствует/не закрыта крышка бака', 'Сорвало трубку EVAP'], ['Missing/open fuel cap', 'Disconnected vapor hose']],
    [['Bak qopqog‘i va magistral shlanglarni ko‘zdan kechiring'], ['Проверьте пробку бака и целостность магистралей'], ['Inspect fuel cap and major EVAP hoses']]
  ],
  ['P0500', 'sensors', 'medium',
    ['VSS (avtomobil tezligi) datchigi xatosi', 'Неисправность датчика скорости автомобиля (ДСА)', 'Vehicle Speed Sensor (VSS) Malfunction'],
    [['VSS datchigi yoki uzatma shesternyasi singan', 'ABS g‘ildirak datchigi xatosi'], ['Отказ датчика скорости', 'Сбой датчика АБС'], ['Faulty VSS or drive gear', 'ABS wheel speed signal fault']],
    [['Skanerda haydash vaqtida tezlik ko‘rsatishini tekshiring'], ['Проверьте отображение скорости в Live Data при движении'], ['Verify vehicle speed PID reads accurately while driving']]
  ],
  ['P0505', 'cooling_idle', 'medium',
    ['Salt yurishni boshqarish (IAC) tizimi xatosi', 'Неисправность системы управления холостым ходом (РХХ)', 'Idle Control System Malfunction'],
    [['IAC klapani qurum bilan qotib qolgan', 'Drossel kirlangan', 'Vakuum sizishi'], ['Заклинил регулятор ХХ', 'Грязный дроссель', 'Подсос воздуха'], ['Stuck IAC valve', 'Carbon-fouled throttle', 'Vacuum leak']],
    [['Drossel va IAC kanalini tozalang, klapan qadamini tekshiring'], ['Очистите дроссель и РХХ, проверьте шаги регулятора'], ['Clean throttle/IAC passages and verify idle target RPM']]
  ],
  ['P0506', 'cooling_idle', 'medium',
    ['Salt yurish aylanishlari kutilganidan past', 'Обороты холостого хода ниже заданных', 'Idle Control System RPM Lower Than Expected'],
    [['Drossel korpusi kuchli kirlangan', 'Generator yuklamasi haddan yuqori'], ['Сильно загрязнена дроссельная заслонка', 'Заклинивший компрессор/генератор'], ['Heavy carbon around throttle plate', 'Excessive belt accessory drag']],
    [['Drosselni yechib tozalang va adaptatsiyani tiklang'], ['Промойте дроссель и сбросьте адаптацию ХХ'], ['Clean throttle body and reset idle adaptation']]
  ],
  ['P0507', 'cooling_idle', 'medium',
    ['Salt yurish aylanishlari kutilganidan yuqori', 'Обороты холостого хода выше заданных', 'Idle Control System RPM Higher Than Expected'],
    [['Katta vakuum sizishi (ortiqcha havo)', 'Drossel qopqog‘i to‘liq yopilmayapti'], ['Крупный подсос воздуха во впуск', 'Подклинивает дроссель'], ['Large unmetered vacuum leak', 'Binding throttle plate']],
    [['Tutun generatori bilan havo so‘rish joyini toping'], ['Найдите подсос воздуха дымогенератором'], ['Smoke-test intake manifold and PCV hoses']]
  ],
  ['P0562', 'sensors', 'medium',
    ['Tizim kuchlanishi past (System Voltage Low)', 'Низкое напряжение бортовой сети', 'System Voltage Low'],
    [['Generator zaryad bermayapti', 'AKB o‘lib qolgan', 'Klemma oksidlangan'], ['Неисправен генератор', 'Разряжена АКБ', 'Окислены клеммы'], ['Failing alternator', 'Weak battery', 'Corroded terminals/grounds']],
    [['Dvigatel yoqilganda 13.8–14.5V borligini o‘lchang'], ['Замерьте напряжение зарядки на клеммах АКБ (13.8–14.5 В)'], ['Test charging voltage at battery and alternator B+ stud']]
  ],
  ['P0606', 'sensors', 'high',
    ['ECU / PCM ichki protsessor xatosi', 'Внутренняя ошибка процессора ЭБУ (ECM/PCM)', 'ECM/PCM Processor Fault'],
    [['ECU ta’minot kuchlanishi uzilib-uzilib kelmoqda', 'ECU plata shikastlanishi'], ['Плохое питание/масса ЭБУ', 'Внутренний дефект платы ЭБУ'], ['Unstable ECU power/ground', 'Internal ECM hardware fault']],
    [['ECU barcha +12V va massa pinlarini yuklama ostida tekshiring'], ['Проверьте все цепи питания и массы ЭБУ лампой-нагрузкой'], ['Load-test all ECU power and ground pins before replacing ECM']]
  ],
  ['P0011', 'sensors', 'high',
    ['A (Kiritish) taqsimlash vali fazasi haddan tashqari oldinlashgan', 'Слишком раннее положение распредвала впуска (Банк 1)', 'Camshaft Position A Timing Over-Advanced (Bank 1)'],
    [['VVT OCV moy klapani qotib qolgan', 'Dvigatel moyi kirlangan yoki sathi past', 'Fazoregulyator (VVT gear) nosoz'], ['Заклинил клапан OCV VVT', 'Грязное или низкий уровень масла', 'Износ муфты VVT'], ['Stuck VVT oil control valve', 'Low/sludged engine oil', 'Faulty cam phaser']],
    [['Moy sathi va sifatini tekshiring, OCV klapanini 12V bilan sinang'], ['Проверьте уровень масла и работу клапана OCV'], ['Check oil level/condition and bench-test OCV solenoid']]
  ],
  ['P0016', 'sensors', 'high',
    ['Tirsakli val va taqsimlash vali sinxronizatsiyasi buzilgan', 'Рассогласование сигналов ДПКВ и ДПРВ (Банк 1)', 'Crankshaft-Camshaft Position Correlation (Bank 1 Sensor A)'],
    [['GRM zanjiri cho‘zilgan yoki kamar 1–2 tishga sakragan', 'Taranglovchi ishdan chiqqan'], ['Растяжение цепи или перескок ремня ГРМ', 'Отказ гидронатяжителя'], ['Stretched timing chain or jumped belt', 'Failed tensioner']],
    [['CKP+CMP ossillogrammasini oling va GRM metkalarini tekshiring'], ['Сверьте осциллограмму ДПКВ+ДПРВ и метки ГРМ'], ['Verify mechanical timing marks and capture CKP/CMP correlation']]
  ],
  ['P0087', 'fuel_air', 'high',
    ['Yonilg‘i rampasi bosimi juda past (GDI/CRDi)', 'Слишком низкое давление в топливной рампе', 'Fuel Rail/System Pressure Too Low'],
    [['Past bosimli nasos (LPFP) zaif', 'Yonilg‘i filtri tiqilgan', 'TNVD (HPFP) yoki regulyator nosoz'], ['Слабый подкачивающий насос', 'Забитый топливный фильтр', 'Износ ТНВД или регулятора'], ['Weak low-pressure lift pump', 'Plugged fuel filter', 'Failing HPFP or regulator']],
    [['Avval past bosimli kontur bosimini (4–5 bar) o‘lchang'], ['Сначала замерьте давление в контуре низкого давления'], ['Verify low-side supply pressure before condemning HPFP']]
  ],
  ['P0088', 'fuel_air', 'high',
    ['Yonilg‘i rampasi bosimi juda yuqori', 'Слишком высокое давление в топливной рампе', 'Fuel Rail/System Pressure Too High'],
    [['Bosim regulyator klapani yopiq qotgan', 'FRP datchigi noto‘g‘ri ko‘rsatmoqda'], ['Заклинил регулятор давления', 'Врёт датчик давления в рампе'], ['Stuck fuel pressure regulator', 'Skewed FRP sensor']],
    [['Qaytish liniyasi tiqilmaganini va regulyator boshqaruvini tekshiring'], ['Проверьте обратку и сигнал управления регулятором'], ['Inspect fuel return line restriction and regulator PWM control']]
  ],
  ['P0234', 'fuel_air', 'high',
    ['Turbo kompressor bosimi me’yordan oshib ketdi (Overboost)', 'Превышение давления наддува турбины (Передув)', 'Turbocharger/Supercharger Overboost Condition'],
    [['Wastegate yoki VNT geometriyasi qotib qolgan', 'N75 bosim klapani nosoz'], ['Заклинила геометрия турбины / вестгейт', 'Неисправен клапан N75'], ['Seized wastegate or VNT vanes', 'Faulty boost control solenoid']],
    [['Wastegate shtogi qo‘lda erkin harakatlanishini tekshiring'], ['Проверьте ход штока актуатора турбины вакуумом'], ['Verify wastegate actuator rod movement with vacuum/pressure pump']]
  ],
  ['P0299', 'fuel_air', 'high',
    ['Turbo kompressor bosimi yetarli emas (Underboost)', 'Недодув турбокомпрессора', 'Turbocharger/Supercharger Underboost Condition'],
    [['Interkuler shlangi yorilgan', 'Vakuum trubkasi chiqib ketgan', 'Turbina valikda lyuft'], ['Трещина патрубка интеркулера', 'Утечка вакуума управления', 'Износ турбины'], ['Split intercooler charge pipe', 'Vacuum leak to actuator', 'Worn turbocharger']],
    [['Kiritish traktini bosim ostida (Boost Leak Test) tekshiring'], ['Опрессуйте впускной тракт дымом под давлением'], ['Pressure-test charge pipes and intercooler for boost leaks']]
  ],
  ['P0700', 'transmission', 'medium',
    ['Avtomat uzatma boshqaruv bloki (TCM) xato qayd etdi', 'Запрос индикации ошибки от блока АКПП (TCM)', 'Transmission Control System Malfunction (MIL Request)'],
    [['TCM da saqlangan ichki uzatma xatosi mavjud'], ['В памяти блока АКПП записан конкретный код ошибки'], ['Stored transmission DTC inside TCM']],
    [['TCM (Transmission) modulini skaner bilan alohida o‘qing'], ['Подключитесь сканером непосредственно к блоку АКПП (TCM)'], ['Scan the TCM module directly to retrieve specific P07xx/P17xx codes']]
  ],
  ['P0715', 'transmission', 'high',
    ['AKPP kirish vali tezlik datchigi (ISS) xatosi', 'Неисправность цепи датчика входных оборотов АКПП', 'Input/Turbine Speed Sensor Circuit Malfunction'],
    [['ISS datchigi ishdan chiqqan', 'Simda qisqa tutashuv'], ['Отказ датчика входного вала', 'Повреждение проводки'], ['Failed turbine speed sensor', 'Harness fault']],
    [['Datchik qarshiligi va AKPP moyidagi metall qirindisini tekshiring'], ['Проверьте сопротивление датчика и чистоту масла АКПП'], ['Test sensor resistance/signal and inspect ATF condition']]
  ],
];

export const SEED_DTC_CODES: DtcCode[] = RAW_DTC_LIST.map(([code, system, severity, meaning, causes, checks]) => ({
  code,
  system,
  severity,
  meaning: { uz: meaning[0], ru: meaning[1], en: meaning[2] },
  causes: { uz: causes[0], ru: causes[1], en: causes[2] },
  checks: { uz: checks[0], ru: checks[1], en: checks[2] },
}));
