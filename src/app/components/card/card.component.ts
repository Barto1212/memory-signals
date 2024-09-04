import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  emoji = input.required<string>();
  visible = input.required<boolean>();

  protected contentClass = computed<'hidden' | 'visible'>(() => {
    if (this.visible()) {
      return 'visible';
    } else return 'hidden';
  });
}
