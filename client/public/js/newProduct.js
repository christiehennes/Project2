$(document).ready(function() {

    //Get all the fields from the different forms on the page
    let name = $('#product-name').val().trim();
    let category = $('#product-category').val();
    let description = $('#product-description').val();
    let image = $('#product-image').val();
    let location = $('#product-location').val();
    let price = $('#product-price').val();
    let timeAmt = $('#product-time-amount').val();
    let timeInterval = $('#product-time-interval').val();


    console.log("NAME: " + name);



    //TODO perform validation to make sure they are all valid

    //Perform post to DB





});