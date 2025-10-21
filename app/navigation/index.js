import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStack from "./AuthStack";
import ApplicationStack from "./ApplicationStack";

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
		</rootStack.Navigator>
	);
}

export default RootStack;
