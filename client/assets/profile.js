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
                "Authorization": localStorage.token,
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

function updateTable_donation(tableData) {
    const tbody = donations.querySelector('tbody');
    tbody.innerHTML = '';
    console.log(tableData.length)
    for (let i = 0; i < tableData.length; i++) {
        const row = document.createElement('tr');
        const rowData = tableData[i];
        const keys = ['id', 'donation_date', "status"]
        
        
        const cell1 = document.createElement('td');
        const a = document.createElement("a")
        a.textContent = rowData["id"]; //Link to get donation by id
        a.setAttribute("href", `http://127.0.0.1:5500/client/my_donation/my_donation.html?id=${rowData["id"]}`)
        cell1.appendChild(a)

        row.appendChild(cell1);
        const cell2 = document.createElement("td")
        
        let donationDate = new Date(rowData["donation_date"])
        const days = donationDate.getFullYear()+'-'+(donationDate.getMonth()+1)+'-'+donationDate.getDate();
        cell2.textContent = days
        row.appendChild(cell2)

        const cell3 = document.createElement("td")
        cell3.textContent = rowData["status"]
        row.appendChild(cell3)

        tbody.appendChild(row);
    }
}
async function getStock(){
    console.log("HI")
    const options = {
        methods: "GET",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }}
    const request = await fetch('https://communityapp-gsbn.onrender.com/donation', options)
    console.log(request)
    const table = await request.json()
    console.log(donations)

    const request2 = await fetch('https://communityapp-gsbn.onrender.com/donation', options)
    const table_2 = await request2.json()

     updateTable_donation(table);
     updateTable_request()
    // updatePagination(table)

    return tableData = table

    
}

let tableData = []



loadProfile()
getStock()
