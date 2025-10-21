import React from "react";
import { Modal, Alert, VStack, HStack, IconButton, CloseIcon, Text } from "native-base";

const AlertModal = ({ isOpen, onClose, msg, status }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} justifyContent={"flex-end"} safeArea>
			<Modal.Content w={"100%"} margin={10}>
				<Alert maxW="400" status={status}>
					<VStack space={2} flexShrink={1} w="100%">
						<HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
							<HStack flexShrink={1} space={2} alignItems="center">
								<Alert.Icon />
								<Text fontSize="md" fontWeight="medium" color="coolGray.800">
									{msg}
								</Text>
							</HStack>
							<IconButton
								variant="unstyled"
								_focus={{
									borderWidth: 0,
								}}
								icon={<CloseIcon size={4} color="coolGray.600" />}
								onPress={onClose}
							/>
						</HStack>
					</VStack>
				</Alert>
			</Modal.Content>
		</Modal>
	);
};

export default AlertModal;
