/**
Copyright by @AnshBIkram

*/

(function($){
	$.fn.makeAB = function(optns)
		{
			//alert(optns.speed);
			var child = this.children('img');
			var length = child.length;//finding out no of images to do the loop
			if(length < 2)
				return false;
			this.css({overflow : 'hidden'});//hiding the images those will lie out of border of parent
			var height = this.height();
			var width = this.width();
			child.css({position : 'absolute', top : '0', left : '0', marginTop : '0', height : height, width : width, display : 'none', zIndex : 14});// here though overflow is hidden but display is none for IE n mozzila. Reset.css may solve this without using display:none. 
			// child.each(function(){this may be used in case image can't be resized a/c to our wish. But i'hv not used this for now.
				// var h = $(this).height();
				// var w = $(this).width();
				// $(this).css({marginLeft : (width - w) / 2 + 'px'});
			// });
			var str = 0;//setting starting index changer
			var cur = child[0];// setting intial tile to animate
			var prev = child[length-1];// setting this as the prev animated tile
			var dir = true;// setting the direction changer
			var speed = 3000 + parseInt(Math.random() * 6000);//setting initial random value between 3s to 9s
			$(prev).css({display : 'block', zIndex : '15'});
			var tile = setInterval(function(){
					speed = 3000 + parseInt(Math.random() * 6000);//setting intermediate random value between 3s to 9s
					$(prev).css({zIndex : '15'});
					if(dir)
					{
						value = height;
						dir = false;
					}
					else
					{
						value = -height;
						dir = true;
					}
					$(cur).css({marginTop : value, display : 'block', zIndex : '16'});
					$(cur).animate({marginTop : 0},800,'easeOutExpo',function(){
						$(prev).css({display : 'none',zIndex : '14'});
						prev = cur;
						cur = child[(str + 1 ) % length];
						str++;
					});
				},speed);
			
		}



})(jQuery);