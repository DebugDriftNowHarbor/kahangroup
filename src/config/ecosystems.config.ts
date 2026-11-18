export const HOLDING_TITLE = 'منظومه هوشمند بُرهان';
export const HOLDING_ENGLISH_NAME = 'BORHAN ECOSYSTEMS';
export const HOLDING_SUBTITLE = 'معماری زیست‌بوم‌های هوشمند مدیریت و حاکمیت داده در صنایع اصیل';
export const HOLDING_KICKER = 'INTELLIGENT ARCHITECTURE FOR INDUSTRY SOVEREIGNTY';

export interface HoldingMetric {
  value: string;
  numericTarget: number;
  suffix?: string;
  label: string;
  description: string;
}

export const HOLDING_KEY_METRICS: HoldingMetric[] = [
  {
    value: '۴',
    numericTarget: 4,
    label: 'زیست‌بوم تخصصی فعال',
    description: 'راهکارهای معماری‌شده متناسب با بافت واقعی صنایع',
  },
  {
    value: '+۴۳٪',
    numericTarget: 43,
    suffix: '٪',
    label: 'میانگین ارتقای بهره‌وری عملیاتی',
    description: 'حذف گلوگاه‌های اجرایی و کاهش خطای انسانی',
  },
  {
    value: '۱۰۰٪',
    numericTarget: 100,
    suffix: '٪',
    label: 'حاکمیت داده و امنیت سازمانی',
    description: 'صیانت کامل از اطلاعات تجاری و استقلال نهادی',
  },
  {
    value: '۲.۸x',
    numericTarget: 2.8,
    suffix: 'x',
    label: 'شتاب در تصمیم‌گیری‌های کلان',
    description: 'تغذیه مدیران ارشد با اشراف تحلیلی لحظه‌ای',
  },
];

export interface SlideDefinition {
  index: number;
  numberLabel: string;
  id: string;
  navLabel: string;
  title: string;
}

export const SLIDES_CONFIG: SlideDefinition[] = [
  {
    index: 0,
    numberLabel: '۰۱',
    id: 'vision',
    navLabel: 'چشم‌انداز هلدینگ',
    title: 'چشم‌انداز هلدینگ',
  },
  {
    index: 1,
    numberLabel: '۰۲',
    id: 'philosophy',
    navLabel: 'ارزش‌آفرینی و هوشمندی',
    title: 'ارزش‌آفرینی و هوشمندی',
  },
  {
    index: 2,
    numberLabel: '۰۳',
    id: 'ecosystems',
    navLabel: 'منظومه پلتفرم‌ها',
    title: 'منظومه پلتفرم‌ها',
  },
  {
    index: 3,
    numberLabel: '۰۴',
    id: 'contact',
    navLabel: 'ارتباط و پایان',
    title: 'ارتباط و پایان',
  },
];

export interface ValuePillar {
  number: string;
  title: string;
  englishKicker: string;
  summary: string;
  macroOutcome: string;
  architecturalPrinciple: string;
}

export const VALUE_PILLARS: ValuePillar[] = [
  {
    number: '۰۱',
    title: 'یکپارچگی و نظم ساختاری',
    englishKicker: 'Structural Order',
    summary:
      'تبدیل جریان‌های پراکنده عملیاتی، مالی و ارتباطی در کسب‌وکارهای اصیل به یک معماری منسجم، شفاف و استاندارد که وابستگی سازمان به حافظه فردی را از میان برمی‌دارد.',
    macroOutcome: 'پایش کلان دارایی‌ها و تعهدات در یک چارچوب واحد و تغییرناپذیر',
    architecturalPrinciple: 'تمرکززدایی از آشفتگی روزمره و استقرار انضباط نهادی',
  },
  {
    number: '۰۲',
    title: 'هوشمندی نامرئی در تصمیم‌گیری',
    englishKicker: 'Embedded Intelligence',
    summary:
      'جایگزینی ابزارهای پیچیده با لایه‌ای نامرئی از هوش مصنوعی که در پس‌زمینه فرآیندها جریان دارد؛ تحلیل الگوهای بازار، پیش‌بینی گلوگاه‌ها و ارائه اشراف تحلیلی به مدیران ارشد.',
    macroOutcome: 'ارتقای دقت تصمیم‌گیری‌های استراتژیک بدون تحمیل پیچیدگی فنی به سازمان',
    architecturalPrinciple: 'هوشمندی خاموش در خدمت شهود و تجربه مدیریتی',
  },
  {
    number: '۰۳',
    title: 'تثبیت جایگاه در فضای دیجیتال',
    englishKicker: 'Digital Authority',
    summary:
      'خلق حضور دیجیتال مقتدر، مستقل و درخور شأن برندهای سنتی و باسابقه؛ به گونه‌ای که اعتبار چندین‌ساله فیزیکی آن‌ها با همان وقار و اعتماد در اکوسیستم مدرن بازتاب یابد.',
    macroOutcome: 'مرجعیت پایدار برند و مالکیت کامل بر تجربه و ارتباط با مخاطبان',
    architecturalPrinciple: 'پیوند اصالت تاریخی کسب‌وکار با استانداردهای نوین تعامل',
  },
];

export interface EcosystemCoreValue {
  index: string;
  category: string;
  title: string;
  description: string;
}

export interface EcosystemMetric {
  value: string;
  label: string;
  sublabel?: string;
}

export interface EcosystemSystemArchitecture {
  input: string;
  processing: string;
  output: string;
}

export interface EcosystemConfig {
  slug: string;
  indexNumber: string;
  title: string;
  shortTitle: string;
  englishTitle?: string;
  tagline: string;
  sectorLabel: string;
  macroVision: string;
  transformationNarrative: string;
  traditionalChallenge: string;
  ecosystemParadigm: string;
  architecturalImage: string;
  ambientAccent: string;
  coreValues: EcosystemCoreValue[];
  metrics?: EcosystemMetric[];
  featureBadges?: string[];
  systemArchitecture?: EcosystemSystemArchitecture;
  externalPlatformUrl: string;
}

export const ECOSYSTEMS: EcosystemConfig[] = [
  {
    slug: 'real-estate',
    indexNumber: '۰۱',
    title: 'زیست‌بوم هوشمند املاک و مستغلات',
    shortTitle: 'زیست‌بوم املاک و مستغلات',
    englishTitle: 'BORHAN ESTATE & ASSETS',
    tagline: 'مدیریت هوشمند سرمایه، معاملات و ارتباطات ملکی',
    sectorLabel: 'مهندسی دارایی و توسعه مستغلات',
    macroVision:
      'این زیست‌بوم، دفاتر مهندسی، هلدینگ‌های ساختمانی و بنگاه‌های معاملاتی اصیل را از مدیریت سنتی فایل‌ها به سطح یک نهاد هوشمند مدیریت ثروت و دارایی‌های ملکی ارتقا می‌دهد. تمامی چرخه‌های ارزیابی، مذاکره و بهره‌برداری در بستری آرام، شفاف و مقتدر یکپارچه می‌شوند.',
    transformationNarrative:
      'در بازار سرمایه ملکی، اعتماد و اشراف اطلاعاتی سنگ‌بنای هر تصمیم کلان است. زیرساخت ما با حذف پراکندگی اطلاعاتی و ایجاد حافظه سازمانی هوشمند، به مدیران امکان می‌دهد پرتفوی دارایی‌ها و فرصت‌های سرمایه‌گذاری را با دقت مهندسی راهبری کنند.',
    traditionalChallenge: 'پراکندگی اطلاعات املاک، فرسایش ارتباط با سرمایه‌گذاران و وابستگی به فرآیندهای شفاهی',
    ecosystemParadigm: 'اشراف لحظه‌ای بر پرتفوی سرمایه، هویت دیجیتال اختصاصی و استانداردسازی چرخه مذاکرات کلان',
    architecturalImage: '/src/assets/images/ecosystem_real_estate_1793709362336.jpg',
    ambientAccent: 'rgba(184, 151, 104, 0.14)',
    metrics: [
      { value: '+۳۸٪', label: 'تسریع چرخه مذاکره و عقد قرارداد', sublabel: 'پایش هوشمند متقاضیان' },
      { value: '۱۰۰٪', label: 'یکپارچه‌سازی اسناد و سوابق دارایی', sublabel: 'امنیت اسناد ثبتی' },
      { value: '۰ خطای تحلیلی', label: 'در ارزش‌گذاری و پیش‌بینی بازده', sublabel: 'الگوریتم‌های تطبیقی' },
    ],
    featureBadges: ['پرتفوی هوشمند سرمایه‌گذاری', 'سامانه امن مذاکرات کلان', 'پورتال اختصاصی املاک ممتاز'],
    systemArchitecture: {
      input: 'ثبت اطلاعات ثبتی، مشخصات مهندسی و سوابق سرمایه‌گذاران',
      processing: 'تطبیق هوشمند فرصت‌ها با پروفایل ریسک سرمایه‌گذار و تحلیل حاشیه سود',
      output: 'گزارش تحلیلی اشراف مدیریتی، داشبورد مذاکرات و قرارداد استاندارد',
    },
    coreValues: [
      {
        index: '۰۱',
        category: 'کارایی ساختاری',
        title: 'شفافیت و سرعت در تصمیم‌گیری سرمایه‌ای',
        description:
          'ساختاردهی یکپارچه به اطلاعات املاک، سوابق مذاکرات و تحلیل ارزش دارایی‌ها جهت تصمیم‌گیری دقیق در لحظات کلیدی بازار.',
      },
      {
        index: '۰۲',
        category: 'پرستیژ و مرجعیت',
        title: 'هویت دیجیتال مستقل و مقتدر',
        description:
          'ارائه پورتال اختصاصی و موقر برای معرفی پروژه‌ها و دارایی‌های ممتاز، متناسب با شأن سرمایه‌گذاران و مالکان تراز اول.',
      },
      {
        index: '۰۳',
        category: 'رشد پایدار',
        title: 'هوشمندسازی فرآیندهای ارتباطی و حفظ سرمایه',
        description:
          'تبدیل ارتباطات مقطعی به سرمایه‌های ارتباطی بلندمدت از طریق پایش هوشمند نیازها و تداوم ارتباط حرفه‌ای با متقاضیان.',
      },
    ],
    externalPlatformUrl: 'https://real-estate.ecosystem.example',
  },
  {
    slug: 'technical-services',
    indexNumber: '۰۲',
    title: 'زیست‌بوم خدمات فنی و تخصصی',
    shortTitle: 'زیست‌بوم خدمات فنی و تخصصی',
    englishTitle: 'BORHAN TECHNICAL OPERATIONS',
    tagline: 'سازماندهی هوشمند عملیات، استانداردسازی خدمات و توسعه بازار محلی',
    sectorLabel: 'عملیات مهندسی و خدمات تخصصی',
    macroVision:
      'این پلتفرم، مجموعه‌های فنی، مهندسی و خدمات تخصصی را از ساختارهای کارگاهی و غیرمتمرکز به سازمان‌هایی با استانداردهای عملیاتی دقیق، زمان‌بندی هوشمند و مرجعیت منطقه‌ای تبدیل می‌کند.',
    transformationNarrative:
      'کیفیت فنی بدون نظم اجرایی و تجربه شایسته مشتری، در مقیاس‌پذیری متوقف می‌ماند. زیست‌بوم خدمات فنی با ایجاد هماهنگی نامرئی میان صف عملیات، نیروهای متخصص و تعهدات زمانی، اعتبار فنی مجموعه را به رشد اقتصادی پایدار پیوند می‌زند.',
    traditionalChallenge: 'عدم شفافیت در زمان‌بندی عملیات، ناهماهنگی تیم‌های اجرایی و محدودیت در جذب مشتریان وفادار',
    ecosystemParadigm: 'انضباط عملیاتی خودکار، تضمین کیفیت تحویل خدمات و تثبیت اعتبار مجموعه در بازار هدف',
    architecturalImage: '/src/assets/images/ecosystem_technical_services_1793709364299.jpg',
    ambientAccent: 'rgba(148, 163, 184, 0.12)',
    metrics: [
      { value: '۴۵٪', label: 'کاهش اتلاف زمان در صف عملیات و اعزام', sublabel: 'تخصیص الگوریتمی تسک‌ها' },
      { value: '۹۹.۴٪', label: 'دقت در پایبندی به تعهدات تحویل', sublabel: 'پایش بلادرنگ صف' },
      { value: '۳.۲x', label: 'ارتقای شاخص بازگشت مشتریان سازمانی', sublabel: 'پایداری زنجیره خدمات' },
    ],
    featureBadges: ['دیسپچینگ هوشمند نیروها', 'داشبورد بلادرنگ صف کارگاه', 'کنترل کیفیت و امضای دیجیتال'],
    systemArchitecture: {
      input: 'درخواست خدمت فنی، مشخصات پروژه و ظرفیت منابع انسانی',
      processing: 'زمان‌بندی خودکار، مسیریابی بهینه و تخصیص هوشمند متخصصان',
      output: 'چرخه شفاف خدمت، رهگیری کارفرما و گزارش تسویه مالی خودکار',
    },
    coreValues: [
      {
        index: '۰۱',
        category: 'کارایی ساختاری',
        title: 'همگام‌سازی و استانداردسازی زنجیره عملیات',
        description:
          'نظم‌بخشی به چرخه پذیرش، تخصیص منابع و تحویل خدمات تخصصی با حداقل اصطکاک اجرایی و حداکثر دقت زمانی.',
      },
      {
        index: '۰۲',
        category: 'پرستیژ و مرجعیت',
        title: 'ارتقای تجربه کارفرما و شفافیت تعهدات',
        description:
          'ایجاد تصویری شفاف، قابل اتکا و حرفه‌ای از روند انجام خدمات که اعتماد کارفرمایان سازمانی و خصوصی را دوچندان می‌سازد.',
      },
      {
        index: '۰۳',
        category: 'رشد پایدار',
        title: 'توسعه هدفمند سهم بازار محلی و منطقه‌ای',
        description:
          'تثبیت حضور دیجیتال مجموعه در جغرافیای فعالیت و تبدیل کیفیت فنی به مزیت رقابتی پایدار و تکرارشونده.',
      },
    ],
    externalPlatformUrl: 'https://technical.ecosystem.example',
  },
  {
    slug: 'wellness-lifestyle',
    indexNumber: '۰۳',
    title: 'زیست‌بوم سلامت و سبک زندگی',
    shortTitle: 'زیست‌بوم سلامت و سبک زندگی',
    englishTitle: 'BORHAN WELLNESS & CLINICAL',
    tagline: 'مدیریت یکپارچه زمان، تجربه مراجعین و ارتقای بهره‌وری مراکز',
    sectorLabel: 'مراکز سلامت، کلینیک‌ها و سبک زندگی',
    macroVision:
      'طراحی‌شده برای کلینیک‌های تخصصی، مراکز تندرستی و مجموعه‌های ممتاز سبک زندگی که آرامش، کرامت مراجعین و بهره‌وری دقیق زمان متخصصان را در اولویت نخست خود قرار می‌دهند.',
    transformationNarrative:
      'در حوزه‌های سلامت و سبک زندگی، کیفیت تجربه مراجع پیش از ورود فیزیکی به مرکز آغاز می‌شود. این زیست‌بوم با حذف تداخل‌های زمانی و ایجاد جریان ارتباطی آرام و شخصی‌سازی‌شده، فضایی درخور تمرکز متخصصان و آرامش مراجعین خلق می‌کند.',
    traditionalChallenge: 'اتلاف زمان ارزشمند متخصصان، تداخل نوبت‌ها و تجربه پراسترس در پذیرش و پیگیری مراجعین',
    ecosystemParadigm: 'مهندسی دقیق زمان، ارتباط محترمانه و مستمر با مراجعین و بیشینه‌سازی ظرفیت بهره‌وری مرکز',
    architecturalImage: '/src/assets/images/ecosystem_wellness_lifestyle_1793709366513.jpg',
    ambientAccent: 'rgba(180, 166, 145, 0.14)',
    metrics: [
      { value: '۵۵٪', label: 'کاهش زمان انتظار مراجعان در مرکز', sublabel: 'زمان‌بندی تطبیقی' },
      { value: 'صفر تداخل', label: 'در تقویم پذیرش و منابع درمانی', sublabel: 'هماهنگی منابع و یونیت‌ها' },
      { value: '۹۸٪', label: 'شاخص وفاداری و تداوم چرخه مراقبت', sublabel: 'پیگیری هوشمند خودکار' },
    ],
    featureBadges: ['نوبت‌دهی هوشمند بدون اصطکاک', 'پرونده الکترونیک امن مراجع', 'پایش دوره‌ای درمان'],
    systemArchitecture: {
      input: 'ثبت پرونده مراجع، تقویم کاری پزشکان و ظرفیت اتاق‌های درمانی',
      processing: 'تنظیم فاصله‌های زمانی متناسب با ماهیت درمان و پیش‌بینی دیرکرد',
      output: 'پذیرش آرام، ارسال یادآورهای هوشمند و گزارش راندمان اقتصادی مرکز',
    },
    coreValues: [
      {
        index: '۰۱',
        category: 'کارایی ساختاری',
        title: 'مهندسی یکپارچه زمان و ظرفیت‌های تخصصی',
        description:
          'بهینه‌سازی هوشمند تقویم کاری متخصصان و فضاهای خدماتی به منظور حذف زمان‌های راکد و جلوگیری از تراکم مراجعین.',
      },
      {
        index: '۰۲',
        category: 'پرستیژ و مرجعیت',
        title: 'تجربه پذیرش و همراهی در تراز ممتاز',
        description:
          'ارائه درگاه اختصاصی و آرام برای تعامل مراجعین با مرکز، منطبق با استانداردهای روز مراکز سلامت و تندرستی.',
      },
      {
        index: '۰۳',
        category: 'رشد پایدار',
        title: 'تداوم چرخه مراقبت و وفاداری بلندمدت',
        description:
          'پایش هوشمند دوره‌های پیگیری و حفظ ارتباط مستمر با مراجعین که به پایداری درآمدی و ارتقای شاخص رضایت می‌انجامد.',
      },
    ],
    externalPlatformUrl: 'https://wellness.ecosystem.example',
  },
  {
    slug: 'custom-manufacturing',
    indexNumber: '۰۴',
    title: 'زیست‌بوم صنایع و تولیدات سفارشی',
    shortTitle: 'زیست‌بوم صنایع و تولیدات سفارشی',
    englishTitle: 'BORHAN ATELIER & MANUFACTURING',
    tagline: 'شفافیت چرخه تولید، مدیریت تعهدات و تجربه مدرن سفارش',
    sectorLabel: 'صنایع اصیل و آتلیه‌های تولید سفارشی',
    macroVision:
      'پلی میان اصالت تولید، هنر ساخت و مدیریت مدرن زنجیره ارزش؛ این زیست‌بوم به صنایع تولیدی و مجموعه‌های ساخت سفارشی امکان می‌دهد از مرحله ثبت مشخصات تا تحویل نهایی را با شفافیت و اقتدار مدیریت کنند.',
    transformationNarrative:
      'تولیدکنندگان اصیل همواره با چالش هماهنگی میان ظرافت‌های سفارش مشتری و واقعیت‌های خط تولید روبرو هستند. پلتفرم ما با استانداردسازی فرآیند سفارش‌گیری، رصد مراحل ساخت و مستندسازی تعهدات، ریسک خطای اجرایی را به حداقل می‌رساند.',
    traditionalChallenge: 'ابهام در وضعیت سفارش‌ها، ناهماهنگی میان واحد فروش و کارگاه تولید و تاخیر در ایفای تعهدات',
    ecosystemParadigm: 'اشراف کامل بر چرخه تولید، شفافیت مرحله‌به‌مرحله برای سفارش‌دهنده و صیانت از اعتبار برند تولیدی',
    architecturalImage: '/src/assets/images/ecosystem_custom_manufacturing_1793709365966.jpg',
    ambientAccent: 'rgba(184, 134, 88, 0.14)',
    metrics: [
      { value: '۳۲٪', label: 'کاهش ضایعات و ناهماهنگی خط تولید', sublabel: 'رهگیری گام‌به‌گام فرایند' },
      { value: '۱۰۰٪', label: 'شفافیت رهگیری سفارش توسط کارفرما', sublabel: 'پورتال اختصاصی خریدار' },
      { value: '۴.۵x', label: 'توسعه ظرفیت پذیرش سفارش‌های کلان و صادراتی', sublabel: 'استانداردسازی صنعتی' },
    ],
    featureBadges: ['رهگیری خط ساخت سفارشی', 'ویترین تعاملی اصالت کالا', 'مدیریت زنجیره تأمین مواد اولیه'],
    systemArchitecture: {
      input: 'مشخصات فنی سفارشی، نقشه‌ها و استانداردهای مواد اولیه',
      processing: 'تقطیع سفارش به ایستگاه‌های کاری، کنترل کیفیت میانی و زمان‌سنجی ساخت',
      output: 'شناسنامه دیجیتال اصالت کالا، اطلاع‌رسانی خودکار پیشرفت به خریدار و تحویل',
    },
    coreValues: [
      {
        index: '۰۱',
        category: 'کارایی ساختاری',
        title: 'شفافیت سرتاسری در چرخه ساخت و تامین',
        description:
          'رصد یکپارچه وضعیت هر سفارش از لحظه تایید مشخصات فنی تا کنترل کیفیت و تحویل، بدون گسست اطلاعاتی.',
      },
      {
        index: '۰۲',
        category: 'پرستیژ و مرجعیت',
        title: 'مدرن‌سازی تجربه ثبت و پیگیری سفارش',
        description:
          'ارائه ویترین دیجیتال اصیل و سامانه پیگیری شفاف که جایگاه تولیدکننده را نزد شرکای تجاری و خریداران ارتقا می‌دهد.',
      },
      {
        index: '۰۳',
        category: 'رشد پایدار',
        title: 'مدیریت دقیق تعهدات و صیانت از حاشیه سود',
        description:
          'کاهش ضایعات ناشی از ناهماهنگی، پیش‌بینی دقیق زمان تحویل و ایجاد ظرفیت پایدار برای پذیرش سفارش‌های کلان.',
      },
    ],
    externalPlatformUrl: 'https://manufacturing.ecosystem.example',
  },
];

export function getEcosystemBySlug(slug: string): EcosystemConfig | undefined {
  return ECOSYSTEMS.find((item) => item.slug === slug);
}
