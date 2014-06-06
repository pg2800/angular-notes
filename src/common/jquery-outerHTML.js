if(jQuery){
	jQuery.fn.outerHTML = function() {
		var $t = $(this);
		return $t[0].outerHTML || $t.clone().wrap('<div/>').parent().html()
	};
}