export interface AuthenticationRequest {
  Document: string;
  Password: string;
  IdCompany: string | any;
}

export interface ChangedPasswwordRequest {
  Document: string;
  Email: string;
  Empresa: string | any;
}

export interface RecoverPasswordRequest {
  UserId: string;
  CodePassword: string;
  NewPassword: string;
  ConfirmPassword: string;
}
export interface ActivateUserRequest {
  Company: string;
  Document: string;
  Code: string;
}
export interface ChangePasswordRequest {
  OldPassword: string;
  NewPassword: string;
  ConfirmPassword: string;
}
export interface ChangeEmailRequest {
  OldEmail: string;
  NewEmail: string;
  ConfirmEmail: string;
}
