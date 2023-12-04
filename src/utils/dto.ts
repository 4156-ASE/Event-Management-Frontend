export interface AuthSignUpDto {
  firstname: string;

  lastname: string;

  email: string;

  password: string;
}

export interface AuthSignInDto {
  email: string;

  password: string;
}

export interface AuthSignInResp {
  status: string;
  token: string;
  userID: string;
  message: string;
  user: {
    id: string;
    email: string;
    password: string;
    lastname: string;
    firstname: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
