export interface SignUpResponse {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: DataObject;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface DataObject {
  user: UserDetails;
}

interface UserDetails {
  id: number;
  username: string;
  password: string;
  email: string;
  created: string;
  enabled: boolean;
}
