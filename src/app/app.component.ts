import { Component, OnInit, inject } from '@angular/core';
import { ModeService } from './services/mode.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CalculateService } from './services/calculate.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  currentMode: string = '';

  modeService: ModeService = inject(ModeService);
  calculateService: CalculateService = inject(CalculateService);

  ngOnInit(): void {
    this.currentMode =
      JSON.parse(localStorage.getItem('currentMode') ?? '"light"');

    this.setMode(this.currentMode);
  }

  setMode(mode: string) {
    this.modeService.setMode(mode);

    if (mode === 'light') this.currentMode = 'light';
    if (mode === 'dark') this.currentMode = 'dark';
    if (mode === 'contrast') this.currentMode = 'contrast';

    localStorage.setItem('currentMode', JSON.stringify(mode));
  }

  getInput(event: any) {
    const inputType: string = event.target.dataset.type;
    const value: string = event.target.innerHTML;

    this.calculateService.calculate(value, inputType);
  }
}
