import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {
  firstNum: string = '';
  secondNum: string = '';
  operator: string = '';

  calculte(value: string, inputType: string) {

    if (inputType === 'num') {
      this.firstNum += value;
      // console.log('first number ' + this.firstNum);
      // console.log('second number ' + this.secondNum);
    } else {
      if (this.firstNum === '') return


      if (inputType === 'oper') {
        if (this.firstNum !== '' && this.secondNum !== '') {
          let tempResult: string = this.calculateResult().toString();
          this.firstNum = '';
          this.secondNum = tempResult;
          this.operator = value;
          // console.log('tempResult: ' + tempResult);
          // console.log('first number ' + this.firstNum);
          // console.log('second number ' + this.secondNum);
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
        if (this.secondNum === '') return
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
    // console.log('result: ' + result);
    return result;
  }
}
