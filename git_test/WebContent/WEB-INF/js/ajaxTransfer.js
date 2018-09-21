//don't remove..
var busyImage = 	'';	//'<img src="/resource/images/busy.gif" />';


/*----------------------------------------------------------------------------------------------------------------------
Model Object Library
------------------------------------------------------------------------------------------------------------------------*/
function Model(){
	this.url = '';							// request url
	this.parameters = [];			// sending parameter
	this.data = null;					// form parameter
	this.method = 'POST';			// method type
	this.type = 'json';				// data type
	this.blockId = '';					// block element id
	this.blockType = 'small';		// block image(small:big)
	this.appendProperties = '';		
	this.columns = "";
	this.formId = "";					// form id(multipart)
	this.errorMsg = "";				// error message
	this.callback = null;				// callback function
	this.useAsync = true;			// sync, Async mode
}
/*---------------------------------------------------------------------------------------------------------------------
Ajax Library 
---------------------------------------------------------------------------------------------------------------------*/
function AjaxTransfer(){}

//$(document).ajaxStop($.unblockUI); 

/*-------------------------------
 * Blocking Handling..
 -------------------------------*/	
AjaxTransfer.prototype.requestAsync= function(model){
	if(!model.url){
		alert('invalid url.');
		return;
	}
	
	// JSON_YN은 SessionController에서 세션 없을시 리턴으로 json으로 넘길지, 로그인페이지 이동할지 결정하는데 사용 
	var paramData = "JSON_YN=Y&"+$.param(model.parameters) + model.appendProperties;
	if(model.data!=null && model.data!=''){
		paramData += '&' + model.data;
	}

	$.ajax({
	    url: model.url,
	    type: model.method,
	    async: model.useAsync,
	    data: paramData + "&CURR_URL="+getAbsolutePath(),
	    dataType: model.type,
	    beforeSend : function(){
	    	fnBlockUI(model.blockId, model.blockType);
	    },
	    error: function(x,e){
	    	if(model.errorMsg != ''){
		    	alert(model.errorMsg);
	    	}else{
	    		//alert("System is experiencing some difficulty in carrying\n"+
	    		//		"out your request due to sudden load of traffic.\n"+
	    		//		"Please try again. Thank you for your understanding...");
	    		if(x.status==0){
	    			//alert('You are offline!!n Please Check Your Network.');
	    		}else if(x.status==404){
	    			alert('Requested URL not found.');
	    		}else if(x.status==500){
	    			alert('Internel Server Error.');
	    		}else if(e=='parsererror'){
	    			alert('Error.nParsing JSON Request failed.');
	    		}else if(e=='timeout'){
	    			alert('Request Time out.');
	    		}else {
	    			alert('Unknow Error.n'+x.responseText);
	    		}
	    	}
	    	
	    	fnUnBlockUI(model.blockId);
	    },
	    global: false,
	    success: function(response){
	    	
	    	if(model.type == "json"){
	    		var data = response;
	    		if(data == null) return;
	    		
	    		//no session
	    		if(data.code == '119'){
	    			fnLoginPage();
	    			return;
	    		}
	    		
	    		if(typeof data.msg === 'undefined'){
	    			data.msg = '';
	    		}
	    		
	    		if(data.result == "true" || data.result == "ok"){
	    			model.callback(data);
	    		}else if(data.result == "false" || data.result == "no"){

	    			//alert(data.msg);
	    			model.callback(data); 
	    			//return;
	    		}
	    	}else {
	    		model.callback(response.xml);
	    	}	    		
	    },	    
	    complete:function(){	
	    	fnUnBlockUI(model.blockId);
	    }
	});
};

// Sync mode
AjaxTransfer.prototype.requestSync= function(model){
	if(!model.url){
		alert('invalid url.');
		return;
	}
	
	// JSON_YN은 SessionController에서 세션 없을시 리턴으로 json으로 넘길지, 로그인페이지 이동할지 결정하는데 사용 
	var paramData = "JSON_YN=Y&"+$.param(model.parameters) + model.appendProperties;
	if(model.data!=null && model.data!=''){
		paramData += '&' + model.data;
	}
	
	var resultData = [];
	$.ajax({
		url		: model.url,
	    type	: model.method,
	    async	: model.useAsync,
	    data	: paramData + "&CURR_URL="+getAbsolutePath(),
	    dataType: model.type,	    
	    success: function(data) {
	    	//no session
	    	if(data.code == '119'){
	    		fnLoginPage();
    			return;
    		}
	    	
	    	if(typeof data.msg === 'undefined'){
    			data.msg = '';
    		}
		
        	resultData = data;
		},
		beforeSend : function(){
			fnBlockUI(model.blockId, model.blockType);
	    },
	    error: function(x,e){
	    	if(model.errorMsg != ''){
		    	alert(model.errorMsg);
	    	}else{
	    		//alert("System is experiencing some difficulty in carrying\n"+
	    		//		"out your request due to sudden load of traffic.\n"+
	    		//		"Please try again. Thank you for your understanding...");
	    		if(x.status==0){
	    			//alert('You are offline!!n Please Check Your Network.');
	    		}else if(x.status==404){
	    			alert('Requested URL not found.');
	    		}else if(x.status==500){
	    			alert('Internel Server Error.');
	    		}else if(e=='parsererror'){
	    			alert('Error.nParsing JSON Request failed.');
	    		}else if(e=='timeout'){
	    			alert('Request Time out.');
	    		}else {
	    			alert('Unknow Error.n'+x.responseText);
	    		}
	    	}
	    	
	    	fnUnBlockUI(model.blockId);
	    },
	    global: false,
	    complete:function(){	
	    	fnUnBlockUI(model.blockId);
	    }
	});
	return resultData;
};

// Multipart AnSync Mode
AjaxTransfer.prototype.requestMultipartAsync= function(model){

	// form 객체 바인딩
	var form = document.getElementById(model.formId);
    var formData = new FormData(form);

	if(!model.url){
		alert('invalid url.');
		return;
	}

	$.ajax({
		url: model.url,
	    type: model.method,
	    async: false,
	    cache: false,
	    processData: false,
        contentType: false,
	    data: formData,
	    dataType: model.type,
	    beforeSend : function(){
	    	fnBlockUI(model.blockId, model.blockType);
	    },
	    error: function(x,e){
	    	if(model.errorMsg != ''){
		    	alert(model.errorMsg);
	    	}else{
	    		//alert("System is experiencing some difficulty in carrying\n"+
	    		//		"out your request due to sudden load of traffic.\n"+
	    		//		"Please try again. Thank you for your understanding...");
	    		if(x.status==0){
	    			//alert('You are offline!!n Please Check Your Network.');
	    		}else if(x.status==404){
	    			alert('Requested URL not found.');
	    		}else if(x.status==500){
	    			alert('Internel Server Error.');
	    		}else if(e=='parsererror'){
	    			alert('Error.nParsing JSON Request failed.');
	    		}else if(e=='timeout'){
	    			alert('Request Time out.');
	    		}else {
	    			alert('Unknow Error.n'+x.responseText);
	    		}
	    	}
	    	
	    	fnUnBlockUI(model.blockId);
	    },
	    global: false,
	    success: function(response){
	    	
	    	if(model.type == "json"){
	    		var data = response;
	    		if(data == null) return;
	    		
	    		//no session
	    		if(data.code == '119'){
	    			fnLoginPage();
	    			return;
	    		}
	    		
	    		if(typeof data.msg === 'undefined'){
	    			data.msg = '';
	    		}
	    		
	    		if(data.result == "true" || data.result == "ok"){
	    			model.callback(data);
	    		}else if(data.result == "false" || data.result == "no"){

	    			//alert(data.msg);
	    			model.callback(data); 
	    			//return;
	    		}
	    	}else {
	    		model.callback(response.xml);
	    	}	    		
	    },	    
	    complete:function(){	
	    	fnUnBlockUI(model.blockId);
	    }
	    
	});
};

AjaxTransfer.updatePage = function(page,parameters,targetId, callbackFn){
	$("#" + targetId).parent().block();
	$.post( page,
			parameters,
			function(resultData){		
				$('#' + targetId).html(resultData);
				$('#' + targetId).parent().unblock();
				if(callbackFn) callbackFn.call();
			}
	);
	
	/*
	$.get( page,
			function(resultData){		
				//alert(resultData);
				$('#' + targetId).html(resultData);				
			}
		);*/
	//$('#' + targetId).unblock();
};


function ServiceController(){}

ServiceController.prototype.execute = function(model){
	var ajax = new AjaxTransfer();	
	if(model.useAsync) ajax.requestAsync(model);
	else				return ajax.requestSync(model);
};

ServiceController.prototype.executeMultipart = function(model){
	var ajax = new AjaxTransfer();	
	ajax.requestMultipartAsync(model);
};


function AjaxSimpleSubmit(url){
	var model = new Model();
	model.type = 'json'; 				//모델 유형
	model.method = 'POST'; 		//메소드 유형
	model.blockId = ''; 				//loading block target('':공백입력시 미사용, 'window':화면전체, '#id' or '요소': 특정 객체)
	model.useAsync = false; 		//Async모드 사용유무
	model.errorMsg = '';				//ajax 에러 메시지
	model.url = url; //요청 URL
	
	var ajax = new AjaxTransfer();	
	return ajax.requestSync(model);
};

function AjaxJsonpSubmit(url){
	var model = new Model();
	model.type = 'jsonp';				//모델 유형
	model.method = 'POST'; 		//메소드 유형
	model.blockId = ''; 				//loading block target('':공백입력시 미사용, 'window':화면전체, '#id' or '요소': 특정 객체)
	model.useAsync = false; 		//Async모드 사용유무
	model.errorMsg = '';				//ajax 에러 메시지
	model.url = url; //요청 URL
	
	var ajax = new AjaxTransfer();	
	return ajax.requestSync(model);
};


// 로딩중 화면(loading block) 보이기
function fnBlockUI(blockId, blockType){
	// 전체영역
	if(blockId == 'window'){
		if(blockType == 'small') $.blockUI({theme : true}); 
		else $.blockUI();
	}else if(blockId !=''){
		if(blockType == 'small') $(blockId).block({theme : true}); 
		else $(blockId).block();
	}
}

//로딩중 화면(loading block) 숨기기
function fnUnBlockUI(blockId){
	// 전체영역
	if(blockId == 'window'){
		$.unblockUI();
	}else if(blockId != ''){
		$(blockId).unblock();
	}
}


// 절대 경로 가져오기
function getAbsolutePath() {
    var loc = window.location;
    return loc.pathname;
}
