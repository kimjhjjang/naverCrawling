/* remade by jhk*/

// MS IE placeholder 적용
$.fn.placeHolder = function () {

	// IE 10 이하
	if($.browser.msie && parseInt($.browser.version)<10){
		
		this.each(function() {
			
			if(!$(this).hasClass('pwPlaceholder')){
				if($(this).attr('type')=='password'){
					$(this).pwPlaceHolder();
				}else{
					$(this).textPlaceHolder();
				}
			}
		
		});
		
	}

};

// 텍스트 상자
$.fn.textPlaceHolder = function () {
	var $input = $(this);
	var inputTextColor = $input.css('color');
	if(inputTextColor=='#999'){ inputTextColor = '#666'; }
	
	// placeholder 적용
	if ($input.val() == '' || $input.val() == $input.attr('placeholder')) {
		$input.val($input.attr('placeholder'));
		$input.addClass('placeholder');
	}
	
	// 선택시 placeholder 비활성
	$input.focus(function(){
		if ($input.val() == $input.attr('placeholder')) {
			$input.val('');
			$input.removeClass('placeholder');
			$input.css('color', inputTextColor);
		}
	});
	
	// 선택해제시 placeholder 활성
	$input.blur(function(){
		if ($input.val() == '' || $input.val() == $input.attr('placeholder')) {
			$input.val($input.attr('placeholder'));
			$input.addClass('placeholder');
		}
	});
};

// 암호 입력창
$.fn.pwPlaceHolder = function () {
	var $input = $(this);
	
	// 이미 적용되어 있는 경우에는 복원 후 다시 생성
	if($input.parent().hasClass('pwPlaceholderWrap')){
		$(this).parent().find('.pwPlaceholder').remove();
		$(this).unwrap();
	}
	
    $(this).wrap('<div style="position: relative;" class="pwPlaceholderWrap"></div>');
    var $fake = $($(this).outerHTML().replace(/password/gi, 'text')).insertAfter($(this));
    $fake.val($(this).attr('placeholder'));
    $fake.addClass('pwPlaceholder');
    $fake.removeAttr('id');
    $fake.removeAttr('name');
    
    if($(this).val() == "") {
    	$fake.show();
    }
    
    $fake.focus(function(){
    	$fake.hide();
    	$input.focus();
    });
    $(this).focus(function(){
    	$fake.hide();
    });
    $(this).blur(function(){
    	if($input.val() == "") {
    		$fake.show();
    	}
    });
};