import { PoopShadesEnum, UrineColorEnum, IMetabolicTrackingItem, ValueClassification } from "./types";

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

export class ImcClassification {
  public static UnderWeight: ValueClassification = { color: '#96d3e4', text: 'Abaixo do peso' };
  public static IdealWeight: ValueClassification = { color: '#42cb81', text: 'Peso ideal' };
  public static OverWeight: ValueClassification = { color: '#f2d38b', text: 'Sobrepeso' };
  public static ObesityI: ValueClassification = { color: '#e9a340', text: 'Obesidade I' };
  public static ObesityII: ValueClassification = { color: '#ef6161', text: 'Obesidade II' };
  public static ObesityIII: ValueClassification = { color: '#d361ef', text: 'Obesidade III' };
}

export class FecesFormatDescription {
  public static Type1 = 'Caroços duros e separados, como nozes (difícil de passar)';
  public static Type2 = 'Forma de salsicha, mas granuloso';
  public static Type3 = 'Como uma salsicha, mas com fissuras em sua superfície';
  public static Type4 = 'Como uma salsicha ou serpente, suave e macio';
  public static Type5 = 'Bolhas suaves com bordas nítidas (que passa facilmente)';
  public static Type6 = 'Peças fofas com bordas em pedaços';
  public static Type7 = 'Aquoso, sem partes sólidas, inteiramente líquido';
}

export class PoopShadeDescription {
  public static Black = 'Sinal de sangramento no trato gastrointestinal superior. Ingestão de alcaçuz preto, mirtilo, suplementos de ferro, chumbo ou remédios de bismuto (Pepto-Bismol).';
  public static Brown = 'Normal.';
  public static Green = 'A comida pode estar se movendo pelo intestino grosso muito rapidamente. Consumo de vegetais verdes.';
  public static Pale = 'Falta de bile nas fezes. Obstrução do ducto biliar.';
  public static Yellow = 'Excesso de gordura nas fezes. Má absorção intestinal. Doença celíaca.';
  public static Red = 'Sangramento no trato intestinal inferior. Hemorróidas.';

  public static getValueDescription(enumValue: PoopShadesEnum): string {
    switch (enumValue) {
      case PoopShadesEnum.Black:
        return this.Black;
      case PoopShadesEnum.Brown:
        return this.Brown;
      case PoopShadesEnum.Green:
        return this.Green;
      case PoopShadesEnum.Pale:
        return this.Pale;
      case PoopShadesEnum.Red:
        return this.Red;
      case PoopShadesEnum.Yellow:
        return this.Yellow;
    }
  }
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

export class UrineColorDescription {
  public static Hydrated = 'Hidratado';
  public static Dehydrated = 'Desidratado';
  public static SeverelyDehydrated = 'Severamente desidratado';

  public static getValueDescription(enumValue: UrineColorEnum): string {
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

export class MetabolicTrackingGroup {
  public static Head = 'head';
  public static Eyes = 'eyes';
  public static Ears = 'ears';
  public static Nose = 'nose';
  public static MouthAndThroat = 'mouth_and_throat';
  public static Skin = 'skin';
  public static Heart = 'heart';
  public static Lungs = 'lungs';
  public static DisgestiveTreatment = 'disgestive_treatment';
  public static JointsAndMuscles = 'joints_and_muscles';
  public static EnergyActivity = 'energy_activity';
  public static Mind = 'mind';
  public static Emotions = 'emotions';
  public static Others = 'others';
  public static keys = [
    MetabolicTrackingGroup.Head, MetabolicTrackingGroup.Eyes, MetabolicTrackingGroup.Ears, MetabolicTrackingGroup.Nose,
    MetabolicTrackingGroup.MouthAndThroat, MetabolicTrackingGroup.Skin, MetabolicTrackingGroup.Heart, MetabolicTrackingGroup.Lungs, 
    MetabolicTrackingGroup.DisgestiveTreatment, MetabolicTrackingGroup.JointsAndMuscles, MetabolicTrackingGroup.EnergyActivity,
    MetabolicTrackingGroup.Mind, MetabolicTrackingGroup.Emotions, MetabolicTrackingGroup.Others
  ];

  public static getGroupNamePTBR(group: string): string {
    switch (group) {
      case MetabolicTrackingGroup.Head:
        return 'Cabeça';
      case MetabolicTrackingGroup.Eyes:
        return 'Olhos';
      case MetabolicTrackingGroup.Ears:
        return 'Ouvidos';
      case MetabolicTrackingGroup.Nose:
        return 'Nariz';
      case MetabolicTrackingGroup.MouthAndThroat:
        return 'Boca / Garganta';
      case MetabolicTrackingGroup.Skin:
        return 'Pele';
      case MetabolicTrackingGroup.Heart:
        return 'Coração';
      case MetabolicTrackingGroup.Lungs:
        return 'Pulmões';
      case MetabolicTrackingGroup.DisgestiveTreatment:
        return 'Trato digestivo';
      case MetabolicTrackingGroup.JointsAndMuscles:
        return 'Articulações / Músculos';
      case MetabolicTrackingGroup.EnergyActivity:
        return 'Energia / Atividade';
      case MetabolicTrackingGroup.Mind:
        return 'Mente';
      case MetabolicTrackingGroup.Emotions:
        return 'Emoções';
      case MetabolicTrackingGroup.Others:
        return 'Outros';
    }
  }

  public static getScoreDesc(score: number): string {
    if (score <= 30)
      return 'Saudável, baixa chance de hipersensibilidades.';
    else if (score <= 40)
      return 'Indicativo de existência de hipersensibilidades.';
    else if (score <= 100)
      return 'Absoluta certeza de existência de hipersensibilidades.';
    else
      return 'Saúde muito ruim. Alta dificuldade para executar tarefas diárias, pode estar associado à presença de doenças crônicas.';
  }

  public static getBGColor(score: number): string {
    if (score <= 30)
      return '#d2f8d2';
    else if (score <= 40)
      return '#faebd7';
    else if (score <= 100)
      return '#f08080';
    else
      return '#212121';
  }

  public static getColor(score: number): string {
    if (score <= 30)
      return '#568e56';
    else if (score <= 40)
      return '#4b4640';
    else if (score <= 100)
      return '#180c0c';
    else
      return '#a9a9a9';
  }
}

export const MetabolicTrackingList: IMetabolicTrackingItem[] = [
  { id: 'headache', group: MetabolicTrackingGroup.Head, description: 'Dor de cabeça', score: 0 },
  { id: 'feelingOfFainting', group: MetabolicTrackingGroup.Head, description: 'Sensação de desmaio', score: 0 },
  { id: 'dizziness', group: MetabolicTrackingGroup.Head, description: 'Tonturas', score: 0 },
  { id: 'insomnia', group: MetabolicTrackingGroup.Head, description: 'Insônia', score: 0 },

  { id: 'wateryOrItchy', group: MetabolicTrackingGroup.Eyes, description: 'Lacrimejantes ou coçando', score: 0 },
  { id: 'swollenOrRedOrEyelashesGluing', group: MetabolicTrackingGroup.Eyes, description: 'Inchados, vermelhos ou com cílios colando', score: 0 },
  { id: 'bagsOrDarkCirclesUnderTheEyes', group: MetabolicTrackingGroup.Eyes, description: 'Bolsas ou olheiras abaixo dos olhos', score: 0 },
  { id: 'blurredOrTunnelVisionWithoutMyopiaAstigmatism', group: MetabolicTrackingGroup.Eyes, description: 'Visão borrada ou em túnel (sem miopia/astigmatismo)', score: 0 },

  { id: 'itch', group: MetabolicTrackingGroup.Ears, description: 'Coceira', score: 0 },
  { id: 'earachesOrInfections', group: MetabolicTrackingGroup.Ears, description: 'Dores de ouvido, infecções auditivas', score: 0 },
  { id: 'purulentFluid', group: MetabolicTrackingGroup.Ears, description: 'Retirada de fluido purulento do ouvido', score: 0 },
  { id: 'buzzingOrHearingLoss', group: MetabolicTrackingGroup.Ears, description: 'Zunido, perda da audição', score: 0 },

  { id: 'stuffyNose', group: MetabolicTrackingGroup.Nose, description: 'Entupido', score: 0 },
  { id: 'sinusitis', group: MetabolicTrackingGroup.Nose, description: 'Problemas de seios nasais (sinusite)', score: 0 },
  { id: 'runnyNoseAndNeezingAndItchyEyes', group: MetabolicTrackingGroup.Nose, description: 'Corrimento nasal, espirros e coceira dos olhos', score: 0 },
  { id: 'sneezingAttacks', group: MetabolicTrackingGroup.Nose, description: 'Ataques de espirros', score: 0 },
  { id: 'excessiveMucusFormation', group: MetabolicTrackingGroup.Nose, description: 'Excessiva formação de muco', score: 0 },

  { id: 'chronicCough', group: MetabolicTrackingGroup.MouthAndThroat, description: 'Tosse crônica', score: 0 },
  { id: 'frequentNeedToClearThroat', group: MetabolicTrackingGroup.MouthAndThroat, description: 'Frequente necessidade de limpar a garganta', score: 0 },
  { id: 'soreThroatOrHoarsenessOrLossOfVoice', group: MetabolicTrackingGroup.MouthAndThroat, description: 'Dor de garganta, rouquidão ou perda da voz', score: 0 },
  { id: 'swollenOrDiscoloredGumsOrLips', group: MetabolicTrackingGroup.MouthAndThroat, description: 'Língua gengivas ou lábios inchados / descoloridos', score: 0 },
  { id: 'cankerSores', group: MetabolicTrackingGroup.MouthAndThroat, description: 'Aftas', score: 0 },

  { id: 'acne', group: MetabolicTrackingGroup.Skin, description: 'Acne', score: 0 },
  { id: 'itchyWoundsOrRashesOrDrySkin', group: MetabolicTrackingGroup.Skin, description: 'Feridas que coçam, erupções ou pele seca', score: 0 },
  { id: 'hairLoss', group: MetabolicTrackingGroup.Skin, description: 'Perda de cabelo', score: 0 },
  { id: 'rednessOrHeat', group: MetabolicTrackingGroup.Skin, description: 'Vermelhidão, calorões', score: 0 },
  { id: 'excessiveSweating', group: MetabolicTrackingGroup.Skin, description: 'Suor excessivo', score: 0 },

  { id: 'irregularOrFailingBeats', group: MetabolicTrackingGroup.Heart, description: 'Batidas irregulares ou falhando', score: 0 },
  { id: 'tooFastBeats', group: MetabolicTrackingGroup.Heart, description: 'Batidas rápidas demais', score: 0 },
  { id: 'chestPain', group: MetabolicTrackingGroup.Heart, description: 'Dor no peito', score: 0 },

  { id: 'chestCongestion', group: MetabolicTrackingGroup.Lungs, description: 'Congestão no peito', score: 0 },
  { id: 'asthmaOrBronchitis', group: MetabolicTrackingGroup.Lungs, description: 'Asma, bronquite', score: 0 },
  { id: 'littleBreath', group: MetabolicTrackingGroup.Lungs, description: 'Pouco fôlego', score: 0 },
  { id: 'difficultyBreathing', group: MetabolicTrackingGroup.Lungs, description: 'Dificuldade para respirar', score: 0 },

  { id: 'nauseaOrVomiting', group: MetabolicTrackingGroup.DisgestiveTreatment, description: 'Náuseas, vômito', score: 0 },
  { id: 'diarrhea', group: MetabolicTrackingGroup.DisgestiveTreatment, description: 'Diarréia', score: 0 },
  { id: 'constipation', group: MetabolicTrackingGroup.DisgestiveTreatment, description: 'Constipação, prisão de ventre', score: 0 },
  { id: 'feelsSwollenOrDistendedAbdomen', group: MetabolicTrackingGroup.DisgestiveTreatment, description: 'Sente-se inchado, abdômen distendido', score: 0 },
  { id: 'bowelOrIntestinalGas', group: MetabolicTrackingGroup.DisgestiveTreatment, description: 'Arrotos e/ ou gases intestinais', score: 0 },
  { id: 'heartburn', group: MetabolicTrackingGroup.DisgestiveTreatment, description: 'Azia', score: 0 },
  { id: 'stomachOrIntestinalPain', group: MetabolicTrackingGroup.DisgestiveTreatment, description: 'Dor estomacal / intestinal', score: 0 },

  { id: 'jointPain', group: MetabolicTrackingGroup.JointsAndMuscles, description: 'Dores articulares', score: 0 },
  { id: 'arthritis', group: MetabolicTrackingGroup.JointsAndMuscles, description: 'Artrite / artrose', score: 0 },
  { id: 'rigidityOrLimitationOfMovement', group: MetabolicTrackingGroup.JointsAndMuscles, description: 'Rigidez ou limitação dos movimentos', score: 0 },
  { id: 'muscleAches', group: MetabolicTrackingGroup.JointsAndMuscles, description: 'Dores musculares', score: 0 },
  { id: 'feelingWeakOrTired', group: MetabolicTrackingGroup.JointsAndMuscles, description: 'Sensação de fraqueza ou cansaço', score: 0 },

  { id: 'fatigue', group: MetabolicTrackingGroup.EnergyActivity, description: 'Fadiga, moleza', score: 0 },
  { id: 'apathyOrLethargy', group: MetabolicTrackingGroup.EnergyActivity, description: 'Apatia, letargia', score: 0 },
  { id: 'hyperactivity', group: MetabolicTrackingGroup.EnergyActivity, description: 'Hiperatividade', score: 0 },
  { id: 'difficultyInRestingOrRelaxing', group: MetabolicTrackingGroup.EnergyActivity, description: 'Dificuldade em descansar, relaxar', score: 0 },

  { id: 'badMemory', group: MetabolicTrackingGroup.Mind, description: 'Memória ruim', score: 0 },
  { id: 'mentalConfusionOrPoorUnderstanding', group: MetabolicTrackingGroup.Mind, description: 'Confusão mental, compreensão ruim', score: 0 },
  { id: 'badConcentration', group: MetabolicTrackingGroup.Mind, description: 'Concentração ruim', score: 0 },
  { id: 'poorMotorConcentration', group: MetabolicTrackingGroup.Mind, description: 'Fraca concentração motora', score: 0 },
  { id: 'difficultyInMakingDecisions', group: MetabolicTrackingGroup.Mind, description: 'Dificuldade em tomar decisões', score: 0 },
  { id: 'wordRepetitionsWithInvoluntaryPauses', group: MetabolicTrackingGroup.Mind, description: 'Repetições de palavras, com pausas involuntárias', score: 0 },
  { id: 'pronounceWordsIndistinctlyOrConfused', group: MetabolicTrackingGroup.Mind, description: 'Pronuncia palavras de forma indistinta, confusa', score: 0 },
  { id: 'learningProblems', group: MetabolicTrackingGroup.Mind, description: 'Problemas de aprendizagem', score: 0 },

  { id: 'changeOfMood', group: MetabolicTrackingGroup.Emotions, description: 'Mudanças de humor', score: 0 },
  { id: 'anxietyFearNervousness', group: MetabolicTrackingGroup.Emotions, description: 'Ansiedade, medo, nervosismo', score: 0 },
  { id: 'angerIrritabilityAggressiveness', group: MetabolicTrackingGroup.Emotions, description: 'Raiva, irritabilidade, agressividade', score: 0 },
  { id: 'depression', group: MetabolicTrackingGroup.Emotions, description: 'Depressão', score: 0 },

  { id: 'oftenSick', group: MetabolicTrackingGroup.Others, description: 'Frequentemente doente', score: 0 },
  { id: 'frequentOrUrgentUrgeToUrinate', group: MetabolicTrackingGroup.Others, description: 'Frequente ou urgente vontade de urinar', score: 0 },
  { id: 'genitalItchingOrDischarge', group: MetabolicTrackingGroup.Others, description: 'Coceira genital ou corrimento', score: 0 },
];
/*
export class Nutrients {
  public static AcidoGraxoOmega6 = 'Ácido Graxo Ômega-6';
  public static AcidoLinoleico = 'Ácido Linoleico';
  public static AcidoPantotenico = 'Ácido Pantotênico';
  public static Biotina = 'Biotina';
  public static Cadmio = 'Cádmio';
  public static Calcio = 'Cálcio';
  public static Cobre = 'Cobre';
  public static Cromo = 'Cromo';
  public static Ferro = 'Ferro';
  public static Fosforo = 'Fósforo';
  public static Iodo = 'Iodo';
  public static Magnesio = 'Magnésio';
  public static Manganes = 'Manganês';
  public static PABA = 'PABA';
  public static Proteina = 'Proteína';
  public static Selenio = 'Selênio';
  public static Sodio = 'Sódio';
  public static VitaminaA = 'Vitamina A (Retinol)';
  public static VitaminaB1 = 'Vitamina B1 (Tiamina)';
  public static VitaminaB2 = 'Vitamina B2 (Riboflavina)';
  public static VitaminaB3 = 'Vitamina B3 (Niacina)';
  public static VitaminaB6 = 'Vitamina B6 (Piridoxina)';
  public static VitaminaB9 = 'Vitamina B9 (Ácido Fólico)';
  public static VitaminaB12 = 'Vitamina B12 (Cobalamina)';
  public static VitaminaC = 'Vitamina C (Ácido Ascórbico)';
  public static VitaminaD = 'Vitamina D (Calciferol)';
  public static VitaminaE = 'Vitamina E (Tocoferol)';
  public static VitaminaK = 'Vitamina K (Naftoquinona)';
  public static Zinco = 'Zinco';
}

export interface SymptomOption {
  name: string;
  selected?: boolean;
}

export const SymptomsGroups: SymptomOption[] = [
  { name: 'Todos', selected: true },
  { name: 'Articulações' }, { name: 'Boca / Garganta' }, { name: 'Cabelos' },
  { name: 'Cardio-pulmonar' }, { name: 'Gastrointestinal' }, { name: 'Gengivas' },
  { name: 'Gerais' }, { name: 'Ginecológico' }, { name: 'Humor' }, { name: 'Intestino' },
  { name: 'Lábios' }, { name: 'Língua' }, { name: 'Nariz' }, { name: 'Neuro-muscular' },
  { name: 'Olhos' }, { name: 'Ossos' }, { name: 'Ouvidos' }, { name: 'Pele' }, 
  { name: 'Rins' }, { name: 'SNC' }
]

export const SymptomsList: ISymptom[] = [
  //Articulações
  { id: 0, name: 'Dores', group: 'Articulações', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.Magnesio, Nutrients.VitaminaB6, Nutrients.VitaminaC], 
    nutrientsExcess: [Nutrients.VitaminaA] },
  //Boca / Garganta
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
  //Cabelos
  { id: 7, name: 'Cabelos secos e quebradiços', group: 'Cabelos', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.VitaminaA, Nutrients.VitaminaC, Nutrients.Zinco] },
  { id: 8, name: 'Calvície precoce', group: 'Cabelos', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.VitaminaB6] },
  { id: 9, name: 'Queda de cabelo', group: 'Cabelos', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.Calcio, Nutrients.VitaminaB2, Nutrients.Zinco],
    nutrientsExcess: [Nutrients.VitaminaA] },
  //Cardio-pulmonar
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
  //Gastrointestinal
  { id: 15, name: 'Coceira e prurido no ânus', group: 'Gastrointestinal', nutrientDeficiency: [Nutrients.VitaminaB1] },
  { id: 16, name: 'Dificuldade de deglutição', group: 'Gastrointestinal', locationOnWeb: 'Assimilação',
    nutrientDeficiency: [Nutrients.Ferro, Nutrients.VitaminaB1, Nutrients.VitaminaB2, Nutrients.VitaminaB3] },
  { id: 17, name: 'Dor abdominal', group: 'Gastrointestinal', locationOnWeb: 'Assimilação',
    nutrientDeficiency: [Nutrients.VitaminaB1, Nutrients.VitaminaB6] },
  { id: 18, name: 'Falta de apetite', group: 'Gastrointestinal', locationOnWeb: 'Assimilação',
    nutrientDeficiency: [Nutrients.Ferro, Nutrients.Magnesio, Nutrients.Sodio, Nutrients.VitaminaA, Nutrients.VitaminaB1, 
      Nutrients.VitaminaB3, Nutrients.VitaminaB6, Nutrients.VitaminaB9, Nutrients.VitaminaB12, Nutrients.VitaminaC, Nutrients.Zinco],
    nutrientsExcess: [Nutrients.VitaminaA, Nutrients.VitaminaD] },
  { id: 19, name: 'Indigestão', group: 'Gastrointestinal', locationOnWeb: 'Assimilação',
    nutrientDeficiency: [Nutrients.VitaminaB1, Nutrients.VitaminaB3, Nutrients.VitaminaB9, Nutrients.VitaminaB12] },
  { id: 20, name: 'Náuseas', group: 'Gastrointestinal', locationOnWeb: 'Assimilação',
    nutrientDeficiency: [Nutrients.Magnesio, Nutrients.Manganes, Nutrients.VitaminaB3, Nutrients.VitaminaB6],
    nutrientsExcess: [Nutrients.Ferro, Nutrients.Zinco] },
  { id: 21, name: 'Vômito', group: 'Gastrointestinal', locationOnWeb: 'Assimilação',
    nutrientDeficiency: [Nutrients.Calcio, Nutrients.Magnesio, Nutrients.VitaminaB1, Nutrients.VitaminaK],
    nutrientsExcess: [Nutrients.Ferro, Nutrients.VitaminaD, Nutrients.Zinco] },
  //Gengivas
  { id: 22, name: 'Gengivas inflamadas e doloridas', group: 'Gengivas', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.VitaminaC] },
  { id: 23, name: 'Sangramento gengival', group: 'Gengivas', locationOnWeb: 'Estrutura',
    nutrientDeficiency: [Nutrients.VitaminaC], nutrientsExcess: [Nutrients.VitaminaA] },
  //Gerais
  { id: 24, name: 'Anemia', group: 'Gerais', locationOnWeb: 'Estrutura',
    nutrientsExcess: [Nutrients.VitaminaK] },
  { id: 25, name: 'Apatia / letargia', group: 'Gerais', locationOnWeb: 'Hormônios e Neurotransmissores',
    nutrientDeficiency: [Nutrients.VitaminaB9] },
  { id: 26, name: 'Aumento do peso', group: 'Gerais', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.Cromo] },
  { id: 27, name: 'Diminuição do peso nos últimos 3 meses', group: 'Gerais', nutrientDeficiency: [Nutrients.Manganes, Nutrients.VitaminaA] },
  { id: 28, name: 'Dor de cabeça', group: 'Gerais', locationOnWeb: 'Hormônios e Neurotransmissores',
    nutrientDeficiency: [Nutrients.Ferro, Nutrients.Sodio, Nutrients.VitaminaB3, Nutrients.VitaminaB9, Nutrients.VitaminaB12],
    nutrientsExcess: [Nutrients.Ferro, Nutrients.VitaminaA, Nutrients.VitaminaB3, Nutrients.VitaminaD] },
  { id: 29, name: 'Febre desconhecida', group: 'Gerais', locationOnWeb: 'Defesa e Reparo', nutrientDeficiency: [Nutrients.VitaminaB1],
    nutrientsExcess: [Nutrients.Ferro] },
  { id: 30, name: 'Hipertensão arterial', group: 'Gerais', locationOnWeb: 'Transporte', nutrientDeficiency: [Nutrients.Calcio],
    nutrientsExcess: [Nutrients.Fosforo, Nutrients.Sodio] },
  { id: 31, name: 'Hipotensão arterial', group: 'Gerais', locationOnWeb: 'Transporte', 
    nutrientDeficiency: [Nutrients.Magnesio, Nutrients.VitaminaB3, Nutrients.VitaminaK] },
  { id: 32, name: 'Inchaço tornozelos / pulsos', group: 'Gerais', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB1] },
  { id: 33, name: 'Retenção de água', group: 'Gerais', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB1] },
  { id: 34, name: 'Sensibilidade ao frio', group: 'Gerais', locationOnWeb: 'Biotransformação e Eliminação (Destoxificação)', nutrientDeficiency: [Nutrients.Ferro] },
  { id: 35, name: 'Suores noturnos', group: 'Gerais', locationOnWeb: 'Biotransformação e Eliminação (Destoxificação)', nutrientDeficiency: [Nutrients.VitaminaB1] },
  { id: 36, name: 'Tonturas / vertigem / zonzeira', group: 'Gerais', locationOnWeb: 'Hormônios e Neurotransmissores', 
    nutrientDeficiency: [Nutrients.Ferro, Nutrients.Magnesio, Nutrients.Sodio, Nutrients.VitaminaB2, Nutrients.VitaminaB3, Nutrients.VitaminaB6, Nutrients.VitaminaB12],
    nutrientsExcess: [Nutrients.Ferro, Nutrients.VitaminaA] },
  //Ginecológico
  { id: 37, name: 'Sangramento vaginal fora da menstruação', group: 'Ginecológico', locationOnWeb: 'Hormônios e Neurotransmissores' },
  { id: 38, name: 'TPM', group: 'Ginecológico', locationOnWeb: 'Hormônios e Neurotransmissores', 
    nutrientDeficiency: [Nutrients.Magnesio, Nutrients.VitaminaB6] },
  //Humor
  { id: 39, name: 'Agitação / Hiperatividade', group: 'Humor', locationOnWeb: 'Hormônios e Neurotransmissores', 
    nutrientDeficiency: [Nutrients.Calcio, Nutrients.Magnesio, Nutrients.VitaminaB1, Nutrients.VitaminaC, Nutrients.Zinco] },
  { id: 40, name: 'Ansiedade / apreensão', group: 'Humor', locationOnWeb: 'Hormônios e Neurotransmissores', 
    nutrientDeficiency: [Nutrients.Cromo, Nutrients.Magnesio, Nutrients.VitaminaB1, Nutrients.VitaminaB3] },
  { id: 41, name: 'Diminuição do interesse e prazer', group: 'Humor', locationOnWeb: 'Hormônios e Neurotransmissores', 
    nutrientDeficiency: [Nutrients.VitaminaB3, Nutrients.VitaminaC] },
  { id: 42, name: 'Humor deprimido', group: 'Humor', locationOnWeb: 'Hormônios e Neurotransmissores', 
    nutrientDeficiency: [Nutrients.VitaminaB3] },
  { id: 43, name: 'Humor lábil', group: 'Humor', locationOnWeb: 'Hormônios e Neurotransmissores', 
    nutrientDeficiency: [Nutrients.Calcio, Nutrients.VitaminaB3, Nutrients.VitaminaB12] },
  { id: 44, name: 'Irritabilidade', group: 'Humor', locationOnWeb: 'Hormônios e Neurotransmissores', 
    nutrientDeficiency: [Nutrients.Calcio, Nutrients.Ferro, Nutrients.Magnesio, Nutrients.VitaminaB1, Nutrients.VitaminaB3, Nutrients.VitaminaB6, 
      Nutrients.VitaminaB12, Nutrients.VitaminaC, Nutrients.Zinco], 
    nutrientsExcess: [Nutrients.VitaminaA] },
  { id: 45, name: 'Nervosismo', group: 'Humor', locationOnWeb: 'Hormônios e Neurotransmissores', 
    nutrientDeficiency: [Nutrients.Calcio, Nutrients.Magnesio, Nutrients.VitaminaB1, Nutrients.VitaminaB6] },
  { id: 46, name: 'Tristeza', group: 'Humor', nutrientDeficiency: [Nutrients.VitaminaC] },
  //Intestino
  { id: 47, name: 'Diarréia', group: 'Intestino', locationOnWeb: 'Assimilação', nutrientDeficiency: [Nutrients.VitaminaB1],
    nutrientsExcess: [Nutrients.VitaminaD, Nutrients.Zinco] },
  { id: 48, name: 'Evacuar com dificuldade', group: 'Intestino', locationOnWeb: 'Assimilação', 
    nutrientDeficiency: [Nutrients.Ferro, Nutrients.Magnesio, Nutrients.VitaminaB1, Nutrients.VitaminaB3, Nutrients.VitaminaB9, Nutrients.VitaminaB12] },
  { id: 49, name: 'Intestino preso', group: 'Intestino', locationOnWeb: 'Assimilação', 
    nutrientDeficiency: [Nutrients.Ferro, Nutrients.VitaminaB1, Nutrients.VitaminaB3, Nutrients.VitaminaB9, Nutrients.VitaminaB12] },
  //Lábios
  { id: 50, name: 'Lábios grossos, vermelhos, doloridos', group: 'Lábios', locationOnWeb: 'Estrutura', 
    nutrientDeficiency: [Nutrients.VitaminaB2, Nutrients.VitaminaB3] },
  { id: 51, name: 'Lábios secos, quebradiços, rachados', group: 'Lábios', locationOnWeb: 'Estrutura', 
    nutrientDeficiency: [Nutrients.VitaminaB2], nutrientsExcess: [Nutrients.VitaminaA] },
  //Língua
  { id: 52, name: 'Ardência na língua', group: 'Língua', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB2] },
  { id: 53, name: 'Língua vermelha, lisa e dolorida', group: 'Língua', locationOnWeb: 'Estrutura', 
  nutrientDeficiency: [Nutrients.Ferro, Nutrients.VitaminaB2, Nutrients.VitaminaB3, Nutrients.VitaminaB6, Nutrients.VitaminaB9, Nutrients.VitaminaB12] },
  { id: 54, name: 'Pálida e lisa', group: 'Língua', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB2] },
  { id: 55, name: 'Rachaduras na língua', group: 'Língua', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB2] },
  //Nariz
  { id: 55, name: 'Diminuição do olfato', group: 'Nariz', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaA, Nutrients.Zinco] },
  //Neuro-muscular
  { id: 56, name: 'Atrofia', group: 'Neuro-muscular', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB1] },
  { id: 57, name: 'Câimbra', group: 'Neuro-muscular', locationOnWeb: 'Estrutura', 
    nutrientDeficiency: [Nutrients.Calcio, Nutrients.Magnesio, Nutrients.Sodio, Nutrients.VitaminaB1, Nutrients.VitaminaB6],
    nutrientsExcess: [Nutrients.VitaminaA, Nutrients.VitaminaK] },
  { id: 58, name: 'Contrações contínuas', group: 'Neuro-muscular', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.Calcio] },
  { id: 59, name: 'Diminuição da coordenação', group: 'Neuro-muscular', locationOnWeb: 'Hormônios e Neurotransmissores', 
    nutrientDeficiency: [Nutrients.VitaminaB6] },
  { id: 60, name: 'Diminuição da sensibilidade dos pés', group: 'Neuro-muscular', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB1] },
  { id: 61, name: 'Diminuição da sensibilidade nos membros inferiores', group: 'Neuro-muscular', locationOnWeb: 'Estrutura', 
    nutrientDeficiency: [Nutrients.Cromo] },
  { id: 62, name: 'Dor nas pernas', group: 'Neuro-muscular', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB1] },
  { id: 63, name: 'Fadiga', group: 'Neuro-muscular', locationOnWeb: 'Estrutura', 
    nutrientDeficiency: [Nutrients.Cromo, Nutrients.Ferro, Nutrients.VitaminaA, Nutrients.VitaminaB1, Nutrients.VitaminaB3, Nutrients.VitaminaB6, 
      Nutrients.VitaminaB9, Nutrients.VitaminaB12, Nutrients.VitaminaC, Nutrients.Zinco] },
  { id: 64, name: 'Formigamento', group: 'Neuro-muscular', locationOnWeb: 'Estrutura', 
    nutrientDeficiency: [Nutrients.Calcio, Nutrients.Fosforo, Nutrients.Magnesio, Nutrients.VitaminaB1, Nutrients.VitaminaB3, Nutrients.VitaminaB6, Nutrients.VitaminaB12],
    nutrientsExcess: [Nutrients.VitaminaB3] },
  { id: 65, name: 'Fraqueza ao fechar as mãos', group: 'Neuro-muscular', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB6] },
  { id: 66, name: 'Fraqueza muscular', group: 'Neuro-muscular', locationOnWeb: 'Estrutura', 
    nutrientDeficiency: [Nutrients.Fosforo, Nutrients.Magnesio, Nutrients.Selenio, Nutrients.Sodio, Nutrients.VitaminaB1, Nutrients.VitaminaB3, Nutrients.VitaminaB6, 
      Nutrients.VitaminaB9, Nutrients.VitaminaB12, Nutrients.VitaminaC, Nutrients.VitaminaE, Nutrients.VitaminaK],
    nutrientsExcess: [Nutrients.Magnesio] },
  { id: 66, name: 'Mialgia', group: 'Neuro-muscular', locationOnWeb: 'Estrutura', 
    nutrientDeficiency: [Nutrients.Magnesio, Nutrients.Selenio, Nutrients.VitaminaB1, Nutrients.VitaminaB3, Nutrients.VitaminaB6, Nutrients.VitaminaC] },
  { id: 67, name: 'Queimação na ponta dos pés', group: 'Neuro-muscular', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB2] },
  { id: 68, name: 'Tremores', group: 'Neuro-muscular', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.Magnesio, Nutrients.VitaminaB3],
    nutrientsExcess: [Nutrients.Sodio] },
  //Olhos
  { id: 69, name: 'Amolecimento da córnea', group: 'Olhos', nutrientDeficiency: [Nutrients.VitaminaA] },
  { id: 70, name: 'Dificuldade de visão noturna', group: 'Olhos', locationOnWeb: 'Estrutura', 
    nutrientDeficiency: [Nutrients.VitaminaA, Nutrients.VitaminaB2, Nutrients.VitaminaC] },
  { id: 71, name: 'Fotofobia', group: 'Olhos', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB2] },
  { id: 72, name: 'Lacrimejamento', group: 'Olhos', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB2] },
  { id: 73, name: 'Olhos secos', group: 'Olhos', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaA] },
  { id: 74, name: 'Queimação / irritação / coceira nos olhos', group: 'Olhos', locationOnWeb: 'Estrutura', 
    nutrientDeficiency: [Nutrients.VitaminaB2, Nutrients.VitaminaB6] },
  { id: 75, name: 'Sensação de areia nos olhos', group: 'Olhos', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB2] },
  { id: 76, name: 'Vermelhidão', group: 'Olhos', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB2] },
  { id: 77, name: 'Visão turva', group: 'Olhos', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB2] },
  //Ossos
  { id: 78, name: 'Fragilidade nos ossos', group: 'Ossos', locationOnWeb: 'Estrutura', nutrientsExcess: [Nutrients.VitaminaA] },
  { id: 79, name: 'Raquitismo / osteoporose', group: 'Ossos', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaD] },
  //Ouvidos
  { id: 79, name: 'Dificuldade de audição', group: 'Ouvidos', nutrientDeficiency: [Nutrients.Manganes] },
  { id: 80, name: 'Zumbido ininterrupto', group: 'Ouvidos', locationOnWeb: 'Transporte', nutrientDeficiency: [Nutrients.Magnesio] },
  //Pele
  { id: 81, name: 'Acne', group: 'Pele', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaA, Nutrients.VitaminaC, Nutrients.Zinco] },
  { id: 82, name: 'Aumento da oleosidade da Pele', group: 'Pele', nutrientDeficiency: [Nutrients.VitaminaB6] },
  { id: 83, name: 'Dermatite / urticária', group: 'Pele', locationOnWeb: 'Estrutura', 
    nutrientDeficiency: [Nutrients.Manganes, Nutrients.VitaminaB2, Nutrients.VitaminaB3] },
  { id: 84, name: 'Dificuldade de cicatrização', group: 'Pele', locationOnWeb: 'Estrutura', nutrientDeficiency: [Nutrients.VitaminaB6, Nutrients.VitaminaC] },
  { id: 85, name: 'Eczema, erupções', group: 'Pele', nutrientDeficiency: [Nutrients.Zinco] },
  { id: 86, name: 'Fácil sangramento', group: 'Pele', locationOnWeb: 'Estrutura', nutrientsExcess: [Nutrients.VitaminaK] },
  { id: 87, name: 'Manchas roxas na pele', group: 'Pele', nutrientDeficiency: [Nutrients.VitaminaC, Nutrients.VitaminaK] },
  { id: 88, name: 'Pele seca / descamação / seborréia', group: 'Pele', locationOnWeb: 'Estrutura', 
    nutrientDeficiency: [Nutrients.Calcio, Nutrients.VitaminaA, Nutrients.VitaminaB2, Nutrients.VitaminaB3, Nutrients.VitaminaC, Nutrients.Zinco],
    nutrientsExcess: [Nutrients.VitaminaA, Nutrients.VitaminaB3] },
  //Rins
  { id: 89, name: 'Cálculos renais', group: 'Rins', nutrientDeficiency: [Nutrients.VitaminaA],
    nutrientsExcess: [Nutrients.VitaminaC, Nutrients.VitaminaD] },
  { id: 90, name: 'Diminuição da freqüência de micção', group: 'Rins', locationOnWeb: 'Transporte', nutrientDeficiency: [Nutrients.Sodio, Nutrients.VitaminaB1] },
  { id: 91, name: 'Urina vermelha com sangue', group: 'Rins', locationOnWeb: 'Transporte', nutrientDeficiency: [Nutrients.VitaminaK] },
  //SNC
  { id: 92, name: 'Aumento da sensibilidade a dor', group: 'SNC', locationOnWeb: 'Hormônios e Neurotransmissores', nutrientDeficiency: [Nutrients.VitaminaB1] },
  { id: 93, name: 'Confusão mental', group: 'SNC', locationOnWeb: 'Hormônios e Neurotransmissores', 
    nutrientDeficiency: [Nutrients.Cromo, Nutrients.Ferro, Nutrients.Magnesio, Nutrients.VitaminaB1, Nutrients.VitaminaB3, Nutrients.VitaminaB6],
    nutrientsExcess: [Nutrients.Calcio, Nutrients.Fosforo, Nutrients.VitaminaK] },
  { id: 94, name: 'Convulsões', group: 'SNC', locationOnWeb: 'Hormônios e Neurotransmissores', 
    nutrientDeficiency: [Nutrients.Calcio, Nutrients.Magnesio, Nutrients.Manganes, Nutrients.Sodio, Nutrients.VitaminaB1, Nutrients.VitaminaB6, 
      Nutrients.VitaminaB9, Nutrients.Zinco] },
  { id: 95, name: 'Desequilíbrio', group: 'SNC', locationOnWeb: 'Hormônios e Neurotransmissores', 
    nutrientDeficiency: [Nutrients.Manganes, Nutrients.VitaminaB1, Nutrients.VitaminaB2] },
  { id: 96, name: 'Desorientação', group: 'SNC', locationOnWeb: 'Hormônios e Neurotransmissores', 
    nutrientDeficiency: [Nutrients.VitaminaB1, Nutrients.VitaminaB3] },

];*/