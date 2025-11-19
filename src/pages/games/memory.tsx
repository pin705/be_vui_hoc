import React, { useState, useEffect } from "react";
import { Box, Page, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { gameScoresState } from "state/game-state";
import { soundManager } from "utils/sound";

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const cardEmojis = ["🐱", "🐶", "🐼", "🦁", "🐸", "🦊"];

const MemoryGame: React.FC = () => {
  const navigate = useNavigate();
  const setGameScores = useSetRecoilState(gameScoresState);
  
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs of cards
    const pairs: Card[] = [];
    cardEmojis.forEach((emoji, index) => {
      pairs.push({ id: index * 2, emoji, isFlipped: false, isMatched: false });
      pairs.push({ id: index * 2 + 1, emoji, isFlipped: false, isMatched: false });
    });
    
    // Shuffle cards
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameComplete(false);
  };

  const handleCardClick = (id: number) => {
    if (isChecking) return;
    
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;
    
    soundManager.playTap();
    
    const newFlippedCards = [...flippedCards, id];
    setCards(cards.map(c => c.id === id ? { ...c, isFlipped: true } : c));
    setFlippedCards(newFlippedCards);
    
    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);
      
      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found!
        soundManager.playSuccess();
        setTimeout(() => {
          setCards(cards.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true } 
              : c
          ));
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
          setIsChecking(false);
          
          // Check if game is complete
          if (matchedPairs + 1 === cardEmojis.length) {
            setTimeout(() => {
              completeGame();
            }, 500);
          }
        }, 800);
      } else {
        // No match
        soundManager.playError();
        setTimeout(() => {
          setCards(cards.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setFlippedCards([]);
          setIsChecking(false);
        }, 1200);
      }
    }
  };

  const completeGame = () => {
    setGameComplete(true);
    soundManager.playCelebration();
    
    // Score based on number of moves (fewer is better)
    const stars = moves <= 8 ? 3 : moves <= 12 ? 2 : 1;
    
    setGameScores((prev) => [
      ...prev.filter((s) => s.gameId !== "memory"),
      {
        gameId: "memory",
        score: Math.max(0, 20 - moves), // Better score for fewer moves
        maxScore: 20,
        stars,
        completedAt: new Date(),
      },
    ]);
  };

  const resetGame = () => {
    initializeGame();
  };

  return (
    <Page className="bg-gradient-to-b from-indigo-100 to-indigo-50">
      <Box className="p-4">
        {/* Header */}
        <Box className="flex justify-between items-center mb-6">
          <Button
            size="small"
            onClick={() => navigate("/")}
            className="bg-white shadow-md rounded-lg"
          >
            ← Quay lại
          </Button>
          <Box className="flex gap-4 items-center">
            <Text className="text-lg font-bold text-indigo-700">
              🎯 {matchedPairs}/{cardEmojis.length}
            </Text>
            <Text className="text-lg font-bold text-indigo-700">
              👣 {moves}
            </Text>
          </Box>
        </Box>

        <Box className="text-center mb-8">
          <Text className="text-3xl font-bold text-indigo-800 mb-2">
            🧠 Trí Nhớ Siêu Phàm 🧠
          </Text>
          <Text className="text-gray-600">
            Tìm các cặp giống nhau!
          </Text>
        </Box>

        {!gameComplete ? (
          <>
            {/* Cards Grid */}
            <Box className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6">
              {cards.map((card) => (
                <Box
                  key={card.id}
                  className="aspect-square rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg"
                  style={{
                    backgroundColor: card.isFlipped || card.isMatched 
                      ? "#E8EAF6" 
                      : "#5C6BC0",
                    transform: card.isFlipped || card.isMatched 
                      ? "rotateY(0deg)" 
                      : "rotateY(0deg)",
                    boxShadow: card.isMatched 
                      ? "0 0 20px rgba(76, 175, 80, 0.5)" 
                      : "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={() => handleCardClick(card.id)}
                >
                  {card.isFlipped || card.isMatched ? (
                    <Text className="text-5xl">{card.emoji}</Text>
                  ) : (
                    <Text className="text-4xl">❓</Text>
                  )}
                </Box>
              ))}
            </Box>

            <Box className="text-center">
              <Text className="text-sm text-gray-500">
                Số lần chọn: {moves} - Ít nhất để đạt 3 sao!
              </Text>
            </Box>
          </>
        ) : (
          <Box className="text-center mt-12 bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-auto">
            <Text className="text-7xl mb-4 animate-bounce">🎊</Text>
            <Text className="text-3xl font-bold text-indigo-700 mb-4">
              Xuất Sắc!
            </Text>
            <Text className="text-xl text-gray-700 mb-4">
              Bạn đã hoàn thành với {moves} lượt chọn!
            </Text>
            <Text className="text-lg text-gray-600 mb-8">
              {moves <= 8 ? "🌟🌟🌟 Tuyệt vời!" : moves <= 12 ? "🌟🌟 Rất tốt!" : "🌟 Tốt lắm!"}
            </Text>
            <Box className="flex gap-4 justify-center flex-wrap">
              <Button onClick={resetGame} className="bg-indigo-500 text-white shadow-lg">
                🔄 Chơi lại
              </Button>
              <Button onClick={() => navigate("/")} className="bg-purple-500 text-white shadow-lg">
                🏠 Về trang chủ
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default MemoryGame;
