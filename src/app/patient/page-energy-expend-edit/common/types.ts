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
      if (age >= 18 && age < 30)
        return weight * 14.818 + 486.6;
      else if (age >= 30 && age < 60)
        return weight * 8.126 + 845.6;
      else if (weight >= 60)
        return weight * 9.082 + 658.5;
    }
    else {
      if (age >= 18 && age < 30)
        return weight * 15.057 + 692.2;
      else if (age >= 30 && age < 60)
        return weight * 11.472 + 873.1;
      else if (weight >= 60)
        return weight * 11.711 + 587.7;
    }
  }

  static get_FAO_OMS_2001(gender: GenderEnum, age: number, weight: number, activFactor: number, injuryFactor: number = 1): number {
    return EnergyExpendCalculator.tmb_FAO_OMS_2001(gender, age, weight) * activFactor * injuryFactor;
  }
}