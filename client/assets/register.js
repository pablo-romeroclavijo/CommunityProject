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
console.log(a);

async function registerNewUser(e) {
	e.preventdefault();
	const form = new FormData(e.target);

	const options = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			fullname: form.get("name"),
			email: form.get("email"),
			DOB: form.get("dob"),
			password: form.get("password"),
		}),
	};
	const response = await fetch("https://communityapp-gsbn.onrender.com/user/login");
	const data = await response.json();
}
