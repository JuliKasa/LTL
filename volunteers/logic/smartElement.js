import activitiesApi from "../api/activitiesApi.js";
import volunteersApi from "../api/volunteersApi.js";
import { volunteerFits } from "./volunteersLogic.js";

const smartComponent = {
	checkForNearActivity: async (user) => {
		const allActivities = await activitiesApi.getActivities();
		for (let i = 0; i < allActivities.length; i++) {
			// console.log(
			// 	"allActivities[i].activitiesProfessions()",
			// 	allActivities[i].activitiesProfessions
			// );
		}
		const now = new Date();

		const tomorrow = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + 1
		);
		tomorrow.setHours(0, 0, 0, 0);

		const tomorrowActivities = [];
		for (let i = 0; i < allActivities.length; i++) {
			const activity = allActivities[i];
			// console.log("activity", activity.activitiesProfessions.length);

			if (
				new Date(activity.date).getDate() === tomorrow.getDate() &&
				new Date(activity.date).getMonth() === tomorrow.getMonth() &&
				new Date(activity.date).getFullYear() === tomorrow.getFullYear()
			) {
				tomorrowActivities.push(activity);
			}
		}
		for (let i = 0; i < tomorrowActivities.length; i++) {
			console.log(
				tomorrowActivities[i].actName +
					" " +
					tomorrowActivities[i].activitiesProfessions.length
			);
		}
		if (tomorrowActivities.length == 0) {
			return {
				activitiesFound: false,
				smartFilter: [],
			};
		}

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

		const smartFilter = [];

		for (let i = 0; i < tomorrowActivities.length; i++) {
			if (volunteerFits(user, tomorrowActivities[i]))
				smartFilter.push(tomorrowActivities[i]);
		}
		// console.log("smartFiler", smartFiler);
		// const smartFilter = tomorrowActivities.filter((activity) => {
		// 	// console.log("-----", activity.activitiesProfessions);
		// 	if (activity.status === true) return;
		// 	if (volunteerFits(user, activity)) {
		// 		return true;
		// 	}
		// 	return false;
		// });
		return {
			activitiesFound: true,
			smartFilter: smartFilter,
		};
	},
};

export default smartComponent;
