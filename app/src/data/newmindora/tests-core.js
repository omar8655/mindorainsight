/* Ported from newmindora */
/* MindoraInsight - Tests metadata, scoring rules and fallback helpers */
export const TEST_META = [
  { id:"personality", title:"Personality", blurb:"Five-factor snapshot (OCEAN-style): how you explore, organize, energize, connect, and react.", mins:15, clinical:false },
  { id:"big5", title:"Big 5", blurb:"Openness, Conscientiousness, Extraversion, Agreeableness, and emotional sensitivity — educational trait domains.", mins:15, clinical:false },
  { id:"sixteen", title:"16 Personalities", blurb:"How you take in information, decide, and recharge.", mins:15, clinical:false },
  { id:"enneagram", title:"Enneagram", blurb:"Core motivations across nine types.", mins:15, clinical:false },
  { id:"autism", title:"Autism Spectrum", blurb:"A non-diagnostic screen of social, sensory and pattern traits.", mins:15, clinical:true },
  { id:"adhd", title:"ADHD", blurb:"Educational pattern screen: focus, restlessness, impulse, executive regulation, emotions, and follow-through.", mins:15, clinical:true },
  { id:"depression", title:"Depression", blurb:"Mood, energy, sleep, cognition and self-perception. Not a diagnosis.", mins:15, clinical:true, crisis:true },
  { id:"love", title:"Love Style", blurb:"How you most naturally give and receive care.", mins:15, clinical:false },
  { id:"attachment", title:"Attachment Style", blurb:"How you bond, trust and handle closeness.", mins:15, clinical:false },
  { id:"strengths", title:"Strengths Finder", blurb:"The talent domain where you naturally do your best work.", mins:15, clinical:false },
  { id:"career", title:"Career", blurb:"Work environments and roles that fit how you operate.", mins:15, clinical:false },
  { id:"archetype", title:"Archetype", blurb:"The character pattern that tends to drive your story.", mins:15, clinical:false },
  { id:"political", title:"Political Identity", blurb:"Where your values sit on economic and social axes.", mins:15, clinical:false },
  { id:"disc", title:"DISC", blurb:"Dominance, Influence, Steadiness and Conscientiousness.", mins:15, clinical:false },
  { id:"eq", title:"Emotional Intelligence", blurb:"How you notice, understand and work with emotion.", mins:15, clinical:false },
  { id:"character", title:"Character Strengths", blurb:"Signature virtues across six broad families.", mins:15, clinical:false },
  { id:"bpd", title:"BPD traits", blurb:"A gentle, non-diagnostic look at emotion and relationship intensity.", mins:15, clinical:true, crisis:true },
  { id:"bipolar", title:"Bipolar spectrum", blurb:"Mood-cycle and energy-pattern signs. Not a diagnosis.", mins:15, clinical:true },
  { id:"narcissism", title:"Narcissism", blurb:"Self-focus and recognition needs on a spectrum — a reflection, not a label.", mins:15, clinical:true },
  { id:"trauma", title:"Trauma patterns", blurb:"A trauma-informed screen of common stress aftereffects.", mins:15, clinical:true, crisis:true }
];

/* Reverse-scored item helper: 6 - score (1..5) */
function scoreItems(answers, indexes, reverse){
  let s=0, c=0;
  indexes.forEach(i=>{
    const v = answers[i];
    if(v==null) return;
    s += reverse && reverse.includes(i) ? (6-v) : v;
    c++;
  });
  if(!c) return 50;
  return Math.round(((s/c)-1)/4*100);
}

function band(answers, names){
  const n=names.length;
  return names.map((key,bi)=>{
    const idx=[];
    for(let i=bi;i<answers.length;i+=n) idx.push(i);
    return {key, score:scoreItems(answers, idx, [])};
  });
}

/* Clinical screens: 5 domains × 20 contiguous items (ADHD-style blocks). Reverse indices = wellness / opposite-direction items. */
function clinicalBand(answers, names, reverseIndexes){
  const reverse = reverseIndexes || [];
  return names.map((key, bi) => {
    const idx = [];
    for (let i = 0; i < 20; i++) idx.push(bi * 20 + i);
    return { key, score: scoreItems(answers, idx, reverse) };
  });
}

/** Likert 1–5 → 0–100 item contribution (Adult ADHD Pattern Screen) */
const ADHD_LIKERT_PERCENT = [0, 25, 50, 75, 100];

/** Question index 0–99 → domain id (Barkley-informed educational domains) */
const ADHD_ITEM_DOMAINS = (function(){
  const d = [];
  let i = 0;
  const push = (domain, n) => { for (let k = 0; k < n; k++) d[i++] = domain; };
  push("inattention", 20);
  push("hyperactivity", 15);
  push("impulsivity", 15);
  push("executive", 20);
  push("emotion", 15);
  push("time_motivation", 15);
  return d;
})();

/** Reverse-keyed indices (1–5 → flipped before percent mapping) */
const ADHD_REVERSE = [];

const ADHD_DOMAIN_META = [
  { domain: "inattention", key: "Focus & attention" },
  { domain: "hyperactivity", key: "Restlessness & energy" },
  { domain: "impulsivity", key: "Impulse control" },
  { domain: "executive", key: "Getting started & finishing" },
  { domain: "emotion", key: "Feelings & stress" },
  { domain: "time_motivation", key: "Time & follow-through" },
];

function adhdItemPercent(answers, index){
  const v = answers[index];
  if (v == null) return null;
  const raw = ADHD_REVERSE.includes(index) ? (6 - v) : v;
  if (raw < 1 || raw > 5) return null;
  return ADHD_LIKERT_PERCENT[raw - 1];
}

function scoreAdhd(answers){
  const buckets = Object.fromEntries(ADHD_DOMAIN_META.map(m => [m.domain, []]));
  for (let i = 0; i < 100; i++){
    const p = adhdItemPercent(answers, i);
    if (p == null) continue;
    const dom = ADHD_ITEM_DOMAINS[i];
    if (dom && buckets[dom]) buckets[dom].push(p);
  }
  const traits = ADHD_DOMAIN_META.map(m => {
    const scores = buckets[m.domain];
    const score = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;
    return { key: m.key, domain: m.domain, score };
  });
  return traits;
}

export const SCORERS = {
  big5(a){
    const O=[0,1,3,5,7,8,9,11], Or=[2,4,6,10];
    const C=[12,14,15,16,18,20,22,23], Cr=[13,17,19,21];
    const E=[24,26,28,30,32,34,35], Er=[25,27,29,31,33];
    const A=[36,38,40,42,44,46], Ar=[37,39,41,43,45];
    const N=[48,50,52,54,56,58], Nr=[49,51,53,55,57,59];
    for(let i=60;i<100;i++){
      const g=Math.floor((i-60)/8)%5;
      const bucket=[[O,Or],[C,Cr],[E,Er],[A,Ar],[N,Nr]][g];
      (i%3===0?bucket[1]:bucket[0]).push(i);
    }
    return [
      {key:"Openness", score:scoreItems(a,O.concat(Or),Or), low:"Practical", high:"Exploring"},
      {key:"Conscientiousness", score:scoreItems(a,C.concat(Cr),Cr), low:"Flexible", high:"Structured"},
      {key:"Extraversion", score:scoreItems(a,E.concat(Er),Er), low:"Private", high:"Outgoing"},
      {key:"Agreeableness", score:scoreItems(a,A.concat(Ar),Ar), low:"Candid", high:"Warm"},
      {key:"Emotional sensitivity", score:scoreItems(a,N.concat(Nr),Nr), low:"Steady", high:"Attuned"}
    ];
  },
  sixteen(a){
    function poleScore(ranges){
      const lead=[], other=[];
      ranges.forEach(([start,len])=>{
        for(let i=0;i<len;i++){
          const idx=start+i;
          if(i%2===0) lead.push(idx); else other.push(idx);
        }
      });
      return scoreItems(a, lead.concat(other), other);
    }
    const e=poleScore([[0,15],[60,10]]);
    const s=poleScore([[15,15],[70,10]]);
    const t=poleScore([[30,15],[80,10]]);
    const j=poleScore([[45,15],[90,10]]);
    const code=(e>=50?"E":"I")+(s>=50?"S":"N")+(t>=50?"T":"F")+(j>=50?"J":"P");
    return [
      {key:"Energy (E–I)", score:e, extra:code},
      {key:"Information (S–N)", score:s},
      {key:"Decisions (T–F)", score:t},
      {key:"Lifestyle (J–P)", score:j},
      {key:"Type code", score:null, label:code}
    ];
  },
  enneagram(a){
    const types=[];
    for(let t=0;t<9;t++){
      const idx=[];
      for(let i=t;i<100;i+=9) idx.push(i);
      types.push({key:"Type "+(t+1), score:scoreItems(a,idx,[])});
    }
    return types;
  },
  autism(a){
    return clinicalBand(a,["Social cueing","Pattern focus","Sensory load","Routine need","Masking load"],[]);
  },
  adhd(a){ return scoreAdhd(a); },
  depression(a){
    return clinicalBand(a,["Low mood","Energy / body","Sleep & appetite","Self-view","Hopelessness"],[]);
  },
  love(a){ return band(a,["Words","Acts of service","Gifts","Time","Touch"]); },
  attachment(a){ return band(a,["Secure ease","Anxious protest","Avoidant distance","Disorganized pull"]); },
  strengths(a){ return band(a,["Executing","Influencing","Relationship","Strategic thinking"]); },
  career(a){ return band(a,["Realistic / making","Investigative","Artistic","Social","Enterprising","Conventional"]); },
  archetype(a){ return band(a,["Innocent","Explorer","Sage","Hero","Lover","Jester","Everyperson","Caregiver","Ruler","Creator","Magician","Outlaw"]); },
  political(a){ return band(a,["Economic left","Economic right","Social liberty","Social order"]); },
  disc(a){ return band(a,["Dominance","Influence","Steadiness","Conscientiousness"]); },
  eq(a){ return band(a,["Self-awareness","Self-management","Motivation","Empathy","Social skill"]); },
  character(a){ return band(a,["Wisdom","Courage","Humanity","Justice","Temperance","Transcendence"]); },
  bpd(a){
    return clinicalBand(a,["Emotion intensity","Relationship panic","Identity shift","Impulsivity","Emptiness"],[
      18,19,38,39,58,59,78,79,89,90,91,96,97,98,99
    ]);
  },
  bipolar(a){
    return clinicalBand(a,["Elevation","Low stretch","Sleep shift","Drive / risk","Cycle pattern"],[
      19,39,59,79,95,96,97
    ]);
  },
  narcissism(a){
    return clinicalBand(a,["Grand self-view","Need for admiration","Entitlement","Empathy dip","Vulnerability"],[
      18,19,38,39,58,59,74,75,76,77,78,79,85,98,99
    ]);
  },
  trauma(a){
    return clinicalBand(a,["Hyperarousal","Numbing","Intrusion","Avoidance","Safety beliefs"],[
      18,19,37,38,39,58,59,77,78,79,91,92,93,94
    ]);
  }
};
SCORERS.personality = SCORERS.big5;
