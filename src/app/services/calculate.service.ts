import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {
  private firstNum: string = '';
  private secondNum: string = '';
  private operator: string = '';
  private result: number = 0;
  private percentActiv: boolean = true;
  private calcFinished: boolean = false;
  private timeoutId: any;

  upperDisplay: string = '';
  lowerDisplay: string = '';
  errMsg: string = '';
  showErrMsg: boolean = false;

  calculate(value: string, inputType: string) {
    if (this.upperDisplay.length > 30) {
      this.showErrMag('Max 30 Characters allowed!');
      this.resetCalculator();
    }

    if (inputType === 'num') {
      if (this.calcFinished) this.resetCalculator();

      if (this.firstNum === '0' && value === "0")
        return;
      else if (this.firstNum === '0' && value !== "0") {
        this.firstNum = value;
        this.upperDisplay = value;
        return
      } else if (!this.percentActiv) {
        this.showErrMag('Not allowed');
        return;
      }

      this.firstNum += value;
      this.upperDisplay += value;

    } else {
      // Exeptions filter for the first input
      if (this.firstNum === ''
        && inputType !== 'clear'
        && inputType !== 'delete'
        && inputType !== 'decimal'
      ) return;

      switch (inputType) {
        case 'oper':
          this.onOperatorClicked(value);
          this.upperDisplay += value;
          break;
        case 'percent':
          if (!this.calcFinished && this.percentActiv)
            this.calculatePercent();
          else if (this.calcFinished)
            this.continueWithResult();
          else if (!this.percentActiv)
            this.showErrMag('Not allowed');
          break;
        case 'decimal':
          if (this.calcFinished) {
            this.resetCalculator();
            this.firstNum = '0.';
            this.upperDisplay = '0.';
          } else if (this.firstNum === '') {
            this.firstNum = '0.';
            this.upperDisplay += '0.';
          } else if (!this.firstNum.includes('.')) {
            this.firstNum += value;
            this.upperDisplay += value;
          }
          break;
        case 'convert':
          this.continueWithResult();
          this.firstNum = (-+this.firstNum).toString();
          this.toggleMinus(this.upperDisplay);
          break;
        case 'equal':
          if (!this.calcFinished && this.secondNum !== '') {
            this.calculateResult();
            this.lowerDisplay = this.result.toString();
          }
          break;
        case 'delete':
          this.continueWithResult();
          this.deleteInput();
          break;
        case 'clear':
          this.resetCalculator();
          break;
      }
    }
  }

  onOperatorClicked(value: string) {
    this.percentActiv = true;

    if (this.secondNum !== '') {

      if (this.calcFinished) {
        this.upperDisplay = this.result.toString();
        this.lowerDisplay = '';
      }

      this.secondNum = this.calculateResult().toString();
      if (this.secondNum === '') return

      this.firstNum = '';
      this.operator = value;
      this.calcFinished = false;
      return
    }

    this.secondNum = this.firstNum;
    this.firstNum = '';
    this.operator = value;
  }

  calculateResult() {
    let result: number;

    if (this.operator === '/') {
      if (+this.firstNum === 0) {
        this.showErrMag('Division by 0 is undefined!');
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
    this.calcFinished = true;

    if (this.countDecimals(result) > 8)
      this.showErrMag('Displaying max 8 decimals');

    return result;
  }

  calculatePercent() {
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
    if (this.calcFinished) {

      if (this.upperDisplay.includes('%'))
        this.firstNum = (this.result / 100).toString();
      else this.firstNum = this.result.toString();

      this.secondNum = '';
      this.operator = '';
      this.result = 0;
      this.calcFinished = false;
      this.percentActiv = true;
      this.upperDisplay = this.firstNum;
      this.lowerDisplay = '';
    }
  }

  countDecimals(result: number) {
    const numberString = result.toString();
    const parts = numberString.split('.');
    return parts.length === 1 ? 0 : parts[1].length;
  }

  toggleMinus(strg: string) {
    if (!this.operator) {
      this.upperDisplay = this.firstNum;
      return
    }

    const pls = strg.lastIndexOf('+');
    const mns = strg.lastIndexOf('-');
    const mlt = strg.lastIndexOf('*');
    const div = strg.lastIndexOf('/');
    const lastOperIndx = Math.max(pls, mns, mlt, div);
    const lastOper = strg.charAt(lastOperIndx);
    const firstPart = strg.slice(0, lastOperIndx);
    const secondPart = strg.slice(lastOperIndx + 1);
    let newStrg = '';

    if (lastOper === "-") {
      newStrg = firstPart.concat('+', secondPart);
      this.upperDisplay = newStrg;

    } else if (lastOper === "+") {
      newStrg = firstPart.concat('-', secondPart);
      this.upperDisplay = newStrg;

    } else {
      const firstPart = strg.slice(0, lastOperIndx + 1);
      newStrg = firstPart.concat('-', secondPart);
      this.upperDisplay = newStrg;
    }
  }

  deleteInput() {
    if (!this.percentActiv) {
      this.showErrMag('Not allowed');
      return;
    }

    if (this.firstNum.length > 0) {
      this.firstNum =
        this.firstNum.slice(0, this.firstNum.length - 1);
      this.upperDisplay =
        this.upperDisplay.slice(0, this.upperDisplay.length - 1);

      if (this.firstNum === '-') {
        this.firstNum =
          this.firstNum.slice(0, this.firstNum.length - 1);
        this.upperDisplay =
          this.upperDisplay.slice(0, this.upperDisplay.length - 1);
      }
    } else if (this.operator) {
      this.operator = '';
      this.firstNum = this.secondNum;
      this.secondNum = '';
      this.upperDisplay = this.firstNum;
    }
  }

  resetCalculator() {
    this.firstNum = '';
    this.secondNum = '';
    this.operator = '';
    this.result = 0;
    this.percentActiv = true;
    this.calcFinished = false;
    this.upperDisplay = '';
    this.lowerDisplay = '';
  }

  showErrMag(msg: string) {
    if (this.timeoutId)
      clearTimeout(this.timeoutId);

    this.errMsg = msg;
    this.showErrMsg = true

    this.timeoutId = setTimeout(() => {
      this.showErrMsg = false;
      clearTimeout(this.timeoutId);
    }, 2000)
  }

}
