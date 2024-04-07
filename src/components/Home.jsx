import React from "react";
import { Box, Text } from "rebass";
import { css } from "@emotion/react";
import MusicCardList from "./MusicCardList";
import { useSelector } from "react-redux";

function Home({ searchQuery }) {
  const { darkMode } = useSelector((state) => state.general);
  console.log(import.meta.env.VITE_BACKEND_URL);
  const customStyle = css`
    padding: 20px;
    width: 100%;
    background-color: ${darkMode ? "#404040" : "white"};
    color: ${darkMode ? "white" : "black"};
  `;
  return (
    <Box css={customStyle}>
      <MusicCardList searchQuery={searchQuery} />
    </Box>
  );
}

export default Home;
