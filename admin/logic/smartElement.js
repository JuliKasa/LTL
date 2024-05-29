import activitiesApi from "../api/activitiesAPI.js";
import volunteersAPI from "../api/volunteersAPI.js";
import { getFittingVolunteers } from "./volunteersLogic.js";

const smartComponent = {
	checkForNearActivity: async () => {
		console.log("Checking smart component...");
		const allActivities = await activitiesApi.getAllActivities();
		const now = new Date();

		const tomorrow = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + 1
		);
		tomorrow.setHours(0, 0, 0, 0);

		const tomorrowActivities = allActivities.filter((activity) => {
			return (
				new Date(activity.date).getDate() === tomorrow.getDate() &&
				new Date(activity.date).getMonth() === tomorrow.getMonth() &&
				new Date(activity.date).getFullYear() === tomorrow.getFullYear()
			);
		});
		if (tomorrowActivities.length == 0) {
			return {
				activitiesFound: false,
				smartFilter: [],
			};
		}

		const allVolunteers = await volunteersAPI.getAllVolunteers();
		let allManned = true;
		let i = 0;
		while (i < tomorrowActivities.length && allManned) {
			if (tomorrowActivities[i].status === false) allManned = false;
			i++;
		}
		if (allManned) {
			return {
				activitiesFound: false,
				smartFilter: [],
			};
		}
		const smartFilter = tomorrowActivities.map((activity) => {
			if (activity.status === true) return;
			const fittingVolunteers = getFittingVolunteers(allVolunteers, activity);
			return {
				activity,
				volunteers: fittingVolunteers,
			};
		});
		return {
			activitiesFound: true,
			smartFilter: smartFilter,
		};
	},
};

export default smartComponent;
