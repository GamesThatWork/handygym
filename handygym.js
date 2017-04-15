

var x = 0, y = 0,
    vx = 0, vy = 0,
	ax = 0, ay = 0;
	
var sphere = document.getElementById("sphere");

if (window.DeviceMotionEvent != undefined) {
	window.ondevicemotion = function(e) { 
		ax = event.accelerationIncludingGravity.x * 5;
		ay = event.accelerationIncludingGravity.y * 5;
		//document.getElementById("accelerationX").innerHTML = e.accelerationIncludingGravity.x;
		$( "#accelerationX" ).html( format( e.accelerationIncludingGravity.x ));
		$( "#accelerationY" ).html( format( e.accelerationIncludingGravity.y ));
		$( "#accelerationZ" ).html( format( e.accelerationIncludingGravity.z ));

		if ( e.rotationRate ) {
			document.getElementById("rotationAlpha").innerHTML = e.rotationRate.alpha;
			document.getElementById("rotationBeta").innerHTML = e.rotationRate.beta;
			document.getElementById("rotationGamma").innerHTML = e.rotationRate.gamma;
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
		
		$("#sphere" ).css( { "top": y+"px", "left": x+"px"});
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




