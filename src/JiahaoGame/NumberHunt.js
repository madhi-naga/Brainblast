import React from "react";
import { useContext} from "react";
import {ScoreContext} from "../Contexts/ScoreContext";
import CalcScores from "../Helpers/CalcScores";
import { Link } from "react-router-dom";
import axios from 'axios';

function NumberHunt(){

    const resultStyle = {
        color: 'red',
        font: '16px'
    };

    const canvasRef = React.useRef(null)
    const scoreContext = useContext(ScoreContext);
    const urlBackend = 'https://brainblast-be.herokuapp.com';

    React.useEffect(() => {
        const canvas = canvasRef.current
        const c = canvas.getContext('2d')
        
        var num1 = 0;
        var num2 = 0;
        var num3 = 0;
        var num4 = 0;
        var num5 = 0;
        var num_1;
        var num_2;
        var num_3;
        var num_4;
        var num_5;
        var gameLevel = 0;
        var answer = 0;
        var score = 0;
        var historyScore = 0;

        class randnum {

        constructor(x,y,vx,vy,radius,color,value) {
          this.x = x;  // x position
          this.y = y;  // y position
          this.vx = vx; // x velocity
          this.vy = vy; // y velocity
          this.radius = radius;
          this.color = color;
          this.value = value;
        }

        move() {
          this.x = this.x + this.vx;
          this.y = this.y + this.vy;
        }

        boundary_check() {
          if ((this.y + this.radius) + this.vy > canvas.height || 
            (this.y - this.radius) + this.vy < 0) {
              this.vy = -this.vy;
          }
          if ((this.x - this.radius) + this.vx < 0 || (this.x + this.radius) + this.vx > canvas.width) {         
            this.vx = -this.vx
          }          
        }
      }

      function calcScores() {
        var newScore = historyScore;
        CalcScores(4, newScore, scoreContext);

        var params = {
            username: scoreContext.username,
            minigame_scores: {
                minigame_4: newScore
            }
        }

        axios.post(`${urlBackend}/score/update`, params)
            .then(resp => alert("Updated Score"))
            .catch(error => console.log(error));
    }

      function generateNumber(){
        var dir1 = 1;
        var dir2 = -1;
        var dir3 = 1;
        var dir4 = -1;
        var dir5 = 1;
        if (gameLevel === 0){
          num1 = Math.floor(Math.random() * 10);
          num2 = Math.floor(Math.random() * 10);
          num_1 = new randnum(350,250,dir1*5,dir1*5,15,'white', num1); 
          num_2 = new randnum(300,200,dir2*5,dir2*5,15,'white', num2);
          answer = num1 + num2;
        }

        else if (gameLevel === 1){
          num1 = Math.floor(Math.random() * 10);
          num2 = Math.floor(Math.random() * 10);
          num3 = Math.floor(Math.random() * 10);
          num_1 = new randnum(350,250,dir1*5,dir1*5,15,'white', num1); 
          num_2 = new randnum(300,200,dir2*5,dir2*5,15,'white', num2); 
          num_3 = new randnum(270,275,dir3*5,dir3*5,15,'white', num3);
          answer = num1+num2+num3;
        }

        else if (gameLevel === 2){
          num1 = Math.floor(Math.random() * 10);
          num2 = Math.floor(Math.random() * 10);
          num3 = Math.floor(Math.random() * 10);
          num4 = Math.floor(Math.random() * 10);
          num_1 = new randnum(350,250,dir1*5,dir1*5,15,'white', num1); 
          num_2 = new randnum(300,200,dir2*5,dir2*5,15,'white', num2); 
          num_3 = new randnum(270,275,dir3*5,dir3*5,15,'white', num3); 
          num_4 = new randnum(290,250,dir4*5,dir4*5,15,'white', num4); 
          answer = num1+num2+num3+num4;
        }
        
        else if (gameLevel >= 3){
          num1 = Math.floor(Math.random() * 10);
          num2 = Math.floor(Math.random() * 10);
          num3 = Math.floor(Math.random() * 10);
          num4 = Math.floor(Math.random() * 10);
          num5 = Math.floor(Math.random() * 10);
          num_1 = new randnum(350,250,dir1*5,dir1*5,15,'white', num1); 
          num_2 = new randnum(300,200,dir2*5,dir2*5,15,'white', num2); 
          num_3 = new randnum(270,275,dir3*5,dir3*5,15,'white', num3); 
          num_4 = new randnum(290,250,dir4*5,dir4*5,15,'white', num4);
          num_5 = new randnum(315,100,dir5*5,dir5*5,15,'white', num5); 
          answer = num1+num2+num3+num4+num5;
        }

      }

      function game_logic()
      {
        if (gameLevel === 0){
          num_1.boundary_check();
          num_1.move();
          num_2.boundary_check();
          num_2.move();
        }

        else if (gameLevel === 1){
          num_1.boundary_check();
          num_1.move();
          num_2.boundary_check();
          num_2.move();
          num_3.boundary_check();
          num_3.move();
        }

        else if (gameLevel === 2){
          num_1.boundary_check();
          num_1.move();
          num_2.boundary_check();
          num_2.move();
          num_3.boundary_check();
          num_3.move();
          num_4.boundary_check();
          num_4.move();
        }

        else if (gameLevel >= 3){
          num_1.boundary_check();
          num_1.move();
          num_2.boundary_check();
          num_2.move();
          num_3.boundary_check();
          num_3.move();
          num_4.boundary_check();
          num_4.move();
          num_5.boundary_check();
          num_5.move();
        }

      }

      // draws the game state to the canvas
      function draw()
      {
        // clear the canvas so that we start off with a blank canvas
        c.clearRect(0,0,canvas.width,canvas.height);
        c.font = "25px serif";
        c.fillStyle = "red";
        c.fillText("Score: " + score, 5, 20);
        if (gameLevel === 0){
          c.font = "30px serif";
          c.fillText(num_1.value, num_1.x, num_1.y);
          c.fillText(num_2.value, num_2.x, num_2.y);
          c.fill();
        }

        if (gameLevel === 1){
          c.fillText(num_1.value, num_1.x, num_1.y);
          c.fillText(num_2.value, num_2.x, num_2.y);
          c.fillText(num_3.value, num_3.x, num_3.y);
          c.fill();
        }

        if (gameLevel === 2){
          c.fillText(num_1.value, num_1.x, num_1.y);
          c.fillText(num_2.value, num_2.x, num_2.y);
          c.fillText(num_3.value, num_3.x, num_3.y);
          c.fillText(num_4.value, num_4.x, num_4.y);
          c.fill();
        }

        if (gameLevel >= 3){
          c.fillText(num_1.value, num_1.x, num_1.y);
          c.fillText(num_2.value, num_2.x, num_2.y);
          c.fillText(num_3.value, num_3.x, num_3.y);
          c.fillText(num_4.value, num_4.x, num_4.y);
          c.fillText(num_5.value, num_5.x, num_5.y);
          c.fill();
        }
        }

        
        document.getElementById("submit").onclick = 
        function()
        {var sum = document.getElementById("sum").value;
        if (sum == answer) {
          document.getElementById("result").innerHTML = "Correct, score + 10";
          gameLevel = gameLevel + 1;
          score = score + 10;
          if (score > historyScore){
              historyScore = score;
          }
          document.getElementById("history").innerHTML = "History Highest Score: " + historyScore;
          generateNumber();
        }
        else{
          document.getElementById("result").innerHTML = "Incorrect, game over, your score is " + score;
          score = 0;
          gameLevel = 0;
          generateNumber();
        }
        
        }

        document.getElementById("save").onclick = 
        function(){
            calcScores();
            document.getElementById("goMenu").click();
        }


        generateNumber();

        setInterval(function() {

        game_logic();
        draw();

      } , 30);
    })


      return(
        <div>
            <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
            <link
                    href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
                    rel="stylesheet"
                ></link>
            <div id="NumberHuntDisplay">
                <h1>Number Hunt</h1>
                    <canvas
                        ref={canvasRef}
                        width="700"
                        height="300"
                    />
                    <br></br>
                    <label>Sum of the moving numbers: </label>
                    <input type="number" id = "sum" name = "sum"></input>
                    <button type = "button" id = "submit">Submit</button>
                    <br></br>
                    <p><span id="result" style = {resultStyle}></span></p>
                    <br></br>
                    <p><span id="history" style = {resultStyle}></span></p>
                    <br></br>
                    <button type = "button" id = "save" className="btn btn-dark">Save and Leave</button>
                    <br></br>
                    <br></br>
                    <Link to={"/menu"} role="button" id="goMenu" className="btn btn-dark">Leave withtout saving</Link> 
            </div>
        </div>
    )

    }

export default NumberHunt;