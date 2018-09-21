$(document).ready(function()
{
	tVisual = $("#LIMG li").size();
	tPAGE = Math.ceil(tVisual/N);
	lastNum = (tVisual%N);


	$("#LIMG").css({width:(SW*tVisual)}); //리스트 가로 사이즈 조정
	$("#mIMG").css({width:(BW*tVisual)}); //큰 이미지 가로 사이즈 조정

	/* 큰 이미지 좌우 버튼 */
	$(".btn_left").click(function()
	{
		if(imgC == 0) {/*alert("첫 장입니다.");*/return false;}
		else {imgC--;bIMGView(imgC,'L');}
	});

	$(".btn_right").click(function()
	{
		if(imgC == (tVisual-1)) {/*alert("마지막 장입니다.");*/return false;}
		else {imgC++;bIMGView(imgC,'R');}
	});
	/* //큰 이미지 좌우 버튼 */

 
	/* 리스트 이미지 좌우 버튼 */
	$(".THUMB_left").click(function()
	{
		if(cPAGE == 1) {/*alert("첫 페이지 입니다.");*/return false;}
		else {cPAGE--;pList('L');}
	});

	$(".THUMB_right").click(function()
	{
		if(cPAGE == tPAGE) {/*alert("마지막 페이지 입니다.");*/return false;}
		else {cPAGE++;pList('R');}
	});
	/* //리스트 이미지 좌우 버튼 */


	$(".sIMG").click(function()
	{		
		C = $(".sIMG").index($(this));

		if(C < imgC) {bIMGView(C, 'L');}
		else {bIMGView(C, 'R');}
		
		imgC = C;
	});

	pList('S');
	bIMGView(imgC,'S');
});


function bIMGView(C, M)
{
	$("#LIMG li").each(function() {$(this).css({"opacity":"0.5"});});
	$("#LIMG li:eq("+C+")").css({"opacity":"1.0"});

	if(M == "S") {$("#mIMG").animate({left:0}, 500, function(){ if(typeof fn_SlideEvent!='undefined') fn_SlideEvent(); } ); }
	if(M == "R")
	{
		mLeft = -BW*C;
		$("#mIMG").animate({left:mLeft}, 500, function(){ if(typeof fn_SlideEvent!='undefined') fn_SlideEvent(); } );

		//var rP = (C) % N;
		//if(rP == 0) {$(".THUMB_right").click();}
	}
	if(M == "L")
	{
		mLeft = BW*C;
		$("#mIMG").animate({left:'-'+mLeft}, 500, function(){ if(typeof fn_SlideEvent!='undefined') fn_SlideEvent(); } );

		//var rP = (C) % (N-1);
		//if(rP == 0 && imgC > 0) {$(".THUMB_left").click();}
	}
}

function pList(M)
{
	var mLEFT = (SW*N);

	if(M == "R")
	{
		if(cPAGE==tPAGE && lastNum!=0) {mLEFT = (SW*lastNum);}	//if(cPAGE<tPAGE) {mLEFT = (SW*lastNum);}
		$("#LIMG").animate({left:'-='+(mLEFT)}, 500);
	}
	if(M == "L")
	{
		if(cPAGE==(tPAGE-1) && lastNum!=0) {mLEFT = (SW*lastNum);}	//if(cPAGE<(tPAGE-1)) {mLEFT = (SW*lastNum);}
		$("#LIMG").animate({left:'+='+(mLEFT)}, 500);
	}
	if(M == "S") {$("#LIMG").animate({left:0}, 500);}
}

// 초기화
function slideInit(){
	imgC = 0;
	cPAGE = 1;
	
	tVisual = $("#LIMG li").size();
	tPAGE = Math.ceil(tVisual/N);
	lastNum = (tVisual%N);
	
	$("#LIMG").css({width:(SW*tVisual)}); //리스트 가로 사이즈 조정
	$("#mIMG").css({width:(BW*tVisual)}); //큰 이미지 가로 사이즈 조정
	
	$(".sIMG").click(function()
	{		
		C = $(".sIMG").index($(this));

		if(C < imgC) {bIMGView(C, 'L');}
		else {bIMGView(C, 'R');}
		
		imgC = C;
	});
	
	pList('S');
	bIMGView(imgC,'S');
}