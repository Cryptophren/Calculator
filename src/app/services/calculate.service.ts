import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {
  firstNum: string = '';
  secondNum: string = '';
  operator: string = '';
  result: number = 0;
  percentActiv: boolean = true;
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
        this.upperDisplay = value;
        return
      }

      this.firstNum += value;
      this.upperDisplay += value;

    } else {
      // Exeptions filter for the first input
      if (this.firstNum === ''
        && inputType !== 'clear'
        && inputType !== 'delete'
        && inputType !== 'comma'
      ) return;

      switch (inputType) {
        case 'oper':
          this.onOperatorClicked(value);
          this.upperDisplay += value;
          break;
        case 'percent':
          if (!this.endCurrentCal
            && this.percentActiv) this.calPercent();
          else this.continueWithResult();
          break;
        case 'comma':
          if (this.endCurrentCal) {
            this.resetCalculator();
            this.firstNum = '0.';
            this.upperDisplay = '0,';
          } else if (this.firstNum === '') {
            this.firstNum = '0.';
            this.upperDisplay += '0,';
          } else if (!this.firstNum.includes('.')) {
            this.firstNum += '.';
            this.upperDisplay += ',';
          }
          break;
        case 'convert':
          this.continueWithResult();
          this.firstNum = (-+this.firstNum).toString();
          this.toggleMinus(this.upperDisplay);
          break;
        case 'equal':
          if (!this.endCurrentCal && this.secondNum !== '') {
            this.calculateResult();
            this.lowerDisplay = this.result.toString();
          }
          break;
        case 'delete':
          this.continueWithResult();
          this.firstNum =
            this.firstNum.slice(0, this.firstNum.length - 1);
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

  onOperatorClicked(value: string) {
    this.percentActiv = true;

    if (this.secondNum !== '') {

      if (this.endCurrentCal) {
        this.upperDisplay = this.result.toString();
        this.lowerDisplay = '';
      }

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

  calPercent() {
    this.upperDisplay += '%';

    if (this.operator === '+' || this.operator === '-') {
      this.firstNum =
        (+this.secondNum * +this.firstNum / 100).toString();
    } else {
      this.firstNum = (+this.firstNum / 100).toString();
    }
    this.percentActiv = false;
  }

  continueWithResult() {
    if (this.endCurrentCal) {

      if (this.upperDisplay.includes('%'))
        this.firstNum = (this.result / 100).toString();
      else this.firstNum = this.result.toString();

      this.secondNum = '';
      this.operator = '';
      this.result = 0;
      this.endCurrentCal = false;
      this.upperDisplay = this.firstNum;
      this.lowerDisplay = '';
    }
  }

  toggleMinus(strg: String) {
    if (!this.operator) {
      this.upperDisplay = this.firstNum;
      return
    }

    const plus = strg.lastIndexOf('+');
    const min = strg.lastIndexOf('-');
    const mult = strg.lastIndexOf('*');
    const div = strg.lastIndexOf('/');
    const lastOperIndx = Math.max(plus, min, mult, div);
    const lastOper = strg.charAt(lastOperIndx);
    const firstPart = strg.slice(0, lastOperIndx);
    const secondPart = strg.slice(lastOperIndx + 1);

    if (lastOper === "-") {
      const newStrg = firstPart.concat('+', secondPart);
      this.upperDisplay = newStrg;

    } else if (lastOper === "+") {
      const newStrg = firstPart.concat('-', secondPart);
      this.upperDisplay = newStrg;

    } else {
      const firstPart = strg.slice(0, lastOperIndx + 1);
      const newStrg = firstPart.concat('-', secondPart);
      this.upperDisplay = newStrg;
    }
  }

  resetCalculator() {
    this.firstNum = '';
    this.secondNum = '';
    this.operator = '';
    this.result = 0;
    this.percentActiv = true;
    this.endCurrentCal = false;
    this.upperDisplay = '';
    this.lowerDisplay = '';
  }

}