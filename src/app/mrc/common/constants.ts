export class LocalStorageConstants {
  public static MRC_USER = '_MRC_USER';
}

export enum DaysNameEnum {
  Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Length
}

export class DaysName {
  public static Monday = 'Segunda-feira';
  public static Tuesday = 'Terça-feira';
  public static Wednesday = 'Quarta-feira';
  public static Thursday = 'Quinta-feira';
  public static Friday = 'Sexta-feira';
  public static Saturday = 'Sábado';
  public static Sunday = 'Domingo';

  public static translateDayName(name: DaysNameEnum): string {
    switch (name) {
      case DaysNameEnum.Monday:
        return this.Monday;
      case DaysNameEnum.Tuesday:
        return this.Tuesday;
      case DaysNameEnum.Wednesday:
        return this.Wednesday;
      case DaysNameEnum.Thursday:
        return this.Thursday;
      case DaysNameEnum.Friday:
        return this.Friday;
      case DaysNameEnum.Saturday:
        return this.Saturday;
      case DaysNameEnum.Sunday:
        return this.Sunday;
    }
  }
}