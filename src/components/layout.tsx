import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { Box } from "zmp-ui";
import GamesHomePage from "pages/games";
import ShapesGame from "pages/games/shapes";
import LettersGame from "pages/games/letters";
import CountingGame from "pages/games/counting";
import PuzzleGame from "pages/games/puzzle";
import MemoryGame from "pages/games/memory";
import { getSystemInfo } from "zmp-sdk";
import { ScrollRestoration } from "./scroll-restoration";

if (import.meta.env.DEV) {
  document.body.style.setProperty("--zaui-safe-area-inset-top", "24px");
} else if (getSystemInfo().platform === "android") {
  const statusBarHeight =
    window.ZaloJavaScriptInterface?.getStatusBarHeight() ?? 0;
  const androidSafeTop = Math.round(statusBarHeight / window.devicePixelRatio);
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`
  );
}

export const Layout: FC = () => {
  return (
    <Box flex flexDirection="column" className="h-screen">
      <ScrollRestoration />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<GamesHomePage />}></Route>
          <Route path="/game/shapes" element={<ShapesGame />}></Route>
          <Route path="/game/letters" element={<LettersGame />}></Route>
          <Route path="/game/counting" element={<CountingGame />}></Route>
          <Route path="/game/puzzle" element={<PuzzleGame />}></Route>
          <Route path="/game/memory" element={<MemoryGame />}></Route>
        </Routes>
      </Box>
    </Box>
  );
};
