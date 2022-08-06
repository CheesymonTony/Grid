
var grid;
var opacitySlider;
var baseNumber = new p5.Vector(1, 1);
var power = 10;
var calculate = true;
var resIn = 20;
var n;


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

function mouseDragged(){
    grid.setOrigin(mouseX, mouseY);
}


function setup(){
    createCanvas(700, 700);

    grid = new GridDraw(10, 0, 500, 500, 350, 350);
    grid.setLineWidth(1);
    opacitySlider = createSlider(0, 100, 10, 0.10);
    opacitySlider.position(120,130);

    grid.setText(false, 6);
    n = createVector(baseNumber.x, baseNumber.y);
}

function draw(){
    background(100);

    let outputPoints1 = [];
    let outputPoints2 = [];

    let opacVal = opacitySlider.value();
    grid.setResolution(resIn);
    grid.setGridOpacity(opacVal);

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

            let num1 = pow(index, 3);
            let num2 = pow(index, 2);
            let num3 = num1 - num2 + 1;
            let num4 = 3 * pow(index,2);
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
    if (e.deltaY > 0){
        resIn *= 1.05;}
    else {
        resIn *= .95;
    }
  });
  console.log(require('./config'))