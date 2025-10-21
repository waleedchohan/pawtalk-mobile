import {useState} from 'react';
import {
  login,
  register,
  updateUserInfo,
  verifyEmail,
  updatePassword,
  eraseAccount,
} from '../redux/auth/services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {clearUser, getUser, getUserSuccess} from '../redux/auth/actions';
import {useNavigation} from '@react-navigation/native';

const useAuth = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const navigation = useNavigation();

  const submitLogin = payload => {
    setIsLoading(true);
    setErrMsg(null);
    login(payload)
      .then(response => {
        AsyncStorage.setItem('token', response.user.token).then(data => {
          dispatch(getUserSuccess(response));
          navigation.navigate('Home');
        });
      })
      .catch(err => {
        setErrMsg(err?.data?.error);
      })
      .finally(() => setIsLoading(false));
  };

  const submitRegister = payload => {
    setIsLoading(true);
    setErrMsg(null);

    console.log({payload});
    register(payload)
      .then(r => {
        navigation.navigate('VerifyEmail', {
          email: payload.email,
        });
      })
      .catch(err => {
        console.error({err: err});
        setErrMsg(err?.data?.message);
      });

    setIsLoading(false);
  };

  const submitVerifyEmail = payload => {
    setIsLoading(true);
    setErrMsg(null);
    verifyEmail(payload)
      .then(response => {
        AsyncStorage.setItem('token', response.user.token).then(data => {
          dispatch(getUserSuccess(response));
          navigation.navigate('Home');
        });
      })
      .catch(err => {
        console.log({TTH: err});

        setErrMsg(err?.data?.message);
      })
      .finally(() => setIsLoading(false));
  };

  const submitUpdateUserInfo = payload => {
    setIsLoading(true);
    setErrMsg(null);
    updateUserInfo(payload)
      .then(response => {
        dispatch(getUser());
      })
      .catch(err => {
        setErrMsg(err?.data?.message);
      })
      .finally(() => setIsLoading(false));
  };

  const submitUpdatePassword = payload => {
    setIsLoading(true);
    setErrMsg(null);
    updatePassword(payload)
      .then(response => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Settings'}],
        });
      })
      .catch(err => {
        setErrMsg(err?.data?.message);
      })
      .finally(() => setIsLoading(false));
  };

  const submitEraseAccount = payload => {
    setIsLoading(true);
    setErrMsg(null);
    eraseAccount(payload)
      .then(response => {
        AsyncStorage.clear();
        dispatch(clearUser());
        navigation.reset({
          index: 0,
          routes: [{name: 'EraseAccountSuccess'}],
        });
        // navigation.navigate('EraseAccountSuccess');
      })
      .catch(err => {
        setErrMsg(err?.data?.error);
      })
      .finally(() => setIsLoading(false));
  };

  const invalidate = () => {
    setIsLoading(false);
    setErrMsg(null);
  };

  const logout = () => {
    AsyncStorage.clear();
    // dispatch(clearUser());
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  return {
    errMsg,
    isLoading,
    submitLogin,
    invalidate,
    submitRegister,
    submitVerifyEmail,
    submitUpdateUserInfo,
    submitUpdatePassword,
    logout,
    submitEraseAccount,
  };
};

export default useAuth;
