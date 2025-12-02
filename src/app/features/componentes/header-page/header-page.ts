import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";


@Component({
  selector: 'app-header-page',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderPage { }
