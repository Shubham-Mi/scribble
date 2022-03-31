import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerRole } from "../store/PlayerStore";

export default function Word() {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.PlayerStore);
  const [word, setWord] = useState("");

  useEffect(() => {
    const drawWord = (word) => {
      setWord(word);
      dispatch(setPlayerRole("drawer"));
    };

    const guessWord = (length) => {
      let maskedWord = "";
      for (let i = 0; i < length; i++) {
        maskedWord = `${maskedWord}_`;
      }
      setWord(maskedWord);
      dispatch(setPlayerRole("guesser"));
    };

    const revealWord = (word) => {
      setWord(word);
    };

    socket.on("round/word/draw", drawWord);
    socket.on("round/word/guess", guessWord);
    socket.on("round/word/reveal", revealWord);
  }, [dispatch, socket, word]);

  return <div>{word}</div>;
}
