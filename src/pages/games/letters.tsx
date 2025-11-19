import React, { useState, useEffect } from "react";
import { Box, Page, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { lettersDataState, gameScoresState } from "state/game-state";

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
      setShowFeedback('correct');
      setScore((prev) => prev + 1);
      
      setTimeout(() => {
        setShowFeedback(null);
        if (currentLetterIndex < lettersData.length - 1) {
          setCurrentLetterIndex((prev) => prev + 1);
        } else {
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
    <Page className="bg-gradient-to-b from-blue-100 to-blue-50">
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
          <Text className="text-xl font-bold text-blue-600">
            Điểm: {score}/{lettersData.length}
          </Text>
        </Box>

        <Box className="text-center mb-8">
          <Text className="text-2xl font-bold text-gray-800">
            🔤 Truy Tìm Chữ Cái 🔤
          </Text>
          <Text className="text-gray-600 mt-2">
            Tìm chữ cái được hiển thị!
          </Text>
        </Box>

        {!gameComplete ? (
          <>
            {/* Current Letter Display */}
            <Box className="bg-white rounded-2xl p-8 mb-8 text-center shadow-lg">
              <Text className="text-sm text-gray-500 mb-4">
                Tìm chữ cái:
              </Text>
              <Text
                className="font-bold"
                style={{
                  fontSize: "120px",
                  color: "#2196F3",
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
                  className="bg-white rounded-xl p-8 shadow-md cursor-pointer active:scale-95 transition-transform text-center"
                  onClick={() => !showFeedback && handleLetterClick(letter)}
                  style={{
                    backgroundColor:
                      showFeedback === 'correct' && letter === currentLetter.letter
                        ? "#4CAF50"
                        : showFeedback === 'wrong' && letter !== currentLetter.letter
                        ? "#F44336"
                        : "white",
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
          <Box className="text-center mt-12">
            <Text className="text-6xl mb-4">🏆</Text>
            <Text className="text-3xl font-bold text-green-600 mb-4">
              Xuất sắc!
            </Text>
            <Text className="text-xl text-gray-700 mb-8">
              Bạn đã tìm đúng {score} chữ cái!
            </Text>
            <Box className="flex gap-4 justify-center">
              <Button onClick={resetGame} className="bg-blue-500">
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

export default LettersGame;
