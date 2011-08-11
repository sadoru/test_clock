onload = function() {
	init();
}

/*----------------------------------
 * Default value
 *----------------------------------*/
var COUNT_TIME  = 3;
var STR_TITLE   = COUNT_TIME + " Minutes Speech";
var STR_FINISH  = "Time UP!";
var COLOR_START = "blue";
var COLOR_FINISH = "red";

// 描画エリア定義
var AREA_X = 400;
var AREA_Y = 400;
var CENTER_X = AREA_X / 2;
var CENTER_Y = AREA_Y / 2;
var CIRCLE_WIDTH = 50;
var R_MIN = CENTER_X - (CIRCLE_WIDTH/2);
var R_SEC = R_MIN / 2;

var INTERVAL = 100;

// １更新あたりの角度
var ANGLE_PER_SEC = (360 / 60) / (1000 / INTERVAL);
var ANGLE_PER_MIN = (360 / (60*COUNT_TIME)) / (1000 / INTERVAL);

/*----------------------------------
 * Global変数
 *----------------------------------*/
var canvas;
var ctx;

var degreeSec;
var degreeMin;

var min;
var sec;
var msec;
var tid;	// timer
var flg = false;

/*----------------------------------
 * init:初期化
 *----------------------------------*/
function init() {
    // canvas要素のノードオブジェクト
    canvas = document.getElementById('analog');
    // 2Dコンテキスト
    ctx = canvas.getContext('2d');
    drawClear();

    degreeSec = -90;
    degreeMin = -90;

    min  = COUNT_TIME;
    sec  = 0;
    msec   = 0;
    flg  = false;

    document.getElementById("title").firstChild.nodeValue = STR_TITLE;
    document.getElementById("title").style.color = COLOR_START;
    document.getElementById("digiMin").firstChild.nodeValue = min;
    document.getElementById("digiSec").firstChild.nodeValue = "0"+sec;
    document.getElementById("digiMSec").firstChild.nodeValue = msec;

    document.btns.elements[0].value = "START";
    clearInterval(tid);
}

/*----------------------------------
 * drawClear:
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
    drawArc();

    if ((0==min)&&(0==sec)&&(0==msec)) {
        finish();
        return;
    }
    
    countDigital();
}

/*----------------------------------
 * finish:終了時の処理
 *----------------------------------*/
function finish() {
	clearInterval(tid);
	document.getElementById("title").firstChild.nodeValue = STR_FINISH;
	document.getElementById("title").style.color = COLOR_FINISH;
}

/*----------------------------------
 * countDigital:
 *----------------------------------*/
function countDigital ()
{
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
}

/*----------------------------------
 * drawArc:
 *----------------------------------*/
 function drawArc ()
{
    // reset per sec
    if ( 270 <= degreeSec) {
        degreeSec = -90;
    }

	drawClear();

    // draw background circles
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(0, 0, 255)';
    ctx.lineWidth = CIRCLE_WIDTH;
    ctx.arc(CENTER_X, CENTER_Y, R_SEC, 0, Math.PI*2, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'rgb(255, 0, 255)';
    ctx.lineWidth = CIRCLE_WIDTH;
    ctx.arc(CENTER_X, CENTER_Y, R_MIN, 0, Math.PI*2, false);
    ctx.stroke();

	// draw circle of second
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = CIRCLE_WIDTH;
    degreeSec = degreeSec + ANGLE_PER_SEC;
    ctx.arc(CENTER_X, CENTER_Y, R_SEC, (-90*Math.PI/180), (degreeSec*Math.PI/180), false);
    ctx.stroke();

	// draw circle of minuts
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = CIRCLE_WIDTH;
    degreeMin = degreeMin + ANGLE_PER_MIN;
    ctx.arc(CENTER_X, CENTER_Y, R_MIN, (-90*Math.PI/180), (degreeMin*Math.PI/180), false);
    ctx.stroke();
}
