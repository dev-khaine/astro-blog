// ============================================================
// i18n.ts — Bilingual EN / AR translation strings
// Usage: import { t } from '../i18n'; then t('en', 'key')
// ============================================================

export type Lang = 'en' | 'ar';

export const translations = {
  // ── SITE META ──────────────────────────────────────────────
  site_title: { en: 'Qoinra', ar: 'كوينرا' },
  site_description: {
    en: 'A knowledge hub for finance, economics, and technology in the modern digital world.',
    ar: 'منصة معرفية لفهم المال والاقتصاد والتكنولوجيا في العصر الرقمي الحديث.',
  },

  // ── HEADER ─────────────────────────────────────────────────
  nav_home:          { en: 'Home',      ar: 'الرئيسية' },
  nav_analysis:      { en: 'Articles',  ar: 'المقالات' },
  nav_about:         { en: 'About',     ar: 'عن الموقع' },
  nav_search:        { en: 'Search',    ar: 'بحث' },
  nav_rss:           { en: 'RSS Feed',  ar: 'خلاصة RSS' },
  nav_navigate:      { en: 'Navigate',  ar: 'التنقل' },
  lang_toggle_ar:    { en: 'عربي',      ar: 'EN' },
  lang_toggle_label: { en: 'Switch to Arabic', ar: 'Switch to English' },
  open_menu:         { en: 'Open navigation menu', ar: 'فتح قائمة التنقل' },
  close_menu:        { en: 'Close navigation menu', ar: 'إغلاق قائمة التنقل' },
  toggle_theme:      { en: 'Toggle light/dark mode', ar: 'تبديل الوضع الفاتح/الداكن' },
  search_label:      { en: 'Search', ar: 'بحث' },

  // ── FOOTER ─────────────────────────────────────────────────
  newsletter_label:   { en: 'The Qoinra Brief', ar: 'نشرة كوينرا' },
  newsletter_heading: {
    en: 'The digital economy moves fast.\nStay ahead.',
    ar: 'الاقتصاد الرقمي يتحرك بسرعة.\nكن في الطليعة.',
  },
  newsletter_desc: {
    en: 'Weekly insights on markets, crypto, tech, and online income — written clearly so you can act on it. No noise. No ads. Unsubscribe anytime.',
    ar: 'رؤى أسبوعية حول الأسواق والعملات الرقمية والتكنولوجيا وفرص الدخل — مكتوبة بوضوح لتتمكن من التصرف بناءً عليها. بلا ضجيج. بلا إعلانات. إلغاء الاشتراك في أي وقت.',
  },
  newsletter_email_placeholder: { en: 'your@email.com', ar: 'بريدك@الإلكتروني.com' },
  newsletter_email_label:       { en: 'Email address',  ar: 'البريد الإلكتروني' },
  newsletter_subscribe:         { en: 'Subscribe',      ar: 'اشترك' },
  newsletter_note: {
    en: 'By subscribing you agree to our Privacy Policy.',
    ar: 'بالاشتراك فإنك توافق على سياسة الخصوصية.',
  },
  footer_explore:   { en: 'Explore',  ar: 'استكشف' },
  footer_topics:    { en: 'Topics',   ar: 'المواضيع' },
  footer_meta:      { en: 'Meta',     ar: 'روابط' },
  footer_markets:   { en: 'Markets',  ar: 'الأسواق' },
  footer_crypto:    { en: 'Crypto',   ar: 'العملات الرقمية' },
  footer_trading:   { en: 'Trading',  ar: 'التداول' },
  footer_tech:      { en: 'Tech',     ar: 'التكنولوجيا' },
  footer_income:    { en: 'Online Income', ar: 'الدخل الرقمي' },
  footer_macro:     { en: 'Economics', ar: 'الاقتصاد' },
  footer_sitemap:   { en: 'Sitemap',  ar: 'خريطة الموقع' },
  footer_privacy:   { en: 'Privacy',  ar: 'الخصوصية' },
  footer_disclaimer:{ en: 'Disclaimer', ar: 'إخلاء المسؤولية' },
  footer_built_with:{ en: 'Built with', ar: 'مبني بـ' },
  footer_rights:    { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
  footer_desc: {
    en: 'Understanding finance, economics, and technology in the modern digital world.',
    ar: 'فهم المال والاقتصاد والتكنولوجيا في العصر الرقمي الحديث.',
  },
  footer_disclaimer_text: {
    en: 'Qoinra is for informational and educational purposes only. Nothing on this site constitutes financial, investment, legal, or tax advice. Past performance is not indicative of future results. Always do your own research.',
    ar: 'كوينرا للأغراض الإعلامية والتعليمية فقط. لا يُعدّ أي شيء في هذا الموقع نصيحة مالية أو استثمارية أو قانونية أو ضريبية. الأداء السابق لا يدل على النتائج المستقبلية. قم دائمًا بإجراء بحثك الخاص.',
  },

  // ── HOMEPAGE ───────────────────────────────────────────────
  home_est:          { en: 'Est.',           ar: 'تأسّس' },
  home_latest:       { en: 'Latest Articles', ar: 'أحدث المقالات' },
  home_view_archive: { en: 'View archive',    ar: 'عرض الأرشيف' },
  home_read_all:     { en: 'Read all',        ar: 'قراءة جميع' },
  home_articles:     { en: 'articles',        ar: 'مقالة' },
  by_author:         { en: 'By',              ar: 'بقلم' },
  home_tagline: {
    en: 'Understanding finance, economics, and technology in the modern digital world.',
    ar: 'فهم المال والاقتصاد والتكنولوجيا في العصر الرقمي الحديث.',
  },

  // ── BLOG ARCHIVE ───────────────────────────────────────────
  archive_title:    { en: 'Articles', ar: 'المقالات' },
  archive_articles: { en: 'articles', ar: 'مقالة' },

  // ── BLOG POST ──────────────────────────────────────────────
  post_updated:      { en: 'Updated',       ar: 'تحديث' },
  post_end:          { en: 'End of article', ar: 'نهاية المقال' },
  post_share:        { en: 'Share this article', ar: 'شارك هذا المقال' },
  post_share_x:      { en: 'Post on X',     ar: 'نشر على X' },
  post_share_li:     { en: 'LinkedIn',      ar: 'لينكدإن' },
  post_share_copy:   { en: 'Copy link',     ar: 'نسخ الرابط' },
  post_share_copied: { en: '✓ Copied',      ar: '✓ تم النسخ' },
  post_back:         { en: 'All articles',  ar: 'جميع المقالات' },
  post_discussion:   { en: 'Discussion',    ar: 'النقاش' },
  post_comments_note: {
    en: 'Comments are powered by Giscus via GitHub Discussions.',
    ar: 'التعليقات مدعومة من Giscus عبر GitHub Discussions.',
  },
  post_comments_setup: {
    en: 'Comments enabled after Giscus setup',
    ar: 'ستُفعَّل التعليقات بعد إعداد Giscus',
  },
  post_author_bio: {
    en: 'Writer covering finance, economics, and technology in the digital age. Views are my own.',
    ar: 'كاتب يغطي المال والاقتصاد والتكنولوجيا في العصر الرقمي. الآراء خاصة به.',
  },
  post_analyst: { en: 'Writer & Analyst', ar: 'كاتب ومحلل' },

  // ── ABOUT ──────────────────────────────────────────────────
  about_title:   { en: 'About', ar: 'عن الموقع' },
  about_role:    { en: 'Writer & Analyst', ar: 'كاتب ومحلل' },
  about_disclaimer_heading: { en: 'Disclaimer', ar: 'إخلاء المسؤولية' },
  about_disclaimer_text: {
    en: 'Nothing here is financial advice. All views are personal. Past performance ≠ future results.',
    ar: 'لا شيء هنا يُعدّ نصيحة مالية. جميع الآراء شخصية. الأداء السابق لا يعني نتائج مستقبلية.',
  },
  about_h_who:      { en: 'What Is Qoinra',    ar: 'ما هو كوينرا' },
  about_h_cover:    { en: 'What We Cover',      ar: 'ما نغطيه' },
  about_h_approach: { en: 'Our Approach',       ar: 'نهجنا' },
  about_h_contact:  { en: 'Get in Touch',       ar: 'تواصل معنا' },
  about_p1: {
    en: 'Qoinra is a knowledge hub dedicated to helping you understand finance, economics, and technology in the modern digital world. We believe that financial literacy and tech awareness are no longer optional — they are essential skills for navigating the future.',
    ar: 'كوينرا هو منصة معرفية تهدف إلى مساعدتك على فهم عالم المال والاقتصاد والتكنولوجيا في العصر الرقمي الحديث. نؤمن أن الثقافة المالية والوعي التكنولوجي لم يعودا اختياريين — بل هما مهارتان أساسيتان للتعامل مع المستقبل.',
  },
  about_p2: {
    en: 'Our blog explores global market trends, innovations in tech, cryptocurrencies, trading, and online income opportunities — all while providing clear insights and guidance to help you make informed decisions.',
    ar: 'يستكشف مدونتنا الاتجاهات العالمية للأسواق، الابتكارات التقنية، العملات الرقمية، التداول، وفرص الدخل عبر الإنترنت — مع تقديم رؤى واضحة وإرشادات تساعدك على اتخاذ قرارات ذكية.',
  },
  about_p3: {
    en: 'Whether you are curious about economic shifts, the digital economy, or emerging technologies, Qoinra is your guide to learning, exploring, and navigating the forces shaping the future of money and business.',
    ar: 'سواء كنت مهتمًا بالتغيرات الاقتصادية أو الاقتصاد الرقمي أو التكنولوجيا الناشئة، كوينرا هو دليلك لتعلّم واستكشاف وفهم القوى التي تشكل مستقبل المال والأعمال.',
  },
  about_p4: {
    en: 'We write for curious, motivated readers who want to understand the forces moving markets and technology — not just read about them. We aim to be specific, clear, and honest about uncertainty, and we always show our reasoning.',
    ar: 'نكتب للقراء الفضوليين والمتحمسين الذين يريدون فهم القوى المحركة للأسواق والتكنولوجيا — لا مجرد القراءة عنها. نسعى إلى الدقة والوضوح والصدق تجاه عدم اليقين، ونُظهر دائمًا منطق تفكيرنا.',
  },
  about_p5: {
    en: "We love hearing from readers — investors, founders, students, curious people. The best way to reach us is via Twitter or email. We read everything.",
    ar: 'يسعدنا سماع القراء — مستثمرين، مؤسسين، طلابًا، فضوليين. أفضل طريقة للتواصل معنا عبر تويتر أو البريد الإلكتروني. نقرأ كل شيء.',
  },

  // ── SEARCH ─────────────────────────────────────────────────
  search_title:       { en: 'Search',   ar: 'بحث' },
  search_indexed:     { en: 'articles indexed', ar: 'مقالة مفهرسة' },
  search_placeholder: { en: 'Search articles, topics, keywords…', ar: 'ابحث في المقالات والمواضيع والكلمات المفتاحية…' },
  search_hint:        { en: 'Type to search · ↑↓ navigate · Enter open · Esc clear', ar: 'اكتب للبحث · ↑↓ تنقل · Enter فتح · Esc مسح' },
  search_recent:      { en: 'Recent searches',  ar: 'عمليات البحث الأخيرة' },
  search_browse:      { en: 'Search the archive', ar: 'ابحث في الأرشيف' },
  search_browse_desc: {
    en: 'Markets, crypto, trading, tech, online income — start typing to find what you\'re looking for.',
    ar: 'أسواق، عملات رقمية، تداول، تكنولوجيا، دخل رقمي — ابدأ الكتابة للعثور على ما تبحث عنه.',
  },
  search_no_results:      { en: 'No results found', ar: 'لا توجد نتائج' },
  search_result_singular: { en: 'result',  ar: 'نتيجة' },
  search_result_plural:   { en: 'results', ar: 'نتائج' },
  search_clear:           { en: 'Clear search', ar: 'مسح البحث' },
  search_for:             { en: 'for',      ar: 'لـ' },
  reading_time:           { en: 'min read', ar: 'دقيقة قراءة' },
};

// Helper — get a translation by key and lang
export function t(lang: Lang, key: keyof typeof translations): string {
  return translations[key]?.[lang] ?? translations[key]?.['en'] ?? key;
}

// Get dir attribute for the lang
export function dir(lang: Lang): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}