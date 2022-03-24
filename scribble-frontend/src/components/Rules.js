import React from "react";

export default function Rules() {
  return (
    <div className="rules">
      <div className="rules__title">Rules</div>
      <div className="rules__subtitle">How To Play?</div>
      <p>
        When its your turn to draw, you will have to choose a word from two
        options and visualize that word in given time, alternatively when
        somebody else is drawing you have to type your guess into the chat to
        gain points.
      </p>
      <div className="rules__subtitle">How Score is Calculated?</div>
      <p>
        First player to guess gets highest points, and each player guessing gets
        score less than the previous guesser. And for drawer, for each player
        who guesses the word, the drawer's score increases.
      </p>
    </div>
  );
}
