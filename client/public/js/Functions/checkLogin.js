export function isLoggedIn(callback){

    console.log("here");
      $.ajax('/me', {
        method: 'GET'
      }).then(function(user){
        console.log(user);
        if(user) {
            console.log("there is a user")
            callback();
            return;
        }
      }).fail(function(err){
        return;
      }); 
  
  }