const size = 300;
const canvas = document.getElementById("myCanvas");
canvas.width = size;
canvas.hieght = size;
var vectors = [];
var context = canvas.getContext("2d");
var x;
var y;

canvas.addEventListener("click", onClickEvent);

function onClickEvent(event){
    coords = adjustCoordinates(event);
    vectors.push(coords);
    //connectCoordinates(event);
    setTimeout(function() { primsMST() }, 10);
}

function connectCoordinates() {
    if (vectors.length > 1) {
        drawLines(coords.x, coords.y);
    }

    drawEllipse(coords.x, coords.y, 'blue');
}

function primsMST(){
    var reached = [];
    var unreached = [...vectors]

    reached.push(unreached[0]);
    unreached.splice(0,1);

    while(unreached.length > 0){
        var record = 100000;
        var rIndex;
        var uIndex;

        for (let i = 0; i < reached.length; i++) {
            for (let j = 0; j < unreached.length; j++) {
                var v1 = reached[i];
                var v2 = unreached[j];
                var dist = distance(v1.x, v1.y, v2.x, v2.y);
                
                if(dist < record){
                    record = dist;
                    rIndex = i;
                    uIndex = j;
                }
            }     
        }
        context.clearRect(0,0,canvas.width,canvas.height)

        context.moveTo(reached[rIndex].x, reached[rIndex].y);
        context.lineTo(unreached[uIndex].x, unreached[uIndex].y);
        context.stroke();

        reached.push(unreached[uIndex]);
        unreached.splice(uIndex,1);
    }
    console.log(reached);

    for (let i = 0; i < vectors.length; i++) {
        drawEllipse(vectors[i].x, vectors[i].y, 'green');
        context.fillStyle = 'black';
        context.font = '18px sans-serif';
        context.fillText(i, vectors[i].x -10, vectors[i].y -10);
    }   
}

function distance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}

function adjustCoordinates(event){
    var rect = canvas.getBoundingClientRect();    
    return {
        'x': event.x - (rect.left * 1.25),
        'y': event.y - (rect.top * 1.25)
    };
}

function drawLines(x, y){
    var prev = vectors[vectors.length -2]
    context.moveTo(prev.x, prev.y);
    context.lineTo(x, y);
    context.stroke();
}

function drawEllipse(x,y, color = 'black'){
    context.beginPath();
    context.fillStyle = color;

    context.ellipse(x, y, 5, 5, Math.PI, 0, 2 * Math.PI);
    context.fill(); 
    context.stroke();
}