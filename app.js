// Storage controller ************************



// State of function
const state = {}


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
    slon:  ' a kaj sada?',
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

      state.data = data;

      return newItem;
    },
    deleteItem: function(id) {
      // Get the ids
      const ids = data.items.map( item => {
        return item.id;
      })

      // Get the index
      const index = ids.indexOf(id);
      console.log(index);
      
      // Remove item from data structure
      data.items.splice(index,1)

      console.log(data);
      
    },
    getTotalCalories: function(){
      let totalCalories = 0;
      data.items.forEach(e =>{  
        totalCalories += e.calories;
      })

      // set totlacalories in data structure
      data.totalCalories = totalCalories;

      // return total
      return data.totalCalories;
    },
    getItemById: function(id) {
      let found = null;
      // loop thru items
      data.items.forEach( item =>{
        if( item.id === id) {
           found = item;
        }
      })
      return found
    },
    updateItem: function(name, calories){
      // Calories to number
      calories = parseInt(calories);

      let found = null;
      data.items.forEach(item => {
          if(item.id === data.currentItem.id) {
            item.name = name;
            item.calories = calories;
            found = item;
          }
      })
      return found;
    },
    clearAllItems: function(){
      data.items = [];
    },
    setCurrentItem: function(item){
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
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
    listItems: '#item-list li',
    clearBtn: '.clear-btn ',
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
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    updateListItem: function(item){
      let listItem = document.querySelectorAll(UISelectors.listItems);

      // turn nodelist into array
      listItem = Array.from(listItem);

      listItem.forEach( listItem => {
        const itemId = listItem.getAttribute('id');

        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML= `
          <li class="collection-item" id="item-${item.id}">
            <strong> ${item.name} </strong> <em> ${item.calories}</em>
            <a href="" class="edit-item secondary-content"> <i class="edit-item fa fa-pencil"></i> </a>
          </li>
          `;
        }
      });
    },
    removeItems: function(){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn nodelist into array
      listItems = Array.from(listItems);
      
      listItems.forEach( item => {
       item.remove();        
      })

    },
    deleteListItem: function(id){
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
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
    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      console.log(ItemCtrl.slon);
      UICtrl.showEditState();
      
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
    showEditState(){
      document.querySelector(UISelectors.updateBtn).style.display='inline'
      document.querySelector(UISelectors.deleteBtn).style.display='inline'
      document.querySelector(UISelectors.backBtn).style.display='inline'
      document.querySelector(UISelectors.addBtn).style.display='none'
    },
    getSelectors: function () {
      return UISelectors;
    },
  };
})();



// APP CONTROLER    APP CONTROLER     APP CONTROLER     APP CONTROLER
const App = (function (ItemCtrl, UICtrl) {
  // LOAD EVENT LISENERS
  const loadEventLoadliseners = function () {
    //  Get UI selector
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13) {
        e.preventDefault()
        return false
      }
    });
    
    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    // Update button event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    // Delete button event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
    // Claer all item event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    // Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
  };

  // ADD ITEM SUBMIT
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


  // UPDATE SUBMIT
  const itemUpdateSubmit = function(e) {
    // Get item input 
    const input = UICtrl.getItemInput();
    
    // Update item
    const update = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(update);

    //  Get the total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // clear edit state
    UICtrl.clearEditState();

    e.preventDefault();
  };


  //  DELETE SUBMIT       DELETE SUBMIT     DELETE SUBMIT     DELETE SUBMIT    DELETE SUBMIT
  const itemDeleteSubmit = function(e){
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();
    console.log(currentItem);
   
    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from IU
    UICtrl.deleteListItem(currentItem.id);

    //  Get the total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // clear edit state
    UICtrl.clearEditState();
    e.preventDefault();
  };

  // Clear item event
  const clearAllItemsClick = function(e){
    // delete all item from data structure
    ItemCtrl.clearAllItems();

    // Remove from UI
    UICtrl.removeItems();

    //  Get the total calories
      const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Hide UL
    UICtrl.hideList();
    
    e.preventDefault();
  };


  // EDIT CLICK
  const itemEditClick = function(e){
    if(e.target.classList.contains('edit-item')) {
      // get the list item ID
      const listId = e.target.parentNode.parentNode.id;

      // break into an array
      const listIdArray = listId.split('-');

      //  get the actual id
      const id = parseInt(listIdArray[1]);

      // Get item to edit
      const itemToEdit = ItemCtrl.getItemById(id);

      // SET the current item 
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
   }
    e.preventDefault();
  }

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
