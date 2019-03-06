import { PoopShadesEnum, UrineColorEnum, ISymptom } from "./types";

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
];

export class UrineColorValueEquivalence {
  public static Hydrated = 'Hidratado';
  public static Dehydrated = 'Desidratado';
  public static SeverelyDehydrated = 'Severamente desidratado';

  public static getValueEquivalence(enumValue: UrineColorEnum): string {
    switch (enumValue) {
      case UrineColorEnum.Hydrated1:
        return this.Hydrated;
      case UrineColorEnum.Hydrated2:
        return this.Hydrated;
      case UrineColorEnum.Hydrated3:
        return this.Hydrated;
      case UrineColorEnum.Dehydrated1:
        return this.Dehydrated;
      case UrineColorEnum.Dehydrated2:
        return this.Dehydrated;
      case UrineColorEnum.Dehydrated3:
        return this.Dehydrated;
      case UrineColorEnum.SeverelyDehydrated1:
        return this.SeverelyDehydrated;
      case UrineColorEnum.SeverelyDehydrated2:
        return this.SeverelyDehydrated;
    }
  }
}

export interface IUrineColorOption {
  color: string;
  value: UrineColorEnum;
  selected?: boolean;
}

export const UrineColorList: IUrineColorOption[] = [
  { color: '#fefdf7', value: UrineColorEnum.Hydrated1 },
  { color: '#fcf9d6', value: UrineColorEnum.Hydrated2 },
  { color: '#f9f39d', value: UrineColorEnum.Hydrated3 },
  { color: '#f7ee6b', value: UrineColorEnum.Dehydrated1 },
  { color: '#f5eb1a', value: UrineColorEnum.Dehydrated2 },
  { color: '#ffd300', value: UrineColorEnum.Dehydrated3 },
  { color: '#eab92a', value: UrineColorEnum.SeverelyDehydrated1 },
  { color: '#daa735', value: UrineColorEnum.SeverelyDehydrated2 },
];

export class Nutrients {
  public static AcidoGraxoOmega6 = 'Ácido Graxo Ômega-6';
  public static AcidoLinoleico = 'Ácido Linoleico';
  public static AcidoPantotenico = 'Ácido Pantotênico';
  public static Biotina = 'Biotina';
  public static Cadmio = 'Cádmio';
  public static Calcio = 'Cálcio';
  public static Cobre = 'Cobre';
  public static Ferro = 'Ferro';
  public static Iodo = 'Iodo';
  public static Magnesio = 'Magnésio';
  public static Manganes = 'Manganês';
  public static PABA = 'PABA';
  public static Proteina = 'Proteína';
  public static Selenio = 'Selênio';
  public static VitaminaA = 'Vitamina A (Retinol)';
  public static VitaminaB1 = 'Vitamina B1 (Tiamina)';
  public static VitaminaB2 = 'Vitamina B2 (Riboflavina)';
  public static VitaminaB3 = 'Vitamina B3 (Niacina)';
  public static VitaminaB6 = 'Vitamina B6 (Piridoxina)';
  public static VitaminaB9 = 'Vitamina B9 (Ácido Fólico)';
  public static VitaminaB12 = 'Vitamina B12 (Cobalamina)';
  public static VitaminaC = 'Vitamina C (Ácido Ascórbico)';
  public static VitaminaD = 'Vitamina D';
  public static VitaminaK = 'Vitamina K (Naftoquinona)';
  public static Zinco = 'Zinco';
}

export const SymptomsList: ISymptom[] = [
  { id: 0, name: 'Dores', group: 'Articulações', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.Magnesio, Nutrients.VitaminaB6, Nutrients.VitaminaC], 
    nutrientsExcess: [Nutrients.VitaminaA] },
  
  { id: 1, name: 'Aftas', group: 'Boca / Garganta', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.VitaminaB9] },
  { id: 2, name: 'Boqueira', group: 'Boca / Garganta', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.Ferro, Nutrients.VitaminaB2, Nutrients.VitaminaB3, Nutrients.VitaminaB6] },
  { id: 3, name: 'Dentes frágeis', group: 'Boca / Garganta', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.Calcio] },
  { id: 4, name: 'Diminuição do paladar', group: 'Boca / Garganta', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.VitaminaA, Nutrients.Zinco] },
  { id: 5, name: 'Halitose', group: 'Boca / Garganta', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.VitaminaB3] },
  { id: 6, name: 'Sensação de queimação na boca e garganta', group: 'Boca / Garganta', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.VitaminaB3] },

  { id: 7, name: 'Cabelos secos e quebradiços', group: 'Cabelos', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.VitaminaA, Nutrients.VitaminaC, Nutrients.Zinco] },
  { id: 8, name: 'Calvície precoce', group: 'Cabelos', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.VitaminaB6] },
  { id: 9, name: 'Queda de cabelo', group: 'Cabelos', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.Calcio, Nutrients.VitaminaB2, Nutrients.Zinco],
    nutrientsExcess: [Nutrients.VitaminaA] },

  { id: 10, name: 'Dificuldade de respirar', group: 'Cardio-pulmonar', locationOnWeb: 'Transporte',
    nutrientDeficiency: [Nutrients.VitaminaB1, Nutrients.VitaminaB12, Nutrients.VitaminaB9, Nutrients.VitaminaK],
    nutrientsExcess: [Nutrients.Magnesio] },
  { id: 11, name: 'Dor no peito', group: 'Cardio-pulmonar', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.VitaminaB1] },
  { id: 12, name: 'Inchaço membros inferiores', group: 'Cardio-pulmonar', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.Ferro] },
  { id: 13, name: 'Respiração curta', group: 'Cardio-pulmonar', locationOnWeb: 'Transporte',
    nutrientDeficiency: [Nutrients.VitaminaB1, Nutrients.VitaminaB12, Nutrients.VitaminaB9] },
  { id: 14, name: 'Taquicardia', group: 'Cardio-pulmonar', locationOnWeb: 'Transporte',
    nutrientDeficiency: [Nutrients.Calcio, Nutrients.Ferro, Nutrients.Magnesio, Nutrients.VitaminaB1] },

  { id: 15, name: 'Coceira e prurido no ânus', group: 'Gastrointestinal', nutrientDeficiency: [Nutrients.VitaminaB1] },
  { id: 16, name: 'Dificuldade de deglutição', group: 'Gastrointestinal', locationOnWeb: 'Assimilação',
    nutrientDeficiency: [Nutrients.Ferro, Nutrients.VitaminaB1, Nutrients.VitaminaB2, Nutrients.VitaminaB3] },
  { id: 17, name: 'Dor abdominal', group: 'Gastrointestinal', locationOnWeb: 'Assimilação',
    nutrientDeficiency: [Nutrients.VitaminaB1, Nutrients.VitaminaB6] }


];