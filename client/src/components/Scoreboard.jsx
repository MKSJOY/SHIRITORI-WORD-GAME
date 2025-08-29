export default function Scoreboard({ scores, currentPlayer, secondsLeft }) {
  return (
    <div className="scoreboard">
      <span className={currentPlayer === 1 ? "active-player" : ""}>Player 1: {scores[1]}</span>
      <span className={currentPlayer === 2 ? "active-player" : ""}>Player 2: {scores[2]}</span>
      <span>Time: {secondsLeft}s</span>
    </div>
  );
}
