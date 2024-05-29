import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import MobileHeader from "../../components/MobileHeader";
import { UserContext } from "../../context/UserContext";
import { Text } from "@rneui/base";
import smartComponent from "../../logic/smartElement";
import { useNotifications } from "../../hooks/useNotifications";

const Home = ({ navigation }) => {
	const { user } = useContext(UserContext);
	const [smartFiltered, setSmartFiltered] = useState([]);
	const { schedulePushNotification } = useNotifications();

	const checkBySmartFilter = async () => {
		const result = await smartComponent.checkForNearActivity(user);
		if (result && result.smartFilter.length > 0) {
			await schedulePushNotification(
				"גדולים מהחיים - התראת התנדבות",
				`ישנן ${result.smartFilter.length} התנדבויות שזקוקות לך `,
				`123`
			);
		}
		setSmartFiltered(result.smartFilter);
	};

	useEffect(() => {
		checkBySmartFilter();
	}, []);

	const renderSmartFilter = () => {
		if (smartFiltered.length === 0) return <></>;
		return (
			<ScrollView
				contentContainerStyle={[styles.container, styles.activitiesContainer]}
			>
				{smartFiltered.map((activity, index) => {
					return (
						<TouchableOpacity
							key={index}
							style={styles.activityRow}
							onPress={() => {
								navigation.navigate("ActivityDetails", {
									activity: activity.activity,
									volunteers: activity.volunteers,
								});
							}}
						>
							<Text style={{ fontWeight: "bold" }}>
								{new Date(activity.activity.date).toLocaleDateString("he-il")}
							</Text>
							<Text style={{ fontWeight: "bold", fontSize: 12 }}>
								{activity.activity.location}
							</Text>
							<Text style={{ fontWeight: "bold" }}>
								{activity.activity.actName}
							</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		);
	};

	const renderActivities = () => {
		return (
			<ScrollView
				contentContainerStyle={[styles.container, styles.activitiesContainer]}
			>
				{user.activities.map((activity, index) => {
					return (
						<TouchableOpacity key={index} style={styles.activityRow}>
							<Text style={{ fontWeight: "bold" }}>
								{new Date(activity.date).toLocaleDateString("he-il")}
							</Text>
							<Text style={{ fontWeight: "bold", fontSize: 12 }}>
								{activity.location}
							</Text>
							<Text style={{ fontWeight: "bold" }}>{activity.actName}</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		);
	};
	return (
		<View style={[mainStyles.pageContainer, mainStyles.coloredBackground]}>
			<MobileHeader navigation={navigation} />
			<View
				style={[
					mainStyles.pageContainer,
					mainStyles.coloredBackground,
					{ gap: 10, padding: 10 },
				]}
			>
				<View style={styles.header}>
					<Text style={mainStyles.title}>
						שלום {user.name} {user.fname}
					</Text>
					<Text style={mainStyles.title}>
						{new Date().toLocaleDateString("he-il")}
					</Text>
				</View>

				<View style={[mainStyles.elevatedPanel, styles.container]}>
					<Text
						style={[mainStyles.title, { textAlign: "right", width: "100%" }]}
					>
						ההתנדבויות הקרובות שלך:
					</Text>
					{renderActivities()}
				</View>
				<View style={[mainStyles.elevatedPanel, styles.container]}>
					<Text
						style={[
							mainStyles.title,
							{ backgroundColor: "white", fontSize: 15 },
						]}
					>
						התנדבויות קרובות שצריכות אותך:
					</Text>
					{renderSmartFilter()}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 0.8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "start",
		width: "100%",
	},
	header: {
		width: "100%",
		height: 50,
		backgroundColor: "rgba(255, 255, 255, 1)",
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 5,
		borderRadius: 10,
	},

	activityRow: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		backgroundColor: "rgba(0, 0, 255, 0.6)",
		borderRadius: 10,
	},
	activitiesContainer: {
		gap: 10,
	},
});

export default Home;
