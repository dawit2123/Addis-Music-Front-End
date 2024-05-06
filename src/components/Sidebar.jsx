import { css } from "@emotion/react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Text } from "rebass";
import { useNavigate } from "react-router-dom";
// import { toggleDarkMode } from "../state/generalState";

const sectionTitleStyle = css`
  padding: 10px;
  border-top: 1px solid #444;
  border-bottom: 1px solid #444;
`;

const sidebarItemStyle = css`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { darkMode } = useSelector((state) => state.general);

  const sidebarStyle = css`
    width: 250px;
    background-image: ${darkMode
      ? "linear-gradient(to right, rgba(0,0,0,0.89), rgba(0,0,0,0.4))"
      : "linear-gradient(160deg, rgba(0, 147, 233, 0.8) 0%, rgba(0, 147, 233, 0.4) 100%)"};
    color: ${darkMode ? "white" : "black"};
    min-height: 90vh;
    padding-top: 20px;
  `;
  const handleBoxClick = () => {
    navigate("/");
  };
  const handleAboutBoxClick = () => {
    navigate("/about");
  };

  return (
    <Flex css={sidebarStyle} flexDirection="column">
      <Box css={sectionTitleStyle}>
        <Text fontWeight="bold">Library</Text>
      </Box>

      <Box css={sidebarItemStyle} onClick={handleBoxClick}>
        <Text>Home</Text>
      </Box>
      <Box css={sidebarItemStyle} onClick={handleAboutBoxClick}>
        <Text>About</Text>
      </Box>
      <Box
        css={css`
          display: flex;
          align-self: center;
          margin-top: 30px;
        `}
      ></Box>
    </Flex>
  );
};

export default Sidebar;
