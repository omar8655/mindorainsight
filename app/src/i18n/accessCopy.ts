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
  healthcareReferral: 'Healthcare referral',
  healthcareReferralCourse: 'Healthcare referral course',
  referralPin: 'Referral PIN',
  emailPlusPin: 'Email + PIN',
  limitedFree: 'Limited free access',
  freeUiPreview: 'Free UI preview',
  unlockWithReferral: 'Unlock with referral',
  startFreeAdhd: 'Start free ADHD',
  tryUiPreview: 'Try UI · 5 questions',
  libraryBanner:
    'Free right now: Adult ADHD Test + a 5-question UI preview. All other courses unlock with your healthcare professional’s email and a unique PIN from your healthcare professional body.',
  gateTitle: 'Enter your professional healthcare email and PIN',
  gateBody:
    'Unlock {course} with your healthcare professional’s email and a unique referral PIN from your healthcare professional body.',
  emailLabel: 'Healthcare professional email',
  pinLabel: 'Referral PIN',
  unlockCta: 'Unlock this course',
  checking: 'Checking…',
  gateFootnote:
    'Free paths (ADHD + UI preview) stay open. Full catalog unlocks with healthcare email + unique PIN.',
  invalidEmail: 'Enter a valid healthcare professional email.',
  invalidPin: 'That referral PIN is not valid. Ask your GP / healthcare provider.',
  needsEmailPin: 'This course needs a healthcare email + referral PIN.',
  freeTestBadge: 'Free test',
  freeTestSearchBadge: 'Free test search',
  featuredFreePath: 'Featured free path',
  moreFreeTests: 'More free tests',
  moreFreeTestsHint:
    'Popular free-test searches — these library paths still need a healthcare referral PIN to unlock.',
  nhsLabel: 'NHS referral',
  nhsBody:
    'Healthcare referrals unlock paid library paths with your email address and a unique PIN provided by your healthcare professional body. The Adult ADHD Test stays free — no PIN required.',
  exploreAssessments: 'Explore assessments',
  allFreeTests: 'All free tests →',
  freeTestsDisclaimer:
    'Free ADHD Test is open without a PIN. Other listed paths are popular free-test searches — they unlock with a healthcare referral PIN.',
}

const fr: AccessCopy = {
  ...en,
  healthcareReferral: 'Orientation santé',
  healthcareReferralCourse: 'Cours sur orientation santé',
  referralPin: 'Code PIN d’orientation',
  emailPlusPin: 'E-mail + PIN',
  limitedFree: 'Accès gratuit limité',
  freeUiPreview: 'Aperçu UI gratuit',
  unlockWithReferral: 'Débloquer avec orientation',
  startFreeAdhd: 'Commencer le TDAH gratuit',
  tryUiPreview: 'Essayer l’UI · 5 questions',
  libraryBanner:
    'Gratuit maintenant : test TDAH adulte + aperçu UI 5 questions. Les autres cours se débloquent avec l’e-mail de votre professionnel de santé et un PIN unique fourni par votre organisme de santé.',
  gateTitle: 'Saisissez l’e-mail professionnel de santé et le PIN',
  gateBody:
    'Débloquez {course} avec l’e-mail de votre professionnel de santé et un PIN unique fourni par votre organisme de santé.',
  emailLabel: 'E-mail du professionnel de santé',
  pinLabel: 'PIN d’orientation',
  unlockCta: 'Débloquer ce cours',
  checking: 'Vérification…',
  gateFootnote:
    'Les parcours gratuits (TDAH + aperçu UI) restent ouverts. Le catalogue complet se débloque avec e-mail santé + PIN unique.',
  invalidEmail: 'Saisissez un e-mail professionnel de santé valide.',
  invalidPin: 'Ce PIN d’orientation n’est pas valide. Demandez à votre médecin / professionnel de santé.',
  needsEmailPin: 'Ce cours nécessite un e-mail santé + un PIN d’orientation.',
  freeTestBadge: 'Test gratuit',
  freeTestSearchBadge: 'Recherche test gratuit',
  featuredFreePath: 'Parcours gratuit mis en avant',
  moreFreeTests: 'Plus de tests gratuits',
  moreFreeTestsHint:
    'Recherches populaires de tests gratuits — ces parcours de la bibliothèque nécessitent encore un PIN d’orientation santé.',
  nhsLabel: 'Orientation NHS',
  nhsBody:
    'Les orientations santé débloquent les parcours payants de la bibliothèque avec votre adresse e-mail et un PIN unique fourni par votre organisme de santé professionnel. Le test TDAH adulte reste gratuit — sans PIN.',
  exploreAssessments: 'Explorer les évaluations',
  allFreeTests: 'Tous les tests gratuits →',
  freeTestsDisclaimer:
    'Le test TDAH gratuit est ouvert sans PIN. Les autres liens sont des recherches populaires — ils se débloquent avec un PIN d’orientation santé.',
}

const es: AccessCopy = {
  ...en,
  healthcareReferral: 'Derivación sanitaria',
  healthcareReferralCourse: 'Curso con derivación sanitaria',
  referralPin: 'PIN de derivación',
  emailPlusPin: 'Email + PIN',
  limitedFree: 'Acceso gratuito limitado',
  freeUiPreview: 'Vista previa UI gratuita',
  unlockWithReferral: 'Desbloquear con derivación',
  startFreeAdhd: 'Empezar TDAH gratis',
  tryUiPreview: 'Probar UI · 5 preguntas',
  libraryBanner:
    'Gratis ahora: test TDAH adultos + vista previa UI de 5 preguntas. El resto se desbloquea con el email de tu profesional sanitario y un PIN único de tu organismo sanitario.',
  gateTitle: 'Introduce el email sanitario profesional y el PIN',
  gateBody:
    'Desbloquea {course} con el email de tu profesional sanitario y un PIN único de tu organismo sanitario.',
  emailLabel: 'Email del profesional sanitario',
  pinLabel: 'PIN de derivación',
  unlockCta: 'Desbloquear este curso',
  checking: 'Comprobando…',
  gateFootnote:
    'Las rutas gratis (TDAH + vista previa UI) siguen abiertas. El catálogo completo se desbloquea con email sanitario + PIN único.',
  invalidEmail: 'Introduce un email profesional sanitario válido.',
  invalidPin: 'Ese PIN de derivación no es válido. Pregunta a tu médico / profesional sanitario.',
  needsEmailPin: 'Este curso necesita un email sanitario + PIN de derivación.',
  freeTestBadge: 'Test gratis',
  freeTestSearchBadge: 'Búsqueda de test gratis',
  featuredFreePath: 'Ruta gratuita destacada',
  moreFreeTests: 'Más tests gratis',
  moreFreeTestsHint:
    'Búsquedas populares de tests gratis — estas rutas de la biblioteca aún necesitan un PIN de derivación sanitaria.',
  nhsLabel: 'Derivación NHS',
  nhsBody:
    'Las derivaciones sanitarias desbloquean rutas de pago de la biblioteca con tu email y un PIN único proporcionado por tu organismo sanitario profesional. El test TDAH adultos sigue gratis — sin PIN.',
  exploreAssessments: 'Explorar evaluaciones',
  allFreeTests: 'Todos los tests gratis →',
  freeTestsDisclaimer:
    'El test TDAH gratis está abierto sin PIN. Los demás enlaces son búsquedas populares — se desbloquean con un PIN de derivación sanitaria.',
}

const de: AccessCopy = {
  ...en,
  healthcareReferral: 'Gesundheitsüberweisung',
  healthcareReferralCourse: 'Kurs mit Gesundheitsüberweisung',
  referralPin: 'Überweisungs-PIN',
  emailPlusPin: 'E-Mail + PIN',
  limitedFree: 'Begrenzt kostenlos',
  freeUiPreview: 'Kostenlose UI-Vorschau',
  unlockWithReferral: 'Mit Überweisung freischalten',
  startFreeAdhd: 'Kostenlosen ADHS-Test starten',
  tryUiPreview: 'UI testen · 5 Fragen',
  libraryBanner:
    'Jetzt kostenlos: ADHS-Test für Erwachsene + 5-Fragen-UI-Vorschau. Alle anderen Kurse mit E-Mail deiner Fachkraft und einer einzigartigen PIN deiner Gesundheitsorganisation freischalten.',
  gateTitle: 'Professionelle Gesundheits-E-Mail und PIN eingeben',
  gateBody:
    'Schalte {course} mit der E-Mail deiner Fachkraft und einer einzigartigen Überweisungs-PIN deiner Gesundheitsorganisation frei.',
  emailLabel: 'E-Mail der Gesundheitsfachkraft',
  pinLabel: 'Überweisungs-PIN',
  unlockCta: 'Diesen Kurs freischalten',
  checking: 'Wird geprüft…',
  gateFootnote:
    'Kostenlose Pfade (ADHS + UI-Vorschau) bleiben offen. Der volle Katalog mit Gesundheits-E-Mail + einzigartiger PIN.',
  invalidEmail: 'Gib eine gültige E-Mail einer Gesundheitsfachkraft ein.',
  invalidPin: 'Diese Überweisungs-PIN ist ungültig. Frage deine Ärztin / deinen Arzt.',
  needsEmailPin: 'Dieser Kurs braucht eine Gesundheits-E-Mail + Überweisungs-PIN.',
  freeTestBadge: 'Kostenloser Test',
  freeTestSearchBadge: 'Suche: kostenloser Test',
  featuredFreePath: 'Empfohlener kostenloser Pfad',
  moreFreeTests: 'Weitere kostenlose Tests',
  moreFreeTestsHint:
    'Beliebte Suchen nach kostenlosen Tests — diese Bibliothekspfade brauchen weiterhin eine Überweisungs-PIN.',
  nhsLabel: 'NHS-Überweisung',
  nhsBody:
    'Gesundheitsüberweisungen schalten bezahlte Bibliothekspfade mit deiner E-Mail und einer einzigartigen PIN deiner professionellen Gesundheitsorganisation frei. Der ADHS-Test für Erwachsene bleibt kostenlos — ohne PIN.',
  exploreAssessments: 'Assessments entdecken',
  allFreeTests: 'Alle kostenlosen Tests →',
  freeTestsDisclaimer:
    'Der kostenlose ADHS-Test ist ohne PIN offen. Andere Links sind beliebte Suchen — Freischaltung mit Überweisungs-PIN.',
}

const ja: AccessCopy = {
  ...en,
  healthcareReferral: '医療紹介',
  healthcareReferralCourse: '医療紹介コース',
  referralPin: '紹介PIN',
  emailPlusPin: 'メール + PIN',
  limitedFree: '期間限定無料',
  freeUiPreview: '無料UIプレビュー',
  unlockWithReferral: '紹介で解除',
  startFreeAdhd: '無料ADHDを開始',
  tryUiPreview: 'UIを試す · 5問',
  libraryBanner:
    '今すぐ無料：成人ADHDテスト + 5問UIプレビュー。その他のコースは医療専門家のメールと、医療専門機関から提供される固有PINで解除できます。',
  gateTitle: '医療専門家のメールとPINを入力',
  gateBody:
    '{course} を医療専門家のメールと、医療専門機関から提供される固有の紹介PINで解除します。',
  emailLabel: '医療専門家のメール',
  pinLabel: '紹介PIN',
  unlockCta: 'このコースを解除',
  checking: '確認中…',
  gateFootnote:
    '無料パス（ADHD + UIプレビュー）は開いたままです。カタログ全体は医療メール + 固有PINで解除します。',
  invalidEmail: '有効な医療専門家のメールを入力してください。',
  invalidPin: 'その紹介PINは無効です。主治医／医療提供者に確認してください。',
  needsEmailPin: 'このコースには医療メール + 紹介PINが必要です。',
  freeTestBadge: '無料テスト',
  freeTestSearchBadge: '無料テスト検索',
  featuredFreePath: 'おすすめ無料パス',
  moreFreeTests: 'その他の無料テスト',
  moreFreeTestsHint:
    '人気の無料テスト検索 — これらのライブラリパスは紹介PINが必要です。',
  nhsLabel: 'NHS紹介',
  nhsBody:
    '医療紹介は、あなたのメールアドレスと医療専門機関から提供される固有PINで有料ライブラリーを解除します。成人ADHDテストは無料のまま — PIN不要。',
  exploreAssessments: 'アセスメントを探す',
  allFreeTests: 'すべての無料テスト →',
  freeTestsDisclaimer:
    '無料ADHDテストはPINなしで利用できます。他のリンクは人気検索用で、紹介PINで解除します。',
}

const ar: AccessCopy = {
  ...en,
  healthcareReferral: 'إحالة صحية',
  healthcareReferralCourse: 'دورة بإحالة صحية',
  referralPin: 'رمز الإحالة',
  emailPlusPin: 'البريد + الرمز',
  limitedFree: 'وصول مجاني محدود',
  freeUiPreview: 'معاينة واجهة مجانية',
  unlockWithReferral: 'فتح بالإحالة',
  startFreeAdhd: 'ابدأ اختبار فرط الحركة المجاني',
  tryUiPreview: 'جرّب الواجهة · 5 أسئلة',
  libraryBanner:
    'مجاني الآن: اختبار فرط الحركة للبالغين + معاينة واجهة من 5 أسئلة. بقية الدورات تُفتح ببريد أخصائي الرعاية الصحية ورمز فريد من جهتك الصحية المهنية.',
  gateTitle: 'أدخل بريد أخصائي الرعاية الصحية والرمز',
  gateBody:
    'افتح {course} ببريد أخصائي الرعاية الصحية ورمز إحالة فريد من جهتك الصحية المهنية.',
  emailLabel: 'بريد أخصائي الرعاية الصحية',
  pinLabel: 'رمز الإحالة',
  unlockCta: 'افتح هذه الدورة',
  checking: 'جارٍ التحقق…',
  gateFootnote:
    'المسارات المجانية (فرط الحركة + معاينة الواجهة) تبقى مفتوحة. الكتالوج الكامل يُفتح بالبريد الصحي + رمز فريد.',
  invalidEmail: 'أدخل بريد أخصائي رعاية صحية صالحًا.',
  invalidPin: 'رمز الإحالة غير صالح. اسأل طبيبك / مقدم الرعاية.',
  needsEmailPin: 'هذه الدورة تحتاج بريدًا صحيًا + رمز إحالة.',
  freeTestBadge: 'اختبار مجاني',
  freeTestSearchBadge: 'بحث اختبار مجاني',
  featuredFreePath: 'المسار المجاني المميز',
  moreFreeTests: 'المزيد من الاختبارات المجانية',
  moreFreeTestsHint:
    'عمليات بحث شائعة عن اختبارات مجانية — هذه المسارات ما زالت تحتاج رمز إحالة صحية.',
  nhsLabel: 'إحالة NHS',
  nhsBody:
    'الإحالات الصحية تفتح مسارات المكتبة المدفوعة ببريدك ورمز فريد تقدمه جهتك الصحية المهنية. اختبار فرط الحركة للبالغين يبقى مجانيًا — بدون رمز.',
  exploreAssessments: 'استكشف التقييمات',
  allFreeTests: 'كل الاختبارات المجانية →',
  freeTestsDisclaimer:
    'اختبار فرط الحركة المجاني مفتوح بدون رمز. الروابط الأخرى لعمليات بحث شائعة — تُفتح برمز إحالة صحية.',
}

const nl: AccessCopy = {
  ...en,
  healthcareReferral: 'Zorgverwijzing',
  healthcareReferralCourse: 'Cursus met zorgverwijzing',
  referralPin: 'Verwijzings-PIN',
  emailPlusPin: 'E-mail + PIN',
  limitedFree: 'Beperkt gratis',
  freeUiPreview: 'Gratis UI-voorbeeld',
  unlockWithReferral: 'Ontgrendel met verwijzing',
  startFreeAdhd: 'Start gratis ADHD',
  tryUiPreview: 'Probeer UI · 5 vragen',
  libraryBanner:
    'Nu gratis: ADHD-test voor volwassenen + UI-voorbeeld met 5 vragen. Andere cursussen ontgrendel je met het e-mailadres van je zorgverlener en een unieke PIN van je professionele zorginstantie.',
  gateTitle: 'Voer professioneel zorg-e-mailadres en PIN in',
  gateBody:
    'Ontgrendel {course} met het e-mailadres van je zorgverlener en een unieke verwijzings-PIN van je professionele zorginstantie.',
  emailLabel: 'E-mail van zorgverlener',
  pinLabel: 'Verwijzings-PIN',
  unlockCta: 'Deze cursus ontgrendelen',
  checking: 'Controleren…',
  gateFootnote:
    'Gratis paden (ADHD + UI-voorbeeld) blijven open. Volledige catalogus met zorg-e-mail + unieke PIN.',
  invalidEmail: 'Voer een geldig e-mailadres van een zorgverlener in.',
  invalidPin: 'Die verwijzings-PIN is ongeldig. Vraag je huisarts / zorgverlener.',
  needsEmailPin: 'Deze cursus heeft een zorg-e-mail + verwijzings-PIN nodig.',
  freeTestBadge: 'Gratis test',
  freeTestSearchBadge: 'Zoekopdracht gratis test',
  featuredFreePath: 'Uitgelicht gratis pad',
  moreFreeTests: 'Meer gratis tests',
  moreFreeTestsHint:
    'Populaire zoekopdrachten naar gratis tests — deze bibliotheekpaden hebben nog een verwijzings-PIN nodig.',
  nhsLabel: 'NHS-verwijzing',
  nhsBody:
    'Zorgverwijzingen ontgrendelen betaalde bibliotheekpaden met je e-mailadres en een unieke PIN van je professionele zorginstantie. De ADHD-test voor volwassenen blijft gratis — zonder PIN.',
  exploreAssessments: 'Verken assessments',
  allFreeTests: 'Alle gratis tests →',
  freeTestsDisclaimer:
    'De gratis ADHD-test is open zonder PIN. Andere links zijn populaire zoekopdrachten — ontgrendelen met een verwijzings-PIN.',
}

const pl: AccessCopy = {
  ...en,
  healthcareReferral: 'Skierowanie medyczne',
  healthcareReferralCourse: 'Kurs ze skierowaniem',
  referralPin: 'PIN skierowania',
  emailPlusPin: 'E-mail + PIN',
  limitedFree: 'Ograniczony dostęp darmowy',
  freeUiPreview: 'Darmowy podgląd UI',
  unlockWithReferral: 'Odblokuj skierowaniem',
  startFreeAdhd: 'Zacznij darmowe ADHD',
  tryUiPreview: 'Wypróbuj UI · 5 pytań',
  libraryBanner:
    'Teraz za darmo: test ADHD dla dorosłych + podgląd UI (5 pytań). Pozostałe kursy odblokujesz e-mailem specjalisty i unikalnym PIN-em od Twojej placówki medycznej.',
  gateTitle: 'Wpisz e-mail specjalisty i PIN',
  gateBody:
    'Odblokuj {course} e-mailem specjalisty oraz unikalnym PIN-em skierowania od Twojej placówki medycznej.',
  emailLabel: 'E-mail specjalisty medycznego',
  pinLabel: 'PIN skierowania',
  unlockCta: 'Odblokuj ten kurs',
  checking: 'Sprawdzanie…',
  gateFootnote:
    'Darmowe ścieżki (ADHD + podgląd UI) pozostają otwarte. Pełny katalog: e-mail medyczny + unikalny PIN.',
  invalidEmail: 'Podaj prawidłowy e-mail specjalisty medycznego.',
  invalidPin: 'Ten PIN skierowania jest nieprawidłowy. Zapytaj lekarza / specjalistę.',
  needsEmailPin: 'Ten kurs wymaga e-maila medycznego + PIN-u skierowania.',
  freeTestBadge: 'Darmowy test',
  freeTestSearchBadge: 'Wyszukiwanie darmowego testu',
  featuredFreePath: 'Wyróżniona darmowa ścieżka',
  moreFreeTests: 'Więcej darmowych testów',
  moreFreeTestsHint:
    'Popularne wyszukiwania darmowych testów — te ścieżki biblioteki nadal wymagają PIN-u skierowania.',
  nhsLabel: 'Skierowanie NHS',
  nhsBody:
    'Skierowania medyczne odblokowują płatne ścieżki biblioteki Twoim e-mailem i unikalnym PIN-em od placówki medycznej. Test ADHD dla dorosłych pozostaje darmowy — bez PIN-u.',
  exploreAssessments: 'Przeglądaj oceny',
  allFreeTests: 'Wszystkie darmowe testy →',
  freeTestsDisclaimer:
    'Darmowy test ADHD jest otwarty bez PIN-u. Pozostałe linki to popularne wyszukiwania — odblokowanie PIN-em skierowania.',
}

const th: AccessCopy = {
  ...en,
  healthcareReferral: 'การส่งต่อด้านสุขภาพ',
  healthcareReferralCourse: 'คอร์สที่ต้องมีการส่งต่อ',
  referralPin: 'PIN การส่งต่อ',
  emailPlusPin: 'อีเมล + PIN',
  limitedFree: 'เข้าฟรีแบบจำกัด',
  freeUiPreview: 'ตัวอย่าง UI ฟรี',
  unlockWithReferral: 'ปลดล็อกด้วยการส่งต่อ',
  startFreeAdhd: 'เริ่ม ADHD ฟรี',
  tryUiPreview: 'ลอง UI · 5 ข้อ',
  libraryBanner:
    'ฟรีตอนนี้: แบบทดสอบ ADHD ผู้ใหญ่ + ตัวอย่าง UI 5 ข้อ คอร์สอื่นปลดล็อกด้วยอีเมลผู้เชี่ยวชาญด้านสุขภาพและ PIN เฉพาะจากหน่วยงานสุขภาพวิชาชีพของคุณ',
  gateTitle: 'กรอกอีเมลผู้เชี่ยวชาญด้านสุขภาพและ PIN',
  gateBody:
    'ปลดล็อก {course} ด้วยอีเมลผู้เชี่ยวชาญด้านสุขภาพและ PIN การส่งต่อเฉพาะจากหน่วยงานสุขภาพวิชาชีพของคุณ',
  emailLabel: 'อีเมลผู้เชี่ยวชาญด้านสุขภาพ',
  pinLabel: 'PIN การส่งต่อ',
  unlockCta: 'ปลดล็อกคอร์สนี้',
  checking: 'กำลังตรวจสอบ…',
  gateFootnote:
    'เส้นทางฟรี (ADHD + ตัวอย่าง UI) ยังเปิดอยู่ แค็ตตาล็อกเต็มปลดล็อกด้วยอีเมลสุขภาพ + PIN เฉพาะ',
  invalidEmail: 'กรอกอีเมลผู้เชี่ยวชาญด้านสุขภาพที่ถูกต้อง',
  invalidPin: 'PIN การส่งต่อนี้ไม่ถูกต้อง โปรดถามแพทย์ / ผู้ให้บริการของคุณ',
  needsEmailPin: 'คอร์สนี้ต้องใช้อีเมลสุขภาพ + PIN การส่งต่อ',
  freeTestBadge: 'แบบทดสอบฟรี',
  freeTestSearchBadge: 'การค้นหาแบบทดสอบฟรี',
  featuredFreePath: 'เส้นทางฟรีแนะนำ',
  moreFreeTests: 'แบบทดสอบฟรีเพิ่มเติม',
  moreFreeTestsHint:
    'คำค้นหาแบบทดสอบฟรียอดนิยม — เส้นทางในคลังเหล่านี้ยังต้องใช้ PIN การส่งต่อ',
  nhsLabel: 'การส่งต่อ NHS',
  nhsBody:
    'การส่งต่อด้านสุขภาพปลดล็อกเส้นทางคลังแบบชำระเงินด้วยอีเมลของคุณและ PIN เฉพาะจากหน่วยงานสุขภาพวิชาชีพ แบบทดสอบ ADHD ผู้ใหญ่ยังฟรี — ไม่ต้องใช้ PIN',
  exploreAssessments: 'สำรวจแบบประเมิน',
  allFreeTests: 'แบบทดสอบฟรีทั้งหมด →',
  freeTestsDisclaimer:
    'แบบทดสอบ ADHD ฟรีเปิดโดยไม่ต้องใช้ PIN ลิงก์อื่นเป็นการค้นหายอดนิยม — ปลดล็อกด้วย PIN การส่งต่อ',
}

const hi: AccessCopy = {
  ...en,
  healthcareReferral: 'हेल्थकेयर रेफ़रल',
  healthcareReferralCourse: 'रेफ़रल वाला कोर्स',
  referralPin: 'रेफ़रल PIN',
  emailPlusPin: 'ईमेल + PIN',
  limitedFree: 'सीमित मुफ़्त पहुँच',
  freeUiPreview: 'मुफ़्त UI प्रीव्यू',
  unlockWithReferral: 'रेफ़रल से अनलॉक',
  startFreeAdhd: 'मुफ़्त ADHD शुरू करें',
  tryUiPreview: 'UI आज़माएँ · 5 प्रश्न',
  libraryBanner:
    'अभी मुफ़्त: वयस्क ADHD टेस्ट + 5-प्रश्न UI प्रीव्यू। बाकी कोर्स आपके हेल्थकेयर प्रोफ़ेशनल के ईमेल और आपके प्रोफ़ेशनल हेल्थ बॉडी से मिले यूनिक PIN से अनलॉक होते हैं।',
  gateTitle: 'प्रोफ़ेशनल हेल्थकेयर ईमेल और PIN दर्ज करें',
  gateBody:
    '{course} को अपने हेल्थकेयर प्रोफ़ेशनल के ईमेल और आपके प्रोफ़ेशनल हेल्थ बॉडी के यूनिक रेफ़रल PIN से अनलॉक करें।',
  emailLabel: 'हेल्थकेयर प्रोफ़ेशनल ईमेल',
  pinLabel: 'रेफ़रल PIN',
  unlockCta: 'यह कोर्स अनलॉक करें',
  checking: 'जाँच हो रही है…',
  gateFootnote:
    'मुफ़्त पथ (ADHD + UI प्रीव्यू) खुले रहते हैं। पूरा कैटलॉग हेल्थ ईमेल + यूनिक PIN से अनलॉक होता है।',
  invalidEmail: 'मान्य हेल्थकेयर प्रोफ़ेशनल ईमेल दर्ज करें।',
  invalidPin: 'वह रेफ़रल PIN मान्य नहीं है। अपने डॉक्टर / प्रदाता से पूछें।',
  needsEmailPin: 'इस कोर्स के लिए हेल्थ ईमेल + रेफ़रल PIN चाहिए।',
  freeTestBadge: 'मुफ़्त टेस्ट',
  freeTestSearchBadge: 'मुफ़्त टेस्ट खोज',
  featuredFreePath: 'विशेष मुफ़्त पथ',
  moreFreeTests: 'और मुफ़्त टेस्ट',
  moreFreeTestsHint:
    'लोकप्रिय मुफ़्त-टेस्ट खोजें — ये लाइब्रेरी पथ अभी भी रेफ़रल PIN चाहते हैं।',
  nhsLabel: 'NHS रेफ़रल',
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

export function getAccessCopy(locale: LocaleCode): AccessCopy {
  return packs[locale] ?? en
}
