export type QuestionKind = 'text' | 'drawing' | 'cer';

export type Question = {
  id: string;
  prefix: string;
  text: string;
  kind: QuestionKind;
  hint: string;
  warning?: boolean;
  addedByUser?: boolean;
  committed?: boolean;
};

export type Teacher = {
  id: string;
  name: string;
  detail: string;
  checked: boolean;
};

export type FeedbackLevel = 'strong' | 'developing' | 'emerging';

export type FeedbackSample = {
  id: string;
  level: FeedbackLevel;
  questionRef: string;
  studentResponse: string;
  aiFeedback: string;
};

export type Phase = 'idle' | 'creating' | 'done';

export type AssessmentMeta = {
  subject: string;
  gradeLevel: string;
  unit: string;
};

export type LookFor = {
  id: string;
  text: string;
  included: boolean;
};

export type LookForsMap = Record<string, LookFor[]>;

export type ScoringCriteria = {
  strong: string;
  developing: string;
  emerging: string;
};
