const authenticationApiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWJiNjRjNTllYzAwMTk5MGQ2ZjYiLCJpYXQiOjE3MDkyODQyNzgsImV4cCI6MTcxMDQ5Mzg3OH0.LmpNPbdYe3ilQuyarztxCFOp8leEJOeguvf2wGmDdn0";

const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");
console.log(productId);

fetch("https://striveschool-api.herokuapp.com/api/product/", {
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
    console.log(products);

    const row = document.querySelector(".row");
    const h1 = document.querySelector("h1");

    products.forEach(product => {
      if (product._id === productId) {
        h1.innerText = product.name;

        const col = document.createElement("div");
        col.classList.add("col-8", "offset-2");

        const card = document.createElement("div");
        card.style.height = "600px";
        card.classList.add("card", "position-relative", "mb-2");

        const img = document.createElement("img");
        img.classList.add("card-img-top", "object-fit-cover");
        img.style.height = "300px";
        img.alt = product.description;
        img.src = product.imageUrl;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "text-center");

        const name = document.createElement("h5");
        name.classList.add("card-title", "fs-3");
        name.innerText = product.name;

        const description = document.createElement("h6");
        description.classList.add("card-text", "fs-4");
        description.innerText = product.description;

        const price = document.createElement("p");
        price.classList.add("card-text", "fs-5");
        price.innerText = "Price: " + product.price + "$";

        const productId = document.createElement("p");
        productId.classList.add("card-text", "fs-5");
        productId.innerText = `ProductID: ${product._id}`;

        const createdAt = document.createElement("p");
        createdAt.classList.add("card-text", "fs-5");
        createdAt.innerText = `Creato il: ${product.createdAt.slice(0, 10)}`;

        const updatedAt = document.createElement("p");
        updatedAt.classList.add("card-text", "fs-5");
        updatedAt.innerText = `Caricato il: ${product.updatedAt.slice(0, 10)}`;

        cardBody.appendChild(name);
        cardBody.appendChild(description);
        cardBody.appendChild(price);
        cardBody.appendChild(productId);
        cardBody.appendChild(createdAt);
        cardBody.appendChild(updatedAt);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);
        row.appendChild(col);
      }
    });
  })
  .catch(err => console.log(err));
