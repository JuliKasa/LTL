const areasAPI = {
	getAllAreas: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Areas",
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
		return response.json();
	},
};
export default areasAPI;
