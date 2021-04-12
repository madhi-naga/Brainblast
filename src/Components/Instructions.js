import "./Instructions.css";

function Instructions() {
    return (
      <div>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
        <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
            rel="stylesheet"
        ></link>
        <div id="titleHeader"> Instructions </div>
        <div id="instHeader">What is BrainBlast?</div>
        <div id="instContent">Brainblast is a collection of 5 mini-games testing cognitive ability. Your scores on each game are totaled and posted on the leaderboard.</div>
        <div id="instContent">Scores are weighted in order of how well you did on each game (e.g. 100% weighting for your top scoring game, 80% weighting for your 2nd best scoring game, etc.).</div>
        <div id="instHeader">Game 1 Instructions: Minesweeper</div>
        <div id="instContent">The classic game of minesweeper. Click each grid to reveal what's underneath.</div>
        <div id="instContent">Grids can either contain a mine, or a number representing the number of adjacent mines. Reveal all non-mine grids to win!</div>
        <div id="instHeader">Game 2 Instructions: Word Reverse</div>
        <div id="instContent"> Reverse as many words as possible before the timer ends. Red words add bonus points!</div>
        <div id="instHeader">Game 3 Instructions: Memory Game</div>
        <div id="instContent"> You will be shown words or numbers. If you've seen a word or number during the game, click seen, if you haven't, click new.</div>
        <div id="instContent">Get as many points as you can before you get 3 wrong!</div>
        <div id="instHeader">Game 4 Instructions: Number Hunt</div>
        <div id="instContent"> Enter the sum of the numbers floating on screen to earn points. More numbers will appear as you earn more points!</div>
        <div id="instHeader">Game 5 Instructions: Aim Trainer</div>
        <div id="instContent"> Click the circles as they appear on the screen. Click as many as you can before time runs out!</div>
      </div>
    );
  }
  
  export default Instructions;
  