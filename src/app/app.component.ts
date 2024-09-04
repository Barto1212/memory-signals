import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeskComponent } from './components/desk/desk.component';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DeskComponent, StopwatchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  runningStopwatch = signal<boolean>(true);

  protected congratulate(tries: number) {
    setTimeout(() => {
      this.runningStopwatch.update((s) => !s);
      alert(`Félicitation : vous avez gagné en ${tries} coups`);
    }, 200);
  }
}
