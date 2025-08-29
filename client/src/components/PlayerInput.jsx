import { useState, useEffect, useRef } from "react";

export default function PlayerInput({ player, currentPlayer, onSubmit, disabled }) {
  const [input, setInput] = useState("");
  const ref = useRef(null);

  // Auto-focus input when turn changes
  useEffect(() => {
    if (currentPlayer === player) {
      ref.current?.focus();
    }
  }, [currentPlayer, player]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="player-input-form">
      <label>Player {player}:</label>
      <input
        ref={ref}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled || currentPlayer !== player}
        style={{
          border: currentPlayer === player ? "2px solid green" : "1px solid gray",
          backgroundColor: currentPlayer === player ? "#f0fff0" : "#f9f9f9",
        }}
        placeholder={currentPlayer === player ? "Your turn..." : "Wait for your turn"}
      />
      <button type="submit" disabled={disabled || currentPlayer !== player || !input}>
        Submit
      </button>
    </form>
  );
}
