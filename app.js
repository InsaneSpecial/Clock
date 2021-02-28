var canvas=document.getElementById("canvas")

var context = canvas.getContext("2d")

var radius= canvas.height/2;

context.translate(radius,radius);

radius = radius*0.90;


function drawFace(context, radius){
    var grad;
    context.beginPath();
    context.arc(0,0,radius,0,2*Math.PI)
    context.fillStyle="white"
    context.fill();
    //creating gradient color
    grad= context.createRadialGradient(0,0,radius*95,0,0,radius*1.05)
    grad.addColorStop(0,"grey");
    grad.addColorStop(0.5,"grey");
    grad.addColorStop(1,"black");
    context.strokeStyle=grad;
    context.lineWidth = radius*0.1;
    context.stroke();

    context.beginPath();
    context.arc(0,0,radius*0.1,0,2*Math.PI)
    context.fillStyle="#333"
    context.fill();
}

drawNumber(context,radius)

function drawNumber(context,radius){
    var num , ang;
    context.font=radius*0.15 + "px arial";
    context.textBaseLine="middle"
    context.textAlign="center"
    for(num=1;num<13;num++){
        ang=num*Math.PI/6
        context.rotate(ang);
        context.translate(0,-radius*0.85);
        context.rotate(-ang);
        context.fillText(num.toString(),0,0);
        context.rotate(ang);
        context.translate(0,radius*0.85);
        context.rotate(-ang);
    }
}


function drawTime(context,radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //calculate the angle
    hour=hour%12;
    //hour hand
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60))
    drawHand(context,hour,radius*0.5,radius*0.07)
    
    //minute hand
    minute=(minute*Math.PI/30) + (second*Math.PI/(30*60))
    drawHand(context,minute,radius*0.8,radius*0.07)
    
    //second hand
    second=(second*Math.PI/30)
    drawHand(context,second,radius*0.9,radius*0.02)
    }
function drawHand(context,pos,length,width){
    context.beginPath();
    context.lineWidth=width
    context.lineCap="round"
    context.moveTo(0,0)
    context.rotate(pos)
    context.lineTo(0,-length)
    context.stroke()
    context.rotate(-pos)
}
setInterval(drawClock,1000)

function drawClock(){
drawFace(context,radius);
drawNumber(context,radius)
drawTime(context,radius)
}

