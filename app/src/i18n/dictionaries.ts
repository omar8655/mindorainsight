export type LocaleCode =
  | 'en'
  | 'fr'
  | 'es'
  | 'ja'
  | 'de'
  | 'ar'
  | 'nl'
  | 'pl'
  | 'th'
  | 'hi'

export type Locale = {
  code: LocaleCode
  label: string
  flag: string
  dir: 'ltr' | 'rtl'
}

export const locales: Locale[] = [
  { code: 'en', label: 'English', flag: 'us', dir: 'ltr' },
  { code: 'fr', label: 'Français', flag: 'fr', dir: 'ltr' },
  { code: 'es', label: 'Español', flag: 'es', dir: 'ltr' },
  { code: 'ja', label: '日本語', flag: 'jp', dir: 'ltr' },
  { code: 'de', label: 'Deutsch', flag: 'de', dir: 'ltr' },
  { code: 'ar', label: 'العربية', flag: 'sa', dir: 'rtl' },
  { code: 'nl', label: 'Nederlands', flag: 'nl', dir: 'ltr' },
  { code: 'pl', label: 'Polski', flag: 'pl', dir: 'ltr' },
  { code: 'th', label: 'ไทย', flag: 'th', dir: 'ltr' },
  { code: 'hi', label: 'हिन्दी', flag: 'in', dir: 'ltr' },
]

export function flagUrl(code: string, w = 40) {
  return `https://flagcdn.com/w${w}/${code}.png`
}

export type Dictionary = {
  nav: {
    home: string
    about: string
    library: string
    pricing: string
    login: string
    crm: string
    contacts: string
    changeLanguage: string
  }
  hero: {
    eyebrow: string
    title: string
    titleAccent: string
    subtitle: string
    priceLine: string
    freeNudge: string
    ctaPrimary: string
    ctaSecondary: string
    slideLabel: string
  }
  mosaic: {
    eyebrow: string
    title: string
    subtitle: string
  }
  steps: {
    title: string
    oneTitle: string
    oneText: string
    twoTitle: string
    twoText: string
    threeTitle: string
    threeText: string
    cta: string
  }
  growth: {
    title: string
    oneTitle: string
    oneText: string
    twoTitle: string
    twoText: string
    threeTitle: string
    threeText: string
  }
  faq: {
    title: string
    cta: string
  }
  reviews: {
    title: string
    subtitle: string
    countLabel: string
    loadMore: string
    prevSlide: string
    nextSlide: string
    slideLabel: string
    loading: string
    error: string
    sampleBadge: string
  }
  library: {
    title: string
    subtitle: string
    showing: string
    clear: string
    empty: string
    showAll: string
    eyebrow: string
    journeyTitle: string
    journeyOne: string
    journeyOneText: string
    journeyTwo: string
    journeyTwoText: string
    journeyThree: string
    journeyThreeText: string
    themesTitle: string
    themesHint: string
    allThemes: string
    catalogTitle: string
    startCta: string
    enticeTitle: string
    enticeText: string
    enticeCta: string
    notFound: string
    backToLibrary: string
  }
  about: {
    title: string
    subtitle: string
    missionTitle: string
    missionOne: string
    missionTwo: string
    researchTitle: string
    researchOne: string
    researchDisclaimer: string
    logosLabel: string
    logosFinePrint: string
    principlesTitle: string
    p1Title: string
    p1Text: string
    p2Title: string
    p2Text: string
    p3Title: string
    p3Text: string
    cta: string
  }
  portal: {
    title: string
    subtitle: string
    completed: string
    inProgress: string
    empty: string
    continueLibrary: string
    signInPrompt: string
    loading: string
  }
  categories: {
    memory: string
    personality: string
    mindset: string
    wellbeing: string
    career: string
    neuro: string
    eq: string
    decisions: string
    energy: string
    growth: string
  }
  levels: {
    beginner: string
    intermediate: string
    advanced: string
  }
  footer: {
    cancel: string
    subscription: string
    faq: string
    privacy: string
    terms: string
    freeTests: string
    rights: string
    readMore: string
    showLess: string
    blurb: string
    colProduct: string
    colCompany: string
    colLegal: string
  }
  common: {
    tryNow: string
    explore: string
    questions: string
    minutes: string
    selected: string
    startAssessment: string
    yourReport: string
    resultsSuffix: string
    moreAssessments: string
    viewPlans: string
    primaryPattern: string
  }
}

const en: Dictionary = {
  nav: {
    home: 'Home',
    about: 'About',
    library: 'Library',
    pricing: 'Pricing',
    login: 'Login',
    crm: 'CRM',
    contacts: 'Contacts',
    changeLanguage: 'Change language',
  },
  hero: {
    eyebrow: 'Adult ADHD Test',
    title: 'Start free.',
    titleAccent: 'Know your focus patterns today.',
    subtitle:
      'Tap the free Adult ADHD Test first — calm, private, educational (not a diagnosis). Then explore paid paths when you are ready.',
    priceLine: 'Was $49.00 — now Free · $0 · No PIN · No card',
    freeNudge: 'New here? Grab the free ADHD test (normally $49) — start in under a minute.',
    ctaPrimary: 'Start free ADHD test · was $49',
    ctaSecondary: 'Browse all courses',
    slideLabel: 'Start here · Free first',
  },
  mosaic: {
    eyebrow: 'Work paths',
    title: 'Choose the skill curve you want to climb next.',
    subtitle:
      'Focus, personality at work, collaboration, decisions, and career fit — organized as practical paths, not entertainment quizzes.',
  },
  steps: {
    title: 'Three quiet steps. One sharper week.',
    oneTitle: 'Pick a work focus',
    oneText: 'Choose an assessment tied to a real goal — focus, teamwork, decisions, or fit.',
    twoTitle: 'Answer in your own words',
    twoText: 'Short prompts about how you show up on live projects, not abstract personality labels.',
    threeTitle: 'Read a usable report',
    threeText: 'Clear patterns plus a practical next action you can try in the next few days.',
    cta: 'Browse assessments',
  },
  growth: {
    title: 'Built for people who take craft seriously',
    oneTitle: 'See operating patterns',
    oneText: 'Name how you focus, decide, and recover — so week planning stops guessing.',
    twoTitle: 'Work better with others',
    twoText: 'Understand collaboration friction before it becomes a meeting problem.',
    threeTitle: 'Aim your career effort',
    threeText: 'Match traits to environments where your energy compounds instead of leaking.',
  },
  faq: {
    title: 'Frequently asked questions',
    cta: 'Browse the library',
  },
  reviews: {
    title: 'Latest reviews',
    subtitle:
      'A mix of platform feedback, therapist referrals, confidence wins, and clear $49 course notes from people worldwide.',
    countLabel: 'reviews',
    loadMore: 'Show more reviews',
    prevSlide: 'Previous reviews',
    nextSlide: 'Next reviews',
    slideLabel: 'Slide',
    loading: 'Loading reviews…',
    error: 'Could not load reviews. Please try again.',
    sampleBadge: 'Illustrative',
  },
  library: {
    title: 'Your assessment journey',
    subtitle:
      'Pick a theme, choose one focused assessment, and leave with a clearer next move for work and growth.',
    showing: 'Showing',
    clear: 'Clear theme',
    empty: 'No assessments in this theme yet.',
    showAll: 'Show all assessments',
    eyebrow: 'MindoraInsight library',
    journeyTitle: 'How customers move through MindoraInsight',
    journeyOne: 'Choose a theme',
    journeyOneText: 'Start with the pattern you want to understand — focus, teams, career, or energy.',
    journeyTwo: 'Take one assessment',
    journeyTwoText: 'Answer calmly in about 6–16 minutes. No clinical claims — just practical clarity.',
    journeyThree: 'Act on the report',
    journeyThreeText: 'Use strengths, friction points, and a concrete next step in your real week.',
    themesTitle: 'Themes',
    themesHint: 'Filter the catalog by the journey stage that matters most right now.',
    allThemes: 'All themes',
    catalogTitle: 'Assessments',
    startCta: 'Begin this path',
    enticeTitle: 'Ready for the full curve?',
    enticeText: 'Unlock the complete library, save progress, and revisit reports as your role evolves.',
    enticeCta: 'See plans',
    notFound: 'Assessment not found',
    backToLibrary: 'Back to library',
  },
  about: {
    title: 'About MindoraInsight',
    subtitle:
      'Practical tools and clear reports for people navigating work, growth, and self-understanding with confidence.',
    missionTitle: 'Our mission: clearer work self-knowledge',
    missionOne:
      'The most useful career advantage is understanding how you focus, collaborate, recover, and decide under pressure. MindoraInsight exists to make that self-knowledge practical — not theatrical.',
    missionTwo:
      'We build a calm library of assessments for operators, managers, and ambitious ICs who want reports they can act on the same week.',
    researchTitle: 'Informed by serious assessment science',
    researchOne:
      'Our product design is informed by peer-reviewed research traditions and teaching commonly associated with leading universities across the UK and United States — including institutions such as Harvard, Oxford, Cambridge, and UCL. We study published methods and evidence; we do not claim institutional partnership, funding, endorsement, or affiliation.',
    researchDisclaimer:
      'MindoraInsight is an independent educational product. Mentions of universities describe the broader research landscape that inspires our craft — not a formal relationship with those institutions.',
    logosLabel: 'Research landscape references',
    logosFinePrint:
      'Marks shown for orientation only. MindoraInsight is not affiliated with, endorsed by, partnered with, funded by, or officially connected to Harvard University, the University of Oxford, the University of Cambridge, MIT, or any other university. No institutional trademark use is intended to imply sponsorship or approval.',
    principlesTitle: 'Our guiding principles',
    p1Title: 'Clarity over complexity',
    p1Text: 'Assessments should be readable and useful without jargon theatre.',
    p2Title: 'Privacy by default',
    p2Text: 'Your results belong to you. We design for least privilege and careful data handling.',
    p3Title: 'Growth through honest feedback',
    p3Text: 'Reports highlight strengths and friction points so you can choose a concrete next move.',
    cta: 'Explore assessments',
  },
  portal: {
    title: 'Your learning curve',
    subtitle: 'Track completed assessments and pick up where you left off.',
    completed: 'Completed',
    inProgress: 'In progress',
    empty: 'No assessments completed yet. Start one from the library.',
    continueLibrary: 'Browse library',
    signInPrompt: 'Sign in to see your completed assessments.',
    loading: 'Loading your progress…',
  },
  categories: {
    memory: 'Memory & focus',
    personality: 'Personality',
    mindset: 'Mindset',
    wellbeing: 'Wellbeing',
    career: 'Career',
    neuro: 'Neurodiversity',
    eq: 'EQ & teams',
    decisions: 'Decisions',
    energy: 'Energy',
    growth: 'Growth',
  },
  levels: {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  },
  footer: {
    cancel: 'Cancel plan',
    subscription: 'Billing policy',
    faq: 'FAQ',
    privacy: 'Privacy',
    terms: 'Terms',
    freeTests: 'Assessment library',
    rights: '© 2026 MindoraInsight. All rights reserved.',
    readMore: 'Read more',
    showLess: 'Show less',
    blurb: 'A calm studio for work self-knowledge — practical assessments, clear reports, and a learning curve you can act on.',
    colProduct: 'Product',
    colCompany: 'Company',
    colLegal: 'Legal',
  },
  common: {
    tryNow: 'Begin',
    explore: 'Browse all paths',
    questions: 'questions',
    minutes: 'mins',
    selected: 'Selected',
    startAssessment: 'Start assessment',
    yourReport: 'Your report',
    resultsSuffix: 'results',
    moreAssessments: 'More assessments',
    viewPlans: 'View plans',
    primaryPattern: 'Primary pattern',
  },
}

/** Lightweight translations — English fallback for missing keys via merge */
const fr: Dictionary = {
  ...en,
  nav: {
    ...en.nav,
    home: 'Accueil',
    about: 'À propos',
    library: 'Bibliothèque',
    pricing: 'Tarifs',
    login: 'Connexion',
    contacts: 'Contacts',
    changeLanguage: 'Changer de langue',
  },
  hero: {
    ...en.hero,
  },
  mosaic: { ...en.mosaic },
  faq: { title: 'Questions fréquentes', cta: 'Parcourir la bibliothèque' },
  library: {
    ...en.library,
    title: 'Votre parcours d’évaluation',
    subtitle:
      'Choisissez un thème, passez une évaluation ciblée, et repartez avec une prochaine étape plus claire.',
    showing: 'Affichage',
    clear: 'Effacer le thème',
    empty: 'Aucune évaluation dans ce thème pour l’instant.',
    showAll: 'Voir toutes les évaluations',
    eyebrow: 'Bibliothèque MindoraInsight',
    journeyTitle: 'Comment les clients avancent avec MindoraInsight',
    journeyOne: 'Choisissez un thème',
    journeyOneText: 'Commencez par le schéma que vous voulez comprendre — focus, équipes, carrière ou énergie.',
    journeyTwo: 'Passez une évaluation',
    journeyTwoText: 'Répondez calmement en 6–16 minutes. Pas de claims cliniques — juste de la clarté utile.',
    journeyThree: 'Agissez grâce au rapport',
    journeyThreeText: 'Utilisez forces, points de friction et une prochaine étape concrète dans votre semaine.',
    themesTitle: 'Thèmes',
    themesHint: 'Filtrez le catalogue selon l’étape du parcours qui compte maintenant.',
    allThemes: 'Tous les thèmes',
    catalogTitle: 'Évaluations',
    startCta: 'Commencer ce parcours',
    enticeTitle: 'Prêt pour la courbe complète ?',
    enticeText: 'Débloquez toute la bibliothèque, sauvegardez vos progrès et revisitez vos rapports.',
    enticeCta: 'Voir les offres',
    notFound: 'Évaluation introuvable',
    backToLibrary: 'Retour à la bibliothèque',
  },
  categories: {
    memory: 'Mémoire & focus',
    personality: 'Personnalité',
    mindset: 'Mindset',
    wellbeing: 'Bien-être',
    career: 'Carrière',
    neuro: 'Neurodiversité',
    eq: 'QE & équipes',
    decisions: 'Décisions',
    energy: 'Énergie',
    growth: 'Croissance',
  },
  levels: {
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé',
  },
  common: {
    ...en.common,
    tryNow: 'Essayer',
    explore: 'Explorer',
    questions: 'questions',
    minutes: 'min',
    selected: 'Sélection',
    startAssessment: 'Commencer l’évaluation',
    yourReport: 'Votre rapport',
    resultsSuffix: 'résultats',
    moreAssessments: 'Plus d’évaluations',
    viewPlans: 'Voir les offres',
    primaryPattern: 'Schéma principal',
  },
}

const es: Dictionary = {
  ...en,
  nav: {
    ...en.nav,
    home: 'Inicio',
    about: 'Nosotros',
    library: 'Biblioteca',
    pricing: 'Precios',
    login: 'Entrar',
    contacts: 'Contacto',
    changeLanguage: 'Cambiar idioma',
  },
  hero: {
    ...en.hero,
  },
  mosaic: { ...en.mosaic },
  faq: { title: 'Preguntas frecuentes', cta: 'Ir a la biblioteca' },
  library: {
    ...en.library,
    title: 'Tu viaje de evaluación',
    subtitle:
      'Elige un tema, completa una evaluación enfocada y sal con un siguiente paso más claro.',
    showing: 'Mostrando',
    clear: 'Quitar tema',
    empty: 'Aún no hay evaluaciones en este tema.',
    showAll: 'Ver todas las evaluaciones',
    eyebrow: 'Biblioteca MindoraInsight',
    journeyTitle: 'Cómo avanzan los clientes con MindoraInsight',
    journeyOne: 'Elige un tema',
    journeyOneText: 'Empieza por el patrón que quieres entender: foco, equipos, carrera o energía.',
    journeyTwo: 'Haz una evaluación',
    journeyTwoText: 'Responde con calma en 6–16 minutos. Sin claims clínicos: solo claridad práctica.',
    journeyThree: 'Actúa con el informe',
    journeyThreeText: 'Usa fortalezas, fricciones y un siguiente paso concreto en tu semana real.',
    themesTitle: 'Temas',
    themesHint: 'Filtra el catálogo por la etapa del viaje que más importa ahora.',
    allThemes: 'Todos los temas',
    catalogTitle: 'Evaluaciones',
    startCta: 'Empezar este camino',
    enticeTitle: '¿Listo para la curva completa?',
    enticeText: 'Desbloquea toda la biblioteca, guarda progreso y revisita informes.',
    enticeCta: 'Ver planes',
    notFound: 'Evaluación no encontrada',
    backToLibrary: 'Volver a la biblioteca',
  },
  categories: {
    memory: 'Memoria y foco',
    personality: 'Personalidad',
    mindset: 'Mentalidad',
    wellbeing: 'Bienestar',
    career: 'Carrera',
    neuro: 'Neurodiversidad',
    eq: 'IE y equipos',
    decisions: 'Decisiones',
    energy: 'Energía',
    growth: 'Crecimiento',
  },
  levels: {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
  },
  common: {
    ...en.common,
    tryNow: 'Probar',
    explore: 'Explorar',
    questions: 'preguntas',
    minutes: 'min',
    selected: 'Seleccionado',
    startAssessment: 'Empezar evaluación',
    yourReport: 'Tu informe',
    resultsSuffix: 'resultados',
    moreAssessments: 'Más evaluaciones',
    viewPlans: 'Ver planes',
    primaryPattern: 'Patrón principal',
  },
}

const de: Dictionary = {
  ...en,
  nav: {
    ...en.nav,
    home: 'Start',
    about: 'Über uns',
    library: 'Bibliothek',
    pricing: 'Preise',
    login: 'Anmelden',
    contacts: 'Kontakt',
    changeLanguage: 'Sprache ändern',
  },
  hero: {
    ...en.hero,
  },
  mosaic: { ...en.mosaic },
  faq: { title: 'Häufige Fragen', cta: 'Zur Bibliothek' },
  library: {
    ...en.library,
    title: 'Deine Assessment-Reise',
    subtitle:
      'Wähle ein Thema, absolviere ein fokussiertes Assessment und gehe mit einem klareren nächsten Schritt.',
    showing: 'Anzeige',
    clear: 'Thema löschen',
    empty: 'Noch keine Assessments in diesem Thema.',
    showAll: 'Alle Assessments zeigen',
    eyebrow: 'MindoraInsight Bibliothek',
    journeyTitle: 'So bewegen sich Kunden durch MindoraInsight',
    journeyOne: 'Thema wählen',
    journeyOneText: 'Starte mit dem Muster, das du verstehen willst — Fokus, Teams, Karriere oder Energie.',
    journeyTwo: 'Ein Assessment machen',
    journeyTwoText: 'Antworte ruhig in 6–16 Minuten. Keine klinischen Claims — nur praktische Klarheit.',
    journeyThree: 'Mit dem Report handeln',
    journeyThreeText: 'Nutze Stärken, Reibungspunkte und einen konkreten nächsten Schritt in deiner Woche.',
    themesTitle: 'Themen',
    themesHint: 'Filtere den Katalog nach der Reisestufe, die jetzt zählt.',
    allThemes: 'Alle Themen',
    catalogTitle: 'Assessments',
    startCta: 'Diesen Pfad starten',
    enticeTitle: 'Bereit für die volle Kurve?',
    enticeText: 'Schalte die gesamte Bibliothek frei, speichere Fortschritt und öffne Reports erneut.',
    enticeCta: 'Pläne ansehen',
    notFound: 'Assessment nicht gefunden',
    backToLibrary: 'Zurück zur Bibliothek',
  },
  categories: {
    memory: 'Gedächtnis & Fokus',
    personality: 'Persönlichkeit',
    mindset: 'Mindset',
    wellbeing: 'Wohlbefinden',
    career: 'Karriere',
    neuro: 'Neurodiversität',
    eq: 'EQ & Teams',
    decisions: 'Entscheidungen',
    energy: 'Energie',
    growth: 'Wachstum',
  },
  levels: {
    beginner: 'Einsteiger',
    intermediate: 'Mittelstufe',
    advanced: 'Fortgeschritten',
  },
  common: {
    ...en.common,
    tryNow: 'Jetzt starten',
    explore: 'Entdecken',
    questions: 'Fragen',
    minutes: 'Min.',
    selected: 'Ausgewählt',
    startAssessment: 'Assessment starten',
    yourReport: 'Dein Report',
    resultsSuffix: 'Ergebnisse',
    moreAssessments: 'Weitere Assessments',
    viewPlans: 'Pläne ansehen',
    primaryPattern: 'Hauptmuster',
  },
}

const ja: Dictionary = {
  ...en,
  nav: {
    ...en.nav,
    home: 'ホーム',
    about: '私たちについて',
    library: 'ライブラリ',
    pricing: '料金',
    login: 'ログイン',
    contacts: 'お問い合わせ',
    changeLanguage: '言語を変更',
  },
  hero: {
    ...en.hero,
  },
  mosaic: { ...en.mosaic },
  faq: { title: 'よくある質問', cta: 'ライブラリへ' },
  library: {
    ...en.library,
    title: 'アセスメントのジャーニー',
    subtitle: 'テーマを選び、集中して受け、仕事と成長のための次の一手をより明確に。',
    showing: '表示中',
    clear: 'テーマをクリア',
    empty: 'このテーマのアセスメントはまだありません。',
    showAll: 'すべて表示',
    eyebrow: 'MindoraInsightライブラリ',
    journeyTitle: 'お客様がMindoraInsightを進む流れ',
    journeyOne: 'テーマを選ぶ',
    journeyOneText: '理解したいパターンから始めましょう — 集中、チーム、キャリア、エネルギー。',
    journeyTwo: 'アセスメントを受ける',
    journeyTwoText: '6〜16分で落ち着いて回答。臨床主張はなく、実務的な明晰さだけ。',
    journeyThree: 'レポートで行動する',
    journeyThreeText: '強み・摩擦点・具体的な次の一歩を、実際の一週間で使います。',
    themesTitle: 'テーマ',
    themesHint: '今いちばん大切なジャーニー段階でカタログを絞り込みます。',
    allThemes: 'すべてのテーマ',
    catalogTitle: 'アセスメント',
    startCta: 'この道を始める',
    enticeTitle: 'フルカーブの準備はできましたか？',
    enticeText: 'ライブラリ全体を開き、進捗を保存し、レポートを何度でも見返せます。',
    enticeCta: 'プランを見る',
    notFound: 'アセスメントが見つかりません',
    backToLibrary: 'ライブラリに戻る',
  },
  categories: {
    memory: '記憶と集中',
    personality: 'パーソナリティ',
    mindset: 'マインドセット',
    wellbeing: 'ウェルビーイング',
    career: 'キャリア',
    neuro: 'ニューロダイバーシティ',
    eq: 'EQとチーム',
    decisions: '意思決定',
    energy: 'エネルギー',
    growth: '成長',
  },
  levels: {
    beginner: '初級',
    intermediate: '中級',
    advanced: '上級',
  },
  common: {
    ...en.common,
    tryNow: '試す',
    explore: '探す',
    questions: '問',
    minutes: '分',
    selected: '選択中',
    startAssessment: 'アセスメント開始',
    yourReport: 'あなたのレポート',
    resultsSuffix: '結果',
    moreAssessments: 'ほかのアセスメント',
    viewPlans: 'プランを見る',
    primaryPattern: '主なパターン',
  },
}

const ar: Dictionary = {
  ...en,
  nav: {
    ...en.nav,
    home: 'الرئيسية',
    about: 'من نحن',
    library: 'المكتبة',
    pricing: 'الأسعار',
    login: 'تسجيل الدخول',
    contacts: 'تواصل',
    changeLanguage: 'تغيير اللغة',
  },
  hero: {
    ...en.hero,
  },
  mosaic: { ...en.mosaic },
  faq: { title: 'الأسئلة الشائعة', cta: 'المكتبة' },
  library: {
    ...en.library,
    title: 'رحلتك في التقييم',
    subtitle: 'اختر موضوعًا، أكمل تقييمًا مركّزًا، واخرج بخطوة تالية أوضح للعمل والنمو.',
    showing: 'المعروض',
    clear: 'مسح الموضوع',
    empty: 'لا توجد تقييمات في هذا الموضوع بعد.',
    showAll: 'عرض كل التقييمات',
    eyebrow: 'مكتبة MindoraInsight',
    journeyTitle: 'كيف يتحرك العملاء عبر MindoraInsight',
    journeyOne: 'اختر موضوعًا',
    journeyOneText: 'ابدأ بالنمط الذي تريد فهمه — التركيز أو الفرق أو المسار أو الطاقة.',
    journeyTwo: 'خُذ تقييمًا واحدًا',
    journeyTwoText: 'أجب بهدوء خلال 6–16 دقيقة. بلا ادّعاءات طبية — وضوح عملي فقط.',
    journeyThree: 'اعمل بالتقرير',
    journeyThreeText: 'استخدم نقاط القوة والاحتكاك وخطوة تالية ملموسة في أسبوعك الحقيقي.',
    themesTitle: 'المواضيع',
    themesHint: 'صفِّ الكتالوج حسب مرحلة الرحلة الأهم الآن.',
    allThemes: 'كل المواضيع',
    catalogTitle: 'التقييمات',
    startCta: 'ابدأ هذا المسار',
    enticeTitle: 'هل أنت مستعد للمنحنى الكامل؟',
    enticeText: 'افتح المكتبة كاملة، واحفظ تقدّمك، وراجع التقارير مع تطور دورك.',
    enticeCta: 'عرض الخطط',
    notFound: 'التقييم غير موجود',
    backToLibrary: 'العودة إلى المكتبة',
  },
  categories: {
    memory: 'الذاكرة والتركيز',
    personality: 'الشخصية',
    mindset: 'العقلية',
    wellbeing: 'العافية',
    career: 'المسار المهني',
    neuro: 'التنوع العصبي',
    eq: 'الذكاء العاطفي والفرق',
    decisions: 'القرارات',
    energy: 'الطاقة',
    growth: 'النمو',
  },
  levels: {
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم',
  },
  common: {
    ...en.common,
    tryNow: 'جرّب الآن',
    explore: 'استكشف',
    questions: 'أسئلة',
    minutes: 'دقيقة',
    selected: 'المحدد',
    startAssessment: 'ابدأ التقييم',
    yourReport: 'تقريرك',
    resultsSuffix: 'النتائج',
    moreAssessments: 'المزيد من التقييمات',
    viewPlans: 'عرض الخطط',
    primaryPattern: 'النمط الأساسي',
  },
}

const nl: Dictionary = {
  ...en,
  nav: {
    ...en.nav,
    home: 'Home',
    about: 'Over ons',
    library: 'Bibliotheek',
    pricing: 'Prijzen',
    login: 'Inloggen',
    contacts: 'Contact',
    changeLanguage: 'Taal wijzigen',
  },
  hero: {
    ...en.hero,
  },
  mosaic: { ...en.mosaic },
  faq: { title: 'Veelgestelde vragen', cta: 'Naar de bibliotheek' },
  library: {
    ...en.library,
    title: 'Jouw assessment-reis',
    subtitle:
      'Kies een thema, doe één gerichte assessment en ga weg met een duidelijkere volgende stap.',
    showing: 'Weergave',
    clear: 'Thema wissen',
    empty: 'Nog geen assessments in dit thema.',
    showAll: 'Alle assessments tonen',
    eyebrow: 'MindoraInsight-bibliotheek',
    journeyTitle: 'Hoe klanten door MindoraInsight bewegen',
    journeyOne: 'Kies een thema',
    journeyOneText: 'Begin bij het patroon dat je wilt begrijpen — focus, teams, carrière of energie.',
    journeyTwo: 'Doe één assessment',
    journeyTwoText: 'Antwoord rustig in 6–16 minuten. Geen klinische claims — alleen praktische helderheid.',
    journeyThree: 'Handel met het rapport',
    journeyThreeText: 'Gebruik sterktes, frictiepunten en een concrete volgende stap in je echte week.',
    themesTitle: 'Thema’s',
    themesHint: 'Filter de catalogus op de reisstap die nu het meest telt.',
    allThemes: 'Alle thema’s',
    catalogTitle: 'Assessments',
    startCta: 'Start dit pad',
    enticeTitle: 'Klaar voor de volledige curve?',
    enticeText: 'Ontgrendel de hele bibliotheek, bewaar voortgang en herbekijk rapporten.',
    enticeCta: 'Bekijk plannen',
    notFound: 'Assessment niet gevonden',
    backToLibrary: 'Terug naar bibliotheek',
  },
  categories: {
    memory: 'Geheugen & focus',
    personality: 'Persoonlijkheid',
    mindset: 'Mindset',
    wellbeing: 'Welzijn',
    career: 'Carrière',
    neuro: 'Neurodiversiteit',
    eq: 'EQ & teams',
    decisions: 'Beslissingen',
    energy: 'Energie',
    growth: 'Groei',
  },
  levels: {
    beginner: 'Beginner',
    intermediate: 'Gevorderd',
    advanced: 'Expert',
  },
  common: {
    ...en.common,
    tryNow: 'Probeer nu',
    explore: 'Ontdekken',
    questions: 'vragen',
    minutes: 'min',
    selected: 'Geselecteerd',
    startAssessment: 'Start assessment',
    yourReport: 'Jouw rapport',
    resultsSuffix: 'resultaten',
    moreAssessments: 'Meer assessments',
    viewPlans: 'Bekijk plannen',
    primaryPattern: 'Primair patroon',
  },
}

const pl: Dictionary = {
  ...en,
  nav: {
    ...en.nav,
    home: 'Start',
    about: 'O nas',
    library: 'Biblioteka',
    pricing: 'Cennik',
    login: 'Logowanie',
    contacts: 'Kontakt',
    changeLanguage: 'Zmień język',
  },
  hero: {
    ...en.hero,
  },
  mosaic: { ...en.mosaic },
  faq: { title: 'Częste pytania', cta: 'Do biblioteki' },
  library: {
    ...en.library,
    title: 'Twoja podróż oceny',
    subtitle:
      'Wybierz motyw, przejdź jedno skupione badanie i wyjdź z jaśniejszym kolejnym krokiem.',
    showing: 'Pokazuję',
    clear: 'Wyczyść motyw',
    empty: 'Brak ocen w tym motywie.',
    showAll: 'Pokaż wszystkie oceny',
    eyebrow: 'Biblioteka MindoraInsight',
    journeyTitle: 'Jak klienci przechodzą przez MindoraInsight',
    journeyOne: 'Wybierz motyw',
    journeyOneText: 'Zacznij od wzorca, który chcesz zrozumieć — fokus, zespoły, kariera lub energia.',
    journeyTwo: 'Zrób jedną ocenę',
    journeyTwoText: 'Odpowiadaj spokojnie przez 6–16 minut. Bez klinicznych obietnic — praktyczna jasność.',
    journeyThree: 'Działaj z raportem',
    journeyThreeText: 'Użyj mocnych stron, tarć i konkretnego kolejnego kroku w swoim tygodniu.',
    themesTitle: 'Motywy',
    themesHint: 'Filtruj katalog według etapu podróży, który teraz najbardziej się liczy.',
    allThemes: 'Wszystkie motywy',
    catalogTitle: 'Oceny',
    startCta: 'Zacznij tę ścieżkę',
    enticeTitle: 'Gotowy na pełną krzywą?',
    enticeText: 'Odblokuj całą bibliotekę, zapisuj postęp i wracaj do raportów.',
    enticeCta: 'Zobacz plany',
    notFound: 'Nie znaleziono oceny',
    backToLibrary: 'Wróć do biblioteki',
  },
  categories: {
    memory: 'Pamięć i fokus',
    personality: 'Osobowość',
    mindset: 'Mindset',
    wellbeing: 'Dobrostan',
    career: 'Kariera',
    neuro: 'Neuroróżnorodność',
    eq: 'EQ i zespoły',
    decisions: 'Decyzje',
    energy: 'Energia',
    growth: 'Rozwój',
  },
  levels: {
    beginner: 'Początkujący',
    intermediate: 'Średni',
    advanced: 'Zaawansowany',
  },
  common: {
    ...en.common,
    tryNow: 'Wypróbuj',
    explore: 'Odkrywaj',
    questions: 'pytań',
    minutes: 'min',
    selected: 'Wybrano',
    startAssessment: 'Rozpocznij ocenę',
    yourReport: 'Twój raport',
    resultsSuffix: 'wyniki',
    moreAssessments: 'Więcej ocen',
    viewPlans: 'Zobacz plany',
    primaryPattern: 'Główny wzorzec',
  },
}

const th: Dictionary = {
  ...en,
  nav: {
    ...en.nav,
    home: 'หน้าแรก',
    about: 'เกี่ยวกับเรา',
    library: 'คลังแบบทดสอบ',
    pricing: 'ราคา',
    login: 'เข้าสู่ระบบ',
    contacts: 'ติดต่อ',
    changeLanguage: 'เปลี่ยนภาษา',
  },
  hero: {
    ...en.hero,
  },
  mosaic: { ...en.mosaic },
  faq: { title: 'คำถามที่พบบ่อย', cta: 'ไปที่คลัง' },
  library: {
    ...en.library,
    title: 'การเดินทางของแบบประเมิน',
    subtitle: 'เลือกธีม ทำแบบประเมินที่โฟกัส และออกมาด้วยก้าวถัดไปที่ชัดขึ้น',
    showing: 'กำลังแสดง',
    clear: 'ล้างธีม',
    empty: 'ยังไม่มีแบบประเมินในธีมนี้',
    showAll: 'แสดงทั้งหมด',
    eyebrow: 'คลัง MindoraInsight',
    journeyTitle: 'ลูกค้าเดินทางกับ MindoraInsight อย่างไร',
    journeyOne: 'เลือกธีม',
    journeyOneText: 'เริ่มจากรูปแบบที่อยากเข้าใจ — โฟกัส ทีม อาชีพ หรือพลังงาน',
    journeyTwo: 'ทำแบบประเมินหนึ่งชุด',
    journeyTwoText: 'ตอบอย่างใจเย็นใน 6–16 นาที ไม่มีข้ออ้างเชิงคลินิก — มีความชัดเจนเชิงปฏิบัติ',
    journeyThree: 'ลงมือจากรายงาน',
    journeyThreeText: 'ใช้จุดแข็ง จุดเสียดทาน และก้าวถัดไปที่จับต้องได้ในสัปดาห์จริงของคุณ',
    themesTitle: 'ธีม',
    themesHint: 'กรองแคตตาล็อกตามขั้นของการเดินทางที่สำคัญตอนนี้',
    allThemes: 'ทุกธีม',
    catalogTitle: 'แบบประเมิน',
    startCta: 'เริ่มเส้นทางนี้',
    enticeTitle: 'พร้อมสำหรับเส้นโค้งเต็มแล้วหรือยัง?',
    enticeText: 'ปลดล็อกคลังทั้งหมด บันทึกความคืบหน้า และเปิดรายงานซ้ำได้',
    enticeCta: 'ดูแพ็กเกจ',
    notFound: 'ไม่พบแบบประเมิน',
    backToLibrary: 'กลับไปที่คลัง',
  },
  categories: {
    memory: 'ความจำและโฟกัส',
    personality: 'บุคลิกภาพ',
    mindset: 'กรอบคิด',
    wellbeing: 'สุขภาวะ',
    career: 'อาชีพ',
    neuro: 'ความหลากหลายทางประสาท',
    eq: 'EQ และทีม',
    decisions: 'การตัดสินใจ',
    energy: 'พลังงาน',
    growth: 'การเติบโต',
  },
  levels: {
    beginner: 'เริ่มต้น',
    intermediate: 'กลาง',
    advanced: 'ขั้นสูง',
  },
  common: {
    ...en.common,
    tryNow: 'ลองเลย',
    explore: 'สำรวจ',
    questions: 'ข้อ',
    minutes: 'นาที',
    selected: 'ที่เลือก',
    startAssessment: 'เริ่มแบบประเมิน',
    yourReport: 'รายงานของคุณ',
    resultsSuffix: 'ผลลัพธ์',
    moreAssessments: 'แบบประเมินเพิ่มเติม',
    viewPlans: 'ดูแพ็กเกจ',
    primaryPattern: 'รูปแบบหลัก',
  },
}

const hi: Dictionary = {
  ...en,
  nav: {
    ...en.nav,
    home: 'होम',
    about: 'हमारे बारे में',
    library: 'लाइब्रेरी',
    pricing: 'मूल्य',
    login: 'लॉगिन',
    contacts: 'संपर्क',
    changeLanguage: 'भाषा बदलें',
  },
  hero: {
    ...en.hero,
  },
  mosaic: { ...en.mosaic },
  faq: { title: 'अक्सर पूछे जाने वाले प्रश्न', cta: 'लाइब्रेरी पर जाएँ' },
  library: {
    ...en.library,
    title: 'आपकी आकलन यात्रा',
    subtitle: 'एक थीम चुनें, एक केंद्रित आकलन करें, और स्पष्ट अगले कदम के साथ आगे बढ़ें।',
    showing: 'दिखा रहा है',
    clear: 'थीम हटाएँ',
    empty: 'इस थीम में अभी कोई आकलन नहीं।',
    showAll: 'सभी आकलन दिखाएँ',
    eyebrow: 'MindoraInsight लाइब्रेरी',
    journeyTitle: 'ग्राहक MindoraInsight में कैसे आगे बढ़ते हैं',
    journeyOne: 'थीम चुनें',
    journeyOneText: 'उस पैटर्न से शुरू करें जिसे समझना है — फोकस, टीमें, करियर या ऊर्जा।',
    journeyTwo: 'एक आकलन लें',
    journeyTwoText: '6–16 मिनट में शांति से उत्तर दें। कोई चिकित्सकीय दावा नहीं — सिर्फ़ व्यावहारिक स्पष्टता।',
    journeyThree: 'रिपोर्ट पर काम करें',
    journeyThreeText: 'मज़बूतियों, घर्षण बिंदुओं और ठोस अगले कदम को अपने वास्तविक सप्ताह में उपयोग करें।',
    themesTitle: 'थीमें',
    themesHint: 'अभी सबसे ज़रूरी यात्रा चरण के अनुसार कैटलॉग फ़िल्टर करें।',
    allThemes: 'सभी थीमें',
    catalogTitle: 'आकलन',
    startCta: 'यह पथ शुरू करें',
    enticeTitle: 'पूरी कर्व के लिए तैयार?',
    enticeText: 'पूरी लाइब्रेरी खोलें, प्रगति सहेजें, और रिपोर्ट फिर से देखें।',
    enticeCta: 'प्लान देखें',
    notFound: 'आकलन नहीं मिला',
    backToLibrary: 'लाइब्रेरी पर वापस',
  },
  categories: {
    memory: 'मेमोरी और फोकस',
    personality: 'व्यक्तित्व',
    mindset: 'माइंडसेट',
    wellbeing: 'वेलबीइंग',
    career: 'करियर',
    neuro: 'न्यूरोडायवर्सिटी',
    eq: 'EQ और टीमें',
    decisions: 'निर्णय',
    energy: 'ऊर्जा',
    growth: 'विकास',
  },
  levels: {
    beginner: 'शुरुआती',
    intermediate: 'मध्यम',
    advanced: 'उन्नत',
  },
  common: {
    ...en.common,
    tryNow: 'अभी आज़माएँ',
    explore: 'खोजें',
    questions: 'प्रश्न',
    minutes: 'मिनट',
    selected: 'चयनित',
    startAssessment: 'आकलन शुरू करें',
    yourReport: 'आपकी रिपोर्ट',
    resultsSuffix: 'परिणाम',
    moreAssessments: 'और आकलन',
    viewPlans: 'प्लान देखें',
    primaryPattern: 'मुख्य पैटर्न',
  },
}

export const dictionaries: Record<LocaleCode, Dictionary> = {
  en,
  fr,
  es,
  ja,
  de,
  ar,
  nl,
  pl,
  th,
  hi,
}
