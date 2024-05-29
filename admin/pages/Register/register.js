import areasAPI from "../../api/areasAPI.js";
import employeesApi from "../../api/employeesAPI.js";

const registerBtn = document.getElementById("register");
const backBtn = document.getElementById("back");
const areasSelect = document.getElementById("area");

const fetchAreas = async () => {
	const response = await areasAPI.getAllAreas();
	console.log("response", response);
	response.map((area) => {
		const option = document.createElement("option");
		option.value = area.areaNum;
		option.textContent = area.areaName;
		areasSelect.appendChild(option);
	});
};

fetchAreas();

registerBtn.addEventListener("click", async () => {
	const id = document.getElementById("id").value;
	const firstName = document.getElementById("firstName").value;
	const lastName = document.getElementById("lastName").value;
	const phone = document.getElementById("phone").value;
	const area = document.getElementById("area").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const response = await employeesApi.register(
		id,
		firstName,
		lastName,
		phone,
		email,
		area,
		password
	);

	if (response.status !== 200) {
		alert("שגיאה בחיבור לשרת");
	}
	const responseData = await response.json();
	console.log("response", responseData);
	if (responseData === 1) {
		alert("נרשמת בהצלחה !");
		document.location.href = "../Login/login.html";
	} else {
		alert("שגיאה");
	}
});

backBtn.addEventListener("click", () => {
	document.location.href = "../Login/login.html";
});
