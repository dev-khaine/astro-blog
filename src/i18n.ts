// ============================================================
// i18n.ts — Bilingual EN / AR translation strings
// Usage: import { t } from '../i18n'; then t('en', 'key')
// ============================================================

export type Lang = 'en' | 'ar';

export const translations = {
  // ── SITE META ──────────────────────────────────────────────
  site_title:       { en: 'Capital',   ar: 'كابيتال' },
  site_description: {
    en: 'Sharp analysis on markets, money, and the forces shaping the global economy.',
    ar: 'تحليل دقيق للأسواق والمال والقوى التي تشكّل الاقتصاد العالمي.',
  },

  // ── HEADER ─────────────────────────────────────────────────
  nav_home:         { en: 'Home',      ar: 'الرئيسية' },
  nav_analysis:     { en: 'Analysis',  ar: 'التحليلات' },
  nav_about:        { en: 'About',     ar: 'عن الموقع' },
  nav_search:       { en: 'Search',    ar: 'بحث' },
  nav_rss:          { en: 'RSS Feed',  ar: 'خلاصة RSS' },
  nav_navigate:     { en: 'Navigate',  ar: 'التنقل' },
  lang_toggle_ar:   { en: 'عربي',      ar: 'EN' },
  lang_toggle_label:{ en: 'Switch to Arabic',  ar: 'Switch to English' },
  open_menu:        { en: 'Open navigation menu', ar: 'فتح قائمة التنقل' },
  close_menu:       { en: 'Close navigation menu', ar: 'إغلاق قائمة التنقل' },
  toggle_theme:     { en: 'Toggle light/dark mode', ar: 'تبديل الوضع الفاتح/الداكن' },
  search_label:     { en: 'Search',    ar: 'بحث' },

  // ── FOOTER ─────────────────────────────────────────────────
  newsletter_label:  { en: 'The Capital Brief', ar: 'نشرة كابيتال' },
  newsletter_heading:{ en: 'Markets move fast.\nStay ahead.', ar: 'الأسواق تتحرك بسرعة.\nكن في الطليعة.' },
  newsletter_desc:   {
    en: 'Weekly analysis on markets, macro, and money — written for investors who think. No noise. No ads. Unsubscribe anytime.',
    ar: 'تحليل أسبوعي للأسواق والاقتصاد الكلي والمال — مكتوب للمستثمرين المفكرين. بلا ضجيج. بلا إعلانات. إلغاء الاشتراك في أي وقت.',
  },
  newsletter_email_placeholder: { en: 'your@email.com', ar: 'بريدك@الإلكتروني.com' },
  newsletter_email_label: { en: 'Email address', ar: 'البريد الإلكتروني' },
  newsletter_subscribe: { en: 'Subscribe', ar: 'اشترك' },
  newsletter_note:   {
    en: 'By subscribing you agree to our Privacy Policy.',
    ar: 'بالاشتراك فإنك توافق على سياسة الخصوصية.',
  },
  footer_explore:    { en: 'Explore',  ar: 'استكشف' },
  footer_topics:     { en: 'Topics',   ar: 'المواضيع' },
  footer_meta:       { en: 'Meta',     ar: 'روابط' },
  footer_markets:    { en: 'Markets',  ar: 'الأسواق' },
  footer_macro:      { en: 'Macro',    ar: 'الاقتصاد الكلي' },
  footer_investing:  { en: 'Investing',ar: 'الاستثمار' },
  footer_crypto:     { en: 'Crypto',   ar: 'العملات الرقمية' },
  footer_sitemap:    { en: 'Sitemap',  ar: 'خريطة الموقع' },
  footer_privacy:    { en: 'Privacy',  ar: 'الخصوصية' },
  footer_disclaimer: { en: 'Disclaimer', ar: 'إخلاء المسؤولية' },
  footer_built_with: { en: 'Built with', ar: 'مبني بـ' },
  footer_rights:     { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
  footer_disclaimer_text: {
    en: 'Capital is for informational and educational purposes only. Nothing on this site constitutes financial, investment, legal, or tax advice. Past performance is not indicative of future results. Always do your own research.',
    ar: 'كابيتال للأغراض الإعلامية والتعليمية فقط. لا يُعدّ أي شيء في هذا الموقع نصيحة مالية أو استثمارية أو قانونية أو ضريبية. الأداء السابق لا يدل على النتائج المستقبلية. قم دائمًا بإجراء بحثك الخاص.',
  },

  // ── HOMEPAGE ───────────────────────────────────────────────
  home_est:          { en: 'Est.',     ar: 'تأسّس' },
  home_latest:       { en: 'Latest Analysis', ar: 'أحدث التحليلات' },
  home_view_archive: { en: 'View archive',    ar: 'عرض الأرشيف' },
  home_read_all:     { en: 'Read all',        ar: 'قراءة جميع' },
  home_articles:     { en: 'articles',        ar: 'مقالة' },
  by_author:         { en: 'By',       ar: 'بقلم' },

  // ── BLOG ARCHIVE ───────────────────────────────────────────
  archive_title:     { en: 'Analysis', ar: 'التحليلات' },
  archive_articles:  { en: 'articles', ar: 'مقالة' },

  // ── BLOG POST ──────────────────────────────────────────────
  post_updated:      { en: 'Updated',  ar: 'تحديث' },
  post_end:          { en: 'End of analysis', ar: 'نهاية التحليل' },
  post_share:        { en: 'Share this analysis', ar: 'شارك هذا التحليل' },
  post_share_x:      { en: 'Post on X',  ar: 'نشر على X' },
  post_share_li:     { en: 'LinkedIn',   ar: 'لينكدإن' },
  post_share_copy:   { en: 'Copy link',  ar: 'نسخ الرابط' },
  post_share_copied: { en: '✓ Copied',   ar: '✓ تم النسخ' },
  post_back:         { en: 'All analysis', ar: 'جميع التحليلات' },
  post_discussion:   { en: 'Discussion', ar: 'النقاش' },
  post_comments_note:{
    en: 'Comments are powered by Giscus via GitHub Discussions.',
    ar: 'التعليقات مدعومة من Giscus عبر GitHub Discussions.',
  },
  post_comments_setup: {
    en: 'Comments enabled after Giscus setup',
    ar: 'ستُفعَّل التعليقات بعد إعداد Giscus',
  },
  post_author_bio:   {
    en: 'Financial analyst covering markets, macro, and the global economy. Views are my own.',
    ar: 'محلل مالي يغطي الأسواق والاقتصاد الكلي والاقتصاد العالمي. الآراء خاصة به.',
  },
  post_analyst:      { en: 'Analyst & Writer', ar: 'محلل وكاتب' },

  // ── ABOUT ──────────────────────────────────────────────────
  about_title:       { en: 'About',    ar: 'عن الموقع' },
  about_role:        { en: 'Analyst & Writer', ar: 'محلل وكاتب' },
  about_disclaimer_heading: { en: 'Disclaimer', ar: 'إخلاء المسؤولية' },
  about_disclaimer_text: {
    en: 'Nothing here is financial advice. All views are personal. Past performance ≠ future results.',
    ar: 'لا شيء هنا يُعدّ نصيحة مالية. جميع الآراء شخصية. الأداء السابق لا يعني نتائج مستقبلية.',
  },
  about_h_who:       { en: 'Who I Am', ar: 'من أنا' },
  about_h_cover:     { en: 'What I Cover', ar: 'ما أغطيه' },
  about_h_approach:  { en: 'My Approach', ar: 'نهجي' },
  about_h_contact:   { en: 'Get in Touch', ar: 'تواصل معي' },
  about_p1: {
    en: 'Financial analyst and writer covering markets, macro, and the global economy. I\'ve spent years studying financial markets, reading earnings transcripts at 6am, and arguing about central bank policy at dinner parties nobody wanted to attend.',
    ar: 'محلل مالي وكاتب يغطي الأسواق والاقتصاد الكلي والاقتصاد العالمي. أمضيت سنوات في دراسة الأسواق المالية، وقراءة محاضر الأرباح في الساعة السادسة صباحًا، والنقاش في سياسة البنك المركزي.',
  },
  about_p2: {
    en: 'Capital is my attempt to write clearly about complex things — to cut through the noise of financial media and offer analysis worth reading.',
    ar: 'كابيتال هو محاولتي للكتابة بوضوح عن الأمور المعقدة — اختراق ضجيج وسائل الإعلام المالية وتقديم تحليل يستحق القراءة.',
  },
  about_p3: {
    en: 'My focus is on macroeconomics, equity markets, monetary policy, and the structural forces shaping the global economy. I try to write long-form pieces that age well — analysis you can return to in six months and still find useful.',
    ar: 'يركز اهتمامي على الاقتصاد الكلي وأسواق الأسهم والسياسة النقدية والقوى الهيكلية التي تشكّل الاقتصاد العالمي. أحاول كتابة مقالات مطوّلة تصمد مع الوقت.',
  },
  about_p4: {
    en: 'I try to be specific rather than vague, right rather than fast, and honest about uncertainty rather than falsely confident. Financial writing is full of people who sound sure of everything. I prefer to show my work.',
    ar: 'أحاول أن أكون محددًا بدلًا من مبهم، ودقيقًا بدلًا من سريع، وصادقًا تجاه عدم اليقين بدلًا من الثقة الزائفة.',
  },
  about_p5: {
    en: 'I love hearing from readers — investors, founders, students, curious people. The best way to reach me is via Twitter or email. I read everything.',
    ar: 'يسعدني سماع القراء — مستثمرين، مؤسسين، طلابًا، فضوليين. أفضل طريقة للتواصل معي عبر تويتر أو البريد الإلكتروني. أقرأ كل شيء.',
  },

  // ── SEARCH ─────────────────────────────────────────────────
  search_title:      { en: 'Search',   ar: 'بحث' },
  search_indexed:    { en: 'articles indexed', ar: 'مقالة مفهرسة' },
  search_placeholder:{ en: 'Search articles, topics, keywords…', ar: 'ابحث في المقالات والمواضيع والكلمات المفتاحية…' },
  search_hint:       { en: "Type to search · ↑↓ navigate · Enter open · Esc clear", ar: "اكتب للبحث · ↑↓ تنقل · Enter فتح · Esc مسح" },
  search_recent:     { en: 'Recent searches', ar: 'عمليات البحث الأخيرة' },
  search_browse:     { en: 'Search the archive', ar: 'ابحث في الأرشيف' },
  search_browse_desc:{ en: 'Markets, macro, investing, crypto — start typing to find what you\'re looking for.', ar: 'أسواق، اقتصاد كلي، استثمار، عملات رقمية — ابدأ الكتابة للعثور على ما تبحث عنه.' },
  search_no_results: { en: 'No results found', ar: 'لا توجد نتائج' },
  search_result_singular: { en: 'result', ar: 'نتيجة' },
  search_result_plural:   { en: 'results', ar: 'نتائج' },
  search_clear:      { en: 'Clear search', ar: 'مسح البحث' },
  search_for:        { en: 'for', ar: 'لـ' },
  reading_time:      { en: 'min read', ar: 'دقيقة قراءة' },
};

// Helper — get a translation by key and lang
export function t(lang: Lang, key: keyof typeof translations): string {
  return translations[key]?.[lang] ?? translations[key]?.['en'] ?? key;
}

// Get dir attribute for the lang
export function dir(lang: Lang): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
