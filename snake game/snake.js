const snakeBody = document.getElementsByClassName("snake-body")
const snakeCage = document.getElementById("snake")
let snakePos = [
    {x: 130, y: 100},
    {x: 120, y: 100},
    {x: 110, y: 100},
    {x: 100, y: 100},
]

function deploySnake(){
    for(let i = 0; i < snakeBody.length; i++){
        snakeBody[i].style.left = snakePos[i].x.toString() + "px"
        snakeBody[i].style.top = snakePos[i].y.toString() + "px"
    }
}

deploySnake()

let posX = 130
let posY = 100

let moveX = 10
let moveY = 0

let dir = "right"
let direction = "right"

const food = document.getElementById("food")

let foodX = Math.floor(Math.random() * (35 - 1) + 1) * 10
let foodY = Math.floor(Math.random() * (50 - 1) + 1) * 10

    food.style.left = foodX.toString() + "px"
    food.style.top = foodY.toString() + "px"

setInterval(() => {

    for(let i = 1; i < snakePos.length; i++){
        if(snakePos[0].x === snakePos[i].x && snakePos[0].y === snakePos[i].y){
            location.reload()
        }
    }

    let snakeFoodPos = {x: foodX, y: foodY}
    posX += moveX
    posY += moveY
    snakePos.unshift({x: posX, y: posY})
    
    dir = direction
    
    for(let i = 0; i < snakePos.length; i++){
        if(snakePos[i].x >= 350 && dir === "right"){
            snakePos[i].x = 0
            posX = 0
        }

        if(snakePos[i].x < 0 && dir === "left"){
            snakePos[i].x = 340
            posX = 340
        }

        if(snakePos[i].y < 0 && dir === "up"){
            snakePos[i].y = 490
            posY = 490
        }   

        if(snakePos[i].y >= 500 && dir === "down"){
            snakePos[i].y = 0
            posY = 0
        } 
    }

    deploySnake()
    
    if(snakePos[0].x === snakeFoodPos.x && snakePos[0].y === snakeFoodPos.y){
        const snakeTail = snakePos.slice(snakePos.length -1, snakePos.length - 2)
        snakePos.push(snakeTail)
        foodX = Math.floor(Math.random() * (35 - 1) + 1) * 10
        foodY = Math.floor(Math.random() * (50 - 1) + 1) * 10
        addTails()
        deploySnake()
        score(snakePos.length)
    }
    
    snakePos.pop()
    
    food.style.left = snakeFoodPos.x.toString() + "px"
    food.style.top = snakeFoodPos.y.toString() + "px"
    
}, 100)

document.addEventListener('keydown', function(e){
    if(e.key === "ArrowRight" && dir !== "left"){
        moveX = 10
        moveY = 0
        direction = "right"
    }else if(e.key === "ArrowLeft" && dir !== "right"){
        moveX = -10
        moveY = 0
        direction = "left"
    }else if(e.key === "ArrowDown" && dir !== "up"){
        moveX = 0
        moveY = 10
        direction = "down"
    }else if(e.key === "ArrowUp" && dir !== "down"){
        moveX = 0
        moveY = -10
        direction = "up"
    }
 })
 
function addTails(){
    const snakePart = document.createElement("div")
    snakePart.className = "snake-body"
    
    snakeCage.appendChild(snakePart)
}

const scoreBoard = document.getElementById("score")

function score(n){
    scoreBoard.innerText = "score: " + (n - 5)
}