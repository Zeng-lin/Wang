/*var WINDOW_WIDTH = 1200;
var WINDOW_HEIGHT = 800;*/
var RADIUS = 8;
var times = new Date();
// var endtime = times.setTime(times.getTime()+3600*1000);

var curShowTimeSeconds = 0;
var balls = [];
var colors = ["#8B94F6", "#F80808", "#0209AC", "#1EE008", "#53F8C8", "#F9FC03", "#FA7604", "#756428", "#FF589F", "#B92500"];

window.onload = function(argument) {

	// WINDOW_HEIGHT = document.body.scrollHeight;

	WINDOW_WIDTH = document.documentElement.clientWidth;
	WINDOW_HEIGHT = document.documentElement.clientHeight;
	// WINDOW_WIDTH = document.body.clientWidth; //网页可见区域的宽度
	// WINDOW_HEIGHT = document.body.clientHeight;
	// WINDOW_WIDTH = window.screen.width; //屏幕分辨率的宽
	// WINDOW_HEIGHT = window.screen.height;
	MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
	MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
	RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 140);

	console.log(WINDOW_HEIGHT);

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	curShowTimeSeconds = getCurrentShowTimeSeconds();
	setInterval(
		function() {
			render(context);
			update();
		}, 50)
}

function getCurrentShowTimeSeconds() {
	var curTime = new Date();
	var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
	return ret;
}

function update() {
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();

	var nexthours = parseInt(nextShowTimeSeconds / 3600),
		nextminutes = parseInt((nextShowTimeSeconds - (nexthours * 3600)) / 60),
		nextseconds = parseInt((nextShowTimeSeconds - (nexthours * 3600) - (nextminutes * 60)));

	var curhours = parseInt(curShowTimeSeconds / 3600),
		curminutes = parseInt((curShowTimeSeconds - (curhours * 3600)) / 60),
		curseconds = parseInt((curShowTimeSeconds - (curhours * 3600) - (curminutes * 60)));
	if (nextseconds != curseconds) {
		if (parseInt(curhours / 10) != parseInt(nexthours / 10)) {
			addballs(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10))
		}

		if (parseInt(curhours % 10) != parseInt(nexthours % 10)) {
			addballs(MARGIN_LEFT + 14 * (RADIUS + 1) + 20, MARGIN_TOP, nexthours % 10)
		}

		if (parseInt(curminutes / 10) != parseInt(nextminutes / 10)) {
			addballs(MARGIN_LEFT + 14 * 3 * (RADIUS + 1) + 20, MARGIN_TOP, parseInt(nextminutes / 10));
		}

		if (parseInt(curminutes % 10) != parseInt(nextminutes % 10)) {
			addballs(MARGIN_LEFT + 14 * 4 * (RADIUS + 1) + 40, MARGIN_TOP, nextminutes % 10);
		}

		if (parseInt(curseconds / 10) != parseInt(nextseconds / 10)) {
			addballs(MARGIN_LEFT + 14 * 6 * (RADIUS + 1) + 40, MARGIN_TOP, parseInt(nextseconds / 10))
		}

		if (parseInt(curseconds % 10) != parseInt(nextseconds % 10)) {
			addballs(MARGIN_LEFT + 14 * 7 * (RADIUS + 1) + 60, MARGIN_TOP, nextseconds % 10)
		}

		curShowTimeSeconds = nextShowTimeSeconds;
	}
	updateBalls();
	console.log(balls.length);
}

function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy * 0.75;
		}
	}
	var cnt = 0;
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
			balls[cnt++] = balls[i];
		}
	}
	while (balls.length > Math.min(300, cnt)) {
		balls.pop();
	}
}

function render(ctx) {
	ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)

	var hours = parseInt(curShowTimeSeconds / 3600),
		minutes = parseInt((curShowTimeSeconds - (hours * 3600)) / 60),
		seconds = parseInt((curShowTimeSeconds - (hours * 3600) - (minutes * 60)));

	renderDigit(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(hours / 10), ctx);
	renderDigit(MARGIN_LEFT + 14 * (RADIUS + 1) + 20, MARGIN_TOP, hours % 10, ctx);
	renderDigit(MARGIN_LEFT + 14 * 2 * (RADIUS + 1) + 50, MARGIN_TOP, 10, ctx);
	renderDigit(MARGIN_LEFT + 14 * 3 * (RADIUS + 1) + 20, MARGIN_TOP, parseInt(minutes / 10), ctx);
	renderDigit(MARGIN_LEFT + 14 * 4 * (RADIUS + 1) + 40, MARGIN_TOP, minutes % 10, ctx);
	renderDigit(MARGIN_LEFT + 14 * 5 * (RADIUS + 1) + 70, MARGIN_TOP, 10, ctx);
	renderDigit(MARGIN_LEFT + 14 * 6 * (RADIUS + 1) + 40, MARGIN_TOP, parseInt(seconds / 10), ctx);
	renderDigit(MARGIN_LEFT + 14 * 7 * (RADIUS + 1) + 60, MARGIN_TOP, seconds % 10, ctx);
	for (var i = 0; i < balls.length; i++) {
		ctx.fillStyle = balls[i].color;

		ctx.beginPath();
		ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
	}

}


function addballs(x, y, num) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				var aball = {
					x: x + 2 * j * (RADIUS + 1) + (RADIUS + 1),
					y: y + 2 * i * (RADIUS + 1) + (RADIUS + 1),
					g: 1.5 + Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
					vy: -5,
					color: colors[Math.floor(Math.random() * colors.length)]
				};
				balls.push(aball);
			}
		}
	}
}

function renderDigit(x, y, num, ctx) {
	ctx.fillStyle = "rgb(0,0,255)";
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				ctx.beginPath();
				ctx.arc(x + 2 * j * (RADIUS + 1) + (RADIUS + 1), y + 2 * i * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
				ctx.closePath();

				ctx.fill()
			}
		}
	}
}