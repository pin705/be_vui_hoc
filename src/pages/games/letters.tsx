import React, { useState, useEffect } from "react";
import { Box, Page, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { lettersDataState, gameScoresState } from "state/game-state";
import { soundManager } from "utils/sound";

const LettersGame: React.FC = () => {
  const navigate = useNavigate();
  const lettersData = useRecoilValue(lettersDataState);
  const setGameScores = useSetRecoilState(gameScoresState);
  
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);

  useEffect(() => {
    generateOptions();
  }, [currentLetterIndex, lettersData]);

  const generateOptions = () => {
    const currentLetter = lettersData[currentLetterIndex];
    if (!currentLetter) return;

    const otherLetters = lettersData
      .filter((l) => l.id !== currentLetter.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((l) => l.letter);

    const allOptions = [currentLetter.letter, ...otherLetters];
    setShuffledLetters(allOptions.sort(() => Math.random() - 0.5));
  };

  const handleLetterClick = (letter: string) => {
    const currentLetter = lettersData[currentLetterIndex];
    
    if (letter === currentLetter.letter) {
      soundManager.playSuccess();
      setShowFeedback('correct');
      setScore((prev) => prev + 1);
      
      setTimeout(() => {
        setShowFeedback(null);
        if (currentLetterIndex < lettersData.length - 1) {
          setCurrentLetterIndex((prev) => prev + 1);
        } else {
          soundManager.playCelebration();
          setGameComplete(true);
          const stars = score + 1 >= 7 ? 3 : score + 1 >= 5 ? 2 : 1;
          setGameScores((prev) => [
            ...prev.filter((s) => s.gameId !== "letters"),
            {
              gameId: "letters",
              score: score + 1,
              maxScore: lettersData.length,
              stars,
              completedAt: new Date(),
            },
          ]);
        }
      }, 1000);
    } else {
      soundManager.playError();
      setShowFeedback('wrong');
      setTimeout(() => {
        setShowFeedback(null);
      }, 1000);
    }
  };

  const resetGame = () => {
    setCurrentLetterIndex(0);
    setScore(0);
    setShowFeedback(null);
    setGameComplete(false);
  };

  const currentLetter = lettersData[currentLetterIndex];

  return (
    <Page 
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #e3f2fd, #bbdefb, #90caf9)",
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
            <Text className="text-xl font-bold text-blue-600">
              Điểm: {score}/{lettersData.length}
            </Text>
          </Box>
        </Box>

        <Box className="text-center mb-8">
          <Text className="text-3xl font-bold text-blue-900 mb-2">
            🔤 Truy Tìm Chữ Cái 🔤
          </Text>
          <Text className="text-gray-700 font-medium">
            Tìm chữ cái được hiển thị!
          </Text>
        </Box>

        {!gameComplete ? (
          <>
            {/* Current Letter Display */}
            <Box 
              className="rounded-3xl p-8 mb-8 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
                boxShadow: "0 12px 32px rgba(33, 150, 243, 0.2)",
              }}
            >
              <Text className="text-sm text-gray-500 mb-4 font-medium">
                Tìm chữ cái:
              </Text>
              <Text
                className="font-bold"
                style={{
                  fontSize: "120px",
                  color: "#2196F3",
                  textShadow: "0 4px 8px rgba(33, 150, 243, 0.3)",
                }}
              >
                {currentLetter?.letter}
              </Text>
            </Box>

            {/* Letter Options */}
            <Box className="grid grid-cols-2 gap-4">
              {shuffledLetters.map((letter) => (
                <Box
                  key={letter}
                  className="rounded-2xl p-8 cursor-pointer transition-all duration-200 text-center"
                  onClick={() => !showFeedback && handleLetterClick(letter)}
                  style={{
                    background:
                      showFeedback === 'correct' && letter === currentLetter.letter
                        ? "linear-gradient(135deg, #a5d6a7 0%, #66bb6a 100%)"
                        : showFeedback === 'wrong' && letter !== currentLetter.letter
                        ? "linear-gradient(135deg, #ef9a9a 0%, #e57373 100%)"
                        : "rgba(255, 255, 255, 0.9)",
                    boxShadow:
                      showFeedback === 'correct' && letter === currentLetter.letter
                        ? "0 8px 24px rgba(76, 175, 80, 0.4)"
                        : showFeedback === 'wrong' && letter !== currentLetter.letter
                        ? "0 8px 24px rgba(244, 67, 54, 0.4)"
                        : "0 6px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Text
                    className="font-bold"
                    style={{
                      fontSize: "60px",
                      color:
                        showFeedback && letter === currentLetter.letter
                          ? "white"
                          : "#333",
                    }}
                  >
                    {letter}
                  </Text>
                </Box>
              ))}
            </Box>

            {/* Feedback */}
            {showFeedback && (
              <Box className="text-center mt-6">
                <Text className="text-4xl">
                  {showFeedback === 'correct' ? '🎉 Đúng rồi!' : '❌ Thử lại!'}
                </Text>
              </Box>
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
            <Text className="text-6xl mb-4 animate-bounce">🏆</Text>
            <Text className="text-3xl font-bold text-green-600 mb-4">
              Xuất sắc!
            </Text>
            <Text className="text-xl text-gray-700 mb-8">
              Bạn đã tìm đúng {score} chữ cái!
            </Text>
            <Box className="flex gap-4 justify-center">
              <Button 
                onClick={resetGame}
                style={{
                  background: "linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(100, 181, 246, 0.4)",
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

export default LettersGame;
