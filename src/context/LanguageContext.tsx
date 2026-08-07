import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    topBarAnnouncement: 'شركة دار العطور لاستيراد العطور ومواد الزينة — المقر الرئيسي: حي الأندلس، طرابلس',
    navHome: 'الرئيسية',
    navAbout: 'عن الشركة',
    navSpecialties: 'مجالات الاختصاص',
    navPhilosophy: 'فلسفة النوتات',
    navPartnerships: 'الشراكات والتوريد',
    navContact: 'تواصل معنا',
    btnCorporateInquiry: 'التواصل والشراكات',

    heroSubtitle: 'DAR AL-ATOUR PERFUMES & COSMETICS IMPORT CO.',
    heroTitle: 'الرواد في استيراد أفخم العطور والزيوت العطرية ومواد الزينة',
    heroDescription: 'شركة ليبية متخصصة في استيراد وتوريد أرقى العطور العالمية، والزيوت العطرية الخام، ومستحضرات التجميل الفاخرة وفق أعلى معايير الجودة العالمية.',
    btnExploreSpecialties: 'اكتشف مجالات الاختصاص',
    btnContactB2B: 'الشراكات والطلبات التجارية',
    statBottles: '+500',
    statBottlesText: 'صنف عطري مستورد',
    statClients: '100%',
    statClientsText: 'نقاء وجودة معتمدة',
    statSupport: '24/7',
    statSupportText: 'خدمة كبار العملاء والتجار',

    aboutBadge: 'عن شركة دار العطور',
    aboutTitle: 'الأصالة في الاستيراد والتميز في التوريد',
    aboutText1: 'تأسست شركة دار العطور لاستيراد العطور ومواد الزينة (ذ.م.م) في العاصمة الليبية طرابلس (حي الأندلس) لتكون الصرح الأبرز في استيراد وتوريد المنتجات العطرية الفاخرة والزيوت العطرية الخام ومستحضرات التجميل عالية الجودة.',
    aboutText2: 'نعمل على الربط بين أحدث المختبرات ودور العطور العالمية والسوق الليبي والإقليمي، مع التزامنا التام بتقديم الخلاصات النقية والمنتجات المستوردة بعناية فائقة تلبي تطلعات أصحاب الذوق الرفيع والمؤسسات التجارية.',

    pillar1Title: 'النقاء الأصيل',
    pillar1Desc: 'نضمن توريد خلاصات وزيوت عطرية 100% نقية من المصادر الأصلية.',
    pillar2Title: 'الشراكات العالمية',
    pillar2Desc: 'علاقات استراتيجية مباشرة مع أعرق دور العطور في فرنسا، إيطاليا، والهند.',
    pillar3Title: 'التغطية اللوجستية',
    pillar3Desc: 'شبكة توزيع وتوريد متكاملة تغطي العاصمة طرابلس وكافة المدن الليبية.',
    pillar4Title: 'خدمة قطاع الأعمال',
    pillar4Desc: 'حلول توريد مخصصة للموزعين المعتمدين والصيدليات ومحلات التجميل.',

    specialtiesBadge: 'مجالات الاختصاص والتوريد',
    specialtiesTitle: 'الأقسام الرئيسية لنشاط الشركة',
    specialtiesSubtitle: 'نغطي كافة متطلبات سوق العطور والزيوت العطرية ومواد الزينة الفاخرة',

    div1Title: 'قسم العطور العالمية الفاخرة',
    div1Desc: 'استيراد أفخم مجموعات العطور الجاهزة وتركيزات Extrait de Parfum المصممة من قبل كبار العطارين.',
    div2Title: 'قسم العود والزيوت العطرية الخام',
    div2Desc: 'توريد دهن العود الكمبودي المعتق، رقائق البخور الموروكي، والزيوت العطرية المركزية النقية.',
    div3Title: 'قسم مستحضرات التجميل ومواد الزينة',
    div3Desc: 'استيراد خطوط ومجموعات التجميل العالية الجودة ومستلزمات العناية الشخصية الملكية.',

    philosophyBadge: 'فلسفة النوتات العطرية',
    philosophyTitle: 'الهندسة العطرية والتناغم الحسي',
    philosophySubtitle: 'نعتمد على فهم عميق لمكونات العطر وتدرج فوحانه من القمة حتى القاعدة',
    topNotesTitle: 'النوتات العليا (Top Notes)',
    topNotesDesc: 'النفحات الأولى الفواحة مثل الزعفران الإيراني، البرغموت، والهيل الهندي.',
    heartNotesTitle: 'النوتات الوسطى (Heart Notes)',
    heartNotesDesc: 'قلب العطر وجوهره مثل الورد الطائفي، الياسمين الشامي، والعنبر.',
    baseNotesTitle: 'النوتات القاعدية (Base Notes)',
    baseNotesDesc: 'عمق العطر وثباته الدائم مثل العود الكمبودي المعتق، المسك، والصندل.',

    b2bBadge: 'الشراكات والتوريد التجاري',
    b2bTitle: 'الاستيراد وطلبات الجملة للمؤسسات',
    b2bSubtitle: 'نرحب بجميع طلبات التوريد والشراكات التجارية مع محلات التجميل، الصيدليات، والموزعين في ليبيا',
    labelProdType: 'فئة التوريد المطلوبة:',
    labelVolume: 'الكمية التقديرية (عبوة / كجم):',
    labelNotes: 'ملاحظات وتفاصيل الطلب:',
    btnSubmitCorporate: 'إرسال الاستفسار التجاري عبر الواتساب (0914091100)',

    footerAddressTitle: 'المقر الرئيسي',
    footerAddress: 'حي الأندلس، طرابلس - دولة ليبيا',
    footerPhoneTitle: 'التواصل المباشر والواتساب',
    footerPhone: '0914091100',
    footerEmailTitle: 'البريد الإلكتروني الرسمي',
    footerEmail: 'info@dar-alatour.ly',
    footerRights: 'جميع الحقوق محفوظة © 2026 شركة دار العطور لاستيراد العطور ومواد الزينة ذ.م.م'
  },
  en: {
    topBarAnnouncement: 'Dar Al-Atour Perfumes & Cosmetics Import Co. — HQ: Hai Al-Andalus, Tripoli',
    navHome: 'Home',
    navAbout: 'About Company',
    navSpecialties: 'Specialties',
    navPhilosophy: 'Fragrance Philosophy',
    navPartnerships: 'B2B & Trade',
    navContact: 'Contact Us',
    btnCorporateInquiry: 'Trade Inquiries',

    heroSubtitle: 'DAR AL-ATOUR PERFUMES & COSMETICS IMPORT CO.',
    heroTitle: 'Leaders in Importing Fine Fragrances, Raw Oils & Luxury Cosmetics',
    heroDescription: 'A premier Libyan corporation dedicated to sourcing and importing elite international perfumes, pure raw essential oils, and haute cosmetics adhering to global quality standards.',
    btnExploreSpecialties: 'Explore Our Specialties',
    btnContactB2B: 'Corporate & B2B Inquiries',
    statBottles: '+500',
    statBottlesText: 'Imported Fragrance Lines',
    statClients: '100%',
    statClientsText: 'Certified Pure Quality',
    statSupport: '24/7',
    statSupportText: 'VIP Trade Support',

    aboutBadge: 'ABOUT DAR AL-ATOUR',
    aboutTitle: 'Excellence in Sourcing & Global Import',
    aboutText1: 'Established in Tripoli (Hai Al-Andalus), Dar Al-Atour Perfumes & Cosmetics Import Co. LLC stands as a paramount enterprise specializing in importing and supplying luxury fragrances, rare essential oils, and cosmetic supplies.',
    aboutText2: 'We bridge top international laboratories and master perfumers with the Libyan and regional markets, delivering 100% pure formulations and meticulously selected imported goods.',

    pillar1Title: 'Certified Purity',
    pillar1Desc: 'We guarantee 100% pure fragrance extracts direct from original sources.',
    pillar2Title: 'Global Partnerships',
    pillar2Desc: 'Direct alliances with renowned fragrance houses in France, Italy, and India.',
    pillar3Title: 'Logistics Network',
    pillar3Desc: 'Comprehensive supply chain covering Tripoli and all major Libyan cities.',
    pillar4Title: 'B2B Solutions',
    pillar4Desc: 'Tailored supply contracts for authorized distributors, pharmacy chains, and cosmetic centers.',

    specialtiesBadge: 'OUR SPECIALTIES',
    specialtiesTitle: 'Core Divisions & Operations',
    specialtiesSubtitle: 'Meeting the demands of the luxury fragrance, raw essential oil, and cosmetics market',

    div1Title: 'Haute Parfumerie Division',
    div1Desc: 'Importing finished luxury perfume collections and Extrait de Parfum creations crafted by master perfumers.',
    div2Title: 'Oud & Raw Essences Division',
    div2Desc: 'Supplying aged Cambodian oud oils, Maroke incense wood, and 100% pure essential oil concentrates.',
    div3Title: 'Cosmetics & Beauty Division',
    div3Desc: 'Importing premium skincare, cosmetics, and royal beauty accessories.',

    philosophyBadge: 'FRAGRANCE PHILOSOPHY',
    philosophyTitle: 'The Architecture of Fine Fragrance',
    philosophySubtitle: 'Deep expertise in olfactory notes hierarchy from top introduction to lingering base',
    topNotesTitle: 'Top Notes (Introduction)',
    topNotesDesc: 'Vibrant initial accords including Iranian Saffron, Sicilian Bergamot, and Cardamom.',
    heartNotesTitle: 'Heart Notes (The Essence)',
    heartNotesDesc: 'The core floral and amber soul featuring Taif Rose, Wild Jasmine, and Amberwood.',
    baseNotesTitle: 'Base Notes (The Legacy)',
    baseNotesDesc: 'Enduring sillage composed of Aged Cambodian Oud, Pure White Musk, and Sandalwood.',

    b2bBadge: 'TRADE & B2B INQUIRIES',
    b2bTitle: 'Corporate Supply & Import Partnerships',
    b2bSubtitle: 'We welcome commercial distribution requests and supply partnerships with retail networks, pharmacies, and commercial partners across Libya',
    labelProdType: 'Supply Category Required:',
    labelVolume: 'Estimated Quantity (Units / Kg):',
    labelNotes: 'Additional Notes & Requirements:',
    btnSubmitCorporate: 'Submit Corporate Inquiry via WhatsApp (0914091100)',

    footerAddressTitle: 'Headquarters Location',
    footerAddress: 'Hai Al-Andalus, Tripoli - State of Libya',
    footerPhoneTitle: 'Direct Phone & WhatsApp',
    footerPhone: '0914091100',
    footerEmailTitle: 'Official Email',
    footerEmail: 'info@dar-alatour.ly',
    footerRights: 'All Rights Reserved © 2026 Dar Al-Atour Perfumes & Cosmetics Import Co. LLC'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('dar_alatour_lang') as Language) || 'ar';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('dar_alatour_lang', newLang);
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    if (lang === 'ar') {
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
    }
  }, [lang, dir]);

  const t = (key: string): string => {
    return translations[lang]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
