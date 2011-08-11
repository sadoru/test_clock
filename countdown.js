onload = function() {
	init();
}

// 描画エリア定義
var AREA_X = 500;
var AREA_Y = 500;
var OFFESET_X = 50;
var OFFESET_Y = 50;
var INTERVAL = 100;

var canvas;
var ctx;

var degPerSec;
var degPerMin;
var degree = -90;
var degreeMin = -90;

function init() {
	// canvas要素のノードオブジェクト
	canvas = document.getElementById('canvassample');
	// 2Dコンテキスト
	ctx = canvas.getContext('2d');

	degree = -90;
	degreeMin = -90;
	degPerSec = 360 / 1000;
	degPerMin = 360 / 3;
	tid = setInterval("drawArc()", INTERVAL);
}

function drawClear ()
{
	ctx.clearRect(0, 0, AREA_X, AREA_Y);
}

function drawArc ()
{
	if ( 270 <= degree) {
		degree = -90;
	    degreeMin = degreeMin + degPerMin;
		if ( 270 <= degreeMin) {
			degreeMin = -90;
		}
	}
	drawClear();
/* ------------------------------
  ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
  x: 円の中心x座標
  y: 円の中心y座標
  radius: 円の半径
  startAngle:円弧を描き始める角度。x軸の向き（右方向）から見て右回りの角度をラジアンで指定
  endAngle:円弧を描き終える角度。x軸の向き（右方向）から見て右回りの角度をラジアンで指定
  anticlockwise:円弧を描く向きを真偽値で指定。true=反時計回り、false=時計回りで円弧を描く
------------------------------*/

	var hankei = 200;
	var hankeiMin = 140;

    ctx.beginPath();
    ctx.strokeStyle = 'rgb(0, 0, 255)';
    ctx.lineWidth = 50;
    ctx.arc(OFFESET_X + hankei, OFFESET_Y + hankei, hankei, 0, Math.PI*2, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'rgb(255, 0, 255)';
    ctx.lineWidth = 50;
    ctx.arc(OFFESET_X + hankei, OFFESET_Y + hankei, hankeiMin, 0, Math.PI*2, false);
    ctx.stroke();

	// draw circle of second
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = 50;
    degree = degree + degPerSec;
    ctx.arc(OFFESET_X + hankei, OFFESET_Y + hankei, hankei, (-90*Math.PI/180), (degree*Math.PI/180), false);
    ctx.stroke();

	// draw circle of minuts
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = 50;
    ctx.arc(OFFESET_X + hankei, OFFESET_Y + hankei, hankeiMin, (-90*Math.PI/180), (degreeMin*Math.PI/180), false);
    ctx.stroke();
}
