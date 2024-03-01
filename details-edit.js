const authenticationApiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWJiNjRjNTllYzAwMTk5MGQ2ZjYiLCJpYXQiOjE3MDkyODQyNzgsImV4cCI6MTcxMDQ5Mzg3OH0.LmpNPbdYe3ilQuyarztxCFOp8leEJOeguvf2wGmDdn0";
const form = document.querySelector("form");
const inputName = document.getElementById("nameInp");
const inputDescription = document.getElementById("description");
const inputBrand = document.getElementById("brand");
const inputImageUrl = document.getElementById("imageUrl");
const inputPrice = document.getElementById("price");
const btnElimina = document.getElementById("btn-remove");
const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

const handleDetailsProduct = () => {
  fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authenticationApiKey,
    },
  })
    .then(response => {
      console.log(response);

      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("400 - Errore lato client");
        }

        if (response.status === 404) {
          throw new Error("404 - Dato non trovato");
        }

        if (response.status === 500) {
          throw new Error("500 - Errore lato server");
        }

        throw new Error("Errore nel reperimento dati");
      }
    })
    .then(products => {
      products.forEach(product => {
        if (product._id === productId) {
          inputName.value = product.name;
          inputDescription.value = product.description;
          inputBrand.value = product.brand;
          inputImageUrl.value = product.imageUrl;
          inputPrice.value = product.price;
        }
      });
    })
    .catch(err => console.log(err));
};

const handleDeleteProduct = () => {
  const confirmedDelete = confirm("sei sicuro di voler eliminare il prodotto?");
  if (confirmedDelete) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authenticationApiKey,
      },
    })
      .then(response => {
        console.log(response);

        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 400) {
            throw new Error("400 - Errore lato client");
          }

          if (response.status === 404) {
            throw new Error("404 - Dato non trovato");
          }

          if (response.status === 500) {
            throw new Error("500 - Errore lato server");
          }

          throw new Error("Errore nel reperimento dati");
        }
      })
      .then(product => {
        console.log(product);
        alert(`${product.name} eliminato con successo`);
        window.location.assign("./index.html");
      })
      .catch(err => console.log(err));
  }
};

btnElimina.addEventListener("click", handleDeleteProduct);

const handleEditProduct = e => {
  e.preventDefault();
  const newProduct = {
    name: inputName.value,
    description: inputDescription.value,
    brand: inputBrand.value,
    imageUrl: inputImageUrl.value,
    price: inputPrice.value,
  };
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: authenticationApiKey,
    },
    body: JSON.stringify(newProduct),
  })
    .then(response => {
      console.log(response);

      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("400 - Errore lato client");
        }

        if (response.status === 404) {
          throw new Error("404 - Dato non trovato");
        }

        if (response.status === 500) {
          throw new Error("500 - Errore lato server");
        }

        throw new Error("Errore nel reperimento dati");
      }
    })
    .then(product => {
      console.log(product);
      product.name = inputName.value;
      product.description = inputDescription.value;
      product.brand = inputBrand.value;
      product.imageUrl = inputImageUrl.value;
      product.price = inputPrice.value;

      alert(`Prodotto con id: ${product._id} modificato con successo`);
    })
    .catch(err => console.log(err));
};

form.addEventListener("submit", handleEditProduct);

window.onload = () => {
  handleDetailsProduct();
};
