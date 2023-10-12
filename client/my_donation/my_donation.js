backendURL = 'https://communityapp-gsbn.onrender.com'

//Navbar


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }



//Load user
loadProfile()
let isAdmin 
async function loadProfile(){
    if (localStorage.token){
        headers = {"Authorization": localStorage.token}

        const options = {
            method: "GET",
            headers: {
                "Authorization": localStorage.token,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }
    
        const response = await fetch(backendURL + "/user/profile", options)
        const data = await response.json()
        isAdmin = data.isAdmin

    }}

let requestID
// Request function

function addActions(list){
    const actions = document.getElementById("dropdown")
    list.map(action =>{

        const option = document.createElement('option')
        option.id = action
        option.value = action
        option.textContent = action
        option.addEventListener('click', updateStatus)
        option.addEventListener("click", updateStatus)
        actions.appendChild(option)
    })
    
}

async function updateStatus(e){
    const status = JSON.stringify({status: e.target.value})
    console.log(e.target.value) 
    const options = {
        method: "PATCH",
        headers: {
            "Authorization": localStorage.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: status
        }

    const response = await fetch(backendURL + "/donation/status/" + donationID , options)
    const data = await response.json()
    if(response.status == 203){
        alert("Donation status updated to: " + e.target.value)
        document.getElementById("donation_status").textContent = 'Donation Status: ' + e.target.value 

    }else{
        alert('Unable to ammend donation')
        }

}

async function markAsCollected(e){
    e.preventDefault()

    const options = {
        method: "PATCH",
        headers: {
            "Authorization": localStorage.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }

    const response = await fetch(backendURL + "/donation/received/" + donationID , options)
    const data = await response.json()
    if(response.status == 203){
        alert("Donation marked as received")
        document.getElementById("donation_received").textContent = 'Donation Received: Received' 

    }else{
        alert('Unable to ammend donation')
        }

}

async function verifyItems(e){

    e.preventDefault()

    const items = []
    const product_IDs = document.getElementsByClassName('product_id')
    const product_names = document.getElementsByClassName('product_name')
    const product_quantities = document.getElementsByClassName('quantity_donated')
    const product_expirations = document.getElementsByClassName('expiration_date')
    const product_verifys = document.getElementsByClassName('verified')
    //console.log(rows)
    
    for(i=0; i<product_IDs.length; i++){
        const item = {
            product_id: product_IDs[i].value,
            product_name: product_names[i].value,
            quantity_donated: product_quantities[i].value,
            expiration_date: product_expirations[i].value,
            verified: product_verifys[i].checked
        }
        items.push(item)
  
    }

    for(j = 0; j<items.length; j++){
        const item = JSON.stringify(item[i])
        const options = {
            method: "PATCH",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token    /// change to colacl.storage
            },
            body: item
        }
    
        const request = await fetch(backendURL + `/donation/item=${id}`, options)
        const response = await request.json()
        donationID = response.donation.id
        loadRequest(response)
    }
}



// Send request
const token = localStorage.token
const id = new URLSearchParams(window.location.search).get('id')

sendRequest(token, id)
async function sendRequest(token, id){


    const options = {
        method: "GET",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token    /// change to colacl.storage
        }
    }

    const request = await fetch(backendURL + `/donation/${id}`, options)
    const response = await request.json()
    donationID = response.donation.id
    loadRequest(response)

}




function loadRequest(response){
    let donatioDate = new Date(response.donation.donation_date)
    const days = donatioDate.getFullYear()+'-'+(donatioDate.getMonth()+1)+'-'+donatioDate.getDate(); 

    document.getElementById("donation_id").textContent = "Donation Locator:      " + response.event.code
    document.getElementById("donation_status").textContent = "Donation Status:    " + response.donation.status
    document.getElementById("donation_date").textContent = "Donation date:    " + days
    const received = document.getElementById("donation_received")
    if(response.donation.received == false){
        received.textContent = 'Donation Received: Pending' 
    }else{
        received.textContent = 'Donation Received: Received'
    }

    const itemList = response.responseItems

    console.log('isAdmin: ', isAdmin)
    isAdmin == true ?  tableAdmin(itemList): tableNonAdmin(itemList)
}

function tableAdmin(itemList){
    console.log("Hi")
    const markCollected = document.getElementById('mark-colected')
    markCollected.style.display = 'block'
    console.log(markCollected)

    const button = document.getElementById('collected-button')
    button.addEventListener('click', markAsCollected)

    const submitBox = document.getElementById('submit-box')
    submitBox.style.display = 'block'

    const form = document.getElementById("resquest-items")
    form.addEventListener('submit', verifyItems)
   


  
    const actions = ['Open', 'Closed', 'Hold', 'Report']
    addActions(actions)
    const table = document.getElementById('request-table');
    
    const tbody = table.querySelector('tbody');
    
    console.log(table)
    tbody.innerHTML = '';


    for (let i = 0; i < itemList.length; i++) {
        //const form = document.getElementByID('request-items')

        const row = document.createElement('tr');
        const rowData = itemList[i];

        const cell1 = document.createElement('td')
        cell1.value = rowData['product_id']
        cell1.classList.add('product_id')
        cell1.textContent = rowData['product_id']
        row.appendChild(cell1)

        const cell2 = document.createElement('td')
        cell2.textContent = rowData['product_name']
        cell2.classList.add('product_name')
        cell2.value = rowData['product_name']
        row.appendChild(cell2)

        const cell4 = document.createElement('td');
        const input2 = document.createElement('input')
        input2.classList.add('quantity_donated')
        input2.type = 'number'
        input2.id ='quantity_donated'
        input2.defaultValue = rowData['quantity_donated']

        cell4.appendChild(input2)
        row.appendChild(cell4)

        const cell3 = document.createElement('td');
        const input1 = document.createElement('input')
        input1.classList.add('expiration_date')
        input1.id = 'expiration_date'
        let date = new Date(rowData['expiration_date'])
        const day = date.toISOString().split("T")[0];
        input1.type = 'date'
        input1.defaultValue = day

        cell3.appendChild(input1)
        row.appendChild(cell3)

        const cell5 = document.createElement('td')
        const input3 = document.createElement('input')
        input3.id = 'verified'
        input3.classList.add('verified')
        input3.type = 'checkbox'
        input3.value = rowData['product_id']
        cell5.appendChild(input3)
        if(rowData['verified']){
            input3.checked = true
            input2.disabled = true
            input1.disabled = true
            input3.disabled = true
        }
        row.appendChild(cell5)     
        tbody.appendChild(row)
    }
}



function tableNonAdmin(itemList) {
    const actions = ['Close']
    addActions(actions)

    const table = document.getElementById('request-table');

    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < itemList.length; i++) {
        const row = document.createElement('tr');
        const rowData = itemList[i];
        const keys = ['product_id', 'product_name', "quantity_donated", 'expiration_date', 'verified']
        keys.map(key =>{
            const cell = document.createElement('td');

            if(key == 'expiration_date'){
                let date = new Date(rowData[key])
                cell.textContent = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(); 
            }else{
                cell.textContent = rowData[key];}
            
            if(key == 'verified'){
               rowData[key] == false ? cell.textContent = 'No' : cell.textContent = 'Yes'
            }

            row.appendChild(cell);
        })
    tbody.appendChild(row)
    }
}
