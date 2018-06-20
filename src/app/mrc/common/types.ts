export enum Capabilities {
  AccessFinances,
  RegisterSystemData,
  RegisterUsers,
  ScheduleAndRegisterPatient,
}

export class Account {
  _id?: string;
  accountId: number;
  expireDate: Date;
  userList: string;
}

export class User {
  public _id?: string;
  public accountRefId: number;
  public capabilities: Capabilities[];
  public email: string;
  public name: string;
  public passwordExpired: boolean;
  public passwordHash: string;
  public passwordSalt: string;
  public resetPwdToken: string;
  public userName: string;
}

export class SystemInfo {
  public _id?: string;
  public nextAccountSequence: number;
}
