import { DatePipe } from '@angular/common';
import { Component, computed, effect, model, signal } from '@angular/core';

declare namespace NodeJS {
  type Timeout = any;
}

@Component({
  selector: 'app-stopwatch',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './stopwatch.component.html',
  styleUrl: './stopwatch.component.scss',
})
export class StopwatchComponent {
  timerRef!: NodeJS.Timeout;

  runningStopwatch = model.required<boolean>();

  counter = signal<number>(0);

  watch = computed(() => {
    const minutes = String(Math.round(this.counter() / 60)).padStart(2, '0');
    const seconds = String(this.counter() % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  });

  constructor() {
    effect((onCleanup) => {
      this.runningStopwatch() ? this.run() : this.stop();

      onCleanup(() => {
        this.stop();
      });
    });
  }

  stop() {
    clearInterval(this.timerRef);
  }

  run() {
    this.timerRef = setInterval(() => {
      this.counter.update((c) => c + 1);
    }, 1000);
  }

  handleClick() {
    this.runningStopwatch.update((r) => !r);
  }
}
