export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  balance: any;
}

export type InitialUserState = User | null;