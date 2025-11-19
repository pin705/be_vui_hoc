import React from "react";
import { Box, Page, Text } from "zmp-ui";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { gamesState, totalStarsState } from "state/game-state";
import { useNavigate } from "react-router-dom";

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
      className="rounded-xl p-6 mb-4 shadow-md cursor-pointer active:scale-95 transition-transform"
      style={{ backgroundColor: game.color }}
      onClick={() => navigate(game.route)}
    >
      <Box className="flex items-center gap-4">
        <Text className="text-5xl">{game.icon}</Text>
        <Box className="flex-1">
          <Text className="text-xl font-bold text-gray-800">{game.title}</Text>
          <Text className="text-sm text-gray-700 mt-1">{game.description}</Text>
        </Box>
        <Text className="text-3xl">▶️</Text>
      </Box>
    </Box>
  );
};

const GamesHomePage: React.FC = () => {
  const games = useRecoilValue(gamesState);
  const totalStars = useRecoilValue(totalStarsState);

  return (
    <Page className="bg-gradient-to-b from-purple-100 to-pink-100">
      <Box className="p-4">
        {/* Header */}
        <Box className="text-center mb-6 mt-4">
          <Text className="text-3xl font-bold text-purple-600">
            🎮 Bé Vui Học 🎮
          </Text>
          <Text className="text-lg text-gray-600 mt-2">
            Chọn trò chơi để bắt đầu!
          </Text>
          <Box className="mt-4 bg-yellow-200 rounded-full inline-block px-6 py-2">
            <Text className="text-xl font-bold text-yellow-800">
              ⭐ {totalStars} sao
            </Text>
          </Box>
        </Box>

        {/* Game List */}
        <Box className="mt-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </Box>

        {/* Footer Message */}
        <Box className="text-center mt-8 mb-6">
          <Text className="text-gray-500 text-sm">
            🌟 Chơi và học mỗi ngày! 🌟
          </Text>
        </Box>
      </Box>
    </Page>
  );
};

export default GamesHomePage;
