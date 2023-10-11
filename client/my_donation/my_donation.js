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
    document.getElementById("donation_id").textContent = "Donation: " 



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
