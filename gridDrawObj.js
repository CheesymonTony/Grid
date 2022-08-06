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
        this.plottedPoints = [];
       
        
        


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

    setOrigin(x, y){

        if (y < this.topEdge){
            this.gridOriginY = this.topEdge;
        } else if (y > this.botEdge){
            this.gridOriginY = this.botEdge;
        }else {
        this.gridOriginY = y;
        }
        if (x < this.leftEdge){
            this.gridOriginX = this.leftEdge;
        } else if (x > this.rightEdge){
            this.gridOriginX = this.rightEdge;
        } else {
            this.gridOriginX = x;
        }
        
    }


    setText(txt, txtSize){
        this.pointText = txt;
        this.textSize = txtSize;
    }

    setResolution(res){
        this.resolution = res;
        this.spacingX = this.width/this.resolution;
        this.spacingY = this.height/this.resolution;
        this.pointSize = map(this.resolution, 1, 100, 4, .6);


    }

    setGridOpacity(opacity){
        this.gridOpacity = 2.55 * opacity;
    }

    setLineWidth(lineW){
        this.lineW = lineW;
    }

    setPoint(x, y, r,g,b,a){

        //set the spacing and the position of the incoming points to be relative to the resolution and the grid origin position
        let newX = (x * this.spacingX) +this.gridOriginX ;
        let newY = (y * this.spacingY) - this.gridOriginY;

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


        

        stroke(0,0,255);
        strokeWeight(2);
        line(this.gridOriginX, this.gridOriginY, this.gridOriginX, this.topEdge);
        line(this.gridOriginX, this.gridOriginY, this.gridOriginX, this.botEdge);

        stroke(255,0,0);
        strokeWeight(2);
        line(this.gridOriginX, this.gridOriginY, this.rightEdge, this.gridOriginY);
        line(this.leftEdge, this.gridOriginY, this.gridOriginX, this.gridOriginY);

        let rightGridLines = floor((this.rightEdge - this.gridOriginX) / this.spacingX);
        let leftGridLines = floor((this.gridOriginX - this.leftEdge) / this.spacingX);
        let topGridLines = floor((this.gridOriginY - this.topEdge) / this.spacingY);
        let botGridLines = floor((this.botEdge - this.gridOriginY) / this.spacingY);

        for (let i = 1; i <= rightGridLines; i++){
            let xSpace = i * this.spacingX;
            strokeWeight(1);
            stroke(0,0,0,this.gridOpacity);
            line(this.gridOriginX + xSpace, this.topEdge, this.gridOriginX + xSpace, this.botEdge);
        }
        
        for (let i = 1; i <= leftGridLines; i++){
            let xSpace = i * this.spacingX;
            strokeWeight(1);
            stroke(0,0,0,this.gridOpacity);
            line(this.gridOriginX - xSpace, this.topEdge, this.gridOriginX - xSpace, this.botEdge);
        }

        for (let i = 1; i <= topGridLines; i++){
            let ySpace = i * this.spacingY;
            strokeWeight(1);
            stroke(0,0,0,this.gridOpacity);
            line(this.leftEdge, this.gridOriginY - ySpace, this.rightEdge, this.gridOriginY - ySpace);
        }

        for (let i = 1; i <= botGridLines; i++){
            let ySpace = i * this.spacingY;
            strokeWeight(1);
            stroke(0,0,0,this.gridOpacity);
            line(this.leftEdge, this.gridOriginY + ySpace, this.rightEdge, this.gridOriginY + ySpace);
        }
        // push();

        // noStroke();
        // fill(r,g,b,a);
        // for (let points of this.plottedPoints){
           
        // }
        // pop();




        // for (let i = 0; i <= this.resolution/2; i++){
        //     let x = this.spacingX*i;
        //     let y = this.spacingY*i;
        //     //layout X gridlines\\
            
            
            
        //     stroke(0,0,0,this.gridOpacity);
        //     if (i == 0){
        //         push();
        //         stroke(255,0,0, 255);
        //         line(this.originX + x, this.originY - this.height/2, this.originX + x, this.originY + this.height/2);
        //         stroke(0,0,255, 255);
        //         line(this.originX - this.width/2, this.originY + y , this.originX + this.width/2, this.originY + y);
        //         pop();
        //     } else {
        //         line(this.originX + x, this.originY - this.height/2, this.originX + x, this.originY + this.height/2);
                
        //         line(this.originX- x, this.originY - this.height/2, this.originX - x, this.originY + this.height/2);
        //         line(this.originX - this.width/2, this.originY + y , this.originX + this.width/2, this.originY + y);
        //         line(this.originX - this.width/2, this.originY - y , this.originX + this.width/2, this.originY - y);
               
        //         //layout tick marks\\
        //         push();
        //         stroke(0,0,0,255);
        //         line(this.originX + x, this.originY - this.tickLen, this.originX + x, this.originY + this.tickLen);
        //         line(this.originX - x, this.originY - this.tickLen, this.originX - x, this.originY + this.tickLen);
        //         line(this.originX - this.tickLen, this.originY + y, this.originX + this.tickLen, this.originY + y);
        //         line(this.originX - this.tickLen, this.originY - y, this.originX + this.tickLen, this.originY - y);
                
        //         pop();
        //         push();
        //         fill(0);
        //         noStroke();
        //         textSize(6);
        //         text(i, this.originX + x -5, this.originY + this.tickLen*3);
        //         text(-i, this.originX - x, this.originY + this.tickLen*3);
        //         text(i, this.originX - this.tickLen*3, this.originY - y+7);
        //         text(-i, this.originX - this.tickLen*3, this.originY + y-2);

        //         pop();

        //     }
            
        //     // line(this.originX- x, this.originY - this.height/2, this.originX - x, this.originY + this.height/2);

        //     // line(0, y, this.width, y);
        //     // line(0, y, this.width, y);
        //     // line(0, y, this.width, y);
        // }

        if (this.origin == 'CENTER'){
            //Layout Grid\\
            translate(this.originX, this.originY);
            rectMode(CENTER);
            push();
            noStroke();
            rect(this.width/2, this.height/2, this.width, this.height)
            pop();
            let spacingY = this.height / this.resolution;
            let spacingX = this.width / this.resolution;
            for (let i = 0; i <= this.resolution; i++){
                let y = spacingY*i;
                let x = spacingX*i;
                stroke(55, 55, 55, 25);
                push();
                strokeWeight(this.lineW);
                line(0, y, this.width, y);
                line(x, 0, x, this.height);
                line()
                pop();
            }

            //Layout Origin Lines\\
            push();
            stroke(255,0,0);
            strokeWeight(1);
            line(0, this.height/2, this.width, this.height/2);
            pop();

            push();
            stroke(0,0,255);
            strokeWeight(1);
            line(this.width/2, 0, this.width/2, this.height);
            pop();

            //Layout tick marks\\
            let tickX = this.height / this.resolution;
            let tickY = this.width / this.resolution;
            let tickLen = 3;
            
            for (let i = 0; i <= this.resolution; i++){
                let x = tickX*i;
                let y = tickY*i;
                stroke(0,0,0, 255);
                push();
                strokeWeight(1);
                if (i != this.resolution/2){
                    line(x, this.height/2-tickLen, x, this.height/2+tickLen);
                    line(this.width/2-tickLen, y, this.width/2+tickLen, y);
                }
                
                line()
                pop();

            }
        }
        
    }

}