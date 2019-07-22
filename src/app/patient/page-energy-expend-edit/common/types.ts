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
}