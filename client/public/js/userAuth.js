$(document).ready(function() {


    //Function to login

    //Function to create a new user

    function register(e) {
        console.log("clicked register");
        e.preventDefault();
        // if (!validInput(['username', 'password', 'email'])) return;

        $.ajax('/register', {
          method: 'POST',
          data: {
            email: $('[name="owner-email"]').val(),
            username: $('[name="owner-username"]').val(),
            password: $('[name="owner-password"]').val(),
            first_name: $('[name="owner-first-name"]').val(),
            last_name: $('[name="owner-last-name"]').val(),
            phone: $('[name="owner-phone"]').val()
          }
        }).then(({ user, authToken }) => {
          if (user && authToken.token) {
              console.log("new user created!!");
            $.cookie('auth_token', authToken.token, { expires: 7 });
            window.location = '/'
          } else {
            throw new Error('something went wrong')
          }
        }).fail(function(err){
            alert(err.responseText);
        }); 
      }




      $(document).on('click', '#register-button', register);
});