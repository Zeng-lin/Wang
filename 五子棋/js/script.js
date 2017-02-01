var chess = document.getElementById('chess');
var ctx = chess.getContext("2d");

window.onload = function(){
	var me = true;
	var chessBoard = [];
	var wins = [];
	var myWin = [];
	var computerWin = [];
	var over = false;
	
	for (var i = 0; i < 15; i++) {
		chessBoard[i] = [];
		for (var j = 0; j < 15; j++) {
			chessBoard[i][j] = 0;
		}
	}
	var logo = new Image();
	logo.src = "./images/logo.jpg";

//赢法数组
	for (var i = 0; i < 15; i++) {
		wins[i] = [];
		for (var j = 0; j < 15; j++) {
			wins[i][j] = []
		}
	};

	var count = 0;
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[i][j + k][count] = true;
			}
		count++;
		}
	}

	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[j + k][i][count] = true;
			}
		count++;
		}
	}

	for (var i = 0; i < 11; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[i + k][j +k][count] = true;
			}
		count++;
		}
	}

	for (var i = 0; i < 11; i++) {
		for (var j = 14; j > 3; j--) {
			for (var k = 0; k < 5; k++) {
				wins[i + k][j - k][count] = true;
			}
		count++;
		}
	}

	console.log(count);
	for (var i = 0; i < count; i++) {
		myWin[i] = 0;
		computerWin[i] = 0;
	}
	logo.onload = function () {
		ctx.drawImage(logo, 0, 0, 450, 450);
		drawgrid();

	}

	function drawgrid(){

		for (var i = 0; i < 15; i++) {
			ctx.beginPath();
			ctx.moveTo(15 + 30*i,15);
			ctx.lineTo(15 + 30*i,435);

			ctx.moveTo(15,15 + 30*i);
			ctx.lineTo(435,15 + 30*i);
			ctx.closePath();

			ctx.strokeStyle = "#bbb"
			ctx.stroke();
			console.log("hello");
		}
	}

	function oneStep(i, j, me) {
		ctx.beginPath();
		ctx.arc(15 + 30*i, 15 + 30*j, 13, 0, 2*Math.PI);
		ctx.closePath();
		var gradient = ctx.createRadialGradient(15 + 30*i + 2, 15 + 30*j - 2, 13, 15 + 30*i +2, 15 + 30*j -2, 0);
		if (me) {
			gradient.addColorStop(0, "#0a0a0a")
			gradient.addColorStop(1, "#636766")
		} else {
			gradient.addColorStop(0, "#d1d1d1")
			gradient.addColorStop(1, "#f9f9f9")
		}
		ctx.fillStyle = gradient;	
		ctx.fill();
	}

	chess.onclick = function (e) {
		if(over){
			return;
		}
		if(!me){
			return;
		}
		var i = Math.floor( e.offsetX / 30 ),
			  j = Math.floor( e.offsetY / 30 );
		if (chessBoard[i][j] == 0) {
			oneStep(i, j,  me);
			chessBoard[i][j] = 1;
			console.log(chessBoard[i][j]);		
		for (var k = 0; k < count; k++) {
			if (wins[i][j][k]) {
				myWin[k]++;
				computerWin[k] = 6;
				if (myWin[k] == 5) {
					setTimeout('window.alert("你赢了")',50);
					over = true;
				}
			}
		}
		if(!over){
			me = !me;
			computerAI();
		}
	}
		}
	var computerAI = function () {
		var myScore = [];
		var max = 0;
		var u = 0 , v = 0;
		var computerScore = [];
		for (var i = 0; i < 15; i++) {
			myScore[i] = [];
			computerScore[i] = [];
			for (var j = 0; j < 15; j++) {
				myScore[i][j] = 0;
				computerScore[i][j] = 0
			}
		}
		for (var i = 0; i < 15; i++) {
			for (var j = 0; j < 15; j++) {
				// console.log(chessBoard[i][j]);
				if (chessBoard[i][j] == 0) {
					for (var k = 0; k < count; k++) {
						if (wins[i][j][k]) {
							if (myWin[k] == 1) {
								myScore[i][j] += 200;
							} else if (myWin[k] == 2) {
								myScore[i][j] += 400;
							} else if (myWin[k] == 3) {
								myScore[i][j] += 2000;
							} else if (myWin[k] == 4) {
								myScore[i][j] += 10000;
							};

							if (computerWin[k] == 1) {
								computerScore[i][j] += 220;
							} else if (computerWin[k] == 2) {
								computerScore[i][j] += 420;
							} else if (computerWin[k] == 3) {
								computerScore[i][j] += 2100;
							} else if (computerWin[k] == 4) {
								computerScore[i][j] += 20000;
							}
						}
					}
					if(myScore[i][j] > max)	{
						max = myScore[i][j];
						u = i;
						v = j;
					} else if (myScore[i][j] == max) {
						if (computerScore[i][j] > computerScore[u][v]) {
							u = i;
							v = j;
						}
					}	
					if(computerScore[i][j] > max)	{
						max = computerScore[i][j];
						u = i;
						v = j;
					} else if (computerScore[i][j] == max) {
						if (myScore[i][j] > myScore[u][v]) {
							u = i;
							v = j;
						}
					}
				}
			}
		}
		oneStep(u, v, false);
		chessBoard[u][v] = 2;
		console.log(chessBoard[u][v]);
		for (var k = 0; k < count; k++) {
			if (wins[u][v][k]) {
				computerWin[k]++;
				myWin[k] = 6;
				if (computerWin[k] == 5) {
					setTimeout('window.alert("计算机赢了")',50);
					over = true;
				}
			}
		}
		if(!over){
			me = !me;
		}
	}
}








