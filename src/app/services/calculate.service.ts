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
        this.firstNum = '';
        this.secondNum = '';
        this.operator = '';
        this.result = 0;
        this.endCurrentCal = false;
      }
      this.firstNum += value;
      // console.log('first number ' + this.firstNum);
      // console.log('second number ' + this.secondNum);
    } else {
      if (this.firstNum === '') return;

      if (inputType === 'oper') {
        if (this.secondNum !== '') {

          this.secondNum = this.calculateResult().toString();
          this.firstNum = '';
          this.operator = value;
          this.endCurrentCal = false;
          // console.log('first number ' + this.firstNum);
          // console.log('second number ' + this.secondNum);
          // console.log('result ' + this.result);
          // console.log('operator ' + this.operator);
          return
        }

        this.secondNum = this.firstNum;
        this.firstNum = '';
        this.operator = value;

        // console.log('first number ' + this.firstNum);
        // console.log('second number ' + this.secondNum);
        // console.log('operator ' + this.operator);
      } else if (inputType === 'equal') {
        if (this.secondNum === '') return;
        this.calculateResult();
      }
    }
  }

  calculateResult() {
    let result: number;

    if (this.operator === '+') {
      result = +this.firstNum + +this.secondNum;
    } else if (this.operator === '-') {
      result = +this.secondNum - +this.firstNum;
    }
    else if (this.operator === '*') {
      result = +this.firstNum * +this.secondNum;
    }
    else {
      result = +this.secondNum / +this.firstNum;
    }
    this.result = result;
    this.endCurrentCal = true;
    // console.log('first number ' + this.firstNum);
    // console.log('second number ' + this.secondNum);
    // console.log('result ' + this.result);
    return result;
  }

  renderInputAndResult() {

  }
}
