URL = "http://localhost:3000";

function revealPassword() {
	const x = document.getElementById("password");
	console.log(x);
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
}

// const login = document.getElementById("loginButton");
// login.addEventListener("submit", loginRequest);
// console.log(login);

/*

Request goes to URL http://localhost3000/user/login passes object:{
    username:
    password:
}

//Register goes to http://localhost3000/user/register passes object:{
    username:
    password:
    postcode:
    email:
}

Register auto-logs in
Store the token (returns) in local storage

Profile goes to http://localhost3000/user/profile
Requires that the header contains the token
Options passes the header
method: body[<empty>], header{
    authentication: token - reads local storage
}

Returned all information 
{username: username, identity_verified: identity_verified, postcode: postcode, email: email, family_unit: family_unit}

fetch (`{URL}/uses/<path>`)
*/

async function loginRequest(e) {
	console.log(e);
	const email = e.target.email_input.value;
	console.log(email);
	const options = {
		method: "POST",
	};
}
