interface SSO {
  FACEBOOK?: string;
  INSTAGRAM?: string;
}

export interface Instructor {
  id: number;
  fullName: string;
  profileImage?: string;
  shortDescription: string;
  description: string;
  teachingList: string[];
  sso: SSO;
}

export interface InstructorFormValues {
  avatar?: string;
  fullName: string;
  shortDescription: string;
  description: string;
  teachingList: string;
  facebook: string;
  instagram: string;
}
