import React, { useState, useEffect } from "react";
import { Box, Page, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { colorsDataState, gameScoresState } from "state/game-state";
import { soundManager } from "utils/sound";

interface CountingLevel {
  count: number;
  emoji: string;
}

const levels: CountingLevel[] = [
  { count: 1, emoji: "🍎" },
  { count: 2, emoji: "🍌" },
  { count: 3, emoji: "🍓" },
  { count: 4, emoji: "🍊" },
  { count: 5, emoji: "🍇" },
  { count: 6, emoji: "🥕" },
  { count: 7, emoji: "🌽" },
  { count: 8, emoji: "🍒" },
];

const CountingGame: React.FC = () => {
  const navigate = useNavigate();
  const colorsData = useRecoilValue(colorsDataState);
  const setGameScores = useSetRecoilState(gameScoresState);
  
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [coloredItems, setColoredItems] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);
  const [step, setStep] = useState<'count' | 'color'>('count');
  const [gameComplete, setGameComplete] = useState(false);

  const currentLevelData = levels[currentLevel];

  useEffect(() => {
    if (currentLevelData) {
      setColoredItems(Array(currentLevelData.count).fill(false));
    }
  }, [currentLevel]);

  const handleNumberSelect = (number: number) => {
    setSelectedNumber(number);
    
    if (number === currentLevelData.count) {
      soundManager.playSuccess();
      setScore((prev) => prev + 1);
      setTimeout(() => {
        setStep('color');
      }, 1000);
    } else {
      soundManager.playError();
      setTimeout(() => {
        setSelectedNumber(null);
      }, 1000);
    }
  };

  const handleColorSelect = (color: string) => {
    soundManager.playTap();
    setSelectedColor(color);
  };

  const handleItemClick = (index: number) => {
    if (selectedColor && !coloredItems[index]) {
      soundManager.playTap();
      const newColoredItems = [...coloredItems];
      newColoredItems[index] = true;
      setColoredItems(newColoredItems);
      
      if (newColoredItems.every((item) => item)) {
        setTimeout(() => {
          if (currentLevel < levels.length - 1) {
            setCurrentLevel((prev) => prev + 1);
            setStep('count');
            setSelectedNumber(null);
            setSelectedColor(null);
          } else {
            soundManager.playCelebration();
            setGameComplete(true);
            const stars = score + 1 >= 7 ? 3 : score + 1 >= 5 ? 2 : 1;
            setGameScores((prev) => [
              ...prev.filter((s) => s.gameId !== "counting"),
              {
                gameId: "counting",
                score: score + 1,
                maxScore: levels.length,
                stars,
                completedAt: new Date(),
              },
            ]);
          }
        }, 500);
      }
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setStep('count');
    setSelectedNumber(null);
    setSelectedColor(null);
    setGameComplete(false);
  };

  return (
    <Page 
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #e8f5e9, #c8e6c9, #a5d6a7)",
      }}
    >
      <Box className="p-4">
        {/* Header */}
        <Box className="flex justify-between items-center mb-6">
          <Button
            size="small"
            onClick={() => navigate("/")}
            className="shadow-lg"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "12px",
            }}
          >
            ← Quay lại
          </Button>
          <Box 
            className="px-4 py-2 rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Text className="text-xl font-bold text-green-600">
              Điểm: {score}/{levels.length}
            </Text>
          </Box>
        </Box>

        <Box className="text-center mb-8">
          <Text className="text-3xl font-bold text-green-900 mb-2">
            🎨 Đếm & Tô Màu 🎨
          </Text>
          <Text className="text-gray-700 font-medium">
            {step === 'count' ? 'Đếm số vật thể!' : 'Tô màu cho vật thể!'}
          </Text>
        </Box>

        {!gameComplete ? (
          <>
            {step === 'count' ? (
              <>
                {/* Objects to Count */}
                <Box className="bg-white rounded-2xl p-6 mb-8 text-center shadow-lg">
                  <Text className="text-sm text-gray-500 mb-4">
                    Có bao nhiêu {currentLevelData.emoji}?
                  </Text>
                  <Box className="flex flex-wrap justify-center gap-3">
                    {Array.from({ length: currentLevelData.count }).map((_, index) => (
                      <Text key={index} className="text-6xl">
                        {currentLevelData.emoji}
                      </Text>
                    ))}
                  </Box>
                </Box>

                {/* Number Options */}
                <Box>
                  <Text className="text-lg font-semibold mb-4 text-center">
                    Chọn số đúng:
                  </Text>
                  <Box className="grid grid-cols-5 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <Box
                        key={num}
                        className="bg-white rounded-xl p-4 shadow-md cursor-pointer active:scale-95 transition-transform text-center"
                        onClick={() => !selectedNumber && handleNumberSelect(num)}
                        style={{
                          backgroundColor:
                            selectedNumber === num
                              ? num === currentLevelData.count
                                ? "#4CAF50"
                                : "#F44336"
                              : "white",
                        }}
                      >
                        <Text
                          className="text-2xl font-bold"
                          style={{
                            color: selectedNumber === num ? "white" : "#333",
                          }}
                        >
                          {num}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </>
            ) : (
              <>
                {/* Items to Color */}
                <Box className="bg-white rounded-2xl p-6 mb-8 text-center shadow-lg">
                  <Box className="flex flex-wrap justify-center gap-3">
                    {Array.from({ length: currentLevelData.count }).map((_, index) => (
                      <Box
                        key={index}
                        className="text-6xl cursor-pointer active:scale-110 transition-transform"
                        onClick={() => handleItemClick(index)}
                        style={{
                          filter: coloredItems[index] && selectedColor
                            ? `drop-shadow(0 0 10px ${selectedColor})`
                            : 'grayscale(100%)',
                        }}
                      >
                        {currentLevelData.emoji}
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Color Options */}
                <Box>
                  <Text className="text-lg font-semibold mb-4 text-center">
                    Chọn màu:
                  </Text>
                  <Box className="grid grid-cols-3 gap-3">
                    {colorsData.map((color) => (
                      <Box
                        key={color.id}
                        className="rounded-xl p-6 shadow-md cursor-pointer active:scale-95 transition-transform"
                        onClick={() => handleColorSelect(color.color)}
                        style={{
                          backgroundColor: color.color,
                          border: selectedColor === color.color ? "4px solid #333" : "none",
                        }}
                      >
                        <Text className="text-center text-white font-bold text-shadow">
                          {color.name}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </>
            )}
          </>
        ) : (
          <Box 
            className="text-center mt-12 rounded-3xl p-8 max-w-md mx-auto"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Text className="text-6xl mb-4 animate-bounce">🌟</Text>
            <Text className="text-3xl font-bold text-green-600 mb-4">
              Tuyệt vời quá!
            </Text>
            <Text className="text-xl text-gray-700 mb-8">
              Bạn đã hoàn thành tất cả các màn chơi!
            </Text>
            <Box className="flex gap-4 justify-center">
              <Button 
                onClick={resetGame}
                style={{
                  background: "linear-gradient(135deg, #81c784 0%, #66bb6a 100%)",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(129, 199, 132, 0.4)",
                }}
              >
                Chơi lại
              </Button>
              <Button 
                onClick={() => navigate("/")}
                style={{
                  background: "linear-gradient(135deg, #9575cd 0%, #7e57c2 100%)",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(149, 117, 205, 0.4)",
                }}
              >
                Về trang chủ
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default CountingGame;
