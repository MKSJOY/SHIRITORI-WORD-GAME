export default function Board({ history }) {
  return (
    <div className="board">
      <h3>Word History</h3>
      {history.length === 0 ? <p>No words yet</p> :
        <ol>{history.map((w, i) => <li key={i}>{w}</li>)}</ol>
      }
    </div>
  );
}
