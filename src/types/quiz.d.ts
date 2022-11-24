export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  name: string;
  answer: Answer
}

export interface Answer {
  id: string;
  answerText: string;
  answerType: string;
}
