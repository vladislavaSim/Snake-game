const N = 20;
let $score = document.createElement('div');
let score = 0
$score.innerHTML = score + ''

document.querySelector('.container').appendChild($score)

const snakeClassName = 'black';
const cherryClassName = 'green';

let field = [];

for (let i = 0; i < N; i++) {
    let $row = document.createElement('div');
    $row.classList.add('row');
    let row = [];
    for (let j = 0; j < N; j++) {
        let $cel = document.createElement('div');
        $cel.classList.add('col');
        $row.appendChild($cel);
        row.push($cel);
    }
    field.push(row);
    document.body.appendChild($row);
}

class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    isEqual(another){
        return this._x === another._x && this._y === another.y;
    }

    changeX(x){
        return new Point(x, this._y);
    }

    changeY(y){
        return new Point(this._x, y);
    }
}

let direction = {
    x: 1,
    y: 0
};

let body = [
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),
    new Point(0,0),

];

let cherry = new Point(5,5);

function drawPoint(field, point, className) {
    field[point.y][point.x].classList.add(className);
}

function clearField(...classNames){
    for(let className of classNames){
        let elements = document.querySelectorAll('.' + className);
        for(let element of elements){
            element.classList.remove(className);
        }
    }
}

function makePointGenerator(x,y){
    return function () {
        return new Point(
            Math.round(Math.random() * x),
            Math.round(Math.random() * y),
        )
    }
}

function drawSnake(field, body){
    for (let point of body){
        drawPoint(field, point, snakeClassName);
    }
}

let pointGenerator = makePointGenerator(N - 1, N -1);
drawPoint(field, cherry, cherryClassName);

let interval = setInterval(function () {
    clearField(snakeClassName);

    let head = body[0];
    let newHead = new Point(
        head.x + direction.x,
        head.y + direction.y
    );
    if (newHead.x > N - 1) {
        newHead = newHead.changeX(0);
    }
    if (newHead.x < 0) {
        newHead = newHead.changeX(N - 1);
    }
    if (newHead.y > N - 1) {
        newHead = newHead.changeY(0);
    }
    if (newHead.y < 0) {
        newHead = newHead.changeY(N - 1);
    }

    body.unshift(newHead);

    function checkGameover() { //to make game over if snake hits her own body + to add super cherry every 5 eats which longers snake up to two points
        for(let i = 1; i < body.length; i++) {
            if(newHead.isEqual(body[i])) {
                console.log('+++')
                clearField(snakeClassName, cherryClassName)
                clearInterval(interval)
                $score.innerHTML = 'GAME OVER'
            }
        }
    }

    checkGameover()
    console.log()
    if(newHead.isEqual(cherry)){
        clearField(cherryClassName);
        score++
        $score.innerHTML = String(score)
        document.querySelector('.container').appendChild($score)
        cherry = pointGenerator();
        drawPoint(field,cherry, cherryClassName);
    }else{
        body.pop();
    }
    drawSnake(field,body);
}, 100);

document.addEventListener('keydown', function (e) {
    switch (e.code) {
        case 'ArrowUp':
            direction = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            direction = {x: 0, y: 1};
            break;
        case 'ArrowLeft':
            direction = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            direction = {x: 1, y: 0};
            break;
    }
});
