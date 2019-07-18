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
}