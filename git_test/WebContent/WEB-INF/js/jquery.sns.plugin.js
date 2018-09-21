/* ****************************************************************
 * jQuery SNS Plugin 
 * Created By Young Ho
 * Ver  : 1.0
 * Date : 2011-02
 ******************************************************************/ 

(function($){
$.fn.snsPlugIn = function(options) {
	var defaults = {
		top: 0,
		left: 0,
		width: 300,                                                                        
		height: 200,                                                                       
		title: "SNS",
		resizeable: "yes",
		scrollbars: "yes",
		toolbars:"no",
		status:"no",
		menu:"no",
		mode : "center"
	};
	
	options = $.extend(defaults, options);
	
	snsPopHelper = function(o){
		
		var url = location.href;	//var url = encodeURIComponent($(o).find('image').attr('title'));
		var sns = $(o).attr('name');
		var name = o.attr('snsTitle');  // document.title;
		var link = "";
		var opt = "";
		
		// 사용자 정의 url
		if($(o).attr('url')){
			url = $(o).attr('url'); 
		}
		if($(o).attr('addUrl')){
			url += $(o).attr('addUrl'); 
		}
	
		switch ( sns ) {
		
			case 'twitter'	:
							options.width = 550;
							options.height = 450;
							init();
							link = "http://twitter.com/share?url=" + url + "&text=" + encodeURIComponent ( name );
							opt = 'width='+options.width+',height='+options.height+',top='+options.top+',left='+options.left+',resizable='+options.resizeable+',scrollbars='+options.scrollbars;
							opt+= ',toolbars='+options.toolbars+',status='+options.status+',menu='+options.menu;
							break;
			case 'facebook'	:
							options.width = 1000;
							options.height = 550;
							init();
							link = "http://www.facebook.com/sharer.php?u=" + url + "&t=" + encodeURIComponent ( name );
							opt = 'width='+options.width+',height='+options.height+',top='+options.top+',left='+options.left+',resizable='+options.resizeable+',scrollbars='+options.scrollbars;
							opt+= ',toolbars='+options.toolbars+',status='+options.status+',menu='+options.menu;
							break;
			case 'm2day'	:
							options.width = 1000;
							options.height = 500;
							init();
							link = "http://me2day.net/posts/new?new_post[body]="+encodeURIComponent('\"'+name+'\"')+":"+url;
							opt = 'width='+options.width+',height='+options.height+',top='+options.top+',left='+options.left+',resizable='+options.resizeable+',scrollbars='+options.scrollbars;
							opt+= ',toolbars='+options.toolbars+',status='+options.status+',menu='+options.menu;
							break;
			case 'yozm'		:
							options.width = 490;
							options.height = 400;
							init();
							link = "http://yozm.daum.net/api/popup/post?prefix="+encodeURIComponent('\"'+name+'\"')+":"+url;
							opt = 'width='+options.width+',height='+options.height+',top='+options.top+',left='+options.left+',resizable='+options.resizeable+',scrollbars='+options.scrollbars;
							opt+= ',toolbars='+options.toolbars+',status='+options.status+',menu='+options.menu;
							break; 
		}
		snsPopOpener(link, sns , opt);
	};
	
	init = function(){
		if(options.mode == "center"){ 
	    	options.left = (screen.width - options.width) / 2;
			options.top = (screen.height - options.height) / 2;
		}
		
		if(options.mode == "left"){
			options.left = 0;
		}
		
		if(options.mode == "right"){
			options.left = screen.width;
		}		
	};
	
	snsPopOpener = function(url, tit, opt) {
		win = window.open(url, tit, opt);
		if (parseInt(navigator.appVersion) >= 4) { 
			win.focus(); 
		}	
    };
        
	return this.each(function() {
		var o = $(this);
		$(o).bind('click',function(e){
			if(e) e.preventDefault();
			snsPopHelper(o);
		});
	});
};
})(jQuery);
