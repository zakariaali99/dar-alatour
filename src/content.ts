export type Lang = 'ar' | 'en'

export const CONTACT = {
  phoneDisplay: '+218 91 409 1100',
  phoneTel: '+218914091100',
  whatsapp: '218914091100',
} as const

export const content = {
  ar: {
    dir: 'rtl',
    brand: 'دار العطور',
    brandFull: 'شركة دار العطور لاستيراد العطور ومواد الزينة',
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      values: 'لماذا نحن',
      contact: 'تواصل معنا',
    },
    hero: {
      eyebrow: 'استيراد العطور ومواد الزينة — طرابلس، ليبيا',
      title: 'نجلب عطور العالم إلى',
      titleAccent: 'ليبيا.',
      body: 'شركة دار العطور لاستيراد العطور ومواد الزينة تختص باستيراد وتوريد وتوزيع العطور ومستحضرات التجميل من مصادر موثوقة إلى السوق الليبي.',
      cta: 'تواصل معنا',
      ctaAlt: 'واتساب',
      scroll: 'مرّر للأسفل',
    },
    marks: [
      { k: 'المقر', v: 'طرابلس، ليبيا' },
      { k: 'النشاط', v: 'استيراد وتوزيع' },
      { k: 'المجال', v: 'عطور ومواد زينة' },
    ],
    about: {
      eyebrow: 'من نحن',
      title: 'شركة ليبية أساسها الثقة.',
      p1: 'شركة دار العطور لاستيراد العطور ومواد الزينة شركة ذات مسؤولية محدودة، مقرها حي الأندلس في مدينة طرابلس.',
      p2: 'نختص باستيراد العطور ومستحضرات التجميل ومواد الزينة، وتوريدها وتوزيعها في السوق المحلي. عملنا بسيط وواضح: اختيار دقيق للمصدر، وتعامل سليم مع المنتج، والتزام بما نعد به.',
      quote: 'العطر تفصيل صغير يترك أثراً كبيراً — ونحن نتعامل معه بهذا القدر من العناية.',
    },
    services: {
      eyebrow: 'خدماتنا',
      title: 'ما الذي نقوم به',
      lead: 'ثلاث حلقات متصلة نديرها من البداية إلى النهاية.',
      items: [
        {
          n: '01',
          t: 'الاستيراد',
          d: 'نستورد العطور ومستحضرات التجميل من موردين موثوقين، ونتولى المصدر والشحن والإجراءات من البداية إلى النهاية.',
        },
        {
          n: '02',
          t: 'التوريد',
          d: 'نورّد لمحلات التجزئة والمتاجر والموزعين بمخزون منتظم وشروط واضحة ومفهومة.',
        },
        {
          n: '03',
          t: 'التوزيع',
          d: 'نوزّع في السوق المحلي مع عناية في المناولة والتخزين والتزام في المواعيد.',
        },
      ],
    },
    values: {
      eyebrow: 'لماذا نحن',
      title: 'طريقتنا في العمل',
      items: [
        { t: 'مصادر موثوقة', d: 'نتعامل مع موردين معروفين، ونتحقق من المنتج قبل أن يصل إليك.' },
        { t: 'مناولة بعناية', d: 'تخزين ونقل مناسبان يحافظان على المنتج كما غادر المصنع.' },
        { t: 'تواصل واضح', d: 'أسعار وشروط ومواعيد مكتوبة بوضوح، بلا مفاجآت.' },
        { t: 'التزام بالمواعيد', d: 'نلتزم بالجدول المتفق عليه، ونخبرك فوراً إذا تغيّر شيء.' },
      ],
    },
    contact: {
      eyebrow: 'تواصل معنا',
      title: 'لنتحدث.',
      lead: 'للاستفسار عن التوريد أو التوزيع أو الشراكة، تواصل معنا مباشرة عبر الواتساب أو الهاتف.',
      phoneLabel: 'الهاتف / واتساب',
      addressLabel: 'العنوان',
      address: 'حي الأندلس، طرابلس — دولة ليبيا',
      wa: 'مراسلة عبر واتساب',
      call: 'اتصال هاتفي',
      waMessage: 'السلام عليكم، أود الاستفسار عن خدمات شركة دار العطور.',
      waPanelTitle: 'الواتساب أسرع طريقة للوصول إلينا',
      waPanelBody: 'اضغط لبدء محادثة مباشرة مع فريقنا.',
    },
    band: {
      title: 'هل تبحث عن مورّد تثق به؟',
      body: 'تحدث إلينا اليوم وسنساعدك في تجهيز طلبك.',
      cta: 'ابدأ المحادثة',
    },
    footer: {
      tagline: 'استيراد وتوريد وتوزيع العطور ومواد الزينة — طرابلس، ليبيا.',
      nav: 'روابط',
      reach: 'للتواصل',
      rights: 'جميع الحقوق محفوظة.',
    },
    ui: {
      menu: 'القائمة',
      close: 'إغلاق',
      theme: 'تبديل المظهر',
      language: 'تغيير اللغة',
    },
    langToggle: 'EN',
  },

  en: {
    dir: 'ltr',
    brand: 'Dar Al-Atour',
    brandFull: 'Dar Al-Atour Perfumes Company',
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      values: 'Why us',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'Perfume & cosmetics import — Tripoli, Libya',
      title: "Bringing the world's fragrances to",
      titleAccent: 'Libya.',
      body: 'Dar Al-Atour Perfumes Company imports, supplies and distributes perfumes and cosmetics from trusted sources to the Libyan market.',
      cta: 'Get in touch',
      ctaAlt: 'WhatsApp',
      scroll: 'Scroll',
    },
    marks: [
      { k: 'Based in', v: 'Tripoli, Libya' },
      { k: 'Activity', v: 'Import & distribution' },
      { k: 'Category', v: 'Perfumes & cosmetics' },
    ],
    about: {
      eyebrow: 'About us',
      title: 'A Libyan company built around trust.',
      p1: 'Dar Al-Atour Perfumes Company is a limited liability company based in Hay Al-Andalus, Tripoli.',
      p2: 'We specialise in importing perfumes, cosmetics and beauty products, and in supplying and distributing them across the local market. Our approach is simple: source carefully, handle properly, and deliver on what we promise.',
      quote: 'Fragrance is a small detail that leaves a large impression — we treat it with exactly that much care.',
    },
    services: {
      eyebrow: 'Services',
      title: 'What we do',
      lead: 'Three connected steps, managed end to end.',
      items: [
        {
          n: '01',
          t: 'Import',
          d: 'We import perfumes and cosmetics from trusted suppliers, handling sourcing, shipping and paperwork from start to finish.',
        },
        {
          n: '02',
          t: 'Supply',
          d: 'We supply retailers, boutiques and distributors with consistent stock and clear, straightforward terms.',
        },
        {
          n: '03',
          t: 'Distribution',
          d: 'We distribute across the local market with careful handling, proper storage and dependable timing.',
        },
      ],
    },
    values: {
      eyebrow: 'Why us',
      title: 'How we work',
      items: [
        { t: 'Trusted sourcing', d: 'We work with established suppliers and check the product before it reaches you.' },
        { t: 'Careful handling', d: 'Proper storage and transport, so the product arrives as it left the factory.' },
        { t: 'Clear communication', d: 'Prices, terms and timelines written plainly — no surprises.' },
        { t: 'Dependable timing', d: 'We keep to the agreed schedule, and tell you immediately if anything changes.' },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's talk.",
      lead: 'For supply, distribution or partnership enquiries, reach us directly on WhatsApp or by phone.',
      phoneLabel: 'Phone / WhatsApp',
      addressLabel: 'Address',
      address: 'Hay Al-Andalus, Tripoli — Libya',
      wa: 'Message on WhatsApp',
      call: 'Call us',
      waMessage: 'Hello, I would like to enquire about Dar Al-Atour Perfumes Company.',
      waPanelTitle: 'WhatsApp is the fastest way to reach us',
      waPanelBody: 'Tap to start a direct conversation with our team.',
    },
    band: {
      title: 'Looking for a supplier you can rely on?',
      body: 'Talk to us today and we will help you put your order together.',
      cta: 'Start a conversation',
    },
    footer: {
      tagline: 'Import, supply and distribution of perfumes and cosmetics — Tripoli, Libya.',
      nav: 'Navigate',
      reach: 'Reach us',
      rights: 'All rights reserved.',
    },
    ui: {
      menu: 'Menu',
      close: 'Close',
      theme: 'Toggle theme',
      language: 'Change language',
    },
    langToggle: 'ع',
  },
} as const

export type Copy = (typeof content)['en']
