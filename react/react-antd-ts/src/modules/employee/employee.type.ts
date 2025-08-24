export type Gender = "MALE" | "FEMALE" | "OTHER" | null;

export interface IEmployee {
  id: number;
  fullName: string;
  email: string | null;
  dateOfBirth: string | null; // ISO string or null
  gender: Gender;
  phoneNumber: string | null;
  active: boolean | null;
  createdAt: string | null;
}
