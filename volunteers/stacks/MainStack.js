import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Activities from "../screens/Activities";
import MobileHeader from "../components/MobileHeader";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Proposals from "../screens/Proposals";

const MainStack = () => {
	const Tab = createBottomTabNavigator();
	const Stack = createNativeStackNavigator();
	const tabIconMap = {
		בית: "home",
		התנדבויות: "heart",
		פרופיל: "account",
		// זמנים: "calendar",
	};

	const MainTabs = () => {
		return (
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarActiveTintColor: "#e91e63",
					tabBarIcon: ({ color, size }) => {
						const iconName = tabIconMap[route.name];
						return (
							<MaterialCommunityIcons
								name={iconName}
								size={size}
								color={color}
							/>
						);
					},
				})}
			>
				<Tab.Screen
					options={{ headerShown: false }}
					name="בית"
					component={Home}
				/>

				<Tab.Screen
					options={{ headerShown: false }}
					name="פרופיל"
					component={Profile}
				/>

				<Tab.Screen
					options={{ headerShown: false }}
					name="התנדבויות"
					component={Activities}
				/>

				{/* <Tab.Screen name="התנדבויות" component={Activities} /> */}
			</Tab.Navigator>
		);
	};

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="Main"
				component={MainTabs}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="Proposals"
				component={Proposals}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({});

export default MainStack;
