/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Box, Button } from "rebass";
import { Input, Label } from "@rebass/forms";
import { useDispatch, useSelector } from "react-redux";
import { addMusic } from "../state/musicState";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const inputStyle = css`
  width: 100%;
  margin-bottom: 20px;
`;

const CreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    artistName: "",
    coverImage: null, // Initialize coverImage as null
    audioFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("artistName", formData.artistName);
    formDataToSend.append("coverImage", formData.coverImage);
    formDataToSend.append("audioFile", formData.audioFile);
    dispatch(addMusic(formDataToSend));
    navigate("/");
  };

  const { darkMode } = useSelector((state) => state.general);
  const formStyle = css`
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    background: ${darkMode ? "#404040" : "white"};
    color: ${darkMode ? "white" : "black"};
  `;
  const buttonStyle = css`
    cursor: pointer;
    background-image: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
  `;
  return (
    <form
      css={formStyle}
      onSubmit={handleSubmit}
      encType="multipart/form-data" // Corrected attribute name
    >
      <Box css={inputStyle}>
        <Label htmlFor="title">Title:</Label>
        <Input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </Box>
      <Box css={inputStyle}>
        <Label htmlFor="artist">Artist:</Label>
        <Input
          type="text"
          name="artistName"
          id="artist"
          value={formData.artistName}
          onChange={handleInputChange}
          required
        />
      </Box>

      <Box css={inputStyle}>
        <Label htmlFor="coverImage">Cover Image:</Label>
        <Input
          type="file"
          name="coverImage"
          id="coverImage"
          onChange={(e) => {
            setFormData({
              ...formData,
              coverImage: e.target.files[0],
            });
          }}
          required
        />
      </Box>
      <Box css={inputStyle}>
        <Label htmlFor="audioFile">Audio File:</Label>
        <Input
          type="file"
          name="audioFile"
          id="audioFile"
          onChange={(e) => {
            setFormData({
              ...formData,
              audioFile: e.target.files[0],
            });
          }}
          required
        />
      </Box>
      <Button
        type="submit"
        color={"white"}
        backgroundColor={"green"}
        css={buttonStyle}
      >
        Save
      </Button>
    </form>
  );
};
export default CreatePage;
