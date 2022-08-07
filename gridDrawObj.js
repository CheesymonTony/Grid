class GridDraw {
    constructor(resolution, origin, w, h, Ox, Oy){
        this.resolution = resolution;
        this.origin = origin;
        this.width = w;
        this.height = h;
        this.lineW = 2;
        this.originX = Ox;
        this.originY = Oy;
        this.gridOriginX = Ox;
        this.gridOriginY = Oy;
        this.gridOpacity = 100;
        this.tickLen = 3;
        this.spacingX = this.width/this.resolution;
        this.spacingY = this.height/this.resolution;
        this.plottedPoints;
        this.offsetCapture = false;
       
        
        


        //Grid Point Details\\
        this.pointText = false;
        this.textSize = 5;
        this.pointSize = map(this.resolution, 0, 100, .2, 3);

        //Define the edges of the grid Canvas\\
        this.rightEdge = this.originX + this.width/2;
        this.leftEdge = this.originX - this.width/2;
        this.topEdge = this.originY - this.height/2;
        this.botEdge = this.originY + this.height/2;


    }

    xIsInBounds(x){
        return (x > this.leftEdge && x < this.rightEdge);
    }

    yIsInBounds(y){
        return (y > this.topEdge && y < this.botEdge);
    }

    clickDragGrid(clicked){
        


        
        if (clicked){
            let x = mouseX;
            let y = mouseY;
            if(!this.offsetCapture){
                this.offsetX = this.gridOriginX - x;
                this.offsetY = this.gridOriginY - y;
                this.offsetCapture = true;
            } else {
                this.gridOriginY = y + this.offsetY;
                this.gridOriginX = x + this.offsetX;
            } 
        } else {
            this.offsetCapture = false;
        }


            
            
            // if (y < this.topEdge){
            //     this.gridOriginY = this.topEdge;
            // } else if (y > this.botEdge){
            //     this.gridOriginY = this.botEdge;
            // }else {
            // this.gridOriginY = y;
            // }
            // if (x < this.leftEdge){
            //     this.gridOriginX = this.leftEdge;
            // } else if (x > this.rightEdge){
            //     this.gridOriginX = this.rightEdge;
            // } else {
            //     this.gridOriginX = x;
            // }
            
        

    }


    setOrigin(x, y){
        let offsetX = this.gridOriginX - x;
        let offsetY = this.gridOriginY - y;
        if (y < this.topEdge){
            this.gridOriginY = this.topEdge;
        } else if (y > this.botEdge){
            this.gridOriginY = this.botEdge;
        }else {
        this.gridOriginY = -offsetY;
        }
        if (x < this.leftEdge){
            this.gridOriginX = this.leftEdge;
        } else if (x > this.rightEdge){
            this.gridOriginX = this.rightEdge;
        } else {
            this.gridOriginX = offsetX;
        }
        
    }

    setTickPos(){

    }

    setText(txt, txtSize){
        this.pointText = txt;
        this.textSize = txtSize;
    }

    setResolution(res){
        this.resolution = res;
        this.spacingX = this.width/this.resolution;
        this.spacingY = this.height/this.resolution;
        this.pointSize = map(this.resolution, 1, 500, 4, .6);


    }

    setGridOpacity(opacity){
        this.gridOpacity = 2.55 * opacity;
    }

    setLineWidth(lineW){
        this.lineW = lineW;
    }

    setPoint2(points){
        
    }


    setPoint(x, y, r,g,b,a){
        this.plottedPoints = [];
        //set the spacing and the position of the incoming points to be relative to the resolution and the grid origin position
        let newX = (x * this.spacingX) +this.gridOriginX ;
        let newY = (y * this.spacingY) - this.gridOriginY;


        this.plottedPoints = []
        noStroke();
        fill(r,g,b,a);
        if (newX < this.rightEdge && newX > this.leftEdge && -newY > this.topEdge && -newY < this.botEdge){
            ellipse(newX, -newY, this.pointSize);
        }
        if (this.pointText){
            let textX = round(x, 3);
            let textY = round(y, 3);
            textSize(this.textSize);
            text(textX + ', ' + textY, newX+5, -newY);
        }
    }



    show(){
        // console.log(this.tester)

        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        rect(this.originX, this.originY, this.width, this.height);
        pop();


        

        //check if origin line is in the bounds of the frame, and if so, draw the respective origin line\\

        //Y origin line\\
        if (this.xIsInBounds(this.gridOriginX)){
            let yLoc = this.gridOriginX;
            if (!this.xIsInBounds(this.gridOriginX)){
                if (this.gridOriginX > this.top){
                    yLoc = this.botEdge;
                } else {
                    yLoc = this.topEdge;
                }
            } 
            stroke(0,0,255);
            strokeWeight(2);
            line(this.gridOriginX, yLoc, this.gridOriginX, this.topEdge);
            line(this.gridOriginX, yLoc, this.gridOriginX, this.botEdge);
        }
        //X origin line\\
        if (this.yIsInBounds(this.gridOriginY)){
            let xLoc = this.gridOriginX;
            if (!this.xIsInBounds(this.gridOriginX)){
                if (this.gridOriginX > this.leftEdge){
                    xLoc = this.rightEdge;
                } else {
                    xLoc = this.leftEdge;
                }
            }   
            stroke(255,0,0);
            strokeWeight(2);
            line(xLoc, this.gridOriginY, this.rightEdge, this.gridOriginY);
            line(this.leftEdge, this.gridOriginY, xLoc, this.gridOriginY);

            
        }
            


        //Calculate the amounts of lines to each side of the origin lines\\
        //Pos X Lines\\
        let rightGridLines = floor((this.rightEdge - this.gridOriginX) / this.spacingX);
        //Neg X Lines\\
        let leftGridLines = floor((this.gridOriginX - this.leftEdge) / this.spacingX);
        //Pos Y Lines\\
        let topGridLines = floor((this.gridOriginY - this.topEdge) / this.spacingY);
        //Neg Y Lines
        let botGridLines = floor((this.botEdge - this.gridOriginY) / this.spacingY);

        //Draw Pos X Lines\\
        for (let i = 1; i <= rightGridLines; i++){
            let xSpace = i * this.spacingX;
            if (this.xIsInBounds(this.gridOriginX + xSpace)){
                strokeWeight(1);
                stroke(0,0,0,this.gridOpacity);
                line(this.gridOriginX + xSpace, this.topEdge, this.gridOriginX + xSpace, this.botEdge);
                strokeWeight(1);
                stroke(0,0,0,255);
                if (this.yIsInBounds(this.gridOriginY)){
                    line(this.gridOriginX + xSpace, this.gridOriginY - this.tickLen, this.gridOriginX + xSpace, this.gridOriginY + this.tickLen);
                    fill(0);
                    noStroke();
                    textSize(this.textSize);
                    textAlign(CENTER, CENTER);
                    text(i, this.gridOriginX + xSpace, this.gridOriginY + this.tickLen+5);
                }
            }
            
        }
        //Draw Neg X Lines\\
        for (let i = 1; i <= leftGridLines; i++){
            let xSpace = i * this.spacingX;
            if (this.xIsInBounds(this.gridOriginX - xSpace)){
                strokeWeight(1);
                stroke(0,0,0,this.gridOpacity);
                line(this.gridOriginX - xSpace, this.topEdge, this.gridOriginX - xSpace, this.botEdge);
                strokeWeight(1);
                stroke(0,0,0,255);
                if (this.yIsInBounds(this.gridOriginY)){
                    line(this.gridOriginX - xSpace, this.gridOriginY - this.tickLen, this.gridOriginX - xSpace, this.gridOriginY + this.tickLen);
                    fill(0);
                    noStroke();
                    textSize(this.textSize);
                    textAlign(CENTER, CENTER);
                    text(-i, this.gridOriginX - xSpace, this.gridOriginY + this.tickLen+5);
                }
            }
            
        }
        //Draw Pos Y Lines\\
        for (let i = 1; i <= topGridLines; i++){
            let ySpace = i * this.spacingY;
            if (this.yIsInBounds(this.gridOriginY - ySpace)){
                strokeWeight(1);
                stroke(0,0,0,this.gridOpacity);
                line(this.leftEdge, this.gridOriginY - ySpace, this.rightEdge, this.gridOriginY - ySpace);
                strokeWeight(1);
                stroke(0,0,0,255);
                if (this.xIsInBounds(this.gridOriginX)){
                    line(this.gridOriginX - this.tickLen, this.gridOriginY - ySpace, this.gridOriginX + this.tickLen, this.gridOriginY - ySpace);
                    fill(0);
                    noStroke();
                    textSize(this.textSize);
                    textAlign(CENTER, CENTER);
                    text(i, this.gridOriginX - this.tickLen*3, this.gridOriginY - ySpace);
                }
                
            }
            
        }
        //Draw Neg Y Lines\\
        for (let i = 1; i <= botGridLines; i++){
            let ySpace = i * this.spacingY;
            if (this.yIsInBounds(this.gridOriginY + ySpace)){
                strokeWeight(1);
                stroke(0,0,0,this.gridOpacity);
                line(this.leftEdge, this.gridOriginY + ySpace, this.rightEdge, this.gridOriginY + ySpace);
                strokeWeight(1);
                stroke(0,0,0,255);
                if (this.xIsInBounds(this.gridOriginX)){
                    line(this.gridOriginX - this.tickLen, this.gridOriginY + ySpace, this.gridOriginX + this.tickLen, this.gridOriginY + ySpace);
                    fill(0);
                    noStroke();
                    textSize(this.textSize);
                    textAlign(CENTER, CENTER);
                    text(-i, this.gridOriginX - this.tickLen*3, this.gridOriginY + ySpace);
                }
            }   
        }

        push();
        noFill();
        stroke(100);
        strokeWeight(10);
        rectMode(CENTER);
        rect(this.originX, this.originY, this.width+3, this.height+3);
        pop();
        
    }
}