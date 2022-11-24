export interface User {
  id: number;
  birthday: string;
  city: string;
  state: string;
  country?: string;
  email: string;
  fullName: string;
  gender: string;
  phone: string;
  userType: string;
  password: string;
  password_confirmation: string;
}

export interface UserFormValues {
  email: string;
  fullName: string;
  password: string;
  password_confirmation: string;
  phone: string;
  city: string;
  state: string;
  gender: string;
  birthday: string;
}
