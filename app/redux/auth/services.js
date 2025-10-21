import {
  createPostReq,
  createGetReq,
  createPatchReq,
  createPutReq,
} from '../request';

export const login = data => createPostReq('auth/login', data);
export const getUser = () => createGetReq('user/me', {});
export const register = data => createPostReq('chef/register', data);
export const verifyEmail = data => createPatchReq('auth/verify', data);
export const updateUserInfo = data => createPutReq('user/general', data);
export const updatePassword = data =>
  createPatchReq('auth/update-password', data);
export const sendOtp = data => createPostReq('auth/reset-password-otp', data);
export const resetPassword = data => createPostReq('auth/reset-password', data);
export const eraseAccount = data => createPostReq('auth/erase-account', data);
