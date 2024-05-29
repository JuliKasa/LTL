import volunteersAPI from "../../api/volunteersAPI.js";
import activitiesAPI from "../../api/activitiesAPI.js";
import {
	addCalendarEvent,
	clearCalendarEvents,
	refreshActivitiesTimetableView,
} from "../../components/ActivityViewerPanel.js";
import createNewActivity from "../../components/CreateActivity/createActivity.js";
import smartComponent from "../../logic/smartElement.js";

let volunteersData = [];
let activitiesData = [];
let hospitalsData = [];
let selectedDate = new Date();

const createNewEventButton = document.getElementById("createNewEventButton");
if (createNewEventButton) {
	createNewEventButton.addEventListener("click", () => {
		showNewEventModal();
	});
}

const newEventModal = document.getElementById("createActivityModal");
const showNewEventModal = async () => {
	newEventModal.innerHTML = "";
	newEventModal.style.visibility = "visible";
	const closeBtn = document.createElement("button");
	closeBtn.classList.add("closeBtn");
	closeBtn.innerText = "✖️";
	closeBtn.addEventListener("click", () => {
		closeNewActivityModal();
	});
	newEventModal.appendChild(closeBtn);
	// const formWrapper = document.createElement("div");
	// formWrapper.classList.add("formWrapper");
	newEventModal.appendChild(
		await createNewActivity(refreshActivitiesViewer, closeNewActivityModal)
	);
	// newEventModal.appendChild(formWrapper);
};
export const closeNewActivityModal = () => {
	newEventModal.style.visibility = "collapse";
};

export const closeModal = () => {
	if (newEventModal) newEventModal.style.visibility = "collapse";
};

const refreshVolunteersData = async () => {
	volunteersData = await volunteersAPI.getAllVolunteers();
};

export const refreshActivitiesData = async () => {
	// refreshActivitiesTimetableView();
	// console.log("refreshActivitiesTimetableView", refreshActivitiesTimetableView);
	activitiesData = await activitiesAPI.getAllActivities();
	if (!activitiesData) return;
	activitiesData.map((activity, index) => {
		const isManned = activity.status === true ? "מאויישת" : "לא מאויישת";
		const activityText =
			activity.actName +
			" - " +
			activity.shortDesc +
			", (" +
			activity.amount +
			") " +
			isManned;

		addCalendarEvent(
			activity.actNum,
			activityText,
			activity.startHour,
			activity.endHour,
			activity.date
		);
	});
	// console.log("activitiesData", activitiesData);
};

export const setSelectedDate = (newSelectedDate) => {
	selectedDate = newSelectedDate;
	// refreshCalendar(selectedDate)
	// refreshEventChart(selectedDate)
};

export const refreshActivitiesViewer = () => {
	clearCalendarEvents();
	refreshActivitiesData();
};
const smartAlert = document.getElementById("smartAlert");

const showSmartAlert = (data) => {
	console.log("data", data);
	data = data.filter((dataItem) => dataItem !== undefined);
	smartAlert.style.visibility = "visible";
	smartAlert.innerHTML = `
	<button id="smartAlertCloseBtn">סגור</button>
		<div class="smartAlertHeader">
			<h4>לתשומת לבך, ישנן התנדבויות לא מאוישות המתקיימות מחר</h4>
		</div>
		<div class="smartAlertContent">
			${data.map((dataItem) => {
				return `
						<div class="smartAlertItem">
							<label>${dataItem.activity.actName}</label>
							<label>לאחר איוש חכם מאוישת ב:</label>
							<label>${dataItem.activity.amount} / ${dataItem.volunteers.length}</label>
						</div>
					`;
			})}
		</div>
	`;

	const smartAlertCloseBtn = document.getElementById("smartAlertCloseBtn");
	smartAlertCloseBtn.addEventListener("click", () => {
		smartAlert.style.visibility = "collapse";
	});
};

// if (window.location.href === "http://127.0.0.1:5500/pages/Home/home.html") {
refreshActivitiesData();
refreshVolunteersData();
document.addEventListener("DOMContentLoaded", async function () {
	const smartResult = await smartComponent.checkForNearActivity();
	console.log("smartResult", smartResult);
	if (smartResult.activitiesFound) {
		showSmartAlert(smartResult.smartFilter);
	} else {
		smartAlert.style.visibility = "collapse";
	}
});
// }
