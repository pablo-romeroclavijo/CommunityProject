localStorage.clear()

function revealPassword() {
	const x = document.getElementById("password");
	console.log(x);
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
}

const a = document.getElementById("login");
console.log(a);
a.addEventListener("submit", loginRequest);

async function loginRequest(e) {
	e.preventDefault();
	const form = new FormData(e.target);
	const options = {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: form.get("username"),
			password: form.get("password"),
		}),
	};
    console.log(form.get("username"), form.get("password"))
	const response = await fetch("https://communityapp-gsbn.onrender.com/user/login", options);
	const data = await response.json();
	console.log(data);

	if (response.status == 200) {
		localStorage.setItem("token", data.token);
		window.location.assign("profile.html");
	} else {
		alert(data.error);
	}
}

