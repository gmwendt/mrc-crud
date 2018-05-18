export enum UserPrivileges {
  Administrator,
  Default
}

export enum ProfessionalType {
  Doctor,
  Secretary
}

export class User {
  public email: string;
  public clinicId: string;
  public id: number;
  public name: string;
  public password: string;
  public privilegies: UserPrivileges;
  public professionalType: ProfessionalType;
}
