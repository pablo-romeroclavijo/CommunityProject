const message = document.getElementById("welcomeMessage")
const donations = document.getElementById("donations")
console.log(donations)


async function loadProfile(){
    let headers = {}
    if (localStorage.token){
        headers = {"Authorization": localStorage.token}
        console.log("Hi")

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

        
    }
    

    //message.textContent = `Welcome ${}`

}

loadProfile()
