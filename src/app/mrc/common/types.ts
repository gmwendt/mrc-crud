export class Account {
  _id?: string;
  accountId: number;
  expireDate: Date;
  userList: string;
}

export class User {
  public _id?: string;
  public accountRefId: number;
  public administrator: boolean;
  public email: string;
  public name: string;
  public passwordHash: string;
  public passwordSalt: string;
  public userName: string;
}

export class SystemInfo {
  public _id?: string;
  public nextAccountSequence: number;
}
