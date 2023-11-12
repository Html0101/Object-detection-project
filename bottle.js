status = "";
objects = [];

function preload() 
{ 
    img = loadImage("Bottle.jpg");
}

function setup()  
{ 
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() 
{ 
    if(status != "") 
    { 
        for(i = 0; i < objects.length; i++) 
        { 
            document.getElementById("status").innerHTML ="Status : Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            theLength = objects.length;
            document.getElementById("object").innerHTML = "There are 2 big objects in the image but cocossd has detected "+ theLength;
        }
    }
}

function modelLoaded() 
{ 
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) 
{ 
    if (error) 
    { 
        console.log(error);
    }
    console.log(results);
    objects = results;
}