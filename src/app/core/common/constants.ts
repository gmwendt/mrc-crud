import { PoopShadesEnum } from "./types";

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

export class FecesFormat {
  public static Type1 = 'Caroços duros e separados, como nozes (difícil de passar)';
  public static Type2 = 'Forma de salsicha, mas granuloso';
  public static Type3 = 'Como uma salsicha, mas com fissuras em sua superfície';
  public static Type4 = 'Como uma salsicha ou serpente, suave e macio';
  public static Type5 = 'Bolhas suaves com bordas nítidas (que passa facilmente)';
  public static Type6 = 'Peças fofas com bordas em pedaços';
  public static Type7 = 'Aquoso, sem partes sólidas, inteiramente líquido';
}

export interface IPoopShadeOption {
  name: string;
  color: string;
  value: PoopShadesEnum;
  selected?: boolean;
  textColor?: string;
  description?: string;
}

export const PoopShadeList: IPoopShadeOption[] = [
  { color: '#a67346', name: 'Marrom', value: PoopShadesEnum.Brown },
  { color: '#549c42', name: 'Verde', value: PoopShadesEnum.Green },
  { color: '#e9b94d', name: 'Amarela', value: PoopShadesEnum.Yellow },
  { color: '#3d3d3d', textColor: '#fff', name: 'Preta', value: PoopShadesEnum.Black },
  { color: '#f8ebd4', name: 'Pálida', value: PoopShadesEnum.Pale },
  { color: '#ff7817', name: 'Avermelhada', value: PoopShadesEnum.Red }
]