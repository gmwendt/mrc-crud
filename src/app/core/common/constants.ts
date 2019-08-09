import { PoopShadesEnum, UrineColorEnum, IMetabolicTrackingItem, ValueClassification, ICorporalDensityProtocol, CorporalDensityProtocolsEnum, LaboratoryExamItem, INutrient, IFoodCategory } from "./types";

export class LocalStorageConstants {
  public static MRC_USER = '_MRC_USER';
}

export const DaysWeek: string[] = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
export const DaysWeekAbv: string[] = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

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

export const SeriesColors: string[] = ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"];

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

export const MealGroups: any[] = [
  { id: '1', description: 'Café da manhã' }, { id: '2', description: 'Lanche da manhã' }, { id: '3', description: 'Almoço' }, { id: '4', description: 'Lanche da tarde' },
  { id: '5', description: 'Janta' }, { id: '6', description: 'Ceia' }, { id: '7', description: 'Pré-treino' }, { id: '8', description: 'Pos-treino' }
  ];

export const MicroNutrients: INutrient[] = [ { id: 'calcium', description: 'Cálcio' }, { id: 'cholesterol', description: 'Colesterol' }, { id: 'fiber', description: 'Fibra alimentar' },
  { id: 'iron', description: 'Ferro' }, { id: 'magnesium', description: 'Magnésio' }, { id: 'manganese', description: 'Manganês' }, { id: 'phosphorus', description: 'Fósforo' }, { id: 'potassium', description: 'Potássio' },
  { id: 'pyridoxine', description: 'Vitamina B6 (Piridoxina)' }, { id: 'retinol', description: 'TODO' }, { id: 'riboflavin', description: 'Vitamina B2 (Riboflavina)' }, { id: 'sodium', description: 'Sódio' },
  { id: 'thiamine', description: 'Vitamina B1 (Tiamina)' }, { id: 'zinc', description: 'Zinco' }, { id: 'vitaminC', description: 'Vitamina C (Ácido ascórbico)' }];

export const FoodCategories: IFoodCategory[] = [{ id: 1, description: 'Cereais e derivados' }, { id: 2, description: 'Verduras, hortaliças e derivados' }, { id: 3, description: 'Frutas e derivados' }, 
{ id: 4, description: 'Pescados e frutos do mar' }, { id: 5, description: 'Carnes e derivados' }, { id: 6, description: 'Miscelâneas' }, { id: 7, description: 'Leguminosas e derivados' }, 
{ id: 8, description: 'Nozes e Sementes' }];

export const Macronutrients: INutrient[] = [{ id: 'carbohydrate', description: 'Carboidratos' }, { id: 'lipid', description: 'Lipídios' }, { id: 'protein', description: 'Proteinas' }];

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

export const CorporalDensityProtocols: ICorporalDensityProtocol[] = [
  { text: '3 Pregas: Jackson & Pollock', value: CorporalDensityProtocolsEnum.JacksonAndPollock }, //H e M
  { text: '3 Pregas: Guedes', value: CorporalDensityProtocolsEnum.Guedes }, //H e M
  { text: '4 Pregas: Durin & Womersley', value: CorporalDensityProtocolsEnum.DurinAndWomersley }, 
  { text: '4 Pregas: Faulkner', value: CorporalDensityProtocolsEnum.Faulkner }, 
  { text: '3 Pregas: Jackson, Pollock & Ward', value: CorporalDensityProtocolsEnum.JacksonPollockAndWard }, 
];