const volunteersApi = {
	login: async (email, password) => {
		const dataObj = {
			email: email.trim(),
			password: password.trim(),
			name: "string",
			fname: "string",
			phone: "string",
			imageBase64: "string",
			volImage: "string",
		};
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/Login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataObj),
			}
		);
		return response;
	},
	register: async (userObj) => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/Register",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userObj),
			}
		);
		// const data = await response.json();
		// return data;
		return response;
	},

	signUpForActivity: async (userObj, activity) => {
		userObj.activities = [activity];
		// console.log("userObj", userObj);
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/VolAct",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userObj),
			}
		);
		// const data = await response.json();
		// return data;
		return response;
	},
	getAllVolunteers: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers"
		);
		const data = await response.json();
		return data;
	},
};

export default volunteersApi;
