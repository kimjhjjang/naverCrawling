/*!
 * Demo test javascript
 */

// DB사용모드 체크
function fnCheckDemoDatabase(strDbUseYn, strDbConnYn, strDbInitYn)
{	
	// DB사용모드인 경우에만 체크
	if(strDbUseYn=='Y'){
		// DB 접속 실패
		if(strDbConnYn!='Y'){
			alert('데이터베이스 접속을 실패하였습니다.\n[database.properties]파일의\n[jdbc.test.demo]항목의 내용을 확인해 주시기 바랍니다.');
			location.href = fnGetUrl("index.jsp");
			return false;
		}
		
		// DB 초기화 실패(테이블, 시퀀스 등 미생성)
		if(strDbInitYn!='Y'){
			if(confirm('데모 실행을 윈한 DB초기화가 되지 않았습니다.\n초기화 하시겠습니까?\n(생성된 데모데이터는 데모종료를 클릭하면 제거됩니다.)')){
				fnInitDemoDatabase();
			}else{
				//location.href = fnGetUrl("index.jsp");
				// 미사용모드로 변경
				fnChgDbUseYn();
			}
		}
	}else if(strDbUseYn=='null'){
		location.href = fnGetUrl("index.jsp");
	}
}

// DB사용유무 변경
function fnChgDbUseYn(){
	$.ajax({
		url: fnGetUrl('/demo.do?method=updateDbUseYn'),
		type: 'POST',
		dataType: 'json',
		async: true,			
		success: function(json) {
			location.href = fnGetUrl("/demo.do?method=goDemoMenu&MENU=Demo");
		},
		error: function(json) {
			alert("DB초기화에 실패하였습니다.");
			location.href = fnGetUrl("index.jsp");
		}
	});
}

// DB초기화 실행
function fnInitDemoDatabase(){
	$.ajax({
		url: fnGetUrl('/demo.do?method=activeDemoDatabase'),
		type: 'POST',
		dataType: 'json',
		async: true,			
		success: function(json) {
			location.reload(true);
		},
		error: function(json) {
			alert("DB초기화에 실패하였습니다.");
			location.href = fnGetUrl("index.jsp");
		}
	});
}

// 데모초기화(데모종료)
function fnDestroyDemoData(){
	$.ajax({
		url: fnGetUrl('/demo.do?method=destroyDemoData'),
		type: 'POST',
		dataType: 'json',
		async: true,			
		success: function(json) {
			location.href = fnGetUrl("index.jsp");
		},
		error: function(json) {
			alert("DB삭제를 실패하였습니다.");
			location.href = fnGetUrl("index.jsp");
		}
	});
}

// 좌측 메뉴 선택변경
function fnChgLeftmenu(menuId){
	var jqueryMenuIndex = 0;
	$("#leftMenuAccordion h3").each(function(index){
		if($(this).attr('id')==menuId){
			jqueryMenuIndex = index;
		}
	});
	$("#leftMenuAccordion").accordion("option", "active", jqueryMenuIndex);
}

// 업로드 이미지 상세보기 팝업
var popup;
$(document).delegate('#imageLink', 'click', function(){		
	if(popup){
		popup.close();
	}
	var popUrl = fnGetUrl('/file/popupImageView?IMAGE_FILE_URL='+$(this).attr('url'));	//팝업창에 출력될 페이지 URL
	popOption = "width=450, height=400, resizable=yes, scrollbars=auto, status=no;";    //팝업창 옵션(optoin)
	popup = window.open(popUrl, "", popOption);
});