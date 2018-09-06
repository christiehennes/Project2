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
    $(document).on('click', '#submit-button', function(e){

        e.preventDefault();


        let newProd = [];
    //Get all the fields from the different forms on the page
    let name = $('#product-name').val().trim();
    newProd.push(name);

    let category = $('#product-category').val();
    newProd.push(category);

    let description = $('#product-description').val();
    newProd.push(description);

    let image = $('#product-image').val();
    newProd.push(image);

    let location = $('#product-location').val();
    newProd.push(location);

    let dateAvail = $('#product-date-available').val();
    newProd.push(dateAvail);

    let price = $('#product-price').val();
    newProd.push(price);

    let timeAmt = $('#product-time-amount').val();
    newProd.push(timeAmt);

    let timeInterval = $('#product-time-interval').val();
    newProd.push(timeInterval);

    let validInput = true;

    //TODO: Rami: perform validation to make sure they are all valid
    newProd.forEach(item => 
        {
            if(item === ''){
                alert("Oops! Please enter all required fields");
                validInput = false;
            }
            if (!validInput){
                return;
            }
        }
    )
    if(validInput){
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

            if (err) {
                alert("Oops! Please enter all required fields");
            }
            else{
                console.log("new product added");
                $('#modal').modal('show');
            }

        })
    }
    


    })


    $(document).on('click', '#modal-post-product', function(e){ 
        e.preventDefault();
        window.location = '/postProduct';
    })

    $(document).on('click', '#modal-view-all-products', function(e){ 
        e.preventDefault();
        console.log('clicked');
        window.location = '/listProducts';
    })


});