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
      { id: 0, name: 'Stake', calories: 1200 },
      { id: 1, name: 'Cokies', calories: 400 },
      { id: 2, name: 'Egs', calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };


  // Public methods
  return {
    getItems: function(){
      return data.items;
    },
    addItem: function(name, caloriesData){
      // create ID
      if(data.items.length > 0) {
        ID = data.items[data.items.length -1].id + 1
      } else {
        ID = 0;
      }

      // Calories to number
      const calories = parseInt(caloriesData)

      // New Item
      newItem = new Item (ID, name, calories)

      // Add item to array
      data.items.push(newItem)

      console.log(data);
      

      return newItem;
    },
    logData: function(){
      return data
    }
  }
})();



// UI Controler *****************************************
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  }


  // Public methods
  return {
    populateItemsList : function(items){
      let html = '';

      items.forEach(e => {
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
    getItemInput: function(){
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    getSelectors: function(){
      return UISelectors;
    }
  }
})();



// App Controler ***************************************
const App = (function (ItemCtrl, UICtrl) {
  // Load event liseners
  const loadEventLoadliseners = function() {
    //  Get UI selector
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
  }


  // Add item submit
  const itemAddSubmit = function(e) {
    // Get form input from UI controler
    const input = UICtrl.getItemInput();

    // check for name and clories items
    if(input.name !== '' &&  input.calories !== ''){
      // Add item
       const newItem = ItemCtrl.addItem(input.name, input.calories);
    }

    // fetch items from data structure
    const items = ItemCtrl.getItems(); 

    UICtrl.populateItemsList(items);
    e.preventDefault();
  }

  // console.log(ItemCtrl.logData());



  // Public methods
  return {
    init: function(){
      console.log('Inicijalizacija aplikacije');

      // fetch items from data structure
      const items = ItemCtrl.getItems();

      // Populate items
      UICtrl.populateItemsList(items);

      // Load event lisenets
      loadEventLoadliseners ();
    }
  }
})(ItemCtrl, UICtrl);


// Pokretanje aplikacije
App.init();
