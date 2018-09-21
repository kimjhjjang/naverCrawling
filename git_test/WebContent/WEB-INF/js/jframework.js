/*!
 * Common javascript
 * Based in jQuery
 * Made by JHK
 */


/**
 * 일반 form submitter
 */
function fnFormSubmit(method, formId, actionUrl, multiPartYn){
	if(multiPartYn!='Y'){
		$('#'+formId).removeAttr('enctype');
	}
	$('#'+formId).attr({
		action : actionUrl,
		method : method
	}).submit();		
}


/**
 * 입력 유효성 검사 : 폼전체를 attribute로 검사
 * 사용방법 : validation="required" 인 항목만 검사하며 필요에 따라서 최소값과 최대값을 설정한다.
 *              <input type="text" validation="required" minlength="5" maxlength="10"/> 
 * @param formId : 체크할 폼 id
 */
function fnValidationForm(formId){
	
	var isValidate = true;
	var messageTail = '입력해 주시기 바랍니다.';
	var messageTailInput = '을(를) '+messageTail;
	var messageTailSelect = '을(를) 선택해 주시기 바랍니다.';
		
	var $target;
	if(typeof formId !== 'undefined' && formId != ''){
		$target = $('#'+formId+' [validation=required]');
	}else{
		$target = $('[validation=required]');
	}
	
	$target.each(function(idx){
		
		// 비활성된 객체는 제외
		if($(this).attr('disabled')){
			return true; // continue;
		}
		
		var targetTitle = ($(this).parents('td, th').first().prev().html()).replace('<em>*</em> ', '').replace('<em>*</em>', '');
		
		// 라디오버튼, 체크박스
		if($(this).attr('type')=='radio' || $(this).attr('type')=='checkbox'){
			if($('input[name='+$(this).attr('name')+']:checked').val()==''){
				fnShowMessage(targetTitle+messageTailSelect);
				isValidate = false;
				return false;
			}
		}

		// 콤보박스
		else if($(this).prop('tagName')=='SELECT'){
			if($(this).val()==''){
				fnShowMessage(targetTitle+messageTailSelect);
				isValidate = false;
				return false;
			}
		}
		// 텍스트
		else if($(this).prop('tagName')=='INPUT' || $(this).prop('tagName')=='TEXTAREA'){
			var minLength = $(this).attr('minlength');
			var maxLength = $(this).attr('maxlength');
			if(isNaN(minLength)){
				minLength = 0;
			}
			if(isNaN(maxLength)){
				maxLength = 5000;
			}
			
			if($(this).val()==''){
				fnShowMessage(targetTitle+messageTailInput);
				$(this).focus();
				isValidate = false;
				return false;
			}
			
			if($(this).val().length<minLength || $(this).val().length>maxLength){
				if(minLength>0){
					if(minLength==maxLength){
						fnShowMessage(targetTitle+'을(를) '+maxLength+'자로 '+messageTail);
					}else if(maxLength!=5000){
						fnShowMessage(targetTitle+'을(를) '+minLength+'~'+maxLength+'자 이내로 '+messageTail);
					}else{
						fnShowMessage(targetTitle+'을(를) 최소 '+minLength+'자 이상 '+messageTail);
					}
				}else{
					fnShowMessage(targetTitle+'을(를) 최대 '+maxLength+'자 이내로 '+messageTail);
				}
				$(this).focus();
				isValidate = false;
				return false;
			}
		}
		//console.log($(this).prop('tagName')))
		
	});
	return isValidate;
}

/**
 * 입력 유효성 검사 : 개별 검사
 */
function fnValidation(objId, minLength, maxLength, title){	
	var $obj = $('#'+objId);
	if(typeof title==='undefined' || title==''){
		$obj.attr('title') ? title = $obj.attr('title') : title = $obj.parents('td').first().prev().html();
	}
	
	// 비활성된 객체는 제외
	if($obj.attr('disabled')){
		return true;
	}
	
	if($obj && $obj.val()==''){
		if($obj.prop('tagName')=='SELECT' || $obj.attr('type')=='radio' || $obj.attr('type')=='checkbox'){
			alert(title+'을(를) 선택해 주시기 바랍니다.');
		}else{
			alert(title+'을(를) 입력해 주시기 바랍니다.');
		}
		$obj.focus();
		return false;
	}
	
	if(typeof minLength!=='undefined' && minLength!=0 && $obj.val().length<minLength){
		alert(title+'을(를) 최소 '+minLength+'자 이상 입력해 주시기 바랍니다.');
		$obj.focus();
		return false;
	}
	
	if(typeof maxLength!=='undefined' && maxLength!=0 && $obj.val().length>maxLength){
		alert(title+'을(를) '+maxLength+'자 이내로 입력해 주시기 바랍니다.');
		$obj.focus();
		return false;
	}
	return true;
}

/**
 * 데이터 유형 유효성 검사
 * 숫자만 입력가능
 */
$(document).delegate(".numericOnly", 'input keyup', function (e) {
    this.value = this.value.replace(/[^0-9]/g,'');
});

/**
 * 데이터 유형 유효성 검사
 * 영문만 입력가능
 */
$(document).delegate(".alphaOnly", 'input', function (e) { 
    this.value = this.value.replace(/[^a-zA-Z]/g,'');
});

/**
 * 데이터 유형 유효성 검사
 * 한글만 입력가능
 */
$(document).delegate(".korOnly", 'keyup blur', function (e) {
    this.value = this.value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g,'');
});

/**
 * 데이터 유형 유효성 검사
 * 숫자+영문만 입력가능
 */
$(document).delegate(".numAlphaOnly", 'input', function (e) { 
    this.value = this.value.replace(/[^a-zA-Z0-9]/g,'');
});

/**
 * 데이터 유형 유효성 검사
 * 숫자+한글만 입력가능
 */
$(document).delegate(".numKorOnly", 'keyup blur', function (e) { 
    this.value = this.value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ0-9]/g,'');
});

/**
 * 데이터 유형 유효성 검사
 * 영문+한글만 입력가능
 */
$(document).delegate(".alphaKorOnly", 'keyup blur', function (e) { 
    this.value = this.value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z]/g,'');
});


/**
 * 팝업처리
 */
var popup;
function fnPopup(URL, PARAM, WIDTH, HEIGHT, FORM){
	if(popup){
		popup.close();
	}
	if(typeof WIDTH==='undefined' || WIDTH==''){
		WIDTH = '500';
	}
	if(typeof HEIGHT==='undefined' || HEIGHT==''){
		HEIGHT = '350';
	}
	var popUrl = fnGetUrl(URL+'?'+PARAM);	//팝업창 URL
	popOption = "width="+WIDTH+", height="+HEIGHT+", resizable=no, scrollbars=no, status=no;";    //팝업창 옵션(optoin)
	
	if(typeof FORM==='undefined' || FORM==''){
		popup = window.open(popUrl, "", popOption);
	}else{
		popup = window.open("", "popup", popOption);
		FORM.attr({
			method : 'post',
			target : 'popup',
			action : popUrl
		}).submit();
	}
};
var popup2;
function fnPopup2(URL, PARAM, WIDTH, HEIGHT, FORM){
	if(popup2){
		popup2.close();
	}
	if(typeof WIDTH==='undefined' || WIDTH==''){
		WIDTH = '500';
	}
	if(typeof HEIGHT==='undefined' || HEIGHT==''){
		HEIGHT = '350';
	}
	var popUrl = fnGetUrl(URL+'?'+PARAM);	//팝업창 URL
	popOption = "width="+WIDTH+", height="+HEIGHT+", resizable=no, scrollbars=no, status=no;";    //팝업창 옵션(optoin)
	
	if(typeof FORM==='undefined' || FORM==''){
		popup2 = window.open(popUrl, "", popOption);
	}else{
		popup2 = window.open("", "popup2", popOption);
		FORM.attr({
			method : 'post',
			target : 'popup2',
			action : popUrl
		}).submit();
	}
};


/**
 * 콤보박스 생성
 */
function fnGetCombo(comboId, data, useTitleText){
	if(typeof useTitleText!=='undefined' && useTitleText!=''){
		$('#'+comboId).html('<option value="">'+useTitleText+'</option>');
	}else{
		$('#'+comboId).html('');	
	}
	
	if (data.length > 0) {
		for(var i=0;i<data.length; i++){
			$('#'+comboId).append('<option value="'+data[i].value+'">'+data[i].text+'</option>');
		}
	}
}


/**
 * 날짜관련 정의
 */
Date.prototype.monthNames = [
                             "January", "February", "March",
                             "April", "May", "June",
                             "July", "August", "September",
                             "October", "November", "December"
                         ];
Date.prototype.getMonthName = function() {
	return this.monthNames[this.getMonth()];
};
Date.prototype.getShortMonthName = function () {
	return this.getMonthName().substr(0, 3);
};

Date.prototype.dayNames = [
                             "Sunday", "Monday", "Tuesday",
                             "Wednesday", "Thursday", "Friday",
                             "Saturday"
                         ];
Date.prototype.getDayName = function() {
	return this.dayNames[this.getDay()];
};
Date.prototype.getShortDayName = function () {
	return this.getDayName().substr(0, 3);
};


//생년월일 콤보박스 생성(몇년전부터 보여줄지 지정)
function fnBindBirthDt(yearId, monthId, dayId, beforeYearLength) {
	BindYears(yearId, beforeYearLength);
	BindMonths(monthId);
	
    $("#"+monthId).on("change", function () {
        BindDays(yearId, monthId, dayId);
    });
    $("#"+yearId).on("change", function () {
        BindDays(yearId, monthId, dayId);
    });
    BindDays(yearId, monthId, dayId);
}

// 년도 콤보박스(몇년전부터 보여줄지 지정)
function BindYears(objId, beforeYearLength){
	var today = new Date();
	var thisYear = today.getFullYear();
	
	var yearDropDown = $("#"+objId);
	
	for(var i=0; i<beforeYearLength; i++){
		yearDropDown.append("<option value=" + thisYear + ">" + thisYear + "</option>");
		thisYear--;
	}
}

//년도 콤보박스(시작년도 지정)
function BindFixedYears(objId, startYear){
	var today = new Date();
	var thisYear = today.getFullYear();
	
	var yearDropDown = $("#"+objId);
	
	while(startYear<=thisYear){
		yearDropDown.append("<option value=" + thisYear + ">" + thisYear + "</option>");
		thisYear--;
	}
}
function BindFixedYears2(objId, startYear, selectedYear){
	var today = new Date();
	var thisYear = today.getFullYear();
	
	var yearDropDown = $("#"+objId);
	
	while(startYear<=thisYear){
		if(thisYear==selectedYear){
			yearDropDown.append('<option value=' + thisYear + ' selected="selected">' + thisYear + '</option>');
		}else{
			yearDropDown.append('<option value=' + thisYear + '>' + thisYear + '</option>');
		}
		
		thisYear--;
	}
}

// 월 콤보박스
function BindMonths(objId){
	var yearDropDown = $("#"+objId);
	for(var i=0; i<12; i++){
		var strMonth = i+1;
		if((i+1)<10){
			strMonth = '0'+(i+1);
		}
		yearDropDown.append("<option value=" + strMonth + ">" + (i+1) + "</option>");
	}
}

// 일 콤보박스
function BindDays(yearId, monthId, dayId) {
    var month = Number($("#"+monthId).val());
    var dayDropDown = $("#"+dayId);
    dayDropDown.empty();
    if (month == 2) {
        for (var i = 1; i <= 28; i++) {
        	if(i<10){
        		dayDropDown.append("<option value=0" + i + ">" + i + "</option>");
        	}else{
        		dayDropDown.append("<option value=" + i + ">" + i + "</option>");
        	}
        }
        var year = $("#"+yearId).val();
        if (parseInt(year) % 4 == 0) {
            dayDropDown.append("<option value='29'>29</option>");
        }
    }
    else if (month == 4 || month == 6 || month == 9 || month == 11) {
        for (var i = 1; i <= 30; i++) {
        	if(i<10){
        		dayDropDown.append("<option value=0" + i + ">" + i + "</option>");
        	}else{
        		dayDropDown.append("<option value=" + i + ">" + i + "</option>");
        	}
        }
    }
    else {
        for (var i = 1; i <= 31; i++) {
        	if(i<10){
        		dayDropDown.append("<option value=0" + i + ">" + i + "</option>");
        	}else{
        		dayDropDown.append("<option value=" + i + ">" + i + "</option>");
        	}
        }
    }
}


/**
 * 날짜 차이 계산
 */
function fnDateDiff(date1, date2) {
    var datediff = date1.getTime() - date2.getTime(); //store the getTime diff - or +
    return (datediff / (24*60*60*1000)); //Convert values to -/+ days and return value      
}


/**
 * 날짜 검색 범위 설정(기본 범위 설정)
 */
function fnSetSearchDateDefault($objFrom, $objTo){
	fnSetSearchDate($objFrom, $objTo, -30);	// 한달
}


/**
 * 날짜 검색 범위 설정
 */
function fnSetSearchDate($objFrom, $objTo, iAddDays){
	$objFrom.datepicker("setDate", Date.today().addDays(parseInt(iAddDays)));
	$objTo.datepicker("setDate", new Date());	// 오늘
}


/**
 * modal팝업 호출
 */ 
function fnModalOpen(objId, iWidth, iHeight){
	if(typeof iWidth==='undefined' || iWidth==''){
		iWidth = 340;
	}
	if(typeof iHeight==='undefined' || iHeight==''){
		iHeight = 380;
	}
	
	$.unblockUI();
	$('#'+objId).dialog({
		width: iWidth,
		height: iHeight,
		modal: true,
		title: $('#'+objId).attr('title'),
		focus: function(event, ui) { 
			$(".ui-dialog-titlebar-close").blur();	// close button 포커스 없애기
	    },
		open: function() {
			$('.ui-widget-overlay').off('click');
			$('.ui-widget-overlay').on('click', function() {
				$('#'+objId).dialog('close');
			});
			
			$('.dotdotdot').dotdotdot();	// multiline 말줄임표시
		}
	});
}


/**
 * modal팝업 호출(no title)
 */ 
function fnModalNoTitleOpen(objId, iWidth, iHeight){
	if(typeof iWidth==='undefined' || iWidth==''){
		iWidth = 340;
	}
	if(typeof iHeight==='undefined' || iHeight==''){
		iHeight = 380;
	}
	
	$.unblockUI();
	$('#'+objId).dialog({
		width: iWidth,
		height: iHeight,
		modal: true,
		dialogClass: 'noTitleStuff',
		focus: function(event, ui) { 
			$(".ui-dialog-titlebar-close").blur();	// close button 포커스 없애기
			$(".pop_close_btn a").blur();	// close button 포커스 없애기
			$(".close a").blur();	// close button 포커스 없애기
	    },
		open: function() {
			$('.ui-widget-overlay').off('click');
			$('.ui-widget-overlay').on('click', function() {
				var scrollTop = $(window).scrollTop();
				$('#'+objId).dialog('close');
				if(scrollTop!=$(window).scrollTop()){
					$(window).scrollTop(scrollTop);
				}
			});
			
			// 닫기 버튼 처리
			$(".pop_close_btn a").on('click', function() {
				$('#'+objId).dialog('close');
			});
			
			// title bar 제거
			//$('div[aria-describedby="'+objId+'"]').find('.ui-dialog-titlebar').css('display','none');
			
			$('.dotdotdot').dotdotdot();	// multiline 말줄임표시
			
			$('#'+objId+' input[placeholder]').placeHolder();
		}
	});
}


/**
 * 문자열 크기(byte) 계산
 * @param text
 * @returns {Number}
 */
function fnCalculateTextByte(text)
{
	var nbytes = 0;
	for (i=0; i<text.length; i++) {
		var ch = text.charAt(i);
		if(escape(ch).length > 4) {
			nbytes += 2;
		} else if (ch == '\n') {
			if (text.charAt(i-1) != '\r') {
		nbytes += 1;
			}
		} else if (ch == '<' || ch == '>') {
			nbytes += 4;
		} else {
			nbytes += 1;
		}
	}
	return nbytes;
}


/**
 * 문자열 byte로 자르기
 * @param str
 * @param limit
 * @returns
 */
function fnCutStringByte(str, limit){
	var l = 0;
	for (var i=0; i<str.length; i++) {
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
		if (l > limit) return str.substring(0,i);
	}
	return str;
}


/**
 * 메시지 출력
 * @param message
 * @param messageType
 */
function fnShowMessage(message, messageType){
	if(typeof messageType !== 'undefined' || messageType != ''){
		messageType = 'alert';
	}
	
	if(messageType=='alert'){
		alert(message);
	}
}


/**
 * 공통 선언 함수
 */
$(document).ready(function() {
	
	// 달력 유효성 검사
	$('.calendarValChk').each(function(i){
		var $objCalendarWrap = $(this);
		$(this).find('.datepicker').bind('change', function(i){
			if($objCalendarWrap.find('.datepicker').size()==2){
				var iDateFrom = parseInt(($objCalendarWrap.find('.datepicker').eq(0).val()).replace(/[^0-9]/g,''));
				var iDateTo = parseInt(($objCalendarWrap.find('.datepicker').eq(1).val()).replace(/[^0-9]/g,''));
				if(iDateFrom > iDateTo){
					// 시작일보다 종료일이 더 큰 경우 종료일을 시작일로 강제 수정
					alert('시작일을 종료일보다 크게 설정할 수 없습니다.');
					$objCalendarWrap.find('.datepicker').eq(1).val($objCalendarWrap.find('.datepicker').eq(0).val());
					return;
				}
			}
		});
	});
	
});