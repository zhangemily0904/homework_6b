const itemList = document.getElementById("item-list");
const divTotal = document.getElementById('total');

if (itemList != null) {
  itemList.onclick = function (e) {
    if (e.target && e.target.classList.contains("remove")) {
      const name = e.target.dataset.name;
      const color = e.target.dataset.color;
      const fill = e.target.dataset.fill;
      const key = `${name},${color},${fill}`;
      removeItem(key);
    }
  }

  itemList.onchange = function(e) {
    if (e.target && e.target.classList.contains('update')) {
      const qty = parseInt(e.target.value)
      const name = e.target.dataset.name
      const color = e.target.dataset.color;
      const fill = e.target.dataset.fill;
      const key = `${name},${color},${fill}`;

      updateCart(key, qty);

    }
  }
}

/** 
 * Update color selection
 * @param {string} color 
 */
function updateColor(color) {
  let parent = document.getElementById("color-selection");
  parent.innerHTML = "Color: " + color;
  parent.style.fontWeight = 'bold';
}

/** 
 * Update fill selection
 * @param {string} fill 
 */
function updateFill(fill){
  let parent = document.getElementById("fill-selection");
  parent.innerHTML = "Fill: " + fill;
  parent.style.fontWeight = 'bold';
}

/** 
 * Update number of items in cart 
 */
function addToCart(){
  // Alert user when adding an item to cart
  alert ("An item has been added to cart");
  
  const name = document.getElementById("product-name").innerHTML;
  let price = document.getElementById("product-price").innerHTML;
  price = parseFloat(price.substring(9));
  const color = document.getElementById("color-selection").innerHTML;
  const fill = document.getElementById("fill-selection").innerHTML;
  let quantity = 1;
  const details = localStorage.getItem(`${name},${color},${fill}`);
  
  if (details != null) {
    quantity = parseInt(details.split(",")[1]) + 1;
  }
  localStorage.setItem(`${name},${color},${fill}`, [price, quantity]);
}

/** 
 * Dynamically populate the table with shopping list items
 */
function showItems() {
  let list = `<tr><th>Item</th>\n<th>Description</th>\n<th>Item Price</th><th>Quantity</th>\n<th>Total Price</th>\n<th></th>\n<th></th>\n<th></th>\n<th></th>`;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i).split(",");
    const name = key[0];
    const color = key[1];
    const fill = key[2];
  
    const details = localStorage.getItem(key).split(",");
    const price = details[0];
    const quantity = details[1];
    
    list += `<tr><td><img src="images/couch_pillow.png"></td>\n
                 <td>${name}\n<p>${color}</p>\n<p>${fill}</p></td>\n
                 <td>$${price}</td>\n
                 <td><input class="update" data-name="${name}" data-color="${color}" data-fill="${fill}" type="number" value="${quantity}"></td>\n
                 <td>$${price * quantity}</td>\n
                 <td><button class="remove" data-name="${name}" data-color="${color}" data-fill="${fill}">remove</button></td>\n`;
  }

  itemList.innerHTML = list;
  divTotal.innerHTML = "Total: $" + getTotal();
}

/** 
 * Get the total price of all items in the cart
 */
function getTotal() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    console.log(typeof(key))
    const details = localStorage.getItem(key).split(",");
    const price = details[0];
    const quantity = details[1];
    total += price * quantity;
  }
  return total.toFixed(2)
}

/** 
 * Update the given item with the given quantity
 * @param {string} key 
 * @param {integer} quantity 
 */
function updateCart(key, quantity) {
  const details = localStorage.getItem(key).split(",");
  const price = details[0];
  localStorage.setItem(key, [price, quantity]);
  showItems();
}

/** 
 * Remove the given item from shopping cart
 * @param {string} key 
 */
function removeItem(key) {
  localStorage.removeItem(key);
  showItems();
}

