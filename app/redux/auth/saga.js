import AsyncStorage from "@react-native-async-storage/async-storage";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { REGISTER_USER, GET_USER } from "../actions";

import { registerSuccess, registerFailure, getUserSuccess, getUserFailure } from "./actions";

import { register, getUser } from "./services";

function* registerSaga({ payload }) {
	try {
		const response = yield call(register, payload);
		if (response.token) {
			AsyncStorage.log("token", response.token);
			yield put(registerSuccess(response));
		} else {
			yield put(registerFailure(response.error.data));
		}
	} catch (error) {
		yield put(
			registerFailure({
				message: error?.data?.message || "something went wrong",
			}),
		);
	}
}

function* getUserSaga({ payload }) {
	try {
		const response = yield call(getUser, payload);
		yield put(getUserSuccess(response));
	} catch (err) {
		yield put(getUserFailure({ message: "Something went wrong" }));
	}
}

export function* watchGetUser() {
	yield takeEvery(GET_USER.REQUEST, getUserSaga);
}

export function* watchRegister() {
	yield takeEvery(REGISTER_USER.REQUEST, registerSaga);
}

export default function* rootSaga() {
	yield all([fork(watchRegister)]);
	yield all([fork(watchGetUser)]);
}
