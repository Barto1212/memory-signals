import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

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
export class StopwatchComponent implements OnChanges, OnInit {
  @Input() runningStopwatch!: boolean;

  @Output() private runningStopwatchChanges = new EventEmitter<boolean>();

  private _running!: boolean;

  timerRef: NodeJS.Timeout | null = null;

  counter: number = 0;

  ngOnInit() {
    this._running = true;
    this.update();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['runningStopwatch']) {
      this._running = changes['runningStopwatch'].currentValue;
      this.update();
    }
  }

  protected handleClick() {
    this._running = !this._running;
    this.runningStopwatchChanges.emit(this._running);
    this.update();
  }

  protected get running() {
    return this._running;
  }

  private update() {
    this._running ? this.start() : this.stop();
  }

  private stop() {
    clearInterval(this.timerRef);
    this.timerRef = null;
  }

  private start() {
    if (this.timerRef) return;
    const startTime = Date.now() - (this.counter || 0);
    this.timerRef = setInterval(() => {
      this.counter = Date.now() - startTime;
    }, 1000);
  }
}
