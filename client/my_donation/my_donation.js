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
        console.log(data)

        isAdmin = data.isAdmin

    }}

let requestID
// Request function

function addActions(list){
    const actions = document.getElementById("dropdown")
    list.map(action =>{
        console.log(action)
        const option = document.createElement('option')
        option.id = action
        option.value = action
        option.textContent = action
        console.log(option)
        option.addEventListener("click", updateStatus)
        actions.appendChild(option)
    })
    
}

function updateStatus(e){
console.log(    e.target.value)
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
    console.log(data)

    alert("Donation marked as received")

}

function verifyItems(){
    //pass
}



// Send request
const token = localStorage.token
const id = new URLSearchParams(window.location.search).get('id')
console.log(token, id)

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
    console.log(response)
    donationID = response.donation.id
    loadRequest(response)

}




function loadRequest(response){
    let donatioDate = new Date(response.donation.donation_date)
    const days = donatioDate.getFullYear()+'-'+(donatioDate.getMonth()+1)+'-'+donatioDate.getDate(); 

    document.getElementById("donation_id").textContent = "Donation Locator:      " + response.event.code
    document.getElementById("donation_date").textContent = "Donation Status:    " + response.donation.status
    document.getElementById("donation_status").textContent = "Donation date:    " + days
    const received = document.getElementById("donation_received")
    if(response.donation.received == false){
        received.textContent = 'Donation Received: Pending' 
    }else{
        received.textContent = 'Donation Received:Yes'
    }

    const itemList = response.responseItems

    console.log(isAdmin)
    isAdmin == true ? tableNonAdmin(itemList) : tableAdmin(itemList)
}

function tableAdmin(itemList){
    const markCollected = document.getElementById('mark-colected')
    markCollected.style.display = 'block'

    const button = document.getElementById('collected-button')
    button.addEventListener('click', markAsCollected)


  
    const actions = ['Close', 'Hold', 'Report']
    addActions(actions)
    const table = document.getElementById('request-table');

    const tbody = table.querySelector('tbody');
    const thead = table.querySelector('thead tr')
    
    console.log(tbody)
    tbody.innerHTML = '';

    const th = document.createElement('th')
    th.textContent = 'Action'
    thead.appendChild(th)


    for (let i = 0; i < itemList.length; i++) {
        const form = document.createElement('form')

        console.log('aaa', i, itemList[i])
        const row = document.createElement('tr');
        const rowData = itemList[i];

        const cell1 = document.createElement('td')
        cell1.textContent = rowData['product_id']
        row.appendChild(cell1)

        const cell2 = document.createElement('td')
        cell2.textContent = rowData['product_name']
        row.appendChild(cell2)

        const cell4 = document.createElement('td');
        const input2 = document.createElement('input')
        input2.type = 'number'
        input2.defaultValue = rowData['quantity_donated']

        cell4.appendChild(input2)
        row.appendChild(cell4)

        const cell3 = document.createElement('td');
        const input1 = document.createElement('input')
        let date = new Date(rowData['expiration_date'])
        const day = date.toISOString().split("T")[0];
        input1.type = 'date'
        input1.defaultValue = day

        cell3.appendChild(input1)
        row.appendChild(cell3)

        const cell5 = document.createElement('td')
        rowData['verified'] == false ? cell5.textContent = 'No' : cell5.textContent = 'Yes'
        row.appendChild(cell5)


        const cell6 = document.createElement('td');
        const input3 = document.createElement('input')
        input3.type = 'submit'
        input3.value = 'Verify'
        cell6.appendChild(input3)
        row.appendChild(cell6)

        //form.appendChild(row)        
        tbody.appendChild(row)
    }
}



function tableNonAdmin(itemList) {
    const actions = ['Close']
    addActions(actions)

    const table = document.getElementById('request-table');

    const tbody = table.querySelector('tbody');
    console.log(tbody)
    tbody.innerHTML = '';

    for (let i = 0; i < itemList.length; i++) {
        console.log('aaa', i, itemList[i])
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
    console.log(row)
    tbody.appendChild(row)
    }
}
