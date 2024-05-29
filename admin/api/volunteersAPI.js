// volunteer:
// Get-  https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers
// Put-  https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers
// Post (register) - https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/Register
// Post (login)- https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/Login

const volunteersAPI = {
	getAllVolunteers: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers"
		);
		const data = await response.json();
		return data;
	},
};

export default volunteersAPI;
