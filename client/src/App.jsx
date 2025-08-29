import React, { useState, useEffect, useRef } from "react";
import Board from "./components/Board";
import PlayerInput from "./components/PlayerInput";
import Scoreboard from "./components/Scoreboard";
import { getWordMetadata } from "./utils/dictionary";
import { normalizeWord, levenshtein } from "./utils/wordUtils";

const TURN_TIME = 20; // seconds

function useTimer(initialSeconds, onTimeout, currentPlayer) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          onTimeout(currentPlayer);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [onTimeout, initialSeconds, currentPlayer]);

  const reset = () => setSecondsLeft(initialSeconds);

  return { secondsLeft, reset };
}

export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [history, setHistory] = useState([]);
  const [rawHistory, setRawHistory] = useState([]);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [message, setMessage] = useState("");
  const [validating, setValidating] = useState(false);

  const { secondsLeft, reset } = useTimer(TURN_TIME, applyPenalty, currentPlayer);

  async function onSubmitWord(rawWord) {
    setMessage("");
    const word = normalizeWord(rawWord);
    if (validating) return;
    if (!word || word.length < 4) return setMessage("Word must be at least 4 letters.");
    if (history.includes(word)) return setMessage("Word already used.");

    if (history.length > 0) {
      const last = history[history.length - 1];
      if (word[0] !== last[last.length - 1]) return applyPenalty(currentPlayer, `Must start with '${last[last.length - 1]}'`);
    }

    for (let prev of history) {
      const threshold = Math.max(1, Math.floor(Math.max(prev.length, word.length) * 0.2));
      if (levenshtein(prev, word) <= threshold) return setMessage("Too similar to previous word.");
    }

    setValidating(true);
    try {
      const word = normalizeWord(rawWord); // trim + lowercase + remove non-letters
      const meta = await getWordMetadata(word);
      if (!meta.valid) return applyPenalty(currentPlayer, "Word not found in dictionary.");

      setHistory((h) => [...h, word]);
      setRawHistory((r) => [...r, rawWord]);
      setScores((s) => ({ ...s, [currentPlayer]: s[currentPlayer] + 1 }));

      setCurrentPlayer((p) => (p === 1 ? 2 : 1));
      reset();
    } catch {
      setMessage("Validation failed. Try again.");
    } finally {
      setValidating(false);
    }
  }

  function applyPenalty(player, reason) {
    setMessage(`Player ${player} penalty: ${reason}`);
    setScores((s) => ({ ...s, [player]: s[player] - 1 }));
    setCurrentPlayer(player === 1 ? 2 : 1);
    reset();
  }

  function resetGame() {
    setHistory([]);
    setRawHistory([]);
    setScores({ 1: 0, 2: 0 });
    setCurrentPlayer(1);
    setMessage("");
    reset();
  }

  // Determine timer bar color (<5s: red, else green)
  const timerColor = secondsLeft <= 5 ? "red" : "limegreen";

  return (
    <div className="app">
      <h1>Nyntax Shiritori</h1>
      <Scoreboard scores={scores} currentPlayer={currentPlayer} secondsLeft={secondsLeft} />

      <div className="timer-bar">
        <div className="timer-fill" style={{ width: `${(secondsLeft / TURN_TIME) * 100}%`, backgroundColor: timerColor }}></div>
      </div>

      <div>
        Required start letter: {history.length === 0 ? "— (any)" : history[history.length - 1].slice(-1)}
      </div>
      <div className="timer-bar">
        <div
          className={`timer-fill ${secondsLeft <= 5 ? "flash" : ""}`}
          style={{ width: `${(secondsLeft / TURN_TIME) * 100}%` }}
        ></div>
      </div>


      <Board history={rawHistory.length ? rawHistory : history} />

      {/* Both players input visible, highlighting current player */}
      <div className="inputs-container" style={{ display: "flex", justifyContent: "space-around", marginTop: 12 }}>
        <PlayerInput player={1} currentPlayer={currentPlayer} onSubmit={onSubmitWord} disabled={validating} />
        <PlayerInput player={2} currentPlayer={currentPlayer} onSubmit={onSubmitWord} disabled={validating} />
      </div>

      <button onClick={resetGame} style={{ marginTop: 12 }}>Reset Game</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
