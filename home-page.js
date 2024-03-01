const authenticationApiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWJiNjRjNTllYzAwMTk5MGQ2ZjYiLCJpYXQiOjE3MDkyODQyNzgsImV4cCI6MTcxMDQ5Mzg3OH0.LmpNPbdYe3ilQuyarztxCFOp8leEJOeguvf2wGmDdn0";

const spinner = document.getElementById("spinner");

fetch("https://striveschool-api.herokuapp.com/api/product/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: authenticationApiKey,
  },
})
  .then(response => {
    console.log(response);
    spinner.classList.add("d-none");

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

    if (products.length !== 0) {
      products.forEach(product => {
        const col = document.createElement("div");
        col.classList.add("col-6", "col-md-4", "col-lg-3", "col-xl-2");

        const card = document.createElement("div");
        card.style.height = "470px";
        card.classList.add("card", "position-relative", "mb-4", "d-flex");

        const img = document.createElement("img");
        img.classList.add("card-img-top", "object-fit-cover");
        img.style.height = "200px";
        img.alt = product.description;
        img.src = product.imageUrl;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "d-flex", "flex-column");

        const name = document.createElement("h5");
        name.classList.add("card-title");
        name.innerText = product.name;

        const description = document.createElement("h6");
        description.classList.add("card-text");
        description.innerText = product.description;

        const price = document.createElement("p");
        price.classList.add("card-text");
        price.innerText = product.price + "$";

        const btnGroup = document.createElement("div");
        btnGroup.classList.add(
          "d-flex",
          "flex-column",
          "justify-content-between",
          "position-absolute",
          "start-0",
          "bottom-0",
          "ms-2",
          "mb-2"
        );

        const btnModifica = document.createElement("button");
        btnModifica.classList.add("btn", "btn-danger", "mb-1");
        btnModifica.innerText = "Modifica";

        const btnScopriDiPiu = document.createElement("button");
        btnScopriDiPiu.classList.add("btn", "btn-primary");
        btnScopriDiPiu.innerText = "Scopri di più";

        btnGroup.appendChild(btnModifica);
        btnGroup.appendChild(btnScopriDiPiu);

        cardBody.appendChild(name);
        cardBody.appendChild(description);
        cardBody.appendChild(price);
        cardBody.appendChild(btnGroup);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);
        row.appendChild(col);

        btnScopriDiPiu.addEventListener("click", e => {
          window.location.assign(`./details.html?productId=${product._id}`);
        });

        btnModifica.addEventListener("click", e => {
          window.location.assign(`./details-edit.html?productId=${product._id}`);
        });
      });
    } else {
      const alert = document.querySelector(".alert");
      alert.classList.remove("d-none");
    }
  })
  .catch(err => console.log(err));
