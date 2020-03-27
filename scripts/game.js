var world = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
             [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
             [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
             [1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
             [0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
             [1, 0, 0, 1, 0, 2, 1, 0, 0, 1],
             [1, 1, 0, 1, 1, 1, 1, 0, 0, 1],
             [1, 0, 0, 0, 2, 1, 0, 0, 0, 1],
             [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
             [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

var output = "";
var wall = "<div class='wall'></div>";
var open = "<div class='open'></div>";
var rupee = "<div class='rupee'></div>";
var gameDiv = document.getElementById("game");
var heroDiv = document.getElementById("hero");
var hero = {
    x: 1,
    y: 1
};
var rupeeSound = new Audio("assets/rupee.mp3");

function render() {
    output = "";
    
    for(var i=0; i<world.length; i++) {
      for(var j=0; j<world[i].length; j++){
        if(world[i][j] == 1) {
          output += wall;
        } else if (world[i][j] == 2){
          output += rupee;
        }else{
          output += open;
        }
      }  
    }

    gameDiv.innerHTML = output;
}

render();


document.onkeydown = function(event) {

    var prevHeroPos = {...hero};
    switch( event.key ){
        case("ArrowUp"):
            hero.y--;
            break;
        case("ArrowDown"):
            hero.y++;
            break;
        case("ArrowLeft"):
            hero.x--;
            break;
        case("ArrowRight"):
            hero.x++;
            break;
        default:
            console.log("something else!");
    }
    
    // am I about to walk into a wall?
    if(world[hero.y][hero.x] === 1) {
        // if yes don't do that
        hero = prevHeroPos; 
    } else if(world[hero.y][hero.x] === 2){
        world[hero.y][hero.x] = 0;
        render();
        rupeeSound.play();
    } else if(world[hero.y][hero.x] === undefined) {
        console.log(hero);
        if(hero.x < 0) {
            // magic number... this is the right side wall
            hero.x = 9;
        } else {
            hero.x = 0;
        }
    }

    heroDiv.style.top = 32*hero.y + "px";
    heroDiv.style.left = 32*hero.x + "px";

}