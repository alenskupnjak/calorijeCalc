// Storage controller ************************

// Item controller *************************
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data structure
  const data = {
    items: [
      // { id: 0, name: 'Stake', calories: 1200 },
      // { id: 1, name: 'Cokies', calories: 400 },
      // { id: 2, name: 'Egs', calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // Public methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, caloriesData) {
      // create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      const calories = parseInt(caloriesData);

      // New Item
      newItem = new Item(ID, name, calories);

      // Add item to array
      data.items.push(newItem);

      console.log(data);

      return newItem;
    },
    getTotalCalories : function(){
      let totalCalories = 0;
      data.items.forEach(e =>{  
        totalCalories += e.calories;
      })
      console.log(totalCalories);
      // set totlacalories in data structure
      data.totalCalories = totalCalories;

      // return total
      return data.totalCalories;
    },
    logData: function () {
      return data;
    },
  };
})();



// UI Controler   UI Controler    UI Controler   UI Controler
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  };

  // Public methods
  return {
    populateItemsList: function (items) {
      let html = '';

      items.forEach((e) => {
        html += `
        <li class="collection-item" id="item-${e.id}">
            <strong> ${e.name} </strong> <em> ${e.calories}</em>
          <a href="" class="edit-item secondary-content"> <i class="edit-item fa fa-pencil"></i> </a>
        </li>
        `;
      });
      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    addListItem: function (item) {
      // show the list
      document.querySelector(UISelectors.itemList).style.display = 'block'

      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `        
        <strong> ${item.name} </strong> <em> ${item.calories}</em>
        <a href="" class="edit-item secondary-content"> <i class="edit-item fa fa-pencil"></i> </a>
      `;
      // Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display='none'
    },
    showTotalCalories: function(total){
      document.querySelector(UISelectors.totalCalories).textContent = total;
    },
    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display='none'
      document.querySelector(UISelectors.deleteBtn).style.display='none'
      document.querySelector(UISelectors.backBtn).style.display='none'
      document.querySelector(UISelectors.addBtn).style.display='inline'
    },
    getSelectors: function () {
      return UISelectors;
    },
  };
})();



// App Controler ***************************************
const App = (function (ItemCtrl, UICtrl) {
  // Load event liseners
  const loadEventLoadliseners = function () {
    //  Get UI selector
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);
  };

  // Add item submit
  const itemAddSubmit = function (e) {
    // Get form input from UI controler
    const input = UICtrl.getItemInput();

    // check for name and clories items
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item the UL list
      UICtrl.addListItem(newItem);

      //  Get the total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Clear input fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // console.log(ItemCtrl.logData());

  // Public methods
  return {
    init: function () {
      // Set initial state
      UICtrl.clearEditState();

      // fetch items from data structure
      const items = ItemCtrl.getItems();

      // check if any items
      if(items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate items
        UICtrl.populateItemsList(items);
      }
      //  Get the total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event lisenets
      loadEventLoadliseners();
    },
  };
})(ItemCtrl, UICtrl);

// Pokretanje aplikacije
App.init();
