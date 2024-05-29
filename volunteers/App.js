import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { UserProvider } from "./context/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import StackRouter from "./stacks/StackRouter";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNotifications } from "./hooks/useNotifications";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_FETCH_TASK = "background-fetch";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
	const now = Date.now();

	console.log(
		`Got background fetch call at date: ${new Date(now).toISOString()}`
	);

	// Be sure to return the successful result type!
	return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
	return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
		minimumInterval: 60 * 15, // 15 minutes
		stopOnTerminate: false, // android only,
		startOnBoot: true, // android only
	});
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
	return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export default function App() {
	// const { expoPushToken, notification, schedulePushNotification } =
	// 	useNotifications();

	// useEffect(() => {
	// 	checkStatusAsync();
	// }, []);

	// const checkStatusAsync = async () => {
	// 	const status = await BackgroundFetch.getStatusAsync();
	// 	const isRegistered = await TaskManager.isTaskRegisteredAsync(
	// 		BACKGROUND_FETCH_TASK
	// 	);
	// 	// setStatus(status);
	// 	console.log("status", status);
	// 	// setIsRegistered(isRegistered);
	// 	console.log("isRegistered", isRegistered);
	// 	// TaskManager;
	// 	// BackgroundFetch
	// 	console.log("BackgroundFetch", BackgroundFetch);
	// };
	// // schedulePushNotification();
	// // const data = JSON.stringify(notification, undefined, 2);
	// // console.log("expoPushToken", expoPushToken);
	// // console.log("data", data);

	return (
		<GestureHandlerRootView>
			<SafeAreaView style={styles.safeAreaView}>
				<StatusBar hidden />
				<UserProvider>
					<NavigationContainer>
						<StackRouter />
					</NavigationContainer>
				</UserProvider>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	safeAreaView: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
	},
});
