import type { LocaleCode } from '@/i18n/dictionaries'

export type AssessmentCopy = {
  title: string
  description: string
}

const en: Record<string, AssessmentCopy> = {
  'work-focus-patterns': {
    title: 'Concentration Test',
    description:
      'Map how you sustain attention, recover from distraction, and protect deep work under real deadlines.',
  },
  'emotional-range-at-work': {
    title: 'Mood Test',
    description:
      'Understand how you regulate pressure, feedback, and interpersonal heat without losing performance.',
  },
  'ocean-workplace-profile': {
    title: 'OCEAN Personality Test',
    description:
      'Score Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability for career fit.',
  },
  'big-five-career-map': {
    title: 'Big Five Personality Test',
    description:
      'Translate the five universal traits into role fit, team dynamics, and growth priorities.',
  },
  'drive-ego-balance': {
    title: 'Narcissism Test',
    description:
      'See where healthy ambition ends and ego friction begins — privately, with actionable framing.',
  },
  'decision-values-spectrum': {
    title: 'Political Compass Test',
    description:
      'Clarify how you weigh risk, fairness, speed, and long-term outcomes when stakes are high.',
  },
  'eq-for-teams': {
    title: 'Emotional Intelligence Test',
    description:
      'Measure emotional and social skill that compounds into better collaboration and leadership presence.',
  },
  'professional-mindset-age': {
    title: 'Mental Age Test',
    description:
      'Reveal how mature your judgment patterns are across ownership, patience, and strategic thinking.',
  },
  'systems-order-habits': {
    title: 'OCD Test',
    description:
      'Identify loops that help — or stall — your systems thinking, quality bar, and execution rhythm.',
  },
  'energy-cycle-tracker': {
    title: 'Burnout Test',
    description:
      'Chart peaks and dips in drive so you can plan hard work around your natural performance windows.',
  },
  'collaboration-style': {
    title: 'Teamwork Style Quiz',
    description:
      'Decode how you communicate preferences, negotiate conflict, and build trust with teammates.',
  },
  'focus-impulse-profile': {
    title: 'Impulse Control Test',
    description:
      'Evaluate attention, impulsivity, and executive function to tune your workflow for real output.',
  },
  'empathy-in-leadership': {
    title: 'Empathy Test',
    description:
      'See how you read social cues and set boundaries — essential for managers and ICs alike.',
  },
  'resilience-under-load': {
    title: 'Resilience Test',
    description:
      'Surface recovery patterns after setbacks so you can rebuild faster without burnout theater.',
  },
  'work-archetype': {
    title: 'Jungian Archetype Test',
    description:
      'Uncover the operating patterns that drive how you contribute, lead, and seek recognition.',
  },
  'influence-dynamics': {
    title: 'Dark Triad Test',
    description:
      'Understand persuasion style, status games, and ethical influence in professional settings.',
  },
  'strengths-operating-system': {
    title: 'StrengthsFinder Test',
    description:
      'Pinpoint signature strengths and the environments where they compound into career leverage.',
  },
  'neurodiversity-at-work': {
    title: 'Am I Neurodivergent Quiz',
    description:
      'Explore sensory and processing traits that shape how you learn, meet, and ship work.',
  },
  'problem-solving-iq-sprint': {
    title: 'Problem-Solving IQ Sprint',
    description:
      'A timed reasoning warm-up built for workplace problem framing — not party-trick scoring.',
  },
  'recognition-style': {
    title: 'People Pleaser Test',
    description:
      'Learn how you give and receive appreciation so motivation systems actually stick on your team.',
  },
  'attachment-at-work': {
    title: 'Attachment Style Quiz',
    description:
      'Map security vs anxiety in professional relationships, feedback loops, and mentorship.',
  },
  'core-work-personality': {
    title: 'Personality Test',
    description: 'A crisp profile of how you think, decide, and show up when the work gets hard.',
  },
  'enneagram-for-operators': {
    title: 'Enneagram Test',
    description:
      'Apply Enneagram patterns to motivation, stress, and high-performance team design.',
  },
  '16-types-career-lens': {
    title: 'Myers-Briggs Test',
    description:
      'Connect cognitive preferences to role design, communication, and learning strategy.',
  },
  'sensory-work-fit': {
    title: 'Autism Test',
    description:
      'Understand sensory load and social bandwidth so your environment matches how you perform.',
  },
  'motivation-engine': {
    title: 'Dopamine Detox Quiz',
    description:
      'Find what actually fuels your drive — novelty, mastery, mission, status, or craft.',
  },
  'career-path-fit': {
    title: 'Career Aptitude Test',
    description:
      'Match skills and interests to environments where you are most likely to thrive and stay.',
  },
  'disc-collaboration-map': {
    title: 'DISC Personality Test',
    description:
      'Decode Dominance, Influence, Steadiness, and Conscientiousness for cleaner teamwork.',
  },
  'inner-drive-totem': {
    title: 'Inner Drive Totem',
    description:
      'A fast archetype read for strengths, caution zones, and how you show up under pressure.',
  },
  'partnership-alignment': {
    title: 'Love Languages Test',
    description:
      'Sixteen sharp questions on collaboration chemistry — useful for cofounders and close partners.',
  },
  'adhd-adult-screening': {
    title: 'Adult ADHD Test',
    description:
      '100 educational statements scored as percentages across attention, restlessness, impulse control, executive regulation, emotion, and follow-through — a basic initial indication to discuss with a professional, not a diagnosis.',
  },
  'ui-preview-5': {
    title: 'UI Preview · 5 Questions',
    description:
      'A short free walkthrough to try the MindoraInsight assessment UI — five sample items only, not a clinical or scored course.',
  },
}

const fr: Record<string, AssessmentCopy> = {
  'work-focus-patterns': {
    title: 'Test de concentration',
    description:
      'Cartographiez comment vous maintenez l’attention, récupérez des distractions et protégez le travail en profondeur.',
  },
  'emotional-range-at-work': {
    title: 'Test d’humeur',
    description:
      'Comprenez comment vous régulez la pression, le feedback et les tensions relationnelles sans perdre en performance.',
  },
  'ocean-workplace-profile': {
    title: 'Test de personnalité OCEAN',
    description:
      'Mesurez Ouverture, Conscience, Extraversion, Agréabilité et Stabilité émotionnelle pour votre fit de carrière.',
  },
  'big-five-career-map': {
    title: 'Test Big Five',
    description:
      'Traduisez les cinq traits universels en adéquation de rôle, dynamique d’équipe et priorités de croissance.',
  },
  'drive-ego-balance': {
    title: 'Test de narcissisme',
    description:
      'Voyez où l’ambition saine s’arrête et où le frottement d’ego commence — avec un cadre actionnable.',
  },
  'decision-values-spectrum': {
    title: 'Test boussole politique',
    description:
      'Clarifiez comment vous pesez risque, équité, vitesse et résultats long terme quand les enjeux montent.',
  },
  'eq-for-teams': {
    title: 'Test d’intelligence émotionnelle',
    description:
      'Mesurez les compétences émotionnelles et sociales qui améliorent collaboration et présence de leadership.',
  },
  'professional-mindset-age': {
    title: 'Test d’âge mental',
    description:
      'Révélez la maturité de votre jugement sur ownership, patience et pensée stratégique.',
  },
  'systems-order-habits': {
    title: 'Test TOC',
    description:
      'Identifiez les boucles qui aident — ou freinent — votre pensée systémique et votre rythme d’exécution.',
  },
  'energy-cycle-tracker': {
    title: 'Test de burnout',
    description:
      'Repérez pics et creux de motivation pour planifier le travail exigeant aux bons moments.',
  },
  'collaboration-style': {
    title: 'Quiz style de travail en équipe',
    description:
      'Décodez vos préférences de communication, la gestion du conflit et la construction de confiance.',
  },
  'focus-impulse-profile': {
    title: 'Test de contrôle des impulsions',
    description:
      'Évaluez attention, impulsivité et fonctions exécutives pour ajuster votre workflow.',
  },
  'empathy-in-leadership': {
    title: 'Test d’empathie',
    description:
      'Voyez comment vous lisez les signaux sociaux et posez des limites — managers et ICs.',
  },
  'resilience-under-load': {
    title: 'Test de résilience',
    description:
      'Faites apparaître vos patterns de récupération après un échec pour rebondir plus vite.',
  },
  'work-archetype': {
    title: 'Test d’archétypes jungiens',
    description:
      'Révélez les schémas qui guident votre contribution, votre leadership et votre besoin de reconnaissance.',
  },
  'influence-dynamics': {
    title: 'Test Dark Triad',
    description:
      'Comprenez style de persuasion, jeux de statut et influence éthique en contexte pro.',
  },
  'strengths-operating-system': {
    title: 'Test StrengthsFinder',
    description:
      'Repérez vos forces signature et les environnements où elles créent un levier de carrière.',
  },
  'neurodiversity-at-work': {
    title: 'Suis-je neurodivergent ?',
    description:
      'Explorez les traits sensoriels et de traitement qui façonnent apprentissage, réunions et livraison.',
  },
  'problem-solving-iq-sprint': {
    title: 'Sprint QI résolution de problèmes',
    description:
      'Échauffement de raisonnement chronométré pour cadrer des problèmes pro — pas un score de salon.',
  },
  'recognition-style': {
    title: 'Test people pleaser',
    description:
      'Apprenez comment vous donnez et recevez de la reconnaissance pour motiver durablement.',
  },
  'attachment-at-work': {
    title: 'Test de style d’attachement',
    description:
      'Cartographiez sécurité vs anxiété dans les relations pro, le feedback et le mentorat.',
  },
  'core-work-personality': {
    title: 'Test de personnalité',
    description: 'Un profil clair de la façon dont vous pensez, décidez et vous montrez quand ça devient dur.',
  },
  'enneagram-for-operators': {
    title: 'Test Ennéagramme',
    description:
      'Appliquez les patterns Ennéagramme à la motivation, au stress et au design d’équipe.',
  },
  '16-types-career-lens': {
    title: 'Test Myers-Briggs',
    description:
      'Reliez préférences cognitives au design de rôle, à la communication et à l’apprentissage.',
  },
  'sensory-work-fit': {
    title: 'Test autisme',
    description:
      'Comprenez charge sensorielle et bande passante sociale pour aligner votre environnement.',
  },
  'motivation-engine': {
    title: 'Quiz détox dopamine',
    description:
      'Trouvez ce qui alimente vraiment votre drive — nouveauté, maîtrise, mission, statut ou craft.',
  },
  'career-path-fit': {
    title: 'Test d’orientation professionnelle',
    description:
      'Associez compétences et intérêts aux environnements où vous avez le plus de chances de réussir.',
  },
  'disc-collaboration-map': {
    title: 'Test de personnalité DISC',
    description:
      'Décodez Dominance, Influence, Stabilité et Conscience pour un travail d’équipe plus clair.',
  },
  'inner-drive-totem': {
    title: 'Totem de drive intérieur',
    description:
      'Lecture rapide d’archétype : forces, zones de vigilance et posture sous pression.',
  },
  'partnership-alignment': {
    title: 'Test des langages de l’amour',
    description:
      'Seize questions précises sur la chimie de collaboration — utiles pour cofondateurs et partenaires proches.',
  },
  'adhd-adult-screening': {
    title: 'Test TDAH adulte',
    description:
      '100 affirmations éducatives scorées en pourcentages sur l’attention, l’agitation, le contrôle des impulsions, la régulation exécutive, l’émotion et le suivi — une indication initiale à discuter avec un professionnel, pas un diagnostic.',
  },
  'ui-preview-5': {
    title: 'Aperçu UI · 5 questions',
    description:
      'Un court parcours gratuit pour essayer l’interface MindoraInsight — cinq items d’exemple seulement, pas un cours clinique ni noté.',
  },
}

const es: Record<string, AssessmentCopy> = {
  'work-focus-patterns': {
    title: 'Test de concentración',
    description:
      'Mapea cómo sostienes la atención, recuperas tras distracciones y proteges el trabajo profundo.',
  },
  'emotional-range-at-work': {
    title: 'Test de estado de ánimo',
    description:
      'Entiende cómo regulas presión, feedback y tensión interpersonal sin perder rendimiento.',
  },
  'ocean-workplace-profile': {
    title: 'Test de personalidad OCEAN',
    description:
      'Mide Apertura, Responsabilidad, Extraversión, Amabilidad y Estabilidad emocional para tu encaje profesional.',
  },
  'big-five-career-map': {
    title: 'Test Big Five',
    description:
      'Traduce los cinco rasgos universales en encaje de rol, dinámica de equipo y prioridades de crecimiento.',
  },
  'drive-ego-balance': {
    title: 'Test de narcisismo',
    description:
      'Ve dónde termina la ambición sana y empieza la fricción del ego — con un marco accionable.',
  },
  'decision-values-spectrum': {
    title: 'Test brújula política',
    description:
      'Aclara cómo ponderas riesgo, equidad, velocidad y resultados a largo plazo cuando hay mucho en juego.',
  },
  'eq-for-teams': {
    title: 'Test de inteligencia emocional',
    description:
      'Mide habilidad emocional y social que mejora colaboración y presencia de liderazgo.',
  },
  'professional-mindset-age': {
    title: 'Test de edad mental',
    description:
      'Revela la madurez de tu juicio en ownership, paciencia y pensamiento estratégico.',
  },
  'systems-order-habits': {
    title: 'Test TOC',
    description:
      'Identifica bucles que ayudan — o frenan — tu pensamiento sistémico y ritmo de ejecución.',
  },
  'energy-cycle-tracker': {
    title: 'Test de burnout',
    description:
      'Grafica picos y bajones de motivación para planificar el trabajo duro en tus mejores ventanas.',
  },
  'collaboration-style': {
    title: 'Quiz estilo de trabajo en equipo',
    description:
      'Decodifica preferencias de comunicación, negociación de conflicto y construcción de confianza.',
  },
  'focus-impulse-profile': {
    title: 'Test de control de impulsos',
    description:
      'Evalúa atención, impulsividad y función ejecutiva para afinar tu flujo de trabajo.',
  },
  'empathy-in-leadership': {
    title: 'Test de empatía',
    description:
      'Mira cómo lees señales sociales y pones límites — esencial para managers e ICs.',
  },
  'resilience-under-load': {
    title: 'Test de resiliencia',
    description:
      'Saca a la luz patrones de recuperación tras contratiempos para reconstruir más rápido.',
  },
  'work-archetype': {
    title: 'Test de arquetipos junguianos',
    description:
      'Descubre los patrones que impulsan cómo contribuyes, lideras y buscas reconocimiento.',
  },
  'influence-dynamics': {
    title: 'Test Dark Triad',
    description:
      'Entiende estilo de persuasión, juegos de estatus e influencia ética en entornos profesionales.',
  },
  'strengths-operating-system': {
    title: 'Test StrengthsFinder',
    description:
      'Identifica fortalezas firma y entornos donde se convierten en apalancamiento de carrera.',
  },
  'neurodiversity-at-work': {
    title: '¿Soy neurodivergente?',
    description:
      'Explora rasgos sensoriales y de procesamiento que moldean cómo aprendes, te reúnes y entregas.',
  },
  'problem-solving-iq-sprint': {
    title: 'Sprint de CI para resolver problemas',
    description:
      'Calentamiento cronometrado de razonamiento para enmarcar problemas laborales — no un truco de fiesta.',
  },
  'recognition-style': {
    title: 'Test people pleaser',
    description:
      'Aprende cómo das y recibes aprecio para que la motivación se sostenga en el equipo.',
  },
  'attachment-at-work': {
    title: 'Test de estilo de apego',
    description:
      'Mapea seguridad vs ansiedad en relaciones profesionales, feedback y mentoría.',
  },
  'core-work-personality': {
    title: 'Test de personalidad',
    description: 'Un perfil claro de cómo piensas, decides y te presentas cuando el trabajo se pone difícil.',
  },
  'enneagram-for-operators': {
    title: 'Test Eneagrama',
    description:
      'Aplica patrones del Eneagrama a motivación, estrés y diseño de equipos de alto rendimiento.',
  },
  '16-types-career-lens': {
    title: 'Test Myers-Briggs',
    description:
      'Conecta preferencias cognitivas con diseño de rol, comunicación y estrategia de aprendizaje.',
  },
  'sensory-work-fit': {
    title: 'Test de autismo',
    description:
      'Comprende carga sensorial y ancho de banda social para que el entorno encaje con tu rendimiento.',
  },
  'motivation-engine': {
    title: 'Quiz detox de dopamina',
    description:
      'Descubre qué alimenta tu impulso: novedad, maestría, misión, estatus o oficio.',
  },
  'career-path-fit': {
    title: 'Test de aptitud profesional',
    description:
      'Empareja habilidades e intereses con entornos donde es más probable que prosperes y te quedes.',
  },
  'disc-collaboration-map': {
    title: 'Test de personalidad DISC',
    description:
      'Decodifica Dominancia, Influencia, Estabilidad y Conciencia para un trabajo en equipo más limpio.',
  },
  'inner-drive-totem': {
    title: 'Tótem de impulso interior',
    description:
      'Lectura rápida de arquetipo: fortalezas, zonas de cuidado y cómo te muestras bajo presión.',
  },
  'partnership-alignment': {
    title: 'Test de lenguajes del amor',
    description:
      'Dieciséis preguntas precisas sobre química de colaboración — útiles para cofundadores y socios cercanos.',
  },
  'adhd-adult-screening': {
    title: 'Test TDAH adultos',
    description:
      '100 afirmaciones educativas puntuadas en porcentajes sobre atención, inquietud, control de impulsos, regulación ejecutiva, emoción y seguimiento — una indicación inicial para hablar con un profesional, no un diagnóstico.',
  },
  'ui-preview-5': {
    title: 'Vista previa UI · 5 preguntas',
    description:
      'Un recorrido gratuito corto para probar la interfaz de MindoraInsight — solo cinco ítems de muestra, no un curso clínico ni puntuado.',
  },
}

const de: Record<string, AssessmentCopy> = {
  'work-focus-patterns': {
    title: 'Konzentrationstest',
    description:
      'Kartiere, wie du Aufmerksamkeit hältst, dich von Ablenkung erholst und Deep Work schützt.',
  },
  'emotional-range-at-work': {
    title: 'Stimmungstest',
    description:
      'Verstehe, wie du Druck, Feedback und zwischenmenschliche Spannung regulierst, ohne Leistung zu verlieren.',
  },
  'ocean-workplace-profile': {
    title: 'OCEAN-Persönlichkeitstest',
    description:
      'Miss Offenheit, Gewissenhaftigkeit, Extraversion, Verträglichkeit und emotionale Stabilität für Career Fit.',
  },
  'big-five-career-map': {
    title: 'Big-Five-Persönlichkeitstest',
    description:
      'Übersetze die fünf Universaltraits in Rollenfit, Teamdynamik und Wachstumsprioritäten.',
  },
  'drive-ego-balance': {
    title: 'Narzissmus-Test',
    description:
      'Sieh, wo gesunder Ehrgeiz endet und Ego-Reibung beginnt — privat und handlungsorientiert.',
  },
  'decision-values-spectrum': {
    title: 'Politischer Kompass-Test',
    description:
      'Kläre, wie du Risiko, Fairness, Tempo und Langfristigkeit abwägst, wenn viel auf dem Spiel steht.',
  },
  'eq-for-teams': {
    title: 'Test emotionale Intelligenz',
    description:
      'Miss emotionale und soziale Kompetenz, die Zusammenarbeit und Leadership-Präsenz verbessert.',
  },
  'professional-mindset-age': {
    title: 'Mentales-Alter-Test',
    description:
      'Zeige, wie reif deine Urteilsmuster bei Ownership, Geduld und strategischem Denken sind.',
  },
  'systems-order-habits': {
    title: 'Zwangsstörungs-Test',
    description:
      'Erkenne Schleifen, die dein Systemdenken und Ausführungstempo helfen — oder bremsen.',
  },
  'energy-cycle-tracker': {
    title: 'Burnout-Test',
    description:
      'Kartiere Hochs und Tiefs deines Drives, um harte Arbeit in deine besten Fenster zu legen.',
  },
  'collaboration-style': {
    title: 'Teamstil-Quiz',
    description:
      'Entschlüssele Kommunikationsvorlieben, Konfliktverhandlung und Vertrauensaufbau im Team.',
  },
  'focus-impulse-profile': {
    title: 'Impulskontroll-Test',
    description:
      'Bewerte Aufmerksamkeit, Impulsivität und exekutive Funktion, um deinen Workflow zu schärfen.',
  },
  'empathy-in-leadership': {
    title: 'Empathie-Test',
    description:
      'Sieh, wie du soziale Signale liest und Grenzen setzt — für Manager und ICs.',
  },
  'resilience-under-load': {
    title: 'Resilienz-Test',
    description:
      'Mache Erholungsmuster nach Rückschlägen sichtbar, um schneller wieder aufzubauen.',
  },
  'work-archetype': {
    title: 'Jungscher Archetypen-Test',
    description:
      'Decke Betriebssysteme auf, die bestimmen, wie du beiträgst, führst und Anerkennung suchst.',
  },
  'influence-dynamics': {
    title: 'Dark-Triad-Test',
    description:
      'Verstehe Überzeugungsstil, Statusspiele und ethischen Einfluss im Berufsalltag.',
  },
  'strengths-operating-system': {
    title: 'StrengthsFinder-Test',
    description:
      'Finde Signaturstärken und Umgebungen, in denen sie zu Karrierehebeln werden.',
  },
  'neurodiversity-at-work': {
    title: 'Bin ich neurodivergent?',
    description:
      'Erkunde sensorische und Verarbeitungsmerkmale, die Lernen, Meetings und Delivery formen.',
  },
  'problem-solving-iq-sprint': {
    title: 'Problemlösungs-IQ-Sprint',
    description:
      'Zeitgebundenes Reasoning-Warm-up für berufliches Problemframing — kein Partyspiel-Score.',
  },
  'recognition-style': {
    title: 'People-Pleaser-Test',
    description:
      'Lerne, wie du Wertschätzung gibst und empfängst, damit Motivation im Team hält.',
  },
  'attachment-at-work': {
    title: 'Bindungsstil-Test',
    description:
      'Kartiere Sicherheit vs. Angst in beruflichen Beziehungen, Feedback und Mentoring.',
  },
  'core-work-personality': {
    title: 'Persönlichkeitstest',
    description: 'Ein klares Profil, wie du denkst, entscheidest und auftrittst, wenn es hart wird.',
  },
  'enneagram-for-operators': {
    title: 'Enneagramm-Test',
    description:
      'Wende Enneagramm-Muster auf Motivation, Stress und High-Performance-Teamdesign an.',
  },
  '16-types-career-lens': {
    title: 'Myers-Briggs-Test',
    description:
      'Verbinde kognitive Präferenzen mit Rollendesign, Kommunikation und Lernstrategie.',
  },
  'sensory-work-fit': {
    title: 'Autismus-Test',
    description:
      'Verstehe sensorische Last und soziale Bandbreite, damit die Umgebung zu deiner Leistung passt.',
  },
  'motivation-engine': {
    title: 'Dopamin-Detox-Quiz',
    description:
      'Finde, was deinen Drive speist — Neuheit, Meisterschaft, Mission, Status oder Handwerk.',
  },
  'career-path-fit': {
    title: 'Berufs-Eignungstest',
    description:
      'Passe Skills und Interessen an Umgebungen an, in denen du eher gedeihst und bleibst.',
  },
  'disc-collaboration-map': {
    title: 'DISC-Persönlichkeitstest',
    description:
      'Entschlüssele Dominance, Influence, Steadiness und Conscientiousness für klarere Teamarbeit.',
  },
  'inner-drive-totem': {
    title: 'Inneres Drive-Totem',
    description:
      'Schnelle Archetyp-Lesung: Stärken, Vorsichtszonen und Auftreten unter Druck.',
  },
  'partnership-alignment': {
    title: 'Liebessprachen-Test',
    description:
      'Sechzehn präzise Fragen zur Kollaborationschemie — nützlich für Cofounder und enge Partner.',
  },
  'adhd-adult-screening': {
    title: 'ADHS-Test für Erwachsene',
    description:
      '100 Bildungsaussagen, bewertet in Prozenten zu Aufmerksamkeit, Unruhe, Impulskontrolle, exekutiver Regulation, Emotion und Durchhaltevermögen — ein erster Hinweis zum Gespräch mit Fachpersonen, keine Diagnose.',
  },
  'ui-preview-5': {
    title: 'UI-Vorschau · 5 Fragen',
    description:
      'Ein kurzer kostenloser Durchlauf der MindoraInsight-Oberfläche — nur fünf Beispielitems, kein klinischer oder bewerteter Kurs.',
  },
}

function localizedTitles(
  titles: Record<string, string>,
  descriptionTemplate: (englishTitle: string) => string,
): Record<string, AssessmentCopy> {
  return Object.fromEntries(
    Object.entries(en).map(([slug, copy]) => [
      slug,
      {
        title: titles[slug] ?? copy.title,
        description: descriptionTemplate(copy.title),
      },
    ]),
  ) as Record<string, AssessmentCopy>
}

const ar = localizedTitles(
  {
    'work-focus-patterns': 'اختبار التركيز',
    'emotional-range-at-work': 'اختبار المزاج',
    'ocean-workplace-profile': 'اختبار شخصية OCEAN',
    'big-five-career-map': 'اختبار العوامل الخمسة الكبرى',
    'drive-ego-balance': 'اختبار النرجسية',
    'decision-values-spectrum': 'اختبار البوصلة السياسية',
    'eq-for-teams': 'اختبار الذكاء العاطفي',
    'professional-mindset-age': 'اختبار العمر العقلي',
    'systems-order-habits': 'اختبار الوسواس القهري',
    'energy-cycle-tracker': 'اختبار الإرهاق الوظيفي',
    'collaboration-style': 'اختبار أسلوب العمل الجماعي',
    'focus-impulse-profile': 'اختبار ضبط الاندفاع',
    'empathy-in-leadership': 'اختبار التعاطف',
    'resilience-under-load': 'اختبار المرونة النفسية',
    'work-archetype': 'اختبار أنماط يونغ',
    'influence-dynamics': 'اختبار الثالوث المظلم',
    'strengths-operating-system': 'اختبار نقاط القوة',
    'neurodiversity-at-work': 'هل أنا متنوع عصبيًا؟',
    'recognition-style': 'اختبار إرضاء الآخرين',
    'attachment-at-work': 'اختبار نمط التعلق',
    'core-work-personality': 'اختبار الشخصية',
    'enneagram-for-operators': 'اختبار الإينياجرام',
    '16-types-career-lens': 'اختبار مايرز بريجز',
    'sensory-work-fit': 'اختبار التوحد',
    'motivation-engine': 'اختبار ديتوكس الدوبامين',
    'career-path-fit': 'اختبار الميول المهنية',
    'disc-collaboration-map': 'اختبار شخصية DISC',
    'partnership-alignment': 'اختبار لغات الحب',
    'adhd-adult-screening': 'اختبار فرط الحركة للبالغين',
    'problem-solving-iq-sprint': 'سباق حل المشكلات',
    'inner-drive-totem': 'رمز الدافع الداخلي',
  },
  (title) => `تقييم عملي يساعدك على فهم أنماطك واتخاذ خطوة أوضح في عملك ونموك. (${title})`,
)

const ja = localizedTitles(
  {
    'work-focus-patterns': '集中力テスト',
    'emotional-range-at-work': '気分テスト',
    'ocean-workplace-profile': 'OCEAN性格テスト',
    'big-five-career-map': 'ビッグファイブ性格診断',
    'drive-ego-balance': 'ナルシシズムテスト',
    'decision-values-spectrum': '政治コンパス診断',
    'eq-for-teams': 'EQ・感情知能テスト',
    'professional-mindset-age': 'メンタルエイジ診断',
    'systems-order-habits': 'OCDテスト',
    'energy-cycle-tracker': 'バーンアウト診断',
    'collaboration-style': 'チームワークスタイル診断',
    'focus-impulse-profile': '衝動コントロール診断',
    'empathy-in-leadership': '共感力テスト',
    'resilience-under-load': 'レジリエンステスト',
    'work-archetype': 'ユングのアーキタイプ診断',
    'influence-dynamics': 'ダークトライアド診断',
    'strengths-operating-system': 'ストレングスファインダー',
    'neurodiversity-at-work': 'ニューロダイバージェント診断',
    'recognition-style': 'いい人診断',
    'attachment-at-work': '愛着スタイル診断',
    'core-work-personality': '性格診断テスト',
    'enneagram-for-operators': 'エニアグラム診断',
    '16-types-career-lens': 'マイヤーズ・ブリッグス診断',
    'sensory-work-fit': '自閉症スペクトラムテスト',
    'motivation-engine': 'ドーパミンデトックス診断',
    'career-path-fit': '適職診断テスト',
    'disc-collaboration-map': 'DISC性格診断',
    'partnership-alignment': 'ラブ言語診断',
    'adhd-adult-screening': '成人ADHDテスト',
    'problem-solving-iq-sprint': '問題解決IQスプリント',
    'inner-drive-totem': '内なるドライブのトーテム',
  },
  (title) =>
    `仕事と成長のための実践的アセスメント。自分のパターンを把握し、次の一歩を明確にします。（${title}）`,
)

const nl = localizedTitles(
  {
      'work-focus-patterns': 'Concentratietest',
      'emotional-range-at-work': 'Stemmingstest',
      'ocean-workplace-profile': 'OCEAN-persoonlijkheidstest',
      'big-five-career-map': 'Big Five-persoonlijkheidstest',
      'drive-ego-balance': 'Narcismetest',
      'decision-values-spectrum': 'Politiek kompas-test',
      'eq-for-teams': 'Emotionele-intelligentietest',
      'professional-mindset-age': 'Mentale-leeftijdtest',
      'systems-order-habits': 'OCS-test',
      'energy-cycle-tracker': 'Burn-outtest',
      'collaboration-style': 'Teamstijl-quiz',
      'focus-impulse-profile': 'Impulscontrole-test',
      'empathy-in-leadership': 'Empathietest',
      'resilience-under-load': 'Veerkrachttest',
      'work-archetype': 'Jungiaanse archetypentest',
      'influence-dynamics': 'Dark Triad-test',
      'strengths-operating-system': 'StrengthsFinder-test',
      'neurodiversity-at-work': 'Ben ik neurodivergent?',
      'recognition-style': 'People-pleaser-test',
      'attachment-at-work': 'Hechtingsstijl-quiz',
      'core-work-personality': 'Persoonlijkheidstest',
      'enneagram-for-operators': 'Enneagramtest',
      '16-types-career-lens': 'Myers-Briggs-test',
      'sensory-work-fit': 'Autismetest',
      'motivation-engine': 'Dopamine-detox-quiz',
      'career-path-fit': 'Beroepskeuzetest',
      'disc-collaboration-map': 'DISC-persoonlijkheidstest',
      'partnership-alignment': 'Liefdestalentest',
      'adhd-adult-screening': 'ADHD-test voor volwassenen',
      'problem-solving-iq-sprint': 'Probleemoplossende IQ-sprint',
      'inner-drive-totem': 'Innerlijke drive-totem',
    },
  (title) =>
    `Praktische assessment die je helpt patronen te zien en een duidelijke volgende stap te zetten. (${title})`,
)

const pl = localizedTitles(
  {
      'work-focus-patterns': 'Test koncentracji',
      'emotional-range-at-work': 'Test nastroju',
      'ocean-workplace-profile': 'Test osobowości OCEAN',
      'big-five-career-map': 'Test Wielkiej Piątki',
      'drive-ego-balance': 'Test narcyzmu',
      'decision-values-spectrum': 'Test kompasu politycznego',
      'eq-for-teams': 'Test inteligencji emocjonalnej',
      'professional-mindset-age': 'Test wieku umysłowego',
      'systems-order-habits': 'Test OCD',
      'energy-cycle-tracker': 'Test wypalenia',
      'collaboration-style': 'Quiz stylu pracy zespołowej',
      'focus-impulse-profile': 'Test kontroli impulsów',
      'empathy-in-leadership': 'Test empatii',
      'resilience-under-load': 'Test odporności psychicznej',
      'work-archetype': 'Test archetypów Junga',
      'influence-dynamics': 'Test Ciemnej Triady',
      'strengths-operating-system': 'Test StrengthsFinder',
      'neurodiversity-at-work': 'Czy jestem neuroróżnorodny?',
      'recognition-style': 'Test people pleasera',
      'attachment-at-work': 'Test stylu przywiązania',
      'core-work-personality': 'Test osobowości',
      'enneagram-for-operators': 'Test Enneagramu',
      '16-types-career-lens': 'Test Myers-Briggs',
      'sensory-work-fit': 'Test autyzmu',
      'motivation-engine': 'Quiz detoksu dopaminy',
      'career-path-fit': 'Test predyspozycji zawodowych',
      'disc-collaboration-map': 'Test osobowości DISC',
      'partnership-alignment': 'Test języków miłości',
      'adhd-adult-screening': 'Test ADHD dla dorosłych',
      'problem-solving-iq-sprint': 'Sprint IQ rozwiązywania problemów',
      'inner-drive-totem': 'Totem wewnętrznego napędu',
    },
  (title) =>
    `Praktyczna ocena, która pomaga zobaczyć wzorce i obrać jasny następny krok. (${title})`,
)

const th = localizedTitles(
  {
      'work-focus-patterns': 'แบบทดสอบสมาธิ',
      'emotional-range-at-work': 'แบบทดสอบอารมณ์',
      'ocean-workplace-profile': 'แบบทดสอบบุคลิกภาพ OCEAN',
      'big-five-career-map': 'แบบทดสอบบุคลิกภาพ Big Five',
      'drive-ego-balance': 'แบบทดสอบโรคหลงตัวเอง',
      'decision-values-spectrum': 'แบบทดสอบเข็มทิศการเมือง',
      'eq-for-teams': 'แบบทดสอบความฉลาดทางอารมณ์',
      'professional-mindset-age': 'แบบทดสอบอายุทางจิต',
      'systems-order-habits': 'แบบทดสอบ OCD',
      'energy-cycle-tracker': 'แบบทดสอบภาวะหมดไฟ',
      'collaboration-style': 'ควิซสไตล์การทำงานเป็นทีม',
      'focus-impulse-profile': 'แบบทดสอบการควบคุมพลังกระตุ้น',
      'empathy-in-leadership': 'แบบทดสอบความเห็นอกเห็นใจ',
      'resilience-under-load': 'แบบทดสอบความยืดหยุ่นทางใจ',
      'work-archetype': 'แบบทดสอบอาร์คิไทป์ของยุง',
      'influence-dynamics': 'แบบทดสอบ Dark Triad',
      'strengths-operating-system': 'แบบทดสอบ StrengthsFinder',
      'neurodiversity-at-work': 'ฉันเป็นนิวโรไดเวอร์เจนต์หรือไม่',
      'recognition-style': 'แบบทดสอบคนเอาใจ',
      'attachment-at-work': 'แบบทดสอบสไตล์ความผูกพัน',
      'core-work-personality': 'แบบทดสอบบุคลิกภาพ',
      'enneagram-for-operators': 'แบบทดสอบ Enneagram',
      '16-types-career-lens': 'แบบทดสอบ Myers-Briggs',
      'sensory-work-fit': 'แบบทดสอบออทิสติก',
      'motivation-engine': 'ควิซดีท็อกซ์โดพามีน',
      'career-path-fit': 'แบบทดสอบความถนัดอาชีพ',
      'disc-collaboration-map': 'แบบทดสอบบุคลิกภาพ DISC',
      'partnership-alignment': 'แบบทดสอบภาษารัก',
      'adhd-adult-screening': 'แบบทดสอบ ADHD ผู้ใหญ่',
      'problem-solving-iq-sprint': 'สปรินต์ IQ การแก้ปัญหา',
      'inner-drive-totem': 'โทเท็มแรงขับภายใน',
    },
  (title) => `แบบประเมินเชิงปฏิบัติที่ช่วยให้เห็นรูปแบบของตนเองและก้าวต่อไปได้ชัดขึ้น (${title})`,
)

const hi = localizedTitles(
  {
      'work-focus-patterns': 'कंसन्ट्रेशन टेस्ट',
      'emotional-range-at-work': 'मूड टेस्ट',
      'ocean-workplace-profile': 'OCEAN पर्सनैलिटी टेस्ट',
      'big-five-career-map': 'बिग फाइव पर्सनैलिटी टेस्ट',
      'drive-ego-balance': 'नार्सिसिज़्म टेस्ट',
      'decision-values-spectrum': 'पॉलिटिकल कम्पास टेस्ट',
      'eq-for-teams': 'इमोशनल इंटेलिजेंस टेस्ट',
      'professional-mindset-age': 'मेंटल एज टेस्ट',
      'systems-order-habits': 'OCD टेस्ट',
      'energy-cycle-tracker': 'बर्नआउट टेस्ट',
      'collaboration-style': 'टीमवर्क स्टाइल क्विज़',
      'focus-impulse-profile': 'इम्पल्स कंट्रोल टेस्ट',
      'empathy-in-leadership': 'एम्पैथी टेस्ट',
      'resilience-under-load': 'रेज़िलिएंस टेस्ट',
      'work-archetype': 'जंगियन आर्किटाइप टेस्ट',
      'influence-dynamics': 'डार्क ट्रायड टेस्ट',
      'strengths-operating-system': 'StrengthsFinder टेस्ट',
      'neurodiversity-at-work': 'क्या मैं न्यूरोडाइवर्जेंट हूँ?',
      'recognition-style': 'पीपल प्लीज़र टेस्ट',
      'attachment-at-work': 'अटैचमेंट स्टाइल क्विज़',
      'core-work-personality': 'पर्सनैलिटी टेस्ट',
      'enneagram-for-operators': 'एनीग्राम टेस्ट',
      '16-types-career-lens': 'मायर्स-ब्रिग्स टेस्ट',
      'sensory-work-fit': 'ऑटिज़्म टेस्ट',
      'motivation-engine': 'डोपामाइन डिटॉक्स क्विज़',
      'career-path-fit': 'करियर एप्टीट्यूड टेस्ट',
      'disc-collaboration-map': 'DISC पर्सनैलिटी टेस्ट',
      'partnership-alignment': 'लव लैंग्वेजेज़ टेस्ट',
      'adhd-adult-screening': 'वयस्क ADHD टेस्ट',
      'problem-solving-iq-sprint': 'समस्या-समाधान IQ स्प्रिंट',
      'inner-drive-totem': 'आंतरिक ड्राइव टोटेम',
    },
  (title) =>
    `एक व्यावहारिक आकलन जो आपके पैटर्न समझने और अगला स्पष्ट कदम चुनने में मदद करता है। (${title})`,
)

const packs: Record<LocaleCode, Record<string, AssessmentCopy>> = {
  en,
  fr,
  es,
  de,
  ar,
  ja,
  nl,
  pl,
  th,
  hi,
}

export function getAssessmentCopy(locale: LocaleCode, slug: string): AssessmentCopy {
  return packs[locale]?.[slug] ?? en[slug] ?? { title: slug, description: '' }
}

export function getAllAssessmentCopy(locale: LocaleCode): Record<string, AssessmentCopy> {
  return packs[locale] ?? en
}
