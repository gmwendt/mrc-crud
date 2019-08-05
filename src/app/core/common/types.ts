import * as moment from 'moment';
import { MatPaginatorIntl } from '@angular/material/paginator';

export enum FileSystemCommands {
  Remove,
  Add,
  AddType1,
  AddType2
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

export class LabAnalyse {

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

export interface IHistoricalValue {
  timestamp: string;
  value: any;
  unit: string;
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
  public measurements?: Measurements;
  public exams?: LaboratoryExam[];
  public foodPlans?: FoodPlan[];
  public energyExpend?: EnergyExpend[];

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

  get ageAsString(): string {
    if (!this.birthDate)
      return '-- anos';

    let age = moment().diff(this.birthDate, 'years');
    let strAge = age <= 1 ? age + ' ano' : age + ' anos';

    return strAge;
  }

  get age(): number {
    if (!this.birthDate)
      return 0;
    
    return moment().diff(this.birthDate, 'years');
  }

  get ageInMonths(): number {
    if (!this.birthDate)
      return 0;

    return moment().diff(this.birthDate, 'months');
  }

  get weight(): IHistoricalValue {
    if (!this.measurements || !this.measurements.weigth || this.measurements.weigth.length == 0)
      return null;

    return this.measurements.weigth[0];
  }

  get height(): IHistoricalValue {
    if (!this.measurements || !this.measurements.height || this.measurements.height.length == 0)
      return null;

    return this.measurements.height[0];
  }

  static fromJSON(json: Patient | string): Patient {
    if (typeof json === 'string')
      return JSON.parse(json, Patient.reviver);
  
    var data = Object.create(Patient.prototype);
    return Object.assign(data, json);
  }

  private static reviver(key: string, value: any): any {
    return key === "" ? Patient.fromJSON(value) : value;
  }
}

export class ValueClassification {
  text: string;
  color: string;
}

export class Measurements {
  private static _keys: string[] = ["weigth", "weigthGoals", "height", "heightGoals", "armRelaxedRight", "armRelaxedRightGoals", "armRelaxedLeft", "armRelaxedLeftGoals", "armContractedRight", "armContractedRightGoals", 
  "armContractedLeft", "armContractedLeftGoals", "forearmRight", "forearmRightGoals", "forearmLeft", "forearmLeftGoals", "fistRight", "fistRightGoals", "fistLeft", "fistLeftGoals", "neck", "neckGoals", "shoulders", 
  "shouldersGoals", "breastplate", "breastplateGoals", "weist", "weistGoals", "abdomenCirc", "abdomenCircGoals", "hip", "hipGoals", 'imc', 'imcGoals', "calfRight", "calfRightGoals", "calfLeft", "calfLeftGoals", "thighRight", 
  "thighRightGoals", "thighLeft", "thighLeftGoals", "proximalThighRight", "proximalThighRightGoals", "proximalThighLeft", "proximalThighLeftGoals", "fist", "fistGoals", "femur", "femurGoals", "biceps", "bicepsGoals",
  "abdomenFold", "abdomenFoldGoals", "triceps", "tricepsGoals", "suprailiac", "suprailiacGoals", "averageAxillary", "averageAxillaryGoals", "subscapular", "subscapularGoals", "chest", "chestGoals", "thighFold", "thighFoldGoals",
  "imc", "imcGoals"];

  constructor(public weigth?: IHistoricalValue[], public weigthGoals?: IHistoricalValue[], public height?: IHistoricalValue[], public heightGoals?: IHistoricalValue[],
    public armRelaxedRight?: IHistoricalValue[], public armRelaxedRightGoals?: IHistoricalValue[], public armRelaxedLeft?: IHistoricalValue[], public armRelaxedLeftGoals?: IHistoricalValue[],
    public armContractedRight?: IHistoricalValue[], public armContractedRightGoals?: IHistoricalValue[], public armContractedLeft?: IHistoricalValue[], public armContractedLeftGoals?: IHistoricalValue[],
    public forearmRight?: IHistoricalValue[], public forearmRightGoals?: IHistoricalValue[], public forearmLeft?: IHistoricalValue[], public forearmLeftGoals?: IHistoricalValue[],
    public fistRight?: IHistoricalValue[], public fistRightGoals?: IHistoricalValue[], public fistLeft?: IHistoricalValue[], public fistLeftGoals?: IHistoricalValue[],
    public neck?: IHistoricalValue[], public neckGoals?: IHistoricalValue[], public shoulders?: IHistoricalValue[], public shouldersGoals?: IHistoricalValue[],
    public breastplate?: IHistoricalValue[], public breastplateGoals?: IHistoricalValue[], public weist?: IHistoricalValue[], public weistGoals?: IHistoricalValue[],
    public abdomenCirc?: IHistoricalValue[], public abdomenCircGoals?: IHistoricalValue[], public hip?: IHistoricalValue[], public hipGoals?: IHistoricalValue[],
    public calfRight?: IHistoricalValue[], public calfRightGoals?: IHistoricalValue[], public calfLeft?: IHistoricalValue[], public calfLeftGoals?: IHistoricalValue[],
    public thighRight?: IHistoricalValue[], public thighRightGoals?: IHistoricalValue[], public thighLeft?: IHistoricalValue[], public thighLeftGoals?: IHistoricalValue[],
    public proximalThighRight?: IHistoricalValue[], public proximalThighRightGoals?: IHistoricalValue[], public proximalThighLeft?: IHistoricalValue[], public proximalThighLeftGoals?: IHistoricalValue[],
    public fist?: IHistoricalValue[], public fistGoals?: IHistoricalValue[], public femur?: IHistoricalValue[], public femurGoals?: IHistoricalValue[],
    public biceps?: IHistoricalValue[], public bicepsGoals?: IHistoricalValue[], public abdomenFold?: IHistoricalValue[], public abdomenFoldGoals?: IHistoricalValue[],
    public triceps?: IHistoricalValue[], public tricepsGoals?: IHistoricalValue[], public suprailiac?: IHistoricalValue[], public suprailiacGoals?: IHistoricalValue[],
    public averageAxillary?: IHistoricalValue[], public averageAxillaryGoals?: IHistoricalValue[], public subscapular?: IHistoricalValue[], public subscapularGoals?: IHistoricalValue[],
    public chest?: IHistoricalValue[], public chestGoals?: IHistoricalValue[], public thighFold?: IHistoricalValue[], public thighFoldGoals?: IHistoricalValue[],
    public imc?: IHistoricalValue[], public imcGoals?: IHistoricalValue[]) {
    
    Measurements.normalize(this);
  }

  toJSON(): string {
    return JSON.stringify(Object.assign({}, this));
  }

  static normalize(measurement: Measurements): Measurements {
    this._keys.forEach(key => {
      if (!measurement[key])
        measurement[key] = [];
    });

    return measurement;
  }

  static fromJSON(json: Measurements | string): Measurements {
    if (typeof json === 'string')
      return JSON.parse(json, Measurements.reviver);
  
    var data = Object.create(Measurements.prototype);
    return Object.assign(data, json);
  }

  private static reviver(key: string, value: any): any {
    return key === "" ? Measurements.fromJSON(value) : value;
  }
}

export class LaboratoryExam {
  constructor(public id: string, public description: string, public date: string, public isResult?: boolean, public exams: LaboratoryExamItem[] = []) {
  }

  toJSON(): string {
    return JSON.stringify(Object.assign({}, this));
  }

  static fromJSON(json: LaboratoryExam | string): LaboratoryExam {
    if (typeof json === 'string')
      return JSON.parse(json, LaboratoryExam.reviver);
  
    var data = Object.create(LaboratoryExam.prototype);
    return Object.assign(data, json);
  }

  private static reviver(key: string, value: any): any {
    return key === "" ? LaboratoryExam.fromJSON(value) : value;
  }
}

export class LaboratoryExamItem  {
  id: string;
  desciption: string;
  availableUnits: IUnit[];
  value?: any;
  converterFactor?: number;
}

export interface ILabExamResult {
  examName: string;
  result: string;
  unit: string;
}

export class EnergyExpend {
  constructor(public id: string, public description: string, public date: string, public weight?: number, public height?: number,
    public selectedProtocol: number = 0, public activityFactor: number = -1, public injuryId: number = 0, public injuryFactor: number = 1,
    public totalEnergyExpend?: number, public womanSituation: number = 1, public womanSituationTime: number = 0) {
  }

  toJSON(): string {
    return JSON.stringify(Object.assign({}, this));
  }

  static fromJSON(json: EnergyExpend | string): EnergyExpend {
    if (typeof json === 'string')
      return JSON.parse(json, EnergyExpend.reviver);
  
    var data = Object.create(EnergyExpend.prototype);
    return Object.assign(data, json);
  }

  private static reviver(key: string, value: any): any {
    return key === "" ? EnergyExpend.fromJSON(value) : value;
  }
}

export class FoodPlan {
  constructor(public id: string, public description: string, public date: string, public isRecall?: boolean, public active: boolean = true, public useFoodDb: boolean = true,
    public meals: IMeal[] = [], public selectedDays: number[] = [], public foodPlanning?: FoodPlanning, public useReference?: boolean) {
  }

  toJSON(): string {
    return JSON.stringify(Object.assign({}, this));
  }

  get macros(): IMacroNutrients {
    if (!this.meals)
      return;
    
    let macros: IMacroNutrients = {
      carbohydrate: 0, protein: 0, lipid: 0, energy: 0
    };

    this.meals.forEach(meal => {
      if (!meal.macros)
        return;
      
      macros.carbohydrate += meal.macros.carbohydrate;
      macros.lipid += meal.macros.lipid;
      macros.protein += meal.macros.protein;
      macros.energy += meal.macros.energy;
    });

    return macros;
  }

  static fromJSON(json: FoodPlan | string): FoodPlan {
    if (typeof json === 'string')
      return JSON.parse(json, FoodPlan.reviver);
  
    var data = Object.create(FoodPlan.prototype);
    return Object.assign(data, json);
  }

  private static reviver(key: string, value: any): any {
    return key === "" ? FoodPlan.fromJSON(value) : value;
  }
}

export class FoodPlanning {
  constructor(public weight: number, public energy: number, public protein?: number, public carbohydrate?: number, public lipid?: number) {
  }
}

export interface IFoodAttributeDetail {
  qty: number;
  unit: string;
}

export interface IFoodAttribute {
  [key: string]: IFoodAttributeDetail
}

export interface IFoodDetail {
  id: number;
  description: string;
  measurements: IFoodMeasurement[];
  selectedMeasurement: number;
  quantity: number;
  attributes: IFoodAttribute[];
  category_id: number;
}

export interface IFoodMeasurement {
  id: number;
  description: string;
  converter: number;
}

export interface INutrient {
  id: string;
  description: string;
}

export interface IFoodCategory {
  id: number;
  description: string;
  qty?: number;
}

export interface IMacroNutrients {
  protein?: number;
  carbohydrate?: number;
  lipid?: number;
  energy?: number;
}

export interface IMeal {
  mealName: string;
  mealTime: string;
  selectedFoods: IFoodDetail[];
  notes: string;
  substituteMeals?: ISubstituteMeal[];
  mealAsText?: string;
  macros?: IMacroNutrients;
}

export interface ISubstituteMeal {
  selectedFoods: IFoodDetail[];
  notes: string;
}

export interface IActivePlanDetail {
  id: string;
  day: string;
  data?: any;
  energy?: number;
}

export interface IUnit {
  desciption: string;
  converterFactor: number;
}

export interface IListSelection {
  [key: string] : string;
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

export class MatPaginatorIntlBr extends MatPaginatorIntl {
  itemsPerPageLabel = 'Itens por página';
  nextPageLabel     = 'Próxima página';
  previousPageLabel = 'Página anterior';

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };
}

export enum CorporalDensityProtocolsEnum {
  JacksonAndPollock,
  Guedes,
  DurinAndWomersley,
  Faulkner,
  JacksonPollockAndWard
}

export interface ICorporalDensityProtocol {
  text: string;
  value: CorporalDensityProtocolsEnum;
}