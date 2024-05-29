import proposalApi from "../../api/proposalAPI.js";
import { dataStore } from "../../dataStore.js";

const sidebar = document.getElementById("suggestionsSideBar");
const content = document.getElementById("suggestionsContent");
let selectedSuggestion = null;
const refreshSidebar = async () => {
	sidebar.innerHTML = "";
	const allProposals = await proposalApi.getAllProposals();
	console.log("allProposals", allProposals);
	allProposals.map((idea, index) => {
		const suggestionRow = document.createElement("div");
		suggestionRow.classList.add("suggestionSidebarRow");
		const suggestionTitle = document.createElement("h4");
		suggestionRow.innerText = idea.proposalName;
		suggestionRow.addEventListener("click", () => {
			selectedSuggestion = idea;
			refreshContent();
		});
		sidebar.appendChild(suggestionRow);
	});
};

const refreshContent = () => {
	content.innerHTML = "";
	if (selectedSuggestion == null) return;

	// content panel
	const contentPanel = document.createElement("div");
	contentPanel.classList.add("suggestionContentPanel");

	// header panel
	const headerContainer = document.createElement("div");
	headerContainer.classList.add("suggestionHeaderContainer");
	// header title
	const title = document.createElement("h3");
	title.innerText = selectedSuggestion.title;
	headerContainer.appendChild(title);
	// header date
	const date = document.createElement("p");
	date.innerText = new Date(selectedSuggestion.created).toLocaleDateString(
		"he-IL"
	);
	headerContainer.appendChild(date);

	contentPanel.appendChild(headerContainer);

	// content
	const contentText = document.createElement("p");
	contentText.innerText = selectedSuggestion.content;
	contentPanel.appendChild(contentText);

	// author info
	const authorContainer = document.createElement("div");
	authorContainer.classList.add("suggestionAuthorContainer");
	// avatar
	const authorImage = document.createElement("label");
	authorImage.innerText = selectedSuggestion.author.photo;
	authorContainer.appendChild(authorImage);
	// author first and last name
	const authorInfo = document.createElement("p");
	authorInfo.innerText =
		selectedSuggestion.author.firstName +
		" " +
		selectedSuggestion.author.lastName;
	authorContainer.appendChild(authorInfo);
	contentPanel.appendChild(authorContainer);

	// action panel
	const actionPanel = document.createElement("div");
	actionPanel.classList.add("suggestionActionPanel");
	const approveButton = document.createElement("button");
	approveButton.addEventListener("click", () => {});
	approveButton.value = "אישור";
	approveButton.innerText = "אישור";
	actionPanel.appendChild(approveButton);
	const denyButton = document.createElement("button");
	denyButton.value = "ביטול";
	denyButton.innerText = "ביטול";
	actionPanel.appendChild(denyButton);
	contentPanel.appendChild(actionPanel);

	content.appendChild(contentPanel);
};

refreshSidebar();
refreshContent();
