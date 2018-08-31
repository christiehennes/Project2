window.onload = function() {

    //Load the order summary from session storage 
    let selectedProducts = sessionStorage.getItem("cart").split(',');
    console.log(selectedProducts);

    //Create a local variable to hold the order total
    let total = 0;

    //Make an api call for each product
    selectedProducts.forEach(element => {
        console.log("here");
        let url = '/api/products/id/' + element;
        $.ajax(url, {method: 'GET'})
        .then(function(response){

            response = response[0];//Set it to the first array item
            console.log(response.price);
            total = total + parseInt(response.price);


            let item = 
            `<li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">${response.name}</h6>
            </div>
            <span class="text-muted">$${response.price}</span>
          </li>`;

          $('#checkout-products').prepend(item);
          console.log(total);
          $('#order-total').text(`$${total}`)
        })

    })





    //dynamically populate this checkout-products



 

}

