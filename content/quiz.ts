import quizYaml from './quiz.yaml';

type QuizTags = {
  insurance:
    | 'out-of-network'
    | 'out-of-pocket'
    | 'bcbs'
    | 'united-healthcare'
    | 'united-healthcare-community'
    | 'healthy-blue'
    | 'aetna'
    | 'amerihealth'
    | 'partners'
    | 'alliance'
    | 'carolina-compete'
    | 'trillium'
    | 'wellcare'
    | 'other';
  demographic: 'young-child' | 'child' | 'young-adolescent' | 'teen' | 'adult' | 'couple';
  available: 'asap' | 'wait';
  location: 'in-person' | 'either' | 'online';
  specialty: (
    | 'adhd'
    | 'substance-abuse'
    | 'animal-assisted'
    | 'anti-colonial'
    | 'anxiety'
    | 'athletes-sports-performance'
    | 'attachment-based'
    | 'autism'
    | 'behavioral-addictions'
    | 'betrayal-trauma'
    | 'bipolar'
    | 'borderline-personality-disorder'
    | 'brainspotting'
    | 'cbt'
    | 'child-centered-play'
    | 'cprt'
    | 'conflict-avoidance'
    | 'couples'
    | 'cultural-specific'
    | 'dbt'
    | 'depression'
    | 'disordered-eating'
    | 'domestic-violence'
    | 'eating-disorders'
    | 'emdr'
    | 'gottman'
    | 'grief'
    | 'identity-acceptance'
    | 'internal-family-systems'
    | 'kink-allied'
    | 'lgbtqia'
    | 'life-transitions'
    | 'marital'
    | 'ocd'
    | 'non-monogamy'
    | 'parent-coaching'
    | 'perinatal'
    | 'phobias'
    | 'polyvagal'
    | 'psychodynamic'
    | 'psychosis'
    | 'registered-play'
    | 'reunification'
    | 'sandtray'
    | 'self-esteem'
    | 'sex'
    | 'sex-worker-allied'
    | 'somatic'
    | 'spanish'
    | 'stress-reduction'
    | 'tac-trained-adoption'
    | 'toxic-family'
    | 'transitions'
    | 'trauma-informed'
    | 'trauma'
    | 'tf-cbt'
    | 'triple-p'
  )[];
};

enum QuizQuestionType {
  YesNo = 'boolean',
  Selection = 'select',
  MultiSelect = 'multi-select',
}

type BooleanQuizQuestion = {
  title: string;
  type: QuizQuestionType.YesNo;
  filtersOn: never;
};

type SelectQuizQuestion = {
  title: string;
  type: QuizQuestionType.Selection;
  filtersOn: 'insurance' | 'demographic' | 'available' | 'location';
  options: {
    name: string;
    value: string;
  }[];
};

type MultiSelectQuizQuestion = {
  title: string;
  type: QuizQuestionType.MultiSelect;
  filtersOn: 'specialty';
  options: {
    name: string;
    value: string;
  }[];
};

type QuizQuestion = BooleanQuizQuestion | SelectQuizQuestion | MultiSelectQuizQuestion;

const quizQuestions: QuizQuestion[] = quizYaml.questions;
export {
  quizQuestions,
  QuizQuestionType,
  type QuizQuestion,
  type QuizTags,
  type BooleanQuizQuestion,
  type SelectQuizQuestion,
  type MultiSelectQuizQuestion,
};
export default quizQuestions;
