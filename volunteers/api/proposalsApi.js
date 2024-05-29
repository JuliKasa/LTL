const proposalsApi = {
	getProposals: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Professions"
		);
		const data = await response.json();
		return data;
	},
};
export default proposalsApi;
