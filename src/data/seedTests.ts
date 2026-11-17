import { LocalizedText, Question, TestItem } from '../types';

const L = (uz: string, ru: string, en: string): LocalizedText => ({ uz, ru, en });

function qSingle(
  id: string,
  topic: LocalizedText,
  prompt: LocalizedText,
  options: LocalizedText[],
  correctIndex: number,
  explanation: LocalizedText,
  faultCodeBadge?: string,
  imageUrl?: string
): Question {
  return {
    id,
    type: faultCodeBadge ? 'fault_code' : imageUrl ? 'image' : 'single',
    topic,
    prompt,
    options,
    correctIndices: [correctIndex],
    explanation,
    faultCodeBadge,
    imageUrl,
    points: 10,
  };
}

function qMulti(
  id: string,
  topic: LocalizedText,
  prompt: LocalizedText,
  options: LocalizedText[],
  correctIndices: number[],
  explanation: LocalizedText
): Question {
  return {
    id,
    type: 'multiple',
    topic,
    prompt,
    options,
    correctIndices,
    explanation,
    points: 10,
  };
}

function qBool(
  id: string,
  topic: LocalizedText,
  prompt: LocalizedText,
  correctBoolean: boolean,
  explanation: LocalizedText
): Question {
  return {
    id,
    type: 'true_false',
    topic,
    prompt,
    correctBoolean,
    explanation,
    points: 10,
  };
}

function qMatch(
  id: string,
  topic: LocalizedText,
  prompt: LocalizedText,
  pairs: { id: string; left: LocalizedText; right: LocalizedText }[],
  explanation: LocalizedText
): Question {
  return {
    id,
    type: 'matching',
    topic,
    prompt,
    matchingPairs: pairs,
    explanation,
    points: 10,
  };
}

const TOPICS = {
  basics: L('Dvigatel asoslari', 'Основы ДВС', 'Engine Basics'),
  ignition: L("O't oldirish va yonilg'i", 'Зажигание и топливо', 'Ignition & Fuel'),
  obd: L('OBD-II va datchiklar', 'OBD-II и датчики', 'OBD-II & Sensors'),
  compression: L('Kompressiya va mexanika', 'Компрессия и механика', 'Compression & Mechanics'),
  maintenance: L('Texnik xizmat', 'Техобслуживание', 'Maintenance'),
};

export const SEED_TESTS: TestItem[] = [
  {
    id: 'test_1',
    title: L(
      '1-test: Dvigatel sikllari va mexanik asoslar',
      'Тест 1: Рабочие циклы и механика ДВС',
      'Test 1: Engine Cycles & Mechanical Foundations'
    ),
    description: L(
      "To'rt taktli dvigatel fazalari, GRM mexanizmi va vakuum diagnostikasi bo'yicha 10 ta savol.",
      '10 вопросов по тактам ДВС, газораспределению и вакуумной диагностике.',
      '10 questions covering four-stroke combustion phases, valvetrain timing, and intake vacuum.'
    ),
    moduleTag: L('1-modul', 'Модуль 1', 'Module 1'),
    durationMinutes: 12,
    passScore: 70,
    shuffleQuestions: false,
    published: true,
    questions: [
      qSingle(
        't1_q1',
        TOPICS.basics,
        L(
          "To'rt taktli dvigatelning to'liq ish sikli tirsakli valning necha gradus aylanishida yakunlanadi?",
          'За сколько градусов поворота коленвала завершается полный цикл 4-тактного ДВС?',
          'How many degrees of crankshaft rotation complete one full four-stroke cycle?'
        ),
        [L('180°', '180°', '180°'), L('360°', '360°', '360°'), L('720°', '720°', '720°'), L('540°', '540°', '540°')],
        2,
        L(
          "To'rt takt (kiritish, siqish, ish yo'li, chiqarish) tirsakli valning 2 to'liq aylanishida (720°) bajariladi.",
          'Четыре такта выполняются за два полных оборота коленчатого вала — 720°.',
          'All four strokes require two complete crankshaft revolutions (720 degrees).'
        )
      ),
      qBool(
        't1_q2',
        TOPICS.basics,
        L(
          'Taqsimlash vali (raspredval) tirsakli valga nisbatan 2 marta tez aylanadi.',
          'Распределительный вал вращается в 2 раза быстрее коленчатого вала.',
          'The camshaft rotates at twice the speed of the crankshaft.'
        ),
        false,
        L(
          "Aksincha, taqsimlash vali tirsakli valga nisbatan 2 barobar sekin (1:2 nisbatda) aylanadi.",
          'Наоборот: распредвал вращается в 2 раза медленнее коленвала (передаточное отношение 1:2).',
          'False. The camshaft turns at half crankshaft speed (1:2 ratio) so valves open once per 720° cycle.'
        )
      ),
      qSingle(
        't1_q3',
        TOPICS.basics,
        L(
          'Sog‘lom benzinli dvigatelda salt yurishda kiritish kollektori vakuumi qancha bo‘ladi?',
          'Каково нормальное разрежение во впускном коллекторе исправного ДВС на холостом ходу?',
          'What is normal intake manifold vacuum on a healthy gasoline engine at warm idle?'
        ),
        [
          L('-15 dan -25 kPa gacha', '-15…-25 кПа', '5–8 inHg (-17 to -27 kPa)'),
          L('-58 dan -71 kPa gacha (17–21 inHg)', '-58…-71 кПа (17–21 inHg)', '17–21 inHg (-58 to -71 kPa)'),
          L('0 kPa (atmosfera bosimi)', '0 кПа', '0 inHg (atmospheric)'),
          L('+120 kPa musbat bosim', '+120 кПа', '+120 kPa positive pressure'),
        ],
        1,
        L(
          "Salt yurishda yopiq drossel ortida -58…-71 kPa (17–21 inHg) barqaror vakuum hosil bo'ladi.",
          'На исправном моторе на ХХ стрелка вакуумметра стабильна в зоне 17–21 inHg (-58…-71 кПа).',
          'Healthy idle vacuum sits steadily between 17 and 21 inHg (-58 to -71 kPa).'
        )
      ),
      qMulti(
        't1_q4',
        TOPICS.basics,
        L(
          'GRM kamari 1–2 tishga kechikish tomonga sakrasa qanday alomatlar kuzatiladi? (Bir nechta tanlang)',
          'Какие признаки наблюдаются при перескоке ремня ГРМ на 1–2 зуба в сторону запаздывания? (Выберите несколько)',
          'Which symptoms occur when a timing belt jumps 1–2 teeth retarded? (Select all that apply)'
        ),
        [
          L('Kiritish vakuumi past va barqaror bo‘ladi', 'Стабильно низкое разрежение на впуске', 'Steadily low intake vacuum'),
          L('Dvigatel tortishi keskin pasayadi', 'Потеря тяги и вялый разгон', 'Sluggish acceleration and power loss'),
          L('P0016 xato kodi chiqishi mumkin', 'Возможно появление кода P0016', 'Code P0016 may set'),
          L('Sovutish suvi zudlik bilan muzlaydi', 'Мгновенное замерзание антифриза', 'Instant coolant freezing'),
        ],
        [0, 1, 2],
        L(
          "Faza siljishi kiritish vakuumini pasaytiradi, quvvatni tushiradi va CKP/CMP sinxronizatsiya xatosini (P0016) keltirib chiqaradi.",
          'Смещение фаз снижает вакуум, мощность и вызывает рассогласование ДПКВ/ДПРВ (P0016).',
          'Retarded cam timing reduces vacuum, cuts engine power, and triggers cam-crank correlation faults like P0016.'
        )
      ),
      qMatch(
        't1_q5',
        TOPICS.basics,
        L(
          'Taktlarni ularda sodir bo‘ladigan jarayon bilan moslashtiring:',
          'Сопоставьте такты 4-тактного цикла с происходящими процессами:',
          'Match each four-stroke phase with its physical action:'
        ),
        [
          { id: 'm1', left: L('1. Kiritish', '1. Впуск', '1. Intake'), right: L('Kiritish klapani ochiq, porshen pastga', 'Впускной клапан открыт, поршень вниз', 'Intake valve open, piston moves down') },
          { id: 'm2', left: L('2. Siqish', '2. Сжатие', '2. Compression'), right: L('Ikkala klapan yopiq, porshen yuqoriga', 'Оба клапана закрыты, поршень вверх', 'Both valves closed, piston moves up') },
          { id: 'm3', left: L('3. Ish yo‘li', '3. Рабочий ход', '3. Power'), right: L('Yonish bosimi porshenni pastga itaradi', 'Расширение газов толкает поршень вниз', 'Combustion pressure drives piston down') },
          { id: 'm4', left: L('4. Chiqarish', '4. Выпуск', '4. Exhaust'), right: L('Chiqarish klapani ochiq, gazlar chiqadi', 'Выпускной клапан открыт, удаление газов', 'Exhaust valve open, spent gases expelled') },
        ],
        L(
          "To'rt takt ketma-ketligi: Kiritish → Siqish → Ish yo'li → Chiqarish.",
          'Классическая последовательность цикла Отто: впуск, сжатие, рабочий ход, выпуск.',
          'The Otto cycle always follows Intake → Compression → Power → Exhaust.'
        )
      ),
      qSingle(
        't1_q6',
        TOPICS.basics,
        L(
          'VVT (Variable Valve Timing) tizimida fazoregulyatorni (cam phaser) nima harakatga keltiradi?',
          'Что приводит в действие муфту фазорегулятора VVT в большинстве современных ДВС?',
          'What actuates a hydraulic VVT cam phaser in most modern engines?'
        ),
        [
          L('Vakuum shlangi', 'Вакуумный шланг', 'Manifold vacuum hose'),
          L('ECU boshqaradigan OCV moy bosimi klapani', 'Масляный клапан OCV под управлением ЭБУ', 'ECU-controlled oil control valve (OCV) using engine oil pressure'),
          L('Sovutish suyuqligi bosimi', 'Давление антифриза', 'Coolant pump pressure'),
          L('Prujinali tros', 'Механический тросик', 'Mechanical throttle cable'),
        ],
        1,
        L(
          "ECU PWM signali bilan OCV klapanini ochadi va bosimli motor moyini fazoregulyator kameralariga yo'naltiradi.",
          'ЭБУ через ШИМ-сигнал управляет клапаном OCV, направляя моторное масло под давлением в полости муфты.',
          'The ECU pulses the OCV solenoid to route pressurized engine oil into advance/retard phaser chambers.'
        )
      ),
      qSingle(
        't1_q7',
        TOPICS.basics,
        L(
          '2500 ayl/min barqaror gazda vakuummetr strelkasi sekin-asta nolga tushib borsa, bu nimani bildiradi?',
          'Если при удержании 2500 об/мин стрелка вакуумметра плавно падает к нулю, на что это указывает?',
          'If intake vacuum steadily drops toward zero while holding 2,500 RPM, what is the likely fault?'
        ),
        [
          L('Katalizator yoki chiqarish trakti tiqilgan', 'Забит катализатор / повышенное противодавление выхлопа', 'Restricted exhaust / clogged catalytic converter'),
          L('Akkumulyator quvvati oshgan', 'Перезаряд АКБ', 'Battery overcharging'),
          L('Termostat yopiq', 'Закрыт термостат', 'Closed thermostat'),
          L('Havo filtri yangi', 'Новый воздушный фильтр', 'New air filter'),
        ],
        0,
        L(
          "Chiqindi gazlar chiqa olmagani sababli silindrda qoldiq bosim yig'ilib, kiritish vakuumi yo'qoladi.",
          'Из-за подпора в выпуске газы не успевают выходить и разрежение на впуске падает.',
          'Exhaust backpressure prevents cylinder scavenging, causing intake vacuum to collapse under steady RPM.'
        )
      ),
      qBool(
        't1_q8',
        TOPICS.basics,
        L(
          'Gidrokompensatorlar klapan zazorini avtomatik ravishda motor moyi bosimi yordamida sozlab turadi.',
          'Гидрокомпенсаторы автоматически выбирают тепловой зазор клапанов за счёт давления моторного масла.',
          'Hydraulic lash adjusters automatically maintain zero valve clearance using engine oil pressure.'
        ),
        true,
        L(
          "To'g'ri! Shuning uchun past moy bosimi yoki kirlangan moy gidrokompensator taqillashiga olib keladi.",
          'Верно. Поэтому грязное или густое масло вызывает характерный стук гидрокомпенсаторов.',
          'True. Low oil pressure or sludge contamination directly causes hydraulic lifter ticking.'
        )
      ),
      qSingle(
        't1_q9',
        TOPICS.basics,
        L(
          'Dvigatelda P0016 xatosi qaysi ikki datchik o‘rtasidagi nomuvofiqlikni bildiradi?',
          'Рассогласование каких двух датчиков означает код P0016?',
          'DTC P0016 indicates a correlation mismatch between which two sensors?'
        ),
        [
          L('MAF va MAP', 'ДМРВ и ДАД', 'MAF and MAP'),
          L('CKP (tirsakli val) va CMP (taqsimlash vali)', 'ДПКВ (коленвал) и ДПРВ (распредвал)', 'CKP (Crankshaft) and CMP (Camshaft)'),
          L('ECT va IAT', 'ДТОЖ и ДТВВ', 'ECT and IAT'),
          L('O2 va Knock sensor', 'ДК и ДД', 'O2 and Knock sensor'),
        ],
        1,
        L(
          "P0016 tirsakli val va 1-bank kiritish taqsimlash vali signallari fazasi mos kelmaganini bildiradi.",
          'P0016 фиксируется при рассогласовании сигналов ДПКВ и ДПРВ (часто из-за растяжения цепи ГРМ).',
          'P0016 means the crankshaft and camshaft signals are out of expected mechanical phase.'
        ),
        'P0016'
      ),
      qSingle(
        't1_q10',
        TOPICS.basics,
        L(
          "Benzinli dvigatelda normal yonish bosimi cho'qqisi YMN (TDC) dan necha gradus keyin hosil bo'ladi?",
          'Через сколько градусов после ВМТ в норме достигается пик давления сгорания?',
          'Approximately how many degrees ATDC does peak combustion pressure occur in a healthy engine?'
        ),
        [
          L('30° oldin', '30° до ВМТ', '30° BTDC'),
          L('12°–15° keyin (ATDC)', '12°–15° после ВМТ', '12°–15° ATDC'),
          L('90° keyin', '90° после ВМТ', '90° ATDC'),
          L('180° keyin', '180° после ВМТ', '180° ATDC'),
        ],
        1,
        L(
          "12°–15° ATDC atrofida krivoship-shatun mexanizmi eng samarali aylantiruvchi moment beradi.",
          'При 12°–15° после ВМТ достигается максимальный крутящий момент на коленвале без детонации.',
          'Peak pressure at 12°–15° ATDC delivers optimal crank throw leverage without knock.'
        )
      ),
    ],
  },
  {
    id: 'test_2',
    title: L(
      "2-test: O't oldirish va yonilg'i tizimlari",
      'Тест 2: Системы зажигания и впрыска топлива',
      'Test 2: Ignition & Fuel Injection Systems'
    ),
    description: L(
      "COP g'altaklari, uchqun shamlari, yonilg'i bosimi va injektorlar diagnostikasi bo'yicha 10 ta savol.",
      '10 вопросов по диагностике катушек зажигания, свечей, давления топлива и форсунок.',
      '10 questions on COP ignition coils, spark plug reading, fuel rail pressure, and injectors.'
    ),
    moduleTag: L('2-modul', 'Модуль 2', 'Module 2'),
    durationMinutes: 12,
    passScore: 70,
    shuffleQuestions: false,
    published: true,
    questions: [
      qSingle(
        't2_q1',
        TOPICS.ignition,
        L(
          "Rasmda ko'rsatilgan chapdan o'ngga uchta detalni to'g'ri tartibda aniqlang:",
          'Определите три детали на изображении слева направо в правильном порядке:',
          'Identify the three components shown in the image from left to right:'
        ),
        [
          L("MAP datchigi, termostat, sham", 'ДАД, термостат, свеча', 'MAP sensor, thermostat, spark plug'),
          L("COP o't oldirish g'altagi, iridiy uchqun shami, yonilg'i injektori", 'Катушка зажигания COP, иридиевая свеча, топливная форсунка', 'Ignition coil-on-plug, iridium spark plug, fuel injector'),
          L("CKP datchigi, klapan, starter relesi", 'ДПКВ, клапан, реле стартера', 'CKP sensor, valve, starter relay'),
          L("Yonilg'i nasosi, filtr, lyambda zond", 'Бензонасос, фильтр, лямбда-зонд', 'Fuel pump, filter, O2 sensor'),
        ],
        1,
        L(
          "Chapda COP g'altagi (Denso), o'rtada iridiy uchqun shami, o'ngda elektromagnit yonilg'i injektori ko'rsatilgan.",
          'Слева направо: индивидуальная катушка зажигания COP, иридиевая свеча и электромагнитная форсунка.',
          'From left to right: a coil-on-plug (COP) ignition coil, an iridium spark plug, and a fuel injector.'
        ),
        undefined,
        '/src/assets/images/test_part_coil_pack_1794929843922.jpg'
      ),
      qSingle(
        't2_q2',
        TOPICS.ignition,
        L(
          'Qaysi xato kodi tasodifiy yoki bir nechta silindrlarda o‘t olish uzilishini (misfire) bildiradi?',
          'Какой код OBD-II означает случайные или множественные пропуски воспламенения?',
          'Which OBD-II trouble code indicates Random/Multiple Cylinder Misfire Detected?'
        ),
        [L('P0171', 'P0171', 'P0171'), L('P0300', 'P0300', 'P0300'), L('P0420', 'P0420', 'P0420'), L('P0115', 'P0115', 'P0115')],
        1,
        L(
          "P0300 umumiy/ko'p silindrli misfire kodidir; P0301–P0304 esa aniq silindrni ko'rsatadi.",
          'P0300 — множественные пропуски; P0301–P0304 указывают на конкретный цилиндр.',
          'P0300 indicates random/multiple cylinder misfires, whereas P0301–P0304 isolate a single cylinder.'
        ),
        'P0300'
      ),
      qSingle(
        't2_q3',
        TOPICS.ignition,
        L(
          'Uchqun shami izolyatorida quruq, qora baxmal qurum yig‘ilishi nimadan dalolat beradi?',
          'О чём говорит сухой чёрный бархатистый нагар на изоляторе свечи зажигания?',
          'What do dry, sooty black deposits on a spark plug insulator tip indicate?'
        ),
        [
          L('Boy yonilg‘i aralashmasi (Rich mixture)', 'Переобогащённая топливовоздушная смесь', 'Overly rich air-fuel mixture'),
          L('Kambag‘al aralashma', 'Обеднённая смесь', 'Overly lean mixture'),
          L('Ideal stexiometrik yonish', 'Идеальное сгорание 14.7:1', 'Ideal stoichiometric combustion'),
          L('Antifriz sizishi', 'Утечка антифриза', 'Coolant leak into cylinder'),
        ],
        0,
        L(
          "Quruq qora qurum ortiqcha yonilg'i yoki havo yetishmasligini (tiqilgan havo filtri, oqayotgan injektor) ko'rsatadi.",
          'Сухая чёрная сажа возникает при богатой смеси (забитый воздушный фильтр, перелив форсунок).',
          'Dry carbon soot results from excessive fuel or restricted air (rich combustion).'
        )
      ),
      qSingle(
        't2_q4',
        TOPICS.ignition,
        L(
          'Standart taqsimlangan inyeksiya (MPFI) tizimida ishchi yonilg‘i bosimi odatda qancha bo‘ladi?',
          'Какое рабочее давление в топливной рампе обычно поддерживается в системах MPFI?',
          'What is the typical operating fuel rail pressure in a standard port fuel injection (MPFI) system?'
        ),
        [L('0.3–0.5 bar', '0.3–0.5 бар', '5–8 psi'), L('3.0–4.0 bar (43–58 psi)', '3.0–4.0 бар', '3.0–4.0 bar (43–58 psi)'), L('150–200 bar', '150–200 бар', '2,200–2,900 psi'), L('12–14 bar', '12–14 бар', '175–200 psi')],
        1,
        L(
          "MPFI da 3.0–4.0 bar me'yor; 35–200 bar esa GDI yuqori bosim konturiga xos.",
          'Для распределённого впрыска MPFI норма 3.0–4.0 бар; 35–200 бар — это контур высокого давления GDI.',
          'Port fuel injection runs around 3.0–4.0 bar (43–58 psi), whereas GDI operates at 35–200 bar.'
        )
      ),
      qBool(
        't2_q5',
        TOPICS.ignition,
        L(
          '1-silindr misfire (P0301) bo‘lganda, 1-g‘altakni 2-silindrga ko‘chirib xato P0302 ga o‘tsa, demak muammo g‘altakda ekani tasdiqlanadi.',
          'Если при ошибке P0301 переставить катушку на 2-й цилиндр и ошибка сменится на P0302 — неисправна именно катушка.',
          'If moving coil #1 to cylinder #2 causes P0301 to change to P0302, the ignition coil is confirmed faulty.'
        ),
        true,
        L(
          "To'g'ri! Bu swap-test (joyini almashtirish) usuli diagnostikada vaqtni tejaydigan eng ishonchli tekshiruvdir.",
          'Верно! Перестановка катушки/свечи позволяет мгновенно отделить неисправность зажигания от форсунки и механики.',
          'True. The coil-swap test rapidly isolates ignition component failures from injector or compression faults.'
        )
      ),
      qMulti(
        't2_q6',
        TOPICS.ignition,
        L(
          "Dvigatel o'chirilgandan so'ng yonilg'i rampasidagi qoldiq bosim tez tushib ketsa, qaysi qismlar aybdor bo'lishi mumkin?",
          'Если после остановки ДВС остаточное давление в рампе быстро падает, что может быть причиной?',
          'If residual fuel rail pressure drops rapidly after key-off, what are the probable causes?'
        ),
        [
          L('Oqayotgan (yopilmay qolgan) injektor', 'Негерметичная форсунка', 'Leaking fuel injector'),
          L('Yonilg‘i nasosining teskari klapani (check valve)', 'Обратный клапан бензонасоса', 'Faulty fuel pump check valve'),
          L('Bosim regulyatori membranasi teshilgan', 'Порвана мембрана регулятора давления', 'Ruptured fuel pressure regulator'),
          L('O‘t oldirish g‘altagi', 'Катушка зажигания', 'Ignition coil'),
        ],
        [0, 1, 2],
        L(
          "Bosimning ushlab turilmasligi injektor, nasosning teskari klapani yoki bosim regulyatoridan oqish tufayli yuz beradi.",
          'Давление падает через негерметичную форсунку, обратный клапан модуля насоса или регулятор давления.',
          'Residual pressure loss stems from a leaking injector, faulty pump check valve, or bad regulator.'
        )
      ),
      qSingle(
        't2_q7',
        TOPICS.ignition,
        L(
          "GDI (to'g'ridan-to'g'ri purkash) dvigatellarida P0087 xatosi nimani anglatadi?",
          'Что означает код P0087 в системах GDI и Common Rail?',
          'What does DTC P0087 indicate on a GDI or Common Rail engine?'
        ),
        [
          L('Yonilg‘i rampasi bosimi me’yordan past', 'Слишком низкое давление в топливной рампе', 'Fuel rail/system pressure too low'),
          L('Katalizator qizib ketgan', 'Перегрев катализатора', 'Catalyst overtemperature'),
          L('AKB kuchlanishi yuqori', 'Перезаряд АКБ', 'System voltage too high'),
          L('EGR klapani yopiq', 'Клапан EGR закрыт', 'EGR flow excessive'),
        ],
        0,
        L(
          "P0087 — rampa bosimi talab qilingan darajadan past; avval past bosimli nasos (4–5 bar) va filtr tekshiriladi.",
          'P0087 — низкое давление в рампе. Диагностику начинают с проверки подкачки низкого давления (4–5 бар).',
          'P0087 means fuel rail pressure is below target; always check low-side supply before replacing the HPFP.'
        ),
        'P0087'
      ),
      qSingle(
        't2_q8',
        TOPICS.ignition,
        L(
          'Standart yuqori omli MPFI yonilg‘i injektori g‘altagining qarshiligi odatda qancha bo‘ladi?',
          'Каково типичное сопротивление обмотки высокоомной форсунки MPFI?',
          'What is the typical coil resistance of a standard high-impedance port fuel injector?'
        ),
        [L('0.1–0.3 Ω', '0.1–0.3 Ом', '0.1–0.3 Ω'), L('11–16 Ω', '11–16 Ом', '11–16 Ω'), L('1,200–2,000 Ω', '1200–2000 Ом', '1,200–2,000 Ω'), L('100 kΩ', '100 кОм', '100 kΩ')],
        1,
        L(
          "Yuqori omli injektorlar odatda 11–16 Ohm qarshilikka ega bo'ladi (barcha silindrlarda bir xil bo'lishi kerak).",
          'Стандартные высокоомные форсунки имеют сопротивление 11–16 Ом при комнатной температуре.',
          'High-impedance saturated injectors typically measure between 11 and 16 ohms.'
        )
      ),
      qMatch(
        't2_q9',
        TOPICS.ignition,
        L(
          "Uchqun shami ko'rinishini uning diagnostik sababi bilan moslang:",
          'Сопоставьте состояние свечи зажигания с причиной:',
          'Match each spark plug deposit condition with its root cause:'
        ),
        [
          { id: 's1', left: L('Oq quruq izolyator', 'Белый сухой налёт', 'Chalky white insulator'), right: L('Kambag‘al aralashma / qizish', 'Бедная смесь / перегрев', 'Lean burn / overheating') },
          { id: 's2', left: L('Nam moyli qatlam', 'Влажный масляный нагар', 'Wet oily deposits'), right: L('Halqa yoki klapan salnigi', 'Износ колец / маслосъёмных колпачков', 'Worn piston rings / valve seals') },
          { id: 's3', left: L('Quruq qora qurum', 'Сухая чёрная сажа', 'Dry fluffy black soot'), right: L('Boy aralashma', 'Богатая смесь', 'Overly rich mixture') },
        ],
        L(
          "Sham uchi — yonish kamerasining eng yaxshi ko'zgusidir.",
          'Состояние электрода и изолятора свечи напрямую отражает процесс сгорания в цилиндре.',
          'Spark plug reading directly reveals combustion air-fuel ratio and oil control health.'
        )
      ),
      qSingle(
        't2_q10',
        TOPICS.ignition,
        L(
          'Uchqun shami zazori me’yordan kattalashib ketsa (masalan 1.6 mm), o‘t oldirish tizimiga qanday ta’sir qiladi?',
          'К чему приводит чрезмерно увеличенный искровой зазор свечи (например, 1.6 мм)?',
          'How does an excessively wide spark plug gap (e.g. 1.6 mm) affect the ignition system?'
        ),
        [
          L('Teshish kuchlanishi (kV) keskin oshadi va g‘altak izolyatsiyasi teshiladi', 'Растёт напряжение пробоя и катушка выходит из строя', 'Firing voltage spikes, risking coil insulation breakdown and misfires'),
          L('Yonilg‘i sarfi 50% kamayadi', 'Расход топлива падает на 50%', 'Fuel economy improves by 50%'),
          L('Kompressiya ko‘tariladi', 'Компрессия повышается', 'Compression rises'),
          L('Hech qanday ta’siri yo‘q', 'Никак не влияет', 'No effect on ignition load'),
        ],
        0,
        L(
          "Katta zazorni teshib o'tish uchun yuqori kuchlanish kerak bo'ladi, bu esa COP g'altagi izolyatsiyasini tez ishdan chiqaradi.",
          'Для пробоя широкого зазора требуется высокое напряжение, что ведёт к пробою наконечника и катушки.',
          'Wider gaps demand higher secondary voltage, overloading coil windings and boots.'
        )
      ),
    ],
  },
  {
    id: 'test_3',
    title: L(
      '3-test: OBD-II, Fuel Trim va Datchiklar',
      'Тест 3: OBD-II, топливные коррекции и датчики',
      'Test 3: OBD-II, Fuel Trims & Sensor Diagnostics'
    ),
    description: L(
      "STFT/LTFT, P0171/P0420 kodlari va O2, MAF, CKP datchiklarini tahlil qilish bo'yicha 10 ta savol.",
      '10 вопросов по STFT/LTFT, ошибкам P0171/P0420 и проверке датчиков.',
      '10 questions on STFT/LTFT fuel trims, P0171/P0420 codes, and sensor testing.'
    ),
    moduleTag: L('3-modul', 'Модуль 3', 'Module 3'),
    durationMinutes: 12,
    passScore: 70,
    shuffleQuestions: false,
    published: true,
    questions: [
      qSingle(
        't3_q1',
        TOPICS.obd,
        L(
          'P0171 kodi bilan kelgan mashinada salt yurishda LTFT +22%, 2500 ayl/min da esa +2% ga tushsa, eng ehtimoliy sabab nima?',
          'При ошибке P0171 коррекция LTFT на ХХ равна +22%, а на 2500 об/мин падает до +2%. Что это?',
          'A vehicle with P0171 shows +22% LTFT at idle, dropping to +2% at 2,500 RPM. What is the most likely fault?'
        ),
        [
          L('Kiritish traktida vakuum havo so‘rishi (Vacuum leak)', 'Подсос неучтённого воздуха во впуске', 'Intake manifold / hose vacuum leak'),
          L('Yonilg‘i nasosi kuchsiz', 'Слабый бензонасос', 'Weak fuel pump'),
          L('Katalizator tiqilgan', 'Забит катализатор', 'Plugged catalytic converter'),
          L('Injektorlar oqayapti', 'Течь форсунок', 'Leaking fuel injectors'),
        ],
        0,
        L(
          "Salt yurishda vakuum maksimal bo'lgani uchun havo ko'proq so'riladi; oborot oshganda vakuum kamayib, so'rilgan havo ulushi sezilmay qoladi.",
          'На ХХ разрежение максимально, поэтому подсос сильно обедняет смесь; с ростом оборотов доля подсоса падает.',
          'High idle vacuum pulls air through leaks; at 2,500 RPM airflow increases and vacuum drops, reducing the leak percentage.'
        ),
        'P0171'
      ),
      qSingle(
        't3_q2',
        TOPICS.obd,
        L(
          'Sog‘lom sirkoniy (narrowband) B1S1 kislorod datchigi yopiq konturda qanday kuchlanish oralig‘ida tebranadi?',
          'В каком диапазоне напряжений колеблется исправный циркониевый датчик B1S1 в Closed Loop?',
          'What voltage range does a healthy narrowband zirconia B1S1 O2 sensor switch across in Closed Loop?'
        ),
        [L('0.1V – 0.9V', '0.1 В – 0.9 В', '0.1V – 0.9V'), L('2.5V – 5.0V', '2.5 В – 5.0 В', '2.5V – 5.0V'), L('12.0V – 14.4V', '12.0 В – 14.4 В', '12.0V – 14.4V'), L('0.01V – 0.05V', '0.01 В – 0.05 В', '0.01V – 0.05V')],
        0,
        L(
          "0.1V kambag'al (lean), 0.9V boy (rich) aralashmani bildiradi; tez almashib turish me'yor.",
          '0.1 В — бедная смесь, 0.9 В — богатая смесь; быстрое переключение около 0.45 В — норма.',
          'Narrowband zirconia sensors toggle rapidly between ~0.1V (lean) and ~0.9V (rich).'
        )
      ),
      qSingle(
        't3_q3',
        TOPICS.obd,
        L(
          'Katalizatordan keyingi B1S2 datchigi signalining B1S1 bilan bir xil sinusoida chizishi qaysi kodni keltirib chiqaradi?',
          'Какая ошибка появится, если сигнал второго зонда B1S2 повторяет колебания первого зонда B1S1?',
          'If downstream B1S2 O2 voltage mirrors upstream B1S1 switching, which DTC will trigger?'
        ),
        [L('P0420', 'P0420', 'P0420'), L('P0102', 'P0102', 'P0102'), L('P0335', 'P0335', 'P0335'), L('P0507', 'P0507', 'P0507')],
        0,
        L(
          "B1S2 ning tebranishi katalizator kislorodni saqlay olmayotganini (P0420) tasdiqlaydi.",
          'Повторение сигнала означает потерю кислородной ёмкости катализатора — ошибка P0420.',
          'Mirrored B1S2 switching proves the catalytic converter lost oxygen storage capacity (P0420).'
        ),
        'P0420'
      ),
      qBool(
        't3_q4',
        TOPICS.obd,
        L(
          'Sovuq dvigatelda kalit yoqilganda (dvigatel o‘chiq — KOEO) ECT va IAT datchiklari deyarli bir xil haroratni ko‘rsatishi kerak.',
          'На холодном заглушенном двигателе (KOEO) показания ДТОЖ (ECT) и ДТВВ (IAT) должны быть близки к температуре окружающей среды.',
          'On a cold engine at key-on engine-off (KOEO), ECT and IAT readings should closely match ambient temperature.'
        ),
        true,
        L(
          "To'g'ri! Agar bir kecha turgan mashinada ECT +60°C ko'rsatsa, demak datchik yoki simda muammo (bias) bor.",
          'Верно! Большая разница на остывшем моторе сразу выявляет «врущий» терморезистор.',
          'True. A wide discrepancy after an overnight cold soak reveals a skewed thermistor or circuit resistance.'
        )
      ),
      qSingle(
        't3_q5',
        TOPICS.obd,
        L(
          'Stexiometrik havo-yonilg‘i nisbati (benzin uchun) qanchaga teng?',
          'Чему равно стехиометрическое соотношение воздух/топливо для бензина?',
          'What is the ideal stoichiometric air-to-fuel mass ratio for gasoline?'
        ),
        [L('10.5 : 1', '10.5 : 1', '10.5 : 1'), L('14.7 : 1', '14.7 : 1', '14.7 : 1'), L('18.2 : 1', '18.2 : 1', '18.2 : 1'), L('22.0 : 1', '22.0 : 1', '22.0 : 1')],
        1,
        L(
          "1 kg benzin to'liq yonishi uchun nazariy jihatdan 14.7 kg havo kerak (Lambda = 1.0).",
          'Для полного сгорания 1 кг бензина требуется 14.7 кг воздуха (λ = 1.0).',
          'Stoichiometric gasoline combustion requires 14.7 parts air to 1 part fuel by mass (λ = 1.0).'
        )
      ),
      qMulti(
        't3_q6',
        TOPICS.obd,
        L(
          'Salbiy (-) yonilg‘i korreksiyasi (masalan LTFT -18%, P0172) qaysi nosozliklardan kelib chiqishi mumkin?',
          'Какие неисправности вызывают сильную отрицательную коррекцию (-18%, P0172)?',
          'Which faults can cause negative fuel trims (-18% LTFT / P0172)?'
        ),
        [
          L('Oqayotgan yonilg‘i injektori', 'Негерметичная форсунка', 'Leaking fuel injector'),
          L('EVAP tozalash klapani ochiq qolgan', 'Заклинивший клапан продувки адсорбера', 'Stuck-open EVAP purge solenoid'),
          L('Yonilg‘i bosimi haddan tashqari yuqori', 'Завышенное давление топлива', 'Excessive fuel rail pressure'),
          L('Vakuum shlangi uzilgan', 'Сорванный вакуумный шланг', 'Disconnected vacuum hose'),
        ],
        [0, 1, 2],
        L(
          "Ortiqcha yonilg'i yoki bug' tushishi aralashmani boyitadi, ECU esa injektor impulsini qisqartirib salbiy (-) korreksiya beradi.",
          'Избыток топлива или паров из EVAP заставляет ЭБУ убавлять подачу в минус. Подсос воздуха даёт плюс.',
          'Excess fuel or unmetered EVAP vapor makes the mixture rich, forcing the ECU to pull fuel (negative trim).'
        )
      ),
      qSingle(
        't3_q7',
        TOPICS.obd,
        L(
          'Xoll effektli (Hall-effect) CKP yoki CMP datchigining ossillografdagi chiqish signali qanday shaklda bo‘ladi?',
          'Какую форму сигнала на осциллографе выдаёт датчик Холла (ДПКВ/ДПРВ)?',
          'What waveform shape does a Hall-effect CKP or CMP sensor produce on an oscilloscope?'
        ),
        [
          L("To'g'ri burchakli impuls (Square wave, 0–5V)", 'Прямоугольные импульсы (меандр 0–5 В)', 'Crisp 0–5V square wave'),
          L('O‘zgaruvchan amplitudali sinusoida', 'Аналоговая синусоида', 'Variable-amplitude AC sine wave'),
          L('Doimiy 12V tekis chiziq', 'Ровная линия 12 В', 'Flat 12V DC line'),
          L('Arra tishli signal', 'Пилообразный сигнал', 'Sawtooth ramp'),
        ],
        0,
        L(
          "Xoll datchigi doimiy amplitudali to'g'ri burchakli raqamli signal chiqaradi; sinusoida esa induktiv datchikka xos.",
          'Датчик Холла генерирует чёткий прямоугольный сигнал; синусоиду выдаёт индуктивный датчик.',
          'Hall-effect sensors output clean 0–5V square waves, whereas inductive sensors produce AC sine waves.'
        )
      ),
      qSingle(
        't3_q8',
        TOPICS.obd,
        L(
          'P0128 xatosi ko‘pincha qaysi detalning ochiq holatda qotib qolishidan kelib chiqadi?',
          'Заклинивание какого элемента в открытом положении чаще всего вызывает код P0128?',
          'Code P0128 is most commonly caused by which component sticking open?'
        ),
        [L('Termostat', 'Термостат', 'Cooling thermostat'), L('MAF datchigi', 'ДМРВ', 'MAF sensor'), L('EGR klapani', 'Клапан EGR', 'EGR valve'), L('Benzin nasosi', 'Бензонасос', 'Fuel pump')],
        0,
        L(
          "Termostat ochiq qolsa dvigatel ishchi haroratga kech chiqadi va P0128 yoziladi.",
          'Открытый термостат не даёт двигателю прогреться до рабочей температуры в расчётное время.',
          'A thermostat stuck open prevents coolant from reaching operating temperature within the monitor window.'
        ),
        'P0128'
      ),
      qMatch(
        't3_q9',
        TOPICS.obd,
        L(
          'OBD-II datchik qisqartmalarini vazifasi bilan moslashtiring:',
          'Сопоставьте аббревиатуры датчиков OBD-II с их назначением:',
          'Match each OBD-II sensor acronym with its measurement:'
        ),
        [
          { id: 'd1', left: L('MAF', 'ДМРВ (MAF)', 'MAF'), right: L('Kiruvchi havo massasi (g/s)', 'Массовый расход воздуха', 'Mass airflow rate (g/s)') },
          { id: 'd2', left: L('ECT', 'ДТОЖ (ECT)', 'ECT'), right: L('Sovutish suyuqligi harorati', 'Температура охлаждающей жидкости', 'Engine coolant temperature') },
          { id: 'd3', left: L('CKP', 'ДПКВ (CKP)', 'CKP'), right: L('Tirsakli val holati va RPM', 'Положение и обороты коленвала', 'Crankshaft position & RPM') },
          { id: 'd4', left: L('TPS', 'ДПДЗ (TPS)', 'TPS'), right: L('Drossel qopqog‘i burchagi', 'Угол открытия дросселя', 'Throttle plate angle') },
        ],
        L(
          "Datchik qisqartmalarini bilish jonli parametrlarni (Live Data) tez o'qish imkonini beradi.",
          'Знание стандартных аббревиатур необходимо для чтения потока данных любого сканера.',
          'Recognizing standard SAE J1979 acronyms accelerates scan-tool live data analysis.'
        )
      ),
      qSingle(
        't3_q10',
        TOPICS.obd,
        L(
          'Freeze Frame (muzlatilgan kadr) nima uchun kerak?',
          'Для чего служит функция Freeze Frame (стоп-кадр) в диагностике?',
          'What is the purpose of OBD-II Freeze Frame data?'
        ),
        [
          L('Xato kodi yozilgan lahzadagi dvigatel parametrlarini saqlab qolish uchun', 'Фиксирует параметры работы ДВС в момент возникновения ошибки', 'Captures a snapshot of engine sensor conditions at the moment a DTC was set'),
          L('Dvigatelni sovutish uchun', 'Для охлаждения ЭБУ', 'To cool the ECU'),
          L('Kalitni dasturlash uchun', 'Для прописки ключей', 'For immobilizer key programming'),
          L('Moy almashtirish hisoblagichini o‘chirish uchun', 'Для сброса сервиса масла', 'To reset the oil life monitor'),
        ],
        0,
        L(
          "Freeze Frame nosozlik qaysi harorat, RPM va yuklamada sodir bo'lganini ko'rsatadi.",
          'Стоп-кадр показывает обороты, температуру, нагрузку и коррекции в момент записи кода DTC.',
          'Freeze Frame records RPM, load, coolant temp, and fuel trims at the exact instant the fault occurred.'
        )
      ),
    ],
  },
  {
    id: 'test_4',
    title: L(
      '4-test: Kompressiya, Ossillograf va TXK',
      'Тест 4: Компрессия, осциллограф и регламент ТО',
      'Test 4: Compression, Oscilloscope & Maintenance'
    ),
    description: L(
      "Quruq/moyli kompressiya, Leak-Down testi, nisbiy kompressiya va texnik xizmat intervallari bo'yicha 10 ta savol.",
      '10 вопросов по замерам компрессии, пневмотесту, осциллографии и интервалам ТО.',
      '10 questions on compression testing, leak-down, current-clamp diagnostics, and service intervals.'
    ),
    moduleTag: L('4–6 modullar', 'Модули 4–6', 'Modules 4–6'),
    durationMinutes: 12,
    passScore: 70,
    shuffleQuestions: false,
    published: true,
    questions: [
      qSingle(
        't4_q1',
        TOPICS.compression,
        L(
          'Quruq testda 3-silindr 7.5 bar ko‘rsatdi. 5 ml moy quyib o‘lchanganda 11.8 bar ga ko‘tarildi. Nosozlik qayerda?',
          'На сухом тесте 3-й цилиндр показал 7.5 бар, после добавления 5 мл масла — 11.8 бар. В чём причина?',
          'Cylinder #3 reads 7.5 bar dry and jumps to 11.8 bar after adding 5 mL of oil. Where is the leak?'
        ),
        [
          L('Porshen halqalari yeyilgan yoki qotib qolgan', 'Износ или залегание поршневых колец', 'Worn or stuck piston rings'),
          L('Chiqarish klapani kuygan', 'Прогар выпускного клапана', 'Burned exhaust valve'),
          L('O‘t oldirish g‘altagi nosoz', 'Неисправна катушка', 'Faulty ignition coil'),
          L('GBS prokladkasi', 'Прокладка ГБЦ', 'Blown head gasket'),
        ],
        0,
        L(
          "Moy vaqtincha porshen halqalari tirqishini yopadi; klapan yoki prokladkada moy kompressiyani oshira olmaydi.",
          'Масло уплотняет зазор между поршнем и гильзой. На прогар клапана масло не влияет.',
          'Oil temporarily seals worn piston rings; it cannot seal a leaking cylinder head valve or gasket.'
        )
      ),
      qSingle(
        't4_q2',
        TOPICS.compression,
        L(
          'Qo‘shni ikkita silindrda (masalan 2 va 3-silindrlarda) bir xil past kompressiya (6.0 bar) bo‘lishi odatda nimani anglatadi?',
          'Одинаково низкая компрессия в двух соседних цилиндрах (например, 2 и 3) обычно указывает на:',
          'Equally low compression in two adjacent cylinders (e.g., #2 and #3) typically indicates:'
        ),
        [
          L('Silindrlar orasidagi GBS prokladkasi kuygan', 'Прогар перемычки прокладки ГБЦ между цилиндрами', 'Head gasket breach between the two adjacent cylinders'),
          L('Havo filtri iflos', 'Грязный воздушный фильтр', 'Dirty air filter'),
          L('Generator remeni bo‘sh', 'Слабый ремень генератора', 'Loose alternator belt'),
          L('O2 datchigi uzilgan', 'Обрыв ДК', 'Open O2 sensor'),
        ],
        0,
        L(
          "Ikki qo'shni silindr orasidagi yupqa metall-qistirma devori kuyganda bosim bir silindrdan ikkinchisiga o'tib ketadi.",
          'При пробое перемычки прокладки ГБЦ газы перетекают из одного цилиндра в соседний.',
          'Combustion pressure leaks back and forth between the two cylinders across a failed gasket bridge.'
        )
      ),
      qBool(
        't4_q3',
        TOPICS.compression,
        L(
          'Kompressiya o‘lchashda barcha uchqun shamlari yechilishi va drossel qopqog‘i to‘liq ochilishi (gaz oxirigacha bosilishi) shart.',
          'При замере компрессии необходимо выкрутить все свечи и полностью открыть дроссельную заслонку.',
          'All spark plugs should be removed and the throttle held wide open during a cranking compression test.'
        ),
        true,
        L(
          "To'g'ri! Bu starterga bir xil tezlik beradi va silindrlarga havo erkin kirishini ta'minlaydi.",
          'Верно! Это обеспечивает максимальное наполнение цилиндров и стабильные обороты стартера.',
          'True. Removing all plugs maximizes cranking speed and WOT ensures unrestricted cylinder air fill.'
        )
      ),
      qSingle(
        't4_q4',
        TOPICS.compression,
        L(
          'Leak-Down testida siqilgan havo chiqarish trubasidan (glushiteldan) shivillab chiqsa, qaysi detal nosoz?',
          'Если при пневмотесте (Leak-Down) воздух шипит из выхлопной трубы, что негерметично?',
          'During a cylinder leak-down test, air hissing from the tailpipe indicates a leak past the:'
        ),
        [
          L('Chiqarish klapani', 'Выпускной клапан', 'Exhaust valve'),
          L('Kiritish klapani', 'Впускной клапан', 'Intake valve'),
          L('Porshen halqalari', 'Поршневые кольца', 'Piston rings'),
          L('Moy filtri', 'Масляный фильтр', 'Oil filter'),
        ],
        0,
        L(
          "Chiqarishdan — chiqarish klapani; drosseldan — kiritish klapani; moy quyish bo'g'zidan — halqalar; radiatordan — GBS prokladkasi.",
          'Выхлоп — выпускной клапан; впуск — впускной клапан; маслозаливная горловина — кольца; бачок ОЖ — прокладка ГБЦ.',
          'Tailpipe = exhaust valve; throttle body = intake valve; oil filler/dipstick = rings; radiator = head gasket.'
        )
      ),
      qSingle(
        't4_q5',
        TOPICS.compression,
        L(
          'Tok qisqichlari (ampermetr) bilan nisbiy kompressiya testida zaif silindr qanday ko‘rinadi?',
          'Как на осциллограмме относительной компрессии токовыми клещами выглядит слабый цилиндр?',
          'On a relative compression waveform using a starter current clamp, how does a low-compression cylinder appear?'
        ),
        [
          L('Starter tok cho‘qqisi (amperaj) boshqalardan sezilarli past bo‘ladi', 'Пик пускового тока стартера на этом цилиндре заметно ниже', 'A noticeably lower amperage peak compared to the other cylinders'),
          L('Tok cho‘qqisi 2 barobar yuqori bo‘ladi', 'Пик тока в 2 раза выше', 'Twice as high amperage'),
          L('Kuchlanish 24V ga chiqadi', 'Напряжение растёт до 24 В', 'Voltage spikes to 24V'),
          L('Signal yo‘qolmaydi, hammasi bir xil', 'Все пики одинаковы', 'All peaks remain identical'),
        ],
        0,
        L(
          "Siqish qarshiligi kam bo'lgan silindrni o'tkazish uchun starter kamroq tok iste'mol qiladi.",
          'Цилиндр с утечкой создаёт меньшее сопротивление сжатию, поэтому стартер потребляет меньше тока.',
          'Less compression resistance requires less torque from the starter motor, resulting in a lower current peak.'
        )
      ),
      qSingle(
        't4_q6',
        TOPICS.maintenance,
        L(
          'Sovutish tizimidagi antifrizning muzlash harorati va zichligi qaysi asbob bilan tekshiriladi?',
          'Каким прибором точно проверяют температуру замерзания антифриза?',
          'Which tool accurately measures engine coolant freeze protection point?'
        ),
        [L('Refraktometr', 'Рефрактометр', 'Optical refractometer'), L('Kompressometr', 'Компрессометр', 'Compression gauge'), L('Stroboskop', 'Стробоскоп', 'Timing light'), L('Shup', 'Щуп', 'Feeler gauge')],
        0,
        L(
          "Optik refraktometr bir tomchi antifrizning etilenglikol konsentratsiyasi va muzlash haroratini aniq ko'rsatadi.",
          'Рефрактометр определяет концентрацию гликоля и точку кристаллизации по одной капле.',
          'An optical refractometer accurately reads glycol concentration and freeze temperature from one drop.'
        )
      ),
      qMulti(
        't4_q7',
        TOPICS.maintenance,
        L(
          'Og‘ir ekspluatatsiya sharoitlariga (Severe Service) qaysilar kiradi? (Moy almashtirish oralig‘i qisqaradi)',
          'Что относится к тяжёлым условиям эксплуатации (сокращение интервала замены масла)?',
          'Which driving patterns qualify as Severe Service requiring shorter oil change intervals?'
        ),
        [
          L('Qisqa masofali shahar tirbandliklari', 'Короткие поездки и пробки в городе', 'Frequent short trips and stop-and-go traffic'),
          L('Changli yo‘llar va haddan tashqari issiq/sovuq', 'Пыльные дороги и экстремальные температуры', 'Dusty roads and extreme hot/cold ambient temps'),
          L('Tirkama tortish va tog‘li yo‘llar', 'Буксировка прицепа и горная местность', 'Trailer towing and mountain grades'),
          L('Tezlik 90 km/soat da tekis trassada yurish', 'Равномерная езда по трассе 90 км/ч', 'Steady 90 km/h highway cruising'),
        ],
        [0, 1, 2],
        L(
          "Qisqa safarlar, tirbandlik, chang va og'ir yuk moyning oksidlanishi va namlanishini tezlashtiradi.",
          'Пробки, короткие поездки, пыль и нагрузки ускоряют старение масла и образование шлама.',
          'Short trips, traffic idling, dust, and heavy loads accelerate oil dilution and oxidation.'
        )
      ),
      qSingle(
        't4_q8',
        TOPICS.maintenance,
        L(
          'Zamonaviy turbinali GDI dvigatellarda LSPI (past oborotda muddatidan oldingi yonish) dan himoyalovchi moy standarti qaysi?',
          'Какая спецификация моторного масла защищает турбомоторы GDI от эффекта LSPI?',
          'Which API engine oil specification is specifically formulated to protect turbo GDI engines from LSPI?'
        ),
        [L('API SF', 'API SF', 'API SF'), L('API SP (yoki SN Plus)', 'API SP (или SN Plus)', 'API SP (or SN Plus)'), L('API GL-4', 'API GL-4', 'API GL-4'), L('DOT 4', 'DOT 4', 'DOT 4')],
        1,
        L(
          "API SN Plus va API SP standartlari kalsiy miqdorini kamaytirib LSPI detonatsiyasining oldini oladi.",
          'Стандарты API SN Plus и API SP разработаны специально для предотвращения LSPI в двигателях с прямым впрыском.',
          'API SP (and SN Plus) modifies detergent chemistry to prevent low-speed pre-ignition in GDI engines.'
        )
      ),
      qSingle(
        't4_q9',
        TOPICS.maintenance,
        L(
          'Starter manfiy zanjirida (AKB minusidan dvigatel blokigacha) ruxsat etilgan maksimal kuchlanish tushishi (Voltage Drop) qancha?',
          'Какое максимальное падение напряжения допустимо в минусовой цепи (от АКБ к блоку ДВС) при прокрутке стартера?',
          'What is the maximum acceptable voltage drop on the starter ground path (battery negative to engine block) while cranking?'
        ),
        [L('< 0.2 V', '< 0.2 В', '< 0.2 V'), L('2.5 V', '2.5 В', '2.5 V'), L('5.0 V', '5.0 В', '5.0 V'), L('12.0 V', '12.0 В', '12.0 V')],
        0,
        L(
          "Yuklama ostida massa zanjirida 0.2V dan ortiq yo'qotish kontakt oksidlanganini bildiradi.",
          'Падение свыше 0.2 В по массе под нагрузкой говорит о коррозии или плохом креплении провода.',
          'More than 0.2V drop across the ground strap under cranking load indicates high resistance.'
        )
      ),
      qBool(
        't4_q10',
        TOPICS.maintenance,
        L(
          'GRM kamari almashtirilganda faqat kamarning o‘zini almashtirib, roliklarni eski holida qoldirish tavsiya etiladi.',
          'При замене ремня ГРМ достаточно заменить только сам ремень, оставив старые ролики.',
          'When replacing a timing belt, it is recommended to replace only the belt and reuse old tensioners and idlers.'
        ),
        false,
        L(
          "Noto'g'ri! Eski rolik podshipnigi qotib qolsa, yangi GRM kamari ham bir necha ming km da uzilib ketadi.",
          'Неверно! Заклинивание старого ролика приведёт к обрыву нового ремня и загибу клапанов.',
          'False. A seized old idler or tensioner bearing can shred a brand-new timing belt prematurely.'
        )
      ),
    ],
  },
  {
    id: 'test_5',
    title: L(
      '5-test: Yakuniy Sertifikat Imtihoni',
      'Тест 5: Итоговый сертификационный экзамен',
      'Test 5: Final Certification Examination'
    ),
    description: L(
      "Barcha 6 modulni qamrab oluvchi yakuniy imtihon. 70% va undan yuqori natija bilan PDF sertifikat oling!",
      'Комплексный итоговый экзамен по всем 6 модулям. Наберите от 70% для получения PDF-сертификата!',
      'Comprehensive final exam across all 6 modules. Score 70% or higher to earn your verified PDF certificate.'
    ),
    moduleTag: L('Yakuniy imtihon', 'Итоговый экзамен', 'Final Exam'),
    durationMinutes: 15,
    passScore: 70,
    isFinalExam: true,
    shuffleQuestions: true,
    published: true,
    questions: [
      qSingle(
        't5_q1',
        TOPICS.obd,
        L(
          'Dvigatel qiziganda to‘satdan o‘chib qoladi, starter aylanadi lekin skanerda RPM = 0 ko‘rsatadi va uchqun/injektor yo‘q. Qaysi datchik aybdor?',
          'Двигатель глохнет при прогреве, при прокрутке сканер показывает 0 об/мин, нет искры и импульса форсунок. Что отказало?',
          'An engine stalls hot, cranks normally, shows 0 RPM on scan data, and has no spark or injector pulse. What failed?'
        ),
        [
          L('CKP (Tirsakli val holati datchigi)', 'ДПКВ (Датчик положения коленвала)', 'Crankshaft Position (CKP) sensor'),
          L('IAT (Havo harorati datchigi)', 'ДТВВ (Датчик температуры воздуха)', 'Intake Air Temperature (IAT) sensor'),
          L('B1S2 O2 datchigi', 'Второй лямбда-зонд B1S2', 'Downstream O2 sensor'),
          L('EVAP klapani', 'Клапан адсорбера', 'EVAP purge valve'),
        ],
        0,
        L(
          "ECU CKP signalisiz tirsakli val aylanayotganini ko'rmaydi va xavfsizlik uchun uchqun hamda yonilg'ini bloklaydi.",
          'Без сигнала ДПКВ ЭБУ не видит вращения двигателя и блокирует искру и подачу топлива.',
          'Without a CKP signal, the ECU cannot detect crank rotation and disables both ignition and fuel injection.'
        ),
        'P0335'
      ),
      qSingle(
        't5_q2',
        TOPICS.ignition,
        L(
          'Ikkilamchi o‘t oldirish ossillogrammasida yonish chizig‘idan keyingi so‘nuvchi tebranishlar (ringing) umuman yo‘q bo‘lsa, bu nimani bildiradi?',
          'Что означает полное отсутствие затухающих колебаний после линии горения искры на осциллограмме катушки?',
          'What does the complete absence of post-burn coil oscillations on a secondary ignition waveform indicate?'
        ),
        [
          L("G'altak o'ramlarida ichki qisqa tutashuv bor", 'Межвитковое замыкание в катушке зажигания', 'Internal shorted windings in the ignition coil'),
          L('Uchqun shami yangi', 'Свеча зажигания новая', 'Brand-new spark plug'),
          L('Aralashma ideal', 'Идеальная смесь', 'Ideal air-fuel ratio'),
          L('Vakuum yuqori', 'Высокий вакуум', 'High intake vacuum'),
        ],
        0,
        L(
          "Sog'lom g'altakda energiya tugagach 3–5 ta tebranish qoladi; qisqa tutashuv bu tebranishni so'ndirib yuboradi.",
          'Затухающие колебания возникают за счёт добротности обмотки; при межвитковом КЗ они исчезают.',
          'Shorted windings absorb magnetic energy, eliminating the normal 3–5 ringing oscillations.'
        )
      ),
      qSingle(
        't5_q3',
        TOPICS.obd,
        L(
          'P0171 (Lean) xatosi bilan kelgan avtomobilda salt yurishda LTFT +3%, 2500 ayl/min yuklamada esa +24% bo‘lsa, nima sabab?',
          'При P0171 коррекция LTFT на ХХ равна +3%, а под нагрузкой (2500 об/мин) растёт до +24%. Вероятная причина:',
          'With P0171, LTFT is +3% at idle but climbs to +24% under load at 2,500 RPM. What is the likely cause?'
        ),
        [
          L('Yonilg‘i nasosi unumdorligi past / filtr tiqilgan / MAF kirlangan', 'Низкая производительность бензонасоса / грязный ДМРВ', 'Weak fuel pump, clogged fuel filter, or skewed MAF sensor'),
          L('Kichik vakuum shlangi chiqib ketgan', 'Слетел тонкий вакуумный шланг', 'Small idle vacuum hose leak'),
          L('Termostat qotib qolgan', 'Заклинил термостат', 'Stuck thermostat'),
          L('Tormoz suyuqligi kam', 'Низкий уровень тормозной жидкости', 'Low brake fluid'),
        ],
        0,
        L(
          "Yuklama oshganda yonilg'iga talab ko'payadi; zaif nasos yoki kam o'lchaydigan MAF yuqori oborotda aralashmani och qoldiradi.",
          'Под нагрузкой расход топлива максимален — нехватка подачи насоса или занижение показаний ДМРВ проявляются именно на оборотах.',
          'Under load fuel demand peaks; restricted fuel delivery or an under-reporting MAF drives trims strongly positive at high RPM.'
        ),
        'P0171'
      ),
      qSingle(
        't5_q4',
        TOPICS.compression,
        L(
          '4 silindrli dvigatel kompressiyasi: 1-silindr 13.0 bar, 2-silindr 12.8 bar, 3-silindr 12.9 bar, 4-silindr 9.2 bar. Maksimal farq taxminan necha foiz?',
          'Замер компрессии: Ц1=13.0, Ц2=12.8, Ц3=12.9, Ц4=9.2 бар. Каков максимальный разброс в процентах?',
          'Compression reads Cyl 1: 13.0 bar, Cyl 2: 12.8 bar, Cyl 3: 12.9 bar, Cyl 4: 9.2 bar. What is the approximate variance?'
        ),
        [L('~5%', '~5%', '~5%'), L('~12%', '~12%', '~12%'), L('~29% (me’yordan oshgan)', '~29% (выше нормы)', '~29% (exceeds 15% limit)'), L('~50%', '~50%', '~50%')],
        2,
        L(
          '(13.0 - 9.2) / 13.0 = 29.2%. 15% dan yuqori farq 4-silindrda mexanik ta’mir zarurligini bildiradi.',
          '(13.0 - 9.2) / 13.0 ≈ 29.2%, что значительно превышает допустимый порог 10–15%.',
          '(13.0 - 9.2) / 13.0 = 29.2%, well beyond the 10–15% maximum allowable cylinder variance.'
        )
      ),
      qBool(
        't5_q5',
        TOPICS.obd,
        L(
          'O2 datchigi qizdirgich zanjiri xatosi (P0135) aniqlanganda birinchi navbatda datchik qizdirish elementining qarshiligi va +12V ta’minoti tekshiriladi.',
          'При коде P0135 (цепь подогрева ДК1) в первую очередь проверяют сопротивление нагревателя и питание +12 В на фишке.',
          'When diagnosing O2 heater code P0135, first test heater element resistance and the 12V heater power supply.'
        ),
        true,
        L(
          "To'g'ri! Ko'pincha P0135 sug'urta kuyishi yoki zond ichidagi spiral uzilishidan kelib chiqadi.",
          'Верно! Чаще всего виноват обрыв спирали внутри зонда или сгоревший предохранитель цепи подогрева.',
          'True. Open internal heater elements and blown heater fuses account for the majority of P0135 cases.'
        )
      ),
      qMulti(
        't5_q6',
        TOPICS.maintenance,
        L(
          'Kengaytirish bachogida (radiatorda) pufakchalar chiqishi va moy qopqog‘ida oq emulsiya hosil bo‘lishi qaysi nosozlik belgilaridir?',
          'Пузыри в расширительном бачке и белая эмульсия на крышке заливной горловины указывают на:',
          'Exhaust bubbles in the coolant reservoir and milky oil emulsion under the cap point to:'
        ),
        [
          L('GBS prokladkasi teshilishi', 'Пробой прокладки ГБЦ', 'Blown cylinder head gasket'),
          L('Silindr bloki yoki golovkada yoriq', 'Трещина в ГБЦ или блоке цилиндров', 'Cracked cylinder head or block'),
          L('Uchqun shami zazori', 'Зазор свечей', 'Spark plug gap'),
          L('Sovutish tizimiga gaz o‘tishi', 'Прорыв выхлопных газов в систему охлаждения', 'Combustion gas ingress into cooling jacket'),
        ],
        [0, 1, 3],
        L(
          "Gazlarning sovutish tizimiga o'tishi va moy bilan antifriz aralashishi GBS prokladkasi yoki yoriq belgisidir.",
          'Прорыв газов в ОЖ и эмульсия в масле — классические симптомы пробоя прокладки или трещины ГБЦ.',
          'Combustion gases pressurizing coolant and milky oil confirm a breached head gasket or cracked casting.'
        )
      ),
      qMatch(
        't5_q7',
        TOPICS.obd,
        L(
          'OBD-II kodlarini ularning aniq ma’nosi bilan moslashtiring:',
          'Сопоставьте коды OBD-II с их расшифровкой:',
          'Match each OBD-II fault code with its definition:'
        ),
        [
          { id: 'f1', left: L('P0420', 'P0420', 'P0420'), right: L('Katalizator samaradorligi past', 'Низкая эффективность катализатора', 'Catalyst efficiency below threshold') },
          { id: 'f2', left: L('P0171', 'P0171', 'P0171'), right: L('Kambag‘al aralashma (Bank 1)', 'Слишком бедная смесь (Банк 1)', 'System too lean (Bank 1)') },
          { id: 'f3', left: L('P0302', 'P0302', 'P0302'), right: L('2-silindrda misfire', 'Пропуски в 2-м цилиндре', 'Cylinder 2 misfire detected') },
          { id: 'f4', left: L('P0455', 'P0455', 'P0455'), right: L('EVAP tizimida katta sizish', 'Крупная утечка EVAP', 'EVAP system gross leak') },
        ],
        L(
          "Asosiy P0xxx kodlarini yoddan bilish diagnostika jarayonini bir necha barobar tezlashtiradi.",
          'Свободная ориентация в базовых кодах DTC ускоряет первичную оценку неисправности.',
          'Fluency with core SAE P0xxx codes accelerates initial scan-tool triage.'
        )
      ),
      qSingle(
        't5_q8',
        TOPICS.ignition,
        L(
          "Rasmdagi o'rta komponentning asosiy diagnostik ko'rsatkichi qaysi asbob bilan tekshiriladi?",
          'Каким инструментом проверяется зазор центрального компонента на фотографии?',
          'Which gauge is used to inspect the electrode gap of the center component shown?'
        ),
        [
          L('Simli / plastinkali shup (Spark plug gap gauge)', 'Щуп для свечей зажигания', 'Spark plug wire/blade gap gauge'),
          L('Refraktometr', 'Рефрактометр', 'Refractometer'),
          L('Kompressometr', 'Компрессометр', 'Compression tester'),
          L('Vakuum nasosi', 'Вакуумный насос', 'Vacuum pump'),
        ],
        0,
        L(
          "O'rtadagi iridiy uchqun shami zazori maxsus shup bilan (markaziy elektrodga tegmasdan) tekshiriladi.",
          'Зазор свечи зажигания измеряется щупом (для иридиевых свечей аккуратно, не касаясь тонкого электрода).',
          'Spark plug electrode gap is verified with a dedicated gap gauge without prying on the fine iridium tip.'
        ),
        undefined,
        '/src/assets/images/test_part_coil_pack_1794929843922.jpg'
      ),
      qSingle(
        't5_q9',
        TOPICS.maintenance,
        L(
          'Tormoz suyuqligi (DOT 4) tarkibidagi namlik miqdori necha foizdan oshsa almashtirilishi shart?',
          'При каком содержании влаги тормозную жидкость (DOT 4) необходимо заменить?',
          'At what moisture content percentage should DOT 4 brake fluid be flushed?'
        ),
        [L('>= 3% namlik', '>= 3% влаги', '>= 3% moisture'), L('>= 30% namlik', '>= 30% влаги', '>= 30% moisture'), L('0.1%', '0.1%', '0.1%'), L('50%', '50%', '50%')],
        0,
        L(
          "Tormoz suyuqligi gigroskopik bo'lib, 3% namlik qaynash haroratini xavfli darajada tushiradi (odatda har 2 yilda almashtiriladi).",
          'При содержании воды от 3% температура кипения DOT 4 резко падает — рекомендуется замена раз в 2 года.',
          'At 3% water absorption, boiling point drops dangerously; flush brake fluid every 2 years.'
        )
      ),
      qSingle(
        't5_q10',
        TOPICS.basics,
        L(
          'Turbo kompressorli dvigatelda P0299 (Underboost) xatosi chiqqanda eng ko‘p uchraydigan birinchi tekshiruv qaysi?',
          'Что проверяют в первую очередь при ошибке P0299 (недодув турбины)?',
          'What is the first inspection step when diagnosing P0299 (Turbocharger Underboost)?'
        ),
        [
          L('Interkuler va bosim shlanglarini yorilish/chiqib ketishga bosim bilan tekshirish', 'Опрессовка патрубков интеркулера на утечку наддува', 'Pressure/smoke-test intercooler charge pipes for boost leaks'),
          L('Uchqun shami zazorini 2 mm qilish', 'Увеличение зазора свечей до 2 мм', 'Increase spark plug gap to 2 mm'),
          L('Moy filtrini yechib qo‘yish', 'Снятие масляного фильтра', 'Remove oil filter'),
          L('Termostatni almashtirish', 'Замена термостата', 'Replace thermostat'),
        ],
        0,
        L(
          "Interkuler patrubkalari yorilishi yoki xomut bo'shashi P0299 ning 70% holatiga sabab bo'ladi.",
          'Трещина резинового патрубка интеркулера — самая частая и простая причина недодува P0299.',
          'Split charge pipes and loose intercooler clamps cause most P0299 underboost faults.'
        ),
        'P0299'
      ),
    ],
  },
];
