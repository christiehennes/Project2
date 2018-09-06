// let checkLogin = require('./checkLogin.js');
import {isLoggedIn} from './Functions/checkLogin.js';

//Check to see if user is already logged in when they hit the login screen
window.onload = function() {

  //Function to redirect them to a new page 
  function redirectToPostProduct(){
    console.log("user already logged in");
        window.location = '/postProduct';
  }

  //If they are on the login screen and logged in, redirect them
  if (window.location.pathname == '/login') {
    console.log("on the login page")
    isLoggedIn(redirectToPostProduct); //Function with a callback to redirect the page if they are already logged in
  }
}


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

          $('#user-icon').data("status", "loggedIn");
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

            $('#user-icon').data("status", "loggedIn");
            window.location = '/postProduct'
          } else {
            throw new Error('something went wrong')
          }
        }).fail(function(err){
            alert("Oops! Please enter all required fields");
            // alert(err.responseText);
        }); 
      }

      function logout(e) {
        console.log("clicked log out");
        e.preventDefault();
        $.ajax('/logout', {
          method: 'DELETE',
          data: {}
        }).then(user => {
          $('#user-icon').data("status", "loggedOut");
          $.removeCookie('auth_token');
          window.location = '/login'
        })
      }

      //Function to update menu link depending if the user is logged in or not
      function updateMenu(e) {

        e.preventDefault();
        console.log("in update menu");
        let action = $('#user-icon').data("status");
        console.log(action);
        if(action === 'loggedIn'){
          //Display a modal to confirm the user wants to logout
          console.log("currently logged in");

          let logoutModal = `
          <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div id="logout-text">Are you sure you want to logout?</div>
                    <button id="logout-button">Log Out</button>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
        </div>

          `;

          $('#logout-placeholder').append(logoutModal);
          $('#logoutModal').modal('show');

        }
        else if(action === 'loggedOut'){
          window.location = '/login'; //take them to the login page 
        }
      }


      $(document).on('click', '#register-button', register);
      $(document).on('click', '#login-button', login);
      $(document).on('click', '#logout-button', logout);
      $(document).on('click', '#user-icon', updateMenu);

});