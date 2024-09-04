import {
  Component,
  computed,
  effect,
  inject,
  output,
  signal,
} from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-desk',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './desk.component.html',
  styleUrl: './desk.component.scss',
})
export class DeskComponent {
  cardService = inject(CardService);
  cards = signal(this.cardService.generateCards());
  triesToWin = output<number>();
  tries = signal(0);

  private attemptingCards = computed(() =>
    this.cards().filter((c) => c.attempting)
  );
  private foundCards = computed(() => this.cards().filter((c) => c.pairFound));

  constructor() {
    effect(() => {
      if (this.foundCards().length === this.cards().length) {
        this.triesToWin.emit(this.tries());
      }
    });
  }

  protected onClick(index: number) {
    if (this.attemptingCards().length > 1) return;

    this.turnCard(index);
    this.checkMatchingPair();
  }

  private checkMatchingPair(): void {
    const [pairA, pairB] = this.attemptingCards();

    if (!pairA || !pairB) return;

    if (pairA.emoji === pairB.emoji) {
      // Si on a trouvé la bonne paire, on passe les deux cartes en "pairFound"
      this.cards.update((cards) =>
        cards.map((card) =>
          card.attempting
            ? { ...card, attempting: false, pairFound: true }
            : card
        )
      );
    } else {
      // Si ce n'est pas bon, on attends une seconde avant de masquer les deux cartes retournées
      setTimeout(() => {
        this.cards.update((cards) =>
          cards.map((c) => ({ ...c, attempting: false }))
        );
      }, 1000);
    }
  }

  private turnCard(index: number): void {
    const clickedCard = this.cards()[index];
    if (clickedCard.attempting || clickedCard.pairFound) return;
    this.tries.update((t) => t + 1);
    this.cards.update((cards) => {
      const newCards = [...cards];
      newCards[index].attempting = true;
      return newCards;
    });
  }
}
