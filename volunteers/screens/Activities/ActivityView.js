import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import { Button, Text } from "@rneui/base";
import volunteersApi from "../../api/volunteersApi";
import { UserContext } from "../../context/UserContext";

const ActivityView = ({ activity, close }) => {
	const { user } = useContext(UserContext);
	const submit = async () => {
		const res = await volunteersApi.signUpForActivity(user, activity);
		console.log("res", res);
		if (res.status === 200) {
			alert("נרשמת בהצלחה !");
			close();
		} else {
			console.log(res.json());
			// const resJson = await res.json();
			// console.log("resJson", resJson);
		}
	};

	return (
		<View style={[mainStyles.pageContainer, styles.activityContainer]}>
			<View
				style={[
					mainStyles.elevatedPanel,
					styles.panel,
					{ justifyContent: "space-between" },
				]}
			>
				<View>
					<Button
						onPress={close}
						title="x"
						containerStyle={[
							mainStyles.button,
							{
								width: 50,
								height: 50,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							},
						]}
						titleStyle={{
							width: "100%",
							height: "100%",
							fontSize: 20,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					/>
					<Text style={[mainStyles.title]}>{activity.actName}</Text>

					<Text>
						<Text style={mainStyles.formLabel}>מועד: </Text>
						<Text style={{ fontWeight: "bold" }}>
							{new Date(activity.date).toLocaleDateString("he-IL")}🔹{" "}
						</Text>
						<Text style={{ fontWeight: "bold" }}>
							{activity.startHour.split("T")[1].split(":")[0]}
						</Text>
						<Text style={{ fontWeight: "bold" }}>
							{activity.startHour.split("T")[1].split(":")[1]}-
						</Text>
						<Text style={{ fontWeight: "bold" }}>
							{activity.endHour.split("T")[1].split(":")[0]}
						</Text>
						<Text style={{ fontWeight: "bold" }}>
							{activity.endHour.split("T")[1].split(":")[1]}
						</Text>
					</Text>
					<Text>
						<Text style={mainStyles.formLabel}>מיקום:</Text> {activity.location}
					</Text>
					<Text>
						<Text style={mainStyles.formLabel}>תיאור: </Text>
						{activity.shortDesc}
					</Text>
				</View>
				<Button
					onPress={submit}
					title="הרשם  להתנדבות"
					buttonStyle={mainStyles.button}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	activityContainer: {
		width: 400,
	},
	panel: {
		display: "flex",
		flexDirection: "column",
		flex: 0.5,
		// padding: 50,
	},
});

export default ActivityView;
