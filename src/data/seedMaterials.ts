import { EBook, Presentation } from '../types';

export const SEED_EBOOKS: EBook[] = [
  {
    id: 'book_1',
    title: {
      uz: "OBD-II va Dvigatel Boshqaruv Tizimlari Diagnostikasi",
      ru: 'Диагностика систем управления двигателем и OBD-II',
      en: 'Engine Management Systems & OBD-II Diagnostics Manual',
    },
    author: 'Rustam Karimov',
    category: 'diagnostics',
    language: 'all',
    pages: 84,
    sizeLabel: '2.4 MB PDF',
    coverUrl: '/src/assets/images/ebook_cover_diagnostics_1794929842391.jpg',
    tags: ['OBD-II', 'Fuel Trim', 'DTC', 'ECU'],
    summary: {
      uz: "Zamonaviy benzinli va dizel dvigatellarning elektron boshqaruv bloklari (ECU), yonilg'i korreksiyalari va skaner parametrlarini chuqur tahlil qilish bo'yicha amaliy qo'llanma.",
      ru: 'Практическое руководство по анализу параметров ЭБУ, топливных коррекций STFT/LTFT, стоп-кадра и протоколов OBD-II.',
      en: 'Comprehensive field handbook covering ECU control loops, short/long-term fuel trims, Freeze Frame diagnostics, and scan-tool workflows.',
    },
    chapters: {
      uz: [
        {
          heading: 'OBD-II arxitekturasi va monitoring sikllari',
          body: "OBD-II standarti chiqindi gazlar tarkibini nazorat qiluvchi uzluksiz va uzlukli monitorlarga asoslanadi. Misfire va Fuel System monitorlari doimiy ishlaydi, Katalizator (P0420) va EVAP esa ma'lum harorat va tezlik sharoitida (Drive Cycle) tekshiriladi. Skaner orqali Readiness Monitor holatini tekshirish nosozlikni ta'mirdan keyin tasdiqlash uchun shart.",
        },
        {
          heading: "STFT va LTFT yonilg'i korreksiyalari diagnostikasi",
          body: "Qisqa muddatli (STFT) va uzoq muddatli (LTFT) korreksiyalar -10% dan +10% gacha me'yoriy hisoblanadi. Agar jami korreksiya +15% dan yuqori bo'lsa, aralashma kambag'al (Lean). Salt yurishda yuqori bo'lib, 2500 ayl/min da pasaysa — vakuum shlanglari yoki kiritish kollektori qistirmasidan havo so'rilmoqda.",
        },
        {
          heading: 'Freeze Frame (muzlatilgan kadr) ma’lumotlarini o‘qish',
          body: "Xato kodi (DTC) yozilgan lahzadagi RPM, sovutish suyuqligi harorati (ECT), yuklama (Load) va avtomobil tezligi saqlanadi. Bu diagnostika ustasiga nosozlik sovuq dvigatelda yoki yuqori yuklamada yuz berganini aniq ko'rsatadi.",
        },
      ],
      ru: [
        {
          heading: 'Архитектура OBD-II и мониторы готовности',
          body: 'Стандарт OBD-II делит проверки на непрерывные (пропуски воспламенения, топливная система) и периодические (катализатор, система EVAP). Анализ статуса Readiness Monitors позволяет убедиться, что ЭБУ успешно завершил самотестирование после ремонта.',
        },
        {
          heading: 'Топливные коррекции STFT и LTFT на практике',
          body: 'Суммарная коррекция в пределах ±10% считается нормой. Уход в глубокий плюс (+15% и выше) указывает на обеднение смеси. Если на холостом ходу коррекция +20%, а на 2500 об/мин падает до +3%, ищите подсос неучтённого воздуха во впуске.',
        },
        {
          heading: 'Анализ стоп-кадра (Freeze Frame)',
          body: 'Стоп-кадр фиксирует обороты, температуру ОЖ, нагрузку и скорость в момент появления ошибки. Это позволяет воспроизвести точные условия проявления плавающей неисправности.',
        },
      ],
      en: [
        {
          heading: 'OBD-II Architecture & Readiness Monitors',
          body: 'OBD-II categorizes self-tests into continuous monitors (misfire, fuel system, comprehensive components) and non-continuous monitors (catalyst, O2 heater, EVAP). Verifying monitor completion confirms a repair before returning the vehicle.',
        },
        {
          heading: 'Interpreting STFT & LTFT Fuel Trims',
          body: 'Combined fuel trims within ±10% represent healthy stoichiometric control. Positive trims exceeding +15% indicate the ECU is adding fuel to compensate for a lean condition. High positive idle trims that normalize at 2,500 RPM point directly to an intake vacuum leak.',
        },
        {
          heading: 'Leveraging Freeze Frame Snapshots',
          body: 'Freeze Frame captures engine RPM, coolant temperature, calculated load, and vehicle speed at the exact instant a DTC sets, enabling technicians to reproduce intermittent faults accurately.',
        },
      ],
    },
    published: true,
    createdAt: '2026-09-02T10:00:00.000Z',
  },
  {
    id: 'book_2',
    title: {
      uz: 'Kompressiya, Vakuum va Germetiklik Testlari',
      ru: 'Компрессия, вакуумная диагностика и пневмотест ДВС',
      en: 'Mechanical Engine Testing: Compression, Vacuum & Leak-Down',
    },
    author: 'Rustam Karimov',
    category: 'diagnostics',
    language: 'all',
    pages: 62,
    sizeLabel: '1.9 MB PDF',
    coverUrl: '/src/assets/images/ebook_cover_diagnostics_1794929842391.jpg',
    tags: ['Compression', 'Leak-Down', 'Vacuum', 'Valves'],
    summary: {
      uz: "Silindr-porshen guruhi va klapanlar holatini dvigatelni ochmasdan aniq baholash usullari.",
      ru: 'Методики безразборной оценки состояния ЦПГ, клапанов и прокладки головки блока цилиндров.',
      en: 'Non-invasive mechanical testing protocols for evaluating piston rings, valves, and cylinder head gasket integrity.',
    },
    chapters: {
      uz: [
        {
          heading: 'Quruq va moyli kompressiya o‘lchash qoidalari',
          body: "O'lchashdan oldin dvigatel ishchi haroratgacha (85–90°C) qizdiriladi, barcha uchqun shamlari yechiladi va drossel to'liq ochiladi. Agar quruq testda bir silindr 8.0 bar ko'rsatsa va 5 ml moy quyilganda 11.5 bar ga ko'tarilsa — muammo porshen halqalarida.",
        },
        {
          heading: 'Vakuummetr ko‘rsatkichlarini o‘qish',
          body: "Barqaror 55–70 kPa vakuum me'yordir. Strelkaning ritmik tebranishi klapan kuyishini, past barqaror ko'rsatkich esa GRM fazasi kechikishini bildiradi.",
        },
      ],
      ru: [
        {
          heading: 'Правила сухого и масляного замера компрессии',
          body: 'Замер выполняется на прогретом двигателе (85–90 °C) при выкрученных свечах и полностью открытом дросселе. Повышение давления после добавления 5 мл моторного масла подтверждает износ поршневых колец.',
        },
        {
          heading: 'Диагностика по показаниям вакуумметра',
          body: 'Ровная стрелка на отметке -60…-70 кПа говорит об исправной механике. Регулярные провалы стрелки указывают на подгоревший или негерметичный клапан.',
        },
      ],
      en: [
        {
          heading: 'Dry vs. Wet Compression Procedure',
          body: 'Test at normal operating temperature with all spark plugs removed, fuel/ignition disabled, and throttle held wide open. A pressure increase after adding 5 mL of engine oil confirms worn piston rings rather than leaking valves.',
        },
        {
          heading: 'Reading Intake Manifold Vacuum',
          body: 'A steady needle at 17–21 inHg indicates healthy sealing. A rhythmic drop points to a burned valve, while a steady low reading signals retarded valve timing or exhaust restriction.',
        },
      ],
    },
    published: true,
    createdAt: '2026-09-15T11:00:00.000Z',
  },
  {
    id: 'book_3',
    title: {
      uz: "Avtomobil Datchiklari va Ossillografiya Qo'llanmasi",
      ru: 'Справочник по датчикам ДВС и осциллографии',
      en: 'Automotive Sensors & Waveform Reference Guide',
    },
    author: 'Jasur Abdullayev',
    category: 'electrical',
    language: 'all',
    pages: 96,
    sizeLabel: '3.1 MB PDF',
    coverUrl: '/src/assets/images/ebook_cover_diagnostics_1794929842391.jpg',
    tags: ['CKP', 'CMP', 'MAF', 'O2 Sensor', 'Oscilloscope'],
    summary: {
      uz: "MAF, MAP, TPS, CKP, CMP, O2 va detonatsiya datchiklarining ishlash prinsiplari, pinout sxemalari va etalon signallari.",
      ru: 'Принципы работы, распиновка и эталонные осциллограммы датчиков ДМРВ, ДАД, ДПКВ, ДПРВ, ДД и лямбда-зонда.',
      en: 'Working principles, voltage specifications, and reference waveforms for MAF, MAP, CKP, CMP, Knock, and Lambda sensors.',
    },
    chapters: {
      uz: [
        {
          heading: 'Xoll va induktiv datchiklar farqi',
          body: "Induktiv datchik 2 simli bo'lib, dvigatel aylanish tezligiga qarab amplitudasi oshuvchi o'zgaruvchan tok beradi. Xoll datchigi 3 simli (+5V/+12V, massa, signal) bo'lib, aniq 0–5V to'g'ri burchakli impuls hosil qiladi.",
        },
        {
          heading: "Keng polosali (Wideband) va sirkoniy O2 datchiklari",
          body: "An'anaviy sirkoniy zond 0.1V dan 0.9V gacha sakrab ishlaydi (stexiometriya 14.7:1). Keng polosali AFR datchigi esa tok o'zgarishi orqali boy va kambag'al aralashmani aniq o'lchaydi.",
        },
      ],
      ru: [
        {
          heading: 'Отличия индуктивных датчиков и датчиков Холла',
          body: 'Индуктивный датчик имеет 2 вывода и генерирует синусоиду, амплитуда которой растёт с оборотами. Датчик Холла требует питания (3 вывода) и формирует чёткий меандр 0–5 В.',
        },
        {
          heading: 'Узкополосные и широкополосные датчики кислорода',
          body: 'Циркониевый датчик переключается в диапазоне 0.1–0.9 В вокруг стехиометрии 14.7:1. Широкополосный зонд (LAF/AFR) линейно измеряет состав смеси в широких пределах.',
        },
      ],
      en: [
        {
          heading: 'Inductive vs. Hall-Effect Crank & Cam Sensors',
          body: 'Two-wire inductive sensors generate AC sine waves whose amplitude increases with RPM. Three-wire Hall-effect sensors require a supply voltage and output crisp 0–5V square pulses at any cranking speed.',
        },
        {
          heading: 'Narrowband vs. Wideband Oxygen Sensors',
          body: 'Traditional zirconia sensors switch rapidly between 0.1V (lean) and 0.9V (rich) around 14.7:1 AFR. Wideband sensors use a pumping cell to measure exact lambda across rich and lean conditions.',
        },
      ],
    },
    published: true,
    createdAt: '2026-10-01T09:30:00.000Z',
  },
  {
    id: 'book_4',
    title: {
      uz: "Texnik Xizmat Ko'rsatish (TXK) va Reglament Jadvallari",
      ru: 'Регламент технического обслуживания и расходные материалы',
      en: 'Preventive Engine Maintenance & Fluid Specifications',
    },
    author: 'Rustam Karimov',
    category: 'maintenance',
    language: 'all',
    pages: 54,
    sizeLabel: '1.6 MB PDF',
    coverUrl: '/src/assets/images/ebook_cover_maintenance_1794929843380.jpg',
    tags: ['Oil', 'Timing Belt', 'Coolant', 'Service'],
    summary: {
      uz: "Motor moylari, GRM kamarlari, uchqun shamlari, antifriz va filtrlarning almashtirish intervallari hamda moment (torque) jadvallari.",
      ru: 'Интервалы замены масел, ремня ГРМ, свечей, антифриза и таблицы моментов затяжки резьбовых соединений.',
      en: 'Service interval schedules for engine oil, timing belts, spark plugs, coolant, and critical fastener torque specifications.',
    },
    chapters: {
      uz: [
        {
          heading: "API va ACEA motor moyi standartlari",
          body: "API SP zamonaviy benzinli dvigatellar uchun LSPI himoyasini ta'minlaydi. ACEA C3/C5 esa DPF va uch komponentli katalizatorlar uchun kam kulli (Low SAPS) talablarga javob beradi.",
        },
        {
          heading: 'GRM kamari va roliklarni almashtirish',
          body: "Kamar rezinasida mayda yoriqlar yoki yog' izlari ko'rinsa, belgilangan 60 000–90 000 km muddatdan oldin ham almashtirish shart. Har doim nasos (pompa) va taranglovchi rolik bilan kompleks yangilanadi.",
        },
      ],
      ru: [
        {
          heading: 'Стандарты моторных масел API и ACEA',
          body: 'Спецификация API SP защищает турбомоторы GDI от эффекта LSPI. Допуски ACEA C3/C5 регламентируют низкую зольность (Low SAPS) для сохранности катализаторов и сажевых фильтров.',
        },
        {
          heading: 'Контроль и замена привода ГРМ',
          body: 'Ремень ГРМ меняется каждые 60 000–90 000 км в комплекте с натяжным и обводным роликами, а также водяным насосом при его приводе от ремня.',
        },
      ],
      en: [
        {
          heading: 'Motor Oil Classifications (API / ACEA)',
          body: 'API SP oils protect modern direct-injected turbocharged engines against low-speed pre-ignition (LSPI). ACEA C-series oils provide low-ash protection for catalytic converters and particulate filters.',
        },
        {
          heading: 'Timing Belt & Tensioner Replacement',
          body: 'Replace timing belts every 60,000–90,000 km (or 5–6 years) together with idler pulleys, tensioner, and timing-driven water pump to prevent catastrophic valve-to-piston contact.',
        },
      ],
    },
    published: true,
    createdAt: '2026-10-12T12:00:00.000Z',
  },
  {
    id: 'book_5',
    title: {
      uz: "GDI va Common Rail Dizel Injektorlari Tahlili",
      ru: 'Диагностика систем прямого впрыска GDI и Common Rail',
      en: 'Direct Injection (GDI) & Common Rail Diagnostics',
    },
    author: 'Alisher Normatov',
    category: 'diagnostics',
    language: 'all',
    pages: 72,
    sizeLabel: '2.2 MB PDF',
    coverUrl: '/src/assets/images/ebook_cover_diagnostics_1794929842391.jpg',
    tags: ['GDI', 'HPFP', 'Common Rail', 'Injectors'],
    summary: {
      uz: "Yuqori bosimli yonilg'i nasoslari (TNVD/HPFP), piezo-injektorlar va kirish klapanlaridagi uglerod qatlamini diagnostika qilish.",
      ru: 'Проверка ТНВД высокого давления, пьезофорсунок, регуляторов давления и нагара на впускных клапанах GDI.',
      en: 'Testing high-pressure fuel pumps (HPFP), rail pressure regulators, piezo injectors, and GDI intake valve carbon buildup.',
    },
    chapters: {
      uz: [
        {
          heading: 'GDI yuqori bosim konturi (35–200 bar)',
          body: "Past bosimli nasos (LPFP) yuqori bosimli mexanik nasosga 4–5 bar bosim yetkazib beradi. P0087 xatosi odatda filtr tiqilishi, LPFP kuchsizlanishi yoki HPFP plunjeri yeyilishidan kelib chiqadi.",
        },
      ],
      ru: [
        {
          heading: 'Контур высокого давления GDI (35–200 бар)',
          body: 'Насос низкого давления (LPFP) подаёт топливо (4–5 бар) на механический ТНВД. Ошибка P0087 часто связана с падением подачи подкачивающего насоса или износом регулятора.',
        },
      ],
      en: [
        {
          heading: 'High-Pressure Fuel Rail Testing (35–200 bar)',
          body: 'Always verify low-side supply pressure (4–5 bar) before condemning a high-pressure pump. Code P0087 frequently originates from a restricted fuel filter or failing low-pressure lift pump.',
        },
      ],
    },
    published: true,
    createdAt: '2026-10-20T15:00:00.000Z',
  },
  {
    id: 'book_6',
    title: {
      uz: "Kuchlanish Tushishi (Voltage Drop) va Massa Tekshiruvi",
      ru: 'Поиск падения напряжения и проверка масс автомобиля',
      en: 'Electrical Voltage Drop Testing & Ground Integrity',
    },
    author: 'Jasur Abdullayev',
    category: 'reference',
    language: 'all',
    pages: 48,
    sizeLabel: '1.4 MB PDF',
    coverUrl: '/src/assets/images/ebook_cover_maintenance_1794929843380.jpg',
    tags: ['Multimeter', 'Voltage Drop', 'Grounds', 'Starter'],
    summary: {
      uz: "Multimetr yordamida yuklama ostida kontaktlar, akkumulyator kabellari va ECU massalaridagi yashirin qarshilikni topish.",
      ru: 'Поиск плохих контактов и окисленных масс мультиметром под нагрузкой без снятия жгутов.',
      en: 'Dynamic voltage drop testing under load to pinpoint corroded starter cables, relays, and ECU ground straps.',
    },
    chapters: {
      uz: [
        {
          heading: 'Nima uchun ohmmetr o‘rniga kuchlanish tushishi o‘lchanadi?',
          body: "Bitta yupqa mis tola ham 0.2 Ohm ko'rsatishi mumkin, ammo starter toki o'tganda 4V kuchlanishni yo'qotadi. Yuklama ostida 0.2V dan kam tushish me'yor hisoblanadi.",
        },
      ],
      ru: [
        {
          heading: 'Почему падение напряжения точнее омметра',
          body: 'Окисленный провод с одной целой жилой покажет 0.2 Ом без нагрузки, но потеряет 4 В при пуске стартера. Нормальное падение напряжения под нагрузкой — не более 0.2 В.',
        },
      ],
      en: [
        {
          heading: 'Why Voltage Drop Beats Resistance Checks',
          body: 'A single intact copper strand can measure 0.2 ohms static resistance yet drop 4 volts under starter load. Always test active circuits under load; healthy voltage drop should stay below 0.2V.',
        },
      ],
    },
    published: true,
    createdAt: '2026-11-01T10:00:00.000Z',
  },
];

export const SEED_PRESENTATIONS: Presentation[] = [
  {
    id: 'pres_1',
    title: {
      uz: "To'rt taktli Dvigatel Termodinamikasi va Vakuum Tahlili",
      ru: 'Термодинамика 4-тактного ДВС и вакуумный анализ',
      en: 'Four-Stroke Engine Cycle & Manifold Vacuum Diagnostics',
    },
    description: {
      uz: "Har bir taktda klapanlar ochilish burchaklari va kiritish kollektori bosim egri chiziqlari.",
      ru: 'Фазы газораспределения и диагностика механики по разрежению на впуске.',
      en: 'Valve timing events, intake vacuum signatures, and mechanical diagnostic patterns.',
    },
    moduleRef: 'Module 1',
    author: 'Rustam Karimov',
    published: true,
    createdAt: '2026-09-12T08:00:00.000Z',
    slides: [
      {
        id: 's1_1',
        title: {
          uz: '1-takt va 2-takt: Kiritish va Siqish',
          ru: 'Такты впуска и сжатия',
          en: 'Intake & Compression Strokes',
        },
        bullets: {
          uz: [
            'Kiritish takti: porshen YMN dan PMN ga tushadi, vakuum havo-yonilg‘i aralashmasini tortadi.',
            'Siqish takti: ikkala klapan yopiq, siqish darajasi 9.5:1 – 11.5:1 (benzin).',
            'Siqish oxirida harorat 350–450°C ga yetadi.',
          ],
          ru: [
            'Такт впуска: поршень движется к НМТ, создавая разрежение -60…-70 кПа.',
            'Такт сжатия: оба клапана закрыты, степень сжатия 9.5:1 – 11.5:1 (бензин).',
            'Температура заряда к концу сжатия достигает 350–450 °C.',
          ],
          en: [
            'Intake stroke: Piston descends from TDC to BDC, creating -60 to -70 kPa manifold vacuum.',
            'Compression stroke: Both valves sealed; typical gasoline compression ratio 9.5:1 – 11.5:1.',
            'Air-fuel charge reaches 350–450°C prior to spark event.',
          ],
        },
        notes: {
          uz: "Talabalarga kiritish klapanining BDC dan keyin biroz kech yopilish sababini (inersiya to'ldirish) tushuntiring.",
          ru: 'Обратите внимание студентов на запаздывание закрытия впускного клапана после НМТ для дозарядки цилиндра.',
          en: 'Explain why the intake valve closes slightly after BDC to leverage airflow inertia at higher RPM.',
        },
        diagramType: 'four-stroke',
      },
      {
        id: 's1_2',
        title: {
          uz: "3-takt va 4-takt: Ish yo'li va Chiqarish",
          ru: 'Рабочий ход и выпуск отработавших газов',
          en: 'Power & Exhaust Strokes',
        },
        bullets: {
          uz: [
            'O‘t oldirish ilgarilash burchagi (Ignition Advance): YMN dan 10°–35° oldin.',
            'Yonish bosimi cho‘qqisi: 40–65 bar, YMN dan 12°–15° keyin.',
            'Chiqarish klapani PMN dan oldinroq ochilib gazlarni tez chiqaradi.',
          ],
          ru: [
            'Угол опережения зажигания (УОЗ): 10°–35° до ВМТ в зависимости от нагрузки.',
            'Пиковое давление сгорания: 40–65 бар через 12°–15° после ВМТ.',
            'Предварительное открытие выпускного клапана снижает потери на такте выпуска.',
          ],
          en: [
            'Ignition spark fires 10°–35° BTDC depending on engine RPM and load.',
            'Peak combustion cylinder pressure (40–65 bar) occurs 12°–15° ATDC for maximum crank leverage.',
            'Exhaust valve opens before BDC to blow down cylinder pressure prior to upward piston travel.',
          ],
        },
        notes: {
          uz: "Detonatsiya paytida bosim cho'qqisi YMN ga juda yaqin va keskin ko'tarilishini ta'kidlang.",
          ru: 'Подчеркните, что при детонации пик давления смещается к ВМТ с опасными ударными волнами.',
          en: 'Contrast normal controlled flame front propagation with knock/detonation shock waves.',
        },
        diagramType: 'four-stroke',
      },
      {
        id: 's1_3',
        title: {
          uz: 'GRM sinxronizatsiyasi va vakuum xulosalari',
          ru: 'Фазы ГРМ и диагностика по вакуумметру',
          en: 'Valvetrain Timing & Vacuum Diagnostics',
        },
        bullets: {
          uz: [
            'Barqaror vakuum (18–21 inHg): klapanlar va halqalar germetik.',
            'Kechikkan faza (1 tish siljish): past va barqaror vakuum (12–15 inHg).',
            'Katalizator tiqilishi: gaz berilganda vakuum nolga tushib ketadi.',
          ],
          ru: [
            'Ровный вакуум 18–21 inHg: механика цилиндров в норме.',
            'Смещение ремня ГРМ: стабильно низкое разрежение (12–15 inHg).',
            'Забитый катализатор: падение разрежения к нулю при удержании 2500 об/мин.',
          ],
          en: [
            'Steady 18–21 inHg at idle confirms healthy sealing and valve timing.',
            'Retarded cam timing produces a steady but abnormally low vacuum (12–15 inHg).',
            'Restricted exhaust/catalyst causes vacuum to steadily drop toward zero at 2,500 RPM.',
          ],
        },
        notes: {
          uz: "Katalizator tiqilishini vakuummetr bilan 1 daqiqada aniqlash usulini ko'rsating.",
          ru: 'Покажите экспресс-тест противодавления выхлопа с помощью вакуумметра.',
          en: 'Demonstrate the 2,500 RPM steady-throttle exhaust backpressure test using a vacuum gauge.',
        },
        diagramType: 'timing-belt',
      },
    ],
  },
  {
    id: 'pres_2',
    title: {
      uz: "O't Oldirish Tizimi va Ikkilamchi Ossillogrammalar",
      ru: 'Система зажигания и вторичные осциллограммы',
      en: 'Secondary Ignition Waveforms & Misfire Analysis',
    },
    description: {
      uz: "COP g'altaklarining yonish chizig'i (burn line), tebranishlar va izolyatsiya teshilishini o'qish.",
      ru: 'Чтение линии горения искры, затухающих колебаний и пробоя изоляции на осциллографе.',
      en: 'Reading firing kV spikes, spark burn duration, coil oscillations, and misfire signatures.',
    },
    moduleRef: 'Module 2 & 5',
    author: 'Rustam Karimov',
    published: true,
    createdAt: '2026-09-25T10:00:00.000Z',
    slides: [
      {
        id: 's2_1',
        title: {
          uz: 'Birlamchi zanjir (Dwell) va uchqun hosil bo‘lishi',
          ru: 'Накопление энергии (Dwell) и пробой искрового промежутка',
          en: 'Coil Dwell & Spark Breakdown Voltage',
        },
        bullets: {
          uz: [
            'Dwell vaqti (2.5–3.8 ms): g‘altakda magnit maydon yig‘ilish davri.',
            'Teshish kuchlanishi (Firing kV): me’yorda 8–15 kV.',
            'Yonish davomiyligi (Burn time): 1.0–1.8 ms barqaror tekis chiziq.',
          ],
          ru: [
            'Время накопления (Dwell): 2.5–3.8 мс — насыщение первичной обмотки.',
            'Напряжение пробоя: в норме 8–15 кВ на холостом ходу.',
            'Время горения искры: 1.0–1.8 мс при стабильном напряжении горения ~1.2 кВ.',
          ],
          en: [
            'Dwell phase (2.5–3.8 ms): ECU grounds primary coil winding to saturate magnetic field.',
            'Firing line spike: normally 8–15 kV at idle depending on gap and compression.',
            'Spark burn line: 1.0–1.8 ms duration around 1.0–1.5 kV.',
          ],
        },
        notes: {
          uz: "G'altak oxiridagi 3-4 ta so'nuvchi tebranish (ringing) o'ramlar qisqa tutashmaganligini bildiradi.",
          ru: 'Наличие 3–4 затухающих колебаний после горения подтверждает отсутствие межвиткового замыкания.',
          en: 'Point out the 3–4 damped oscillation waves after burn extinction—absence indicates shorted coil windings.',
        },
        diagramType: 'ignition-wave',
      },
      {
        id: 's2_2',
        title: {
          uz: 'Ossillogrammada uchraydigan asosiy nosozliklar',
          ru: 'Типовые дефекты на вторичной осциллограмме',
          en: 'Diagnosing Faults from Spark Waveforms',
        },
        bullets: {
          uz: [
            'Juda yuqori kV + qisqa yonish: sham zazori katta yoki kambag‘al aralashma.',
            'Past kV + uzun yonish: sham ifloslangan (nam) yoki g‘altak rezinkasi teshilgan.',
            'Yonish oxirida tebranish yo‘q: g‘altakda ichki qisqa tutashuv.',
          ],
          ru: [
            'Высокий пробой + короткое горение: большой зазор свечи, обрыв провода или бедная смесь.',
            'Низкий пробой + затянутое горение: пробой наконечника или забрызганная свеча.',
            'Отсутствие затухающих колебаний: межвитковое замыкание в катушке.',
          ],
          en: [
            'High firing kV + short burn time: excessive plug gap, open plug wire, or lean mixture.',
            'Low firing kV + sloped/short burn: carbon-tracked boot or fouled spark plug.',
            'Zero post-burn oscillations: internal secondary winding short inside the coil.',
          ],
        },
        notes: {
          uz: "Snap-throttle (keskin gaz berish) testida kV ko'tarilishi g'altak zaifligini darhol ko'rsatadi.",
          ru: 'Тест резкой перегазовки (Snap Throttle) создаёт максимальное сопротивление пробою в цилиндре.',
          en: 'Explain how a snap-throttle test stresses coil insulation under peak cylinder pressure.',
        },
        diagramType: 'ignition-wave',
      },
    ],
  },
  {
    id: 'pres_3',
    title: {
      uz: "OBD-II Yonilg'i Korreksiyalari (STFT/LTFT) Algoritmi",
      ru: 'Алгоритм диагностики по топливным коррекциям STFT/LTFT',
      en: 'OBD-II Fuel Trim Diagnostic Matrix',
    },
    description: {
      uz: "P0171 va P0172 kodlarini skaner ma'lumotlari bilan tezkor hal qilish sxemasi.",
      ru: 'Матрица поиска причин ошибок P0171 (бедная смесь) и P0172 (богатая смесь).',
      en: 'Step-by-step diagnostic matrix for resolving P0171 lean and P0172 rich codes.',
    },
    moduleRef: 'Module 3',
    author: 'Rustam Karimov',
    published: true,
    createdAt: '2026-10-08T14:00:00.000Z',
    slides: [
      {
        id: 's3_1',
        title: {
          uz: 'Yopiq kontur (Closed Loop) va Stexiometriya 14.7:1',
          ru: 'Замкнутый цикл (Closed Loop) и стехиометрия 14.7:1',
          en: 'Closed-Loop Fuel Control & Stoichiometry',
        },
        bullets: {
          uz: [
            'Open Loop: sovuq startda va to‘liq gazda (WOT) O2 datchigi hisobga olinmaydi.',
            'Closed Loop: ECU O2 signali asosida injektor impulsini STFT orqali boshqaradi.',
            'Total Fuel Trim = STFT + LTFT (me’yori: -8% dan +8% gacha).',
          ],
          ru: [
            'Open Loop: холодный пуск и полная нагрузка — смесь задаётся по картам без ДК.',
            'Closed Loop: ЭБУ корректирует время впрыска по сигналу первого лямбда-зонда.',
            'Суммарная коррекция = STFT + LTFT (норма в пределах ±8%).',
          ],
          en: [
            'Open Loop: Cold start and WOT rely on base volumetric maps without O2 feedback.',
            'Closed Loop: ECU continuously adjusts injector pulse width via STFT using upstream O2 feedback.',
            'Total Fuel Trim = STFT + LTFT (healthy target: within ±8%).',
          ],
        },
        notes: {
          uz: "Har doim diagnostikadan oldin dvigatel Closed Loop rejimiga o'tganini tekshiring.",
          ru: 'Всегда проверяйте статус Fuel System Status: Closed Loop перед оценкой коррекций.',
          en: 'Always confirm Fuel System Status is Closed Loop before evaluating trim numbers.',
        },
        diagramType: 'fuel-trim',
      },
      {
        id: 's3_2',
        title: {
          uz: 'P0171 (Kambag‘al aralashma) tekshirish matritsasi',
          ru: 'Матрица проверки ошибки P0171 (бедная смесь)',
          en: 'P0171 Lean Condition Decision Matrix',
        },
        bullets: {
          uz: [
            'Salt yurishda +20%, 2500 ayl/min da +2% → Vakuum sizishi (tutun generatori bilan tekshiring).',
            'Salt yurishda +5%, 2500 ayl/min da +22% → Yonilg‘i bosimi past yoki MAF kirlangan.',
            'Ikkala rejimda +18% → O2 datchigi sekinlashgan yoki egzozda teshik bor.',
          ],
          ru: [
            'На ХХ +20%, на 2500 об/мин +2% → Подсос воздуха (проверка дымогенератором).',
            'На ХХ +5%, на 2500 об/мин +22% → Низкое давление топлива или загрязнён ДМРВ.',
            'Одинаковый плюс на всех оборотах → Утечка до первого ДК или ложный сигнал лямбды.',
          ],
          en: [
            '+20% at idle, +2% at 2,500 RPM → Vacuum leak (verify with smoke machine).',
            '+5% at idle, +22% at 2,500 RPM → Weak fuel pump, restricted filter, or dirty MAF.',
            '+18% across all RPMs → Exhaust leak before B1S1 O2 sensor or skewed sensor.',
          ],
        },
        notes: {
          uz: "Smoke machine (tutun generatori) vakuum sizishini topishning eng tezkor usulidir.",
          ru: 'Дымогенератор выявляет негерметичность впуска за 2 минуты.',
          en: 'Smoke testing the intake tract under 1 psi quickly reveals hairline vacuum leaks.',
        },
        diagramType: 'obd-architecture',
      },
    ],
  },
  {
    id: 'pres_4',
    title: {
      uz: 'Kompressiya va Leak-Down Natijalarini Talqin Qilish',
      ru: 'Интерпретация замеров компрессии и пневмотеста',
      en: 'Interpreting Compression & Leak-Down Data',
    },
    description: {
      uz: "Mexanik nosozliklarni (halqa, klapan, prokladka) aniq ajratish sxemasi.",
      ru: 'Локализация механических дефектов без разборки двигателя.',
      en: 'Isolating ring wear, burnt valves, and blown head gaskets accurately.',
    },
    moduleRef: 'Module 4',
    author: 'Rustam Karimov',
    published: true,
    createdAt: '2026-10-22T11:30:00.000Z',
    slides: [
      {
        id: 's4_1',
        title: {
          uz: 'Kompressiya me’yorlari va farq koeffitsienti',
          ru: 'Нормы компрессии и допустимый разброс',
          en: 'Compression Standards & Variance Thresholds',
        },
        bullets: {
          uz: [
            'Benzinli DVS me’yori: 11–14 bar (dvigatel siqish darajasiga qarab).',
            'Maksimal farq: eng yuqori va eng past silindr orasida ≤ 10–15%.',
            'Qo‘shni 2 silindrda birdek past ko‘rsatkich → GBS prokladkasi silindrlar aro kuygan.',
          ],
          ru: [
            'Норма для бензиновых ДВС: 11–14 бар (в зависимости от степени сжатия).',
            'Допустимый разброс между цилиндрами: не более 10–15%.',
            'Низкая компрессия в двух соседних цилиндрах → прогар перемычки прокладки ГБЦ.',
          ],
          en: [
            'Healthy gasoline cylinder pressure: typically 11–14 bar (160–200 psi).',
            'Maximum allowable variance across cylinders: ≤ 10–15%.',
            'Two adjacent low cylinders strongly point to a head gasket breach between them.',
          ],
        },
        notes: {
          uz: "Yuqori ko'rsatkich (16+ bar) silindrga moy tushib, moyli qatlam kompressiyani sun'iy oshirganini bildirishi mumkin.",
          ru: 'Аномально высокая компрессия (16+ бар) может означать попадание масла в камеру сгорания.',
          en: 'Note that abnormally high compression (16+ bar) often indicates oil burning or heavy carbon buildup.',
        },
        diagramType: 'compression-chart',
      },
    ],
  },
];
