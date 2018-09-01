
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
		let searchParam = $('#inpt_search').val();
		let searchCategory = $('#search-category').val();
		if (searchParam === '' && searchCategory === 'Select Category') {
			searchParam = 'all';
			window.location = `/search/${searchParam}`;
		}
		else if(searchCategory !== 'Select Category'){
			console.log(searchCategory);
			window.location = `/search/category/${searchCategory}`
		}else{
			window.location = `/search/${searchParam}`;
		}
	})


})


// where product_title like "%term%", put an index on it (??)