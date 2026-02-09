import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ needed for bootstrapApplication
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`, // ✅ render routed pages here
  styleUrls: ['./app.css'] // ✅ corrected property name
})
export class App {
  protected readonly title = signal('wallet-ui');
}
