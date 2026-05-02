import type { FeedbackSample, Question, Teacher } from './types';

export const ASSESSMENT_META = {
  subject: 'Science',
  gradeLevel: 'Grade 7',
  unit: 'Chemical reactions',
};

export const REVIEWER_CONFIDENCE = 82;

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q1',
    prefix: 'Q1',
    text: 'What happened to the total mass of the substances before and after the reaction? Use evidence from the investigation to support your answer.',
    kind: 'text',
    hint: 'Text response',
  },
  {
    id: 'q2a',
    prefix: 'Q2a',
    text: 'Draw a model showing what happened to the molecules during the chemical reaction.',
    kind: 'drawing',
    hint: 'Drawing box detected — may need manual review',
    warning: true,
  },
  {
    id: 'q2b',
    prefix: 'Q2b',
    text: 'Explain your model. What happened to the atoms before, during, and after the reaction?',
    kind: 'text',
    hint: 'Text response',
  },
  {
    id: 'q3',
    prefix: 'Q3',
    text: 'A student claims that matter was destroyed during the reaction because the substance looks different. Do you agree or disagree? Use evidence and reasoning to support your argument.',
    kind: 'cer',
    hint: 'Text response (CER)',
  },
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 't1',
    name: 'Ms. Rodriguez',
    detail: 'Periods 1, 3, 5 — Lincoln Middle School',
    checked: true,
  },
  {
    id: 't2',
    name: 'Mr. Thompson',
    detail: 'Periods 2, 4 — Lincoln Middle School',
    checked: true,
  },
  {
    id: 't3',
    name: 'Ms. Patel',
    detail: 'Periods 1, 2, 6 — Washington Middle School',
    checked: false,
  },
  {
    id: 't4',
    name: 'Mr. Kim',
    detail: 'Periods 3, 4, 5 — Washington Middle School',
    checked: false,
  },
  {
    id: 't5',
    name: 'Ms. Jackson',
    detail: 'Periods 1, 2 — Riverside Middle School',
    checked: false,
  },
];

export const FEEDBACK_SAMPLES: FeedbackSample[] = [
  {
    id: 's1',
    level: 'strong',
    questionRef: 'Q1 — sample response',
    studentResponse:
      'The total mass stayed the same. Before the reaction we measured 45g and after the reaction it was still 45g. This shows that the matter wasn\u2019t created or destroyed, it was just rearranged.',
    aiFeedback:
      'This response correctly identifies that total mass is conserved and uses specific measurements from the investigation as evidence. The connection to conservation of matter is clear.',
  },
  {
    id: 's2',
    level: 'developing',
    questionRef: 'Q1 — sample response',
    studentResponse:
      'The mass was the same before and after. The stuff just changed into different stuff.',
    aiFeedback:
      'You\u2019re right that the mass stayed the same — nice observation. To strengthen this, include the specific measurements you recorded. What were the numbers before and after? Also, can you explain what you mean by \u201cchanged into different stuff\u201d using what you know about atoms and molecules?',
  },
  {
    id: 's3',
    level: 'emerging',
    questionRef: 'Q3 — sample response',
    studentResponse: 'I agree because it turned into gas and disappeared.',
    aiFeedback:
      'This is a common idea, but let\u2019s look more closely at the evidence. When a substance turns into a gas, does the matter actually disappear? Think back to the investigation — what did the scale show about the total mass? Try restating your claim using that evidence.',
  },
];

export const STEP_LABELS = [
  'Upload',
  'Review questions',
  'Preview feedback',
  'Assign',
  'Confirm',
] as const;
