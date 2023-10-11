function revealPassword() {
	const x = document.getElementById("password");
	console.log(x);
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
}
