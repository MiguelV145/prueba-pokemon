import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPage } from "./features/componentes/header-page/header-page";
import { FooterPage } from "./features/componentes/footer-page/footer-page";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderPage, FooterPage],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('pruba1');
}
