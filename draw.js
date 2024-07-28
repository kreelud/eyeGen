function drawSkyBackground(ctx, eyeRadius) {
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(0, 0, eyeRadius * 4, eyeRadius * 4);
}

function drawWhiteCircle(ctx, eyeRadius) {
    ctx.beginPath();
    ctx.arc(eyeRadius * 2, eyeRadius * 2, eyeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
}

function drawIris(ctx, eyeRadius, irisRadius) {
    ctx.beginPath();
    ctx.arc(eyeRadius * 2, eyeRadius * 2, irisRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
}
function drawTopIris(ctx, eyeRadius, irisRadius)
{
    ctx.beginPath();
	ctx.arc(eyeRadius * 2, eyeRadius * 3, irisRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
}

function drawColoredCircle(ctx, x, z, radius, color) {
    ctx.beginPath();
    ctx.arc(x, z, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawEyelidLine(ctx, ic, oc, eyeRadius, eyelidPlane, eyelidCircle, ic2D, oc2D, view="front", color=true)
{
    if (view === 'top')
    {
        ctx.strokeStyle = 'black';
        var lastY = 0;
        var lastPoint = [0, 0, 0];
        
        var tangentAngleA = eyelidPlane.circleTangent(
            eyelidCircle.center[0], eyelidCircle.center[1], eyelidCircle.radius, ic2D[0], ic2D[1], false
        );
        var tangentA = [
            eyelidCircle.center[0] + eyelidCircle.radius * Math.cos(tangentAngleA),
            eyelidCircle.center[1] + eyelidCircle.radius * Math.sin(tangentAngleA)
        ];
        var tangentA3D = eyelidPlane.to3D(tangentA);
        
        ctx.beginPath();
        ctx.moveTo(ic.x + eyeRadius * 2, ic.y + eyeRadius * 2);
        ctx.lineTo(tangentA3D[0] + eyeRadius * 2, tangentA3D[1] + eyeRadius * 2);
        ctx.stroke();
        
        var tangentAngleB = eyelidPlane.circleTangent(
            eyelidCircle.center[0], eyelidCircle.center[1], eyelidCircle.radius, oc2D[0], oc2D[1], true
        );
        var tangentB = [
            eyelidCircle.center[0] + eyelidCircle.radius * Math.cos(tangentAngleB),
            eyelidCircle.center[1] + eyelidCircle.radius * Math.sin(tangentAngleB)
        ];
        var tangentB3D = eyelidPlane.to3D(tangentB);
        
        ctx.beginPath();
        ctx.moveTo(oc.x + eyeRadius * 2, oc.y + eyeRadius * 2);
        ctx.lineTo(tangentB3D[0] + eyeRadius * 2, tangentB3D[1] + eyeRadius * 2);
        ctx.stroke();
        
        for (var c1 = 0; c1 <= 100; c1++)
        {
            var angle = (tangentAngleB - tangentAngleA) * (c1 / 100) + tangentAngleA;
            var x = Math.cos(angle) * eyelidCircle.radius + eyelidCircle.center[0];
            var y = Math.sin(angle) * eyelidCircle.radius + eyelidCircle.center[1];
            var coords = eyelidPlane.to3D([x, y]);
            coords = vectorAdd(coords, [eyeRadius * 2, eyeRadius * 2, eyeRadius * 2]);
            
            if (c1 > 0)
            {
				if (!color)
				{
					ctx.strokeStyle = 'black';
				}
                else if (coords[1] < lastY)
                {
                    ctx.strokeStyle = 'red';
                }
                else
                {
                    ctx.strokeStyle = 'blue';
                }
                ctx.beginPath();
                ctx.moveTo(lastPoint[0], lastPoint[1]);
                ctx.lineTo(coords[0], coords[1]);
                ctx.stroke();
            }
            lastY = coords[1];
            lastPoint = coords;
        }
        ctx.stroke();
    }
    else if (view === 'front')
    {
        ctx.strokeStyle = 'black';
        var lastY = 0;
        var lastPoint = [0, 0, 0];
        
        var tangentAngleA = eyelidPlane.circleTangent(
            eyelidCircle.center[0], eyelidCircle.center[1], eyelidCircle.radius, ic2D[0], ic2D[1], false
        );
        var tangentA = [
            eyelidCircle.center[0] + eyelidCircle.radius * Math.cos(tangentAngleA),
            eyelidCircle.center[1] + eyelidCircle.radius * Math.sin(tangentAngleA)
        ];
        var tangentA3D = eyelidPlane.to3D(tangentA);
        
        ctx.beginPath();
        ctx.moveTo(ic.x + eyeRadius * 2, ic.z + eyeRadius * 2);
        ctx.lineTo(tangentA3D[0] + eyeRadius * 2, tangentA3D[2] + eyeRadius * 2);
        ctx.stroke();
        
        var tangentAngleB = eyelidPlane.circleTangent(
            eyelidCircle.center[0], eyelidCircle.center[1], eyelidCircle.radius, oc2D[0], oc2D[1], true
        );
        var tangentB = [
            eyelidCircle.center[0] + eyelidCircle.radius * Math.cos(tangentAngleB),
            eyelidCircle.center[1] + eyelidCircle.radius * Math.sin(tangentAngleB)
        ];
        var tangentB3D = eyelidPlane.to3D(tangentB);
        
        ctx.beginPath();
        ctx.moveTo(oc.x + eyeRadius * 2, oc.z + eyeRadius * 2);
        ctx.lineTo(tangentB3D[0] + eyeRadius * 2, tangentB3D[2] + eyeRadius * 2);
        ctx.stroke();
        
        for (var c1 = 0; c1 <= 100; c1++)
        {
            var angle = (tangentAngleB - tangentAngleA) * (c1 / 100) + tangentAngleA;
            var x = Math.cos(angle) * eyelidCircle.radius + eyelidCircle.center[0];
            var y = Math.sin(angle) * eyelidCircle.radius + eyelidCircle.center[1];
            var coords = eyelidPlane.to3D([x, y]);
            coords = vectorAdd(coords, [eyeRadius * 2, eyeRadius * 2, eyeRadius * 2]);
            
            if (c1 > 0)
            {
				if (!color)
				{
					ctx.strokeStyle = 'black';
				}
                else if (coords[1] < lastY)
                {
                    ctx.strokeStyle = 'red';
                }
                else
                {
                    ctx.strokeStyle = 'blue';
                }
                ctx.beginPath();
                ctx.moveTo(lastPoint[0], lastPoint[2]);
                ctx.lineTo(coords[0], coords[2]);
                ctx.stroke();
            }
            lastY = coords[1];
            lastPoint = coords;
        }
        ctx.stroke();
    }
}
function drawEyelidClip(ctx, ic, oc, eyeRadius, eyelidPlane, eyelidCircle, ic2D, oc2D) 
{
    var lastY = 0;
    var lastPoint = [0, 0, 0];
    var tangentAngleA = eyelidPlane.circleTangent(eyelidCircle.center[0], eyelidCircle.center[1], eyelidCircle.radius, ic2D[0], ic2D[1], false);
    var tangentA = [eyelidCircle.center[0] + eyelidCircle.radius * Math.cos(tangentAngleA), eyelidCircle.center[1] + eyelidCircle.radius * Math.sin(tangentAngleA)];
    var tangentA3D = eyelidPlane.to3D(tangentA);
    var tangentAngleB = eyelidPlane.circleTangent(eyelidCircle.center[0], eyelidCircle.center[1], eyelidCircle.radius, oc2D[0], oc2D[1], true);
    var tangentB = [eyelidCircle.center[0] + eyelidCircle.radius * Math.cos(tangentAngleB), eyelidCircle.center[1] + eyelidCircle.radius * Math.sin(tangentAngleB)];
    var tangentB3D = eyelidPlane.to3D(tangentB);
    
    // Define clipping path
    
    ctx.moveTo(ic.x + eyeRadius * 2, ic.z + eyeRadius * 2);
    ctx.lineTo(tangentA3D[0] + eyeRadius * 2, tangentA3D[2] + eyeRadius * 2);
    
    for (var c1 = 0; c1 <= 100; c1++) 
    {
        var angle = (tangentAngleB - tangentAngleA) * (c1 / 100) + tangentAngleA;
        var x = Math.cos(angle) * eyelidCircle.radius + eyelidCircle.center[0];
        var y = Math.sin(angle) * eyelidCircle.radius + eyelidCircle.center[1];
        var coords = eyelidPlane.to3D([x, y]);
        coords = vectorAdd(coords, [eyeRadius * 2, eyeRadius * 2, eyeRadius * 2]);
        
        if (c1 > 0) 
        {
            ctx.lineTo(coords[0], coords[2]);
        }
        
        lastY = coords[1];
        lastPoint = coords;
    }
    
    ctx.lineTo(tangentB3D[0] + eyeRadius * 2, tangentB3D[2] + eyeRadius * 2);
    ctx.lineTo(oc.x + eyeRadius * 2, oc.z + eyeRadius * 2);
    
    
   
}
function drawLabel(ctx, text, x, y)
{
    ctx.font = '16px Arial'; // Adjust font size as needed
    ctx.fillStyle = 'black'; // Color of the label text
    ctx.textAlign = 'center'; // Center the text horizontally
    ctx.textBaseline = 'middle'; // Center the text vertically
    ctx.fillText(text, x, y);
}
