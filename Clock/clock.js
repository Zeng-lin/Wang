window.onload = function () {
	var cvs = document.getElementById('clock');
	var ctx = cvs.getContext('2d');
	var width = ctx.canvas.width;
	var height = ctx.canvas.height;
	var r = width/2


		ctx.translate(r,r)
	function drawBackground() {
		ctx.save()
		ctx.beginPath();
		ctx.arc(0,0,r - 15,0,2*Math.PI)
		ctx.lineWidth = 30;
		ctx.stroke();
		ctx.closePath();
		var hoursNumber = [3,4,5,6,7,8,9,10,11,12,1,2];
		ctx.font = "30px Arial";
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		hoursNumber.forEach(function (num,i) {
			var rad = (2*Math.PI/12) * i;
			var x = Math.cos(rad) * (r - 65);
			var y = Math.sin(rad) * (r - 65);
			ctx.fillText(num, x, y);
		});

		for (var i = 0; i < 60; i++) {
			var rad = (2*Math.PI/60) * i;
			
			var x = Math.cos(rad) * (r - 45);
			var y = Math.sin(rad) * (r - 45);
			if (i % 5 != 0) {
				ctx.beginPath()
				ctx.fillStyle = "#ccc";
				ctx.arc(x, y, 2, 0, 2*Math.PI)
				ctx.fill();
				ctx.closePath()
			}else{
				ctx.beginPath();
				ctx.fillStyle = "#000";
				ctx.arc(x, y, 2, 0, 2*Math.PI);
				ctx.fill();
				ctx.closePath();

			}
		}
		ctx.restore();
	}
	function drawHour(hour,minute){
		ctx.save();
		ctx.beginPath();
		var rad = 2 * Math.PI /12 *hour;
		var mrad = 2 *Math.PI / 12 / 60 * minute
		ctx.rotate(rad + mrad);
		ctx.lineWidth= 8;
		ctx.lineCap = "round"
		ctx.moveTo(0,20);
		ctx.lineTo(0,-r/2)
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
	function drawMinute(minute,second){
		ctx.save();
		ctx.beginPath();
		var rad = 2 * Math.PI / 60 *minute;
		var srad = 2 * Math.PI / 60 /60 * second;
		ctx.rotate(rad + srad);
		ctx.lineWidth= 6;
		ctx.lineCap = "round"
		ctx.moveTo(0,20);
		ctx.lineTo(0,-r/1.8)
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}	

	function drawSecond(second){
		ctx.save();
		ctx.beginPath();
		var rad = 2 * Math.PI / 60 *second;
		ctx.fillStyle = "red"
		ctx.rotate(rad);
		ctx.lineWidth= 3;
		ctx.linCap = "round"
		ctx.moveTo(-3,20);
		ctx.lineTo(0,-r/1.8)
		ctx.lineTo(3,20)
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}

	function drawarc() {
		ctx.save();
		ctx.beginPath()
		ctx.fillStyle = "red";
		ctx.arc(0, 0, 8, 0, 2*Math.PI)
		ctx.fill();
		ctx.closePath();
		ctx.restore()
	}

	setInterval(
		function(){
			ctx.clearRect(-width/2,-height/2,width,height);
				var dtime = new Date();
			var hours = dtime.getHours();
			var minutes = dtime.getMinutes();
			var seconds = dtime.getSeconds();
			drawBackground();
			drawHour(hours,minutes);
			drawMinute(minutes,seconds);
			drawSecond(seconds);
			drawarc()
		},50);	

}