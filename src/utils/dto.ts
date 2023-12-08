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

export interface UserDetail {
  id: string;

  email: string;

  lastname: string;

  firstname: string;
}

export interface UpdateUserDetail {
  email: string;

  lastname: string;

  firstname: string;
}

export interface EventDetail {
  id: string;

  title: string;

  desc: string;

  start_time: string;

  end_time: string;

  location: string;

  host: UserDetail;

  participants: UserDetail[];
}

export interface EventCreateReq {
  title: string;

  desc: string;

  start_time: string;

  end_time: string;

  location: string;
}

export interface EventUpdateReq {
  title?: string;

  desc?: string;

  start_time?: string;

  end_time?: string;

  location?: string;
  
  hosts?: UserDetail, 
  participants?: UserDetail[];

  host_name?: string;
  host_email?: string;
  participants_email?: string;
  participants_name?: string;
}

export interface AddUserReq {
  email: string;
  firstname: string;
  lastname: string;
}

export interface RemoveUserReq {
  userId: string;
}

export interface ChangeHostReq {
  userId: string;
}