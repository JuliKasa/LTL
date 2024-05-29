const professionsApi = {
	getAllProfessions: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Professions"
		);
		return response.json();
	},
};

export default professionsApi;
