import React, { useEffect, useState } from "react";
import { Input, Box, FormControl, Icon } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import _noop from "lodash/noop";

const TextInput = ({ value = "", label = "", onBlur = _noop, onChangeText = _noop, error = null, password = false }) => {
	const [showValue, setShowValue] = useState(true);
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (password) {
			setShowValue(false);
		}
	}, [password]);

	const onBlurHandler = (e) => {
		onBlur(e);
		setIsFocused(false);
	};

	return (
		<Box shadow={2} mt={5}>
			<FormControl isInvalid={error}>
				<Input
					variant={"outline"}
					placeholder={label}
					size={"l"}
					type={showValue ? "text" : "password"}
					autoCapitalize="none"
					value={value}
					bg={"white"}
					p={3}
					// borderColor={'white'}
					onChangeText={(text) => onChangeText(text)}
					onBlur={onBlurHandler}
					InputRightElement={
						password ? (
							<Icon
								as={<MaterialCommunityIcons name={showValue ? "eye-off-outline" : "eye-outline"} size={30} />}
								size={5}
								mr={3}
								onPress={() => setShowValue(!showValue)}
							/>
						) : null
					}
				/>
				{error ? <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage> : null}
			</FormControl>
		</Box>
	);
};

export default TextInput;
