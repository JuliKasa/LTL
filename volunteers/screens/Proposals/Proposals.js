import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import MobileHeader from "../../components/MobileHeader";
import { Button, Text } from "@rneui/base";
import proposalsApi from "../../api/proposalsApi";
import CreateProposal from "./CreateProposal";

const Proposals = ({ navigation }) => {
	const [proposals, setProposals] = useState([]);

	const renderProposalsList = () => {
		return (
			<View>
				{proposals.map((proposal, index) => {
					return (
						<View key={index} style={styles.proposalContainer}>
							<Text style={mainStyles.formLabel}>{proposal.proposalName}</Text>
							<Text>{proposal.location}</Text>
							<Text>{proposal.description}</Text>
						</View>
					);
				})}
			</View>
		);
	};

	const renderMainPageContent = () => {
		return (
			<View style={styles.pageContainer}>
				<View style={styles.container}>
					{proposals.length > 0 ? (
						renderProposalsList()
					) : (
						<Text style={mainStyles.plainText}>לא קיימות הצעות</Text>
					)}
				</View>
				<Button
					onPress={() => {
						showCreateProposal();
					}}
					buttonStyle={[mainStyles.button, { width: "100%" }]}
					titleStyle={{ textAlign: "center", width: "100%" }}
					title="צור הצעה חדשה"
				/>
			</View>
		);
	};

	const [pageContent, setPageContent] = useState(renderMainPageContent());

	const getProposals = async () => {
		const allProposals = await proposalsApi.getProposals();
		setProposals(allProposals);
	};

	useEffect(() => {
		getProposals();
	}, []);

	const showCreateProposal = () => {
		setPageContent(
			<CreateProposal
				close={() => setPageContent(renderMainPageContent())}
				create={createProposal}
			/>
		);
	};

	const createProposal = (title, content) => {
		// proposalsApi.createProposal(title, content);
		// setPageContent(renderProposals());
	};

	return (
		<View style={[mainStyles.pageContainer, mainStyles.coloredBackground]}>
			<MobileHeader navigation={navigation} />
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={mainStyles.title}>הצעות</Text>
					<Button
						onPress={() => navigation.goBack()}
						buttonStyle={mainStyles.button}
						title="חזור"
					/>
				</View>

				{pageContent}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		display: "flex",
		flexDirection: "row-reverse",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	pageContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "start",
		width: "100%",
	},
	proposalContainer: {
		marginTop: 20,
		marginBottom: 20,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		backgroundColor: "#fff",
	},
});

export default Proposals;
