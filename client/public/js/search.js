
$(document).ready(function(){

	$("#inpt_search").on('focus', function () {
		$(this).parent('label').addClass('active');
	});
	
	$("#inpt_search").on('blur', function () {
		if($(this).val().length == 0)
			$(this).parent('label').removeClass('active');
	});


	// Click handlers
	$(document).on('click', '#submit-search', function(e){
			window.location = '/listProducts';
	})


})
