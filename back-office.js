const authenticationApiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWJiNjRjNTllYzAwMTk5MGQ2ZjYiLCJpYXQiOjE3MDkyODQyNzgsImV4cCI6MTcxMDQ5Mzg3OH0.LmpNPbdYe3ilQuyarztxCFOp8leEJOeguvf2wGmDdn0";

const form = document.querySelector("form");
const inputName = document.getElementById("nameInp");
const inputDescription = document.getElementById("description");
const inputBrand = document.getElementById("brand");
const inputImageUrl = document.getElementById("imageUrl");
const inputPrice = document.getElementById("price");
const btnReset = document.getElementById("reset");

const handleCreate = e => {
  e.preventDefault();
  const newProduct = {
    name: inputName.value,
    description: inputDescription.value,
    brand: inputBrand.value,
    imageUrl: inputImageUrl.value,
    price: inputPrice.value,
  };

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    body: JSON.stringify(newProduct),
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
          throw new Error("Prodotto già esistente");
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
    .then(newProduct => {
      alert("Il prodotto è stato creato correttamente");
      inputName.value = "";
      inputDescription.value = "";
      inputBrand.value = "";
      inputImageUrl.value = "";
      inputPrice.value = "";
    })
    .catch(err => {
      alert(err);

      console.log(err);
    });
};

form.addEventListener("submit", handleCreate);
btnReset.addEventListener("click", e => {
  const confirmed = confirm("Sei sicuro di voler resettare i campi?");
  if (!confirmed) {
    e.preventDefault();
  }
});
