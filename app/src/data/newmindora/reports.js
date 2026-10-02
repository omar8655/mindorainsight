/* MindoraInsight - Interpretive copy, brief generators, and bundled test notes */

import { ADHD_INTERPRET } from './adhd-interpret.js';
import { classifyProfile } from './profile-engine.js';
import { TEST_META } from './tests-core.js';


  const first = n => (n||"You").split(" ")[0];
  const ranked = scores => [...scores].filter(s=>s.score!=null).sort((a,b)=>b.score-a.score);
  const pick = (scores,i=0) => ranked(scores)[i] || {key:"this pattern", score:50};
  function trio(scores){
    const r=ranked(scores);
    const top=r[0]||{key:"this pattern",score:50};
    const second=r[1]||top;
    const low=r[r.length-1]||top;
    return { top, second, low, gap:Math.abs((top.score||0)-(second.score||0)) };
  }
  function patternLead(name, top, second, gap){
    const f=first(name);
    if(gap<8) return "Clear answer: "+f+", "+top.key+" and "+second.key+" are nearly tied ("+top.score+" and "+second.score+"/100) — read them as a pair.";
    return "Clear answer: "+f+", your strongest pattern is "+top.key+" ("+top.score+"/100). Next is "+second.key+" ("+second.score+"/100).";
  }

  const BIG5 = {
    Openness:{
      high:"You treat ideas as places to visit. Novelty, metaphor and ‘what if’ thinking come easily. Practical people may call this unfocused; it is often how you find a better frame for a problem.",
      low:"You prefer what is proven and concrete. Theory without a use-case feels like fog. That keeps work grounded; it can also delay a useful leap.",
      work:"Open teams, research, design and learning roles feed a high score. Operations, compliance and ‘do it the known way’ roles fit a low score.",
      rel:"Curious partners feel alive to you if this score is high. If it is low, you show love by staying consistent, not by reinventing the weekend."
    },
    Conscientiousness:{
      high:"Order is how you think, not a chore. Plans, standards and follow-through are part of self-respect. The cost is rigidity when life will not queue.",
      low:"You keep options open and start before the plan is perfect. Energy arrives with interest or a deadline. The cost is loose ends and people waiting on you.",
      work:"High scores thrive where reliability is visible. Low scores thrive where the brief keeps changing.",
      rel:"A high score can feel like criticism to a looser partner. A low score can feel like carelessness to a planner. Name the difference; do not moralise it."
    },
    Extraversion:{
      high:"People are fuel. Talking clarifies thought. After a full room you want another room.",
      low:"People are weather. You choose them. Silence is not emptiness; it is how the nervous system resets.",
      work:"High: sales, teaching, facilitation, visible leadership. Low: deep work, writing, specialist craft.",
      rel:"Do not treat extraversion as friendliness and introversion as coldness. They are energy rules."
    },
    Agreeableness:{
      high:"Other people’s state registers almost as your own. Harmony is not politeness; it is information.",
      low:"You will trade warmth for accuracy. Conflict is a tool. People may call this blunt when you think you are being clear.",
      work:"High scores hold teams together. Low scores hold standards when a team is avoiding a hard fact.",
      rel:"High: you may over-give and then go quiet. Low: you may win the point and lose the evening."
    },
    "Emotional sensitivity":{
      high:"The alarm system is sensitive. Mood, threat and memory linger. That is also how you notice what others miss.",
      low:"Stress rolls off. You stay usable when a room panics. The risk is missing your own early warning signs.",
      work:"High scores need recovery after intensity. Low scores can carry a crisis — and forget to check who is hurt.",
      rel:"If this is high, reassurance works better than ‘calm down’. If it is low, your partner may need more feeling named than you think is necessary."
    }
  };

  const BIG5_WATCH={
    Openness:"Without enough openness, new data gets filed as noise and you may keep a familiar plan after the facts changed.",
    Conscientiousness:"When structure is low, others experience drift — missed endings, vague promises, and work that only finishes under panic.",
    Extraversion:"Very low extraversion is not shyness alone; it can look like disappearing from the loop so teammates assume you are disengaged.",
    Agreeableness:"Low agreeableness wins arguments and loses evenings; warmth is a tool you may need to deploy on purpose.",
    "Emotional sensitivity":"When sensitivity is low, you may miss your own early alarms and dismiss others’ distress as ‘dramatic’."
  };

  const SIXTEEN_POLE_WATCH={
    "Energy (E–I)":"If energy is mid or the non-preferred side is strong, schedule recovery before big social weeks or before long solo stretches.",
    "Information (S–N)":"If you lean too hard on one pole, you may dismiss details (N) or miss the pattern (S) until a project fails.",
    "Decisions (T–F)":"If decisions skew one way, you may optimize for accuracy while the room needs care — or vice versa.",
    "Lifestyle (J–P)":"If lifestyle is rigid or too loose, partners feel either controlled or abandoned by last-minute changes."
  };

  const LOVE_WATCH={
    Words:"If words of affirmation rank low, you may under-speak love and assume actions are obvious.",
    "Acts of service":"If service ranks low, practical help may not land as care even when you mean well.",
    Gifts:"If gifts rank low, you may skip tokens that would have meant a great deal to your partner.",
    Time:"If time ranks low, presence may look distracted even when you are in the room.",
    Touch:"If touch ranks low, physical distance may read as rejection."
  };

  const ATTACH_WATCH={
    "Secure ease":"Even secure scores wobble under stress; repair beats pretending nothing happened.",
    "Anxious protest":"High anxious protest: soothe the body before sending the third message.",
    "Avoidant distance":"High avoidant distance: stay one extra minute when you want to leave the conversation.",
    "Disorganized pull":"Mixed signals exhaust partners; predictability from you matters more than intensity."
  };

  const STRENGTHS_WATCH={
    Executing:"Over-execution without strategy becomes busywork.",
    Influencing:"Over-influence without follow-through erodes trust.",
    Relationship:"Over-relationship without boundaries leads to quiet resentment.",
    "Strategic thinking":"Over-strategy without shipping becomes permanent planning."
  };

  const DISC_WATCH={
    Dominance:"Dominance overplayed talks over people who needed a beat.",
    Influence:"Influence overplayed over-promises and skips fine print.",
    Steadiness:"Steadiness overplayed says yes while meaning not yet.",
    Conscientiousness:"Conscientiousness overplayed delays a good decision for a perfect one."
  };

  const EQ_WATCH={
    "Self-awareness":"Without self-awareness, you act before you know why.",
    "Self-management":"Without self-management, the first feeling owns the reply.",
    Motivation:"Without motivation, you stall when the reward is distant.",
    Empathy:"Without empathy, you misread tone and double down.",
    "Social skill":"Without social skill, accurate empathy never becomes a useful response."
  };

  const CHARACTER_WATCH={
    Wisdom:"Wisdom without courage becomes endless analysis.",
    Courage:"Courage without temperance becomes a mess.",
    Humanity:"Humanity without justice becomes favouritism.",
    Justice:"Justice without humanity becomes cold rule-following.",
    Temperance:"Temperance without courage becomes avoidance.",
    Transcendence:"Transcendence without grounding becomes bypassing real problems."
  };

  const TYPES = {
    INTJ:"You build inward models, then act. Competence is affection. Small talk costs more than strategy.",
    INTP:"You live in the structure of ideas. Precision beats speed. Unfinished systems bother you more than unfinished chores.",
    ENTJ:"You organise people toward an outcome. Drift feels like waste. Softening a message is a skill, not a surrender.",
    ENTP:"You test ideas by arguing them. Novelty is oxygen. Follow-through is the muscle to train, not a personality flaw.",
    INFJ:"You read the room’s undercurrent. Meaning matters more than volume. You disappear when life becomes only logistics.",
    INFP:"Values are the compass. Inauthenticity feels like illness. Deadlines need a why, not only a when.",
    ENFJ:"You move groups by seeing what each person needs. You can over-function until resentment arrives late and loud.",
    ENFP:"Possibility is home. People and ideas spark you. Constraint without purpose feels like a cage.",
    ISTJ:"Facts, duty and memory of what worked. You keep the lights on. Change needs a reason you can inspect.",
    ISFJ:"Steadiness and care, often invisible until it stops. You protect the people in your circle before you promote yourself.",
    ESTJ:"You run the system in front of you. Clarity, standards, results. Feelings are data you may file too late.",
    ESFJ:"Belonging and duty braid together. You notice who is left out. Chaos in a group feels personal.",
    ISTP:"You solve what is in your hands. Words come after the fix. Emotion-heavy process can feel like delay.",
    ISFP:"Taste, loyalty and quiet integrity. You show care by making something right, not by making a speech.",
    ESTP:"The present tense is your native language. Action teaches faster than briefing. Risk needs a second look, not a ban.",
    ESFP:"Warmth and immediacy. You lift a room. The unglamorous middle of a project is where you leak energy."
  };

  const ENNEA = {
    "Type 1":"The inner critic is trying to keep the world from going slack. Anger often arrives as tightness, not shouting. Growth is allowing a good-enough hour.",
    "Type 2":"Worth is tangled with being needed. You notice hunger in others before hunger in yourself. Growth is asking without earning.",
    "Type 3":"Image and output can stand in for feeling. Winning is safer than being seen mid-effort. Growth is a day that counts even if no one claps.",
    "Type 4":"Difference and depth are how you know you exist. Longing can outrun what is already here. Growth is staying when the mood thins.",
    "Type 5":"Energy and knowledge are rationed. Observation feels safer than impact. Growth is offering a half-formed thought before it is armour.",
    "Type 6":"Loyalty and scan-for-threat travel together. Authority is both comfort and suspect. Growth is acting before certainty arrives.",
    "Type 7":"Options keep pain from sitting still. Planning joy can become another job. Growth is one unfinished feeling, fully felt.",
    "Type 8":"Control is protection. Softness can feel like a trap. Growth is letting someone see the unguarded minute.",
    "Type 9":"Peace is the priority; preference goes missing. Numbing looks like kindness. Growth is one clear want, spoken once."
  };

  function words(s){ return (s||"").trim().split(/\s+/).filter(Boolean).length; }
  export const padTo = function padTo(text, min, max){
    const extra = [
      "Read the numbers as a weather report for how you answered today, not as a verdict carved into stone. A high score is a muscle you already use. A low score is a muscle you under-use when you are tired, not a moral failure.",
      "People around you often meet the public version of the high score first. The quieter score tends to show up at home, late in the week, or when a plan slips. That is why a partner or colleague may describe you differently from how you describe yourself.",
      "The useful question is not “is this me forever?” It is “where did this pattern help me this month, and where did it cost someone else time, warmth or clarity?” Write one sentence for each. Keep both sentences.",
      "Change happens in small repetitions: one conversation held thirty seconds longer, one task finished before a new one starts, one evening without scanning for threat. Personality language is only useful if it becomes a next action.",
      "If two scores sit within a few points, treat them as a pair rather than forcing a winner. Mixed profiles are common. The work is naming the conditions that tip you from one into the other.",
      "Sleep, deadline pressure and who is in the room all move scores a little. Retake after a calmer fortnight if this week was unusual. Treat a single sitting as a snapshot.",
      "This library is educational. It does not diagnose ADHD, autism, depression, bipolar patterns, trauma, personality disorders or any other condition. If life is impaired, take the pattern to a licensed professional.",
      "Keep the report private unless you choose to share it. Scores are not a job reference, a court document or a medical record."
    ];
    let out=text.trim();
    let i=0;
    while(words(out)<min && i<extra.length*3){ out += "\n\n"+extra[i%extra.length]; i++; }
    const arr=out.split(/\s+/);
    if(arr.length>max) out=arr.slice(0,max).join(" ");
    return out;
  };

  function citeFramework(testId){
    const b = (BOOK_SOURCES||{})[testId];
    if(!b) return "";
    return "Educational framework: "+b.theory+". Grounded in "+b.authors+" — «"+b.bookTitle+"». Original educational wording only; not an official branded instrument and not a diagnosis.";
  }

  function pack(headline, parts, watch, extra){
    const raw = parts.filter(Boolean).join("\n\n");
    const body = padTo(raw, 400, 480);
    const watchText = watch || "This is a reading of your answers, not a diagnosis and not a permanent label.";
    const longform = padTo([raw, extra||"",
      "How to use this second page. Read it once without arguing. Mark one sentence that feels accurate and one that feels unfair. The unfair sentence is often the useful one. Then pick a single behaviour for the next seven days — not a personality overhaul.",
      "Work. Design the week around the highest score instead of spending the week apologising for the lowest. Ask a colleague which of these scores they would have guessed. If they name a different lead trait, notice where you perform rather than live.",
      "Relationships. Tell one person what the high score needs (space, words, pace, praise, plan) and what the low score drops when tired. Ask what they need in the same language. Keep the request small enough to finish this week.",
      "Practice for 14 days. Morning: one sentence on what the lead trait will do today. Evening: one sentence on where it overplayed. No journal essay required.",
      "Limits. This report is educational. It is not a medical, psychological or legal diagnosis. Scores move a little with sleep, stress and the day you took the test. Clinical-style screens can flag a conversation with a licensed professional; they cannot confirm a condition.",
      "If you are in crisis, contact local emergency services, 988 in the United States, or Samaritans 116 123 in the United Kingdom."
    ].filter(Boolean).join("\n\n"), 700, 900);
    return { headline, body, watch: watchText, longform };
  }

  const crisis = "If hopelessness or self-harm thoughts are present, contact emergency services, 988 (US) or Samaritans 116 123 (UK). This page cannot keep you safe.";

  function citeBook(id){
    const b = (BOOK_SOURCES && BOOK_SOURCES[id]) || null;
    if(!b) return "";
    return "Educational reference: "+b.authors+" — "+b.bookTitle+". Themes only; not a diagnostic instrument or licensed scale.";
  }

  function clinicalBandLabel(score){
    if(score>=75) return "high";
    if(score>=60) return "elevated";
    if(score>=40) return "moderate";
    return "lower";
  }

  function clinicalLead(top, second, low){
    return [
      "Clear answer: your strongest cluster is "+top.key+" ("+top.score+"/100 — "+clinicalBandLabel(top.score)+").",
      "Next strongest: "+second.key+" ("+second.score+"/100).",
      "Quietest today: "+low.key+" ("+low.score+"/100) — useful contrast, not a failure grade.",
      top.note ? top.key+": "+top.note : "",
      low.score+20<=top.score ? "When "+top.key.toLowerCase()+" runs the week, "+low.key.toLowerCase()+" is often where recovery or flexibility still lives." : "Scores sit fairly close; read "+top.key+" and "+second.key+" together."
    ].filter(Boolean);
  }

  function clinicalWorkRel(top, work, rel){
    return [
      "Work. "+(work||"Design the week around what your lead cluster costs you — fewer surprises, clearer next steps, and recovery after hard hours."),
      "Relationships. "+(rel||"Name the lead need in one sentence before a hard talk; ask what the other person needs in the same language.")
    ];
  }

export const BRIEFS = {
    big5(scores, name, sourceId){
      const citeId = sourceId || "big5";
      const shape = classifyProfile ? classifyProfile(citeId === "personality" ? "personality" : "big5", scores) : null;
      const { top, second, low, gap } = trio(scores);
      const lines = scores.map(s=>{
        const t = BIG5[s.key];
        if(!t) return s.key+": "+s.score+"/100.";
        const side = s.score>=50?t.high:t.low;
        return s.key+" ("+s.score+"/100). "+side;
      });
      const leadT = BIG5[top.key]||{};
      const lowT = BIG5[low.key]||{};
      const secondT = BIG5[second.key]||{};
      const shapeTitle = shape ? shape.title : "mixed trait profile";
      return pack(
        first(name)+", profile shape «"+shapeTitle+"» — "+top.key+" leads ("+top.score+"/100), "+second.key+" secondary ("+second.score+"/100).",
        [(shape ? shape.blurb : ""),
         "Five-factor reading (OCEAN): traits describe a style, not a moral ranking. They tend to be fairly stable across adulthood, and they still move a little with sleep, stress and company.",
         patternLead(name, top, second, gap)+" Quietest on this sitting: "+low.key+" ("+low.score+"/100).",
         lines.join("\n\n"),
         "Work (lead "+top.key+"). "+(leadT.work||"")+" Secondary "+second.key+" ("+second.score+"/100) is your backup channel — schedule at least one block this week that uses it on purpose.",
         "Relationships (lead "+top.key+"). "+(leadT.rel||"")+(secondT.rel ? " With "+second.key+" also strong: "+secondT.rel : ""),
         "Watch-out — quietest area "+low.key+" ("+low.score+"/100): "+(BIG5_WATCH[low.key]||lowT.low||"Practice this trait in small doses when tired."),
         gap<8 ? "Top two sit close — design the week for both "+top.key+" and "+second.key+", not a forced winner." : ""],
        "Re-take after a calmer month if this week was unusual.",
        citeFramework(citeId)
      );
    },
    sixteen(scores, name){
      const code = (scores.find(s=>s.label)||{}).label || "INxP";
      const dimsOnly = scores.filter(s=>s.score!=null);
      const { top, second, low, gap } = trio(dimsOnly);
      const essay = TYPES[code] || "Your four preferences combine into a working style: how you refill, how you take in facts, how you decide, and how you close loops.";
      const dims = dimsOnly.map(s=>s.key+": "+s.score+"/100").join(". ");
      const weakestPole = low.key.replace(/ \(.*\)/,"");
      return pack(
        code+" · "+patternLead(name, top, second, gap),
        [essay,
         "Myers–Briggs-style preferences (from Jung via Gifts Differing) are habits of attention, not cages. The letter you did not choose is still available when the situation needs it. Type code "+code+" is shorthand for four preference pairs — not a certified official type.",
         dims,
         "Work. Favour roles that use "+code.slice(0,2)+" attention most of the day (energy + information). Borrow the opposite poles in low-stakes practice hours so "+weakestPole+" does not become a blind spot in reviews.",
         "Relationships. Friction often sits on "+code.slice(2,4)+" — how you decide and how planned the week feels. Before debating the topic, name whether you need closure, options, logic, or care.",
         "Watch-out — lowest preference pole "+weakestPole+" ("+low.score+"/100): "+(SIXTEEN_POLE_WATCH[low.key]||"Practice the non-preferred side once this week on purpose."),
         gap<8 ? "Lead preference poles are close — expect to flip with context rather than locking one letter." : ""],
        "Type is a map. It is not permission to stop growing the other side.",
        citeFramework("sixteen")
      );
    },
    enneagram(scores, name){
      const { top, second, low, gap } = trio(scores);
      const topN=top.key.replace("Type ","");
      const secondN=second.key.replace("Type ","");
      const needByType = {
        "1":"clarity and fairness without nitpicking",
        "2":"to be needed without disappearing",
        "3":"recognition without performing every hour",
        "4":"depth without drama as the only proof",
        "5":"space to think without isolation",
        "6":"loyalty and clear plans without endless scanning",
        "7":"options without fleeing hard feelings",
        "8":"respect and directness without steamrolling",
        "9":"peace without erasing your preference"
      };
      return pack(
        patternLead(name, {key:"Type "+topN, score:top.score}, {key:"Type "+secondN, score:second.score}, gap),
        [ENNEA[top.key]||"",
         ENNEA[second.key] ? "Secondary "+second.key+" (often colours the lead like a wing or stress flavour): "+ENNEA[second.key] : "",
         "Riso & Hudson frame the nine types as core motivations and growth directions — not costumes. Lead motive this sitting: Type "+topN+".",
         "Work. Under pressure, Type "+topN+" strategies show up in meetings first — notice when you are protecting image, peace, control, knowledge, or intensity instead of solving the task. Pair with a colleague strong in Type "+secondN+" themes when you need balance.",
         "Relationships. Ask for "+(needByType[topN]||"what Type "+topN+" needs when stressed")+". Offer one clear ask; then ask what they need back in the same sentence.",
         "Watch-out — lowest type "+low.key+" ("+low.score+"/100): when this number is quiet, you may over-identify with the lead type and miss the wing or stress pattern Type "+secondN+" describes.",
         gap<8 ? "Types "+topN+" and "+secondN+" sit close — read them as a pair, not a forced single type." : ""],
        "No Enneagram result is a sentence. It is a hypothesis to test in the next hard week.",
        citeFramework("enneagram")
      );
    },
    autism(scores, name){
      const { top, second, low, gap } = trio(scores);
      const notes = {
        "Social cueing":{
          note:"Reading tone, turn-taking, and implied rules costs deliberate effort — not a lack of caring.",
          work:"Written agendas, one topic at a time, and explicit turn-taking beat guessing the room.",
          rel:"Ask for directness; say when you need a pause before answering emotion-heavy questions."
        },
        "Pattern focus":{
          note:"Systems, detail, correctness, and deep interests pull attention more than small talk.",
          work:"Protect deep-work blocks for specialty topics; partner out fuzzy, multi-agenda meetings when you can.",
          rel:"Share the interest in short doses and invite theirs — monotropism is focus, not rejection."
        },
        "Sensory load":{
          note:"Light, sound, texture, and crowd input land in the body as load, not ‘being picky.’",
          work:"Quieter corners, noise options, and recovery after open-plan hours are access needs, not luxuries.",
          rel:"Name sensory limits early (touch, restaurants, volume) so partners don’t read flinch as coldness."
        },
        "Routine need":{
          note:"Prediction and sameness calm the nervous system; surprise has a real price.",
          work:"Advance notice of change beats last-minute pivots; transitions need buffer time on the calendar.",
          rel:"Tell people how much warning helps you — rituals are regulation tools, not rigidity for its own sake."
        },
        "Masking load":{
          note:"Performing ‘fine’ in public — scripting, copying, hiding stim — spends energy you pay for later.",
          work:"Schedule recovery after ‘successful’ social days; exhaustion after fitting in is information.",
          rel:"One trusted person who sees the unmasked version reduces the cost of constant performance."
        }
      };
      const v = notes[top.key]||{};
      top.note = v.note;
      const shape = gap<8
        ? top.key+" + "+second.key
        : top.key+" lead";
      return pack(
        first(name)+", «"+shape+"» ("+top.score+"/100; "+second.key+" "+second.score+"/100).",
        [
          "This is an educational trait screen informed by autism-spectrum themes (social communication, pattern/special-interest focus, sensory difference, need for predictability, and camouflaging). It is not an autism diagnosis and not a substitute for a qualified clinical assessment.",
          ...clinicalLead(top, second, low),
          ...clinicalWorkRel(top, v.work, v.rel),
          "Supports that help many people regardless of labels: written instructions, honest directness, quieter recovery, and permission to step out before overload.",
          citeBook("autism")
        ],
        "Only a qualified clinician can assess autism. Use this as a conversation starter about supports — not a label."
      );
    },
    adhd(scores, name){
      const shape = classifyProfile ? classifyProfile("adhd", scores) : null;
      const interpret = ADHD_INTERPRET;
      if (interpret && interpret.buildBrief) {
        let overall = 0, n = 0;
        scores.forEach(s => {
          if (s.score != null) { overall += s.score; n++; }
        });
        overall = n ? Math.round(overall / n) : 0;
        const b = interpret.buildBrief(scores, name, overall);
        const headline = shape
          ? first(name)+", «"+shape.title+"» (~"+overall+"% overall on this educational screen)."
          : b.headline;
        let bodyRaw = b.body;
        if (shape && bodyRaw.indexOf(shape.blurb) === -1) {
          bodyRaw = shape.blurb + " " + bodyRaw;
        }
        const cite = citeBook("adhd");
        if (cite && bodyRaw.indexOf("Educational reference") === -1) {
          bodyRaw = bodyRaw + " " + cite;
        }
        const body = padTo ? padTo(bodyRaw, 400, 520) : bodyRaw;
        const longform = padTo ? padTo(b.longform + (cite ? "\n\n"+cite : ""), 750, 1100) : b.longform;
        return { headline, body, watch: b.watch, longform };
      }
      const top = pick(scores);
      return pack(
        first(name)+", "+top.key.toLowerCase()+" is the loudest area ("+top.score+"/100).",
        ["This educational screen is not an ADHD diagnosis.", citeBook("adhd")],
        "Discuss persistent impairment with a licensed professional."
      );
    },
    depression(scores, name){
      const { top, second, low, gap } = trio(scores);
      const notes = {
        "Low mood":{
          note:"Sadness, numbness, and loss of interest — mood that does not lift when you ‘should’ feel better.",
          work:"Shrink the day to one visible win; do not measure worth by a full inbox.",
          rel:"Tell one person the mood is heavy without forcing cheer — presence beats pep talks."
        },
        "Energy / body":{
          note:"The body feels heavy; starting and sustaining action takes more fuel than it used to.",
          work:"Protect the first step of tasks — not the whole project. Behaviour before mood arguments.",
          rel:"Ask for concrete help (a meal, a walk) instead of waiting until you can ‘feel like’ connecting."
        },
        "Sleep & appetite":{
          note:"Sleep and food rhythms shift — insomnia, oversleeping, or appetite that no longer matches hunger.",
          work:"Fixed wake time and a wind-down cue matter more than perfect nights.",
          rel:"Partners can support routines without policing; share what mornings actually cost."
        },
        "Self-view":{
          note:"Harsh self-talk, guilt, and shame treat mistakes as identity instead of events.",
          work:"Write the thought, list evidence for and against, treat it as a hypothesis — CBT education, not a verdict.",
          rel:"Ask someone to reflect one fair strength you keep dismissing."
        },
        "Hopelessness":{
          note:"The future narrows; thoughts of not wanting to be here need a human response, not a score.",
          work:"Skip self-coaching on crisis thoughts — hand the pattern to a person tonight.",
          rel:"You do not have to explain the whole story; saying ‘I’m not safe in my head’ is enough to start."
        }
      };
      const v = notes[top.key]||{};
      top.note = v.note;
      const cbt = top.key==="Self-view"||top.key==="Hopelessness"
        ? "Cognitive-behavioural education (Beck / Burns tradition) treats thoughts as hypotheses to test: write the thought, list evidence for and against, and try one behaviour that contradicts the harshest sentence."
        : "Behaviour-first CBT: schedule one small action before you argue with mood (shower, walk, one message), and keep a fixed wind-down cue at night.";
      const shape = gap<8 ? top.key+" + "+second.key : top.key+" lead";
      return pack(
        first(name)+", «"+shape+"» ("+top.score+"/100).",
        [
          "This mood screen draws on cognitive-behavioural themes (mood, energy, sleep, self-criticism, hopelessness). It is not a depression diagnosis and not a substitute for licensed care.",
          ...clinicalLead(top, second, low),
          cbt,
          ...clinicalWorkRel(top, v.work, v.rel),
          "If hopelessness or self-harm items rang true, skip self-coaching and speak to a person tonight.",
          citeBook("depression")
        ],
        crisis
      );
    },
    love(scores, name){
      const { top, second, low, gap } = trio(scores);
      const meaning = {
        Words:"Hearing care out loud is how it becomes real. Silence can feel like cooling even when the week was loyal.",
        "Acts of service":"Help is the sentence. A repaired thing or a lifted chore lands as devotion.",
        Gifts:"A token that proves you were held in mind. Price is not the point; attention is.",
        Time:"Undivided presence. A phone on the table can undo an hour that looked free.",
        Touch:"The body is the channel. Distance without explanation reads as weather changing."
      };
      const askFor = {
        Words:"one specific appreciation said out loud (not texted after)",
        "Acts of service":"one chore lifted without being asked twice",
        Gifts:"one small token that proves you were thought of midweek",
        Time:"thirty phone-free minutes with eye contact",
        Touch:"a clear yes to the kind of closeness that lands for you"
      };
      return pack(
        patternLead(name, top, second, gap)+" Primary love channel: "+top.key.toLowerCase()+".",
        [meaning[top.key]||"",
         meaning[second.key] ? "Secondary "+second.key+" ("+second.score+"/100): "+meaning[second.key] : "",
         "Chapman’s five channels are preference dialects for feeling cared for — not a verdict on whether the relationship is “real.” Lead dialect this sitting: "+top.key+".",
         "Work. Colleagues are not partners, but appreciation still has a dialect — thank a teammate this week in your top channel (words, a favour, a small gift, focused time, or a warm handshake) and notice what lands.",
         "Relationships. Ask for "+(askFor[top.key]||top.key.toLowerCase())+". Offer "+second.key.toLowerCase()+" without keeping score for forty-eight hours. Do not wait to be thanked in your own dialect.",
         "Watch-out — lowest channel "+low.key+" ("+low.score+"/100): "+(LOVE_WATCH[low.key]||"You may under-give in this language even when you care."),
         gap<8 ? "Two channels tie — name both so a partner does not guess wrong." : ""],
        "Languages shift a little with stress. Recheck after a hard season.",
        citeFramework("love")
      );
    },
    attachment(scores, name){
      const shape = classifyProfile ? classifyProfile("attachment", scores) : null;
      const { top, second, low, gap } = trio(scores);
      const meaning = {
        "Secure ease":"Closeness and space can sit in the same room. Conflict is repairable. You can ask and you can wait.",
        "Anxious protest":"Distance rings like danger. Reassurance works — briefly — then the scan starts again. The work is soothing the body before sending the third message.",
        "Avoidant distance":"Independence is safety. Need feels like a trap. The work is staying one extra minute when you want to leave the conversation.",
        "Disorganized pull":"You want close and you want out. Mixed signals are the nervous system arguing with itself. Slow, predictable people help more than intense ones."
      };
      const workMove = {
        "Secure ease":"Offer repair after feedback without assuming the whole relationship is broken.",
        "Anxious protest":"Ask for one clear deadline or check-in time instead of reading silence as rejection.",
        "Avoidant distance":"Reply to one feedback thread before you cool off completely — presence beats perfect wording.",
        "Disorganized pull":"Pick one predictable weekly 1:1 and keep it even when mood swings."
      };
      const shapeTitle = shape ? shape.title : top.key.toLowerCase();
      return pack(
        first(name)+", «"+shapeTitle+"» — "+top.key+" leads ("+top.score+"/100), "+second.key+" next ("+second.score+"/100).",
        [(shape ? shape.blurb : ""),
         meaning[top.key]||"",
         meaning[second.key] ? "Secondary "+second.key+" ("+second.score+"/100): "+meaning[second.key] : "",
         "Levine & Heller (and Bowlby–Ainsworth roots) treat adult bonding as learned predictions about whether closeness is safe — patterns that can move with steady relationships and good therapy.",
         "Work. "+(workMove[top.key]||"Name whether you need clarity, autonomy, or repair after conflict.")+" Attachment shows up as how you handle feedback, deadlines, and manager distance.",
         "Relationships. Tell one person: when I lead with "+top.key.toLowerCase()+", what helps is X; what hurts is Y. Keep X small enough to try this week.",
         "Watch-out — quietest pull "+low.key+" ("+low.score+"/100): "+(ATTACH_WATCH[low.key]||"Notice when this style drops under fatigue."),
         gap<8 ? "Two pulls are close — you may flip styles under stress; name the flip out loud." : ""],
        "This is a relationship pattern screen, not a disorder label.",
        citeFramework("attachment")
      );
    },
    strengths(scores, name){
      const { top, second, low, gap } = trio(scores);
      const meaning = {
        Executing:"You turn intention into done. Teams stall less when you own the last mile.",
        Influencing:"You move opinion and energy. Rooms change temperature when you speak.",
        Relationship:"You hold people. Trust and memory of what matters to them are the craft.",
        "Strategic thinking":"You see the pattern before the slide exists. Questions are your tool."
      };
      const weekMove = {
        Executing:"block ninety minutes for finishing before any new start",
        Influencing:"pitch one idea with a clear ask and a written next step",
        Relationship:"schedule one genuine check-in that is not about status",
        "Strategic thinking":"write the three-question brief before the meeting, not during it"
      };
      return pack(
        patternLead(name, top, second, gap)+" Talent domain: "+top.key.toLowerCase()+".",
        [meaning[top.key]||"",
         meaning[second.key] ? "Secondary "+second.key+" ("+second.score+"/100): "+meaning[second.key] : "",
         "Gallup-style talent domains (executing, influencing, relationship-building, strategic thinking) are educational paraphrases — not CliftonStrengths® theme names or official items.",
         "Work. This week: "+(weekMove[top.key]||"use the lead domain before admin")+". Partner or delegate "+low.key.toLowerCase()+" tasks ("+low.score+"/100) instead of hero-fixing them first.",
         "Relationships. Your lead domain is how you show reliability — tell people «I contribute through "+top.key.toLowerCase()+"» so quiet zones are not misread as disinterest.",
         "Watch-out — lead overuse: "+(STRENGTHS_WATCH[top.key]||"Balance the lead domain with the rest of the team.")+" Weakest domain "+low.key+" is the one to tool or partner, not pretend is your gift.",
         gap<8 ? "Two domains lead together — design roles that use both." : ""],
        "Talent domains are habits of contribution, not a complete person.",
        citeFramework("strengths")
      );
    },
    career(scores, name){
      const { top, second, low, gap } = trio(scores);
      const meaning = {
        "Realistic / making":"Hands, tools, outdoors, finished objects. You trust what you can build or repair.",
        Investigative:"Questions, data, mechanisms. You want to know why it works.",
        Artistic:"Form, story, original make. A blank page is invitation more than threat.",
        Social:"People as the material. Teaching, care, counsel.",
        Enterprising:"Persuasion, venture, lead. A target in motion suits you.",
        Conventional:"Systems, records, reliable process. You keep complexity from rotting."
      };
      return pack(
        patternLead(name, top, second, gap)+" Holland code flavour: "+top.key+" + "+second.key+".",
        [meaning[top.key]||"",
         meaning[second.key] ? "Secondary "+second.key+" ("+second.score+"/100): "+meaning[second.key] : "",
         "Holland’s RIASEC model treats career fit as matching people to work environments — a two-letter flavour is more useful than a single job title.",
         "Work. Sample roles or projects that blend "+top.key+" and "+second.key+" before chasing a title. Mismatch feels like Sunday dread that outlasts one bad manager. Protect at least one weekly block that looks like your lead environment.",
         "Relationships. Partners see your RIASEC lead in how you talk about ambition — share the second code so they know what else feeds you, and name "+low.key+" ("+low.score+"/100) as the environment that drains you even for good money.",
         "Watch-out — lowest environment "+low.key+": forcing this kind of work will cost energy you need elsewhere.",
         gap<8 ? "Top environments are close — explore hybrid roles rather than forcing one letter." : ""],
        "This is a work-environment hint, not a job title or hiring decision.",
        citeFramework("career")
      );
    },
    archetype(scores, name){
      const { top, second, low, gap } = trio(scores);
      const meaning = {
        Innocent:"Trust and hope first. Shadow: denial when the facts are grim.",
        Explorer:"The map is not the territory. Shadow: leaving when staying would grow you.",
        Sage:"Understanding before action. Shadow: watching life instead of living it.",
        Hero:"Prove it against the obstacle. Shadow: a life that is only a contest.",
        Lover:"Intensity and bond. Shadow: losing yourself in the other.",
        Jester:"Play as truth-telling. Shadow: a joke where a feeling was needed.",
        Everyperson:"Belonging among equals. Shadow: shrinking so no one is threatened.",
        Caregiver:"Protect and provide. Shadow: resentful over-giving.",
        Ruler:"Order and responsibility. Shadow: control that smothers.",
        Creator:"Make what was not there. Shadow: the work matters more than the people.",
        Magician:"Transform the frame. Shadow: manipulation dressed as vision.",
        Outlaw:"Break the stale rule. Shadow: destruction without a better world behind it."
      };
      const shadow = (meaning[top.key]||"").split("Shadow:")[1];
      return pack(
        patternLead(name, top, second, gap)+" Archetype plot: "+top.key+".",
        [meaning[top.key]||"",
         meaning[second.key] ? "Secondary "+second.key+" ("+second.score+"/100): "+meaning[second.key] : "",
         "Pearson–Marr (Jungian tradition) treats archetypes as repeating mythic plots with gift and shadow — metaphor for motivation, not a clinical complex.",
         "Work. Notice which archetype you cast the team in — hero, ruler, sage, etc. — and whether the shadow of "+top.key+" is running the meeting. Invite "+second.key+" when the room needs that plot.",
         "Relationships. Partners experience your archetype as the emotional genre of the relationship; name the shadow before it picks the fight. Quietest plot "+low.key+" ("+low.score+"/100) can be a chapter invitation, not a failure.",
         shadow ? "Watch-out (shadow of "+top.key+"): "+shadow.trim() : "Watch-out — quietest archetype "+low.key+": you may be under-using this plot.",
         gap<8 ? "Top two archetypes are close — you are in a chapter change." : ""],
        "Archetypes are repeating plots, not costumes.",
        citeFramework("archetype")
      );
    },
    political(scores, name){
      const econL = scores.find(s=>s.key.includes("left"))||{score:50};
      const econR = scores.find(s=>s.key.includes("right"))||{score:50};
      const lib = scores.find(s=>s.key.includes("liberty"))||{score:50};
      const ord = scores.find(s=>s.key.includes("order"))||{score:50};
      const econLead = econL.score>=econR.score ? "economic fairness" : "market-led growth";
      const socLead = lib.score>=ord.score ? "personal liberty" : "shared order";
      const econGap = Math.abs(econL.score-econR.score);
      const socGap = Math.abs(lib.score-ord.score);
      return pack(
        first(name)+", lead values: "+econLead+" (left "+econL.score+" vs right "+econR.score+") and "+socLead+" (liberty "+lib.score+" vs order "+ord.score+").",
        ["Multi-axis civic ideology (Political Compass tradition): economic left–right and social liberty–order. People rarely disagree only about facts — they disagree about which moral good wins when two goods collide (care, fairness, loyalty, authority, sanctity, liberty).",
         "Your sitting leans "+econLead+" economically and "+socLead+" socially. That is a values sketch, not a party membership card.",
         "Work. Your axes show up in team debates about rules, budgets, and who gets flexibility — name which good you are optimising before arguing facts. If econ left/right sit close, say so out loud.",
         "Relationships. Couples fight politics as proxy for safety, fairness, or freedom; translate scores into needs («I need more X») not party labels. Steelman the opposite axis in one paragraph without sneering.",
         econGap<10 ? "Watch-out — economic scores are close (left "+econL.score+", right "+econR.score+"); you may hold mixed economic intuitions." : "Economic lean is clearer this sitting — still treat dissenters as holding a real good, not a villain script.",
         socGap<10 ? "Watch-out — social scores are close (liberty "+lib.score+", order "+ord.score+"); expect internal debate in crises." : "Social lean is clearer this sitting — practice hearing the other pole without collapsing into contempt."],
        "This is a values sketch, not a party membership or a call to hate.",
        citeFramework("political")
      );
    },
    disc(scores, name){
      const { top, second, low, gap } = trio(scores);
      const meaning = {
        Dominance:"You push through resistance. Speed and ownership.",
        Influence:"You warm a room and sell a future.",
        Steadiness:"You hold the pace and the people.",
        Conscientiousness:"You want it correct and documented."
      };
      const underThreat = {
        Dominance:"Dominance sharpens and may talk over people who needed a beat",
        Influence:"Influence gets louder and may over-promise",
        Steadiness:"Steadiness freezes or says yes while meaning not yet",
        Conscientiousness:"Conscientiousness over-checks and delays a good decision"
      };
      return pack(
        patternLead(name, top, second, gap)+" Visible DISC style: "+top.key+".",
        [meaning[top.key]||"",
         meaning[second.key] ? "Secondary "+second.key+" ("+second.score+"/100): "+meaning[second.key] : "",
         "Marston’s DISC tradition describes observable pace and priority — educational behavioural style, not a DiSC® licensed profile.",
         "Work. Under ordinary conditions you lead with "+top.key+"; under threat, "+(underThreat[top.key]||"that style gets louder")+". Pause before amplifying. Borrow "+low.key+" ("+low.score+"/100) when the room needs that letter.",
         "Relationships. People read your DISC letter as pace and priority; tell them when you are stressed so they do not misread sharpness, cheer, silence, or perfectionism as rejection.",
         "Watch-out — "+top.key+": "+(DISC_WATCH[top.key]||"")+" Quietest letter "+low.key+" is the behaviour to practise on purpose once this week.",
         gap<8 ? "Two letters lead — expect a blended style depending on the room." : ""],
        "Style is not character. You can still choose the letter the hour needs.",
        citeFramework("disc")
      );
    },
    eq(scores, name){
      const shape = classifyProfile ? classifyProfile("eq", scores) : null;
      const { top, second, low, gap } = trio(scores);
      const shapeTitle = shape ? shape.title : top.key.toLowerCase();
      const EQ_MEAN={
        "Self-awareness":"Naming what you feel while it is happening.",
        "Self-management":"Keeping the first impulse from owning the reply.",
        Motivation:"Staying with a long aim when the reward is distant.",
        Empathy:"Reading someone else’s state without projecting yours.",
        "Social skill":"Turning accurate reading into a useful response."
      };
      const drill = {
        "Self-awareness":"name the feeling in three words before you speak",
        "Self-management":"three breaths and a longer exhale before the reply",
        Motivation:"one next step written for the distant goal before email",
        Empathy:"ask «what is this like for you?» once before advising",
        "Social skill":"end one conversation with a clear next action both agree on"
      };
      return pack(
        first(name)+", «"+shapeTitle+"» — "+top.key+" leads ("+top.score+"/100), "+second.key+" next ("+second.score+"/100).",
        [(shape ? shape.blurb : ""),
         EQ_MEAN[top.key] ? "Lead competence: "+EQ_MEAN[top.key] : "",
         EQ_MEAN[second.key] ? "Secondary "+second.key+" ("+second.score+"/100): "+EQ_MEAN[second.key] : "",
         "Goleman’s emotional-competence model (self-awareness, self-management, motivation, empathy, social skill) is trainable — EQ is not a fixed IQ replacement.",
         "Work. Your lead EQ muscle is how colleagues experience you under stress — name it in retros so they do not guess. Practice: "+(drill[top.key]||"one small daily drill on the lead skill")+".",
         "Relationships. Train the quietest skill "+low.key+" ("+low.score+"/100): "+(drill[low.key]||"pause three breaths before the reply that feels best in ten seconds and worst in ten days")+".",
         "Watch-out — "+low.key+": "+(EQ_WATCH[low.key]||"Train this competence in one small daily drill."),
         gap<8 ? "Two competences lead — use both under pressure, not only the louder one." : ""],
        "EQ can be trained. A low score is a starting point, not a trait carved in stone.",
        citeFramework("eq")
      );
    },
    character(scores, name){
      const { top, second, low, gap } = trio(scores);
      const meaning = {
        Wisdom:"Curiosity, judgement, perspective. You want the true picture more than the fast one.",
        Courage:"Honesty, persistence, grit. You can stay when leaving would be easier.",
        Humanity:"Kindness and close love. People are not a side quest.",
        Justice:"Fairness and citizenship. The group’s rules matter.",
        Temperance:"Forgiveness, humility, self-control. You can put a lid on an impulse.",
        Transcendence:"Awe, gratitude, hope. Something larger than the to-do list still counts."
      };
      return pack(
        patternLead(name, top, second, gap)+" Signature virtue family: "+top.key.toLowerCase()+".",
        [meaning[top.key]||"",
         meaning[second.key] ? "Secondary "+second.key+" ("+second.score+"/100): "+meaning[second.key] : "",
         "Peterson & Seligman (VIA) organise character into six virtue families and many signature strengths — educational paraphrase only; not VIA-IS item text.",
         "Work. Deploy "+top.key.toLowerCase()+" on purpose in one project this week; notice where cultivating "+low.key.toLowerCase()+" ("+low.score+"/100) would have prevented your usual mistake.",
         "Relationships. Virtues show up as what you praise and what you punish — tell someone which family you are over-using ("+top.key+") and which you under-name ("+low.key+").",
         "Watch-out — lead vice risk: "+(CHARACTER_WATCH[top.key]||"")+" A virtue at eleven becomes a vice; quietest family "+low.key+" is worth cultivating, not ignoring.",
         gap<8 ? "Two virtue families lead — signature strength may sit across both." : ""],
        "VIA-style families describe strengths at your best, not a complete moral report.",
        citeFramework("character")
      );
    },
    bpd(scores, name){
      const { top, second, low, gap } = trio(scores);
      const notes = {
        "Emotion intensity":{
          note:"Feeling arrives fast and large; the body treats a slight as an emergency.",
          work:"Name the wave, wait for the peak, choose a next action that is not the first plan anger offered.",
          rel:"Tell one person what ‘settling’ looks like for you (time, space, a walk) before the next spike."
        },
        "Relationship panic":{
          note:"Distance rings like danger; one person can become the whole weather system.",
          work:"Keep more than one supportive contact in the week so one silence is not the whole sky.",
          rel:"Ask for what would help instead of testing; reassurance works longer when paired with your own soothing."
        },
        "Identity shift":{
          note:"Self-picture slides with context — who you are seems to depend on who just left the room.",
          work:"Hold one standing fact about yourself that does not need today’s mood to be true.",
          rel:"Share values that stay put across relationships so partners aren’t guessing which ‘you’ is home."
        },
        "Impulsivity":{
          note:"Urge outruns the plan; relief now can write a longer problem.",
          work:"Insert minutes — not hours — between urge and act (send, spend, leave).",
          rel:"Agree a pause signal with someone you trust for heat-of-the-moment messages."
        },
        "Emptiness":{
          note:"After the spike, a hollow stretch; numbing masquerades as calm.",
          work:"Use a small sensory anchor (feet, water, a walk) instead of hunting the next intensity.",
          rel:"Empty does not mean unlovable — say ‘I feel hollow’ rather than picking a fight to feel something."
        }
      };
      const v = notes[top.key]||{};
      top.note = v.note;
      const shape = gap<8 ? top.key+" / "+second.key : top.key+" lead";
      return pack(
        first(name)+", «"+shape+"» ("+top.score+"/100).",
        [
          "This educational screen reflects emotion-regulation and relationship-intensity themes (emotion intensity, abandonment sensitivity, identity instability, impulsivity, emptiness). It is trait reflection — not a borderline-personality diagnosis and never a character insult.",
          ...clinicalLead(top, second, low),
          ...clinicalWorkRel(top, v.work, v.rel),
          "Biosocial frame, in plain language: a sensitive alarm plus years of being told the alarm was wrong. Validation first, then one skilful next step — notice the present, ride distress, name emotion, ask clearly in relationships (Linehan-informed skills education).",
          "If items about self-harm or not wanting to be here were true, stop using this page as care. Contact a person: local emergency services, 988 in the US, or Samaritans 116 123 in the UK.",
          citeBook("bpd")
        ],
        crisis
      );
    },
    bipolar(scores, name){
      const { top, second, low, gap } = trio(scores);
      const notes = {
        "Elevation":{
          note:"Unusually upbeat drive, racing thoughts, or ‘on top of the world’ stretches that outrun ordinary stress.",
          work:"Cap new commitments in ‘up’ weeks; write decisions down and revisit after sleep.",
          rel:"Ask a trusted person to flag when your pace leaves them worried — outside observers matter."
        },
        "Low stretch":{
          note:"Heavy, slowed, withdrawn phases where interest and confidence sink together.",
          work:"Shrink goals to maintenance; do not judge the whole career by a low climate week.",
          rel:"Name the low without forcing cheer; small presence beats fixing."
        },
        "Sleep shift":{
          note:"Sleep need changes with the wave — less sleep while still wired, or sleep that never restores.",
          work:"Sleep is infrastructure: fixed wake time, fewer all-nighters in ‘up’ phases.",
          rel:"Partners can help protect wind-down without becoming the sleep police."
        },
        "Drive / risk":{
          note:"Impulsive projects, spending, speed, or rule-bending when energy climbs.",
          work:"A 24-hour rule for money, messages, and big pivots in elevated phases.",
          rel:"Share the plan before the rush — co-signing a pause is care, not control."
        },
        "Cycle pattern":{
          note:"Others notice a climate to your weeks; ups and downs last days, not minutes.",
          work:"Track energy and sleep for two weeks as data for a clinician — not as self-diagnosis.",
          rel:"Tell people the pattern is wave-like so they don’t personalise every climate change."
        }
      };
      const v = notes[top.key]||{};
      top.note = v.note;
      const shape = gap<8 ? "mixed mood–energy" : top.key+" lead";
      return pack(
        first(name)+", «"+shape+"» ("+top.score+"/100; "+second.key+" "+second.score+"/100).",
        [
          "This educational screen reflects bipolar-spectrum themes: mood–energy waves, sleep change, drive/risk, and cycle pattern — not a bipolar diagnosis and not prescriber advice.",
          ...clinicalLead(top, second, low),
          ...clinicalWorkRel(top, v.work, v.rel),
          top.key==="Sleep shift"||second.key==="Sleep shift"
            ? "If sleep and mood keep rewriting each other, bring the pattern — dates, sleep hours, and outside observations — to a licensed clinician."
            : "Ordinary stress, substances, and sleep loss can mimic pieces of this pattern. Duration, impairment, and outside observers matter more than one sitting.",
          citeBook("bipolar")
        ],
        "Only a clinician can assess bipolar spectrum conditions. This screen cannot."
      );
    },
    narcissism(scores, name){
      const { top, second, low, gap } = trio(scores);
      const notes = {
        "Grand self-view":{
          note:"A sense of being more capable, destined, or exceptional than the room.",
          work:"Test specialness claims against peer feedback and finished work — not against the inner narrator alone.",
          rel:"Practice one conversation where you are curious longer than you are impressive."
        },
        "Need for admiration":{
          note:"Praise and visibility lift mood; being overlooked feels like a wound.",
          work:"Separate craft quality from applause volume; schedule work that nobody will clap for.",
          rel:"Ask for specific appreciation you can use — and offer it without keeping a scoreboard."
        },
        "Entitlement":{
          note:"Rules and queues feel like they should bend for your situation.",
          work:"Apply the same standard you expect from others once this week on purpose.",
          rel:"Notice when ‘my time matters more’ is running the shared plan."
        },
        "Empathy dip":{
          note:"Attention sticks on status threat; others’ feelings register late or as inconvenience.",
          work:"In meetings, ask one question about someone else’s constraint before pitching yours.",
          rel:"After a slight, stay curious about the other person’s night before defending your image."
        },
        "Vulnerability":{
          note:"Confidence sits atop a thin skin — slights replay, shame follows fast.",
          work:"Treat thin skin as data: recover before replying when criticism lands in the body.",
          rel:"Name the bruise without collapsing into grandiosity or attack — both are shields."
        }
      };
      const v = notes[top.key]||{};
      top.note = v.note;
      const shape = gap<8 ? top.key+" + "+second.key : top.key+" lead";
      return pack(
        first(name)+", «"+shape+"» ("+top.score+"/100).",
        [
          "This trait spectrum screen explores grandiosity, admiration hunger, entitlement, empathy balance, and vulnerability beneath display — dimensional reflection, not a narcissistic-personality diagnosis and not a courtroom verdict.",
          ...clinicalLead(top, second, low),
          ...clinicalWorkRel(top, v.work, v.rel),
          low.key==="Empathy dip" ? "Your relatively lower empathy-dip score suggests curiosity about others still has room to lead after a slight." : "Grand self-view and admiration hunger often share a floor with vulnerability — the part that hates feeling ordinary.",
          "A useful check: after a slight, can you stay curious about the other person’s night, or does the whole field collapse into ‘do they see me?’",
          citeBook("narcissism")
        ],
        "A high score is a mirror for growth, not a weapon to use against yourself or someone else."
      );
    },
    trauma(scores, name){
      const { top, second, low, gap } = trio(scores);
      const notes = {
        "Hyperarousal":{
          note:"Body on watch — startle, tension, scan-for-exit, irritability.",
          work:"Step down stimulation before analysing; shorter meetings after startle-heavy mornings.",
          rel:"Tell trusted people you may need exits and quieter rooms without a full story."
        },
        "Numbing":{
          note:"Feeling cut off from joy, body, or people; going flat to survive.",
          work:"Tiny sensory anchors beat forcing ‘gratitude’ when the volume is off.",
          rel:"Flat is a nervous-system state — ask for company that does not demand performance."
        },
        "Intrusion":{
          note:"Unwanted memories, dreams, or body flash when reminders appear.",
          work:"Grounding without a theory: both feet on the floor, five visible objects, longer exhale than inhale.",
          rel:"You can name ‘a memory showed up’ without narrating the whole event."
        },
        "Avoidance":{
          note:"Steering away from places, topics, or feelings that touch the wound.",
          work:"Tiny tolerated exposures with a trusted person beat heroic storytelling.",
          rel:"Avoidance protected you once; share one safe edge you are willing to widen this month."
        },
        "Safety beliefs":{
          note:"Trust, hope, and self-worth shrink after overwhelming events.",
          work:"Rebuild safety in the body first; meaning-making can wait until the alarm is quieter.",
          rel:"Trust is earned in small predictable doses — not in one big disclosure."
        }
      };
      const v = notes[top.key]||{};
      top.note = v.note;
      const shape = gap<8 ? "mixed aftereffect pattern" : top.key+" lead";
      return pack(
        first(name)+", «"+shape+"» ("+top.score+"/100).",
        [
          "This trauma-informed screen (hyperarousal, numbing, intrusion, avoidance, and shaken safety beliefs) is not a PTSD diagnosis and not a demand to tell your story.",
          ...clinicalLead(top, second, low),
          ...clinicalWorkRel(top, v.work, v.rel),
          "Recovery, in plain terms: stabilise the body first, then process with support at a pace that does not re-flood you, then widen life again. None of that has to be fast or alone.",
          "If memories or urges feel unmanageable, use a crisis line or a trauma-trained clinician.",
          citeBook("trauma")
        ],
        crisis
      );
    }
  };
  BRIEFS.personality = function(scores, name){
    return BRIEFS.big5(scores, name, "personality");
  };

  function hashStr(s){
    let h=2166136261;
    for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); }
    return h>>>0;
  }
  function pickOne(seed, arr){ return arr[Math.abs(seed)%arr.length]; }

  export const personaliseReport = function(brief, scores, name, testTitle, answers){
    const numeric = (scores||[]).filter(s=>s.score!=null).sort((a,b)=>b.score-a.score);
    const top = numeric[0] || {key:"this pattern", score:50};
    const second = numeric[1] || {key:"a quieter trait", score:40};
    const low = numeric[numeric.length-1] || {key:"a low area", score:30};
    const gap = Math.abs((top.score||0)-(second.score||0));
    const mean = numeric.length ? Math.round(numeric.reduce((a,s)=>a+s.score,0)/numeric.length) : 50;
    const spread = numeric.length ? Math.max(...numeric.map(s=>s.score))-Math.min(...numeric.map(s=>s.score)) : 0;
    const seed = hashStr((name||"")+"|"+testTitle+"|"+numeric.map(s=>s.key+":"+s.score).join("|")+"|"+(answers||[]).join(""));
    const first = (name||"You").split(" ")[0];
    const tone = pickOne(seed, ["direct","measured","warm","precise","plain"]);
    const image = pickOne(seed+1, ["a dashboard rather than a verdict","a weather map for this sitting","a wiring diagram of attention","a field note from how you answered today"]);
    const workMove = pickOne(seed+2, ["protect a ninety-minute block for the lead trait before meetings start","write the first step of the avoided task on paper before opening email","ask one colleague which score they would have guessed and why","end one meeting with a single decision written down"]);
    const relMove = pickOne(seed+3, ["name the lead need in one sentence before a hard talk","stay one extra minute when you want to leave the conversation","ask what reassurance actually looks like for the other person","trade one criticism for one specific request"]);
    const scoreLines = numeric.map(s=>s.key+" "+s.score+"/100").join("; ");
    const shape = gap<8
      ? first+", the top two scores sit close ("+top.key+" "+top.score+" and "+second.key+" "+second.score+"). This is a mixed profile."
      : first+", "+top.key+" leads by "+gap+" points over "+second.key+".";
    const spreadLine = spread>=35 ? "The spread is wide ("+spread+" points)." : "The profile is relatively even (spread "+spread+", average "+mean+").";
    const testIdGuess = (function(){
      const meta = TEST_META || [];
      const hit = meta.find(t => String(t.title||"").toLowerCase() === String(testTitle||"").toLowerCase());
      return hit ? hit.id : "";
    })();
    const ref = typeof referenceNote === "function" ? referenceNote(testIdGuess) : null;
    const refLine = ref ? ref.text : "";
    const PERSONALITY_PACK = {
      personality:1, big5:1, sixteen:1, enneagram:1, love:1, attachment:1,
      strengths:1, career:1, archetype:1, political:1, disc:1, eq:1, character:1
    };
    const completedClose = PERSONALITY_PACK[testIdGuess]
      ? "You completed the "+testTitle+" assessment (100 items) — next action: practise your lead pattern «"+top.key+"» once this week on purpose (one work block, one conversation, or one clear ask)."
      : "";
    const uniqueSnap = [
      first+", this "+testTitle+" report is "+image+". Tone: "+tone+".",
      shape+" "+spreadLine,
      refLine,
      "Exact stack: "+scoreLines+".",
      brief.body,
      "Contrast: "+top.key+" ("+top.score+") against "+low.key+" ("+low.score+").",
      "Work move: "+workMove+".",
      "Relationship move: "+relMove+".",
      brief.watch
    ].filter(Boolean).join("\n\n");
    const uniqueFull = [
      uniqueSnap,
      "This is not a generic letter. Your fingerprint is the order "+numeric.map(s=>s.key).join(" → ")+".",
      "When "+top.key+" runs the day, "+second.key+" is backup. When the day goes badly, "+low.key+" drops first.",
      "Fourteen-day experiment for "+first+": morning line on "+top.key+"; evening line on "+low.key+".",
      completedClose,
      ref && ref.clinical
        ? "Educational pattern screen only — you completed a self-report sitting, not a diagnosis. Discuss persistent impairment with a licensed clinician. Crisis: emergency services, 988 (US), Samaritans 116 123 (UK)."
        : "Educational only, not a diagnosis. Crisis: emergency services, 988 (US), Samaritans 116 123 (UK)."
    ].filter(Boolean).join("\n\n");
    brief.body = padTo(uniqueSnap, 400, 480);
    brief.longform = padTo(uniqueFull, 900, 1400);
    brief.fingerprint = seed.toString(16);
    return brief;
  };

  // Book sources and theoretical frameworks for each assessment
  // Personality pack citations mirror docs/REFERENCES.md (primary local PDFs).
  // screenNote = short educational reference line for PDF / extended reports (no scale claims).
  export const BOOK_SOURCES = {
    big5: {
      bookTitle: "Personality in Adulthood: A Five-Factor Theory Perspective (2nd ed.)",
      authors: "Robert R. McCrae & Paul T. Costa Jr.",
      theory: "Five-Factor Model (OCEAN) — openness, conscientiousness, extraversion, agreeableness, neuroticism/emotional sensitivity",
      vibe: "The Gold Standard in Trait Psychology",
      emoji: "🌊",
      screenNote: "Five-Factor Model themes (OCEAN) for educational self-understanding — not a clinical inventory."
    },
    sixteen: {
      bookTitle: "Gifts Differing: Understanding Personality Type",
      authors: "Isabel Briggs Myers & Peter B. Myers",
      theory: "Sixteen preference types (E–I, S–N, T–F, J–P) in the Jungian / Myers tradition",
      vibe: "Your Cognitive Wiring & Energy Flow",
      emoji: "🧩",
      screenNote: "Jungian / Myers preference themes for educational reflection — not an official MBTI® certification."
    },
    enneagram: {
      bookTitle: "The Wisdom of the Enneagram",
      authors: "Don Richard Riso & Russ Hudson",
      theory: "Nine types — core motivation, stress/security directions, levels of development (paraphrased)",
      vibe: "Your Core Emotional Drive & Growth Direction",
      emoji: "✨",
      screenNote: "Nine-type motivation themes (Riso & Hudson tradition) for growth reflection — educational paraphrase only."
    },
    attachment: {
      bookTitle: "Attached: The New Science of Adult Attachment",
      authors: "Amir Levine & Rachel S. F. Heller; Bowlby–Ainsworth attachment theory",
      theory: "Secure, anxious, avoidant, and fearful-avoidant adult bonding patterns",
      vibe: "How You Connect, Bond & Trust in Relationships",
      emoji: "💖",
      screenNote: "Adult attachment pattern themes for relationship insight — learned styles, not a disorder label."
    },
    love: {
      bookTitle: "The 5 Love Languages",
      authors: "Gary Chapman",
      theory: "Words of affirmation, quality time, gifts, acts of service, physical touch — preference channels",
      vibe: "How You Naturally Give & Receive Love",
      emoji: "💌",
      screenNote: "Love-language preference channels for communication — one model among many, not a relationship verdict."
    },
    strengths: {
      bookTitle: "StrengthsFinder 2.0",
      authors: "Tom Rath & Donald O. Clifton (Gallup CliftonStrengths tradition — study copy)",
      theory: "Four talent domains: executing, influencing, relationship-building, strategic thinking (conceptual only)",
      vibe: "Where Your Natural Talent Becomes Performance",
      emoji: "⚡",
      screenNote: "Talent-domain themes for work design — conceptual only; not CliftonStrengths® items or theme definitions."
    },
    eq: {
      bookTitle: "Emotional Intelligence",
      authors: "Daniel Goleman",
      theory: "Self-awareness, self-regulation/self-management, motivation, empathy, social skill",
      vibe: "Reading the Room & Owning Your Inner Calm",
      emoji: "🧠",
      screenNote: "Goleman-style emotional competence themes for practice — educational, not a fixed clinical EQ score."
    },
    adhd: {
      bookTitle: "Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment (4th ed.)",
      authors: "Russell A. Barkley (Editor)",
      theory: "Educational themes only: inattention, hyperactivity, impulsivity, executive self-regulation, emotional dysregulation, time & motivation (not a diagnostic instrument)",
      vibe: "Understanding Focus, Energy & Follow-Through Patterns",
      emoji: "🎯",
      screenNote: "Barkley-informed educational themes: Domains reflect inattention, restlessness, impulsivity, executive self-regulation, emotional dysregulation, and time/motivation — not a diagnosis and not a copyrighted clinical scale."
    },
    autism: {
      bookTitle: "The Complete Guide to Asperger’s Syndrome (autism-spectrum conceptual literature)",
      authors: "Tony Attwood; Baron-Cohen systemizing–empathizing themes (conceptual only)",
      theory: "Social communication, sensory sensitivity, routines, special interests, masking, pattern thinking — educational trait screen, not ASD diagnosis",
      vibe: "Deep Pattern Recognition & Sensory Landscape",
      emoji: "🌈",
      screenNote: "Attwood / spectrum-informed educational themes: Domains reflect social communication, sensory sensitivity, routines, special interests, masking, and pattern thinking — not an ASD diagnosis and not a copyrighted clinical scale."
    },
    career: {
      bookTitle: "A Theory of Vocational Choice",
      authors: "John L. Holland (Journal of Counseling Psychology, 1959)",
      theory: "RIASEC work environments — Realistic, Investigative, Artistic, Social, Enterprising, Conventional",
      vibe: "Work Environments That Match Your Attention",
      emoji: "🎯",
      screenNote: "Holland RIASEC work-environment themes for career reflection — not a hiring or licensing decision."
    },
    disc: {
      bookTitle: "Emotions of Normal People",
      authors: "William Moulton Marston; modern DISC behavioural-style tradition",
      theory: "Dominance, Influence, Steadiness, Conscientiousness — pace, priorities, communication under stress",
      vibe: "Your Action, Team & Communication Pace",
      emoji: "⚡",
      screenNote: "Marston DISC behavioural-pace themes for teamwork — educational style, not a DiSC® licensed profile."
    },
    archetype: {
      bookTitle: "Introduction to Archetypes (Pearson–Marr Archetype Indicator companion)",
      authors: "Carol S. Pearson & Hugh K. Marr (Jungian tradition)",
      theory: "Twelve recurring mythic plots — gift and shadow",
      vibe: "Your Mythic Story & Guiding Inner Hero",
      emoji: "🔮",
      screenNote: "Pearson–Marr / Jungian mythic-plot themes for story reflection — metaphor only, not a clinical complex."
    },
    character: {
      bookTitle: "Character Strengths and Virtues: A Handbook and Classification",
      authors: "Christopher Peterson & Martin E. P. Seligman (VIA)",
      theory: "Six virtues and twenty-four character strengths — signature vs. lesser strengths",
      vibe: "Signature Strengths You Use at Your Best",
      emoji: "⚖️",
      screenNote: "VIA virtue-family themes for signature-strength reflection — educational paraphrase; not VIA-IS item text."
    },
    political: {
      bookTitle: "Political Identity (multi-axis civic ideology materials)",
      authors: "Wayne Brittenden & Pace Political Research Foundation (Political Compass tradition)",
      theory: "Economic axis (state vs. market) and social axis (authority vs. liberty)",
      vibe: "How You See Society, Freedom & Community",
      emoji: "🧭",
      screenNote: "Multi-axis civic-values themes for descriptive reflection — values map, not party membership."
    },
    depression: {
      bookTitle: "Cognitive Therapy of Depression; Feeling Good (CBT mood model)",
      authors: "Aaron T. Beck, A. John Rush, Brian F. Shaw & Gary Emery; David D. Burns",
      theory: "CBT mood themes — low mood, energy, sleep, self-view, hopelessness (educational screen only; not a diagnosis)",
      vibe: "Gentle Check-In on Your Emotional Well-Being",
      emoji: "🌱",
      screenNote: "Beck / Burns CBT and Feeling Good–informed educational themes: Domains reflect mood, energy, sleep, cognition, and self-view — a mood pattern screen only, not a depression diagnosis and not a copyrighted clinical scale."
    },
    trauma: {
      bookTitle: "The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma",
      authors: "Bessel van der Kolk, M.D.",
      theory: "Trauma-informed aftereffect themes — hyperarousal, numbing, intrusion, avoidance, safety beliefs (not a PTSD diagnosis)",
      vibe: "Honoring Your Nervous System & Inner Strength",
      emoji: "🛡️",
      screenNote: "van der Kolk / trauma-informed educational themes: Domains reflect hypervigilance, avoidance, re-experiencing, numbness, somatic stress, and trust — a pattern screen only, not a PTSD diagnosis and not a copyrighted clinical scale."
    },
    bipolar: {
      bookTitle: "Manic-Depressive Illness; An Unquiet Mind",
      authors: "Frederick K. Goodwin & Kay Redfield Jamison; Kay Redfield Jamison (patient perspective)",
      theory: "Energy cycles, mood elevation, irritability, sleep reduction, goal pursuit, depressive contrast — spectrum education only",
      vibe: "Tracking Your Energy Cycles & Emotional Rhythms",
      emoji: "🌊",
      screenNote: "Goodwin & Jamison spectrum-education themes: Domains reflect energy cycles, mood elevation, irritability, sleep reduction, goal pursuit, and depressive contrast — spectrum education only, not a bipolar diagnosis and not a copyrighted clinical scale."
    },
    bpd: {
      bookTitle: "Cognitive-Behavioral Treatment of Borderline Personality Disorder",
      authors: "Marsha M. Linehan",
      theory: "Emotion intensity, abandonment sensitivity, identity instability, impulsivity, relationship turbulence — trait reflection only",
      vibe: "Navigating Big Feelings with Compassion",
      emoji: "🎨",
      screenNote: "Linehan / DBT-informed educational themes: Domains reflect emotion intensity, abandonment sensitivity, identity instability, impulsivity, and relationship turbulence — trait reflection only, not a personality-disorder label and not a copyrighted screening instrument."
    },
    narcissism: {
      bookTitle: "Narcissism spectrum psychoeducation (Kernberg / Kohut; modern dimensional models)",
      authors: "Otto F. Kernberg; Heinz Kohut; contemporary narcissism-spectrum study materials",
      theory: "Grandiosity, entitlement, empathy variability, validation seeking, vulnerability beneath display — dimensional, not name-calling",
      vibe: "True Self-Esteem vs. Public Validation",
      emoji: "🪞",
      screenNote: "Dimensional narcissism-spectrum themes (Kernberg / Kohut tradition): Domains reflect grandiosity, entitlement, empathy variability, validation seeking, and vulnerability beneath display — reflection only, not a disorder label and not a copyrighted clinical scale."
    },
    personality: {
      bookTitle: "Revised NEO Personality Inventory (NEO PI-R) and NEO Five-Factor Inventory (NEO-FFI) professional manual; see also Personality in Adulthood (5-factor theory)",
      authors: "Paul T. Costa Jr. & Robert R. McCrae; McCrae & Costa",
      theory: "Same five factors as Big 5 — educational OCEAN profile (original items; no copyrighted inventory text)",
      vibe: "Your Unique Mix of Habits, Dreams & Style",
      emoji: "🌟",
      screenNote: "Five-Factor Model themes (Costa & McCrae NEO tradition / Personality in Adulthood) for educational self-understanding — original items only; not a clinical inventory."
    }
  };

  /**
   * Short educational screen notes keyed by TEST_META id.
   * Consumed by app.js openDesignedReport via REFERENCE_SCREEN_NOTES[testId].
   * Themes follow docs/REFERENCES.md — no diagnosis claims, no copyrighted scale text.
   */
  export const REFERENCE_SCREEN_NOTES = {
    personality: "Five-Factor Model (McCrae & Costa) themes for educational self-understanding: openness, conscientiousness, extraversion, agreeableness, and emotional sensitivity. Original educational items only — not a clinical inventory.",
    big5: "Five-Factor / OCEAN trait themes (McCrae & Costa) describe style and preference patterns across openness, conscientiousness, extraversion, agreeableness, and emotional sensitivity. Educational profile only — not a clinical personality inventory.",
    sixteen: "Jungian / Myers preference themes from Gifts Differing (energy, information, decisions, lifestyle) for educational reflection. Type codes are shorthand for habits of attention — not an official MBTI® certification.",
    enneagram: "Nine-type motivation themes in the Riso & Hudson tradition (core drive, stress/security directions) for growth reflection. Educational paraphrase of type motives — not a fixed identity label.",
    autism: "Attwood / spectrum-informed educational themes: Domains reflect social communication, sensory sensitivity, routines, special interests, masking, and pattern thinking — not an ASD diagnosis and not a copyrighted clinical scale.",
    adhd: "Barkley-informed educational themes: Domains reflect inattention, restlessness, impulsivity, executive self-regulation, emotional dysregulation, and time/motivation — not a diagnosis and not a copyrighted clinical scale.",
    depression: "Beck / Burns CBT and Feeling Good–informed educational themes: Domains reflect mood, energy, sleep, cognition, and self-view — a mood pattern screen only, not a depression diagnosis and not PHQ-9. If you feel unsafe or have crisis thoughts, contact local emergency services or 988 (US) / Samaritans 116 123 (UK).",
    love: "Chapman’s love-language preference channels (words, time, gifts, acts of service, touch) for communication insight. One model among many — not a relationship verdict.",
    attachment: "Adult attachment pattern themes (Levine & Heller; Bowlby–Ainsworth): secure, anxious, avoidant, and fearful-avoidant bonding styles. Learned predictions about closeness — not a disorder label.",
    strengths: "Gallup-style talent-domain themes (executing, influencing, relationship-building, strategic thinking) for work design — conceptual only. Not CliftonStrengths® items or theme definitions.",
    career: "Holland RIASEC work-environment themes (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) for career reflection. Educational fit map — not a hiring or licensing decision.",
    archetype: "Pearson–Marr / Jungian mythic-plot themes (gift and shadow) for story reflection. Metaphor for guiding plots — not a clinical complex or licensed PMAI® result.",
    political: "Multi-axis civic-values themes (economic state↔market; social authority↔liberty) for descriptive reflection. A values map — not party membership or electioneering.",
    disc: "Marston DISC behavioural-pace themes (Dominance, Influence, Steadiness, Conscientiousness) for teamwork and communication under stress. Educational style language — not a DiSC® licensed profile.",
    eq: "Goleman-style emotional competence themes (self-awareness, self-management, motivation, empathy, social skill) for practice. Educational skills map — not a fixed clinical EQ score.",
    character: "VIA virtue-family themes (Peterson & Seligman) for signature-strength reflection across six virtue families. Educational paraphrase only — not VIA-IS item text.",
    bpd: "Linehan / DBT-informed educational themes: Domains reflect emotion intensity, abandonment sensitivity, identity instability, impulsivity, and relationship turbulence — trait reflection only, not a personality-disorder label and not MSI-BPD. If distress feels overwhelming, reach a person or crisis line (988 US / 116 123 UK).",
    bipolar: "Goodwin & Jamison spectrum-education themes: Domains reflect energy cycles, mood elevation, irritability, sleep reduction, goal pursuit, and depressive contrast — spectrum education only, not a bipolar diagnosis and not MDQ.",
    narcissism: "Dimensional narcissism-spectrum themes (Kernberg / Kohut tradition): Domains reflect grandiosity, entitlement, empathy variability, validation seeking, and vulnerability beneath display — reflection only, not a disorder label and not NPI.",
    trauma: "van der Kolk / trauma-informed educational themes: Domains reflect hypervigilance, avoidance, re-experiencing, numbness, somatic stress, and trust — a pattern screen only, not a PTSD diagnosis and not PCL-5. Stabilise with support; crisis help: 988 (US) / Samaritans 116 123 (UK)."
  };

  /** Clinical / spectrum test ids (matches tests.js clinical:true). */
  export const CLINICAL_TEST_IDS = ["adhd", "autism", "depression", "bpd", "bipolar", "narcissism", "trauma"];

  /**
   * Shared reference note for PDF / extended reports.
   * Prefer REFERENCE_SCREEN_NOTES / REFERENCE_NOTES, then BOOK_SOURCES.screenNote.
   * Clinical tests → educational screen frame; personality → lighter framework line.
   */
  const REFERENCE_NOTES = REFERENCE_SCREEN_NOTES;

  export const referenceNote = function(testId){
    const id = String(testId || "");
    const book = (BOOK_SOURCES || {})[id] || null;
    const notes = REFERENCE_NOTES || REFERENCE_SCREEN_NOTES || {};
    const meta = (TEST_META || []).find(t => t.id === id);
    const clinical = !!(meta && meta.clinical) || (CLINICAL_TEST_IDS || []).indexOf(id) >= 0;
    const text = notes[id] || (book && book.screenNote) || (clinical
      ? "Educational pattern screen only — not a diagnosis and not a copyrighted clinical scale."
      : (book ? ("Framework: " + book.theory) : null));
    if(!text) return null;
    return {
      clinical: clinical,
      label: clinical ? "Educational screen themes" : "Educational framework",
      text: text,
      bookTitle: book && book.bookTitle,
      authors: book && book.authors
    };
  };

  // Pre-bundled notes for instant offline / local execution without CORS or network 404s
  export const TEST_NOTES = {
    "16 Personalities": "SNAPSHOT FRAME\nEducational Myers–Briggs-style preferences (Gifts Differing / Jungian tradition) — not an official MBTI® certification.\n\nFour pairs: Energy (E–I), Information (S–N), Decisions (T–F), Lifestyle (J–P). Type code is shorthand for habits of attention.\n\nGROWTH\nUse the preferred pair on purpose. Practice the other pair in a low-stakes hour. Friction in close relationships often sits on how you decide and how planned the week feels.",
    "ADHD": "SNAPSHOT FRAME\nEducational pattern screen — not a diagnosis. Six domains as percentages: focus & attention, restlessness, impulse control, getting started & finishing, feelings & stress, time & follow-through.\n\nREAD THE SHAPE\nOverall % is a headline; your top domains make the profile individual.\n\nWHAT HELPS\nExternal memory, one next step, movement breaks, pause before send/buy, visible deadlines.\n\nLIMIT\nLicensed professionals interpret ADHD with history and impact — this tool cannot.",
    "Archetype": "SNAPSHOT FRAME\nPearson–Marr / Jungian mythic plots — gift and shadow arrive together. Not a clinical complex.\n\nRead the top two if scores are close. Innocent trust/denial. Explorer map/leaving. Sage understanding/watching. Hero contest/only a fight. Lover bond/loss of self. Jester play/avoiding feeling. Everyperson belonging/shrinking. Caregiver provide/over-giving. Ruler order/smothering. Creator make/work over people. Magician transform/manipulation. Outlaw break rules/destruction without a better world.\n\nUSE\nName the shadow before it runs the meeting or the relationship.",
    "Attachment Style": "SNAPSHOT FRAME\nAdult bonding patterns (Levine & Heller; Bowlby–Ainsworth) — learned predictions about whether closeness is safe. Not a life sentence; can move with steady relationships.\n\nSECURE EASE — closeness and space together; conflict is repairable.\nANXIOUS PROTEST — distance rings like danger; soothe the body before the third message.\nAVOIDANT DISTANCE — independence as safety; stay one extra minute when you want to leave.\nDISORGANIZED PULL — want close and out; predictability beats intensity.\n\nWORK\nShows up in feedback, deadlines, and manager distance.",
    "Autism Spectrum": "SNAPSHOT FRAME\nAttwood / spectrum education — non-diagnostic screen of social cueing, pattern focus, sensory load, routine need, and masking cost.\n\nSUPPORTS\nWritten instructions, one topic at a time, advance notice, quiet recovery. Exhaustion after ‘successful’ social days is masking data.\n\nLIMIT\nNot an ASD diagnosis; only a clinician can assess.",
    "Big 5": "SNAPSHOT FRAME\nFive-Factor Model (McCrae & Costa) — Openness, Conscientiousness, Extraversion, Agreeableness, Emotional Sensitivity.\n\nNone is a moral grade. High is a style, low is a style. Design the calendar around the lead trait; friction in close relationships often sits in the lowest trait when tired.\n\nStable across adulthood, still moves a little with sleep and stress. Retake after a calmer fortnight if this week was unusual.",
    "Bipolar spectrum": "SNAPSHOT FRAME\nGoodwin & Jamison spectrum education — not a bipolar diagnosis. Domains: elevation, low stretch, sleep shift, drive/risk, cycle pattern.\n\nLook for longer waves and sleep as infrastructure. Bring dates and outside observations to a clinician — not a self-label.",
    "BPD traits": "SNAPSHOT FRAME\nLinehan-informed trait reflection — not a personality disorder diagnosis. Clusters: emotion intensity, relationship panic, identity shift, impulsivity, emptiness.\n\nValidation first, then one skilful next step. Crisis: 988 (US) / Samaritans 116 123 (UK).",
    "Career": "SNAPSHOT FRAME\nHolland RIASEC work environments (A Theory of Vocational Choice): Realistic, Investigative, Artistic, Social, Enterprising, Conventional.\n\nA two-letter flavour is more useful than a single title. Mismatch looks like Sunday dread that is not only about one manager. Sample hybrid roles before chasing a label. Not a hiring decision.",
    "Character Strengths": "SNAPSHOT FRAME\nVIA virtue families (Peterson & Seligman): wisdom, courage, humanity, justice, temperance, transcendence — signature vs. lesser strengths. Educational paraphrase; not VIA-IS items.\n\nDeploy the signature family on purpose. A virtue at eleven becomes a vice. Cultivate the quietest family instead of ignoring it.",
    "DISC": "SNAPSHOT FRAME\nMarston DISC behavioural styles — observable pace and priority under ordinary conditions. Not a DiSC® licensed profile.\n\nUnder threat: Dominance sharpens, Influence gets louder, Steadiness freezes, Conscientiousness over-checks. Style is not character; choose the letter the hour needs.",
    "Depression": "SNAPSHOT FRAME\nBeck / Burns CBT mood screen — not a diagnosis. Domains: low mood, energy/body, sleep & appetite, self-view, hopelessness.\n\nThoughts as hypotheses; behaviour first. Crisis thoughts → person tonight (988 / 116 123).",
    "Emotional Intelligence": "SNAPSHOT FRAME\nGoleman emotional competence — notice a feeling, name it, ride it without handing it the wheel, do the same for others.\n\nSelf-awareness (dashboard), self-management (brake), motivation (long aim), empathy (reading), social skill (response). EQ can be trained; a low score is a starting point.",
    "Enneagram": "SNAPSHOT FRAME\nRiso & Hudson — nine strategies describe what a person is trying to protect, not a costume. Lead type is a motive; neighbouring numbers colour the lead. In security it gets quieter and more generous.\n\nUnder stress the lead strategy gets louder in meetings first. Test the hypothesis in the next hard week.",
    "Love Style": "SNAPSHOT FRAME\nChapman’s five love languages as preference channels: Words, Acts of service, Gifts, Quality time, Physical touch — not a relationship verdict.\n\nCouples misfire when each gives their own channel and waits to be thanked in it. Ask for your lead dialect; offer the second without keeping score.",
    "Narcissism": "SNAPSHOT FRAME\nKernberg / Kohut dimensional spectrum — not a disorder diagnosis. Domains: grand self-view, need for admiration, entitlement, empathy dip, vulnerability.\n\nAfter a slight: stay curious about the other person’s night. Do not weaponize scores.",
    "Personality": "SNAPSHOT FRAME\nSame Five-Factor Model as Big 5 (Costa & McCrae / NEO tradition — educational items only). Openness, Conscientiousness, Extraversion, Agreeableness, Emotional Sensitivity.\n\nProfile shape from top scores; lowest trait is often where friction shows when tired. Educational snapshot, not a diagnosis.",
    "Political Identity": "SNAPSHOT FRAME\nMulti-axis civic values (Political Compass tradition): economic left–right and social liberty–order. Descriptive, not party membership.\n\nPeople disagree about which moral good should win when two goods collide. Steelman the opposite axis without sneering. No electioneering.",
    "Strengths Finder": "SNAPSHOT FRAME\nGallup-style talent domains (conceptual): executing, influencing, relationship-building, strategic thinking. Not CliftonStrengths® theme definitions or items.\n\nDesign the week around the lead domain. Partner or tool the weak domain — do not hero-fix it first.",
    "Trauma patterns": "SNAPSHOT FRAME\nvan der Kolk / trauma-informed screen — not PTSD diagnosis and not a demand to tell the story. Domains: hyperarousal, numbing, intrusion, avoidance, safety beliefs.\n\nStabilise body first. Grounding: feet, five objects, longer exhale. Crisis: 988 / 116 123."
  };
