
backendURL = 'https://communityapp-gsbn.onrender.com'
//Navbar


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

// stock table

async function getStock(){
    const options = {
        method: "GET",
        header:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }}
    const request = await fetch(backendURL + '/stock', options)
    const table = await request.json()
    console.log(table)
    return table
}

const tableData = getStock()


const itemsPerPage = 10;
let currentPage = 1;
let disabled_buttons = []

updateTable();



async function updateTable() {
    let tableData = await getStock()
    console.log(tableData)
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
    const tableData = await getStock()
    const item = await tableData.find(element => element["product_id"] == e.target.id)
    e.target.textContent = "ADDED"
    e.target.disabled = true
    disabled_buttons.push(e.target.id)
    requestTable.push(item)
    console.log(item)

    document.getElementById('request-container').style.display = 'block'
    
    updateRequestTable()

    try{
        const form = document.getElementById('resquest-items')
        form.addEventListener('submit', fetchForm)}
    catch{//pass
    }   
}


function updateRequestTable() {
    const table = document.getElementById('request-table');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < requestTable.length; i++) {
        const row = document.createElement('tr');
        const rowData = requestTable[i];
        const keys = ['product_id', 'product_name', "quantity_remaining", "unit"]
        keys.map(key =>{
            const cell = document.createElement('td');
            cell.textContent = rowData[key];
            row.appendChild(cell);
        })
        const cell = document.createElement('td');
        const input = document.createElement('input')
        input.type = 'number'
        input.defaultValue = 1
        input.min = 1
        input.classList.add('quantity')
        input.setAttribute('required', '')
        input.id = rowData.product_id
        cell.appendChild(input)
        row.appendChild(cell)

        const cell2 = document.createElement('td');
        const input2 = document.createElement('input')
        input2.type = 'date'
        input2.defaultValue = new Date()
        const today =  new Date()
        input2.setAttribute("min", today.toISOString().split("T")[0])
        input2.classList.add('date_exp')
        input2.setAttribute('required', '')
        cell2.appendChild(input2)
        row.appendChild(cell2)

        tbody.appendChild(row);
    }
    const today = new Date()
    let ten_days = new Date()
    ten_days.setDate(ten_days.getDate()+10)
    document.getElementById("date").setAttribute("min", today.toISOString().split("T")[0])
    document.getElementById("date").setAttribute("max", ten_days.toISOString().split("T")[0])
    document.getElementById("date").setAttribute('required', '')
    document.getElementById("time").setAttribute("min", '08:00:00')
    document.getElementById("time").setAttribute("max", '11:00:00')
    document.getElementById("time").setAttribute('required', '')

}

// Send request

function fetchForm(e){
    const donatedList = {items:[]}
    e.preventDefault()
    console.log(e.target)
    const quantitites = document.getElementsByClassName('quantity')
    const dates = document.getElementsByClassName('date_exp')
    donatedList['slot_date'] = document.getElementById('date').value
    donatedList['slot_time'] = document.getElementById('time').value + ':00'

    for(i = 0 ; i < quantitites.length; i++){
        const quantity = quantitites[i].value
        const product_id = quantitites[i].id
        const date = dates[i].value
        const item = {product_id: product_id, quantity_donated: quantity, expiration_date: date}
        donatedList.items.push(item)
    }
    console.log(JSON.stringify(donatedList))
    sendRequest(JSON.stringify(donatedList))

}

async function sendRequest(donatedList){
    const options = {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token    /// change to colacl.storage
        },
        body: donatedList
        }
    const request = await fetch(backendURL + '/donation', options)
    const response = await request.json()
    console.log(response)
    loadRequest(response)
}

function loadRequest(response){
    document.getElementById('container1').style.display = 'none'
    document.getElementById('container2').style.display = 'block'

    const QR = document.getElementById('QR')
    const code = document.getElementById('code')
    const slot = document.getElementById('slot')

 

    const {event, itemList, request}  = response
    code.textContent = "your drop-off code is: " + event.code
    QR.setAttribute('src', event.QR)
    QR.setAttribute('title', event.code)

    let date = new Date(event.slot_date)
    const day = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(); 
    slot.textContent = 'Your drop of slot is: ' + event.slot_time.slice(0, -3) + ' on ' + day
    updateRequestedTable(itemList)
    
}

function updateRequestedTable(itemList) {
    console.log(itemList)
    const table = document.getElementById('requested-table');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < itemList.length; i++) {
        console.log('aaa', i, itemList[i])
        const row = document.createElement('tr');
        const rowData = itemList[i];
        const keys = ['product_id', 'product_name', "quantity_donated", 'expiration_date']
        keys.map(key =>{
            console.log(key)
            const cell = document.createElement('td');

            if(key == 'expiration_date'){
                let date = new Date(rowData[key])
                cell.textContent = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(); 
            }else{
                cell.textContent = rowData[key];}
            row.appendChild(cell);
        })
        table.appendChild(row)
    }
}
