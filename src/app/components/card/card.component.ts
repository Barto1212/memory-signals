import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnChanges {
  @Input({ required: true }) emoji: string = '';
  @Input({ required: true }) visible: boolean = false;

  contentClass: 'hidden' | 'visible' = 'hidden';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible']) {
      changes['visible'].currentValue
        ? (this.contentClass = 'visible')
        : (this.contentClass = 'hidden');
    }
  }
}
