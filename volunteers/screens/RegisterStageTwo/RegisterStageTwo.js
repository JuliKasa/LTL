import { Button, Text } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import mainStyles from "../../styles/mainStyles";

import DropDownPicker from "react-native-dropdown-picker";
import professionsApi from "../../api/professionsApi";
import areasApi from "../../api/areasApi";

const RegisterStageTwo = ({ route, navigation }) => {
	const [areasShown, setAreasShown] = useState(false);
	const [professionsShown, setProfessionsShown] = useState(false);
	const [daysSelected, setDaysSelected] = useState({
		א: false,
		ב: false,
		ג: false,
		ד: false,
		ה: false,
		ו: false,
		ש: false,
	});

	const [areaData, setAreaData] = useState([]);

	const [selectedAreas, setSelectedAreas] = useState([]);

	const [professionsData, setProfessionsData] = useState([]);

	const [selectedProfessions, setSelectedProfessions] = useState([]);

	const updateAreasData = async () => {
		const data = await areasApi.getAreas();
		setAreaData(
			data.map((area) => ({ label: area.areaName, value: area.areaNum }))
		);
	};

	const updateProfessionsData = async () => {
		const data = await professionsApi.getProfessions();
		setProfessionsData(
			data.map((profession) => ({
				label: profession.professionName,
				value: profession.professionNum,
				shortDesc: profession.shortDesc,
			}))
		);
	};

	useEffect(() => {
		updateAreasData();
		updateProfessionsData();
		return () => {};
	}, []);

	const createDaysSelection = () => {
		const days = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
		return (
			<View style={styles.dayContainer}>
				{days.map((day) => (
					<Text
						key={day}
						style={[
							mainStyles.formLabel,
							{ fontSize: 22 },
							daysSelected[day]
								? { color: "black", textDecorationLine: "underline" }
								: {},
						]}
						onPress={() => {
							setDaysSelected({
								...daysSelected,
								[day]: !daysSelected[day],
							});
						}}
					>
						{day}
					</Text>
				))}
			</View>
		);
	};

	const createAreaSelection = () => {
		const filteredAreas = areaData.filter((area) => {
			for (let i = 0; i < selectedAreas.length; i++) {
				if (selectedAreas[i].value === area.value) {
					return false;
				}
			}
			return true;
		});

		return (
			<View style={styles.dayContainer}>
				<DropDownPicker
					open={areasShown}
					setOpen={setAreasShown}
					modalTitle="בחר עיר"
					placeholder="בחר עיר"
					items={filteredAreas}
					onSelectItem={(value) => {
						setSelectedAreas((prev) => [...prev, value]);
					}}
				/>
			</View>
		);
	};

	const showSelectedAreas = () => {
		return (
			<View style={styles.tagContainer}>
				{selectedAreas.map((area) => (
					<View key={area.label} style={[styles.areaTag]}>
						<Text
							onPress={() => {
								console.log("area.value", area.value);
								setSelectedAreas(
									selectedAreas.filter((a) => a.value !== area.value)
								);
							}}
							style={styles.closeTag}
						>
							x
						</Text>
						<Text style={{ display: "flex", alignItems: "center" }}>
							{area.label}
						</Text>
					</View>
				))}
			</View>
		);
	};

	const createProfessionSelection = () => {
		const filteredProfessions = professionsData.filter((profession) => {
			for (let i = 0; i < selectedProfessions.length; i++) {
				if (selectedProfessions[i].value === profession.value) {
					return false;
				}
			}
			return true;
		});

		return (
			<View style={styles.dayContainer}>
				<DropDownPicker
					open={professionsShown}
					setOpen={setProfessionsShown}
					modalTitle="בחר תפקיד"
					placeholder="בחר תפקיד"
					items={filteredProfessions}
					onOpen={() => {
						setProfessionsShown(true);
					}}
					onClose={() => {
						setProfessionsShown(false);
					}}
					onSelectItem={(value) => {
						setSelectedProfessions((prev) => [...prev, value]);
					}}
				/>
			</View>
		);
	};

	const showSelectedProfessions = () => {
		return (
			<View style={styles.tagContainer}>
				{selectedProfessions.map((profession) => (
					<View key={profession.label} style={[styles.areaTag]}>
						<Text
							onPress={() => {
								setSelectedProfessions(
									selectedProfessions.filter(
										(a) => a.value !== profession.value
									)
								);
							}}
							style={styles.closeTag}
						>
							x
						</Text>
						<Text style={{ display: "flex", alignItems: "center" }}>
							{profession.label}
						</Text>
					</View>
				))}
			</View>
		);
	};

	const handleNext = () => {
		const areas = selectedAreas.map((area) => {
			return {
				areaName: area.label,
				areaNum: area.value,
			};
		});
		const professions = selectedProfessions.map((profession) => {
			// let foundProfession = null;
			// for (let i = 0; i < professionsData.length; i++) {
			// 	console.log("professionsData[i]", professionsData[i]);
			// 	if (professionsData[i].professionNum === profession.value) {
			// 		foundProfession = professionsData[i];
			// 	}
			// }
			return {
				professionName: profession.label,
				professionNum: profession.value,
				shortDesc: profession.shortDesc,
			};
		});
		navigation.navigate("RegisterStageThree", {
			...route.params, // name, lastName, phone, email, password
			sunday: daysSelected["א"],
			monday: daysSelected["ב"],
			tuesday: daysSelected["ג"],
			wednesday: daysSelected["ד"],
			thursday: daysSelected["ה"],
			friday: daysSelected["ו"],
			saturday: daysSelected["ש"],
			areas,
			professions,
		});
	};

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<View style={[mainStyles.pageContainer, mainStyles.coloredBackground]}>
			<View style={mainStyles.elevatedPanel}>
				<Button
					title="חזרה"
					buttonStyle={[mainStyles.button, { width: 80 }]}
					onPress={handleBack}
				/>
				<Text style={mainStyles.title}>השלמת פרטי הרשמה</Text>
				<Text style={mainStyles.formLabel}>
					סמן\י את ימי ההתנדבות הרלוונטיים עבורך:
				</Text>
				{createDaysSelection()}

				<Text style={[mainStyles.formLabel]}>
					בחר\י את האזורים להתנדבות הרלוונטיים עבורך:
				</Text>

				{createAreaSelection()}
				<ScrollView style={{ maxHeight: 100 }}>
					{showSelectedAreas()}
				</ScrollView>

				<Text style={[mainStyles.formLabel]}>
					בחר\י את התפקידים הרלוונטיים להתנדבות:
				</Text>

				{createProfessionSelection()}
				<ScrollView style={{ maxHeight: 100 }}>
					{showSelectedProfessions()}
				</ScrollView>

				<Button
					title="המשך"
					buttonStyle={mainStyles.button}
					onPress={handleNext}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	dayContainer: {
		display: "flex",
		flexDirection: "row-reverse",
		flexWrap: "wrap",
		justifyContent: "space-between",
		width: "100%",
	},
	tagContainer: {
		display: "flex",
		flexDirection: "row-reverse",
		gap: 10,
		flexWrap: "wrap",
	},
	areaTag: {
		display: "flex",
		flexDirection: "row-reverse",
		alignItems: "center",
		backgroundColor: "blue",
		alignItems: "center",
		borderRadius: 10,
		padding: 10,
	},
	closeTag: {
		color: "white",
		fontSize: 20,
	},
});

export default RegisterStageTwo;
