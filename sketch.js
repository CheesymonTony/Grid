
const bod = document.getElementsByClassName('bodyo');


var grid;
var opacitySlider;
var baseNumber = new p5.Vector(1, 1);
var power = 10;
var calculate = true;
var resIn = 20;
var n;
var inGrid = false;
var moveGrid = false;
var clicked = false;



var anchorPoint;


function mousePressed(){
    clicked = true;

}
function mouseReleased(){
    clicked = false;

}

function h1(t) {
    let f1 = 2 * pow(t, 3);
    let f2 = 3 * pow(t, 2);
    return f1 - f2 + 1;
  }

  function h2(t) {
    let f1 = -2 * pow(t, 3);
    let f2 = 3 * pow(t, 2);
    return f1 + f2;
  }

function h3(t) {
    let f1 = pow(t, 3);
    let f2 = 2 * pow(t, 2);
    return f1 - f2 + t;
  }

 function h4(t) {
    let f1 = pow(t, 3);
    let f2 = pow(t, 2);
    return f1 - f2;
  }



// function mouseDragged(){
//     grid.setOrigin(mouseX, mouseY);
    
// }


function setup(){
    createCanvas(700, 700);

    grid = new GridDraw(10, 0, 500, 500, 350, 350);
    grid.setLineWidth(1);
    opacitySlider = createSlider(0, 100, 10, 0.10);
    opacitySlider.position(120,130);

    grid.setText(false, 8);
    n = createVector(baseNumber.x, baseNumber.y);


    anchorPoint = createVector(width * .5, height * .925);
}

function draw(){
    background(100);
    if (mouseX < grid.rightEdge && mouseX > grid.leftEdge && mouseY > grid.topEdge && mouseY < grid.botEdge){
        inGrid = true;
        document.body.classList.add('stop-scroll');
    } else {
        inGrid = false;
        document.body.classList.remove('stop-scroll');

    }

    grid.clickDragGrid(clicked);

    let outputPoints1 = [];
    let outputPoints2 = [];

    let opacVal = opacitySlider.value();
    grid.setResolution(resIn);
    grid.setGridOpacity(opacVal);


    ellipse(anchorPoint.x, anchorPoint.y, 10);


    for (let i = 0; i < 10; i++){
        let distance = 300;
        ellipse(i*30+anchorPoint.x, anchorPoint.y, 5);
    }



    grid.show();
    let inc = 1/ power;
    let index = 0;
    if (calculate){
        for (let i = 0; i <= power; i++){
            // let num1 =2*pow(index, 3);
            // let num2 =3*pow(index, 2);
            // let num3 = num1 - num2 + 1;
            // let num4 = 6*pow(index,2);
            // let num5 = 6*index;
            // let num6 = num4 - num5;

            let num1 = 2*pow(index, 3);
            let num2 = pow(index, 2);
            let num3 = num1 - num2 + 1;
            let num4 = 6 * pow(index,2);
            let num5 = 2*index;
            let num6 = num4 - num5;

            outputPoints1.push(createVector(index*10, num3));
            outputPoints2.push(createVector(index*10, num6));

            index += inc;
        }
    }

    for (let i = 0; i < outputPoints1.length; i++){
        grid.setPoint(outputPoints1[i].x, outputPoints1[i].y*10, 0,0,255);
        grid.setPoint(outputPoints2[i].x, outputPoints2[i].y, 255,0,255);
    }
}

window.addEventListener("wheel", function(e) {
    if(inGrid){
        if (e.deltaY > 0){
            resIn *= 1.05;}
        else {
            resIn *= .95;
        }
    }
    
  });

  