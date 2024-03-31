import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModeService } from './services/mode.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatTooltipModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  lightMode: boolean = true; // this is the default mode
  darkMode: boolean = false;
  contrastMode: boolean = false;

  themeService: ModeService = inject(ModeService);

  changeMode(mode: string) {
    this.themeService.changeMode(mode);

    switch (mode) {
      case 'light':
        this.lightMode = true;
        this.darkMode = false;
        this.contrastMode = false;
        break;
      case 'dark':
        this.lightMode = false;
        this.darkMode = true;
        this.contrastMode = false;
        break;
      case 'contrast':
        this.lightMode = false;
        this.darkMode = false;
        this.contrastMode = true;
    }
  }
}
