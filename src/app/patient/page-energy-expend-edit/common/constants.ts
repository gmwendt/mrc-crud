import { INafItem } from './types';

export const NafList: INafItem[] = [{
  name: 'Sedentário',
  description: 'Trabalhos domésticos de esforço leve a moderado, atividades do cotidiano, sentado',
  value: 1.2
}, {
  name: 'Pouco ativo',
  description: 'Caminhadas (6,4 km/h) mais atividades do sedentário',
  value: 1.4
}, {
  name: 'Ativo',
  description: 'Ginástica aeróbica, corrida, natação, tênis mais atividades do sedentário',
  value: 1.6
}, {
  name: 'Muito ativo',
  description: 'Ciclismo de intensidade moderada, corrida, pular corda, tênis mais atividades do sedentário',
  value: 1.9
}];