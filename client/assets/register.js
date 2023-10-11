function revealPassword() {
	const x = document.getElementById("password");
	console.log(x);
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
}

const a = document.getElementById("register");
a.addEventListener("submit", registerNewUser);
console.log(a.target);

async function registerNewUser(e){
    e.preventDefault()
    const form = new FormData(e.target)
    console.log(e.target)
    try {
        if(ValidateEmail(document.getElementById("email").value)){

            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: document.getElementById("username").value,
                    email: document.getElementById("email").value,
                    postcode: document.getElementById("postcode").value,
                    password: document.getElementById("password").value
                })
            }

            const response = await fetch("https://communityapp-gsbn.onrender.com/user/register", options);
            const data = await response.json();
        
        
            if (response.status == 200) {
        
                localStorage.setItem("token", data.token);
                window.location.assign("profile.html");
            } else {
                alert(data.error);
            }
            
            
        }
        else{//pass
        }
    } catch (error) {
        
    }
}


function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!input.match(validRegex)){
      alert("Invalid email address!");
    document.form1.text1.focus();
      return false;
    }else{return true}
  
  }