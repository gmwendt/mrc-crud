export enum FileSystemCommands {
  Remove,
  Add
}

export interface AddressInfoJSON {
  zipcode: string;
  address: string;
  addressNum?: string;
  addressComp: string;
  neighborhood: string;
  city: string;
  state: string;
}

export class Account {
  _id?: string;
  accountId: number;
  expireDate: Date;
}

export class AddressInfo {
  constructor(public zipcode: string, public address: string, public addressComp: string, public neighborhood: string,
  public city: string, public state: string, public addressNum?: string) {
  }

  toJSON(): string {
    return JSON.stringify(Object.assign({}, this));
  }

  static fromJSON(json: AddressInfoJSON | string): AddressInfo {
    if (typeof json === 'string')
      return JSON.parse(json, AddressInfo.reviver);

    var data = Object.create(AddressInfo.prototype);
    return Object.assign(data, json);
  }

  private static reviver(key: string, value: any): any {
    return key === "" ? AddressInfo.fromJSON(value) : value;
  }
}

export class Anamneses {
  constructor(public id: string, public clinicCase: string, public date: string, public objective?: string, public lifeHabits?: LifeHabits, public pathologies?: Pathologies, 
    public clinicalEvaluation?: ClinicalEvaluation, public metabolicTracking?: MetabolicTracking, public eatingHabits?: EatingHabits, public generalObservations?: string) {
  }

  toJSON(): string {
    return JSON.stringify(Object.assign({}, this));
  }
          
  static fromJSON(json: Anamneses | string): Anamneses {
    if (typeof json === 'string') {
      var obj: Anamneses = JSON.parse(json, Anamneses.reviver);
      obj.lifeHabits = typeof obj.lifeHabits === 'string' ? LifeHabits.fromJSON(obj.lifeHabits) : obj.lifeHabits;
      obj.pathologies = typeof obj.pathologies === 'string' ? Pathologies.fromJSON(obj.pathologies) : obj.pathologies;
      obj.clinicalEvaluation = typeof obj.clinicalEvaluation === 'string' ? ClinicalEvaluation.fromJSON(obj.clinicalEvaluation) : obj.clinicalEvaluation;
      obj.metabolicTracking = typeof obj.metabolicTracking === 'string' ? MetabolicTracking.fromJSON(obj.metabolicTracking) : obj.metabolicTracking;
      obj.eatingHabits = typeof obj.eatingHabits === 'string' ? EatingHabits.fromJSON(obj.eatingHabits) : obj.eatingHabits;
      //TODO: other properties
      return obj;
    }
          
    var data = Object.create(Anamneses.prototype);
    return Object.assign(data, json);
  }
          
  private static reviver(key: string, value: any): any {
    return key === "" ? Anamneses.fromJSON(value) : value;
  }
}

export enum AlimentarRestrictionEnum {
  No,
  Vegetarian,
  Vegan
}

export enum FrequencyEnum {
  Everyday,
  Weekends,
  Socially,
  PerDay,
  PerWeek
}

export enum SleepEnum {
  SleepTight,
  SleepBad
}

export class LifeHabits {
  constructor(public mealsOutsideTheHouse?: boolean, public whichMeals?: string, public alimentarRestriction?: AlimentarRestrictionEnum,
    public alcohol?: boolean, public alcoholFrequency?: FrequencyEnum, public alcoholWhichAndHowMuch?: string, public smoke?: boolean, public smokeFrequency?: string, public smokeWhichAndHowMuch?: string,
    public sleep?: SleepEnum, public sleepTime?: string, public physicalExercises?: string, public liveWithHowManyPeople?: string, public hoDoesTheHousePurchases?: string,
    public howManyTimesPerMonth?: number, public wherePurchase?: string, public observations?: string) {}

  toJSON(): string {
    return JSON.stringify(Object.assign({}, this));
  }
  
  static fromJSON(json: LifeHabits | string): LifeHabits {
    if (typeof json === 'string')
      return JSON.parse(json, LifeHabits.reviver);
  
    var data = Object.create(LifeHabits.prototype);
    return Object.assign(data, json);
  }
  
  private static reviver(key: string, value: any): any {
    return key === "" ? LifeHabits.fromJSON(value) : value;
  }
}

export class Pathologies {
  constructor(public anxiety?: boolean, public cancer?: boolean, public cardiac?: boolean, public circulatory?: boolean, public colitis?: boolean, public depression?: boolean,
    public diabetes?: boolean, public dyslipidemia?: boolean, public headache?: boolean, public endocrine?: boolean, public gastritis?: boolean, public hepatitis?: boolean,
    public herpes?: boolean, public hypertension?: boolean, public hyperthyroidism?: boolean, public hypoglycemia?: boolean, public hypothyroidism?: boolean, public irritability?: boolean,
    public osteoporosis?: boolean, public renal?: boolean, public rge?: boolean, public rhinitisSinusitis?: boolean, public otherPathologies?: string, public medicines?: boolean,
    public familyHistory?: boolean, public observations?: string) {}

  toJSON(): string {
    return JSON.stringify(Object.assign({}, this));
  }
    
  static fromJSON(json: Pathologies | string): Pathologies {
    if (typeof json === 'string')
      return JSON.parse(json, Pathologies.reviver);
    
    var data = Object.create(Pathologies.prototype);
    return Object.assign(data, json);
  }
    
  private static reviver(key: string, value: any): any {
    return key === "" ? Pathologies.fromJSON(value) : value;
  }
}

export enum AppetiteEnum {
  Normal,
  Increased,
  Decreased
}

export enum ChewEnum {
  Normal,
  Fast,
  Slow
}

export enum IntestinalHabitEnum {
  Normal,
  Constipating,
  Diarrhea,
  Varied
}

export enum FecesFormatEnum {
  Type1,
  Type2,
  Type3,
  Type4,
  Type5,
  Type6,
  Type7
}

export enum PoopShadesEnum {
  Brown,
  Green,
  Yellow,
  Black,
  Pale,
  Red
}

export enum UrineColorEnum {
  Hydrated1,
  Hydrated2,
  Hydrated3,
  Dehydrated1,
  Dehydrated2,
  Dehydrated3,
  SeverelyDehydrated1,
  SeverelyDehydrated2
}

export class ClinicalEvaluation {
  constructor(public appetite?: AppetiteEnum, public chew?: ChewEnum, public waterIntake?: string, public urinaryHabit?: string, public urineColor?: UrineColorEnum, 
    public intestinalHabit?: IntestinalHabitEnum, public evacuationFrequency?: number, public evacuationFrequencyUnit?: FrequencyEnum, public fecesFormat?: FecesFormatEnum, 
    public useLaxative?: boolean, public poopShade?: PoopShadesEnum, public laxativeWhichAnFrequency?: string, public observations?: string) {}

  toJSON(): string {
    return JSON.stringify(Object.assign({}, this));
  }
      
  static fromJSON(json: ClinicalEvaluation | string): ClinicalEvaluation {
    if (typeof json === 'string')
      return JSON.parse(json, ClinicalEvaluation.reviver);
      
    var data = Object.create(ClinicalEvaluation.prototype);
    return Object.assign(data, json);
  }
      
  private static reviver(key: string, value: any): any {
    return key === "" ? ClinicalEvaluation.fromJSON(value) : value;
  }
}

export interface IMetabolicTrackingItem {
  id: string;
  description: string;
  group: string;
  score: number;
}

export class MetabolicTracking {
  constructor(public metabolicTrackingList?: IMetabolicTrackingItem[], public totalScore?: number) {}
    
  toJSON(): string {
    return JSON.stringify(Object.assign({}, this));
  }
        
  static fromJSON(json: MetabolicTracking | string): MetabolicTracking {
    if (typeof json === 'string')
      return JSON.parse(json, MetabolicTracking.reviver);
        
    var data = Object.create(MetabolicTracking.prototype);
    return Object.assign(data, json);
  }
        
  private static reviver(key: string, value: any): any {
    return key === "" ? MetabolicTracking.fromJSON(value) : value;
  }
}

export class EatingHabits {
  //TODO
  constructor(public supplements?: string, public foodAllergy?: string, public foodIntolerance?: string, 
    public foodAversions?: string, public observations?: string) { }

  toJSON(): string {
    return JSON.stringify(Object.assign({}, this));
  }
          
  static fromJSON(json: EatingHabits | string): EatingHabits {
    if (typeof json === 'string')
      return JSON.parse(json, EatingHabits.reviver);
          
    var data = Object.create(EatingHabits.prototype);
    return Object.assign(data, json);
  }
          
  private static reviver(key: string, value: any): any {
    return key === "" ? EatingHabits.fromJSON(value) : value;
  }
}

export class Clinic {
  public _id?: string;
  public accountRefId: number;
  public name: string;
  public cnes: number;
  public address: AddressInfo;
  public email?: string;
  public phone1?: string;
  public phone2?: string;

  constructor(accountRefId: number) {
    this.accountRefId = accountRefId;
    this.name = '';
    this.cnes = null;
    this.address = new AddressInfo('', '', '', '', '', '');
    this.phone1 = '';
    this.phone2 = '';
  }
}

export enum GenderEnum {
  Female,
  Male
}

export class Patient {
  public _id?: string;
  public accountRefId: number;
  public name: string;
  public address: AddressInfo;
  public email: string;
  public phone: string;
  public cellphone: string;
  public gender: GenderEnum;
  public cpf: string;
  public birthDate: string;
  public maritalState?: string;
  public ocupation?: string;
  public anamneses?: Anamneses[];
  public placeOfCare: string;

  constructor(accountRefId: number) {
    this.accountRefId = accountRefId;
    this.name = '';
    this.address = new AddressInfo('', '', '', '', '', '');
    this.email = '';
    this.phone = '';
    this.cellphone = '';
    this.gender = GenderEnum.Male;
    this.cpf = '';
    this.birthDate = '';
  }
}

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

export class User {
  public _id?: string;
  public accountRefId: number;
  public birthDate: Date;
  public capabilities: Capabilities;
  public email: string;
  public isProfessional: boolean;
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
  public active: boolean
  public professionalRegisterNum: string;
  public professionalRegisterState: string;
  public specialites: string;
  public userRefId: string;
  public schedule: ScheduleMap;
}

export interface ScheduleInterval {
  end: string;
  start: string;
}

export class ScheduleMap {
  [key: string]: Array<ScheduleInterval>;

  static toJSON(scheduleMap: ScheduleMap): string {
    return JSON.stringify(scheduleMap);
  }

  static fromJSON(json: string): ScheduleMap{
    return JSON.parse(json);
  }
}

export class SystemInfo {
  public _id?: string;
  public nextAccountSequence: number;
}