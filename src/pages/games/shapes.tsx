import React, { useState, useEffect } from "react";
import { Box, Page, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { shapesDataState, gameScoresState } from "state/game-state";
import { soundManager } from "utils/sound";

interface DropZone {
  id: string;
  shape: "circle" | "square" | "triangle" | "star";
  filled: boolean;
}

const ShapeRenderer: React.FC<{
  shape: "circle" | "square" | "triangle" | "star";
  size?: number;
  color?: string;
}> = ({ shape, size = 60, color = "#FF6B9D" }) => {
  const baseStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  switch (shape) {
    case "circle":
      return (
        <div
          style={{
            ...baseStyle,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
      );
    case "square":
      return (
        <div
          style={{
            ...baseStyle,
            backgroundColor: color,
          }}
        />
      );
    case "triangle":
      return (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
          }}
        />
      );
    case "star":
      return (
        <div style={baseStyle}>
          <Text className="text-5xl">⭐</Text>
        </div>
      );
  }
};

const ShapesGame: React.FC = () => {
  const navigate = useNavigate();
  const shapesData = useRecoilValue(shapesDataState);
  const setGameScores = useSetRecoilState(gameScoresState);
  
  const [dropZones, setDropZones] = useState<DropZone[]>([
    { id: "1", shape: "circle", filled: false },
    { id: "2", shape: "square", filled: false },
    { id: "3", shape: "triangle", filled: false },
    { id: "4", shape: "star", filled: false },
  ]);
  
  const [draggedShape, setDraggedShape] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const handleDragStart = (shapeType: string) => {
    soundManager.playTap();
    setDraggedShape(shapeType);
  };

  const handleDrop = (zoneId: string, zoneShape: string) => {
    if (draggedShape === zoneShape) {
      soundManager.playSuccess();
      setDropZones((prev) =>
        prev.map((zone) =>
          zone.id === zoneId ? { ...zone, filled: true } : zone
        )
      );
      setScore((prev) => prev + 1);
    } else {
      soundManager.playError();
    }
    setDraggedShape(null);
  };

  useEffect(() => {
    if (dropZones.every((zone) => zone.filled)) {
      setGameComplete(true);
      soundManager.playCelebration();
      const stars = score === 4 ? 3 : score === 3 ? 2 : 1;
      setGameScores((prev) => [
        ...prev.filter((s) => s.gameId !== "shapes"),
        {
          gameId: "shapes",
          score,
          maxScore: 4,
          stars,
          completedAt: new Date(),
        },
      ]);
    }
  }, [dropZones, score, setGameScores]);

  const resetGame = () => {
    setDropZones([
      { id: "1", shape: "circle", filled: false },
      { id: "2", shape: "square", filled: false },
      { id: "3", shape: "triangle", filled: false },
      { id: "4", shape: "star", filled: false },
    ]);
    setScore(0);
    setGameComplete(false);
  };

  return (
    <Page 
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #fce4ec, #f8bbd0, #f48fb1)",
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
            <Text className="text-xl font-bold text-pink-600">
              Điểm: {score}/4
            </Text>
          </Box>
        </Box>

        <Box className="text-center mb-8">
          <Text className="text-3xl font-bold text-pink-900 mb-2">
            🔷 Nhận Biết Hình Dạng 🔷
          </Text>
          <Text className="text-gray-700 font-medium">
            Kéo hình dạng vào ô đúng!
          </Text>
        </Box>

        {!gameComplete ? (
          <>
            {/* Drop Zones */}
            <Box className="mb-8">
              <Text className="text-lg font-semibold mb-4 text-center text-pink-900">
                Thả hình vào đây:
              </Text>
              <Box className="grid grid-cols-2 gap-4">
                {dropZones.map((zone) => (
                  <Box
                    key={zone.id}
                    className="rounded-2xl p-6 flex items-center justify-center min-h-[120px] transition-all duration-300"
                    style={{
                      background: zone.filled 
                        ? "linear-gradient(135deg, #a5d6a7 0%, #66bb6a 100%)"
                        : "rgba(255, 255, 255, 0.8)",
                      border: zone.filled 
                        ? "3px solid #4caf50" 
                        : "3px dashed rgba(0, 0, 0, 0.2)",
                      boxShadow: zone.filled 
                        ? "0 8px 24px rgba(76, 175, 80, 0.3)" 
                        : "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                    onClick={() => draggedShape && handleDrop(zone.id, zone.shape)}
                  >
                    {zone.filled ? (
                      <ShapeRenderer shape={zone.shape} size={70} color="#4CAF50" />
                    ) : (
                      <ShapeRenderer shape={zone.shape} size={70} color="#E0E0E0" />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Draggable Shapes */}
            <Box>
              <Text className="text-lg font-semibold mb-4 text-center text-pink-900">
                Chọn hình:
              </Text>
              <Box className="grid grid-cols-4 gap-3">
                {shapesData.map((item) => (
                  <Box
                    key={item.id}
                    className="rounded-xl p-4 cursor-pointer transition-all duration-200 flex items-center justify-center"
                    onClick={() => handleDragStart(item.shape)}
                    style={{
                      background: draggedShape === item.shape 
                        ? "linear-gradient(135deg, #FF6B9D 0%, #FF8E9E 100%)"
                        : "rgba(255, 255, 255, 0.9)",
                      border: draggedShape === item.shape 
                        ? "3px solid #FF1744" 
                        : "2px solid rgba(0, 0, 0, 0.1)",
                      boxShadow: draggedShape === item.shape
                        ? "0 6px 20px rgba(255, 23, 68, 0.3)"
                        : "0 4px 12px rgba(0, 0, 0, 0.1)",
                      transform: draggedShape === item.shape ? "scale(0.95)" : "scale(1)",
                    }}
                  >
                    <ShapeRenderer shape={item.shape} size={50} />
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        ) : (
          <Box className="text-center mt-12 rounded-3xl p-8 max-w-md mx-auto"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Text className="text-6xl mb-4 animate-bounce">🎉</Text>
            <Text className="text-3xl font-bold text-green-600 mb-4">
              Tuyệt vời!
            </Text>
            <Text className="text-xl text-gray-700 mb-8">
              Bạn đã hoàn thành trò chơi!
            </Text>
            <Box className="flex gap-4 justify-center">
              <Button 
                onClick={resetGame}
                style={{
                  background: "linear-gradient(135deg, #f48fb1 0%, #f06292 100%)",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(244, 143, 177, 0.4)",
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

export default ShapesGame;
