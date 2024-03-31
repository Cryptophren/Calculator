import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {
  firstNum: string = '';
  secondNum: string = '';
  operator: string = '';
  result: number = 0;
  endCurrentCal: boolean = false;

  calculte(value: string, inputType: string) {
    if (inputType === 'num') {
      if (this.endCurrentCal) {
        this.resetCalculator();
      }
      this.firstNum += value;

    } else {
      if (this.firstNum === '') return;

      if (inputType === 'oper') {
        this.calculateOperation(value);

      } else if (inputType === 'percent') {
        this.firstNum = (+this.firstNum / 100).toString();

      } else if (inputType === 'delete') {
        this.continueWithResult();
        this.firstNum = this.firstNum.slice(0, this.firstNum.length - 1);

      } else if (inputType === 'clear') {
        this.resetCalculator();

      } else if (inputType === 'convert') {
        this.continueWithResult();
        this.firstNum = (-+this.firstNum).toString();

      } else if (inputType === 'comma') {
        const commaFound = this.firstNum.includes('.');
        if (!commaFound) this.firstNum += '.';

      } else if (inputType === 'equal') {
        if (this.secondNum !== '')
          this.calculateResult();
      }
    }
  }

  calculateOperation(value: string) {
    if (this.secondNum !== '') {
      this.secondNum = this.calculateResult().toString();
      this.firstNum = '';
      this.operator = value;
      this.endCurrentCal = false;
      return
    }

    this.secondNum = this.firstNum;
    this.firstNum = '';
    this.operator = value;
  }

  calculateResult() {
    let result: number;

    if (this.operator === '+')
      result = +this.firstNum + +this.secondNum;

    else if (this.operator === '-')
      result = +this.secondNum - +this.firstNum;

    else if (this.operator === '*')
      result = +this.firstNum * +this.secondNum;

    else result = +this.secondNum / +this.firstNum;

    this.result = result;
    this.endCurrentCal = true;
    return result;
  }

  continueWithResult() {
    if (this.endCurrentCal) {
      this.firstNum = this.result.toString();
      this.secondNum = '';
      this.operator = '';
      this.result = 0;
      this.endCurrentCal = false;
    }
  }

  resetCalculator() {
    this.firstNum = '';
    this.secondNum = '';
    this.operator = '';
    this.result = 0;
    this.endCurrentCal = false;
  }
}
