import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import { Button, Input, Text } from "@rneui/base";

const Register = ({ navigation }) => {
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleNext = () => {
		navigation.navigate("RegisterStageTwo", {
			name,
			fname: lastName,
			phone,
			email,
			password,
		});
	};

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<View style={[mainStyles.pageContainer, mainStyles.coloredBackground]}>
			<View style={mainStyles.elevatedPanel}>
				<View
					style={[
						mainStyles.HorizontalContainerCentered,
						{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
						},
					]}
				>
					<Button
						title="חזרה"
						buttonStyle={[mainStyles.button, { width: 80 }]}
						onPress={handleBack}
					/>
					<Text style={mainStyles.title}>הרשמה</Text>
				</View>
				<ScrollView style={mainStyles.form}>
					<Text style={mainStyles.formLabel}>שם פרטי:</Text>
					<Input style={mainStyles.formInput} onChangeText={setName} />
					<Text style={mainStyles.formLabel}>שם משפחה:</Text>
					<Input style={mainStyles.formInput} onChangeText={setLastName} />
					<Text style={mainStyles.formLabel}>טלפון:</Text>
					<Input style={mainStyles.formInput} onChangeText={setPhone} />
					<Text style={mainStyles.formLabel}>אימייל:</Text>
					<Input style={mainStyles.formInput} onChangeText={setEmail} />
					<Text style={mainStyles.formLabel}>סיסמא:</Text>
					<Input style={mainStyles.formInput} onChangeText={setPassword} />

					<Button
						title="המשך"
						buttonStyle={mainStyles.button}
						onPress={handleNext}
					/>
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({});

export default Register;
