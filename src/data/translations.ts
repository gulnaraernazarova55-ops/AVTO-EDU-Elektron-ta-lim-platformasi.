import { Language } from '../types';

export interface TranslationDictionary {
  meta: {
    siteName: string;
    defaultDesc: string;
  };
  nav: {
    home: string;
    videos: string;
    ebooks: string;
    presentations: string;
    tests: string;
    practical: string;
    studentCabinet: string;
    teacherCabinet: string;
    verifyCert: string;
    login: string;
    register: string;
    logout: string;
    searchPlaceholder: string;
  };
  common: {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    create: string;
    submit: string;
    download: string;
    view: string;
    close: string;
    search: string;
    filter: string;
    all: string;
    reset: string;
    confirmDelete: string;
    yesDelete: string;
    noData: string;
    back: string;
    next: string;
    previous: string;
    minutes: string;
    pages: string;
    published: string;
    draft: string;
    actions: string;
    status: string;
    date: string;
    score: string;
    passed: string;
    failed: string;
    requiredField: string;
    invalidEmail: string;
    passwordShort: string;
    savedSuccess: string;
    deletedSuccess: string;
    errorOccurred: string;
    offlineBanner: string;
    installApp: string;
    installIos: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    startLearning: string;
    watchDemo: string;
    statStudents: string;
    statLessons: string;
    statVideos: string;
    statTests: string;
    courseOverviewTitle: string;
    courseTitle: string;
    courseDesc: string;
    courseLevel: string;
    courseDuration: string;
    courseModulesCount: string;
    yourProgress: string;
    continueCourse: string;
    learningPathTitle: string;
    learningPathSubtitle: string;
    pathSteps: { title: string; desc: string }[];
    featuresTitle: string;
    whyTitle: string;
    featuresList: { title: string; desc: string }[];
    whyList: { title: string; desc: string }[];
    latestMaterialsTitle: string;
    teacherTitle: string;
    teacherName: string;
    teacherRole: string;
    teacherBio: string;
    faqTitle: string;
    faqs: { q: string; a: string }[];
    contactTitle: string;
    contactSubtitle: string;
    contactName: string;
    contactEmail: string;
    contactSubject: string;
    contactMessage: string;
    contactSend: string;
    contactSuccess: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    email: string;
    password: string;
    fullName: string;
    role: string;
    roleStudent: string;
    roleTeacher: string;
    rememberMe: string;
    signIn: string;
    signUp: string;
    demoTitle: string;
    fillStudentDemo: string;
    fillTeacherDemo: string;
    noAccount: string;
    haveAccount: string;
    authRequired: string;
    wrongRole: string;
    invalidCredentials: string;
    emailExists: string;
    welcomeBack: string;
  };
  ebooks: {
    title: string;
    subtitle: string;
    categoryAll: string;
    catDiagnostics: string;
    catMaintenance: string;
    catElectrical: string;
    catReference: string;
    langAll: string;
    sortNewest: string;
    sortTitle: string;
    sortPages: string;
    gridView: string;
    listView: string;
    readPdf: string;
    downloadPdf: string;
    bookmark: string;
    bookmarked: string;
    markRead: string;
    readDone: string;
    readingProgress: string;
  };
  videos: {
    title: string;
    subtitle: string;
    modulesTitle: string;
    courseProgress: string;
    moduleProgress: string;
    markComplete: string;
    completed: string;
    prevLesson: string;
    nextLesson: string;
    descriptionTab: string;
    materialsTab: string;
    notesTab: string;
    qaTab: string;
    notesPlaceholder: string;
    saveNotes: string;
    askQuestion: string;
    postQuestion: string;
    teacherReply: string;
    playPause: string;
    speed: string;
    pip: string;
    fullscreen: string;
    shortcutsHint: string;
    embedFallback: string;
    openYoutube: string;
    keyTakeaways: string;
  };
  presentations: {
    title: string;
    subtitle: string;
    slidesCount: string;
    openViewer: string;
    downloadPptx: string;
    downloadPdf: string;
    speakerNotes: string;
    slideProgress: string;
    keyboardHint: string;
    fullscreen: string;
    exitFullscreen: string;
  };
  tests: {
    title: string;
    subtitle: string;
    startTest: string;
    retakeTest: string;
    questionsCount: string;
    timeLimit: string;
    passMark: string;
    finalExamBadge: string;
    timeRemaining: string;
    flagQuestion: string;
    flagged: string;
    submitTest: string;
    confirmSubmit: string;
    questionNavigator: string;
    resultsTitle: string;
    earnedPoints: string;
    topicStrength: string;
    answerReview: string;
    correctAnswer: string;
    yourAnswer: string;
    explanation: string;
    downloadCertificate: string;
    verifyCertificateTitle: string;
    verifyCertificateSub: string;
    enterCertId: string;
    verifyBtn: string;
    certValid: string;
    certInvalid: string;
    attemptsHistory: string;
    trueOption: string;
    falseOption: string;
    matchPrompt: string;
  };
  practical: {
    title: string;
    subtitle: string;
    tabs: {
      assignments: string;
      obd: string;
      simulator: string;
      maintenance: string;
      diagram: string;
      compression: string;
    };
    toolsRequired: string;
    safetyWarning: string;
    checklistSteps: string;
    yourReport: string;
    reportPlaceholder: string;
    attachPhoto: string;
    submitWork: string;
    resubmitWork: string;
    teacherGrade: string;
    teacherFeedback: string;
    statuses: {
      submitted: string;
      under_review: string;
      accepted: string;
      needs_revision: string;
    };
    obdSearchPlaceholder: string;
    obdSystemAll: string;
    obdSeverity: string;
    obdCauses: string;
    obdChecks: string;
    simSelectSymptoms: string;
    simAnalyze: string;
    simProbableCauses: string;
    simRecommendedChecks: string;
    simConfidence: string;
    maintMileage: string;
    maintAge: string;
    maintFuel: string;
    maintCondition: string;
    maintNormal: string;
    maintSevere: string;
    maintCalculate: string;
    maintPrint: string;
    maintDueIn: string;
    maintOverdue: string;
    maintUpcoming: string;
    diagramHint: string;
    diagramFunction: string;
    diagramFaults: string;
    compCylinders: string;
    compUnit: string;
    compDryTest: string;
    compWetTest: string;
    compAnalyze: string;
    compMaxVar: string;
    compWeakCylinders: string;
    compConclusion: string;
  };
  student: {
    title: string;
    welcome: string;
    overallProgress: string;
    xpPoints: string;
    streak: string;
    level: string;
    tabs: {
      overview: string;
      tests: string;
      assignments: string;
      notes: string;
      favorites: string;
      certificates: string;
      profile: string;
    };
    badgesTitle: string;
    leaderboardTitle: string;
    notificationsTitle: string;
    markAllRead: string;
    editProfile: string;
    uploadAvatar: string;
    languagePref: string;
    continueLearning: string;
    upcomingAssignments: string;
    recentResults: string;
  };
  teacher: {
    title: string;
    subtitle: string;
    kpiStudents: string;
    kpiCompletion: string;
    kpiAvgScore: string;
    kpiPending: string;
    tabs: {
      analytics: string;
      lessons: string;
      ebooks: string;
      presentations: string;
      tests: string;
      assignments: string;
      submissions: string;
      students: string;
      messages: string;
      backup: string;
    };
    exportCsv: string;
    exportJson: string;
    importJson: string;
    resetDemo: string;
    confirmReset: string;
    gradeSubmission: string;
    gradeLabel: string;
    feedbackLabel: string;
    statusLabel: string;
    addQuestion: string;
    addSlide: string;
    addLesson: string;
    addEbook: string;
    addPresentation: string;
    addTest: string;
    addAssignment: string;
    addAnnouncement: string;
    moveUp: string;
    moveDown: string;
    replyComment: string;
  };
  ai: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    greeting: string;
    unavailable: string;
    quickPrompts: string[];
  };
  footer: {
    tagline: string;
    platform: string;
    tools: string;
    contact: string;
    rights: string;
  };
  notFound: {
    title: string;
    desc: string;
    goHome: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  uz: {
    meta: {
      siteName: 'AVTO EDU',
      defaultDesc: "Avtomobil dvigatellarini diagnostika qilish, texnik xizmat ko'rsatish, video darslar va onlayn testlar platformasi.",
    },
    nav: {
      home: 'Bosh sahifa',
      videos: 'Video darslar',
      ebooks: 'Darsliklar',
      presentations: 'Taqdimotlar',
      tests: 'Testlar',
      practical: 'Amaliyot',
      studentCabinet: "O'quvchi kabineti",
      teacherCabinet: "O'qituvchi kabineti",
      verifyCert: 'Sertifikat tekshirish',
      login: 'Kirish',
      register: "Ro'yxatdan o'tish",
      logout: 'Chiqish',
      searchPlaceholder: 'Qidirish (Ctrl+K)...',
    },
    common: {
      loading: 'Yuklanmoqda...',
      save: 'Saqlash',
      cancel: 'Bekor qilish',
      delete: "O'chirish",
      edit: 'Tahrirlash',
      create: 'Yaratish',
      submit: 'Yuborish',
      download: 'Yuklab olish',
      view: "Ko'rish",
      close: 'Yopish',
      search: 'Qidirish',
      filter: 'Saralash',
      all: 'Barchasi',
      reset: 'Tiklash',
      confirmDelete: "Haqiqatan ham o'chirmoqchimisiz?",
      yesDelete: "Ha, o'chirilsin",
      noData: "Ma'lumot topilmadi",
      back: 'Orqaga',
      next: 'Keyingi',
      previous: 'Oldingi',
      minutes: 'daq',
      pages: 'bet',
      published: 'Chop etilgan',
      draft: 'Qoralama',
      actions: 'Amallar',
      status: 'Holat',
      date: 'Sana',
      score: 'Ball',
      passed: "O'tdi",
      failed: "O'tmadi",
      requiredField: "Ushbu maydon to'ldirilishi shart",
      invalidEmail: "Elektron pochta manzili noto'g'ri",
      passwordShort: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
      savedSuccess: "Muvaffaqiyatli saqlandi",
      deletedSuccess: "Muvaffaqiyatli o'chirildi",
      errorOccurred: "Xatolik yuz berdi",
      offlineBanner: "Oflayn rejim — keshlangan ma'lumotlar ishlatilmoqda.",
      installApp: "Ilovani o'rnatish",
      installIos: "iOS ga o'rnatish",
    },
    home: {
      heroTitle: "Avtomobil dvigatellarini professional diagnostika qilish",
      heroSubtitle: "OBD-II skanerlash, ossillograf tahlili, kompressiya va germetiklik tekshiruvi, yonilg'i va o't oldirish tizimlari bo'yicha interaktiv o'quv platformasi.",
      startLearning: "O'qishni boshlash",
      watchDemo: "Demo darsni ko'rish",
      statStudents: 'Faol talabalar',
      statLessons: 'Modullar va darslar',
      statVideos: 'Video darslar',
      statTests: 'Test savollari',
      courseOverviewTitle: "Asosiy o'quv dasturi",
      courseTitle: "Avtomobil dvigatellarini diagnostika qilish: usullar, texnik xizmat, video darslar va testlar",
      courseDesc: "Ichki yonuv dvigatellarining mexanik va elektron tizimlarini zamonaviy uskunalar yordamida chuqur tahlil qilish, nosozlik kodlarini o'qish va profilaktik xizmat ko'rsatish bo'yicha to'liq kurs.",
      courseLevel: "Daraja: Boshlang'ichdan mutaxassisgacha",
      courseDuration: "Davomiyligi: 6 modul · 12 video dars",
      courseModulesCount: "6 ta asosiy modul",
      yourProgress: 'Sizning natijangiz',
      continueCourse: 'Kursni davom ettirish',
      learningPathTitle: "Ta'lim yo'nalishi bosqichlari",
      learningPathSubtitle: "Nazariy bilimlardan amaliy ko'nikma va rasmiy sertifikatgacha bo'lgan izchil tizim",
      pathSteps: [
        { title: '1. Nazariya', desc: 'Elektron darsliklar va texnik reglamentlar' },
        { title: '2. Video darslar', desc: 'Amaliy ustaxona sharoitida tushuntirishlar' },
        { title: '3. Taqdimotlar', desc: 'Sxemalar, ossillogrammalar va slaydlar' },
        { title: '4. Onlayn testlar', desc: '6 xil turdagi interaktiv nazorat savollari' },
        { title: '5. Amaliyot', desc: 'OBD-II, simulyator va ustaxona topshiriqlari' },
        { title: '6. Sertifikat', desc: 'ID raqamli rasmiy PDF sertifikat' },
      ],
      featuresTitle: 'Platforma imkoniyatlari',
      whyTitle: 'Nega aynan AVTO EDU?',
      featuresList: [
        { title: 'OBD-II kodlar bazasi', desc: "65+ P0xxx xato kodlari, sabablari va tekshirish algoritmlari uch tilda." },
        { title: 'Nosozlik simulyatori', desc: "Alomatlar asosida ehtimoliy nosozliklarni hisoblash tizimi." },
        { title: 'Interaktiv dvigatel sxemasi', desc: "Har bir uzel va datchik vazifasini ko'rsatuvchi jonli chizma." },
        { title: 'AVTO AI maslahatchi', desc: "Dvigatel diagnostikasi bo'yicha savollarga tezkor texnik javoblar." },
      ],
      whyList: [
        { title: 'Zamonaviy o‘zbek, rus va ingliz atamalari', desc: "Texnik terminologiya xalqaro standartlar asosida uch tilda berilgan." },
        { title: 'Amaliy natijaga yo‘naltirilgan yondashuv', desc: "Har bir modul yakunida ustaxona topshiriqlari va kalkulyatorlar mavjud." },
        { title: 'Tekshiriladigan PDF sertifikat', desc: "Yakuniy imtihondan o'tgan talabalarga noyob ID li sertifikat beriladi." },
      ],
      latestMaterialsTitle: "So'nggi o'quv materiallari",
      teacherTitle: 'Kurs rahbari va bosh muhandis',
      teacherName: 'Rustam Karimov',
      teacherRole: "Katta diagnostika muhandisi · 16 yillik tajriba",
      teacherBio: "BOSCH va GDI/CRDi tizimlari bo'yicha sertifikatlangan trener. 1200 dan ortiq avtoelektrik va diagnostika mutaxassislarini tayyorlagan.",
      faqTitle: "Ko'p beriladigan savollar",
      faqs: [
        { q: "Kursni boshlash uchun maxsus jihoz kerakmi?", a: "Nazariy va simulyator bo'limlari uchun kompyuter yoki telefon yetarli. Amaliy topshiriqlarda standart multimetr va OBD-II skaneri tavsiya etiladi." },
        { q: "Sertifikat qanday beriladi?", a: "Yakuniy imtihon testidan kamida 70% ball to'plaganingizda avtomatik tarzda PDF sertifikat shakllanadi." },
        { q: "Tilni istalgan vaqtda o'zgartirish mumkinmi?", a: "Ha, yuqori menyudan O'zbek, Rus va Ingliz tillari o'rtasida bir zumda almashish mumkin." },
        { q: "O'qituvchi amaliy ishlarni qanday tekshiradi?", a: "Talaba hisobot va rasm yuklaydi, o'qituvchi 0–100 ballik tizimda baholab izoh qoldiradi." },
      ],
      contactTitle: "Savollaringiz bormi? Biz bilan bog'laning",
      contactSubtitle: "Xabaringiz to'g'ridan-to'g'ri o'qituvchi kabinetiga yuboriladi.",
      contactName: 'Ismingiz',
      contactEmail: 'Elektron pochta',
      contactSubject: 'Mavzu',
      contactMessage: 'Xabar matni',
      contactSend: 'Xabarni yuborish',
      contactSuccess: "Xabaringiz muvaffaqiyatli yuborildi!",
    },
    auth: {
      loginTitle: 'Tizimga kirish',
      loginSubtitle: "Shaxsiy kabinet va o'quv materiallariga kirish uchun ma'lumotlaringizni kiriting",
      registerTitle: "Ro'yxatdan o'tish",
      registerSubtitle: "AVTO EDU platformasida yangi hisob yarating",
      email: 'Elektron pochta',
      password: 'Parol',
      fullName: "To'liq ism-sharif",
      role: 'Foydalanuvchi turi',
      roleStudent: "O'quvchi (Talaba)",
      roleTeacher: "O'qituvchi",
      rememberMe: 'Meni eslab qol',
      signIn: 'Kirish',
      signUp: "Hisob yaratish",
      demoTitle: 'Tezkor sinov hisoblari',
      fillStudentDemo: "O'quvchi demosini to'ldirish",
      fillTeacherDemo: "O'qituvchi demosini to'ldirish",
      noAccount: "Hisobingiz yo'qmi?",
      haveAccount: 'Hisobingiz bormi?',
      authRequired: "Ushbu bo'limga kirish uchun avval tizimga kiring.",
      wrongRole: "Ushbu bo'lim faqat tegishli rol uchun ochiq.",
      invalidCredentials: "Email yoki parol noto'g'ri.",
      emailExists: "Bu elektron pochta allaqachon ro'yxatdan o'tgan.",
      welcomeBack: 'Xush kelibsiz!',
    },
    ebooks: {
      title: 'Elektron darsliklar kutubxonasi',
      subtitle: "Dvigatel diagnostikasi, texnik reglamentlar va o'quv qo'llanmalarini onlayn o'qing yoki PDF formatda yuklab oling.",
      categoryAll: 'Barcha toifalar',
      catDiagnostics: 'Diagnostika',
      catMaintenance: "Texnik xizmat",
      catElectrical: 'Elektrika va datchiklar',
      catReference: "Ma'lumotnoma",
      langAll: 'Barcha tillar',
      sortNewest: 'Yangi qo‘shilganlar',
      sortTitle: 'Alifbo bo‘yicha',
      sortPages: 'Sahifa soni bo‘yicha',
      gridView: 'Katakcha',
      listView: "Ro'yxat",
      readPdf: "PDF ni o'qish",
      downloadPdf: 'PDF yuklab olish',
      bookmark: 'Saqlash',
      bookmarked: 'Saqlangan',
      markRead: "O'qilgan deb belgilash",
      readDone: "O'qib chiqildi",
      readingProgress: "O'qish jarayoni",
    },
    videos: {
      title: 'Video darslar',
      subtitle: "6 ta moduldan iborat amaliy va nazariy video mashg'ulotlar.",
      modulesTitle: 'Kurs modullari',
      courseProgress: 'Umumiy kurs jarayoni',
      moduleProgress: 'Modul jarayoni',
      markComplete: 'Darsni yakunlash',
      completed: 'Yakunlandi',
      prevLesson: 'Oldingi dars',
      nextLesson: 'Keyingi dars',
      descriptionTab: 'Tavsif',
      materialsTab: 'Materiallar',
      notesTab: 'Shaxsiy qaydlar',
      qaTab: 'Savol-javob',
      notesPlaceholder: "Ushbu dars bo'yicha o'z qayd va xulosalaringizni yozing...",
      saveNotes: 'Qaydni saqlash',
      askQuestion: "O'qituvchiga savol yozing...",
      postQuestion: 'Savol yuborish',
      teacherReply: "O'qituvchi javobi",
      playPause: "Ijro / Pauza",
      speed: 'Tezlik',
      pip: 'Mini oyna (PiP)',
      fullscreen: "To'liq ekran",
      shortcutsHint: "Qisqa tugmalar: Space — pauza, ←/→ — 5 soniya, F — to'liq ekran",
      embedFallback: "Video o'rnatilgan pleyerda yuklanmasa, quyidagi tugma orqali to'g'ridan-to'g'ri oching.",
      openYoutube: "YouTube'da ochish",
      keyTakeaways: 'Asosiy xulosalar',
    },
    presentations: {
      title: 'Taqdimotlar va slaydlar',
      subtitle: "Dars slaydlarini to'liq ekranda ko'ring, PowerPoint (.pptx) yoki PDF shaklida yuklab oling.",
      slidesCount: 'ta slayd',
      openViewer: 'Slaydlarni ochish',
      downloadPptx: '.PPTX yuklab olish',
      downloadPdf: 'PDF yuklab olish',
      speakerNotes: "Ma'ruzachi eslatmasi",
      slideProgress: 'Slayd',
      keyboardHint: "Klaviatura strelkalari ← → yordamida varaqlang",
      fullscreen: "To'liq ekran",
      exitFullscreen: "Kichraytirish",
    },
    tests: {
      title: 'Onlayn testlar va imtihonlar',
      subtitle: "Bilimingizni har xil turdagi diagnostika savollari orqali sinab ko'ring va yakuniy imtihondan so'ng sertifikat oling.",
      startTest: 'Testni boshlash',
      retakeTest: 'Qayta topshirish',
      questionsCount: 'ta savol',
      timeLimit: 'Vaqt',
      passMark: "O'tish bali",
      finalExamBadge: 'Yakuniy imtihon',
      timeRemaining: 'Qolgan vaqt',
      flagQuestion: 'Belgilash',
      flagged: 'Belgilangan',
      submitTest: 'Testni yakunlash',
      confirmSubmit: "Testni yakunlab natijalarni tekshirishni tasdiqlaysizmi?",
      questionNavigator: 'Savollar xaritasi',
      resultsTitle: 'Test natijalari',
      earnedPoints: "To'plangan ball",
      topicStrength: "Mavzular bo'yicha natija",
      answerReview: 'Javoblar tahlili',
      correctAnswer: "To'g'ri javob",
      yourAnswer: 'Sizning javobingiz',
      explanation: 'Tushuntirish',
      downloadCertificate: 'PDF sertifikatni yuklab olish',
      verifyCertificateTitle: 'Sertifikat haqiqiyligini tekshirish',
      verifyCertificateSub: "Sertifikatdagi noyob ID raqamni kiriting (masalan: AVTO-2026-XXXXXX)",
      enterCertId: 'Sertifikat ID raqami',
      verifyBtn: 'Tekshirish',
      certValid: 'Sertifikat haqiqiy va tizimda tasdiqlangan',
      certInvalid: "Bunday ID raqamli sertifikat topilmadi.",
      attemptsHistory: 'Urinishlar tarixi',
      trueOption: "To'g'ri",
      falseOption: "Noto'g'ri",
      matchPrompt: "Har bir chap elementga mos o'ng javobni tanlang",
    },
    practical: {
      title: "Amaliy mashg'ulotlar va diagnostika asboblari",
      subtitle: "Ustaxona topshiriqlarini bajaring hamda interaktiv diagnostika kalkulyatorlari va ma'lumotnomalaridan foydalaning.",
      tabs: {
        assignments: 'Topshiriqlar',
        obd: 'OBD-II kodlar',
        simulator: 'Simulyator',
        maintenance: 'TXK kalkulyatori',
        diagram: 'Dvigatel sxemasi',
        compression: 'Kompressiya',
      },
      toolsRequired: 'Kerakli asboblar',
      safetyWarning: 'Xavfsizlik qoidalari',
      checklistSteps: 'Bajarish bosqichlari (belgilab boring)',
      yourReport: 'Amaliy ish hisoboti',
      reportPlaceholder: "O'lchangan ko'rsatkichlar, kuzatilgan nosozliklar va xulosalaringizni yozing...",
      attachPhoto: "Rasm / hujjat biriktirish",
      submitWork: 'Tekshirishga yuborish',
      resubmitWork: 'Qayta yuborish',
      teacherGrade: "O'qituvchi bahosi",
      teacherFeedback: "O'qituvchi izohi",
      statuses: {
        submitted: 'Yuborildi',
        under_review: "Ko'rib chiqilmoqda",
        accepted: 'Qabul qilindi',
        needs_revision: 'Qayta ishlash kerak',
      },
      obdSearchPlaceholder: 'Kod (masalan P0300) yoki kalit so‘z kiriting...',
      obdSystemAll: 'Barcha tizimlar',
      obdSeverity: 'Muhimlik darajasi',
      obdCauses: 'Ehtimoliy sabablar',
      obdChecks: 'Tekshirish qadamlari',
      simSelectSymptoms: 'Kuzatilayotgan alomatlarni tanlang:',
      simAnalyze: 'Tahlil qilish',
      simProbableCauses: 'Ehtimoliy sabablar reytingi',
      simRecommendedChecks: 'Tavsiya etilgan tekshiruvlar',
      simConfidence: 'Ehtimollik',
      maintMileage: 'Yurgan masofa (km)',
      maintAge: 'Avtomobil yoshi (yil)',
      maintFuel: "Yonilg'i turi",
      maintCondition: 'Haydash sharoiti',
      maintNormal: 'Oddiy (shahar/trassa)',
      maintSevere: "Og'ir (chang, tirbandlik, yuk)",
      maintCalculate: 'TXK jadvalini hisoblash',
      maintPrint: 'Ro‘yxatni chop etish',
      maintDueIn: 'Qolgan masofa',
      maintOverdue: 'Muddati o‘tgan / zudlik bilan',
      maintUpcoming: 'Yaqinlashmoqda',
      diagramHint: 'Tafsilotlarni ko‘rish uchun dvigatel qismiga bosing',
      diagramFunction: 'Vazifasi',
      diagramFaults: "Ko'p uchraydigan nosozliklar",
      compCylinders: 'Silindrlar soni',
      compUnit: 'O‘lchov birligi',
      compDryTest: 'Quruq test ko‘rsatkichlari',
      compWetTest: 'Moyli (ho‘l) test (ixtiyoriy)',
      compAnalyze: 'Kompressiyani tahlil qilish',
      compMaxVar: 'Maksimal farq',
      compWeakCylinders: 'Zaif silindrlar',
      compConclusion: 'Diagnostik xulosa',
    },
    student: {
      title: "O'quvchi shaxsiy kabineti",
      welcome: 'Xush kelibsiz',
      overallProgress: 'Kurs progressi',
      xpPoints: 'XP ballar',
      streak: 'Faol kunlar',
      level: 'Daraja',
      tabs: {
        overview: 'Umumiy ko‘rinish',
        tests: 'Test natijalari',
        assignments: 'Amaliy ishlar',
        notes: 'Qaydlarim',
        favorites: 'Saqlanganlar',
        certificates: 'Sertifikatlar',
        profile: 'Profil va sozlamalar',
      },
      badgesTitle: 'Nishonlar va yutuqlar',
      leaderboardTitle: 'Talabalar reytingi',
      notificationsTitle: 'Bildirishnomalar',
      markAllRead: "Hammasini o'qildi deb belgilash",
      editProfile: 'Profilni tahrirlash',
      uploadAvatar: 'Rasm yuklash',
      languagePref: 'Asosiy interfeys tili',
      continueLearning: "O'qishni davom ettirish",
      upcomingAssignments: 'Amaliy topshiriqlar',
      recentResults: "So'nggi test natijalari",
    },
    teacher: {
      title: "O'qituvchi boshqaruv kabineti",
      subtitle: "Kontentni boshqarish, talabalar natijalari, amaliy ishlarni baholash va zaxira nusxa.",
      kpiStudents: 'Jami talabalar',
      kpiCompletion: "O'rtacha yakunlash",
      kpiAvgScore: "O'rtacha test bali",
      kpiPending: 'Tekshirilmagan ishlar',
      tabs: {
        analytics: 'Tahlil va e’lonlar',
        lessons: 'Video darslar',
        ebooks: 'Darsliklar',
        presentations: 'Taqdimotlar',
        tests: 'Testlar',
        assignments: 'Topshiriqlar',
        submissions: 'Ishlarni baholash',
        students: 'Talabalar',
        messages: 'Xabarlar',
        backup: 'Zaxira nusxa',
      },
      exportCsv: 'CSV eksport',
      exportJson: 'JSON zaxira yuklash',
      importJson: 'JSON zaxira tiklash',
      resetDemo: "Demo ma'lumotlarga qaytarish",
      confirmReset: "Barcha o'zgarishlar o'chirilib, boshlang'ich demo ma'lumotlar tiklansinmi?",
      gradeSubmission: 'Baholash',
      gradeLabel: 'Baho (0–100)',
      feedbackLabel: 'Talabaga izoh',
      statusLabel: 'Holatni tanlang',
      addQuestion: "Savol qo'shish",
      addSlide: "Slayd qo'shish",
      addLesson: "Dars qo'shish",
      addEbook: "Darslik qo'shish",
      addPresentation: "Taqdimot qo'shish",
      addTest: "Test qo'shish",
      addAssignment: "Topshiriq qo'shish",
      addAnnouncement: "E'lon qo'shish",
      moveUp: 'Yuqoriga',
      moveDown: 'Pastga',
      replyComment: 'Savolga javob berish',
    },
    ai: {
      title: 'AVTO AI Maslahatchi',
      subtitle: 'Dvigatel diagnostikasi yordamchisi',
      placeholder: 'Masalan: P0171 xatosi nimani bildiradi?',
      send: 'Yuborish',
      greeting: "Assalomu alaykum! Men AVTO AI. Avtomobil dvigateli diagnostikasi, OBD-II kodlari va texnik xizmat bo'yicha savollaringizga javob beraman.",
      unavailable: "AI xizmati hozirda mavjud emas (serverda GEMINI_API_KEY sozlanmagan yoki vaqtincha uzilish). OBD-II kodlar bazasi va diagnostika simulyatoridan foydalanishingiz mumkin.",
      quickPrompts: [
        'P0300 xatosini qanday tekshiraman?',
        'Kompressiya normasi necha bar?',
        'Lyambda zond nosozlik belgilari',
      ],
    },
    footer: {
      tagline: 'Avtomobil dvigatellarini diagnostika qilish va texnik xizmat ko‘rsatish bo‘yicha zamonaviy ta’lim platformasi.',
      platform: 'Platforma',
      tools: 'Asboblar',
      contact: 'Aloqa',
      rights: 'Barcha huquqlar himoyalangan.',
    },
    notFound: {
      title: 'Sahifa topilmadi',
      desc: "Siz qidirayotgan sahifa ko'chirilgan yoki mavjud emas.",
      goHome: 'Bosh sahifaga qaytish',
    },
  },
  ru: {
    meta: {
      siteName: 'AVTO EDU',
      defaultDesc: 'Платформа обучения диагностике автомобильных двигателей: методы диагностики, ТО, видеоуроки и тесты.',
    },
    nav: {
      home: 'Главная',
      videos: 'Видеоуроки',
      ebooks: 'Учебники',
      presentations: 'Презентации',
      tests: 'Тесты',
      practical: 'Практика',
      studentCabinet: 'Кабинет студента',
      teacherCabinet: 'Кабинет преподавателя',
      verifyCert: 'Проверка сертификата',
      login: 'Войти',
      register: 'Регистрация',
      logout: 'Выйти',
      searchPlaceholder: 'Поиск (Ctrl+K)...',
    },
    common: {
      loading: 'Загрузка...',
      save: 'Сохранить',
      cancel: 'Отмена',
      delete: 'Удалить',
      edit: 'Редактировать',
      create: 'Создать',
      submit: 'Отправить',
      download: 'Скачать',
      view: 'Открыть',
      close: 'Закрыть',
      search: 'Поиск',
      filter: 'Фильтр',
      all: 'Все',
      reset: 'Сбросить',
      confirmDelete: 'Вы уверены, что хотите удалить этот элемент?',
      yesDelete: 'Да, удалить',
      noData: 'Данные не найдены',
      back: 'Назад',
      next: 'Далее',
      previous: 'Назад',
      minutes: 'мин',
      pages: 'стр.',
      published: 'Опубликовано',
      draft: 'Черновик',
      actions: 'Действия',
      status: 'Статус',
      date: 'Дата',
      score: 'Балл',
      passed: 'Сдан',
      failed: 'Не сдан',
      requiredField: 'Это поле обязательно для заполнения',
      invalidEmail: 'Некорректный адрес электронной почты',
      passwordShort: 'Пароль должен содержать минимум 6 символов',
      savedSuccess: 'Успешно сохранено',
      deletedSuccess: 'Успешно удалено',
      errorOccurred: 'Произошла ошибка',
      offlineBanner: 'Офлайн-режим — используются кэшированные данные.',
      installApp: 'Установить приложение',
      installIos: 'Установить на iOS',
    },
    home: {
      heroTitle: 'Профессиональная диагностика автомобильных двигателей',
      heroSubtitle: 'Интерактивная учебная платформа по сканированию OBD-II, осциллографии, проверке компрессии, топливных и систем зажигания.',
      startLearning: 'Начать обучение',
      watchDemo: 'Смотреть демо',
      statStudents: 'Активных студентов',
      statLessons: 'Модулей и уроков',
      statVideos: 'Видеоуроков',
      statTests: 'Тестовых вопросов',
      courseOverviewTitle: 'Основная программа',
      courseTitle: 'Диагностика автомобильных двигателей: методы, обслуживание, видеоуроки и тесты',
      courseDesc: 'Полный курс по глубокой механической и электронной диагностике ДВС, расшифровке кодов неисправностей и регламентному техническому обслуживанию.',
      courseLevel: 'Уровень: от новичка до диагноста',
      courseDuration: 'Длительность: 6 модулей · 12 видеоуроков',
      courseModulesCount: '6 учебных модулей',
      yourProgress: 'Ваш прогресс',
      continueCourse: 'Продолжить курс',
      learningPathTitle: 'Траектория обучения',
      learningPathSubtitle: 'Последовательный путь от теоретической базы до практических навыков и официального сертификата',
      pathSteps: [
        { title: '1. Теория', desc: 'Электронные учебники и техрегламенты' },
        { title: '2. Видеоуроки', desc: 'Разбор узлов в условиях автосервиса' },
        { title: '3. Презентации', desc: 'Схемы, осциллограммы и слайды' },
        { title: '4. Онлайн-тесты', desc: '6 форматов проверочных вопросов' },
        { title: '5. Практика', desc: 'OBD-II, симулятор и задания в цеху' },
        { title: '6. Сертификат', desc: 'Официальный PDF-сертификат с ID' },
      ],
      featuresTitle: 'Возможности платформы',
      whyTitle: 'Почему AVTO EDU?',
      featuresList: [
        { title: 'База кодов OBD-II', desc: 'Более 65 кодов P0xxx с причинами и пошаговой проверкой на трёх языках.' },
        { title: 'Симулятор неисправностей', desc: 'Алгоритмический подбор вероятных причин по симптомам двигателя.' },
        { title: 'Интерактивная схема ДВС', desc: 'Кликабельные узлы и датчики с описанием функций и типовых поломок.' },
        { title: 'Консультант AVTO AI', desc: 'Быстрые технические ответы по диагностике и обслуживанию ДВС.' },
      ],
      whyList: [
        { title: 'Точная терминология на трёх языках', desc: 'Материалы доступны на узбекском, русском и английском языках.' },
        { title: 'Упор на реальную практику', desc: 'Калькуляторы компрессии, ТО и проверка работ преподавателем.' },
        { title: 'Проверяемый PDF-сертификат', desc: 'Публичная верификация сертификата по уникальному ID.' },
      ],
      latestMaterialsTitle: 'Свежие учебные материалы',
      teacherTitle: 'Руководитель курса и главный инженер',
      teacherName: 'Рустам Каримов',
      teacherRole: 'Ведущий инженер-диагност · стаж 16 лет',
      teacherBio: 'Сертифицированный тренер по системам BOSCH и GDI/CRDi. Подготовил более 1200 автоэлектриков и мастеров-диагностов.',
      faqTitle: 'Частые вопросы',
      faqs: [
        { q: 'Нужно ли специальное оборудование для старта?', a: 'Для теории и симуляторов достаточно компьютера или смартфона. Для практики рекомендуются мультиметр и адаптер OBD-II.' },
        { q: 'Как получить сертификат?', a: 'Наберите не менее 70% на итоговом экзамене, и PDF-сертификат сформируется автоматически.' },
        { q: 'Можно ли переключать язык в процессе?', a: 'Да, переключение между UZ, RU и EN происходит мгновенно в шапке сайта.' },
        { q: 'Как проверяются практические задания?', a: 'Студент загружает отчёт и фото, преподаватель выставляет оценку 0–100 и оставляет комментарий.' },
      ],
      contactTitle: 'Остались вопросы? Напишите нам',
      contactSubtitle: 'Сообщение поступит напрямую в кабинет преподавателя.',
      contactName: 'Ваше имя',
      contactEmail: 'Электронная почта',
      contactSubject: 'Тема',
      contactMessage: 'Текст сообщения',
      contactSend: 'Отправить сообщение',
      contactSuccess: 'Сообщение успешно отправлено!',
    },
    auth: {
      loginTitle: 'Вход в платформу',
      loginSubtitle: 'Введите данные учётной записи для доступа к учебному кабинету',
      registerTitle: 'Регистрация',
      registerSubtitle: 'Создайте новый аккаунт на платформе AVTO EDU',
      email: 'Электронная почта',
      password: 'Пароль',
      fullName: 'ФИО',
      role: 'Роль',
      roleStudent: 'Студент',
      roleTeacher: 'Преподаватель',
      rememberMe: 'Запомнить меня',
      signIn: 'Войти',
      signUp: 'Зарегистрироваться',
      demoTitle: 'Демо-аккаунты для проверки',
      fillStudentDemo: 'Заполнить демо студента',
      fillTeacherDemo: 'Заполнить демо преподавателя',
      noAccount: 'Нет аккаунта?',
      haveAccount: 'Уже есть аккаунт?',
      authRequired: 'Пожалуйста, войдите в систему для доступа к этому разделу.',
      wrongRole: 'Доступ ограничен вашей ролью пользователя.',
      invalidCredentials: 'Неверный email или пароль.',
      emailExists: 'Пользователь с таким email уже существует.',
      welcomeBack: 'С возвращением!',
    },
    ebooks: {
      title: 'Библиотека электронных учебников',
      subtitle: 'Читайте технические руководства по диагностике и ТО онлайн или скачивайте в формате PDF.',
      categoryAll: 'Все категории',
      catDiagnostics: 'Диагностика',
      catMaintenance: 'Техобслуживание',
      catElectrical: 'Электрика и датчики',
      catReference: 'Справочники',
      langAll: 'Все языки',
      sortNewest: 'Сначала новые',
      sortTitle: 'По названию',
      sortPages: 'По объёму',
      gridView: 'Сетка',
      listView: 'Список',
      readPdf: 'Читать PDF',
      downloadPdf: 'Скачать PDF',
      bookmark: 'В закладки',
      bookmarked: 'В закладках',
      markRead: 'Отметить прочитанным',
      readDone: 'Прочитано',
      readingProgress: 'Прогресс чтения',
    },
    videos: {
      title: 'Видеоуроки',
      subtitle: 'Практические и теоретические видеозанятия, разделённые на 6 модулей.',
      modulesTitle: 'Модули курса',
      courseProgress: 'Общий прогресс курса',
      moduleProgress: 'Прогресс модуля',
      markComplete: 'Завершить урок',
      completed: 'Пройден',
      prevLesson: 'Предыдущий урок',
      nextLesson: 'Следующий урок',
      descriptionTab: 'Описание',
      materialsTab: 'Материалы',
      notesTab: 'Личные заметки',
      qaTab: 'Вопросы и ответы',
      notesPlaceholder: 'Записывайте сюда свои конспекты и наблюдения по уроку...',
      saveNotes: 'Сохранить заметку',
      askQuestion: 'Задайте вопрос преподавателю...',
      postQuestion: 'Отправить вопрос',
      teacherReply: 'Ответ преподавателя',
      playPause: 'Пуск / Пауза',
      speed: 'Скорость',
      pip: 'Картинка в картинке',
      fullscreen: 'Полный экран',
      shortcutsHint: 'Горячие клавиши: Space — пауза, ←/→ — перемотка на 5с, F — полный экран',
      embedFallback: 'Если встроенный плеер заблокирован сетью, откройте урок напрямую.',
      openYoutube: 'Открыть на YouTube',
      keyTakeaways: 'Ключевые выводы',
    },
    presentations: {
      title: 'Презентации и слайды',
      subtitle: 'Просматривайте учебные слайды на весь экран или скачивайте в форматах PowerPoint (.pptx) и PDF.',
      slidesCount: 'слайдов',
      openViewer: 'Открыть слайды',
      downloadPptx: 'Скачать .PPTX',
      downloadPdf: 'Скачать PDF',
      speakerNotes: 'Заметки докладчика',
      slideProgress: 'Слайд',
      keyboardHint: 'Листайте стрелками клавиатуры ← →',
      fullscreen: 'Полный экран',
      exitFullscreen: 'Свернуть',
    },
    tests: {
      title: 'Онлайн-тесты и экзамены',
      subtitle: 'Проверьте знания по всем разделам диагностики ДВС и получите сертификат после итогового экзамена.',
      startTest: 'Начать тест',
      retakeTest: 'Пройти снова',
      questionsCount: 'вопросов',
      timeLimit: 'Время',
      passMark: 'Проходной балл',
      finalExamBadge: 'Итоговый экзамен',
      timeRemaining: 'Осталось',
      flagQuestion: 'Отметить',
      flagged: 'Отмечен',
      submitTest: 'Завершить тест',
      confirmSubmit: 'Вы уверены, что хотите завершить тест и увидеть результат?',
      questionNavigator: 'Навигатор вопросов',
      resultsTitle: 'Результаты теста',
      earnedPoints: 'Набрано баллов',
      topicStrength: 'Успеваемость по темам',
      answerReview: 'Разбор ответов',
      correctAnswer: 'Правильный ответ',
      yourAnswer: 'Ваш ответ',
      explanation: 'Пояснение',
      downloadCertificate: 'Скачать PDF-сертификат',
      verifyCertificateTitle: 'Проверка подлинности сертификата',
      verifyCertificateSub: 'Введите уникальный ID сертификата (например: AVTO-2026-XXXXXX)',
      enterCertId: 'ID сертификата',
      verifyBtn: 'Проверить',
      certValid: 'Сертификат подлинный и подтверждён в реестре',
      certInvalid: 'Сертификат с таким ID не найден.',
      attemptsHistory: 'История попыток',
      trueOption: 'Верно',
      falseOption: 'Неверно',
      matchPrompt: 'Выберите соответствие для каждого элемента слева',
    },
    practical: {
      title: 'Практические задания и инструменты диагноста',
      subtitle: 'Выполняйте задания с чек-листами и используйте интерактивные калькуляторы диагностики.',
      tabs: {
        assignments: 'Задания',
        obd: 'Коды OBD-II',
        simulator: 'Симулятор',
        maintenance: 'Калькулятор ТО',
        diagram: 'Схема ДВС',
        compression: 'Компрессия',
      },
      toolsRequired: 'Необходимые инструменты',
      safetyWarning: 'Техника безопасности',
      checklistSteps: 'Этапы выполнения (отмечайте галочкой)',
      yourReport: 'Отчёт о выполнении',
      reportPlaceholder: 'Укажите замеренные параметры, выявленные отклонения и выводы...',
      attachPhoto: 'Прикрепить фото / файл',
      submitWork: 'Отправить на проверку',
      resubmitWork: 'Отправить повторно',
      teacherGrade: 'Оценка преподавателя',
      teacherFeedback: 'Комментарий преподавателя',
      statuses: {
        submitted: 'Отправлено',
        under_review: 'На проверке',
        accepted: 'Принято',
        needs_revision: 'Нужна доработка',
      },
      obdSearchPlaceholder: 'Введите код (напр. P0300) или симптом...',
      obdSystemAll: 'Все системы',
      obdSeverity: 'Критичность',
      obdCauses: 'Вероятные причины',
      obdChecks: 'Порядок проверки',
      simSelectSymptoms: 'Выберите наблюдаемые симптомы:',
      simAnalyze: 'Выполнить анализ',
      simProbableCauses: 'Рейтинг вероятных причин',
      simRecommendedChecks: 'Рекомендуемые проверки',
      simConfidence: 'Вероятность',
      maintMileage: 'Пробег (км)',
      maintAge: 'Возраст авто (лет)',
      maintFuel: 'Тип топлива',
      maintCondition: 'Условия эксплуатации',
      maintNormal: 'Обычные (город/трасса)',
      maintSevere: 'Тяжёлые (пыль, пробки, нагрузки)',
      maintCalculate: 'Рассчитать регламент ТО',
      maintPrint: 'Печать чек-листа',
      maintDueIn: 'Осталось',
      maintOverdue: 'Просрочено / срочно',
      maintUpcoming: 'Скоро',
      diagramHint: 'Нажмите на компонент двигателя для просмотра информации',
      diagramFunction: 'Назначение',
      diagramFaults: 'Типовые неисправности',
      compCylinders: 'Число цилиндров',
      compUnit: 'Единица измерения',
      compDryTest: 'Замеры «на сухую»',
      compWetTest: 'Замеры с маслом (опционально)',
      compAnalyze: 'Анализировать компрессию',
      compMaxVar: 'Макс. разброс',
      compWeakCylinders: 'Слабые цилиндры',
      compConclusion: 'Заключение диагноста',
    },
    student: {
      title: 'Личный кабинет студента',
      welcome: 'Добро пожаловать',
      overallProgress: 'Прогресс курса',
      xpPoints: 'Очки XP',
      streak: 'Дней подряд',
      level: 'Уровень',
      tabs: {
        overview: 'Обзор',
        tests: 'Мои тесты',
        assignments: 'Практика',
        notes: 'Заметки',
        favorites: 'Избранное',
        certificates: 'Сертификаты',
        profile: 'Профиль и настройки',
      },
      badgesTitle: 'Достижения и бейджи',
      leaderboardTitle: 'Рейтинг студентов',
      notificationsTitle: 'Уведомления',
      markAllRead: 'Отметить все прочитанными',
      editProfile: 'Редактировать профиль',
      uploadAvatar: 'Загрузить фото',
      languagePref: 'Язык интерфейса',
      continueLearning: 'Продолжить обучение',
      upcomingAssignments: 'Практические задания',
      recentResults: 'Последние результаты тестов',
    },
    teacher: {
      title: 'Кабинет преподавателя',
      subtitle: 'Управление курсом, аналитика успеваемости, проверка работ и резервное копирование.',
      kpiStudents: 'Всего студентов',
      kpiCompletion: 'Среднее завершение',
      kpiAvgScore: 'Средний балл тестов',
      kpiPending: 'Работ на проверке',
      tabs: {
        analytics: 'Аналитика и объявления',
        lessons: 'Видеоуроки',
        ebooks: 'Учебники',
        presentations: 'Презентации',
        tests: 'Тесты',
        assignments: 'Задания',
        submissions: 'Проверка работ',
        students: 'Студенты',
        messages: 'Сообщения',
        backup: 'Резервная копия',
      },
      exportCsv: 'Экспорт CSV',
      exportJson: 'Экспорт JSON',
      importJson: 'Импорт JSON',
      resetDemo: 'Сбросить к демо-данным',
      confirmReset: 'Удалить все изменения и восстановить исходные демо-данные?',
      gradeSubmission: 'Оценить работу',
      gradeLabel: 'Оценка (0–100)',
      feedbackLabel: 'Комментарий студенту',
      statusLabel: 'Статус проверки',
      addQuestion: 'Добавить вопрос',
      addSlide: 'Добавить слайд',
      addLesson: 'Добавить урок',
      addEbook: 'Добавить учебник',
      addPresentation: 'Добавить презентацию',
      addTest: 'Добавить тест',
      addAssignment: 'Добавить задание',
      addAnnouncement: 'Добавить объявление',
      moveUp: 'Вверх',
      moveDown: 'Вниз',
      replyComment: 'Ответить на вопрос',
    },
    ai: {
      title: 'Консультант AVTO AI',
      subtitle: 'Помощник по диагностике ДВС',
      placeholder: 'Например: что означает ошибка P0171?',
      send: 'Отправить',
      greeting: 'Здравствуйте! Я AVTO AI. Отвечу на вопросы по диагностике двигателей, кодам OBD-II и регламенту обслуживания.',
      unavailable: 'Сервис AVTO AI временно недоступен (не задан GEMINI_API_KEY или ошибка сети). Воспользуйтесь базой OBD-II и симулятором.',
      quickPrompts: [
        'Как проверить ошибку P0300?',
        'Норма компрессии в бензиновом ДВС?',
        'Признаки неисправности лямбда-зонда',
      ],
    },
    footer: {
      tagline: 'Современная образовательная платформа по диагностике и обслуживанию автомобильных двигателей.',
      platform: 'Платформа',
      tools: 'Инструменты',
      contact: 'Контакты',
      rights: 'Все права защищены.',
    },
    notFound: {
      title: 'Страница не найдена',
      desc: 'Запрашиваемая страница не существует или была перемещена.',
      goHome: 'На главную',
    },
  },
  en: {
    meta: {
      siteName: 'AVTO EDU',
      defaultDesc: 'Automotive Engine Diagnostics e-learning platform: diagnostic methods, maintenance, video lessons, and tests.',
    },
    nav: {
      home: 'Home',
      videos: 'Video Lessons',
      ebooks: 'E-Books',
      presentations: 'Presentations',
      tests: 'Tests',
      practical: 'Practical',
      studentCabinet: 'Student Cabinet',
      teacherCabinet: 'Teacher Cabinet',
      verifyCert: 'Verify Certificate',
      login: 'Sign In',
      register: 'Register',
      logout: 'Sign Out',
      searchPlaceholder: 'Search (Ctrl+K)...',
    },
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      submit: 'Submit',
      download: 'Download',
      view: 'Open',
      close: 'Close',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      reset: 'Reset',
      confirmDelete: 'Are you sure you want to delete this item?',
      yesDelete: 'Yes, delete',
      noData: 'No records found',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      minutes: 'min',
      pages: 'pages',
      published: 'Published',
      draft: 'Draft',
      actions: 'Actions',
      status: 'Status',
      date: 'Date',
      score: 'Score',
      passed: 'Passed',
      failed: 'Failed',
      requiredField: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      passwordShort: 'Password must be at least 6 characters',
      savedSuccess: 'Saved successfully',
      deletedSuccess: 'Deleted successfully',
      errorOccurred: 'An error occurred',
      offlineBanner: 'Offline Mode — cached data is being used.',
      installApp: 'Install App',
      installIos: 'Install on iOS',
    },
    home: {
      heroTitle: 'Master Automotive Engine Diagnostics',
      heroSubtitle: 'Interactive e-learning platform covering OBD-II scanning, oscilloscope waveform analysis, compression testing, ignition, and fuel systems.',
      startLearning: 'Start Learning',
      watchDemo: 'Watch Demo',
      statStudents: 'Active Students',
      statLessons: 'Modules & Lessons',
      statVideos: 'Video Lessons',
      statTests: 'Quiz Questions',
      courseOverviewTitle: 'Flagship Curriculum',
      courseTitle: 'Automotive Engine Diagnostics: Diagnostic Methods, Maintenance, Video Lessons & Tests',
      courseDesc: 'Comprehensive engineering curriculum on mechanical and electronic engine fault isolation, DTC interpretation, and preventive service intervals.',
      courseLevel: 'Level: Foundation to Master Technician',
      courseDuration: 'Duration: 6 modules · 12 video lessons',
      courseModulesCount: '6 core modules',
      yourProgress: 'Your progress',
      continueCourse: 'Continue Course',
      learningPathTitle: 'Structured Learning Path',
      learningPathSubtitle: 'Step-by-step progression from core theory to workshop diagnostics and verified certification',
      pathSteps: [
        { title: '1. Theory', desc: 'Digital textbooks and technical manuals' },
        { title: '2. Video Lessons', desc: 'Workshop demonstrations and teardown guides' },
        { title: '3. Presentations', desc: 'Wiring diagrams, waveforms, and slide decks' },
        { title: '4. Online Tests', desc: 'Six interactive diagnostic question formats' },
        { title: '5. Practice', desc: 'OBD-II lookup, fault simulator, and labs' },
        { title: '6. Certificate', desc: 'Verifiable PDF certificate with unique ID' },
      ],
      featuresTitle: 'Platform Capabilities',
      whyTitle: 'Why AVTO EDU?',
      featuresList: [
        { title: 'OBD-II Fault Code Database', desc: '65+ P0xxx DTCs with causes and diagnostic verification steps in 3 languages.' },
        { title: 'Engine Fault Simulator', desc: 'Symptom-driven rule engine ranking probable mechanical and sensor faults.' },
        { title: 'Interactive Engine Diagram', desc: 'Clickable engine assembly revealing component roles and common failure modes.' },
        { title: 'AVTO AI Assistant', desc: 'Instant automotive diagnostics guidance constrained to technical standards.' },
      ],
      whyList: [
        { title: 'Authentic Trilingual Terminology', desc: 'Every technical term is carefully localized across Uzbek, Russian, and English.' },
        { title: 'Built for Real Diagnostics', desc: 'Includes compression variance calculators, service schedulers, and graded labs.' },
        { title: 'Publicly Verifiable Credentials', desc: 'Graduates receive downloadable PDF certificates verifiable by ID.' },
      ],
      latestMaterialsTitle: 'Latest Study Materials',
      teacherTitle: 'Lead Instructor & Chief Diagnostician',
      teacherName: 'Rustam Karimov',
      teacherRole: 'Senior Diagnostics Engineer · 16 Years Experience',
      teacherBio: 'Certified specialist in BOSCH engine management and GDI/CRDi systems. Trained over 1,200 automotive technicians and diagnosticians.',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        { q: 'Do I need workshop tools to start?', a: 'All theory, simulations, and quizzes run right in your browser. For hands-on assignments, a digital multimeter and basic OBD-II scanner are recommended.' },
        { q: 'How is the certificate issued?', a: 'Scoring 70% or higher on the Final Exam automatically issues a downloadable PDF certificate with a unique verification ID.' },
        { q: 'Can I switch languages mid-course?', a: 'Yes. Switch seamlessly between Uzbek, Russian, and English at any time without losing progress.' },
        { q: 'How are practical assignments graded?', a: 'Submit your written diagnostic report and photo evidence; the instructor grades it (0–100) and provides written feedback.' },
      ],
      contactTitle: 'Questions? Contact the Instructor',
      contactSubtitle: 'Your message goes directly to the teacher cabinet inbox.',
      contactName: 'Your Name',
      contactEmail: 'Email Address',
      contactSubject: 'Subject',
      contactMessage: 'Message',
      contactSend: 'Send Message',
      contactSuccess: 'Your message has been sent!',
    },
    auth: {
      loginTitle: 'Sign In to AVTO EDU',
      loginSubtitle: 'Enter your credentials to access your learning workspace',
      registerTitle: 'Create Account',
      registerSubtitle: 'Join AVTO EDU to track lessons, take exams, and earn certificates',
      email: 'Email Address',
      password: 'Password',
      fullName: 'Full Name',
      role: 'Account Role',
      roleStudent: 'Student',
      roleTeacher: 'Teacher',
      rememberMe: 'Remember me',
      signIn: 'Sign In',
      signUp: 'Create Account',
      demoTitle: 'Quick Demo Accounts',
      fillStudentDemo: 'Fill Student Demo',
      fillTeacherDemo: 'Fill Teacher Demo',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      authRequired: 'Please sign in to access this cabinet.',
      wrongRole: 'This area is restricted to the matching user role.',
      invalidCredentials: 'Invalid email or password.',
      emailExists: 'An account with this email already exists.',
      welcomeBack: 'Welcome back!',
    },
    ebooks: {
      title: 'Digital Textbooks & Manuals',
      subtitle: 'Read technical engine diagnostics manuals in the built-in viewer or download as PDF.',
      categoryAll: 'All Categories',
      catDiagnostics: 'Diagnostics',
      catMaintenance: 'Maintenance',
      catElectrical: 'Electrical & Sensors',
      catReference: 'Reference',
      langAll: 'All Languages',
      sortNewest: 'Newest',
      sortTitle: 'Title A–Z',
      sortPages: 'Page Count',
      gridView: 'Grid',
      listView: 'List',
      readPdf: 'Read PDF',
      downloadPdf: 'Download PDF',
      bookmark: 'Bookmark',
      bookmarked: 'Bookmarked',
      markRead: 'Mark as Read',
      readDone: 'Completed',
      readingProgress: 'Reading progress',
    },
    videos: {
      title: 'Video Lessons',
      subtitle: 'Structured technical video curriculum across 6 diagnostic modules.',
      modulesTitle: 'Course Modules',
      courseProgress: 'Overall Course Progress',
      moduleProgress: 'Module Progress',
      markComplete: 'Mark as Complete',
      completed: 'Completed',
      prevLesson: 'Previous Lesson',
      nextLesson: 'Next Lesson',
      descriptionTab: 'Overview',
      materialsTab: 'Materials',
      notesTab: 'My Notes',
      qaTab: 'Q&A Thread',
      notesPlaceholder: 'Write private diagnostic notes and observations for this lesson...',
      saveNotes: 'Save Notes',
      askQuestion: 'Ask the instructor a question...',
      postQuestion: 'Post Question',
      teacherReply: 'Instructor Reply',
      playPause: 'Play / Pause',
      speed: 'Speed',
      pip: 'Picture-in-Picture',
      fullscreen: 'Fullscreen',
      shortcutsHint: 'Shortcuts: Space — play/pause, ←/→ — seek 5s, F — fullscreen',
      embedFallback: 'If the embedded video player is restricted in your network, open the video directly.',
      openYoutube: 'Open on YouTube',
      keyTakeaways: 'Key Takeaways',
    },
    presentations: {
      title: 'Presentations & Slide Decks',
      subtitle: 'Browse structured technical slides in fullscreen mode or export as PowerPoint (.pptx) and PDF.',
      slidesCount: 'slides',
      openViewer: 'Open Slides',
      downloadPptx: 'Download .PPTX',
      downloadPdf: 'Download PDF',
      speakerNotes: 'Speaker Notes',
      slideProgress: 'Slide',
      keyboardHint: 'Navigate using ← → arrow keys',
      fullscreen: 'Fullscreen',
      exitFullscreen: 'Exit Fullscreen',
    },
    tests: {
      title: 'Online Tests & Examinations',
      subtitle: 'Assess your diagnostic skills with six question types and earn a verified certificate on the Final Exam.',
      startTest: 'Start Test',
      retakeTest: 'Retake Test',
      questionsCount: 'questions',
      timeLimit: 'Time Limit',
      passMark: 'Pass Mark',
      finalExamBadge: 'Final Exam',
      timeRemaining: 'Time Remaining',
      flagQuestion: 'Flag',
      flagged: 'Flagged',
      submitTest: 'Submit Test',
      confirmSubmit: 'Are you sure you want to submit your answers now?',
      questionNavigator: 'Question Navigator',
      resultsTitle: 'Assessment Results',
      earnedPoints: 'Points Earned',
      topicStrength: 'Performance by Topic',
      answerReview: 'Detailed Answer Review',
      correctAnswer: 'Correct Answer',
      yourAnswer: 'Your Answer',
      explanation: 'Explanation',
      downloadCertificate: 'Download PDF Certificate',
      verifyCertificateTitle: 'Verify Certificate Authenticity',
      verifyCertificateSub: 'Enter the unique certificate ID printed on the document (e.g. AVTO-2026-XXXXXX)',
      enterCertId: 'Certificate ID',
      verifyBtn: 'Verify',
      certValid: 'Certificate is valid and verified in the registry',
      certInvalid: 'No certificate found matching this ID.',
      attemptsHistory: 'Attempt History',
      trueOption: 'True',
      falseOption: 'False',
      matchPrompt: 'Match each item on the left with the corresponding option on the right',
    },
    practical: {
      title: 'Practical Labs & Diagnostic Tools',
      subtitle: 'Complete hands-on workshop assignments and use interactive automotive diagnostic tools.',
      tabs: {
        assignments: 'Assignments',
        obd: 'OBD-II Lookup',
        simulator: 'Fault Simulator',
        maintenance: 'Service Calculator',
        diagram: 'Engine Diagram',
        compression: 'Compression',
      },
      toolsRequired: 'Required Tools',
      safetyWarning: 'Safety Warnings',
      checklistSteps: 'Procedure Checklist',
      yourReport: 'Diagnostic Lab Report',
      reportPlaceholder: 'Document your measured readings, fault observations, and diagnostic conclusion...',
      attachPhoto: 'Attach Photo / File',
      submitWork: 'Submit Assignment',
      resubmitWork: 'Resubmit',
      teacherGrade: 'Instructor Grade',
      teacherFeedback: 'Instructor Feedback',
      statuses: {
        submitted: 'Submitted',
        under_review: 'Under review',
        accepted: 'Accepted',
        needs_revision: 'Needs revision',
      },
      obdSearchPlaceholder: 'Search DTC code (e.g. P0300) or symptom...',
      obdSystemAll: 'All Systems',
      obdSeverity: 'Severity',
      obdCauses: 'Probable Causes',
      obdChecks: 'Diagnostic Steps',
      simSelectSymptoms: 'Select observed engine symptoms:',
      simAnalyze: 'Run Diagnostic Analysis',
      simProbableCauses: 'Ranked Probable Causes',
      simRecommendedChecks: 'Recommended Verification Steps',
      simConfidence: 'Confidence',
      maintMileage: 'Current Mileage (km)',
      maintAge: 'Vehicle Age (years)',
      maintFuel: 'Fuel Type',
      maintCondition: 'Driving Conditions',
      maintNormal: 'Normal (highway / mixed)',
      maintSevere: 'Severe (dust, short trips, towing)',
      maintCalculate: 'Calculate Service Plan',
      maintPrint: 'Print Checklist',
      maintDueIn: 'Due in',
      maintOverdue: 'Overdue / Immediate',
      maintUpcoming: 'Upcoming',
      diagramHint: 'Click any engine component hotspot to inspect function and faults',
      diagramFunction: 'Function',
      diagramFaults: 'Common Faults',
      compCylinders: 'Cylinder Count',
      compUnit: 'Pressure Unit',
      compDryTest: 'Dry Test Readings',
      compWetTest: 'Wet Test Readings (optional)',
      compAnalyze: 'Analyze Compression',
      compMaxVar: 'Max Variance',
      compWeakCylinders: 'Weak Cylinders',
      compConclusion: 'Diagnostic Conclusion',
    },
    student: {
      title: 'Student Learning Cabinet',
      welcome: 'Welcome',
      overallProgress: 'Course Progress',
      xpPoints: 'XP Points',
      streak: 'Day Streak',
      level: 'Level',
      tabs: {
        overview: 'Overview',
        tests: 'Test Results',
        assignments: 'Assignments',
        notes: 'Notes',
        favorites: 'Favorites',
        certificates: 'Certificates',
        profile: 'Profile & Settings',
      },
      badgesTitle: 'Earned Badges',
      leaderboardTitle: 'Student Leaderboard',
      notificationsTitle: 'Notifications',
      markAllRead: 'Mark all read',
      editProfile: 'Edit Profile',
      uploadAvatar: 'Upload Photo',
      languagePref: 'Preferred Language',
      continueLearning: 'Continue Learning',
      upcomingAssignments: 'Practical Assignments',
      recentResults: 'Recent Test Results',
    },
    teacher: {
      title: 'Instructor Control Cabinet',
      subtitle: 'Manage curriculum content, grade student submissions, inspect analytics, and back up platform data.',
      kpiStudents: 'Total Students',
      kpiCompletion: 'Avg Completion',
      kpiAvgScore: 'Avg Test Score',
      kpiPending: 'Pending Reviews',
      tabs: {
        analytics: 'Analytics & Notices',
        lessons: 'Video Lessons',
        ebooks: 'E-Books',
        presentations: 'Presentations',
        tests: 'Tests',
        assignments: 'Assignments',
        submissions: 'Submissions',
        students: 'Students',
        messages: 'Inbox',
        backup: 'Data Backup',
      },
      exportCsv: 'Export CSV',
      exportJson: 'Export JSON Backup',
      importJson: 'Import JSON Backup',
      resetDemo: 'Reset to Demo Data',
      confirmReset: 'Erase all local edits and restore the original demo dataset?',
      gradeSubmission: 'Grade Submission',
      gradeLabel: 'Grade (0–100)',
      feedbackLabel: 'Feedback for Student',
      statusLabel: 'Review Status',
      addQuestion: 'Add Question',
      addSlide: 'Add Slide',
      addLesson: 'Add Lesson',
      addEbook: 'Add E-Book',
      addPresentation: 'Add Presentation',
      addTest: 'Add Test',
      addAssignment: 'Add Assignment',
      addAnnouncement: 'Publish Announcement',
      moveUp: 'Move Up',
      moveDown: 'Move Down',
      replyComment: 'Reply to Question',
    },
    ai: {
      title: 'AVTO AI Assistant',
      subtitle: 'Engine Diagnostics Advisor',
      placeholder: 'e.g. What causes a P0171 lean code?',
      send: 'Send',
      greeting: 'Hello! I am AVTO AI. Ask me about engine diagnostics, OBD-II fault codes, oscilloscope patterns, or maintenance intervals.',
      unavailable: 'AVTO AI is currently unavailable (GEMINI_API_KEY is not configured or network unreachable). Use the built-in OBD-II database and fault simulator.',
      quickPrompts: [
        'How do I diagnose P0300?',
        'Normal gasoline engine compression?',
        'Signs of a failing O2 sensor',
      ],
    },
    footer: {
      tagline: 'Modern automotive engineering e-learning platform for engine diagnostics and maintenance.',
      platform: 'Platform',
      tools: 'Tools',
      contact: 'Contact',
      rights: 'All rights reserved.',
    },
    notFound: {
      title: 'Page Not Found',
      desc: 'The page you requested does not exist or has been moved.',
      goHome: 'Return Home',
    },
  },
};
