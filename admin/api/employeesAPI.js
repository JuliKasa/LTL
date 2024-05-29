const employeesApi = {
	geAllEmployees: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Employees"
		);
		const data = response.json();
		return data;
	},
	register: async (id, fname, lname, phone, email, areaNum, password) => {
		const userObj = {
			employeeID: parseInt(id),
			fname,
			lname,
			phone,
			email,
			isAdmin: true,
			areaNum: parseInt(areaNum),
			password,
		};

		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Employees/Register",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				cors: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
				},
				accept: "/",

				body: JSON.stringify(userObj),
			}
		);

		return response;
	},

	login: async (email, password) => {
		const requestObj = {
			employeeID: 0,
			fName: "",
			lName: "",
			phone: "",
			email: email,
			isAdmin: true,
			areaNum: 0,
			password: password,
		};
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Employees/Login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "/",
				},

				body: JSON.stringify(requestObj),
			}
		);

		return response;
	},
};

export default employeesApi;
