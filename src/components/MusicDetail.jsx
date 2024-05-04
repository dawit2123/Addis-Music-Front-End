import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Flex, Heading, Text } from "rebass";
import { css } from "@emotion/react";
import { FaPlay, FaPause } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteMusic, editMusic, getMusicsFetch } from "../state/musicState";
import ReactPlayer from "react-player"; // Import React Player

const MusicDetail = () => {
  const { _id } = useParams();
  const [isPlaying, setPlaying] = useState(false);
  const [musicUrl, setMusicUrl] = useState(""); // State to store music URL

  const { musics, isLoadingState } = useSelector((state) => state.musics);
  const { darkMode } = useSelector((state) => state.general);

  const music = musics.find((music) => music._id === _id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!music) {
      dispatch(getMusicsFetch());
    } else {
      setMusicUrl(
        `${import.meta.env.VITE_BACKEND_URL}/audio/music/${music.audioFile}`
      );
    }

    return () => {
      // Cleanup audio when component unmounts
      setMusicUrl(""); // Reset music URL
    };
  }, [dispatch, music]);

  const handleDelete = () => {
    dispatch(deleteMusic(_id));
    navigate("/");
  };

  const backgroundImagePosition = `${
    import.meta.env.VITE_BACKEND_URL
  }/img/music/${music.coverImage}.jpeg`;
  const backgroundImageUrl = `url(${backgroundImagePosition})`;

  const gradientBackground = `
    linear-gradient(
      to bottom, 
      rgba(0, 0, 0, 0.2), 
      rgba(0, 0, 0, 1)
    ), 
    ${backgroundImageUrl}`;

  const styles = css`
    background: ${gradientBackground};
    background-size: 100% auto;
    background-position: center;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: relative;
  `;

  const boardStyle = css`
    position: absolute;
    background-color: ${darkMode ? "black" : "white"};
    bottom: 0;
    right: 0;
    left: 0;
    height: 200px;
    padding: 20px;
    opacity: 1;
  `;

  const firstBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${darkMode ? "white" : "#000"};
    gap: 20px;
  `;

  return (
    <>
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
        </div>
      ) : (
        <>
          {music && (
            <Box css={styles}>
              <Flex flexDirection="column" alignItems="center">
                <Button
                  onClick={handleDelete}
                  color={"red"}
                  fontWeight={"bold"}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "5em",
                  }}
                >
                  Delete
                </Button>
                <Link to={`/${_id}/edit`}>
                  <Button
                    color={"green"}
                    fontWeight={"bold"}
                    style={{
                      position: "absolute",
                      top: "50px",
                      right: "10px",
                      width: "5em",
                    }}
                  >
                    Edit
                  </Button>
                </Link>

                <Box css={boardStyle}>
                  <Flex flex={[1, 1]} justifyContent={"space-between"}>
                    <Box css={firstBox}>
                      <img
                        style={{ borderRadius: "10px" }}
                        // src={"/album-cover.jpg"}
                        width={50}
                      />
                      <Box>
                        <Heading>{music.title}</Heading>
                        <Text>{music.artist}</Text>
                      </Box>
                    </Box>

                    <Box css={firstBox}>{music.duration}</Box>
                  </Flex>

                  <Flex
                    justifyContent={"space-around"}
                    style={{ marginTop: "30px" }}
                  >
                    {/* <Link
                      to={_id - 1 > 0 ? `/${parseInt(_id) - 1}` : `/${_id}`}
                    >
                      <FaArrowAltCircleLeft
                        style={{ color: `${darkMode ? "white" : "black"}` }}
                        size={50}
                      />
                    </Link> */}
                    {isPlaying ? (
                      <FaPause
                        style={{ color: `${darkMode ? "white" : "black"}` }}
                        size={50}
                        onClick={() => setPlaying(false)}
                      />
                    ) : (
                      <FaPlay
                        style={{ color: `${darkMode ? "white" : "black"}` }}
                        size={50}
                        onClick={() => setPlaying(true)}
                      />
                    )}
                    {/* <Link
                      to={
                        _id < musics.length
                          ? `/${parseInt(_id) + 1}`
                          : `/${_id}`
                      }
                    >
                      <FaArrowCircleRight
                        size={50}
                        style={{ color: `${darkMode ? "white" : "black"}` }}
                      />
                    </Link> */}
                  </Flex>
                </Box>
              </Flex>
            </Box>
          )}
        </>
      )}
      {musicUrl && (
        <ReactPlayer
          url={musicUrl}
          playing={isPlaying}
          controls={false}
          width="0"
          height="0"
          volume={1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      )}
    </>
  );
};

export default MusicDetail;
