import { Announcement, CourseModule, Lesson, User } from '../types';
import { hashPassword } from '../utils/crypto';

export const SEED_USERS: User[] = [
  {
    id: 'user_student_1',
    name: 'Azizbek Tursunov',
    email: 'student@avtoedu.uz',
    passwordHash: hashPassword('Student123'),
    role: 'student',
    preferredLanguage: 'uz',
    xp: 340,
    streakDays: 4,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    badges: ['first_lesson'],
    createdAt: '2026-09-10T08:00:00.000Z',
  },
  {
    id: 'user_student_2',
    name: 'Dilshod Rakhimov',
    email: 'dilshod@avtoedu.uz',
    passwordHash: hashPassword('Student123'),
    role: 'student',
    preferredLanguage: 'ru',
    xp: 520,
    streakDays: 7,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    badges: ['first_lesson', 'streak_7'],
    createdAt: '2026-09-04T10:30:00.000Z',
  },
  {
    id: 'user_student_3',
    name: 'Madina Alimova',
    email: 'madina@avtoedu.uz',
    passwordHash: hashPassword('Student123'),
    role: 'student',
    preferredLanguage: 'en',
    xp: 680,
    streakDays: 5,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    badges: ['first_lesson', 'perfect_test'],
    createdAt: '2026-08-25T12:15:00.000Z',
  },
  {
    id: 'user_teacher_1',
    name: 'Rustam Karimov',
    email: 'teacher@avtoedu.uz',
    passwordHash: hashPassword('Teacher123'),
    role: 'teacher',
    avatar: '/src/assets/images/teacher_portrait_1794929843807.jpg',
    preferredLanguage: 'uz',
    xp: 1200,
    streakDays: 14,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    badges: ['master_diagnostician'],
    createdAt: '2026-08-01T08:00:00.000Z',
  },
];

export const SEED_MODULES: CourseModule[] = [
  {
    id: 'mod_1',
    order: 1,
    title: {
      uz: '1-modul: Dvigatel asoslari va sikllari',
      ru: 'Модуль 1: Основы работы и циклы ДВС',
      en: 'Module 1: Engine Basics & Operating Cycles',
    },
    description: {
      uz: "To'rt taktli dvigatel mexanikasi, gaz taqsimlash mexanizmi (GRM) va termodinamik jarayonlar.",
      ru: 'Механика четырёхтактного двигателя, газораспределительный механизм (ГРМ) и рабочие процессы.',
      en: 'Four-stroke combustion mechanics, valvetrain timing (DOHC/SOHC), and volumetric efficiency fundamentals.',
    },
    published: true,
  },
  {
    id: 'mod_2',
    order: 2,
    title: {
      uz: "2-modul: O't oldirish va yonilg'i tizimlari",
      ru: 'Модуль 2: Системы зажигания и топливоподачи',
      en: 'Module 2: Ignition & Fuel Injection Systems',
    },
    description: {
      uz: "COP g'altaklari, uchqun shamlari tahlili, injektorlar balansi va yonilg'i bosimi tekshiruvi.",
      ru: 'Катушки зажигания COP, диагностика свечей, баланс форсунок и проверка давления в рампе.',
      en: 'Coil-on-plug ignition diagnostics, spark plug reading, fuel rail pressure testing, and injector balance.',
    },
    published: true,
  },
  {
    id: 'mod_3',
    order: 3,
    title: {
      uz: '3-modul: OBD-II kompyuter diagnostikasi',
      ru: 'Модуль 3: Компьютерная диагностика OBD-II',
      en: 'Module 3: OBD-II Scan Tool Diagnostics',
    },
    description: {
      uz: "DTC xato kodlari, STFT/LTFT yonilg'i korreksiyalari, Freeze Frame va jonli parametrlar tahlili.",
      ru: 'Коды DTC, топливные коррекции STFT/LTFT, стоп-кадр (Freeze Frame) и анализ Live Data.',
      en: 'Reading DTCs, interpreting STFT & LTFT fuel trims, Freeze Frame data, and readiness monitors.',
    },
    published: true,
  },
  {
    id: 'mod_4',
    order: 4,
    title: {
      uz: '4-modul: Kompressiya va germetiklik testlari',
      ru: 'Модуль 4: Замер компрессии и пневмотест (Leak-Down)',
      en: 'Module 4: Compression & Cylinder Leak-Down Testing',
    },
    description: {
      uz: "Quruq va moyli kompressiya o'lchovi, silindr germetikligini siqilgan havo bilan aniqlash.",
      ru: 'Сухой и масляный замер компрессии, локализация утечек через клапаны, кольца и прокладку ГБЦ.',
      en: 'Dry vs. wet compression testing and pressurized leak-down isolation for valves, rings, and head gaskets.',
    },
    published: true,
  },
  {
    id: 'mod_5',
    order: 5,
    title: {
      uz: '5-modul: Ossillograf diagnostikasi',
      ru: 'Модуль 5: Осциллографическая диагностика',
      en: 'Module 5: Oscilloscope Waveform Diagnostics',
    },
    description: {
      uz: "CKP/CMP sinxronizatsiya signallari, ikkilamchi o't oldirish kuchlanish egri chizig'i va nisbiy kompressiya.",
      ru: 'Синхронизация ДПКВ/ДПРВ, вторичное напряжение зажигания и тест относительной компрессии.',
      en: 'Crank/cam correlation waveforms, secondary ignition burn-line analysis, and relative compression current.',
    },
    published: true,
  },
  {
    id: 'mod_6',
    order: 6,
    title: {
      uz: "6-modul: Texnik xizmat va servis intervallari",
      ru: 'Модуль 6: Техническое обслуживание и регламент',
      en: 'Module 6: Preventive Maintenance & Service Intervals',
    },
    description: {
      uz: "Moy va filtrlar tanlovi, GRM kamari/zanjiri nazorati, sovutish tizimi va tormoz suyuqligi almashtirish.",
      ru: 'Подбор масел и фильтров, ресурс ремня/цепи ГРМ, обслуживание системы охлаждения и жидкостей.',
      en: 'Oil viscosity standards, timing belt/chain inspection, coolant pH/freeze testing, and service schedules.',
    },
    published: true,
  },
];

export const SEED_LESSONS: Lesson[] = [
  {
    id: 'les_1',
    moduleId: 'mod_1',
    order: 1,
    title: {
      uz: "To'rt taktli dvigatel ish sikli va mexanik yo'qotishlar",
      ru: 'Рабочий цикл 4-тактного ДВС и механические потери',
      en: 'Four-Stroke Engine Cycle & Mechanical Efficiency',
    },
    description: {
      uz: "Kiritish, siqish, ish yo'li va chiqarish taktlarida vakuum hamda bosim o'zgarishlarini diagnostik nuqtai nazardan o'rganish.",
      ru: 'Изучение фаз впуска, сжатия, рабочего хода и выпуска с точки зрения разрежения и давления в цилиндре.',
      en: 'Understanding intake, compression, power, and exhaust strokes through manifold vacuum and cylinder pressure behavior.',
    },
    durationMinutes: 14,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=ZQvfHyfgBtA',
    attachedMaterialIds: ['book_1', 'pres_1'],
    keyTakeaways: {
      uz: [
        'Tirsakli valning 720° aylanishida har bir silindrda 1 ta ish yo‘li bajariladi.',
        'Salt yurishda kiritish kollektoridagi me’yoriy vakuum -60 dan -70 kPa gacha bo‘ladi.',
        'Klapanni yopilish kechikishi silindr to‘lish koeffitsientini belgilaydi.',
      ],
      ru: [
        'За 720° поворота коленвала каждый цилиндр совершает один рабочий ход.',
        'Нормальное разрежение во впускном коллекторе на ХХ составляет -60…-70 кПа.',
        'Фазы газораспределения напрямую определяют коэффициент наполнения цилиндра.',
      ],
      en: [
        'Each cylinder completes one full combustion cycle every 720 degrees of crankshaft rotation.',
        'Healthy idle intake manifold vacuum typically reads between 17 and 21 inHg (-58 to -71 kPa).',
        'Valve overlap and timing directly dictate volumetric efficiency and idle stability.',
      ],
    },
    published: true,
  },
  {
    id: 'les_2',
    moduleId: 'mod_1',
    order: 2,
    title: {
      uz: 'Gaz taqsimlash mexanizmi (GRM) va VVT fazoregulyatorlari',
      ru: 'Газораспределительный механизм (ГРМ) и фазорегуляторы VVT',
      en: 'Valvetrain Architecture & Variable Valve Timing (VVT)',
    },
    description: {
      uz: "DOHC tizimi, gidrokompensatorlar shovqini va VVT moy klapani (OCV) nosozliklarini aniqlash.",
      ru: 'Устройство DOHC, диагностика стука гидрокомпенсаторов и проверка клапанов управления фазами OCV.',
      en: 'Diagnosing timing chain stretch, hydraulic lifter tick, and VVT oil control valve (OCV) actuator faults.',
    },
    durationMinutes: 18,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=xY7T8240-vM',
    attachedMaterialIds: ['book_1'],
    keyTakeaways: {
      uz: [
        'Zanjir cho‘zilishida P0016 (CKP/CMP nomuvofiqligi) xatosi paydo bo‘ladi.',
        'VVT klapani filtr to‘rining ifloslanishi fazalarni kechiktiradi.',
      ],
      ru: [
        'Растяжение цепи вызывает ошибку P0016 (рассогласование ДПКВ и ДПРВ).',
        'Загрязнение сетки клапана VVT приводит к плаванию оборотов ХХ.',
      ],
      en: [
        'Chain stretch typically triggers P0016 crankshaft-camshaft correlation codes.',
        'Sludge on the OCV screen restricts oil flow to the cam phaser, causing rough idle.',
      ],
    },
    published: true,
  },
  {
    id: 'les_3',
    moduleId: 'mod_2',
    order: 3,
    title: {
      uz: "O't oldirish g'altaklari (COP) va uchqun shamlari diagnostikasi",
      ru: 'Диагностика индивидуальных катушек (COP) и свечей зажигания',
      en: 'Coil-on-Plug (COP) Ignition & Spark Plug Analysis',
    },
    description: {
      uz: "Uchqun shami izolyatoridagi ranglar bo'yicha aralashma sifatini aniqlash va g'altak qarshiligini o'lchash.",
      ru: 'Определение состава смеси по нагару на свечах и проверка первичной/вторичной обмоток катушек.',
      en: 'Reading spark plug insulator deposits for combustion clues and testing primary/secondary ignition coil health.',
    },
    durationMinutes: 16,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=W94ikMaQ-mM',
    attachedMaterialIds: ['book_3', 'pres_2'],
    keyTakeaways: {
      uz: [
        'Qora qurum — boy aralashma; oq rang — kambag‘al aralashma yoki qizib ketish belgisidir.',
        'Zazor kengayishi g‘altakning izolyatsiyasini teshib chiqish xavfini oshiradi.',
      ],
      ru: [
        'Чёрный бархатистый нагар указывает на богатую смесь, белый — на бедную или перегрев.',
        'Увеличенный искровой зазор перегружает изоляцию катушки зажигания.',
      ],
      en: [
        'Sooty black deposits indicate rich mixture or oil fouling; chalky white signals lean burn or overheating.',
        'Excessive electrode gap forces higher firing voltage and leads to coil breakdown.',
      ],
    },
    published: true,
  },
  {
    id: 'les_4',
    moduleId: 'mod_2',
    order: 4,
    title: {
      uz: "Yonilg'i bosimi va injektorlarni balanslash testi",
      ru: 'Проверка давления топлива и тест баланса форсунок',
      en: 'Fuel Rail Pressure Testing & Injector Balance',
    },
    description: {
      uz: "Manometr yordamida nasos unumdorligini tekshirish, qoldiq bosim tushishi va GDI yuqori bosim tizimi.",
      ru: 'Замер давления в топливной рампе манометром, проверка обратного клапана и контура GDI.',
      en: 'Measuring static and running fuel pressure, leak-down retention, and diagnosing clogged or leaking injectors.',
    },
    durationMinutes: 19,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=9xJ6l7Q-x9U',
    attachedMaterialIds: ['book_2'],
    keyTakeaways: {
      uz: [
        'MPFI tizimlarda ishchi bosim odatda 3.0–4.0 bar atrofida bo‘ladi.',
        'Dvigatel o‘chirilgandan so‘ng 10 daqiqada bosim keskin tushsa, injektor yoki teskari klapan nosoz.',
      ],
      ru: [
        'Рабочее давление в системе распределённого впрыска MPFI обычно составляет 3.0–4.0 бар.',
        'Падение остаточного давления указывает на негерметичность форсунки или регулятора.',
      ],
      en: [
        'Standard port fuel injection operates around 300–400 kPa (43–58 psi).',
        'Rapid residual pressure drop after key-off points to a leaking injector or fuel pump check valve.',
      ],
    },
    published: true,
  },
  {
    id: 'les_5',
    moduleId: 'mod_3',
    order: 5,
    title: {
      uz: "OBD-II protokollari va STFT / LTFT yonilg'i korreksiyalari",
      ru: 'Протоколы OBD-II и анализ топливных коррекций STFT / LTFT',
      en: 'OBD-II Architecture & STFT / LTFT Fuel Trim Analysis',
    },
    description: {
      uz: "Qisqa va uzoq muddatli yonilg'i korreksiyalari orqali havo so'rish (podsos) va MAF xatolarini farqlash.",
      ru: 'Как по краткосрочным и долгосрочным коррекциям отличить подсос воздуха от неисправности ДМРВ и бензонасоса.',
      en: 'Using Short-Term and Long-Term Fuel Trims across idle and 2,500 RPM to separate vacuum leaks from fuel delivery issues.',
    },
    durationMinutes: 22,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=5WnV7h_l-dI',
    attachedMaterialIds: ['book_1', 'pres_3'],
    keyTakeaways: {
      uz: [
        'Salt yurishda +18% LTFT bo‘lib, 2500 ayl/min da 0% ga tushsa — vakuum havo so‘rishi (vacuum leak) mavjud.',
        'Yuqori oborotda LTFT yanada oshsa — yonilg‘i bosimi yetarli emas yoki MAF noto‘g‘ri o‘lchayapti.',
      ],
      ru: [
        'Высокий плюс LTFT на холостом ходу, падающий к нулю на 2500 об/мин — классический подсос воздуха.',
        'Рост положительной коррекции под нагрузкой говорит о нехватке топлива или занижении показаний ДМРВ.',
      ],
      en: [
        'High positive fuel trim at idle that drops toward 0% at 2,500 RPM indicates an unmetered vacuum leak.',
        'Positive trims that climb under load point to low fuel pressure or a skewed MAF sensor.',
      ],
    },
    published: true,
  },
  {
    id: 'les_6',
    moduleId: 'mod_3',
    order: 6,
    title: {
      uz: 'Kislorod (O2) datchiklari va katalizator samaradorligi (P0420)',
      ru: 'Датчики кислорода (O2) и диагностика катализатора (P0420)',
      en: 'Oxygen Sensors (Narrowband/Wideband) & Catalyst Efficiency',
    },
    description: {
      uz: "Bank 1 Sensor 1 va Sensor 2 signallarini taqqoslash, katalizatorning kislorod saqlash qobiliyatini baholash.",
      ru: 'Сравнение осциллограмм B1S1 и B1S2, методика проверки каталитического нейтрализатора без снятия.',
      en: 'Comparing upstream B1S1 switching against downstream B1S2 voltage to verify catalytic converter oxygen storage.',
    },
    durationMinutes: 17,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=rM2zT7V4pGg',
    attachedMaterialIds: ['book_3'],
    keyTakeaways: {
      uz: [
        'Sog‘lom katalizatorda B1S2 kuchlanishi 0.6–0.75V atrofida barqaror turadi.',
        'Agar B1S2 signali B1S1 bilan bir xil tebransa, katalizator samaradorligi yo‘qolgan (P0420).',
      ],
      ru: [
        'На исправном катализаторе сигнал второго зонда B1S2 стабилен в районе 0.6–0.75 В.',
        'Повторение вторым зондом синусоиды первого зонда подтверждает деградацию катализатора.',
      ],
      en: [
        'A healthy downstream O2 sensor holds steady near 0.65–0.75V at hot cruise.',
        'When B1S2 mirrors upstream B1S1 oscillations, the catalyst has lost oxygen storage capacity.',
      ],
    },
    published: true,
  },
  {
    id: 'les_7',
    moduleId: 'mod_4',
    order: 7,
    title: {
      uz: "Kompressiyani o'lchash metodikasi: Quruq va moyli test",
      ru: 'Методика замера компрессии: сухой и масляный тест',
      en: 'Dry & Wet Compression Testing Procedure',
    },
    description: {
      uz: "Dvigatelni qizdirish, yonilg'i va o't oldirishni uzish, drossel qopqog'ini to'liq ochish va natijalarni tahlil qilish.",
      ru: 'Подготовка двигателя, отключение форсунок, полное открытие дросселя и интерпретация разброса по цилиндрам.',
      en: 'Proper engine prep, disabling fuel/spark, holding WOT, and interpreting wet-test pressure jumps.',
    },
    durationMinutes: 15,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=X8P5e6fF_iE',
    attachedMaterialIds: ['book_2', 'pres_4'],
    keyTakeaways: {
      uz: [
        'Silindrlar orasidagi farq 10–15% dan oshmasligi shart.',
        'Moy quyilgandan keyin kompressiya keskin oshsa — porshen halqalari yeyilgan; o‘zgarmasa — klapanlar yoki prokladka.',
      ],
      ru: [
        'Допустимая разница компрессии между цилиндрами — не более 10–15%.',
        'Рост давления после добавления масла указывает на износ колец; отсутствие роста — на клапаны.',
      ],
      en: [
        'Cylinder-to-cylinder variance should remain within 10–15% of the highest reading.',
        'A significant rise on the wet test points to worn piston rings; no change indicates valve or gasket leakage.',
      ],
    },
    published: true,
  },
  {
    id: 'les_8',
    moduleId: 'mod_4',
    order: 8,
    title: {
      uz: 'Silindr germetikligi testi (Leak-Down) va GBS prokladkasi',
      ru: 'Пневмотест цилиндров (Leak-Down) и пробой прокладки ГБЦ',
      en: 'Cylinder Leak-Down Testing & Head Gasket Verification',
    },
    description: {
      uz: "Silindrni siqish takti YMN (TDC) holatiga keltirib, siqilgan havo chiqish joyini eshitish orqali aniqlash.",
      ru: 'Установка поршня в ВМТ такта сжатия и определение места утечки (впуск, выпуск, картер, антифриз).',
      en: 'Setting TDC on compression stroke and tracing air escape paths at throttle body, exhaust, dipstick, and coolant cap.',
    },
    durationMinutes: 16,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=3jT5Q2wT2wU',
    attachedMaterialIds: ['book_2'],
    keyTakeaways: {
      uz: [
        '10% gacha yo‘qotish — a’lo; 20% dan yuqori bo‘lsa ta’mir talab etiladi.',
        'Radiatorda pufakchalar paydo bo‘lishi GBS prokladkasi teshilganini bildiradi.',
      ],
      ru: [
        'Утечка до 10% считается отличным состоянием; свыше 20% требует ремонта.',
        'Пузыри в расширительном бачке свидетельствуют о пробое прокладки ГБЦ.',
      ],
      en: [
        'Leakage under 10% is healthy; above 20% indicates mechanical sealing failure.',
        'Bubbles in the coolant reservoir during pressurization confirm a breached head gasket.',
      ],
    },
    published: true,
  },
  {
    id: 'les_9',
    moduleId: 'mod_5',
    order: 9,
    title: {
      uz: 'CKP (tirsakli val) va CMP (taqsimlash vali) ossillogrammalari',
      ru: 'Осциллограммы ДПКВ и ДПРВ: индуктивные и датчики Холла',
      en: 'CKP & CMP Sensor Waveforms: Inductive vs. Hall Effect',
    },
    description: {
      uz: "60-2 tishli shkiv signalini o'qish, sinxronizatsiya etaloni bilan solishtirish va tish sinishini aniqlash.",
      ru: 'Чтение сигнала реперного диска 60-2, проверка фаз ГРМ по эталону без разборки двигателя.',
      en: 'Reading 60-2 reluctor wheel waveforms, checking missing-tooth alignment, and verifying cam-crank phase.',
    },
    durationMinutes: 21,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=M0n-3P_4-gQ',
    attachedMaterialIds: ['book_3', 'pres_2'],
    keyTakeaways: {
      uz: [
        'Induktiv datchik sinusoidal, Xoll datchigi esa to‘g‘ri burchakli (0–5V) signal beradi.',
        'Etalon ossillogrammadan 1 tishga siljish ham quvvat pasayishiga olib keladi.',
      ],
      ru: [
        'Индуктивный датчик генерирует синусоиду переменного тока, датчик Холла — прямоугольные импульсы 0–5 В.',
        'Смещение фаз даже на один зуб ремня отчётливо видно на двухканальной осциллограмме.',
      ],
      en: [
        'Variable reluctance (inductive) sensors output AC sine waves; Hall-effect sensors produce crisp 0–5V square waves.',
        'Even a one-tooth belt jump is immediately visible by overlaying CKP and CMP channels.',
      ],
    },
    published: true,
  },
  {
    id: 'les_10',
    moduleId: 'mod_5',
    order: 10,
    title: {
      uz: 'Tok qisqichlari bilan nisbiy kompressiya testi',
      ru: 'Тест относительной компрессии токовыми клещами',
      en: 'Relative Compression Testing with Current Clamp',
    },
    description: {
      uz: "Shamni yechmasdan starter tokini ossillografda o'lchab silindrlar muvozanatini 30 soniyada aniqlash.",
      ru: 'Экспресс-оценка компрессии за 30 секунд по пульсациям пускового тока стартера без выкручивания свечей.',
      en: 'Rapidly identifying low-compression cylinders in 30 seconds by analyzing starter amperage peaks.',
    },
    durationMinutes: 14,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=L-f1Z5Y3c2k',
    attachedMaterialIds: ['book_1'],
    keyTakeaways: {
      uz: [
        'Siqish bosimi past silindrda starter tok cho‘qqisi sezilarli darajada past bo‘ladi.',
        '1-silindr sinxro-impulsi qo‘shilsa, aynan qaysi silindr zaifligi aniq ko‘rinadi.',
      ],
      ru: [
        'В цилиндре с низкой компрессией пик тока стартера заметно ниже остальных.',
        'Добавление синхроимпульса по 1-му цилиндру позволяет точно определить проблемный цилиндр.',
      ],
      en: [
        'A cylinder with low compression draws noticeably less starter current on its compression stroke.',
        'Triggering on Cylinder #1 ignition sync pinpoints the exact weak cylinder without pulling plugs.',
      ],
    },
    published: true,
  },
  {
    id: 'les_11',
    moduleId: 'mod_6',
    order: 11,
    title: {
      uz: 'Dvigatel moyi, SAE yopishqoqligi va filtr xizmat muddati',
      ru: 'Моторные масла, вязкость SAE и ресурс масляных фильтров',
      en: 'Engine Oil Viscosity (SAE/API) & Lubrication Service',
    },
    description: {
      uz: "5W-30 va 0W-20 standartlari, API SP / ACEA tasniflari hamda moy bosimi datchigini manometrda tekshirish.",
      ru: 'Стандарты 5W-30 и 0W-20, допуски API SP / ACEA, проверка реального давления масла механическим манометром.',
      en: 'Selecting correct API/ACEA oil specifications and verifying hot-idle oil pressure with a mechanical gauge.',
    },
    durationMinutes: 13,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=O9bY4kJ_1hU',
    attachedMaterialIds: ['book_4'],
    keyTakeaways: {
      uz: [
        'Og‘ir shahar sharoitida moy almashtirish oralig‘ini 7 000–8 000 km gacha qisqartirish tavsiya etiladi.',
        'Turbinali va GDI dvigatellarda LSPI dan himoyalovchi API SP moylar ishlatiladi.',
      ],
      ru: [
        'В тяжёлых городских условиях интервал замены масла рекомендуется сокращать до 7 000–8 000 км.',
        'Для турбомоторов GDI требуются масла класса API SP с защитой от преждевременного воспламенения LSPI.',
      ],
      en: [
        'Severe stop-and-go driving cuts recommended oil change intervals down to 7,000–8,000 km.',
        'Turbocharged GDI engines require API SP oils formulated to prevent low-speed pre-ignition (LSPI).',
      ],
    },
    published: true,
  },
  {
    id: 'les_12',
    moduleId: 'mod_6',
    order: 12,
    title: {
      uz: 'Sovutish tizimi, termostat va antifrizni tekshirish',
      ru: 'Диагностика системы охлаждения, термостата и антифриза',
      en: 'Cooling System Pressure Test, Thermostat & Coolant Analysis',
    },
    description: {
      uz: "Sovutish tizimini bosim ostida tekshirish, refraktometr bilan muzlash haroratini o'lchash va ECT datchigi.",
      ru: 'Опрессовка системы охлаждения, проверка температуры кристаллизации рефрактометром и тест датчика ДТОЖ.',
      en: 'Pressurizing the cooling circuit for leaks, testing glycol freeze point, and checking thermostat opening temperature.',
    },
    durationMinutes: 15,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=V7x8v4G9R6I',
    attachedMaterialIds: ['book_4'],
    keyTakeaways: {
      uz: [
        'Tizim bosimi odatda 1.1–1.4 bar da ushlab turiladi — bu qaynash haroratini oshiradi.',
        'Antifrizdagi elektroliz kuchlanishi 0.3V dan oshsa, korroziya xavfi yuqori.',
      ],
      ru: [
        'Рабочее давление крышки 1.1–1.4 бар повышает температуру кипения антифриза выше 120 °C.',
        'Напряжение электролиза в антифризе выше 0.3 В указывает на истощение присадок и риск коррозии.',
      ],
      en: [
        'A 1.1–1.4 bar radiator cap raises coolant boiling point above 120°C.',
        'Stray voltage above 0.3V measured in coolant indicates depleted corrosion inhibitors and electrolysis risk.',
      ],
    },
    published: true,
  },
];

export const SEED_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_1',
    title: {
      uz: 'Yangi 5-modul ossillografiya darslari qo‘shildi',
      ru: 'Добавлены новые уроки 5-го модуля по осциллографии',
      en: 'Module 5 Oscilloscope Diagnostics Lessons Now Live',
    },
    body: {
      uz: "CKP/CMP sinxronizatsiya va starter tok qisqichlari bo'yicha amaliy videolar hamda testlar yangilandi.",
      ru: 'Обновлены видеоуроки и тесты по синхронизации ДПКВ/ДПРВ и тесту относительной компрессии.',
      en: 'New video walkthroughs and waveform quiz questions on crank/cam correlation and relative compression are live.',
    },
    createdAt: '2026-11-10T09:00:00.000Z',
    published: true,
  },
  {
    id: 'ann_2',
    title: {
      uz: 'Yakuniy imtihon va PDF sertifikat tartibi',
      ru: 'Порядок сдачи итогового экзамена и получения сертификата',
      en: 'Final Exam & Instant PDF Certificate Issuance',
    },
    body: {
      uz: "Testlar bo'limida 5-testni 70% dan yuqori natija bilan topshirib, noyob ID raqamli sertifikatga ega bo'ling.",
      ru: 'Пройдите Итоговый экзамен (тест №5) с результатом от 70% и получите верифицируемый PDF-сертификат.',
      en: 'Pass Test #5 (Final Exam) with 70% or higher to automatically generate your verifiable PDF certificate.',
    },
    createdAt: '2026-11-12T14:30:00.000Z',
    published: true,
  },
];
