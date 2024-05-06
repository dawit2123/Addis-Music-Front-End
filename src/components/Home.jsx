import React from "react";
import { Box, Text } from "rebass";
import { css } from "@emotion/react";
import MusicCardList from "./MusicCardList";
import { useSelector } from "react-redux";
import loaderGif from "./../assets/loader.gif";

function Home({ searchQuery }) {
  const { darkMode } = useSelector((state) => state.general);
  const { isLoadingState } = useSelector((state) => state.musics);
  const customStyle = css`
    padding: 20px;
    width: 100%;
    background-color: ${darkMode ? "#404040" : "white"};
    color: ${darkMode ? "white" : "black"};
  `;
  return (
    <Box css={customStyle}>
      {isLoadingState ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <img src={loaderGif} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <h2>Loading... Please wait</h2>
          </div>
        </div>
      ) : (
        <MusicCardList searchQuery={searchQuery} />
      )}
    </Box>
  );
}

export default Home;
