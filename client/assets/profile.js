const message = document.getElementById("welcomeMessage");
const donations = document.getElementById("donations");
const blurb = document.getElementById("welcomeBlurb");
const requests = document.getElementById("requests");
backendURL = "https://communityapp-gsbn.onrender.com/";

sessionStorage.setItem("sneaky", "70");

async function loadProfile() {
	let headers = {};
	if (localStorage.token) {
		donations.style.visibility = "visible";
		requests.style.visibility = "visible";

		console.log(donations);
		headers = { Authorization: localStorage.token };

		const options = {
			method: "GET",
			headers: {
				Authorization: localStorage.token,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};

		const response = await fetch("https://communityapp-gsbn.onrender.com/user/profile", options);
		const data = await response.json();
		console.log(data);
		message.textContent = `Welcome back ${data.username}!`;
		window.isAdmin = data.isAdmin;
		if (data.isAdmin == true) {
			blurb.textContent = "Please manage donations and requests made below";
		} else {
			blurb.textContent = "Find your donations and requests below!";
		}
	}
}

// function updateTable_donation(tableData) {
// 	const tbody = donations.querySelector("tbody");
// 	tbody.innerHTML = "";
// 	console.log(tableData.length);
// 	for (let i = 0; i < tableData.length; i++) {
// 		const row = document.createElement("tr");
// 		const rowData = tableData[i];
// 		const keys = ["id", "donation_date", "status"];

// 		const cell1 = document.createElement("td");
// 		const a = document.createElement("a");
// 		a.textContent = rowData["id"]; //Link to get donation by id
// 		a.setAttribute("href", `http://127.0.0.1:5500/client/my_donation/my_donation.html?id=${rowData["id"]}`);
// 		cell1.appendChild(a);

// 		row.appendChild(cell1);
// 		const cell2 = document.createElement("td");

// 		let donationDate = new Date(rowData["donation_date"]);
// 		const days = donationDate.getFullYear() + "-" + (donationDate.getMonth() + 1) + "-" + donationDate.getDate();
// 		cell2.textContent = days;
// 		row.appendChild(cell2);

// 		const cell3 = document.createElement("td");
// 		cell3.textContent = rowData["status"];
// 		row.appendChild(cell3);

// 		tbody.appendChild(row);
// 	}
// }

const itemsPerPage = 10;
let currentPage = 1;

function updateTable_donation(tableData) {
	const tbody = donations.querySelector("tbody");
	tbody.innerHTML = "";

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	for (let i = startIndex; i < endIndex && i < tableData.length; i++) {
		const row = document.createElement("tr");
		const rowData = tableData[i];
		const keys = ["id", "donation_date", "status"];

		const cell1 = document.createElement("td");
		const a = document.createElement("a");
		a.textContent = rowData["id"];
		a.setAttribute("href", `http://127.0.0.1:5500/client/my_donation/my_donation.html?id=${rowData["id"]}`);
		cell1.appendChild(a);
		row.appendChild(cell1);

		const cell2 = document.createElement("td");
		let donationDate = new Date(rowData["donation_date"]);
		const days = donationDate.getFullYear() + "-" + (donationDate.getMonth() + 1) + "-" + donationDate.getDate();
		cell2.textContent = days;
		row.appendChild(cell2);

		const cell3 = document.createElement("td");
		cell3.textContent = rowData["status"];
		row.appendChild(cell3);

		tbody.appendChild(row);
	}
}

// Function to navigate to the next page
function nextPage() {
	currentPage++;
	updateTable_donation(tableData);
}

// Function to navigate to the previous page
function previousPage() {
	if (currentPage > 1) {
		currentPage--;
		updateTable_donation(tableData);
	}
}

// function updateTable_request(tableData) {
// 	const tbody = requests.querySelector("tbody");
// 	tbody.innerHTML = "";
// 	console.log(tableData[0]);
// 	console.log(tableData.length);
// 	for (let i = 0; i < tableData.length; i++) {
// 		const row = document.createElement("tr");
// 		const rowData = tableData[i];
// 		const keys = ["id", "request_date", "status"];

// 		for (let j = 0; j <= 2; j++) {
// 			const cell = document.createElement("td");

// 			if (j != 1) {
// 				if (j == 2) {
// 					cell.id = `Status${rowData.id}`;
// 				}
// 				if (rowData[keys[j]] == null) {
// 					cell.textContent = "Unavailable";
// 				} else {
// 					cell.textContent = rowData[keys[j]];
// 				}
// 			} else {
// 				let donationDate = new Date(rowData["request_date"]);
// 				const days = donationDate.getFullYear() + "-" + (donationDate.getMonth() + 1) + "-" + donationDate.getDate();
// 				cell.textContent = days;
// 				//row.appendChild(cell);
// 			}
// 			row.appendChild(cell);
// 		}

// 		if (isAdmin == true) {
// 			const cell = document.createElement("td");
// 			const button = document.createElement("button");
// 			button.innerHTML = "Collected";
// 			button.classList.add("add-button");
// 			button.classList.add("loginButton");
// 			button.id = rowData.id;
// 			cell.appendChild(button);
// 			row.appendChild(cell);

// 			eventListeners();
// 		}

// 		tbody.appendChild(row);
// 	}
// }

function updateTable_request(tableData) {
	const tbody = requests.querySelector("tbody");
	tbody.innerHTML = "";

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	for (let i = startIndex; i < endIndex && i < tableData.length; i++) {
		const row = document.createElement("tr");
		const rowData = tableData[i];
		const keys = ["id", "request_date", "status"];

		for (let j = 0; j <= 2; j++) {
			const cell = document.createElement("td");

			if (j != 1) {
				if (j == 2) {
					cell.id = `Status${rowData.id}`;
				}
				if (rowData[keys[j]] == null) {
					cell.textContent = "Unavailable";
				} else {
					cell.textContent = rowData[keys[j]];
				}
			} else {
				let requestDate = new Date(rowData["request_date"]);
				const days = requestDate.getFullYear() + "-" + (requestDate.getMonth() + 1) + "-" + requestDate.getDate();
				cell.textContent = days;
			}
			row.appendChild(cell);
		}

		if (isAdmin == true) {
			const cell = document.createElement("td");
			const button = document.createElement("button");
			button.innerHTML = "Collected";
			button.classList.add("add-button");
			button.classList.add("loginButton");
			button.id = rowData.id;
			cell.appendChild(button);
			row.appendChild(cell);
		}

		tbody.appendChild(row);
	}
}

// Function to navigate to the next page
function nextPage_request() {
	currentPage++;
	updateTable_request(tableData);
}

// Function to navigate to the previous page
function previousPage_request() {
	if (currentPage > 1) {
		currentPage--;
		updateTable_request(tableData);
	}
}

async function getStock() {
	console.log("HI");
	const options = {
		methods: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: localStorage.token,
		},
	};
	const request = await fetch("https://communityapp-gsbn.onrender.com/donation", options);
	console.log(request);
	const table = await request.json();
	console.log(donations);

	const request2 = await fetch("https://communityapp-gsbn.onrender.com/request", options);
	const table_2 = await request2.json();

	updateTable_donation(table);
	updateTable_request(table_2);
	// updatePagination(table)

	return (tableData = table);
}

async function getRequests() {
	const options = {
		methods: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: localStorage.token,
		},
	};
	const request = await fetch("https://communityapp-gsbn.onrender.com/request", options);
	const table = request.json();
	return (tableData = table);
}

function eventListeners() {
	let addButtons = document.getElementsByClassName("add-button");

	for (let i = 0; i < addButtons.length; i++) {
		const button = addButtons[i];
		button.addEventListener("click", closeRequest);
	}
}

async function closeRequest(e) {
	const tableData = await getRequests();
	const item = await tableData.find((element) => element["id"] == e.target.id);
	e.target.textContent = "Closed";
	e.target.disabled = true;
	console.log(item);

	const options = {
		methods: "PATCH",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: localStorage.token,
		},
	};
	const response = await fetch(`https://communityapp-gsbn.onrender.com/request/${e.target.id}`, options);
	const data = await response.json();

	const cell = document.getElementById(`Status${e.target.id}`);
	cell.textContent = "Collected";
	console.log(data);
}

let tableData = [];

loadProfile();
getStock();
