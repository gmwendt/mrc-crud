export class Capabilities {
  constructor(public scheduleAndRegisterPatient?: boolean | undefined, public accessGlobalFinances?: boolean | undefined, 
    public fullAccessAdministrativeTools?: boolean | undefined, public registerUsers?: boolean | undefined,
    public registerPatients?: boolean | undefined, public registerDocuments?: boolean | undefined,
    public registerServices?: boolean | undefined, public registerAgreements?: boolean | undefined,
    public registerProfessionals?: boolean | undefined, public registerClinics?: boolean | undefined,) { }

  static toJSON(capabilities: Capabilities): string {
    return JSON.stringify({
      'scheduleAndRegisterPatient': capabilities.scheduleAndRegisterPatient,
      'accessGlobalFinances': capabilities.accessGlobalFinances,
      'fullAccessAdministrativeTools': capabilities.fullAccessAdministrativeTools,
      'registerUsers': capabilities.registerUsers,
      'registerPatients': capabilities.registerPatients,
      'registerDocuments': capabilities.registerDocuments,
      'registerServices': capabilities.registerServices,
      'registerAgreements': capabilities.registerAgreements,
      'registerProfessionals': capabilities.registerProfessionals,
      'registerClinics': capabilities.registerClinics,
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
}

export class User {
  public _id?: string;
  public accountRefId: number;
  public birthDate: Date;
  public capabilities: Capabilities;
  public email: string;
  public name: string;
  public passwordExpired: boolean;
  public passwordHash: string;
  public passwordSalt: string;
  public professionalRefId?: string;
  public resetPwdToken: string;
  public userName: string;
}

export class Professional {
  public _id?: string;
  public accountRefId: number;
  public name: string;
  public professionalRegisterNum: string;
  public professionalRegisterState: string;
  public userRefId: string;
}

export class SystemInfo {
  public _id?: string;
  public nextAccountSequence: number;
}
