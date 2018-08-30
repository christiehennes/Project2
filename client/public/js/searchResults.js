window.onload = function() {

    //Grab search results from search

    //If empty, display all 
    retrieveAllProducts();
}



$(document).ready(function(){


    //TODO Need to figure out how to grab search term from other page 
    // Click handlers
    $(document).on('click', '#submit-search', function(e){
            
        e.preventDefault();

        //TODO Change to handle the actual search query, for now just display all 
        console.log("here");

    })	

})


function retrieveAllProducts() {

    //Get all products
    $.ajax('/api/products', {method: 'GET'})
    .then(function(response){
        // window.location = '/listProducts'
        console.log("completed ajax");
        displayProducts(response);
        
    });

}



function displayProducts(body){

    console.log("here ");

    console.log("BODY: " + body );

    //Loop through body of response and create a card for each item and append it to the element div 

    body.forEach(element => {

        let productCard = 
        `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${element.image_url}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">${element.description}</p>
            <p class="card-text">${element.price}</p>
            <p class="card-text">${element.date_available}</p>
            <a href="#" class="btn btn-primary">Rent It</a>
        </div>
        </div>
        `;
        $('#product-content').append(productCard);
    
    });

    
}

