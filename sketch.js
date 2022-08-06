
var grid;
var opacitySlider;
var resSlider;
var baseNumber = new p5.Vector(1, 1);
var power = 10;
calculate = true;
let outputPoints1 = [];
let outputPoints2 = [];
let outputPoints4 = [];
let outputPoints5 = [];
let numbaz = [];
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

// function mouseIsPressed(){
//     grid.setOrigin(mouseX, mouseY);
// }

function mouseDragged(){
    grid.setOrigin(mouseX, mouseY);

}


function setup(){
    createCanvas(700, 700);

    grid = new GridDraw(10, 0, 500, 500, 350, 350);
    grid.setLineWidth(1);
    opacitySlider = createSlider(0, 100, 10, 0.10);
    opacitySlider.position(120,130);

    resSlider = createSlider(0, 100, 10, 1);
    resSlider.position(120,150);
    grid.setText(false, 6);
    n = createVector(baseNumber.x, baseNumber.y);
}

// function mousePressed(){
//     console.log('basenumber was: ' + baseNumber)
//     console.log('n was: ' + n)
//     baseNumber.mult(n);
//     outputPoints.push(createVector(baseNumber.x, baseNumber.y));
//     console.log('basenumber is now: ' + baseNumber)
//     console.log('n is now: ' + n);

// }    

function draw(){
    let outputPoints3 = [];
    let outputPoints6 = [];
    

    background(100);
    let opacVal = opacitySlider.value();
    let resVal = resSlider.value();
    

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

            
            
            // outputPoints1.push(createVector(index*10, num1*10));
            // outputPoints2.push(createVector(index*10, num2*10));
            outputPoints3.push(createVector(index*10, num3));
            // outputPoints4.push(createVector(index*10, num4*10));
            // outputPoints5.push(createVector(index*10, num5*10));
            outputPoints6.push(createVector(index*10, num6));

            



            // let numX = num1*baseNumber.x;
            // let numY = num1*baseNumber.y;


            // text(n, n.x, n.y);
            // if (i == power - 2){
            //     calculate = false;
            // }
            index += inc;
        }
    }

    // for (let points of outputPoints1){
    //     grid.setPoint(points.x, points.y, 255,0,0);
    // }

    // for (let points of outputPoints2){
    //     grid.setPoint(points.x, points.y, 0,255,0);
    // }

    for (let i = 0; i < outputPoints3.length; i++){
        grid.setPoint(outputPoints3[i].x, outputPoints3[i].y*10, 0,0,255);
        // outputPoints6[i].normalize();
        grid.setPoint(outputPoints3[i].x, outputPoints6[i].y, 255,0,255);
        numbaz.push([round(outputPoints3[i].y,5), round(outputPoints6[i].y,5)]);

    }
    
    // for (let points of outputPoints6){
    //     grid.setPoint(points.x, points.y, 255,0,255);
    // }
    // if (frameCount == 1){
    //     console.table(numbaz);

    // }
    

}

window.addEventListener("wheel", function(e) {
    if (e.deltaY > 0){
        resIn *= 1.05;}
    else {
        resIn *= .95;
    }


  });