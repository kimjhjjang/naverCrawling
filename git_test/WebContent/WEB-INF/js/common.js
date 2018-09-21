/*!
 * Common javascript
 * Made by JHK
 */

/**
 * 공통 선언 함수(초기화 되는 함수)
 */
$(document).ready(function() {
	
	
	/**
	 * 문자열 길이제한 체크 : 사이트의 html 구조에 맞게 재정의
	 */
	$('span.lmt').each(function(){
		// class="textLimitWrap"
		// <font class="limitMaxLength">200</font>
		
		var maxLimitLength = Number($(this).find('.limitMaxLength').html());
		var $objCurrLength = $(this).find('em');
		$obj = $('[name='+$(this).prev().attr('name')+']');
		
		$obj.bind('input keyup paste blur', function(e){
			var currLength = fnCalculateTextByte($(this).val());
			
			// 최대입력수 초과시
			if(currLength>maxLimitLength){
				// 자르기
				$(this).val(fnCutStringByte($(this).val(), maxLimitLength));
				currLength = maxLimitLength;
			}
			
			$objCurrLength.html(currLength);
	    });
	});
	
});



/********************* 공통 함수 선언 시작 *********************/

/**
 * 공통 로그인 함수 
 */
function fnLoginPage(){
	alert('common.js 파일의 fnLoginPage() 함수에 로그인함수를 구현하세요.');
}

/**
 * 목록조회 후 초기화 항목 적용 : 필요한 항목 발생시 추가
 */
function fnSearchAfterInit(){
	
	// 화폐표기
	$('.isCurrencyBlank').currency({ region: 'NONE', decimals: 0 });
	
	// 화폐표기 텍스트박스 처리
	$('.isCurrency, .isCurrencyBlank').bind('focus', function(e){
		if($(this).prop('tagName')=='INPUT'){
			$(this).val($(this).val().replace(/[^(0-9)]/gi, '')); 
		}
	});
	$('.isCurrency, .isCurrencyBlank').bind('blur', function(e){
		if($(this).prop('tagName')=='INPUT'){
			$(this).val($(this).val().replace(/[^(0-9)]/gi, '')); 
			$('.isCurrencyBlank').currency({ region: 'NONE', decimals: 0 });
		}
	});
	
	
}