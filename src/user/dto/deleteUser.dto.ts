export interface DeleteUserDto {
  readonly lastName?: string;
  readonly firstName?: string;
  readonly email?: string;
  readonly phoneReg?: string;
  readonly password?: string;
  readonly activationLinkEmail?: string;
}
