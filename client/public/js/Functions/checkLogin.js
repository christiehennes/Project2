export function isLoggedIn(successCallback){

    console.log("here");
      $.ajax('/me', {
        method: 'GET'
      }).then(function(user){
        if(user) {
            console.log("there is a user: " + user.username)
            successCallback();
            return true;
        }
        
      }).fail(function(err){
        console.log("failed");

        return false;
      }); 

  }