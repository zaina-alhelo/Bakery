

const MyUrl = "http://localhost:3000/data";
let bakeryItems = [];

const fetchBakeryItems = async () => {

    const response = await fetch(MyUrl);
    const data = await response.json();
    bakeryItems = data;
    renderBakeryItems();

};

const renderBakeryItems = () => {
  const bakeryList = document.getElementById("bakeryList");
  bakeryList.innerHTML = "";
  bakeryItems.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("bakeryItem");

    div.innerHTML = `
    <div>
        <h2>${item.name}</h2>
        <p>$${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>${item.description}</p>
    </div>
    <div>
     <button onclick="fillUpdateForm('${item.id}', '${item.name}', ${item.price}, ${item.quantity}, '${item.description}')">Update</button>

        <button onclick="deleteItem('${item.id}')">Delete</button>

    </div>
`;
    bakeryList.appendChild(div);
  });
};

const addItem = async () => {
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const description = document.getElementById("description").value;

    const newItem = {
      name,
      price,
      quantity,
      description,
    };

    const response = await fetch(MyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

  

    await fetchBakeryItems();

};



async function deleteItem(id) {
  const response = await fetch(`${MyUrl}/${id}`, {
    method: "DELETE",
  });

  // await fetchBakeryItems();
}



fetchBakeryItems();
const fillUpdateForm = (id, name, price, quantity, description) => {
  document.getElementById("itemId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("price").value = price;
  document.getElementById("quantity").value = quantity;
  document.getElementById("description").value = description;
};
let updateItem = async () => {
  let id = document.getElementById("itemId").value;
  let name = document.getElementById("name").value;
  let price = parseFloat(document.getElementById("price").value);
  let quantity = parseInt(document.getElementById("quantity").value);
  let description = document.getElementById("description").value;

  const updatedItem = {
      id,
       name,
    price,
      quantity,
    description,
  };

    const response = await fetch(`${MyUrl}/${id}`, {
      method: "PUT",
         headers: { "Content-Type": "application/json",
  },
      body: JSON.stringify(updatedItem),
    });

};

fetchBakeryItems();