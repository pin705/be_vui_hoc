import React, { useState, useEffect } from "react";
import { Box, Page, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { colorsDataState, gameScoresState } from "state/game-state";

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
      setScore((prev) => prev + 1);
      setTimeout(() => {
        setStep('color');
      }, 1000);
    } else {
      setTimeout(() => {
        setSelectedNumber(null);
      }, 1000);
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleItemClick = (index: number) => {
    if (selectedColor && !coloredItems[index]) {
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
    <Page className="bg-gradient-to-b from-green-100 to-green-50">
      <Box className="p-4">
        {/* Header */}
        <Box className="flex justify-between items-center mb-6">
          <Button
            size="small"
            onClick={() => navigate("/")}
            className="bg-white"
          >
            ← Quay lại
          </Button>
          <Text className="text-xl font-bold text-green-600">
            Điểm: {score}/{levels.length}
          </Text>
        </Box>

        <Box className="text-center mb-8">
          <Text className="text-2xl font-bold text-gray-800">
            🎨 Đếm & Tô Màu 🎨
          </Text>
          <Text className="text-gray-600 mt-2">
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
          <Box className="text-center mt-12">
            <Text className="text-6xl mb-4">🌟</Text>
            <Text className="text-3xl font-bold text-green-600 mb-4">
              Tuyệt vời quá!
            </Text>
            <Text className="text-xl text-gray-700 mb-8">
              Bạn đã hoàn thành tất cả các màn chơi!
            </Text>
            <Box className="flex gap-4 justify-center">
              <Button onClick={resetGame} className="bg-green-500">
                Chơi lại
              </Button>
              <Button onClick={() => navigate("/")} className="bg-purple-500">
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
