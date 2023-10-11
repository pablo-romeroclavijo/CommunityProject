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


async function getStock(){
    console.log("HI")
    const options = {
        method: "GET",
        header:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': '88e0ee88-40c8-46ac-a3cb-001d80a9eebf'
        }}
    const request = await fetch(backendURL + 'donation/', options)
    const table = await request.json()
    console.log(table)

    updateTable(table);
    updatePagination(table)

    return tableData = table

    
}


loadProfile()
getStock()
