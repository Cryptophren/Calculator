import { Directive, OnInit, Renderer2 } from '@angular/core';
import { CalculateService } from './calculate.service';

@Directive({
  selector: '[keyEvent]',
  standalone: true
})
export class KeyEventDirective implements OnInit {

  constructor(
    private renderer: Renderer2,
    private calculteService: CalculateService
  ) { }

  ngOnInit(): void {
    // I had to use the 'keypress' event cuz otherwise the numPad keys can't detect if the shift key is pressed!
    this.renderer
      .listen(document, 'keypress', event => this.onKeyPress(event));

    // I had to add the 'keydown' event cuz some keys do not trigger a key event on 'keypress'!
    this.renderer
      .listen(document, 'keydown', event => this.onKeyDown(event));
  }

  onKeyPress(event: KeyboardEvent) {
    const numLock = event.getModifierState('NumLock');
    const shiftDown = event.shiftKey;
    const numPad = event.code.includes('Numpad');
    const digit = event.code.includes('Digit');

    let value = '', inputType = '';

    if (numLock && numPad && !shiftDown && event.key !== 'Enter'
      || digit && !shiftDown) {

      value = event.key;

      switch (event.key) {
        case '+':
        case '-':
        case '*':
        case '/':
          inputType = 'oper';
          break;
        case '.':
          inputType = 'decimal';
          break;
        default:
          inputType = 'num';
      }
    } else return

    this.calculteService.calculate(value, inputType);
  }

  onKeyDown(event: KeyboardEvent) {
    let value = '', inputType = '';

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        value = '=';
        inputType = 'equal';
        break;
      case 'Backspace':
        event.preventDefault();
        inputType = 'delete';
        break;
      case 'Delete':
      case 'C':
      case 'c':
        inputType = 'clear';
        break;
      case 'Tab':
        event.preventDefault();
        inputType = 'convert';
        break;
      default:
        return
    }
    this.calculteService.calculate(value, inputType);
  }

}