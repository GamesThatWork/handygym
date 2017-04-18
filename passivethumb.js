

var  x = 0,  y = 0,
    vx = 0, vy = 0,
	ax = 0, ay = 0;

var sphere = document.getElementById("sphere");


var timeStart= performance.now();
var frames =0, fps=0, msec=0;



if (window.DeviceMotionEvent != undefined) {
	window.ondevicemotion = function(e) {
		
		frames++;
		msec = performance.now() -timeStart;
		fps = 1000.0 * frames / msec;
				
		ax = event.accelerationIncludingGravity.x * 5;
		ay = event.accelerationIncludingGravity.y * 5;
		//document.getElementById("accelerationX").innerHTML = e.accelerationIncludingGravity.x;
		$( "#accelerationX" ).html( format( e.acceleration.x ));
		$( "#accelerationY" ).html( format( e.acceleration.y ));
		$( "#accelerationZ" ).html( format( e.acceleration.z ));
		$( "#accelGravityX" ).html( format( e.accelerationIncludingGravity.x ));
		$( "#accelGravityY" ).html( format( e.accelerationIncludingGravity.y ));
		$( "#accelGravityZ" ).html( format( e.accelerationIncludingGravity.z ));
		$( "#accelKalmanX" ).html( format( frames/100 ));
		$( "#accelKalmanY" ).html( format( msec  /100000 ));
		$( "#accelKalmanZ" ).html( format( fps/100 ));

		if ( e.rotationRate ) {
			$( "#rotationAlpha" ).html( format( e.rotationRate.alpha ));
			$( "#rotationBeta"  ).html( format( e.rotationRate.beta ));
			$( "#rotationGamma" ).html( format( e.rotationRate.gamma ));
			}		
	}

	setInterval( function() {
		var landscapeOrientation = window.innerWidth/window.innerHeight > 1;
		if ( landscapeOrientation) {
			vx = vx + ay;
			vy = vy + ax;
		} else {
			vy = vy - ay;
			vx = vx + ax;
		}
		vx = vx * 0.98;
		vy = vy * 0.98;
		y = parseInt(y + vy / 50);
		x = parseInt(x + vx / 50);
		
		boundingBoxCheck();
		
		$("#finger1" ).css( { "top": y  +"px", "left": x+"px"});
		$("#finger2" ).css( { "top": 5.0+y*2.0 +"px", "left": x+"px"});
		$("#finger3" ).css( { "top":10.0+y*2.5 +"px", "left": x+"px"});
		$("#finger4" ).css( { "top":15.0+y*3.0 +"px", "left": x+"px"});
	//	$("#panel" ).css( { "top": y+"px", "left": x+"px"});
		
	}, 25);
} 


function format( number ){ 
		s= " "+Math.floor(number*100+.5)+" ";
		while( s.length< 8 )  
			s ="&nbsp;"+s;
		return s;
}

function boundingBoxCheck(){
	if (x<0) { x = 0; vx = -vx; }
	if (y<0) { y = 0; vy = -vy; }
	if (x>document.documentElement.clientWidth-20) { x = document.documentElement.clientWidth-20; vx = -vx; }
	if (y>document.documentElement.clientHeight-20) { y = document.documentElement.clientHeight-20; vy = -vy; }
	
}




