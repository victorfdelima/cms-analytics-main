import { UpdateUserDTO } from '@/services/user/updateUser';
import { Course, CourseFormValues } from '@/types/course';
import { Instructor, InstructorFormValues } from '@/types/instructor';
import { User, UserFormValues } from '@/types/user';

export const formatInstructorToFormValues = (
  instructor: Instructor
): InstructorFormValues => ({
  fullName: instructor.fullName,
  shortDescription: instructor.shortDescription,
  description: instructor.description,
  teachingList: instructor.teachingList.map(teaching => teaching).join(', '),
  facebook: instructor.sso?.FACEBOOK,
  instagram: instructor.sso?.INSTAGRAM,
});

export const formatInstructorFormValueToServer = (
  instructor: InstructorFormValues
) => ({
  fullName: instructor.fullName,
  shortDescription: instructor.shortDescription,
  description: instructor.description,
  teachingList: instructor.teachingList.split(','),
  sso: {
    FACEBOOK: instructor.facebook,
    INSTAGRAM: instructor.instagram,
  },
});

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formatUserFormValueToServer = (user: UpdateUserDTO['data']) => {
  const [day, month, year] = user.birthday.split('/');

  return {
    ...user,
    phone: user.phone.replace(/[^\d]/g, ''),
    birthday: `${year}-${month}-${day}`,
  };
};

export const formatUserToFormValues = (user: User): UserFormValues => ({
  ...user,
  birthday: `${minTwoDigits(Number(user.birthday[2]))}/${minTwoDigits(
    Number(user.birthday[1])
  )}/${user.birthday[0]}`,
});

export const formatCourseFormValuesToServer = (course: any) => ({
  title: course.title,
  description: course.description,
  category: course.category,
  duration: course.duration,
  instructorId: Number(course.instructorId),
  apprenticeshipList: course.apprenticeshipList,
  faq: course.faq,
  classes: course.classes,
  courseType: course.courseType,
  quiz: {
    title: course.quiz.title,
    // questions: course.quiz.questions.map((question, questionIndex) => {
    //   return {
    //     name: question.name,
    //     answer: question.answer.map(answer => ({
    //       questionId: questionIndex + 1,
    //       answerText: answer.answerText,
    //       answerType: 'TEXT',
    //     }))[0],
    //   };
    // }),
    questions: course.quiz.questions.map((question, questionIndex) => {
      return {
        name: question.name,
        answer: {
          questionId: questionIndex + 1,
          answerText: question.answer.answerText,
          answerType: 'TEXT',
        },
      };
    }),
  },
});

export const formatCourseToFormValues = (course: Course): CourseFormValues => {
  return {
    title: course.title,
    description: course.description,
    category: course.category,
    duration: course.duration,
    instructorId: course.instructorId,
    apprenticeshipList: course.apprenticeshipList,
    courseType: course.courseType,
    courseStatusType: course.courseStatusType,
    faq: course.faq,
    classes: course.classes,
    quiz: {
      ...course.quiz,
      questions: course.quiz.questions.map((question: any) => ({
        ...question,
        answer: {
          answerText: question.answer.answerText,
        },
      })),
    },
    coverImage: course.coverImage,
  };
};

export const minTwoDigits = (number: number) => {
  return (number < 10 ? '0' : '') + number;
};
