import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  Button,
  VStack,
  Box,
  Text,
  Center,
  Image,
  ScrollView,
  Stack,
} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import images from '../../themes/Images';
import useAuth from '../../hooks/useAuth';
import AlertModal from '../../components/AlertModal';
import TextInput from '../../components/forms/TextInput';
import colors from '../../themes/Colors';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Please enter your email'),
  password: Yup.string().required('Please enter password'),
});

const Login = ({navigation}) => {
  const isFocused = useIsFocused();
  const [alertData, setAlertData] = useState({
    isOpen: false,
    msg: null,
    status: 'error',
  });

  const {submitLogin: loginUser, isLoading, errMsg, invalidate} = useAuth();

  useEffect(() => {
    if (!isFocused) {
      onAlertClose();
    }
  }, [isFocused]);

  useEffect(() => {
    if (errMsg && isFocused) {
      setAlertData({isOpen: true, msg: errMsg, status: 'error'});
    }
  }, [errMsg, isFocused]);

  const handleLogin = values => {
    try {
      // navigation.navigate("Home");
      // loginUser({
      // 	email: values.email,
      // 	password: values.password,
      // });
    } catch (err) {
      setAlertData({
        isOpen: true,
        msg: 'Something went wrong',
        status: 'error',
      });
    }
  };

  const onAlertClose = useCallback(() => {
    invalidate();
    setAlertData({isOpen: false, status: 'error', msg: null});
  }, [invalidate, setAlertData]);

  return (
    <Box flex={1} bg="white" safeAreaTop>
      <ScrollView>
        <Box flex={1} width="100%" px={6} mt={20} justifyContent="center">
          <Center>
            <Box overflow="hidden">
              <Image
                source={images.logo}
                alt="logo"
                resizeMode="contain"
                size="180px"
              />
            </Box>

            {/* <Text fontSize="md" fontFamily="heading" mb={1}>
							Welcome Back!
						</Text> */}

            <Text
              color={colors.green}
              textAlign="center"
              fontSize="md"
              fontFamily="heading">
              Log in to continue building your healthy habits
            </Text>
          </Center>

          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={handleLogin}
            validateOnChange
            validationSchema={LoginSchema}>
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              touched,
              handleSubmit,
            }) => {
              const getErrorMessage = fieldName => {
                const hasError = errors[fieldName] && touched[fieldName];
                return hasError ? errors[fieldName] : '';
              };

              return (
                <VStack width="100%" space={2}>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    label="E-mail"
                    error={getErrorMessage('email')}
                    width="100%"
                  />

                  <TextInput
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    label="Password"
                    password
                    error={getErrorMessage('password')}
                    width="100%"
                  />

                  <Button
                    mt={4}
                    width="100%"
                    bg={colors.btnBg}
                    onPress={() => navigation.navigate('Home')}
                    isLoading={isLoading}>
                    <Text color="white" fontFamily="heading" fontSize="md">
                      LOGIN
                    </Text>
                  </Button>

                  <Text
                    color={colors.red}
                    fontSize="sm"
                    fontFamily="heading"
                    textAlign="right"
                    mt={2}
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    Forgot Password?
                  </Text>
                </VStack>
              );
            }}
          </Formik>
        </Box>
      </ScrollView>

      {/* <AlertModal isOpen={alertData.isOpen} onClose={onAlertClose} status={alertData.status} msg={alertData.msg} /> */}
    </Box>
  );
};

export default Login;
