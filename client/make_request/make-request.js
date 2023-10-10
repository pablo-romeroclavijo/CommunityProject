//Navbar


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  








// stock table

const tableData = [    //write http request
{product_id: 1, product_name: 'Milk', quantity_remaining: 5, max: 5, unit: '300g'},
{product_id: 2, product_name: 'asd', quantity_remaining: 5, max: 115, unit: '300g'},
{product_id: 3, product_name: 'fds', quantity_remaining: 2, max: 5, unit: '300g'},
{product_id: 4, product_name: 'fds', quantity_remaining: 205, max: 51, unit: '300g'},
{product_id: 5, product_name: 'sfd', quantity_remaining: 2125, max: 65, unit: '300g'},
{product_id: 6, product_name: 'sfd', quantity_remaining: 15, max: 5, unit: '300g'},
{product_id: 7, product_name: 'fs', quantity_remaining: 25, max: 55, unit: '300g'},
{product_id: 8, product_name: 'af', quantity_remaining: 13, max: 15, unit: '300g'},
{product_id: 11, product_name: 'Milk', quantity_remaining: 5, max: 5, unit: '300g'},
{product_id: 12, product_name: 'asd', quantity_remaining: 5, max: 115, unit: '300g'},
{product_id: 13, product_name: 'fds', quantity_remaining: 2, max: 5, unit: '300g'},
{product_id: 14, product_name: 'fds', quantity_remaining: 205, max: 51, unit: '300g'},
{product_id: 15, product_name: 'sfd', quantity_remaining: 2125, max: 65, unit: '300g'},
{product_id: 16, product_name: 'sfd', quantity_remaining: 15, max: 5, unit: '300g'},
{product_id: 17, product_name: 'fs', quantity_remaining: 25, max: 55, unit: '300g'},
{product_id: 18, product_name: 'af', quantity_remaining: 13, max: 15, unit: '300g'}]


const itemsPerPage = 10;
let currentPage = 1;
let disabled_buttons = []

function updateTable() {
    const table = document.getElementById('data-table');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < tableData.length; i++) {
        const row = document.createElement('tr');
        const rowData = tableData[i];
        const keys = ['product_id', 'product_name', "quantity_remaining", "unit"]
        keys.map(key =>{
            const cell = document.createElement('td');
            cell.textContent = rowData[key];
            row.appendChild(cell);
        })
        const cell = document.createElement('td');
        const button = document.createElement('button')
        button.innerHTML = 'ADD TO LIST'
        button.classList.add('add-button')
        button.id = rowData.product_id
        cell.appendChild(button)
        row.appendChild(cell)

        tbody.appendChild(row);
    }
    eventListeners()
    console.log(disabled_buttons)
    disableButtons(disabled_buttons)
}

function updatePagination() {
    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = i;
        listItem.addEventListener('click', () => {
            currentPage = i;
            updateTable();
            updatePagination();
        });
        pagination.appendChild(listItem);
    }
}



updateTable();
updatePagination();

function disableButtons(list){
    for(i = 0; i < list.length; i++){
    const button = document.getElementById(list[i])
        try{    
            button.textContent = "ADDED"
            button.disabled = true}
        catch{//pass 
        }
    }
}


//Request table
let requestTable = []

function eventListeners(){
    let addButtons = document.getElementsByClassName('add-button')
    console.log(addButtons)

    for(let i = 0; i < addButtons.length; i++){
        const button = addButtons[i]
        button.addEventListener('click', addItem)}
}

function addItem (e){
    const item = tableData.find(element => element["product_id"] == e.target.id)
    e.target.textContent = "ADDED"
    e.target.disabled = true
    disabled_buttons.push(e.target.id)
    requestTable.push(item)
    
    updateRequestTable()
}


function updateRequestTable() {
    const table = document.getElementById('request-table');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < requestTable.length; i++) {
        const row = document.createElement('tr');
        const rowData = requestTable[i];
        const keys = ['product_id', 'product_name', "quantity_remaining", "unit", 'max']
        keys.map(key =>{
            const cell = document.createElement('td');
            cell.textContent = rowData[key];
            row.appendChild(cell);
        })
        const cell = document.createElement('td');
        const input = document.createElement('input')
        input.type = 'number'
        input.placeholder = 1
        input.min = 1
        input.max = rowData.max
        input.classList.add('quantity')
        input.id = rowData.name
        cell.appendChild(input)
        row.appendChild(cell)

        tbody.appendChild(row);
    }
}

// Send request

const submit = document.getElementById('make-request')
addEventListeners('submit', sendRequest)

function sendRequest(e){
    console.log(e.target)
}