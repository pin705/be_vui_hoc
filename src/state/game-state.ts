import { atom, selector } from "recoil";
import { Game, GameScore } from "types/game";

export const gamesState = atom<Game[]>({
  key: "games",
  default: [
    {
      id: "shapes",
      title: "Nhận Biết Hình Dạng",
      description: "Kéo và thả hình dạng đúng vị trí",
      icon: "🔷",
      color: "#FFB6C1",
      route: "/game/shapes",
    },
    {
      id: "letters",
      title: "Truy Tìm Chữ Cái",
      description: "Tìm chữ cái được đọc",
      icon: "🔤",
      color: "#87CEEB",
      route: "/game/letters",
    },
    {
      id: "counting",
      title: "Đếm & Tô Màu",
      description: "Đếm và tô màu vật thể",
      icon: "🎨",
      color: "#98FB98",
      route: "/game/counting",
    },
  ],
});

export const gameScoresState = atom<GameScore[]>({
  key: "gameScores",
  default: [],
});

export const currentGameState = atom<string | null>({
  key: "currentGame",
  default: null,
});

export const shapesDataState = atom({
  key: "shapesData",
  default: [
    { id: "1", shape: "circle" as const, name: "Hình tròn" },
    { id: "2", shape: "square" as const, name: "Hình vuông" },
    { id: "3", shape: "triangle" as const, name: "Hình tam giác" },
    { id: "4", shape: "star" as const, name: "Hình ngôi sao" },
  ],
});

export const lettersDataState = atom({
  key: "lettersData",
  default: [
    { id: "1", letter: "A" },
    { id: "2", letter: "B" },
    { id: "3", letter: "C" },
    { id: "4", letter: "D" },
    { id: "5", letter: "E" },
    { id: "6", letter: "F" },
    { id: "7", letter: "G" },
    { id: "8", letter: "H" },
  ],
});

export const colorsDataState = atom({
  key: "colorsData",
  default: [
    { id: "1", name: "Đỏ", color: "#FF0000" },
    { id: "2", name: "Xanh lá", color: "#00FF00" },
    { id: "3", name: "Xanh dương", color: "#0000FF" },
    { id: "4", name: "Vàng", color: "#FFFF00" },
    { id: "5", name: "Cam", color: "#FFA500" },
    { id: "6", name: "Tím", color: "#800080" },
  ],
});

export const soundEnabledState = atom({
  key: "soundEnabled",
  default: true,
});

export const totalStarsState = selector({
  key: "totalStars",
  get: ({ get }) => {
    const scores = get(gameScoresState);
    return scores.reduce((total, score) => total + score.stars, 0);
  },
});
