backendURL = 'http://localhost:3000'

//Navbar


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  






getStock()

// stock table
async function getStock(){
    const options = {
        method: "GET",
        header:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': '88e0ee88-40c8-46ac-a3cb-001d80a9eebf'
        }}
    const request = await fetch(backendURL + '/stock', options)
    const table = await request.json()
    console.log(table)

    updateTable(table);
    updatePagination(table)

    return tableData = table

    
}
let tableData = []



const itemsPerPage = 10;
let currentPage = 1;
let disabled_buttons = []

function updateTable(tableData) {
    const table = document.getElementById('data-table');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < tableData.length; i++) {
        const row = document.createElement('tr');
        const rowData = tableData[i];
        const keys = ['product_id', 'product_name', "category", "quantity_remaining", "unit"]
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

function updatePagination(tableData) {
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

async function addItem (e){
    console.log(tableData.PromiseResult)
    const item = await tableData.find(element => element["product_id"] == e.target.id)
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

const button = document.getElementById('make-request')
console.log(button)
button.addEventListener('submit', function (e) {e.stopImmediatePropagation(); console.log(e)})

function sendRequest(e){

    console.log(e.target)
    console.log('blalba')
}