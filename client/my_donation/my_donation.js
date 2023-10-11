backendURL = 'https://communityapp-gsbn.onrender.com'

//Navbar


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }



//Load user
const isAdmin = loadProfile()
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
    }}

// Send request
const token = localStorage.token
const id = new URLSearchParams(window.location.search).get('code')

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
    loadRequest(response)
}

function loadRequest(response){
    let donatioDate = new Date(response.donation.donation_date)
    const days = donatioDate.getFullYear()+'-'+(donatioDate.getMonth()+1)+'-'+donatioDate.getDate(); 

    document.getElementById("donation_id").textContent = "Donation ID: " + response.donation.id
    document.getElementById("donation_date").textContent = "Donation Status: " + response.donation.status
    document.getElementById("donation_status").textContent = "Donation date: " + days
    const received = document.getElementById("donation_received")
    if(response.donation.received == false){
        received.textContent = 'Donation Received: No' 
    }else{
        received.textContent = 'Donation Received:Yes'
    }

    const itemList = response.responseItems
    updateRequestedTable(itemList)  
}

function updateRequestedTable(itemList) {
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
