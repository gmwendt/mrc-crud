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

export interface IWomanSituation {
  id: number;
  description: string;
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

  static eer_iom_2005(gender: GenderEnum, age: number, kg: number, m: number, af: number, monsthsAge?: number, injuryFactor: number = 1,
    womanSituation: number = 1, womanSituationTime: number = 0): number {

    let value: number;
    let womanAcc = 0;

    if (womanSituation == 2) 
      womanAcc = womanSituationTime <= 12 ? 0 : womanSituationTime * 8 + 180;
    else if (womanSituation == 3) {
      womanAcc = womanSituationTime <= 6 ? 330 : 400;
    }
    
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
        88.5 - (61.9 * age) + af * (26.7 * kg) + (903 * m) + 25 : 135.3 - (30.8 * age) + af * (10.0 * kg) + (934 * m) + 25 + womanAcc;
    else if (age > 18)
      value = gender == GenderEnum.Male ?
        662 - (9.53 * age) + af * (15.91 * kg) + (539.6 * m) : 354 - (6.91 * age) + af * (9.36 * kg) + (726 * m) + womanAcc;
    
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
   * Fonte ERR, BEE e TEE
   * http://www.drnutricao.com.br/Calorias/calcular-calorias
  */
}