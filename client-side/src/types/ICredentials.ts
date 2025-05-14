export interface ILoginCredentials {
  username: string;
  password: string;
}

export interface IRegisterCredentials extends ILoginCredentials {
  is_admin: boolean;
}
