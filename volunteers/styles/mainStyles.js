import { StyleSheet } from "react-native";

const mainStyles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
	},
	coloredBackground: {
		backgroundColor: "rgba(0, 0, 255, 0.8)",
	},
	elevatedPanel: {
		width: "80%",
		backgroundColor: "white",
		padding: 20,
		borderRadius: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		gap: 10,
	},

	HorizontalContainerCentered: {
		flexDirection: "row-reverse",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	title: {
		color: "blue",
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
	},
	logo: {
		width: 70,
		height: 70,
	},
	form: {
		display: "flex",
		flexDirection: "column",
	},
	formField: {
		display: "flex",
		flexDirection: "row",
	},
	formLabel: {
		textAlign: "right",
		fontSize: 17,
		color: "blue",
		fontWeight: "bold",
	},
	formInput: {
		borderWidth: 0.5,
		borderColor: "blue",
	},
	button: {
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 10,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	link: {
		color: "blue",
		fontWeight: "bold",
		textDecorationLine: "underline",
	},
	navbarContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		backgroundColor: "white",
		// padding: 2,
	},
	plainText: {
		color: "blue",
		fontSize: 17,
		textWrap: "wrap",
		textAlign: "right",
	},
	headerPanel: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		backgroundColor: "white",
	},
});

export default mainStyles;
