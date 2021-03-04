import { ThunkAction } from "redux-thunk";
import axios, { AxiosResponse } from 'axios';
import { RootState } from './store';
import { IUserLogin, IUserRegister, Register } from "../components/pages/LoginPage/LoginPageStyle";
import {
    StartRequestAction,
    StopRequestAction,
    ErrorRequestAction,
    ResetRequestAction,
    resetRequest,
    startRequest,
    stopRequest,
    errorRequest
} from './actions/requestActions';

const API_URL = " http://localhost:3001/api";

export const loginUser = (payload: IUserLogin): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | ResetRequestAction
> => async (dispatch, getState) => {
    dispatch(startRequest())

    try {
        await new Promise(resolve => setTimeout(resolve, 5000));
        let res: AxiosResponse = await axios.post(`${API_URL}/auth/loginn`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data)
        localStorage.setItem('tokenFDD', res.data.authorization.token);
        localStorage.setItem('expiresInFDD', res.data.authorization.expiresIn);
        dispatch(stopRequest());

    } catch (err) {
        dispatch(errorRequest({ isError: true, message: err.response.data.message }));
    }
}

export const addUser = (payload: Register): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | ResetRequestAction
> => async (dispatch, getState) => {
    dispatch(startRequest())
    payload.prepare();

    try {
        await new Promise(resolve => setTimeout(resolve, 5000));
        let res: AxiosResponse = await axios.post(`${API_URL}/auth/user`, payload.getContent())
        console.log(res.data);
        dispatch(stopRequest());
    } catch (err) {
        console.log(err.response.data)
        dispatch(errorRequest({ isError: true, message: err.response.data }));
    }

}

export const getAllParents = (): ThunkAction<
    Promise<void>,
    any,
    RootState,
    any
> => async (dispatch, getState) => {
    console.log('getAllParents')

    try {
        let res: AxiosResponse = await axios.get(`${API_URL}/users/parents`, {
            headers: {
                'Content-Type': "application/json; charset=utf-8",
                'Authorization': localStorage.getItem('tokenFDD')
            },
        });

        console.log(res.data);
    } catch (err) {
        console.log(err.response.data)
    }
}