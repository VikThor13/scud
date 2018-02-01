(function( $ ) {
	jQuery.fn.textResize = function(sSelector) {
		$(this).addClass("state-1");
		var iClick = 0;
		$(this).click(function(){
			if (iClick < 2)
			{
				iClick++;
				if (iClick == 1)
				{
					$(this).removeClass("state-1").addClass("state-2");
				}
				if (iClick == 2)
				{
					$(this).removeClass("state-2").addClass("state-3");
				}
				var currentFontSize = $(sSelector).css('font-size');
				var currentFontSizeNum = parseFloat(currentFontSize);
				var newFontSize = currentFontSizeNum * 1.2;
				$(sSelector).css('font-size', newFontSize);
			}
			else
			{
				$(this).removeClass("state-3").addClass("state-1");
				$(sSelector).css('font-size', 16);
				iClick = 0;
			}
			return false;
		});
	};
})(jQuery);