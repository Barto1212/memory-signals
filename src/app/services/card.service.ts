import { Injectable } from '@angular/core';
import { animals } from '../../assets/emoji-list';

export type Card = {
  emoji: string;
  attempting: boolean;
  pairFound: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor() {}

  public generateCards(): Card[] {
    return this.generateSource(animals).map((emoji) => ({
      emoji,
      attempting: false,
      pairFound: false,
    }));
  }

  private generateSource(emojis: string[]): string[] {
    const doubleEmojis = emojis.concat(emojis);
    const randomEmojis = this.shuffleArray(doubleEmojis);
    return randomEmojis;
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
