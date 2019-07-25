import { DecimalCasesPipe } from '../decimal-cases.pipe';
import { LocaleStringPipe } from "../locale-string.pipe";
import { UnitFormaterPipe } from '../unit-formater.pipe';

export const COMMON_PIPES: Array<any> = [
  DecimalCasesPipe, LocaleStringPipe, UnitFormaterPipe
];