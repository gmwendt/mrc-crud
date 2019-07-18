import { IActivityFactor, IEnergyExpendProtocol } from './types';
import { TmplAstBoundAttribute } from '@angular/compiler';

export const ActiviFactorHeB: IActivityFactor[] = [{
  name: 'Sedentário',
  value: 1.2
}, {
  name: 'Pouco ativo',
  value: 1.375
}, {
    name: 'Moderado',
    value: 1.55
}, {
  name: 'Ativo',
  value: 1.725
}, {
  name: 'Muito ativo',
  value: 1.9
  }];

export const EnergyExpendProtocol: IEnergyExpendProtocol[] = [{ id: 0, name: 'Harris & Benedict (1919)' }, { id: 1, name: 'FAO/OMS (2001)' },
  { id: 2, name: 'FAO/OMS (1985)' }];