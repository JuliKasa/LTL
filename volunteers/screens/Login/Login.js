import { Input, Text } from "@rneui/themed";
import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button, Image } from "@rneui/base";
import { UserContext } from "../../context/UserContext";
import mainStyles from "../../styles/mainStyles";
import volunteersApi from "../../api/volunteersApi";

const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { user, saveUser } = useContext(UserContext);
	const goToRegister = () => {
		navigation.navigate("Register");
	};

	const login = async () => {
		const response = await volunteersApi.login(email, password);
		console.log("response", response);

		if (response.status === 200) {
			saveUser(await response.json());
		}
	};

	return (
		<View style={[mainStyles.pageContainer, mainStyles.coloredBackground]}>
			<View style={mainStyles.elevatedPanel}>
				<View style={[mainStyles.HorizontalContainerCentered]}>
					<Image
						source={require("../../assets/logo.jpg")}
						style={[mainStyles.logo]}
					/>
					<View>
						<Text style={mainStyles.title}>גדולים מהחיים</Text>
						<Text style={mainStyles.title}>מתנדבים</Text>
					</View>
				</View>
				<View style={mainStyles.form}>
					<Text style={mainStyles.formLabel}>אימייל:</Text>
					<Input
						defaultValue={email}
						style={mainStyles.formInput}
						onChangeText={setEmail}
					/>
					<Text style={mainStyles.formLabel}>סיסמא:</Text>
					<Input
						secureTextEntry={true}
						defaultValue={password}
						style={mainStyles.formInput}
						onChangeText={setPassword}
					/>
				</View>
				<Button
					onPress={login}
					title="התחברות"
					buttonStyle={mainStyles.button}
				/>
				<View>
					<Text style={{ textAlign: "center" }}>
						אין לך חשבון ?{" "}
						<Text onPress={goToRegister} style={mainStyles.link}>
							הרשם
						</Text>
					</Text>
					{/* <Button
						title="הרשמה"
						buttonStyle={mainStyles.button}
						onPress={() => navigation.navigate("Register")}
					/> */}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({});

export default Login;
