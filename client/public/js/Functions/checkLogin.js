export function isLoggedIn(successCallback){

    console.log("here");
      $.ajax('/me', {
        method: 'GET'
      }).then(function(user){
        console.log("line 7 " + user);
        if(user) {
            console.log("there is a user")
            successCallback();
            return true;
        }
        
      }).fail(function(err){
        console.log("failed");

        return false;
      }); 

  }