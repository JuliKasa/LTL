const proposalApi = {
	getAllProposals: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Proposals",
			{
				mode: "cors",
				cors: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
				},
				accept: "/",
			}
		);
		console.log("response", response);
		const data = await response.json();
		console.log("data", data);

		return data;
		// const response = await fetch(
		// 	"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Proposals"
		// ).then(function (response) {
		// 	console.log("response", response);
		// });
	},
};

export default proposalApi;
