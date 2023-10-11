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

const a = document.getElementById("Login");
console.log(a);
a.addEventListener("submit", loginRequest);

async function loginRequest(e) {
	e.preventDefault();
	const form = new FormData(e.target);

	const options = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: form.get("email_input"),
			password: form.get("password_input"),
		}),
	};

	const response = await fetch("https://communityapp-gsbn.onrender.com/user/login");
	const data = await response.json();
	console.log(data);

	if (response.status == 200) {
		localStorage.setItem("token", data.token);
		window.location.assign("board.html");
	} else {
		alert(data.error);
	}
}
