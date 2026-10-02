import type { LocaleCode } from '@/i18n/dictionaries'

export type AccessCopy = {
  healthcareReferral: string
  healthcareReferralCourse: string
  referralPin: string
  emailPlusPin: string
  limitedFree: string
  freeUiPreview: string
  unlockWithReferral: string
  startFreeAdhd: string
  tryUiPreview: string
  libraryBanner: string
  gateTitle: string
  gateBody: string
  emailLabel: string
  pinLabel: string
  unlockCta: string
  checking: string
  gateFootnote: string
  invalidEmail: string
  invalidPin: string
  needsEmailPin: string
  freeTestBadge: string
  freeTestSearchBadge: string
  featuredFreePath: string
  moreFreeTests: string
  moreFreeTestsHint: string
  nhsLabel: string
  nhsBody: string
  exploreAssessments: string
  allFreeTests: string
  freeTestsDisclaimer: string
}

const en: AccessCopy = {
  healthcareReferral: 'Open access',
  healthcareReferralCourse: 'Free assessment',
  referralPin: 'Open access',
  emailPlusPin: 'Open access',
  limitedFree: 'Free access',
  freeUiPreview: 'Free preview',
  unlockWithReferral: 'Start free',
  startFreeAdhd: 'Start free ADHD',
  tryUiPreview: 'Try 5 questions',
  libraryBanner:
    'Every assessment is free right now — no PIN, no card. Pick a topic and start.',
  gateTitle: 'This assessment is free',
  gateBody: '{course} is open — no PIN required.',
  emailLabel: 'Healthcare professional email',
  pinLabel: 'Referral PIN',
  unlockCta: 'Continue',
  checking: 'Checking…',
  gateFootnote: 'Full catalog is free. No email or PIN required.',
  invalidEmail: 'Enter a valid email.',
  invalidPin: 'That PIN is not valid.',
  needsEmailPin: 'This assessment is free — no PIN needed.',
  freeTestBadge: 'Free test',
  freeTestSearchBadge: 'Free test',
  featuredFreePath: 'Featured free test',
  moreFreeTests: '20 free tests',
  moreFreeTestsHint: 'All 20 assessments are free — 100 questions each, instant scores, PDF report.',
  nhsLabel: 'Open catalog',
  nhsBody:
    'The full MindoraInsight library is free to start. No PIN or payment is required for any assessment.',
  exploreAssessments: '20 free assessments — start in minutes',
  allFreeTests: 'Browse the list ↓',
  freeTestsDisclaimer:
    'All listed assessments are free — 100 questions, Mindora Dossier PDF, no PIN required.',
}

const fr: AccessCopy = {
  ...en,
  healthcareReferral: 'Accès ouvert',
  healthcareReferralCourse: 'Cours sur orientation santé',
  referralPin: 'Accès ouvert',
  emailPlusPin: 'Accès ouvert',
  limitedFree: 'Accès gratuit limité',
  freeUiPreview: 'Aperçu UI gratuit',
  unlockWithReferral: 'Commencer gratuitement',
  startFreeAdhd: 'Commencer le TDAH gratuit',
  tryUiPreview: 'Essayer l’UI · 5 questions',
  libraryBanner:
    'Tous les tests de la bibliothèque sont gratuits — sans PIN, sans carte. Choisissez un sujet et commencez.',
  gateTitle: 'Cette évaluation est gratuite',
  gateBody: '{course} est ouvert — aucun PIN requis.',
  emailLabel: 'E-mail du professionnel de santé',
  pinLabel: 'PIN d’orientation',
  unlockCta: 'Débloquer ce cours',
  checking: 'Vérification…',
  gateFootnote: 'Tout le catalogue est gratuit. Aucun e-mail santé ni PIN requis.',
  invalidEmail: 'Saisissez un e-mail professionnel de santé valide.',
  invalidPin: 'Ce PIN d’orientation n’est pas valide. Demandez à votre médecin / professionnel de santé.',
  needsEmailPin: 'Cette évaluation est gratuite — aucun PIN requis.',
  freeTestBadge: 'Test gratuit',
  freeTestSearchBadge: 'Recherche test gratuit',
  featuredFreePath: 'Parcours gratuit mis en avant',
  moreFreeTests: 'Plus de tests gratuits',
  moreFreeTestsHint:
    'Tous ces parcours sont ouverts — aucun PIN d’orientation requis.',
  nhsLabel: 'Catalogue ouvert',
  nhsBody:
    'Toute la bibliothèque MindoraInsight est gratuite. Aucun PIN ni paiement n’est requis.',
  exploreAssessments: 'Explorer les évaluations',
  allFreeTests: 'Tous les tests gratuits →',
  freeTestsDisclaimer:
    'Tous les tests listés sont gratuits — aucun PIN requis.',
}

const es: AccessCopy = {
  ...en,
  healthcareReferral: 'Acceso abierto',
  healthcareReferralCourse: 'Curso con derivación sanitaria',
  referralPin: 'Acceso abierto',
  emailPlusPin: 'Acceso abierto',
  limitedFree: 'Acceso gratuito limitado',
  freeUiPreview: 'Vista previa UI gratuita',
  unlockWithReferral: 'Empezar gratis',
  startFreeAdhd: 'Empezar TDAH gratis',
  tryUiPreview: 'Probar UI · 5 preguntas',
  libraryBanner:
    'Todas las evaluaciones de la biblioteca son gratis — sin PIN, sin tarjeta. Elige un tema y empieza.',
  gateTitle: 'Esta evaluación es gratuita',
  gateBody: '{course} está abierto — no se requiere PIN.',
  emailLabel: 'Email del profesional sanitario',
  pinLabel: 'PIN de derivación',
  unlockCta: 'Desbloquear este curso',
  checking: 'Comprobando…',
  gateFootnote: 'Todo el catálogo es gratis. No se requiere email sanitario ni PIN.',
  invalidEmail: 'Introduce un email profesional sanitario válido.',
  invalidPin: 'Ese PIN de derivación no es válido. Pregunta a tu médico / profesional sanitario.',
  needsEmailPin: 'Esta evaluación es gratuita — no se necesita PIN.',
  freeTestBadge: 'Test gratis',
  freeTestSearchBadge: 'Búsqueda de test gratis',
  featuredFreePath: 'Ruta gratuita destacada',
  moreFreeTests: 'Más tests gratis',
  moreFreeTestsHint:
    'Todas estas rutas están abiertas — no se necesita PIN de derivación.',
  nhsLabel: 'Catálogo abierto',
  nhsBody:
    'Toda la biblioteca MindoraInsight es gratis. No se necesita PIN ni pago.',
  exploreAssessments: 'Explorar evaluaciones',
  allFreeTests: 'Todos los tests gratis →',
  freeTestsDisclaimer:
    'Todas las evaluaciones listadas son gratis — sin PIN.',
}

const de: AccessCopy = {
  ...en,
  healthcareReferral: 'Offener Zugang',
  healthcareReferralCourse: 'Kurs mit Gesundheitsüberweisung',
  referralPin: 'Offener Zugang',
  emailPlusPin: 'Offener Zugang',
  limitedFree: 'Begrenzt kostenlos',
  freeUiPreview: 'Kostenlose UI-Vorschau',
  unlockWithReferral: 'Kostenlos starten',
  startFreeAdhd: 'Kostenlosen ADHS-Test starten',
  tryUiPreview: 'UI testen · 5 Fragen',
  libraryBanner:
    'Alle Assessments in der Bibliothek sind jetzt kostenlos — ohne PIN, ohne Karte. Thema wählen und starten.',
  gateTitle: 'Diese Einschätzung ist kostenlos',
  gateBody: '{course} ist offen — keine PIN nötig.',
  emailLabel: 'E-Mail der Gesundheitsfachkraft',
  pinLabel: 'Überweisungs-PIN',
  unlockCta: 'Diesen Kurs freischalten',
  checking: 'Wird geprüft…',
  gateFootnote: 'Der gesamte Katalog ist kostenlos. Keine Gesundheits-E-Mail oder PIN nötig.',
  invalidEmail: 'Gib eine gültige E-Mail einer Gesundheitsfachkraft ein.',
  invalidPin: 'Diese Überweisungs-PIN ist ungültig. Frage deine Ärztin / deinen Arzt.',
  needsEmailPin: 'Diese Einschätzung ist kostenlos — keine PIN nötig.',
  freeTestBadge: 'Kostenloser Test',
  freeTestSearchBadge: 'Suche: kostenloser Test',
  featuredFreePath: 'Empfohlener kostenloser Pfad',
  moreFreeTests: 'Weitere kostenlose Tests',
  moreFreeTestsHint:
    'Alle diese Pfade sind offen — keine Überweisungs-PIN nötig.',
  nhsLabel: 'Offener Katalog',
  nhsBody:
    'Die gesamte MindoraInsight-Bibliothek ist kostenlos. Keine PIN und keine Zahlung nötig.',
  exploreAssessments: 'Assessments entdecken',
  allFreeTests: 'Alle kostenlosen Tests →',
  freeTestsDisclaimer:
    'Alle gelisteten Assessments sind kostenlos — ohne PIN.',
}

const ja: AccessCopy = {
  ...en,
  healthcareReferral: 'オープンアクセス',
  healthcareReferralCourse: '医療紹介コース',
  referralPin: 'オープンアクセス',
  emailPlusPin: 'オープンアクセス',
  limitedFree: '期間限定無料',
  freeUiPreview: '無料UIプレビュー',
  unlockWithReferral: '無料で始める',
  startFreeAdhd: '無料ADHDを開始',
  tryUiPreview: 'UIを試す · 5問',
  libraryBanner:
    '今すぐ無料：成人ADHDテスト + 5問UIプレビュー。その他のコースは医療専門家のメールと、医療専門機関から提供される固有PINで解除できます。',
  gateTitle: 'このアセスメントは無料です',
  gateBody: '{course}は開放中です — PINは不要です。',
  emailLabel: '医療専門家のメール',
  pinLabel: '紹介PIN',
  unlockCta: 'このコースを解除',
  checking: '確認中…',
  gateFootnote: '全カタログ無料。医療メールやPINは不要です。',
  invalidEmail: '有効な医療専門家のメールを入力してください。',
  invalidPin: 'その紹介PINは無効です。主治医／医療提供者に確認してください。',
  needsEmailPin: 'このアセスメントは無料です — PINは不要です。',
  freeTestBadge: '無料テスト',
  freeTestSearchBadge: '無料テスト検索',
  featuredFreePath: 'おすすめ無料パス',
  moreFreeTests: 'その他の無料テスト',
  moreFreeTestsHint:
    '人気の無料テスト検索 — これらのライブラリパスは紹介PINが必要です。',
  nhsLabel: 'オープンカタログ',
  nhsBody:
    '医療紹介は、あなたのメールアドレスと医療専門機関から提供される固有PINで有料ライブラリーを解除します。成人ADHDテストは無料のまま — PIN不要。',
  exploreAssessments: 'アセスメントを探す',
  allFreeTests: 'すべての無料テスト →',
  freeTestsDisclaimer:
    '無料ADHDテストはPINなしで利用できます。他のリンクは人気検索用で、紹介PINで解除します。',
}

const ar: AccessCopy = {
  ...en,
  healthcareReferral: 'وصول مفتوح',
  healthcareReferralCourse: 'دورة بإحالة صحية',
  referralPin: 'وصول مفتوح',
  emailPlusPin: 'وصول مفتوح',
  limitedFree: 'وصول مجاني محدود',
  freeUiPreview: 'معاينة واجهة مجانية',
  unlockWithReferral: 'ابدأ مجانًا',
  startFreeAdhd: 'ابدأ اختبار فرط الحركة المجاني',
  tryUiPreview: 'جرّب الواجهة · 5 أسئلة',
  libraryBanner:
    'مجاني الآن: اختبار فرط الحركة للبالغين + معاينة واجهة من 5 أسئلة. بقية الدورات تُفتح ببريد أخصائي الرعاية الصحية ورمز فريد من جهتك الصحية المهنية.',
  gateTitle: 'هذا التقييم مجاني',
  gateBody: '{course} مفتوح — لا يلزم رمز.',
  emailLabel: 'بريد أخصائي الرعاية الصحية',
  pinLabel: 'رمز الإحالة',
  unlockCta: 'افتح هذه الدورة',
  checking: 'جارٍ التحقق…',
  gateFootnote: 'المكتبة كاملة مجانية. لا يلزم بريد صحي أو رمز.',
  invalidEmail: 'أدخل بريد أخصائي رعاية صحية صالحًا.',
  invalidPin: 'رمز الإحالة غير صالح. اسأل طبيبك / مقدم الرعاية.',
  needsEmailPin: 'هذا التقييم مجاني — لا يلزم رمز.',
  freeTestBadge: 'اختبار مجاني',
  freeTestSearchBadge: 'بحث اختبار مجاني',
  featuredFreePath: 'المسار المجاني المميز',
  moreFreeTests: 'المزيد من الاختبارات المجانية',
  moreFreeTestsHint:
    'عمليات بحث شائعة عن اختبارات مجانية — هذه المسارات ما زالت تحتاج رمز إحالة صحية.',
  nhsLabel: 'كتالوج مفتوح',
  nhsBody:
    'الإحالات الصحية تفتح مسارات المكتبة المدفوعة ببريدك ورمز فريد تقدمه جهتك الصحية المهنية. اختبار فرط الحركة للبالغين يبقى مجانيًا — بدون رمز.',
  exploreAssessments: 'استكشف التقييمات',
  allFreeTests: 'كل الاختبارات المجانية →',
  freeTestsDisclaimer:
    'اختبار فرط الحركة المجاني مفتوح بدون رمز. الروابط الأخرى لعمليات بحث شائعة — تُفتح برمز إحالة صحية.',
}

const nl: AccessCopy = {
  ...en,
  healthcareReferral: 'Open toegang',
  healthcareReferralCourse: 'Cursus met zorgverwijzing',
  referralPin: 'Open toegang',
  emailPlusPin: 'Open toegang',
  limitedFree: 'Beperkt gratis',
  freeUiPreview: 'Gratis UI-voorbeeld',
  unlockWithReferral: 'Gratis starten',
  startFreeAdhd: 'Start gratis ADHD',
  tryUiPreview: 'Probeer UI · 5 vragen',
  libraryBanner:
    'Nu gratis: ADHD-test voor volwassenen + UI-voorbeeld met 5 vragen. Andere cursussen ontgrendel je met het e-mailadres van je zorgverlener en een unieke PIN van je professionele zorginstantie.',
  gateTitle: 'Deze assessment is gratis',
  gateBody: '{course} is open — geen PIN nodig.',
  emailLabel: 'E-mail van zorgverlener',
  pinLabel: 'Verwijzings-PIN',
  unlockCta: 'Deze cursus ontgrendelen',
  checking: 'Controleren…',
  gateFootnote: 'De volledige catalogus is gratis. Geen zorg-e-mail of PIN nodig.',
  invalidEmail: 'Voer een geldig e-mailadres van een zorgverlener in.',
  invalidPin: 'Die verwijzings-PIN is ongeldig. Vraag je huisarts / zorgverlener.',
  needsEmailPin: 'Deze assessment is gratis — geen PIN nodig.',
  freeTestBadge: 'Gratis test',
  freeTestSearchBadge: 'Zoekopdracht gratis test',
  featuredFreePath: 'Uitgelicht gratis pad',
  moreFreeTests: 'Meer gratis tests',
  moreFreeTestsHint:
    'Populaire zoekopdrachten naar gratis tests — deze bibliotheekpaden hebben nog een verwijzings-PIN nodig.',
  nhsLabel: 'Open catalogus',
  nhsBody:
    'Zorgverwijzingen ontgrendelen betaalde bibliotheekpaden met je e-mailadres en een unieke PIN van je professionele zorginstantie. De ADHD-test voor volwassenen blijft gratis — zonder PIN.',
  exploreAssessments: 'Verken assessments',
  allFreeTests: 'Alle gratis tests →',
  freeTestsDisclaimer:
    'De gratis ADHD-test is open zonder PIN. Andere links zijn populaire zoekopdrachten — ontgrendelen met een verwijzings-PIN.',
}

const pl: AccessCopy = {
  ...en,
  healthcareReferral: 'Otwarty dostęp',
  healthcareReferralCourse: 'Kurs ze skierowaniem',
  referralPin: 'Otwarty dostęp',
  emailPlusPin: 'Otwarty dostęp',
  limitedFree: 'Ograniczony dostęp darmowy',
  freeUiPreview: 'Darmowy podgląd UI',
  unlockWithReferral: 'Zacznij za darmo',
  startFreeAdhd: 'Zacznij darmowe ADHD',
  tryUiPreview: 'Wypróbuj UI · 5 pytań',
  libraryBanner:
    'Teraz za darmo: test ADHD dla dorosłych + podgląd UI (5 pytań). Pozostałe kursy odblokujesz e-mailem specjalisty i unikalnym PIN-em od Twojej placówki medycznej.',
  gateTitle: 'Ta ocena jest darmowa',
  gateBody: '{course} jest otwarty — PIN nie jest wymagany.',
  emailLabel: 'E-mail specjalisty medycznego',
  pinLabel: 'PIN skierowania',
  unlockCta: 'Odblokuj ten kurs',
  checking: 'Sprawdzanie…',
  gateFootnote: 'Cały katalog jest darmowy. Nie potrzeba e-maila medycznego ani PIN-u.',
  invalidEmail: 'Podaj prawidłowy e-mail specjalisty medycznego.',
  invalidPin: 'Ten PIN skierowania jest nieprawidłowy. Zapytaj lekarza / specjalistę.',
  needsEmailPin: 'Ta ocena jest darmowa — PIN nie jest potrzebny.',
  freeTestBadge: 'Darmowy test',
  freeTestSearchBadge: 'Wyszukiwanie darmowego testu',
  featuredFreePath: 'Wyróżniona darmowa ścieżka',
  moreFreeTests: 'Więcej darmowych testów',
  moreFreeTestsHint:
    'Popularne wyszukiwania darmowych testów — te ścieżki biblioteki nadal wymagają PIN-u skierowania.',
  nhsLabel: 'Otwarty katalog',
  nhsBody:
    'Skierowania medyczne odblokowują płatne ścieżki biblioteki Twoim e-mailem i unikalnym PIN-em od placówki medycznej. Test ADHD dla dorosłych pozostaje darmowy — bez PIN-u.',
  exploreAssessments: 'Przeglądaj oceny',
  allFreeTests: 'Wszystkie darmowe testy →',
  freeTestsDisclaimer:
    'Darmowy test ADHD jest otwarty bez PIN-u. Pozostałe linki to popularne wyszukiwania — odblokowanie PIN-em skierowania.',
}

const th: AccessCopy = {
  ...en,
  healthcareReferral: 'เข้าถึงได้ทันที',
  healthcareReferralCourse: 'คอร์สที่ต้องมีการส่งต่อ',
  referralPin: 'เข้าถึงได้ทันที',
  emailPlusPin: 'เข้าถึงได้ทันที',
  limitedFree: 'เข้าฟรีแบบจำกัด',
  freeUiPreview: 'ตัวอย่าง UI ฟรี',
  unlockWithReferral: 'เริ่มฟรี',
  startFreeAdhd: 'เริ่ม ADHD ฟรี',
  tryUiPreview: 'ลอง UI · 5 ข้อ',
  libraryBanner:
    'ฟรีตอนนี้: แบบทดสอบ ADHD ผู้ใหญ่ + ตัวอย่าง UI 5 ข้อ คอร์สอื่นปลดล็อกด้วยอีเมลผู้เชี่ยวชาญด้านสุขภาพและ PIN เฉพาะจากหน่วยงานสุขภาพวิชาชีพของคุณ',
  gateTitle: 'แบบประเมินนี้ฟรี',
  gateBody: '{course} เปิดแล้ว — ไม่ต้องใช้ PIN',
  emailLabel: 'อีเมลผู้เชี่ยวชาญด้านสุขภาพ',
  pinLabel: 'PIN การส่งต่อ',
  unlockCta: 'ปลดล็อกคอร์สนี้',
  checking: 'กำลังตรวจสอบ…',
  gateFootnote: 'แคตตาล็อกทั้งหมดฟรี ไม่ต้องใช้อีเมลสุขภาพหรือ PIN',
  invalidEmail: 'กรอกอีเมลผู้เชี่ยวชาญด้านสุขภาพที่ถูกต้อง',
  invalidPin: 'PIN การส่งต่อนี้ไม่ถูกต้อง โปรดถามแพทย์ / ผู้ให้บริการของคุณ',
  needsEmailPin: 'แบบประเมินนี้ฟรี — ไม่ต้องใช้ PIN',
  freeTestBadge: 'แบบทดสอบฟรี',
  freeTestSearchBadge: 'การค้นหาแบบทดสอบฟรี',
  featuredFreePath: 'เส้นทางฟรีแนะนำ',
  moreFreeTests: 'แบบทดสอบฟรีเพิ่มเติม',
  moreFreeTestsHint:
    'คำค้นหาแบบทดสอบฟรียอดนิยม — เส้นทางในคลังเหล่านี้ยังต้องใช้ PIN การส่งต่อ',
  nhsLabel: 'แคตตาล็อกเปิด',
  nhsBody:
    'การส่งต่อด้านสุขภาพปลดล็อกเส้นทางคลังแบบชำระเงินด้วยอีเมลของคุณและ PIN เฉพาะจากหน่วยงานสุขภาพวิชาชีพ แบบทดสอบ ADHD ผู้ใหญ่ยังฟรี — ไม่ต้องใช้ PIN',
  exploreAssessments: 'สำรวจแบบประเมิน',
  allFreeTests: 'แบบทดสอบฟรีทั้งหมด →',
  freeTestsDisclaimer:
    'แบบทดสอบ ADHD ฟรีเปิดโดยไม่ต้องใช้ PIN ลิงก์อื่นเป็นการค้นหายอดนิยม — ปลดล็อกด้วย PIN การส่งต่อ',
}

const hi: AccessCopy = {
  ...en,
  healthcareReferral: 'ओपन एक्सेस',
  healthcareReferralCourse: 'रेफ़रल वाला कोर्स',
  referralPin: 'ओपन एक्सेस',
  emailPlusPin: 'ओपन एक्सेस',
  limitedFree: 'सीमित मुफ़्त पहुँच',
  freeUiPreview: 'मुफ़्त UI प्रीव्यू',
  unlockWithReferral: 'मुफ़्त शुरू करें',
  startFreeAdhd: 'मुफ़्त ADHD शुरू करें',
  tryUiPreview: 'UI आज़माएँ · 5 प्रश्न',
  libraryBanner:
    'अभी मुफ़्त: वयस्क ADHD टेस्ट + 5-प्रश्न UI प्रीव्यू। बाकी कोर्स आपके हेल्थकेयर प्रोफ़ेशनल के ईमेल और आपके प्रोफ़ेशनल हेल्थ बॉडी से मिले यूनिक PIN से अनलॉक होते हैं।',
  gateTitle: 'यह आकलन मुफ़्त है',
  gateBody: '{course} खुला है — PIN की ज़रूरत नहीं।',
  emailLabel: 'हेल्थकेयर प्रोफ़ेशनल ईमेल',
  pinLabel: 'रेफ़रल PIN',
  unlockCta: 'यह कोर्स अनलॉक करें',
  checking: 'जाँच हो रही है…',
  gateFootnote: 'पूरा कैटलॉग मुफ़्त है। हेल्थ ईमेल या PIN की ज़रूरत नहीं।',
  invalidEmail: 'मान्य हेल्थकेयर प्रोफ़ेशनल ईमेल दर्ज करें।',
  invalidPin: 'वह रेफ़रल PIN मान्य नहीं है। अपने डॉक्टर / प्रदाता से पूछें।',
  needsEmailPin: 'यह आकलन मुफ़्त है — PIN की ज़रूरत नहीं।',
  freeTestBadge: 'मुफ़्त टेस्ट',
  freeTestSearchBadge: 'मुफ़्त टेस्ट खोज',
  featuredFreePath: 'विशेष मुफ़्त पथ',
  moreFreeTests: 'और मुफ़्त टेस्ट',
  moreFreeTestsHint:
    'लोकप्रिय मुफ़्त-टेस्ट खोजें — ये लाइब्रेरी पथ अभी भी रेफ़रल PIN चाहते हैं।',
  nhsLabel: 'ओपन कैटलॉग',
  nhsBody:
    'हेल्थकेयर रेफ़रल आपके ईमेल और आपके प्रोफ़ेशनल हेल्थ बॉडी के यूनिक PIN से पेड लाइब्रेरी पथ अनलॉक करते हैं। वयस्क ADHD टेस्ट मुफ़्त रहता है — बिना PIN।',
  exploreAssessments: 'मूल्यांकन देखें',
  allFreeTests: 'सभी मुफ़्त टेस्ट →',
  freeTestsDisclaimer:
    'मुफ़्त ADHD टेस्ट बिना PIN खुला है। अन्य लिंक लोकप्रिय खोज हैं — रेफ़रल PIN से अनलॉक।',
}

const packs: Record<LocaleCode, AccessCopy> = {
  en,
  fr,
  es,
  de,
  ja,
  ar,
  nl,
  pl,
  th,
  hi,
}

/** Unlock-related strings stay English-synced so every locale reflects open catalog access. */
const OPEN_ACCESS_KEYS: (keyof AccessCopy)[] = [
  'libraryBanner',
  'gateTitle',
  'gateBody',
  'gateFootnote',
  'needsEmailPin',
  'moreFreeTestsHint',
  'nhsLabel',
  'nhsBody',
  'freeTestsDisclaimer',
  'freeTestSearchBadge',
  'limitedFree',
  'healthcareReferral',
  'healthcareReferralCourse',
  'referralPin',
  'emailPlusPin',
  'unlockWithReferral',
]

export function getAccessCopy(locale: LocaleCode): AccessCopy {
  const pack = packs[locale] ?? en
  if (pack === en) return en
  const merged = { ...pack }
  for (const key of OPEN_ACCESS_KEYS) {
    merged[key] = en[key]
  }
  return merged
}
