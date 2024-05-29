import { useState, createContext, useEffect } from "react";
import { getData, saveData } from "../utils/LocalStorage";

export const UserContext = createContext(null);

const defaultUser = {
	email: "Yardennn@gmail.com",
	password: "5fec75577fa9cc3ec406b24918176caad0f2d55e679cd0562986c85d776203e5",
	name: "Yarden",
	fname: "Damti",
	phone: "0500000000",
	sign: "2024-05-25T11:57:27",
	sunday: true,
	monday: true,
	tuesday: true,
	wednesday: true,
	thursday: true,
	friday: true,
	saturday: true,
	areas: [
		{
			areaNum: 1,
			areaName: "אילת",
		},
		{
			areaNum: 2,
			areaName: "תל אביב",
		},
		{
			areaNum: 3,
			areaName: "חיפה",
		},
		{
			areaNum: 4,
			areaName: "ירושלים",
		},
		{
			areaNum: 5,
			areaName: "צפת",
		},
		{
			areaNum: 8,
			areaName: "אשדוד",
		},
		{
			areaNum: 9,
			areaName: "באר-שבע",
		},
		{
			areaNum: 10,
			areaName: "חולון",
		},
		{
			areaNum: 11,
			areaName: "אשקלון",
		},
		{
			areaNum: 10,
			areaName: "חולון",
		},
	],
	activities: [
		{
			activitiesProfessions: [],
			actNum: 1,
			actName: "צילום",
			shortDesc: "צילום ילדים",
			location: "אילת",
			date: "2024-05-26T00:00:00",
			startHour: "1900-01-01T16:30:00",
			endHour: "1900-01-01T12:00:00",
			amount: 2,
			areaNum: 1,
			employeeID: 1,
			status: false,
		},
		{
			activitiesProfessions: [],
			actNum: 5,
			actName: "מוזיקה",
			shortDesc: "שירי ילדים",
			location: "תל-אביב רוטשילד 68",
			date: "2024-12-26T00:00:00",
			startHour: "1900-01-01T11:00:00",
			endHour: "1900-01-01T14:00:00",
			amount: 4,
			areaNum: 2,
			employeeID: 2,
			status: false,
		},
		{
			activitiesProfessions: [],
			actNum: 9,
			actName: "משלוח",
			shortDesc: "משלוח של אוכל",
			location: "חיפה הרצל 45",
			date: "2024-12-27T00:00:00",
			startHour: "1900-01-01T15:00:00",
			endHour: "1900-01-01T18:00:00",
			amount: 3,
			areaNum: 5,
			employeeID: 3,
			status: false,
		},
	],
	professions: [
		{
			professionNum: 1,
			professionName: "צילום",
			shortDesc: "צילום ילדים יפים",
		},
		{
			professionNum: 2,
			professionName: "מוזיקה",
			shortDesc: "נגן/זמר",
		},
		{
			professionNum: 3,
			professionName: "משלוחים",
			shortDesc: "נייד בעל כלי תחבורנ  ",
		},
		{
			professionNum: 7,
			professionName: "עורך דין",
			shortDesc: "בעל תואר ראשון/שני למשפטים",
		},
		{
			professionNum: 8,
			professionName: "חשמלאי",
			shortDesc: "חשמלאי מומחה",
		},
	],
	imageBase64: "string",
	volImage: "string",
};

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => {
		const user = await getData();
		setUser(user);
	};

	const saveUser = async (userObj) => {
		console.log("userObj", userObj);
		await saveData(userObj);
		await getUser();
	};

	const removeUser = async () => {
		await saveData(null);
		await getUser();
	};

	return (
		<UserContext.Provider value={{ user, saveUser, removeUser }}>
			{children}
		</UserContext.Provider>
	);
}
