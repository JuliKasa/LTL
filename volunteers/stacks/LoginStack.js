import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "../screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";
import RegisterStageTwo from "../screens/RegisterStageTwo";
import CameraComponent from "../components/Camera";
import RegisterStageThree from "../screens/RegisterStageThree";

const LoginStack = () => {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="RegisterStageTwo" component={RegisterStageTwo} />
			<Stack.Screen name="RegisterStageThree" component={RegisterStageThree} />
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({});

export default LoginStack;
