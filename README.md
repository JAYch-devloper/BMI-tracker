<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Stone Paper Scissors</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Arial', sans-serif;
    }

    body {
      background: #f2f2f2;
      text-align: center;
      padding: 30px;
    }

    h1 {
      margin-bottom: 20px;
      color: #333;
    }

    .choices {
      margin: 20px 0;
    }

    .choice-btn {
      padding: 15px 25px;
      margin: 10px;
      font-size: 18px;
      cursor: pointer;
      border: none;
      border-radius: 8px;
      background-color: #3498db;
      color: white;
      transition: 0.3s;
    }

    .choice-btn:hover {
      background-color: #2980b9;
    }

    .result-box {
      margin-top: 30px;
      font-size: 20px;
    }

    .result-box span {
      display: block;
      margin: 10px 0;
    }

    .score-board {
      margin-top: 20px;
      font-size: 22px;
      color: #444;
    }

    @media (max-width: 600px) {
      .choice-btn {
        width: 90%;
        font-size: 20px;
      }
    }
  </style>
</head>
<body>

  <h1>🪨📄✂️ Stone Paper Scissors</h1>

  <div class="choices">
    <button class="choice-btn" onclick="playGame('rock')">🪨 Rock</button>
    <button class="choice-btn" onclick="playGame('paper')">📄 Paper</button>
    <button class="choice-btn" onclick="playGame('scissors')">✂️ Scissors</button>
  </div>

  <div class="result-box">
    <span><strong>Your Choice:</strong> <span id="player-choice">-</span></span> 
    <span><strong>Computer's Choice:</strong> <span id="computer-choice">-</span></span> 
    <span><strong>Result:</strong> <span id="result">-</span></span> 
  </div>
  <style>
    .result-box{
        color: rgb(189, 31, 68);
    }
  </style>

  <div class="score-board">
    🧍 You: <span id="player-score">0</span> |
    🤖 Computer: <span id="computer-score">0</span>
  </div>

  <script>
    let playerScore = 0;
    let computerScore = 0;

    function getComputerChoice() {
      const choices = ['rock', 'paper', 'scissors'];
      return choices[Math.floor(Math.random() * 3)];
    }

    function getResult(player, computer) {
      if (player === computer) return "It's a Draw!";
      if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
      ) {
        playerScore++;
        return "You Win!";
      } else {
        computerScore++;
        return "You Lose!";
      }
    }

    function playGame(playerChoice) {
      const computerChoice = getComputerChoice();
      const result = getResult(playerChoice, computerChoice);

      document.getElementById('player-choice').textContent = playerChoice;
      document.getElementById('computer-choice').textContent = computerChoice;
      document.getElementById('result').textContent = result;

      document.getElementById('player-score').textContent = playerScore;
      document.getElementById('computer-score').textContent = computerScore;
    }
  </script>

</body>
</html>
