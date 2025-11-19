export interface GameScore {
  gameId: string;
  score: number;
  maxScore: number;
  stars: number;
  completedAt: Date;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
}

export interface ShapeItem {
  id: string;
  shape: 'circle' | 'square' | 'triangle' | 'star';
  name: string;
}

export interface LetterItem {
  id: string;
  letter: string;
  sound?: string;
}

export interface ColorItem {
  id: string;
  name: string;
  color: string;
}

export interface CountingItem {
  id: string;
  count: number;
  objects: string[];
  color?: string;
}
