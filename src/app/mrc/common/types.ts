export enum UserPrivileges {
  Administrator,
  Default
}

export enum ProfessionalType {
  Doctor,
  Secretary
}

export class Account {
  _id?: string;
  accountId: number;
  expireDate: Date;
  users: string;
}

export class User {
  public _id?: string;
  public email: string;
  public name: string;
  public password: string;
  public privilegies?: UserPrivileges;
  public professionalType?: ProfessionalType;
  public userName: string;
}

export class SystemInfo {
  public _id?: string;
  public nextAccountSequence: number;
}
