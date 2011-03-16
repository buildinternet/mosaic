/*
	Mosaic - Sliding Boxes and Captions jQuery Plugin
	Version 1.0
	www.buildinternet.com/project/mosaic
	
	By Sam Dunn / One Mighty Roar (www.onemightyroar.com)
	Released under MIT License / GPL License
*/

(function($){

	//Mosaic
	$.fn.mosaic = function(options) {
	
		var base = this;
		
		//Default settings
		var settings = {
		
			animation	:	'fade',		//1-Fade, 2-Slide
			speed		:   150,		//Animation speed
			opacity		:	1,			//Opacity for overlay (0-1) *Fade animation only
			preload		:	1,			//Fade in overlay and backdrop when loaded
			anchor_x	:	'left',		//Horizontal anchor (left or right)
			anchor_y	:	'bottom',	//Vertical anchor (top or bottom)
			hover_x		:	'0px',		//Horizontal position on hover
			hover_y		:	'0px'		//Vertical position on hover
			
    	};
		
		//Default elements
		var element  = '.mosaic-block';		//Mosaic container
		var overlay  = '.mosaic-overlay';	//Mosaic overlay
		var backdrop = '.mosaic-backdrop';	//Mosaic backdrop
		
		//Combine options with default settings
		if (options){
			var options = $.extend(settings, options);
		}else{
			var options = settings;	
		}
		
		//Hide until window loaded, then fade in
		if (options.preload){
			$(backdrop, base).hide();
			$(overlay, base).hide();
		
			$(window).load(function(){
				//IE transparency fade fix
				if(options.animation == 'fade' && $(overlay, base).css('opacity') == 0 ) $(overlay, base).css('filter', 'alpha(opacity=0)');
				
				$(overlay, base).fadeIn(200, function(){
					$(backdrop, base).fadeIn(200);
				});
				
				allowHover();
			});
		}else{
			$(backdrop, base).show();
			$(overlay, base).show();
			allowHover();
		}
		
		function allowHover(){
			//Select animation
			switch(options.animation){
			
				//Handle fade animations
				case 'fade':
					$(base).hover(function () {
			        	$(overlay, base).stop().fadeTo(options.speed, options.opacity);
			        },function () {
			        	$(overlay, base).stop().fadeTo(options.speed, 0);
			      	});
			      	
			    	break;
			    
			    //Handle slide animations
	      		case 'slide':
	      			//Grab default overlay x,y position
					startX = $(overlay, base).css(options.anchor_x) != 'auto' ? $(overlay, base).css(options.anchor_x) : '0px';
					startY = $(overlay, base).css(options.anchor_y) != 'auto' ? $(overlay, base).css(options.anchor_y) : '0px';;
	      			
			      	var hoverState = {};
			      	hoverState[options.anchor_x] = options.hover_x;
			      	hoverState[options.anchor_y] = options.hover_y;
			      	
			      	var endState = {};
			      	endState[options.anchor_x] = startX;
			      	endState[options.anchor_y] = startY;
			      	
					$(base).hover(function () {
			        	$(overlay, base).stop().animate(hoverState, options.speed);
			        },function () {
			        	$(overlay, base).stop().animate(endState, options.speed);
			      	});
			      	
			      	break;
			};
		}
	};
		
})(jQuery);


