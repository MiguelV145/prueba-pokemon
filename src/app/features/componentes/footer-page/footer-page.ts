import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer-page',
  standalone: true,
  imports: [],
  templateUrl: './footer-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterPage { }
