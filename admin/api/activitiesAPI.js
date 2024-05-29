const activitiesApi = {
	getAllActivities: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Activities"
		);
		const data = await response.json();
		return data;
	},
	createAnActivity: async (
		activitiesProfessions,
		actName,
		shortDesc,
		location,
		date,
		startHour,
		endHour,
		amount,
		areaNum,
		employeeID
	) => {
		console.log("activitiesProfessions", activitiesProfessions);
		const activity = {
			activitiesProfessions: activitiesProfessions,
			actNum: 0,
			actName,
			shortDesc,
			location,
			date: new Date(date),
			startHour: new Date(startHour),
			endHour: new Date(endHour),
			amount,
			areaNum,
			employeeID,
			status: false,
		};

		console.log("activity", activity);
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Activities",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(activity),
			}
		);
		console.log("activity creation response", response);

		const data = await response.json();
		console.log("data", data);

		return response;
	},
};

export default activitiesApi;
