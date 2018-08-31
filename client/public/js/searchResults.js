window.onload = function() {

    //Grab search results from search and then use this to perform your search
    let searchParam = window.location.href.split('search/:')[1];
    // console.log(searchParam);


    //If empty, display all 
    if (searchParam == 'all'){
        retrieveAllProducts();
    }
    else{
        retrieveSearchedProducts(searchParam);
    }
    //Need to add more logic for the rest of the search functionality

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
        console.log("completed ajax");
        displayProducts(response);
        
    });

}

function retrieveSearchedProducts(term){

    let url =  '/api/products/search/' + term;
    console.log(url);

    $.ajax(url, {method: 'GET'})
    .then(function(response){
        console.log("completed ajax");
        console.log(response);
        displayProducts(response);
        
    });

}



function displayProducts(body){

    //Loop through body of response and create a card for each item and append it to the element div 

    body.forEach(element => {

        let productCard = 
        `
        <div class="product-card">
        <div class="product-card-body">
        <img class="product-image" src="${element.image_url}">
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

