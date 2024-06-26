// import * as Notifications from "expo-notifications";
import Notifications from "expo-notifications";
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

async function sendPushNotification(expoPushToken) {
	const message = {
		to: expoPushToken,
		sound: "default",
		title: "Original Title",
		body: "And here is the body!",
		data: { someData: "goes here" },
	};

	await fetch("https://exp.host/--/api/v2/push/send", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Accept-encoding": "gzip, deflate",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	});
}

function handleRegistrationError(errorMessage) {
	alert(errorMessage);
	throw new Error(errorMessage);
}

async function setUpService() {
	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			handleRegistrationError(
				"Permission not granted to get push token for push notification!"
			);
			return;
		}
		const projectId =
			Constants?.expoConfig?.extra?.eas?.projectId ??
			Constants?.easConfig?.projectId;
		if (!projectId) {
			handleRegistrationError("Project ID not found");
		}
		try {
			const pushTokenString = (
				await Notifications.getExpoPushTokenAsync({
					projectId,
				})
			).data;
			console.log(pushTokenString);
			return pushTokenString;
		} catch (e) {
			handleRegistrationError(`${e}`);
		}
	} else {
		handleRegistrationError("Must use physical device for push notifications");
	}

	console.log("Constants.expoConfig", Constants.expoConfig.extra);
	const tempToken = await Notifications.getExpoPushTokenAsync({
		projectId: Constants.expoConfig.extra.eas.projectId,
		// projectId: "soroktysiachobesyanvzhopusunulybanan",
	});
	console.log("tempToken", tempToken);
	setExpoPushToken(tempToken.data);
	alert("service is up");
}

const notificationService = {
	sendPushNotification,
	setUpService,
};

export default notificationService;

// 		Notifications.addNotificationReceivedListener((notification) => {
// 			setNotification(notification);
// 		});

// 	responseListener.current =
// 		Notifications.addNotificationResponseReceivedListener((response) => {
// 			console.log(response);
// 		});

// 	return () => {
// 		notificationListener.current &&
// 			Notifications.removeNotificationSubscription(
// 				notificationListener.current
// 			);
// 		responseListener.current &&
// 			Notifications.removeNotificationSubscription(responseListener.current);
// 	};
// }, []);
