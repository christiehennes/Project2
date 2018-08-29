// let checkLogin = require('./checkLogin.js');

//Check to see if user is already logged in when they hit the login screen
window.onload = function() {

  //Check to see if the user is logged in
  function isLoggedIn(){

    $.get('/me', function(user, err){

        if(user) return true;
        return false;
        if(err) alert(err);
    });
}

  if (isLoggedIn) {
    console.log("user already logged in");
    $('#already-logged-in-modal').modal('show');
    window.location = '/postProduct'
  }
};


//All other function calls if they are no logged in
$(document).ready(function() {


    //Function to login
    function login(e) {
        e.preventDefault();
        // if (!validInput(['username', 'password'])) return;

        console.log("U: " + $('[name="owner-username"]').val())
        console.log("P: " + $('[name="owner-password"]').val())

        $.ajax('/login', {
          method: 'POST',
          data: {
            username: $('[name="owner-username"]').val(),
            password: $('[name="owner-password"]').val()
          }
        }).then(({ user, authToken }) => {
          $.cookie('auth_token', authToken.token, { expires: 7 });
          if (!user) throw new Error('invalid username or password');
          window.location = '/postProduct'
        }).fail(function(err){
            alert(err.responseText);
        }); 
      }

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
            window.location = '/postProduct'
          } else {
            throw new Error('something went wrong')
          }
        }).fail(function(err){
            alert(err.responseText);
        }); 
      }

      function logout(e) {
        e.preventDefault();
        $.ajax('/logout', {
          method: 'DELETE',
          data: {}
        }).then(user => {
          $.removeCookie('auth_token');
          window.location.reload()
        })
      }


      $(document).on('click', '#register-button', register);
      $(document).on('click', '#login-button', login);
      $(document).on('click', '#logout', logout);

});