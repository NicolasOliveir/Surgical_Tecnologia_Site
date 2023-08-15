document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const itemList = document.getElementById("item-list");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const item = document.getElementById("item").value;
      const quantidade = document.getElementById("quantidade").value;
      const preco = document.getElementById("preco").value;
  
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${item}</strong> - Quantidade: ${quantidade}, Preço Unitário: $${preco}`;
      itemList.appendChild(listItem);
  
      form.reset();
    });
  });
  