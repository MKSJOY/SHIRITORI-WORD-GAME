# SHIRITORI-WORD-GAME


A **two-player Shiritori game** built with **React**.  
Players take turns entering words following Shiritori rules:

- Each word must start with the last letter of the previous word.
- Words must be at least 4 letters long.
- Words cannot be repeated.
- Words are validated using [DictionaryAPI](https://dictionaryapi.dev/).
- Players have a countdown timer for each turn.
- Score tracking and word history included.

---

## 🎮 Features

- Turn-based gameplay for 2 players.
- Word validation with DictionaryAPI.
- Countdown timer for each turn.
- Score tracking for both players.
- Word history display.
- Active player highlighting.
- Visual timer bar with flash effect for last 5 seconds.
- Reset game functionality.

---

- **`components/`** → React components for game UI.  
- **`utils/`** → Helper functions for word normalization, validation, and DictionaryAPI calls.  
- **`App.jsx`** → Main game logic.  
- **`styles.css`** → All styles including timer bar, scoreboard, inputs, etc.  

---

## ⚙️ Installation

Clone the repository
git clone <your-repo-url>
cd shiritori-game/client
npm install
npm run dev
Open your browser at http://localhost:5173 to play.
The game automatically switches turns and validates words.

## 🔄 Reset Game
Click the Reset Game button to start a new game.

## 📝 Notes
No backend required; all validation is done on the frontend using DictionaryAPI.
The game is mobile-friendly and responsive.
Active player is highlighted, and timer flashes red in the last 5 seconds.

## 🛠️ Tech Stack
React 19
Vite
Axios for API calls
CSS for styling
