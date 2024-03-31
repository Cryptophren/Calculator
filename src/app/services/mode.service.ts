import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  root: HTMLElement | null = document.querySelector(':root');
  rs: CSSStyleDeclaration | undefined = this.root?.style;

  changeMode(mode: string) {
    if (this.rs)
      switch (mode) {
        case 'light':
          this.rs.setProperty('--background', '#DCFDE3');
          this.rs.setProperty('--calculator', '#5AB598');
          this.rs.setProperty('--menu', '#b66666');
          this.rs.setProperty('--syms', '#B1424F');
          this.rs.setProperty('--nums', '#000000');
          this.rs.setProperty('--hover', '#BCE9C6');
          break;
        case 'dark':
          this.rs.setProperty('--background', '#091525');
          this.rs.setProperty('--calculator', '#2D3A45');
          this.rs.setProperty('--menu', '#5B652C');
          this.rs.setProperty('--syms', '#B9C6FF');
          this.rs.setProperty('--nums', '#CBCBCB');
          this.rs.setProperty('--hover', '#12223A');
          break;
        case 'contrast':
          this.rs.setProperty('--background', '#000000');
          this.rs.setProperty('--calculator', '#cccccc');
          this.rs.setProperty('--menu', '#001170');
          this.rs.setProperty('--syms', '#00ff22');
          this.rs.setProperty('--nums', '#FFF700');
          this.rs.setProperty('--hover', '#474747');
      }
  }
}
