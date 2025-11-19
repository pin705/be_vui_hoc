import React from "react";
import { Box, Page, Text } from "zmp-ui";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { gamesState, totalStarsState } from "state/game-state";
import { useNavigate } from "react-router-dom";
import { soundManager } from "utils/sound";

const GameCard: React.FC<{
  game: {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    route: string;
  };
}> = ({ game }) => {
  const navigate = useNavigate();

  return (
    <Box
      className="rounded-2xl p-6 mb-4 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-98"
      style={{
        background: `linear-gradient(135deg, ${game.color}dd, ${game.color}99)`,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
      onClick={() => {
        soundManager.playClick();
        navigate(game.route);
      }}
    >
      <Box className="flex items-center gap-4">
        <Box 
          className="rounded-xl flex items-center justify-center"
          style={{
            width: "64px",
            height: "64px",
            background: "rgba(255, 255, 255, 0.5)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Text className="text-4xl">{game.icon}</Text>
        </Box>
        <Box className="flex-1">
          <Text className="text-xl font-bold text-gray-800 mb-1">{game.title}</Text>
          <Text className="text-sm text-gray-700">{game.description}</Text>
        </Box>
        <Box 
          className="rounded-full flex items-center justify-center"
          style={{
            width: "40px",
            height: "40px",
            background: "rgba(255, 255, 255, 0.4)",
          }}
        >
          <Text className="text-2xl">▶️</Text>
        </Box>
      </Box>
    </Box>
  );
};

const GamesHomePage: React.FC = () => {
  const games = useRecoilValue(gamesState);
  const totalStars = useRecoilValue(totalStarsState);

  return (
    <Page 
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #f3e7f5, #e8f4f8, #fff9e6)",
      }}
    >
      <Box className="p-4 pb-8">
        {/* Header */}
        <Box className="text-center mb-6 mt-4">
          <Text 
            className="text-4xl font-bold mb-2"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            🎮 Bé Vui Học 🎮
          </Text>
          <Text className="text-lg text-gray-600 mt-2">
            Chọn trò chơi để bắt đầu!
          </Text>
          <Box 
            className="mt-6 inline-block px-8 py-3 rounded-full"
            style={{
              background: "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)",
              boxShadow: "0 6px 20px rgba(255, 216, 155, 0.4)",
            }}
          >
            <Text className="text-2xl font-bold text-white">
              ⭐ {totalStars} sao
            </Text>
          </Box>
        </Box>

        {/* Game List */}
        <Box className="mt-8">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </Box>

        {/* Footer Message */}
        <Box className="text-center mt-10 mb-6">
          <Box 
            className="inline-block px-6 py-3 rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Text className="text-gray-600 text-sm font-medium">
              🌟 Chơi và học mỗi ngày! 🌟
            </Text>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default GamesHomePage;
