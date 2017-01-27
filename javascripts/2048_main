var borad = document.getElementById("borad");
var scorebar = document.getElementById("scorebar");
var ctx = borad.getContext("2d");

var over = false; //是否结束

var started = false;

var sx = 0, sy = 0;

var score = 0;

var map = [];
for(var i = 0; i < 4; i++){
	map[i] = [];
	for(var j = 0; j < 4; j++){
		map[i][j] = 0;
	}
}

var colors = [
	"#CCC0B2",//0;
	"#EEE4DA",//2
	"#F0E0C7",//4
	"#F5B074",//8
	"#FA9368",//16
	"#F37C60",//32
	"#F85E3C",//64
	"#EFCD72",//128
	"#F5CF44",//256
	"#FDFEBC",//512
	"#E0B010",//1024
	"#E7C600",//2048
	"#F79F0A"//4096
];

init();

function init(){
	ctx.fillStyle = "#BBADA0";
	ctx.fillRect(0, 0, 450, 450);
	randomBlock();
	randomBlock();
	draw();
}

function randomBlock(){
	var x = [], y = [];
	var top = 0;
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(map[i][j] == 0){
				x[top] = j;
				y[top++] = i;
			}
		}
	}
	if(top == 0)return;
	
	var a = Math.floor(Math.random() * top);
	var num = Math.floor(Math.random() * 100) < 80 ? 1 : 2;
	map[y[a]][x[a]] = num;
}

function draw(){
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			ctx.fillStyle = colors[map[i][j]];
			ctx.fillRect((i+1)*10 +i*100, (j+1)*10 +j*100, 100, 100);
			if(map[i][j] != 0){
				ctx.fillStyle = "black";
				ctx.font = "bold "+ map[i][j]<100?"70":(map[i][j]<1000?"60":"40") +"px consolas";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillText(String(Math.pow(2, map[i][j])), (i+1)*10 +i*100 +50, (j+1)*10 +j*100 + 50);
			}
		}
	}
	if(isOver() == true){
		console.log("over");
		ctx.fillStyle = "black";
		ctx.font = "bold 80px consolas";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText("GAME OVER!", 225, 225);
	}
}

function getPointOnCanvas(canvas, x, y) {  
    var bbox = canvas.getBoundingClientRect();  
    return {
			x: x - bbox.left * (canvas.width  / bbox.width),  
      y: y - bbox.top  * (canvas.height / bbox.height)+0.5
    };  
}

function addScore(num){
	score += Math.pow(2, num);
	scorebar.innerHTML = "score:" + String(score);
}

function isOver(){
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 3; j++){
			if(map[i][j] == map[i][j+1] || map[i][j] == 0)
				return false;
		}
	}
	for(var j = 0; j < 4; j++){
		for(var i = 0; i < 3; i++){
			if(map[i][j] == map[i+1][j] || map[i][j] == 0)
				return false;
		}
	}
	if(map[3][3] == 0)
		return false;
	return true;
}

function move(way){
	console.log(way);
	
	var line = []; l = [];
	var c = false;
	var i = 0, j = 0, k = 0, t;
	
	for(i = 0; i < 4; i++)
		l[i] = 0;
	
	if(way == "left"){
		for(j = 0; j < 4; j++){
			for(i = 0; i < 5; i++)
				line[i] = 0;
			t = 0;
			for(i = 0; i < 4; i++){
				l[i] = map[i][j];
				if(map[i][j] != 0){
					line[t++] = map[i][j];
				}
			}
			if(line.length > 0){
				for(i = 0; i < t-1; i++){
					if(line[i] == line[i+1] && line[i] != 0){
						addScore(++line[i]);
						for(k = i+1; k < t; k++){
							line[k] = line[k+1];
						}
					} 
				}
				for(i = 0; i < 4; i++){
					map[i][j] = line[i];
				}
			}
			for(i = 0; i < 4; i++){
				if(line[i] != l[i]){
					c = true;
					break;
				}
			}
		}
	}
	else if(way == "right"){
		for(j = 0; j < 4; j++){
			for(i = 0; i < 5; i++)
				line[i] = 0;
			t = 0;
			for(i = 3; i >= 0; i--){
				l[3-i] = map[i][j];
				if(map[i][j] != 0){
					line[t++] = map[i][j];
				}
			}
			if(t > 0){
				for(i = 0; i < t-1; i++){
					if(line[i] == line[i+1] && line[i] != 0){
						addScore(++line[i]);
						for(k = i+1; k < t; k++){
							line[k] = line[k+1];
						}
					} 
				}
				for(i = 0; i < 4; i++){
					map[i][j] = line[3-i];
				}
			}
			for(i = 0; i < 4; i++){
				if(line[i] != l[i]){
					c = true;
					break;
				}
			}
		}
	}
	else if(way == "up"){
		console.log("1");
		for(i = 0; i < 4; i++){
			for(j = 0; j < 5; j++)
				line[j] = 0;
			t = 0;
			for(j = 0; j < 4; j++){
				l[j] = map[i][j];
				if(map[i][j] != 0){
					line[t++] = map[i][j];
				}
			}
			if(t > 0){
				for(j = 0; j < t-1; j++){
					if(line[j] == line[j+1] && line[j] != 0){
						addScore(++line[j]);
						for(k = j+1; k < t; k++){
							line[k] = line[k+1];
						}
					} 
				}
				for(j = 0; j < 4; j++){
					map[i][j] = line[j];
				}
			}
			for(j = 0; j < 4; j++){
				if(line[j] != l[j]){
					c = true;
					console.log("2");
					break;
				}
			}
		}
	}
	else if(way == "down"){
		for(i = 0; i < 4; i++){
			for(j = 0; j < 5; j++)
				line[j] = 0;
			t = 0;
			for(j = 3; j >= 0; j--){
				l[3-j] = map[i][j];
				if(map[i][j] != 0){
					line[t++] = map[i][j];
				}
			}
			if(t > 0){
				for(j = 0; j < t-1; j++){
					if(line[j] == line[j+1] && line[j] != 0){
						addScore(++line[j]);
						for(k = j+1; k < t; k++){
							line[k] = line[k+1];
						}
					} 
				}
				for(j = 0; j < 4; j++){
					map[i][j] = line[3-j];
				}
			}
			for(j = 0; j < 4; j++){
				if(line[j] != l[j]){
					c = true;
					break;
				}
			}
		}
	}
	if(c == true){
		randomBlock();
		console.log("3");
		draw();
	}
}

borad.onmousedown = function(e){
	var x = e.pageX;  
  var y = e.pageY;
	var canvas = e.target;  
  var loc = getPointOnCanvas(canvas, x, y);
	sx = loc.x;
	sy = loc.y;
	console.log("mouse down at point( x:" + sx + ", y:" + sy + ")");
}

borad.onmouseup = function(e){
	var x = e.pageX;  
  var y = e.pageY;
	var canvas = e.target;  
  var loc = getPointOnCanvas(canvas, x, y);
	var ex = loc.x;
	var ey = loc.y;
	console.log("mouse down at point( x:" + ex + ", y:" + ey + ")");
	if(Math.abs(sx-ex) < Math.abs(sy-ey)){
		if(sy < ey)move("down");
		else if(sy > ey)move("up");
	}
	else if(Math.abs(sx-ex) > Math.abs(sy-ey)){
		if(sx < ex)move("right");
		else if(sx > ex)move("left");
	}
}
