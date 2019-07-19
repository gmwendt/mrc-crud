import { IActivityFactor, IEnergyExpendProtocol, IInjuryFactor } from './types';
import { TmplAstBoundAttribute } from '@angular/compiler';

export const ActiviFactorHeB: IActivityFactor[] = [{
  name: '',
  value: -1
},
  {
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

export const ActiviFactorFaoOms: IActivityFactor[] = [{
  name: '',
  value: -1
},{
  name: 'Sedentário',
  value: 1.2
}, {
  name: 'Leve',
  value: 1.545
}, {
  name: 'Moderado',
  value: 1.845
}, {
  name: 'Pesado',
  value: 2.19
}];

export const EnergyExpendProtocol: IEnergyExpendProtocol[] = [{ id: 0, name: 'Harris & Benedict (1919)' }, { id: 1, name: 'FAO/OMS (2001)' },
  { id: 2, name: 'FAO/OMS (1985)' }];

export const InjuryFactorList: IInjuryFactor[] = [{ id: 0, description: 'Não se aplica', min: 1, max: 1 }, { id: 3, description: 'Cirurgia eletiva', min: 1, max: 1.1 }, { id: 1, description: 'Câncer', min: 1.1, max: 1.45 },
  { id: 5, description: 'Desnutrição grave', min: 1.5, max: 1.5 }, { id: 7, description: 'Fraturas múltiplas', min: 1.2, max: 1.35 }, { id: 9, description: 'Infecção grave', min: 1.3, max: 1.35 }, { id: 11, description: 'Insuficiência cardíaca', min: 1.3, max: 1.5 },
  { id: 14, description: 'Insuficiência hepática: (40 – 100%)', min: 1.3, max: 1.55 }, { id: 16, description: 'Insuficiência renal aguda', min: 1.3, max: 1.3 }, { id: 18, description: 'Manutenção de peso', min: 1.2, max: 1.5 },
  { id: 19, description: 'Operação eletiva', min: 1.75, max: 1.75 }, { id: 4, description: 'PO de cirurgia cardíaca', min: 1.2, max: 1.5 }, { id: 6, description: 'PO de cirurgia geral', min: 1, max: 1.5 }, { id: 21, description: 'Paciente não complicado', min: 1, max: 1 },
  { id: 23, description: 'Pancreatite', min: 1.3, max: 1.8 }, { id: 25, description: 'Pequena cirurgia', min: 1.2, max: 1.2 }, { id: 26, description: 'Pequeno trauma de tecido', min: 1.14, max: 1.37 }, { id: 2, description: 'Peritonite', min: 1.2, max: 1.5 },
  { id: 8, description: 'Politraumatizados', min: 1.9, max: 1.9 }, { id: 15, description: 'Queimadura extensas', min: 2.7, max: 2.7 }, { id: 12, description: 'Queimadura: (20 – 40%)', min: 1.5, max: 1.85 }, { id: 13, description: 'Queimadura: (40 – 100%)', min: 1.85, max: 2.05 },
  { id: 10, description: 'Queimadura: (até 20%)', min: 1, max: 1.5 }, { id: 17, description: 'Septicemia', min: 1.4, max: 1.8 }, { id: 20, description: 'Transplante de fígado', min: 1.2, max: 1.5 }, { id: 22, description: 'Transplante de medula óssea', min: 1.2, max: 1.3 },
  { id: 24, description: 'Trauma esquelético', min: 1.35, max: 1.35 }];
