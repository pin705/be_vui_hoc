import React, { useState, useEffect } from "react";
import { Box, Page, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { shapesDataState, gameScoresState } from "state/game-state";

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
    setDraggedShape(shapeType);
  };

  const handleDrop = (zoneId: string, zoneShape: string) => {
    if (draggedShape === zoneShape) {
      setDropZones((prev) =>
        prev.map((zone) =>
          zone.id === zoneId ? { ...zone, filled: true } : zone
        )
      );
      setScore((prev) => prev + 1);
    }
    setDraggedShape(null);
  };

  useEffect(() => {
    if (dropZones.every((zone) => zone.filled)) {
      setGameComplete(true);
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
    <Page className="bg-gradient-to-b from-pink-100 to-pink-50">
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
          <Text className="text-xl font-bold text-pink-600">
            Điểm: {score}/4
          </Text>
        </Box>

        <Box className="text-center mb-8">
          <Text className="text-2xl font-bold text-gray-800">
            🔷 Nhận Biết Hình Dạng 🔷
          </Text>
          <Text className="text-gray-600 mt-2">
            Kéo hình dạng vào ô đúng!
          </Text>
        </Box>

        {!gameComplete ? (
          <>
            {/* Drop Zones */}
            <Box className="mb-8">
              <Text className="text-lg font-semibold mb-4 text-center">
                Thả hình vào đây:
              </Text>
              <Box className="grid grid-cols-2 gap-4">
                {dropZones.map((zone) => (
                  <Box
                    key={zone.id}
                    className="bg-white rounded-xl p-6 border-4 border-dashed border-gray-300 flex items-center justify-center min-h-[120px]"
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
              <Text className="text-lg font-semibold mb-4 text-center">
                Chọn hình:
              </Text>
              <Box className="grid grid-cols-4 gap-3">
                {shapesData.map((item) => (
                  <Box
                    key={item.id}
                    className="bg-white rounded-lg p-4 shadow-md cursor-pointer active:scale-95 transition-transform flex items-center justify-center"
                    onClick={() => handleDragStart(item.shape)}
                    style={{
                      border: draggedShape === item.shape ? "3px solid #FF6B9D" : "none",
                    }}
                  >
                    <ShapeRenderer shape={item.shape} size={50} />
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        ) : (
          <Box className="text-center mt-12">
            <Text className="text-6xl mb-4">🎉</Text>
            <Text className="text-3xl font-bold text-green-600 mb-4">
              Tuyệt vời!
            </Text>
            <Text className="text-xl text-gray-700 mb-8">
              Bạn đã hoàn thành trò chơi!
            </Text>
            <Box className="flex gap-4 justify-center">
              <Button onClick={resetGame} className="bg-pink-500">
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

export default ShapesGame;
