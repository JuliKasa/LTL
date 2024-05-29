import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import MobileHeader from "../../components/MobileHeader";
import { UserContext } from "../../context/UserContext";
import { Button, Image, Text } from "@rneui/base";
import { Input } from "@rneui/themed";

const Profile = ({ navigation }) => {
	const [editInfoMode, setEditInfoMode] = useState(false);
	const { user } = useContext(UserContext);

	const renderProfileEditForm = () => {
		if (!editInfoMode) {
			return <></>;
		}
		return (
			<View style={[mainStyles.form, styles.infoContainer]}>
				<Text style={[]}>שם:</Text>
				<Input editable={editInfoMode} style={[]}>
					{user.name}
				</Input>

				<Text editable={editInfoMode} style={mainStyles.formLabel}>
					שם משפחה:
				</Text>
				<Input editable={editInfoMode} style={mainStyles.formInput}>
					{user.fname}
				</Input>
				<Text style={mainStyles.formLabel}>אימייל:</Text>
				<Input editable={editInfoMode} style={mainStyles.formInput}>
					{user.email}
				</Input>
				<Text style={mainStyles.formLabel}>טלפון:</Text>
				<Input editable={editInfoMode} style={mainStyles.formInput}>
					{user.phone}
				</Input>
			</View>
		);
	};

	const renderUserAreas = () => {
		return (
			<View style={[styles.areasContainer]}>
				{user.professions.map((profession) => {
					return (
						<TouchableOpacity key={profession.professionNum} style={styles.tag}>
							<Text>{profession.professionName}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	};

	const renderUserProfessions = () => {
		return (
			<View style={[styles.areasContainer]}>
				{user.areas.map((area) => {
					return (
						<TouchableOpacity key={area.areaNum} style={styles.tag}>
							<Text>{area.areaName}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	};

	return (
		<View
			style={[
				mainStyles.pageContainer,
				mainStyles.coloredBackground,
				{
					display: "flex",
					flexDirection: "column",
				},
			]}
		>
			<MobileHeader navigation={navigation} />
			<View style={[styles.container]}>
				<Text style={[mainStyles.title, styles.header]}>פרטי פרופיל:</Text>
				<View style={mainStyles.container}></View>
			</View>

			<ScrollView contentContainerStyle={[styles.contentContainer]}>
				<View style={[mainStyles.form, styles.infoContainer]}>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							flex: 1,
						}}
					>
						<View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
							<Image
								// source={{ uri: `data:${user.imag.type};base64,${user.imag.base64String}` }}
								source={require("../../assets/logo.jpg")}
								containerStyle={styles.photoView}
								style={{ width: 100, height: 100 }}
							/>
							<Button
								onPress={() => setEditInfoMode(!editInfoMode)}
								title="עריכה"
								titleStyle={{
									textAlign: "center",
									width: "100%",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									fontSize: 15,
								}}
								containerStyle={[
									{
										width: 80,
										borderRadius: 10,
										marginLeft: 12,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									},
								]}
							/>
						</View>
						<View
							style={{
								display: "flex",
								flexDirection: "column",
								gap: 10,
								flex: 1,
							}}
						>
							<Text style={mainStyles.formLabel}>
								{user.fname} {user.name}
							</Text>
							<Text style={[mainStyles.formLabel, { fontSize: 15 }]}>
								{user.email}
							</Text>
							<Text style={mainStyles.formLabel}>{user.phone}</Text>
						</View>
					</View>
				</View>

				{renderProfileEditForm()}

				<View style={[mainStyles.elevatedPanel, styles.infoContainer]}>
					<Text style={mainStyles.formLabel}>ימי התנדבות:</Text>
					<View
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "space-evenly",
							flexDirection: "row-reverse",
							gap: 10,
						}}
					>
						<Text style={[styles.dayStyle, user.sunday && styles.selectedDate]}>
							א
						</Text>
						<Text style={[styles.dayStyle, user.monday && styles.selectedDate]}>
							ב
						</Text>
						<Text
							style={[styles.dayStyle, user.tuesday && styles.selectedDate]}
						>
							ג
						</Text>
						<Text
							style={[styles.dayStyle, user.wednesday && styles.selectedDate]}
						>
							ד
						</Text>
						<Text
							style={[styles.dayStyle, user.thursday && styles.selectedDate]}
						>
							ה
						</Text>
						<Text style={[styles.dayStyle, user.friday && styles.selectedDate]}>
							ו
						</Text>
						<Text
							style={[styles.dayStyle, user.saturday && styles.selectedDate]}
						>
							ש
						</Text>
					</View>
				</View>
				<View style={[styles.infoContainer]}>
					<Text style={mainStyles.formLabel}>אזורי פעילות:</Text>
					{renderUserProfessions()}
				</View>
				<View style={[styles.infoContainer]}>
					<Text style={mainStyles.formLabel}>התמחויות:</Text>

					{renderUserAreas()}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "start",
		width: "100%",
	},
	contentContainer: {
		// flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "start",
		gap: 10,

		// width: 400,
		// backgroundColor: "white",
	},
	infoContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "start",
		flex: 1,
		width: "100%",
		padding: 10,
		backgroundColor: "white",
		elevation: 5,
		paddingHorizontal: 20,
		padding: 10,
		borderRadius: 10,
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		width: "100%",
		backgroundColor: "white",
	},
	dayStyle: {
		textAlign: "center",
		fontSize: 20,
	},
	selectedDate: {
		textDecorationLine: "underline",
		fontWeight: "bold",
	},
	areasContainer: {
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "start",
		flex: 1,
		width: "100%",
		// backgroundColor: "white",
		gap: 10,
	},
	tag: {
		backgroundColor: "rgba(0, 0, 255, 0.8)",
		color: "white",
		fontSize: 15,
		padding: 10,
		borderRadius: 10,
		fontWeight: "bold",
	},
	photoView: {
		width: 100,
		height: 100,
		borderRadius: 200,
		borderColor: "rgba(0, 0, 255, 0.5)",
		elevation: 15,
		borderWidth: 2,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
});

export default Profile;
