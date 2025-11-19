import React, { useState, useEffect } from "react";
import { Box, Page, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { gameScoresState } from "state/game-state";
import { soundManager } from "utils/sound";

interface PuzzlePiece {
  id: number;
  currentPosition: number;
  correctPosition: number;
  emoji: string;
}

const puzzleImages = [
  { emoji: "🐶", parts: ["🐶", "🦴", "🏠", "🎾"] },
  { emoji: "🌈", parts: ["☀️", "🌈", "☁️", "⭐"] },
  { emoji: "🚗", parts: ["🚗", "🛣️", "🚦", "⛽"] },
  { emoji: "🌸", parts: ["🌸", "🦋", "🌿", "🐝"] },
];

const PuzzleGame: React.FC = () => {
  const navigate = useNavigate();
  const setGameScores = useSetRecoilState(gameScoresState);
  
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    initializePuzzle();
  }, [currentPuzzle]);

  const initializePuzzle = () => {
    const puzzle = puzzleImages[currentPuzzle];
    const shuffled = [...puzzle.parts]
      .map((emoji, index) => ({
        id: index,
        currentPosition: index,
        correctPosition: index,
        emoji,
      }))
      .sort(() => Math.random() - 0.5)
      .map((piece, index) => ({ ...piece, currentPosition: index }));
    
    setPieces(shuffled);
    setSelectedPiece(null);
  };

  const handlePieceClick = (position: number) => {
    soundManager.playTap();
    
    if (selectedPiece === null) {
      setSelectedPiece(position);
    } else {
      // Swap pieces
      const newPieces = [...pieces];
      const piece1Index = pieces.findIndex(p => p.currentPosition === selectedPiece);
      const piece2Index = pieces.findIndex(p => p.currentPosition === position);
      
      const temp = newPieces[piece1Index].currentPosition;
      newPieces[piece1Index].currentPosition = newPieces[piece2Index].currentPosition;
      newPieces[piece2Index].currentPosition = temp;
      
      setPieces(newPieces);
      setSelectedPiece(null);
      
      // Check if puzzle is complete
      const isComplete = newPieces.every(
        piece => piece.currentPosition === piece.correctPosition
      );
      
      if (isComplete) {
        soundManager.playSuccess();
        setScore(prev => prev + 1);
        setShowCelebration(true);
        
        setTimeout(() => {
          setShowCelebration(false);
          if (currentPuzzle < puzzleImages.length - 1) {
            setCurrentPuzzle(prev => prev + 1);
          } else {
            completeGame();
          }
        }, 2000);
      }
    }
  };

  const completeGame = () => {
    setGameComplete(true);
    soundManager.playCelebration();
    const stars = score + 1 >= 4 ? 3 : score + 1 >= 3 ? 2 : 1;
    setGameScores((prev) => [
      ...prev.filter((s) => s.gameId !== "puzzle"),
      {
        gameId: "puzzle",
        score: score + 1,
        maxScore: puzzleImages.length,
        stars,
        completedAt: new Date(),
      },
    ]);
  };

  const resetGame = () => {
    setCurrentPuzzle(0);
    setScore(0);
    setGameComplete(false);
    setShowCelebration(false);
  };

  return (
    <Page className="bg-gradient-to-b from-amber-100 to-amber-50">
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
          <Text className="text-xl font-bold text-amber-700">
            Điểm: {score}/{puzzleImages.length}
          </Text>
        </Box>

        <Box className="text-center mb-8">
          <Text className="text-3xl font-bold text-amber-800 mb-2">
            🧩 Ghép Hình 🧩
          </Text>
          <Text className="text-gray-600">
            Chạm để chọn, chạm lại để đổi chỗ!
          </Text>
        </Box>

        {!gameComplete ? (
          <>
            {showCelebration && (
              <Box className="text-center mb-4 animate-bounce">
                <Text className="text-5xl">🎉 Tuyệt vời! 🎉</Text>
              </Box>
            )}

            {/* Puzzle Grid */}
            <Box className="bg-white rounded-3xl p-6 shadow-2xl mb-6 max-w-md mx-auto">
              <Box className="grid grid-cols-2 gap-3">
                {pieces
                  .sort((a, b) => a.currentPosition - b.currentPosition)
                  .map((piece) => (
                    <Box
                      key={piece.id}
                      className="aspect-square rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-200 shadow-lg"
                      style={{
                        backgroundColor: selectedPiece === piece.currentPosition 
                          ? "#FFA726" 
                          : "#FFF3E0",
                        transform: selectedPiece === piece.currentPosition 
                          ? "scale(0.95)" 
                          : "scale(1)",
                        border: selectedPiece === piece.currentPosition 
                          ? "4px solid #FF6F00" 
                          : "2px solid #FFE0B2",
                      }}
                      onClick={() => handlePieceClick(piece.currentPosition)}
                    >
                      <Text className="text-6xl">{piece.emoji}</Text>
                    </Box>
                  ))}
              </Box>
            </Box>

            <Box className="text-center">
              <Text className="text-sm text-gray-500">
                Ghép hình {currentPuzzle + 1} / {puzzleImages.length}
              </Text>
            </Box>
          </>
        ) : (
          <Box className="text-center mt-12 bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-auto">
            <Text className="text-7xl mb-4 animate-bounce">🏆</Text>
            <Text className="text-3xl font-bold text-amber-700 mb-4">
              Hoàn Thành!
            </Text>
            <Text className="text-xl text-gray-700 mb-8">
              Bạn đã ghép thành công {score} hình!
            </Text>
            <Box className="flex gap-4 justify-center flex-wrap">
              <Button onClick={resetGame} className="bg-amber-500 text-white shadow-lg">
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

export default PuzzleGame;
