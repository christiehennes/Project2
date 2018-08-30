import {isLoggedIn} from './Functions/checkLogin.js';


$(document).ready(function() {

    let currentUser; //Create a local variable to hold the curren logged in user

    //Check to see if a user is logged in. If they are, get their user info. If not, redirect to the login page
    isLoggedIn(function(){
        console.log("inside newproduct, a user is logged in");
        $('#user-icon').data("status", "loggedIn");

        $.ajax('/me', {
            method: 'GET'
          }).then(function(user){

            currentUser = user;
            return;
        }).fail(function(err){
            window.location = '/login'

        }); 
    })
         
    
    // Click handler for submit button
    $(document).on('click', '#submit-button', function(){
        console.log("button was clicked");

    //Get all the fields from the different forms on the page
    let name = $('#product-name').val().trim();
    let category = $('#product-category').val();
    let description = $('#product-description').val();
    let image = $('#product-image').val();
    let location = $('#product-location').val();
    let dateAvail = $('#product-date-available').val();
    let price = $('#product-price').val();
    let timeAmt = $('#product-time-amount').val();
    let timeInterval = $('#product-time-interval').val();

    //TODO: Rami: perform validation to make sure they are all valid

    //Perform post to DB (only if a user is logged in)
    $.ajax('/api/addProduct', 
    {
        method: 'POST',
        data: { 
            name: name,
            description: description,
            image_url: image,
            location: location,
            category: category,
            date_available: dateAvail,
            price: price,
            period_requested: timeAmt,
            time_unit: timeInterval,
            OwnerId: currentUser.id
        }
    }).then(function(err){

        // if (err) throw err;

        console.log("new product added");
        $('#modal').modal('show');

    })


    })




});