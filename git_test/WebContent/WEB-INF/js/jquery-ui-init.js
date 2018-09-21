/*!
 * Jquery UI init
 * Made by JHK
 */

$(document).ready(function() {
		
	$(document).tooltip({offset: [100, 500]});	 // tweak the position		   
	
	$(".accordion").accordion();	
	$(".button").button();
	$(".paging button span.ui-button-text").css('padding', '0px');	// paging button setting
	
	
	$(".radioset").buttonset();
	$("#tabs").tabs();
	$(".datepicker").datepicker({
		inline: true,
		dateFormat: 'yy/mm/dd',
		changeMonth: true,
		changeYear: true
	});

	
		
	$("#dialog").dialog({
		autoOpen: false,
		width: 400,
		buttons: [
			{
				text: "Ok",
				click: function() {
					$(this).dialog("close");
				}
			},
			{
				text: "Cancel",
				click: function() {
					$(this).dialog("close");
				}
			}
		]
	});

	// Link to open the dialog
	$("#dialog-link").click(function(event) {
		$("#dialog").dialog("open");
		event.preventDefault();
	});
	

	
	

	
	$("#progressbar").progressbar({
		value: 20
	});
	
	
	// Hover states on the static widgets
	$("#dialog-link, #icons li").hover(
		function() {
			$(this).addClass("ui-state-hover");
		},
		function() {
			$(this).removeClass("ui-state-hover");
		}
	);
	
	
	// 슬라이드 이미지 마우스 오버시 prev, next 버튼 보임
	$(".slideshowWrapper").hover(
		function() {
			$(this).find('#fssPrev, #fssNext').fadeIn('slow');
		},
		function() {
			$(this).find('#fssPrev, #fssNext').fadeOut('slow');
		}
	);
	
	
	// 화폐표기
	$('.isCurrency').currency({ region: 'KRW', decimals: 0 });
	$('.isCurrencyBlank').currency({ region: 'NONE', decimals: 0 });
	
	// 화폐표기 텍스트박스 처리(.isCurrency는 안됨)
	$(document).delegate('.isCurrencyBlank', 'focus', function(e){
		if($(this).prop('tagName')=='INPUT'){
			$(this).val($(this).val().replace(/[^(0-9)]/gi, '')); 
		}
	});
	$(document).delegate('.isCurrencyBlank', 'blur', function(e){
		if($(this).prop('tagName')=='INPUT'){
			$(this).val($(this).val().replace(/[^(0-9)]/gi, '')); 
			$(this).currency({ region: 'NONE', decimals: 0 });
		}
	});
	
	// html 컨텐츠(textarea) 줄바꿈 처리
	$('.htmlContent').each(function(i){
		$(this).html($(this).html().replace( /\n/gi, '<br//>'));
	});
	
	// multiple line 말줄임 표시
	$('.dotdotdot').dotdotdot();
	
	
	/** custom 콤보박스 이벤트 정의 **/
	// 콤보박스 선언
	$.fn.extend({
		customSelect: function(){
			$(this).find('ul li:eq(0)').addClass('first');
			
			if($(this).find('ul li.on').index()>-1){
				var selectedIndex = $(this).find('ul li.on').index();
				$(this).find('ul li:eq('+selectedIndex+')').addClass('non-extend');
				$(this).find('.custom-select-value').val($(this).find('ul li:eq('+selectedIndex+')').val()).trigger('change');
			}else{
				$(this).find('ul li:eq(0)').addClass('non-extend');
				$(this).find('ul li:eq(0)').addClass('on');
				$(this).find('.custom-select-value').val($(this).find('ul li:eq(0)').val()).trigger('change');
			}
		}
	});
		
	// 초기화
	$('.custom-select').each(function(e){
		$(this).customSelect();
	});
	$('.custom-select-disabled').each(function(e){
		$(this).customSelect();
	});
	
	// 콤보박스 선택시
	$(document).delegate('.custom-select', 'click', function(e){
		e.preventDefault();
		
		if( $(e.target).find('li').length > 1 ){
			// 열리지 않았을때
			if($('.custom-select ul li').hasClass('non-extend')){
				$('.custom-select ul li').removeClass('non-extend');
				$('.custom-select ul li').css('display', 'inline-block');
			}else{
				$('.custom-select ul li').css('display', 'none');
				$('.custom-select ul li').removeClass('non-extend');
				$('.custom-select ul li[value='+$(this).find('.custom-select-value').val()+']').addClass('non-extend');
			}
		}
	});
	
	// 옵션값 선택시
	$(document).delegate('.custom-select ul li', 'click', function(e){
		e.preventDefault();
		
		// 열리지 않았을때
		if($('.custom-select ul li').hasClass('non-extend')){
			$('.custom-select ul li').removeClass('non-extend');
			$('.custom-select ul li').css('display', 'inline-block');
		}else{
			// 콤보박스 닫힌 스타일 정의
			$('.custom-select ul li').css('display', 'none');
			$('.custom-select ul li').removeClass('non-extend');
			$(this).addClass('non-extend');
			
			// 선택여부 설정
			$('.custom-select ul li').removeClass('on');
			$(this).addClass('on');
			$(this).parents('.custom-select').find('.custom-select-value').val($(this).val()).trigger('change');
		}
	});
	/** custom 콤보박스 이벤트 정의 **/
	
	// MS IE placeholder 적용
	$('input[placeholder]').placeHolder();

});
