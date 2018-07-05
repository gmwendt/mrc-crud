export class Capabilities {
  constructor(public canAccessFinances?: boolean | undefined, public canManageSystemData?: boolean | undefined, 
    public canRegisterUsers?: boolean | undefined, public canScheduleAndRegisterPatient?: boolean | undefined) { }

  toJSON(): string {
    return JSON.stringify({
      'canAccessFinances': this.canAccessFinances,
      'canManageSystemData': this.canManageSystemData,
      'canRegisterUsers': this.canRegisterUsers,
      'canScheduleAndRegisterPatient': this.canScheduleAndRegisterPatient
    });
  }

  static fromJSON(json: string): Capabilities {
    return JSON.parse(json);
  }
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
  public capabilities: Capabilities;
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
