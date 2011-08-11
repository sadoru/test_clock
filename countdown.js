onload = function() {
	init();
}

/*----------------------------------
 * デフォ値
 *----------------------------------*/
var defTitle = "3 Minutes Speech";
var defTitleFinish = "Time UP!";
var defMin   = 1;
var defColorStart	= "blue";
var defColorFinish	= "red";

// 描画エリア定義
var AREA_X = 500;
var AREA_Y = 500;
var OFFESET_X = 50;
var OFFESET_Y = 50;
var INTERVAL = 100;

/*----------------------------------
 * Global変数
 *----------------------------------*/
var canvas;
var ctx;

var degPerSec;
var degPerMin;
var degree = -90;
var degreeMin = -90;

var min;
var sec;
var msec;
var tid;	// timer
var flg = false;

/*----------------------------------
 * 
 *----------------------------------*/
function init() {
    // canvas要素のノードオブジェクト
    canvas = document.getElementById('analog');
    // 2Dコンテキスト
    ctx = canvas.getContext('2d');

    degree = -90;
    degreeMin = -90;
    degPerSec = 360 / 1000;
    degPerMin = 360 / 3;

    min  = defMin;
    sec  = 0;
    msec   = 0;
    flg  = false;

    document.getElementById("title").firstChild.nodeValue = defTitle;
    document.getElementById("title").style.color = defColorStart;
    document.getElementById("digiMin").firstChild.nodeValue = min;
    document.getElementById("digiSec").firstChild.nodeValue = "0"+sec;
    document.getElementById("digiMSec").firstChild.nodeValue = msec;

    document.btns.elements[0].value = "START";
    clearInterval(tid);
}

/*----------------------------------
 * 
 *----------------------------------*/
function drawClear ()
{
	ctx.clearRect(0, 0, AREA_X, AREA_Y);
}

/*----------------------------------
 * btnAction:Start, Stop
 *----------------------------------*/
function btnAction ()
{
	if (false == flg) {
		tid = setInterval("onTimer()", INTERVAL);
		flg = true;
		document.btns.elements[0].value = "STOP";
	}
	else {
		clearInterval(tid);
		flg = false;
		document.btns.elements[0].value = "START";
	}
}

/*----------------------------------
 * onTimer:一定時間ごとの処理
 *----------------------------------*/
function onTimer()
{
	if ((0==min)&&(0==sec)&&(0==msec)) {
		finish();
		return;
	}
	
	if (0 == msec) {
		msec = 9;
		if (0 == sec) {
			sec = 59;
			min--;
		}
		else{
			sec--;
		}	
	}
	else{
		msec--;
	}

	document.getElementById("digiMin").firstChild.nodeValue = min;
	
	if (10>sec) {
		document.getElementById("digiSec").firstChild.nodeValue = "0"+sec;
	}
	else {
		document.getElementById("digiSec").firstChild.nodeValue = sec;
	}
	document.getElementById("digiMSec").firstChild.nodeValue = msec;

    drawArc();
}

/*----------------------------------
 * finish:終了時の処理
 *----------------------------------*/
function finish() {
	clearInterval(tid);
	document.getElementById("title").firstChild.nodeValue = defTitleFinish;
	document.getElementById("title").style.color = defColorFinish;
}

/*----------------------------------
 * 
 *----------------------------------*/
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
