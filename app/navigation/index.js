import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStack from "./AuthStack";
import ApplicationStack from "./ApplicationStack";
import Notifications from "../containers/notifications";
import Messages from "../containers/messages";

const rootStack = createNativeStackNavigator();

function RootStack() {
	return (
		<rootStack.Navigator initialRouteName="Login">
			<rootStack.Screen
				name="Login"
				component={AuthStack}
				options={{
					headerShown: false,
				}}
			/>

			<rootStack.Screen
				name="Home"
				component={ApplicationStack}
				options={{
					headerShown: false,
				}}
			/>

			<rootStack.Screen
				name="Notifications"
				component={Notifications}
				options={{
					headerShown: false,
				}}
			/>

			<rootStack.Screen
				name="Messages"
				component={Messages}
				options={{
					headerShown: false,
				}}
			/>
		</rootStack.Navigator>
	);
}

export default RootStack;
