import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Card, CardService } from '../../services/card.service';

@Component({
  selector: 'app-desk',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './desk.component.html',
  styleUrl: './desk.component.scss',
})
export class DeskComponent implements OnInit {
  cardService = inject(CardService);
  cards: Card[] = [];
  @Output() triesToWin = new EventEmitter<number>
  tries = 0;

  get attemptingCards(): Card[] {
    return this.cards.filter((c) => c.attempting);
  }
  get foundCards(): Card[] {
    return this.cards.filter((c) => c.pairFound);
  }

  private checkWin() {
    if (this.foundCards.length === this.cards.length) {
      this.triesToWin.emit(this.tries);
    }
  }
  ngOnInit(): void {
    this.cards = this.cardService.generateCards();
  }

  protected onClick(index: number) {
    if (this.attemptingCards.length > 1) return;

    this.turnCard(index);
    this.checkMatchingPair();
  }

  private checkMatchingPair(): void {
    const [pairA, pairB] = this.attemptingCards;

    if (!pairA || !pairB) return;

    if (pairA.emoji === pairB.emoji) {
      // Si on a trouvé la bonne paire, on passe les deux cartes en "pairFound"
      this.cards = this.cards.map((card) =>
        card.attempting ? { ...card, attempting: false, pairFound: true } : card
      );
      this.checkWin();
    } else {
      // Si ce n'est pas bon, on attends une seconde avant de masquer les deux cartes retournées
      setTimeout(() => {
        this.cards = this.cards.map((c) => ({ ...c, attempting: false }));
      }, 1000);
    }
  }

  private turnCard(index: number): void {
    const clickedCard = this.cards[index];
    if (clickedCard.attempting || clickedCard.pairFound) return;
    this.tries++;
    this.cards[index].attempting = true;
  }
}
