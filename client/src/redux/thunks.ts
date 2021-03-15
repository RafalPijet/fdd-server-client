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
import { addCurrentUser, AddUserAction } from './actions/userActions';
import {
    loadUserMessages,
    LoadMessagesAction,
    setUserToast,
    SetToastAction,
    SetMessageIsReaded,
    setMessageIsReaded
} from './actions/messageActions';
import { IMessage, TargetOptions } from '../types/global';

const API_URL = " http://localhost:3001/api";

export const loginUser = (payload: IUserLogin): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | ResetRequestAction | AddUserAction
> => async (dispatch, getState) => {
    dispatch(startRequest())

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.post(`${API_URL}/auth/login`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        localStorage.setItem('tokenFDD', res.data.authorization.token);
        localStorage.setItem('expiresInFDD', res.data.authorization.expiresIn);
        dispatch(addCurrentUser(res.data.dto));
        dispatch(stopRequest());

    } catch (err) {
        err.response.data.message ?
            dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
            dispatch(errorRequest({ isError: true, message: 'Something went wrong' }));

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
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.post(`${API_URL}/auth/user`, payload.getContent())
        console.log(res.data);
        dispatch(stopRequest());
    } catch (err) {
        err.response.data.message ?
            dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
            dispatch(errorRequest({ isError: true, message: 'Something went wrong' }));
    }

}

export const addMessage = (payload: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.post(`${API_URL}/users/message`, { content: payload }, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        });
        console.log(res.data);
        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }))
        dispatch(stopRequest());
    } catch (err) {
        err.response.data.message ?
            dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
            dispatch(errorRequest({ isError: true, message: 'Something went wrong' }));
    }
}

export const getUserMessages = (target: TargetOptions, page: number, rowsPerPage: number): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | LoadMessagesAction
> => async (dispatch, getState) => {
    dispatch(startRequest());
    let start = Math.ceil(page * rowsPerPage);
    let limit = rowsPerPage;

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.get(`${API_URL}/users/messages/${target}/${start}/${limit}`, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })
        dispatch(loadUserMessages(res.data.messages, res.data.quantity));
        dispatch(stopRequest());
    } catch (err) {
        err.response.data.message ?
            dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
            dispatch(errorRequest({ isError: true, message: 'Something went wrong' }));
    }
}

export const updateMessageIsReaded = (_id: IMessage["_id"]): ThunkAction<
    Promise<void>,
    any,
    RootState,
    ErrorRequestAction | SetMessageIsReaded
> => async (dispatch, getState) => {

    try {
        let res: AxiosResponse = await axios.put(`${API_URL}/users/messages/readed`, { _id }, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })
        if (res.status === 202) dispatch(setMessageIsReaded(_id));
    } catch (err) {
        err.response.data.message ?
            dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
            dispatch(errorRequest({ isError: true, message: 'Something went wrong' }));
    }
}