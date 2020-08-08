import Matter, { Runner } from 'matter-js'
import "core-js/stable";
import "regenerator-runtime/runtime";

//Intial score ==0
let score=0

var start=document.querySelector('.start')
start.addEventListener('click',StartGame)
var gamescore=document.createElement('div')

//Calculat the Score 
function Score(score)
{
  gamescore.className = 'score';
  gamescore.innerHTML = "Your Score is "+score
  document.getElementById('score').appendChild(gamescore);
}

//The main Jump Game function
function StartGame()
{
  start.remove()
  var playagain=document.querySelector('.playagain')
  if(playagain!==null){
    playagain.remove()
  }
  
var Engine = Matter.Engine,
        Render = Matter.Render,
        Composite = Matter.Composite,
        Constraint = Matter.Constraint,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Body=Matter.Body,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Vertices = Matter.Vertices,
        Bodies = Matter.Bodies;
var boxes=[]
var engine = Engine.create(document.getElementById('game'), {
    render: {
        fillStyle: 'blue',
        options: {
            width: 800,
            height: 400,
            wireframes: false   
          }
    }
}
  );
  // BackGround Color of Canvas 
  engine.render.options.background='#87CEEB'

var obs2 = Bodies.rectangle(400, 50, 20,200 , { isStatic: true , restitution: 0.9 , render:{ fillStyle: '#1919FF'}});
//Candle for Both 1 and 2
/*
|
|
|
0
*/
var cradle1 = Composites.newtonsCradle(500, 0, 1, 20,100,{render:{sprite: {
  texture: "./img/image.png",
  xScale: 0.01,
  yScale: 0.01
}
}});
World.add(engine.world, cradle1);
Body.translate(cradle1.bodies[0], { x: -180, y: -100 });

var cradle2 = Composites.newtonsCradle(200, 0, 1, 20,100,
  {render:{sprite: {
  texture: "./img/image.png",
  xScale: 0.01,
  yScale: 0.01
}
}});
World.add(engine.world, cradle2);
Body.translate(cradle2.bodies[0], { x: -180, y: -100 });


//Creating  Steps of the Game

var bottomWall1 = Bodies.rectangle(10,200,300, 20, { isStatic: true ,render:{sprite: {
  texture: "./img/choco.png",
  xScale: 0.45,
  yScale: 0.08
}
}});
var bottomWall2 = Bodies.rectangle(270,250,150,20, { isStatic: true ,render:{sprite: {
  texture: "./img/choco.png",
  xScale: 0.25,
  yScale: 0.08
}
}});
var bottomWall3 = Bodies.rectangle(470,300,130  , 20, { isStatic: true ,render:
  {sprite: {
    texture: "./img/choco.png",
    xScale: 0.25,
    yScale: 0.08
  }
  }});
var bottomWall4 = Bodies.rectangle(650, 350, 100,20 , { isStatic: true ,render:
  {sprite: {
    texture: "./img/choco.png",
    xScale: 0.25,
    yScale: 0.08
  }
  }});

  //Creating the wall for the Game
var topWall = Bodies.rectangle(400, 0, 810, 30, { isStatic: true ,render:{fillStyle:'#87CEEB'}});
var leftWall = Bodies.rectangle(0, 200, 30, 420, { isStatic: true ,render:{fillStyle:'#87CEEB'}});
var rightWall = Bodies.rectangle(800, 200, 30,400 , { isStatic: true,render:{fillStyle:'#87CEEB'} });
var obs1 = Bodies.polygon(200, 100,10,30 , { isStatic: true,render: { fillStyle: '#1919FF'}  });


//Creating the Kangaroo Object
var ball =Bodies.rectangle(60, 20, 30,30,{
    friction:0.1,
    frictionAir:0.5,
    render: {
          sprite: {
            texture: "./img/kang.png",
            xScale: 0.1,
            yScale: 0.1
          }
        }
      });

//Creating the Finish Line Object
var finish =Bodies.rectangle(756, 370, 30,30,{
        friction:0.1,
        frictionAir:0.5,isStatic:true,
        render: {
              sprite: {
                texture: "./img/finish.png",
                xScale: 0.1,
                yScale: 0.1
              }
            }
          });


//Creating the moving Object Polygon

var hexagon=Bodies.polygon(350,80, 6, 80, {
    isStatic: true,
    inertia: Infinity,
    currentRotation: 0,
    rotationSpeed: 1
    ,render:{fillStyle:'#e3be17'}}); 

function updateRotation() 
{
    hexagon.currentRotation += 1*hexagon.rotationSpeed;
    Body.setAngle(hexagon, hexagon.currentRotation);
    requestAnimationFrame(updateRotation);
}
window.requestAnimationFrame(updateRotation);



//Adding everything to world
World.add(engine.world, [bottomWall1,bottomWall2,ball,bottomWall3, topWall,leftWall,finish,bottomWall4,rightWall,hexagon,ball]);




//Check for end GAME if the Kangaroo Object fall
function gameend()
{
if(ball.position.x>100 && ball.position.x<180 &&ball.position.y<240 || ball.position.x>310 && ball.position.x<360 &&ball.position.y<200 )
{
    console.log('endgame')
}
}

//Main fucntion for click event to update score & change the position of the object
window.addEventListener('load',ball, false);
document.body.addEventListener('click', function () {
    Body.setVelocity( ball, {x: 40, y: -40}); 
    gameend()
    score+=1
    Score(score)
    won(ball.position.x)
    
},true);

//Finally run the Engine
Engine.run(engine)
}

//Check the object reaches end or not
function won(x)
{
  if(x>640)
  {
    var g=document.getElementById('game')
    if(g!==null)
    {g.remove()}
    
    const div = document.createElement('div')
    div.className = 'row';
    div.innerHTML = `<h1 class="last">Hurry You  Completed!!!!</h1></br></br></br>
    <img  src="./img/winner.svg" alt="Kiwi standing on oval"></br>
    </br>
    </br>
    <h1 class="last">Play Again</h1>
    <button class="playagain"><img  src="./img/interface.svg" alt="Kiwi standing on oval"></button>`;
    document.getElementById('content').appendChild(div);
    
  }
  
}

  var playagain=document.querySelector('.playagain')
  


