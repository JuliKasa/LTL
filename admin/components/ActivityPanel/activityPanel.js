import volunteersAPI from "../../api/volunteersAPI.js";
import { getFittingVolunteers } from "../../logic/volunteersLogic.js";
import { closeActivityModal } from "../ActivityModal/activityModal.js";

export const createActivityPanel = (selectedVolunteering) => {
	const volunteeringContentPanel = document.createElement("div");
	volunteeringContentPanel.classList.add("volunteeringContentPanel");

	// Header panel
	const headerContainer = document.createElement("div");
	headerContainer.classList.add("volunteeringHeaderContainer");

	// Title
	const title = document.createElement("h2");
	title.innerText = selectedVolunteering.actName;
	headerContainer.appendChild(title);

	// Profession tags
	const professionTagsContainer = document.createElement("div");
	professionTagsContainer.classList.add("professionTagsContainer");
	for (let i = 0; i < selectedVolunteering.activitiesProfessions.length; i++) {
		const professionTag = document.createElement("div");
		// Profession name
		const professionName = document.createElement("label");
		professionName.innerText =
			selectedVolunteering.activitiesProfessions[i].professionName;
		professionTag.appendChild(professionName);
		// Profession Description
		const professionDescription = document.createElement("p");
		professionDescription.innerText =
			selectedVolunteering.activitiesProfessions[i].shortDesc;
		professionTag.appendChild(professionDescription);
		professionTag.classList.add("professionTag");
		professionTagsContainer.appendChild(professionTag);
	}

	// Details container
	const detailsContainer = document.createElement("div");
	detailsContainer.classList.add("volunteeringDetailsContainer");

	// Location
	const locationContainer = document.createElement("div");
	locationContainer.classList.add("detailsItem");
	const locationHeader = document.createElement("label");
	locationHeader.innerText = "מיקום:";
	locationContainer.appendChild(locationHeader);
	const location = document.createElement("label");
	location.innerText = selectedVolunteering.location;
	locationContainer.appendChild(location);
	detailsContainer.appendChild(locationContainer);

	// Date
	const dateInfoContainer = document.createElement("div");
	dateInfoContainer.classList.add("detailsItem");
	const dateHeder = document.createElement("label");
	dateHeder.innerText = "תאריך:";
	dateInfoContainer.appendChild(dateHeder);
	const date = document.createElement("label");
	date.innerText =
		new Date(selectedVolunteering.date).toLocaleDateString("he-IL") +
		" 🔹 " +
		new Date(selectedVolunteering.endHour)
			.toLocaleTimeString("he-IL")
			.split(":")[0] +
		":" +
		new Date(selectedVolunteering.endHour)
			.toLocaleTimeString("he-IL")
			.split(":")[1] +
		" - " +
		new Date(selectedVolunteering.startHour)
			.toLocaleTimeString("he-IL")
			.split(":")[0] +
		":" +
		new Date(selectedVolunteering.startHour)
			.toLocaleTimeString("he-IL")
			.split(":")[1];

	dateInfoContainer.appendChild(date);
	detailsContainer.appendChild(dateInfoContainer);

	// Volunteer status
	const volunteerStatusContainer = document.createElement("div");
	volunteerStatusContainer.classList.add("detailsItem");
	const volunteerStatusHeader = document.createElement("label");
	volunteerStatusHeader.innerText = "מתנדבים / מאוייש:";
	volunteerStatusContainer.appendChild(volunteerStatusHeader);
	const volunteerAmount = document.createElement("label");
	const manned = selectedVolunteering.status === true ? "מאוייש" : "לא מאוייש";
	volunteerAmount.innerText = selectedVolunteering.amount + " 🔹 " + manned;
	volunteerStatusContainer.appendChild(volunteerAmount);
	detailsContainer.appendChild(volunteerStatusContainer);

	// Hospital
	// const hospitalInfoContainer = document.createElement("div");
	// hospitalInfoContainer.classList.add("detailsItem");
	// const hospitalHeder = document.createElement("label");
	// hospitalHeder.innerText = "בית חולילם:";
	// hospitalInfoContainer.appendChild(hospitalHeder);
	// const hospital = document.createElement("label");
	// hospital.innerText = selectedVolunteering.hospital.name;
	// hospitalInfoContainer.appendChild(hospital);
	// detailsContainer.appendChild(hospitalInfoContainer);

	// Description
	const descriptionContainer = document.createElement("div");
	const description = document.createElement("p");
	description.innerText = selectedVolunteering.shortDesc;
	descriptionContainer.appendChild(description);

	// Buttons
	const buttonsContainer = document.createElement("div");
	buttonsContainer.classList.add("activityPanelButtonContainer");
	const manActivity = document.createElement("button");
	manActivity.innerText = "מצב מתנדבים";
	buttonsContainer.appendChild(manActivity);
	manActivity.addEventListener("click", () => {
		findVolunteersForActivity(selectedVolunteering);
	});
	// const  = document.createElement("button");

	volunteeringContentPanel.appendChild(headerContainer);
	volunteeringContentPanel.appendChild(detailsContainer);
	volunteeringContentPanel.appendChild(descriptionContainer);
	volunteeringContentPanel.appendChild(professionTagsContainer);
	volunteeringContentPanel.appendChild(buttonsContainer);

	return volunteeringContentPanel;
};

const findVolunteersForActivity = async (activity) => {
	const volunteers = await volunteersAPI.getAllVolunteers();
	const suitableVolunteers = await getFittingVolunteers(volunteers, activity);
	if (suitableVolunteers.length === 0)
		alert("לא נמצאו מתנדבים מתאימים לאיוש ההתנדבות");
	else {
		let messageText = `נמצאו ${suitableVolunteers.length} מתנדבים מתאימים לאיוש ההתנדבות: \n`;
		for (let i = 0; i < suitableVolunteers.length; i++) {
			messageText +=
				suitableVolunteers[i].name + " " + suitableVolunteers[i].fname + "\n";
		}
		alert(messageText);
	}
	closeActivityModal();
};

// const volunteerFits = (volunteer, activity) => {
// 	// for (let volAct of volunteer.activities) {
// 	// 	if (volAct.actNum === activity.actNum) return false;
// 	// }
// 	if (!areaSuitable(activity.areaNum, volunteer.areas)) return false;
// 	if (!dateSuitable(activity.date, volunteer)) return false;
// 	if (!professionFits(activity.activitieProfessions, volunteer.professions))
// 		return false;
// 	return true;
// };

// const areaSuitable = (activityArea, volunteerAreas) => {
// 	for (let i = 0; i < volunteerAreas.length; i++) {
// 		if (volunteerAreas[i].areaNum === activityArea) return true;
// 	}
// 	return false;
// };

// const dateSuitable = (activityDate, volunteer) => {
// 	const activityWeekDay = new Date(activityDate).getDay();
// 	if (activityWeekDay === 0) return volunteer.sunday;
// 	if (activityWeekDay === 1) return volunteer.monday;
// 	if (activityWeekDay === 2) return volunteer.tuesday;
// 	if (activityWeekDay === 3) return volunteer.wednesday;
// 	if (activityWeekDay === 4) return volunteer.thursday;
// 	if (activityWeekDay === 5) return volunteer.friday;
// 	if (activityWeekDay === 6) return volunteer.saturday;
// };

// const professionFits = (activityProfessions, volunteerProfessions) => {
// 	for (let i = 0; i < volunteerProfessions.length; i++) {
// 		for (let j = 0; j < activityProfessions.length; j++) {
// 			if (
// 				activityProfessions[j].professionNum ===
// 				volunteerProfessions[i].professionNum
// 			)
// 				return true;
// 		}
// 	}
// 	return false;
// };
