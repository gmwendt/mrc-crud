import { GenderEnum } from '../../../core/common/types';

export interface IActivityFactor {
  value: number;
  name: string;
  description?: string;
}

export interface IEnergyExpendProtocol {
  id: number;
  name: string;
}

export interface IInjuryFactor {
  id: number;
  description: string;
  max: number;
  min: number;
}

export class EnergyExpendCalculator {
  static tmbHarrisBenedict(gender: GenderEnum, weight: number, height: number, age: number): number {
    if (gender == GenderEnum.Female)
      return 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    else
      return 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
  }

  static getHarrisBenedict(gender: GenderEnum, weight: number, height: number, age: number, activFactor: number, injuryFactor: number = 1): number {
    return EnergyExpendCalculator.tmbHarrisBenedict(gender, weight, height, age) * activFactor * injuryFactor;
  }

  static tmb_FAO_OMS_2001(gender: GenderEnum, age: number, weight: number): number {
    if (gender == GenderEnum.Female) {
      if (age < 3)
        return (58.317 * weight) - 31.1;
      else if (age >= 3 && age < 10)
        return (20.315 * weight) - 485.9;
      else if (age >= 10 && age < 18)
        return (13.384 * weight) - 692.6;
      else if (age >= 18 && age < 30)
        return weight * 14.818 + 486.6;
      else if (age >= 30 && age < 60)
        return weight * 8.126 + 845.6;
      else if (age >= 60)
        return weight * 9.082 + 658.5;
    }
    else {
      if (age < 3)
        return (59.512 * weight) - 30.4;
      else if (age >= 3 && age < 10)
        return (22.706 * weight) - 504.3;
      else if (age >= 10 && age < 18)
        return (17.686 * weight) - 658.2;
      else if (age >= 18 && age < 30)
        return weight * 15.057 + 692.2;
      else if (age >= 30 && age < 60)
        return weight * 11.472 + 873.1;
      else if (age >= 60)
        return weight * 11.711 + 587.7;
    }
  }

  static get_FAO_OMS_2001(gender: GenderEnum, age: number, weight: number, activFactor: number, injuryFactor: number = 1): number {
    return EnergyExpendCalculator.tmb_FAO_OMS_2001(gender, age, weight) * activFactor * injuryFactor;
  }

  static tmb_FAO_OMS_1985(gender: GenderEnum, age: number, weight: number): number {
    if (gender == GenderEnum.Female) {
      if (age < 3)
        return (61 * weight) - 51;
      else if (age >= 3 && age < 10)
        return (22.5 * weight) + 499;
      else if (age >= 10 && age < 18)
        return (12.2 * weight) + 476;
      else if (age >= 18 && age < 30)
        return weight * 14.7 + 496;
      else if (age >= 30 && age < 60)
        return weight * 8.7 + 829;
      else if (age >= 60)
        return weight * 10.5 + 596;
    }
    else {
      if (age < 3)
        return (60.9 * weight) - 54;
      else if (age >= 3 && age < 10)
        return (27.7 * weight) + 495;
      else if (age >= 10 && age < 18)
        return (17.5 * weight) + 651;
      else if (age >= 18 && age < 30)
        return weight * 15.3 + 676;
      else if (age >= 30 && age < 60)
        return weight * 11.6 + 879;
      else if (age >= 60)
        return weight * 13.5 + 487;
    }
  }

  static get_FAO_OMS_1985(gender: GenderEnum, age: number, weight: number, activFactor: number, injuryFactor: number = 1): number {
    return EnergyExpendCalculator.tmb_FAO_OMS_1985(gender, age, weight) * activFactor * injuryFactor;
  }

  static tmb_schofield(gender: GenderEnum, age: number, weight: number): number {
    if (gender == GenderEnum.Female) {
      if (age < 3)
        return (58.317 * weight) - 31.1;
      else if (age >= 3 && age < 10)
        return (20.315 * weight) + 485.9;
      else if (age >= 10 && age < 18)
        return (13.384 * weight) + 692.6;
      else if (age >= 18 && age < 30)
        return (14.818 * weight) + 486.6;
      else if (age >= 30 && age < 60)
        return (8.126 * weight) + 845.6;
      else if (age >= 60)
        return (9.082 * weight) + 658.5;
    }
    else {
      if (age < 3)
        return (59.512 * weight) - 30.4;
      else if (age >= 3 && age < 10)
        return (22.706 * weight) + 504.3;
      else if (age >= 10 && age < 18)
        return (17.686 * weight) + 658.2;
      else if (age >= 18 && age < 30)
        return (15.057 * weight) + 692.2;
      else if (age >= 30 && age < 60)
        return (11.472 * weight) + 873.1;
      else if (age >= 60)
        return (11.711 * weight) + 587.7;
    }
  }

  static get_schofield(gender: GenderEnum, age: number, weight: number, activFactor: number, injuryFactor: number = 1): number {
    return EnergyExpendCalculator.tmb_schofield(gender, age, weight) * activFactor * injuryFactor;
  }

  static eer_iom_2005(gender: GenderEnum, age: number, kg: number, m: number, af: number, monsthsAge?: number, injuryFactor: number = 1): number {
    let value: number;
    
    if (age == 0 && monsthsAge <= 3)
      value = (89 * kg) - 100 + 175;
    else if (monsthsAge > 3 && monsthsAge <= 6)
      value = (89 * kg) - 100 + 56;
    else if (monsthsAge > 6 && monsthsAge <= 12)
      value = (89 * kg) - 100 + 22;
    else if (monsthsAge > 12 && monsthsAge <= 36)
      value = (89 * kg) - 100 + 20;
    
    if (age >= 3 && age <= 8)
      value = gender == GenderEnum.Male ?
        88.5 - (61.9 * age) + af * (26.7 * kg) + (903 * m) + 20 : 135.3 - (30.8 * age) + af * (10.0 * kg) + (934 * m) + 20;
    else if (age > 8 && age <= 18)
      value = gender == GenderEnum.Male ?
        88.5 - (61.9 * age) + af * (26.7 * kg) + (903 * m) + 25 : 135.3 - (30.8 * age) + af * (10.0 * kg) + (934 * m) + 25;
    else if (age > 18)
      value = gender == GenderEnum.Male ?
        662 - (9.53 * age) + af * (15.91 * kg) + (539.6 * m) : 354 - (6.91 * age) + af * (9.36 * kg) + (726 * m);
    
    return value ? value * injuryFactor : value;
  }

  static bee_iom(gender: GenderEnum, age: number, kg: number, m: number): number {
    if (age <= 18)
      return gender == GenderEnum.Male ?
        419.9 - (35.5 * age) + (418.9 * m) + (16.7 * kg) : 515.8 - (26.8 * age) + (347 * m) + (12.4 * kg);
  }

  static tee_iom(gender: GenderEnum, age: number, kg: number, m: number, af: number, injuryFactor: number = 1): number {
    if (age <= 18)
      return gender == GenderEnum.Male ?
        (114 - (50.9 * age) + af * (19.5 * kg) + (1161.4 * m)) * injuryFactor : (389 - (41.2 * age) + af * (15 * kg) + (701.6 * m)) * injuryFactor;
  }

  /**
    EER
    CRIANÇAS DE 0 A 36 MESES - EER (KCAL/DIA) = GET + ENERGIA DE DEPÓSITO
      [ok] 0 a 3 meses	EER = (89 x peso (kg) - 100) + 175 kcal
      [ok] 4 a 6 meses	EER = (89 x peso (kg) - 100) + 56 kcal
      [ok] 7 a 12 meses 	EER = (89 x peso (kg) - 100) + 22 kcal
      [ok] 13 a 36 meses	EER = (89 x peso (kg) - 100) + 20 kcal
    CRIANÇAS E ADOLESCENTES DE 3 A 18 ANOS
      Meninos
      [ok] 3 a 8 anos 	EER = 88,5 – (61,9 x idade [anos]) + AF x (26,7 x peso [kg]) + (903 x altura [m]) + 20 kcal
      [ok] 9 a 18 anos	EER = 88,5 – (61,9 x idade [anos]) + AF x (26,7 x peso [kg]) + (903 x altura [m]) + 25 kcal
      Meninas
      [ok] 3 a 8 anos	EER = 135,3 – (30,8 x idade [anos]) + AF x (10,0 x peso [kg]) + (934 x altura [m]) + 20 kcal
      [ok] 9 a 18 anos 	EER = 135,3 – (30,8 x idade [anos]) + AF x (10,0 x peso [kg]) + (934 x altura [m]) + 25 kcal
    ADULTOS DE 19 ANOS OU MAIS - EER (KCAL/DIA) = GASTO ENERGÉTICO TOTAL
      [ok] Homens 	EER = 662 – (9,53 x idade [anos]) + AF x (15,91 x peso [kg]) + (539,6 x altura [m])
      [ok] Mulheres	EER = 354 – (6,91 x idade [anos]) + AF x (9,36 x peso [kg]) + (726 x altura [m])
      GESTAÇÃO - EER (KCAL/DIA) = EER DE MULHERES* + ADICIONAL PARA O GASTO DURANTE A GESTAÇÃO + ENERGIA DE DEPÓSITO
      1° Trimestre	EER = EER de mulheres + 0 + 0
      2° Trimestre 	EER = EER de mulheres + (8 kcal x IG [Idade gestacional em semanas]) + 180 kcal
      3° Trimestre 	EER = EER de mulheres + (8 kcal x IG [Idade gestacional em semanas]) + 180 kcal
        1st trimester EER = Non-pregnant EER + 0
        2nd trimester EER = Non-pregnant EER + 340
        3rd trimester EER = Non-pregnant EER + 452
      LACTAÇÃO - EER (KCAL/DIA) = EER DE MULHERES* + ENERGIA PARA A PRODUÇÃO DE LEITE + ENERGIA PARA A PERDA DE PESO
      1° Semestre	EER = EER de mulheres + 500 – 170
      2° Semestre	EER = EER de mulheres + 400 – 0
        0-6 months postpartum EER = Non-pregnant EER + 330
        7-12 months postpartum EER = Non-pregnant EER + 400
    
    BEE (Gasto Energético Basal) ADOLESCENTES COM SOBREPESO E OBESIDADE
      [ok] Homens	BEE = 419,9 – (35,5 x idade [anos]) + (418,9 x altura [m]) + (16,7 x peso [kg])
      [ok] Mulheres	BEE = 515,8 – (26,8 x idade [anos]) + (347 x altura [m]) + (12,4 x peso [kg])

    TEE (Gasto Total de Energia) CRIANÇAS E ADOLESCENTES DE 3 A 18 ANOS QUE APRESENTAM SOBREPESO OU OBESIDADE
      [ok] Meninos	TEE = 114 – (50,9 x idade [anos]) + AF x (19,5 x peso [kg]) + (1.161,4 x altura [m])
      [ok] Meninas	TEE = 389 – (41,2 x idade [anos]) + AF x (15,0 x peso [kg]) + (701,6 x altura [m])

    AF para EER
    CRIANÇAS E ADOLESCENTES DE 3 A 18 ANOS
            SEDENTÁRIO	POUCO ATIVO	ATIVO 	MUITO ATIVO
    Meninos	1,00      	1,13      	1,26  	1,42
    Meninas	1,00	      1,16      	1,31  	1,56
    ADULTOS DE 19 ANOS OU MAIS
              SEDENTÁRIO	POUCO ATIVO	ATIVO 	MUITO ATIVO
    Homens	  1,00	      1,11	      1,25	  1,48
    Mulheres	1,00	      1,12	      1,27  	1,45

    AF para TEE
    CRIANÇAS E ADOLESCENTES DE 3 A 18 ANOS
              SEDENTÁRIO	POUCO ATIVO	  ATIVO 	MUITO ATIVO
    Meninos	  1,00  	    1,12          1,24	  1,45
    Meninas	  1,00	      1,18      	  1,35  	1,60
    ADULTOS DE 19 ANOS OU MAIS
              SEDENTÁRIO	POUCO ATIVO	  ATIVO 	MUITO ATIVO
    Homens  	1,00      	1,12      	  1,29  	1,59
    Mulheres	1,00	      1,16      	  1,27  	1,44

    http://www.drnutricao.com.br/Calorias/calcular-calorias
  */
}