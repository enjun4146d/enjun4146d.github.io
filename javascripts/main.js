var chess = document.getElementById("chess");
var ctx = chess.getContext("2d");

var is = true;
var m = true;
var over = false; //是否结束

var started = false;

function mode(){
	if(started){
		alert("游戏已经开始，无法更改");
	}
	m = !m;
	document.getElementById("mode").value = m?"人机模式":"双人模式";
}

//棋盘数组
var board = [];
for(var i = 0; i < 15; i++){
	board[i] = [];
	for(var j = 0; j < 15; j++){
		board[i][j] = 0;
	}
}

//赢法数组
var win = [];
for(var i = 0; i < 15; i++){
	win[i] = [];
	for(var j = 0; j < 15; j++){
		win[i][j] = [];
	}
}

var count = 0;
for(var i = 0; i < 15; i++){  //横
	for(var j = 0; j < 11; j++){
		for(var k = 0; k < 5; k++){
			win[i][j+k][count] = true;
		}
		count++;
	}
}

for(var i = 0; i < 15; i++){  //竖
	for(var j = 0; j < 11; j++){
		for(var k = 0; k < 5; k++){
			win[j+k][i][count] = true;
		}
		count++;
	}
}

for(var i = 0; i < 11; i++){   //正斜
	for(var j = 0; j < 11; j++){
		for(var k = 0; k < 5; k++){
			win[i+k][j+k][count] = true;
		}
		count++;
	}
}

for(var i = 0; i < 11; i++){  //反斜
	for(var j = 14; j > 3; j--){
		for(var k = 0; k < 5; k++){
			win[i+k][j-k][count] = true;
		}
		count++;
	}
}

var AWin = [], BWin = [];
for(var i = 0; i < count; i++){
	AWin[i] = 0;
	BWin[i] = 0;
}

ctx.strokeStyle = "#B9B9B9";
for(var i = 0; i < 15; i++){  //画棋盘，15*15
	ctx.moveTo(15 + i*30, 15);
	ctx.lineTo(15 + i*30, 435);
	ctx.stroke();
	ctx.moveTo(15, 15 + i*30);
	ctx.lineTo(435, 15 + i*30);
	ctx.stroke();
}

	
chess.onclick = function(e){
	started = true;
	if(over)
		return;
	var i = Math.floor(e.offsetX / 30);//取棋盘索引
	var j = Math.floor(e.offsetY / 30);
	if(board[i][j] == 0){
		oneStep(i, j, is);
		board[i][j] = is?1:2;	
		for(var k = 0; k < count; k++){
			if(win[i][j][k]){
				if(!m){
					if(is){
						AWin[k]++;
						BWin[k] = 6;
						if(AWin[k] == 5){
							over = true;
							if(confirm("A方赢了,要重来吗？")){
								location.reload(true);
							}
						}	
					}else{
						BWin[k]++;
						AWin[k] = 6;
						if(BWin[k] == 5){
							over = true;
							if(confirm("B方赢了,要重来吗？")){
								location.reload(true);
							}
						}
					}
				}else{
					AWin[k]++;
					BWin[k] = 6;
					if(AWin[k] == 5){
						over = true;
						if(confirm("A方赢了,要重来吗？")){
							location.reload(true);
						}
					}
				}
			}
		}
		if(!over){
			is = !is;
			if(m)AI();
			
		}
	}
};

function oneStep(i, j, me){  //下棋
	ctx.beginPath();
	ctx.arc(15 + i*30, 15 + j*30, 15, 0, 2 * Math.PI);
	ctx.closePath();
	var g = ctx.createRadialGradient(15 + i*30 +2, 15 + j*30-2, 13, 15 + i*30 +2, 15 + j*30-2, 0);
	if(me){
		g.addColorStop(0, "#0A0A0A");
		g.addColorStop(1, "#636766");
	}else{
		g.addColorStop(0, "#D1D1D1");
		g.addColorStop(1, "#F9F9F9");
	}
	ctx.fillStyle = g;
	ctx.fill();
}

function AI(){  //计算机AI
	var AScore = [];
	var BScore = [];  //位置分数统计
	var max = 0;//最高分数
	var x = 0, y = 0;//最高分数坐标
	for(var i = 0; i < 15; i++){
		AScore[i] = [];
		BScore[i] = [];
		for(var j = 0; j < 15; j++){
			AScore[i][j] = 0;
			BScore[i][j] = 0;
		}
	}
	for(var i = 0; i < 15; i++){
		for(var j = 0; j < 15; j++){
			if(board[i][j] == 0){  //可下棋
				for(var k = 0; k < count; k++){
					if(win[i][j][k]){
						if(AWin[k] == 1){  //拦截A方
							AScore[i][j] += 200;
						}else if(AWin[k] == 2){
							AScore[i][j] += 400;
						}else if(AWin[k] == 3){
							AScore[i][j] += 2000;
						}else if(AWin[k] == 4){
							AScore[i][j] += 10000;
						}
						
						if(BWin[k] == 1){  //B方下子
							BScore[i][j] += 210;
						}else if(BWin[k] == 2){
							BScore[i][j] += 420;
						}else if(BWin[k] == 3){
							BScore[i][j] += 2100;
						}else if(BWin[k] == 4){
							BScore[i][j] += 20000;
						}
					}
				}
				//赢法判断之后,统计做高分
				if(AScore[i][j] > max){
					max = AScore[i][j];
					x = i;
					y = j;
				}else if(AScore[i][j] == max){
					if(BScore[i][j] > BScore[x][y]){
						x = i;
						y = j;
					}
				}
				if(BScore[i][j] > max){
					max = BScore[i][j];
					x = i;
					y = j;
				}else if(BScore[i][j] == max){
					if(AScore[i][j] > AScore[x][y]){
						x = i;
						y = j;
					}
				}
			}
		}
	}
	//下子
	oneStep(x, y, false);
	board[x][y] = 2;
	//统计赢法
	for(var k = 0; k < count; k++){
			if(win[x][y][k]){
				BWin[k]++;
				AWin[k] = 6;
				if(BWin[k] == 5){
					over = true;
					if(confirm("B方赢了,要重来吗？")){
						location.reload(true);
					}
				}
			}
		}
		if(!over)
			is = !is;
}
