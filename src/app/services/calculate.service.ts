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

  upperDisplay: string = '';
  lowerDisplay: string = '';

  // a counter just for the console for debugging
  i = 1;

  calculte(value: string, inputType: string) {
    if (inputType === 'num' && this.firstNum.length < 15) {
      if (this.endCurrentCal) this.resetCalculator();

      if (this.firstNum === '0' && value === "0") return;

      if (this.firstNum === '0' && value !== "0") {
        this.firstNum = value;
        return
      }

      this.firstNum += value;

    } else {
      // Exeptions filter for the first input
      if (this.firstNum === ''
        && inputType !== 'clear'
        && inputType !== 'delete'
        && inputType !== 'comma'
      ) return;

      switch (inputType) {
        case 'oper':
          this.calculateOperation(value);
          break;
        case 'percent':
          this.firstNum = (+this.firstNum / 100).toString();
          break;
        case 'comma':
          if (this.firstNum === '') this.firstNum = '0.';
          if (!this.firstNum.includes('.')) this.firstNum += '.';
          break;
        case 'convert':
          this.continueWithResult();
          this.firstNum = (-+this.firstNum).toString();
          break;
        case 'equal':
          if (this.secondNum !== '') this.calculateResult();
          break;
        case 'delete':
          this.continueWithResult();
          this.firstNum = this.firstNum.slice(0, this.firstNum.length - 1);
          break;
        case 'clear':
          this.resetCalculator();
          break;
      }
    }
    console.log(this.i++);
    console.log('firstNum :' + this.firstNum);
    console.log('operator :' + this.operator);
    console.log('secondeNum :' + this.secondNum);
    console.log('result :' + this.result);
    console.log('endCurrentCal :' + this.endCurrentCal);
    console.log('-------------------------');
  }

  calculateOperation(value: string) {
    if (this.secondNum !== '') {

      this.secondNum = this.calculateResult().toString();
      if (this.secondNum === '') return

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

    if (this.operator === '/') {
      if (this.firstNum === '0') {
        alert('Division by zero is undefined!');
        this.resetCalculator();
        return '';
      }
      result = +this.secondNum / +this.firstNum;

    } else if (this.operator === '*') {
      result = +this.firstNum * +this.secondNum;

    } else if (this.operator === '-') {
      result = +this.secondNum - +this.firstNum;

    } else result = +this.firstNum + +this.secondNum;

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

  /*
    renderInput(value: string, inputType: string) {
      if (inputType === 'num') {
        this.upperDisplay += value;
  
      } else {
        if (inputType === 'equal' && this.result === 0) return;
  
        switch (inputType) {
          case 'oper':
            this.upperDisplay += value;
            break;
          case 'percent':
  
            break;
          case 'delete':
            this.upperDisplay = this.upperDisplay.slice(0, this.upperDisplay.length - 1);
            this.lowerDisplay = '';
            break;
          case 'clear':
            this.upperDisplay = '';
            this.lowerDisplay = '';
            break;
          case 'convert':
  
            break;
          case 'comma':
            this.upperDisplay += value;
            break;
          case 'equal':
            this.lowerDisplay = this.result.toString();
            break;
        }
      }
    }  */
}

