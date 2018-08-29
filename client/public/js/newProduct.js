

$(document).ready(function() {

    let currentUser; //Create a local variable to hold the curren logged in user

    //Get the current user logged in
        $.get('/me', function(user, err){

            if(user){
                $('#user-logged-in').append(
                    `<div>Welcome ${user.username}! <button id="logout">Logout</button></div>
                    `
                );
                console.log("A user is currently logged in: ");
                console.log(user.username);
                console.log(user);

                currentUser = user;
                return user;
            }
            else{
                console.log("no user");
                //TODO: CH: Display a message to the user they need to be logged in first, and then take them to the login page. We don't want someone to post a product without being logged in.
                return;
            }
    
            if(err) alert(err);
        });
    
    
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
    }).then(function(){
        console.log("new product added");
        //TODO: Make the result of posting a new product better, maybe take them to the page of the individual project, or give them options to view all products / view this product / post another product
    })


    })




});