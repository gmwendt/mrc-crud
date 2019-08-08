import { IHistoricalValue, Measurements, ValueClassification } from "./types";
import { ImcClassification } from "./constants";

export class Equations {

  static text(equation: string): string {
    switch (equation) {
      case 'imc':
        return 'Equação IMC';
    }
  }

  static calculate(equation: string, unit: string, measurement: Measurements): IHistoricalValue[] {
    if (!measurement)
      return;

    switch (equation) {
      case 'imc':
        return this.IMC(measurement, unit);
      case 'imcGoals':
        return this.ImcGoals(measurement, unit);
    }
  }
  
  static getValueClassification(value: any, equation: string): ValueClassification {
    if (!(typeof value === "number"))
      return;
    
    switch (equation) {
      case 'imc':
        if (value < 18.5)
          return ImcClassification.UnderWeight;
        else if (value >= 18.5 && value < 24.5)
          return ImcClassification.IdealWeight;
        else if (value >= 24.5 && value < 30)
          return ImcClassification.OverWeight;
        else if (value >= 30 && value < 35)
          return ImcClassification.ObesityI;
        else if (value >= 35 && value < 40)
          return ImcClassification.ObesityII;
        else if (value >= 40)
          return ImcClassification.ObesityIII;
        break;
    }
  }

  private static IMC(measurements: Measurements, unit: string): IHistoricalValue[] {
    if (!measurements.weigth || measurements.weigth.length == 0)
      return;

    if (!measurements.height || measurements.height.length == 0)
      return;

    let imc: IHistoricalValue[] = [];

    let heightTs = measurements.height.map(m => m.timestamp = m.timestamp.split('T')[0]);
    let weightTs = measurements.weigth.map(m => m.timestamp = m.timestamp.split('T')[0]);

    let concatted = heightTs.concat(weightTs);
    let dates = concatted.filter((v, i, a) => a.indexOf(v) === i);
    dates.sort().reverse();
    
    dates.forEach(date => {
      let height = this.requestValueByDate(measurements.height, date);
      let weight = this.requestValueByDate(measurements.weigth, date);

      if (!height || !weight)
        return;

      height = height / 100;
      imc.push({
        timestamp: date,
        unit: unit,
        value: Math.round(weight / (height * height) * 100) / 100
      });
    });

    return imc;
  }

  private static ImcGoals(measurements: Measurements, unit: string): IHistoricalValue[] {
    if (!measurements.weigthGoals || measurements.weigthGoals.length == 0)
      return;

    if (!measurements.heightGoals || measurements.heightGoals.length == 0)
      return;

    let imc: IHistoricalValue[] = [];

    let heightTs = measurements.heightGoals.map(m => m.timestamp = m.timestamp.split('T')[0]);
    let weightTs = measurements.weigthGoals.map(m => m.timestamp = m.timestamp.split('T')[0]);

    let concatted = heightTs.concat(weightTs);
    let dates = concatted.filter((v, i, a) => a.indexOf(v) === i);
    dates.sort().reverse();
    
    dates.forEach(date => {
      let height = this.requestValueByDate(measurements.heightGoals, date);
      let weight = this.requestValueByDate(measurements.weigthGoals, date);

      if (!height || !weight)
        return;

      height = height / 100;
      imc.push({
        timestamp: date,
        unit: unit,
        value: Math.round(weight / (height * height) * 100) / 100
      });
    });
  }

  static getEquationError(measurements: Measurements, equation: string): string {
    let msg: string;
    let lacks = 0;

    switch (equation) {
      case 'imc': 
        msg = 'Para obter o IMC informe ';
        if (!measurements.weigth || measurements.weigth.length == 0) {
          msg += 'peso';
          lacks++;
        }
    
        if (!measurements.height || measurements.height.length == 0) {
          if (lacks == 1)
            msg += ' e ';
    
          msg += 'altura';
        }
    
        msg += ' do paciente';
        break;
      case 'imcGoals': 
        msg = 'Para obter as metas informe ';
        if (!measurements.weigthGoals || measurements.weigthGoals.length == 0) {
          msg += 'meta para peso';
          lacks++;
        }
    
        if (!measurements.heightGoals || measurements.heightGoals.length == 0) {
          if (lacks == 1)
            msg += ' e ';
    
          msg += 'meta para altura';
        }
    
        msg += ' do paciente';
        break;
    }

    return msg;
  }

  ///This method ignore minutes, seconds and miliseconds.
  private static requestValueByDate(historicalValues: IHistoricalValue[], date: string): any {
    let histValue = historicalValues.find(v => v.timestamp.split('T')[0] <= date);
    return histValue.value;
  }
}
