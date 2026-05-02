export type QuestionKind = 'text' | 'drawing' | 'cer';

export type Question = {
  id: string;
  prefix: string;
  text: string;
  kind: QuestionKind;
  hint: string;
  warning?: boolean;
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
