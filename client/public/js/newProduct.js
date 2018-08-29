

$(document).ready(function() {

    $.get('/me', function(user, err){

        if(user){
            $('#user-logged-in').append(
                `<div>Welcome ${user.username}! <button id="logout">Logout</button></div>
                `
            );
            console.log("A user is currently logged in: ");
            console.log(user.username);
        }
        else{
            console.log("no user");
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
    let price = $('#product-price').val();
    let timeAmt = $('#product-time-amount').val();
    let timeInterval = $('#product-time-interval').val();


    console.log("NAME: " + name);



    //TODO perform validation to make sure they are all valid

    //Perform post to DB

    })

});