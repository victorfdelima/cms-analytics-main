import { Quiz } from './quiz';

export interface FAQ {
  id: string;
  title: string;
  faqText: string;
}

export interface Classes {
  id: string;
  title: string;
  duration: string;
  description: string;
  product: Product[];
  coverImage: string;
  videoUUID: string;
}

export interface Product {
  id: string;
  title: string;
  coverImage: string;
  link: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  instructorId: string;
  apprenticeshipList: string[];
  faq: FAQ[];
  classes: Classes[];
  quiz: Quiz;
  coverImage: string;
  courseType: string;
  courseStatusType: string;
}

export interface CourseFormValues {
  title: string;
  description: string;
  category: string;
  duration: string;
  instructorId: string;
  apprenticeshipList: string[];
  faq: {
    title: string;
    faqText: string;
  }[];
  classes: {
    id?: string;
    title: string;
    description: string;
    videoUUID: string;
    duration: string;
    coverImage: string;
    product: {
      title: string;
      coverImage: string;
      link: string;
    }[];
  }[];
  quiz: {
    title: string;
    questions: {
      name: string;
      answer: {
        answerText: string;
      };
    }[];
  };
  coverImage: string;
  courseType: string;
  courseStatusType: string;
}
