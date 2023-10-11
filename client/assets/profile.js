const message = document.getElementById("welcomeMessage")
const donations = document.getElementById("donations")
console.log(donations)
backendURL = "https://communityapp-gsbn.onrender.com/"

async function loadProfile(){
    let headers = {}
    if (localStorage.token){
        headers = {"Authorization": localStorage.token}

        const options = {
            method: "GET",
            headers: {
                "authorization": localStorage.token,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }
    
        const response = await fetch("https://communityapp-gsbn.onrender.com/user/profile", options)
        const data = await response.json()
        console.log(data)
        message.textContent = `Welcome back ${data.username}!`    

    //message.textContent = `Welcome ${}`

}
}

function updateTable(tableData) {

    const tbody = donations.querySelector('tbody');
    tbody.innerHTML = '';
    let currentPage = 1
    let itemsPerPage = 10
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;


    console.log(tableData)
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
        button.innerHTML = 'DONATE'
        button.classList.add('add-button')
        button.id = rowData.product_id
        cell.appendChild(button)
        row.appendChild(cell)

        tbody.appendChild(row);
    }
}
async function getStock(){
    console.log("HI")
    const options = {
        method: "GET",
        headers:{
            'authorization': localStorage.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
        }}
    const request = await fetch('https://communityapp-gsbn.onrender.com/donation', options)
    console.log(request)
    const table = await request.json()
    console.log(donations)

    updateTable(donations);
    //updatePagination(donations)

    return tableData = table

    
}

let tableData = []



loadProfile()
getStock()
