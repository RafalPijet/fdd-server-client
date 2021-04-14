import { ThunkAction } from "redux-thunk";
import axios, { AxiosResponse } from 'axios';
import { RootState } from './store';
import { IUserLogin, IUserRegister, Register } from "../components/pages/LoginPage/LoginPageStyle";
import {
    StartRequestAction,
    StopRequestAction,
    ErrorRequestAction,
    ResetRequestAction,
    startRequest,
    stopRequest,
    errorRequest
} from './actions/requestActions';
import { addCurrentUser, AddUserAction, addChildToUser, AddChildToUserAction } from './actions/userActions';
import {
    loadUserMessages,
    LoadMessagesAction,
    SetMessageIsReaded,
    setMessageIsReaded
} from './actions/messageActions';
import { setUserToast, SetToastAction, setIsRemoved, SetIsRemoved } from './actions/generalActions';
import { IChildData } from '../components/common/ChildHandling/ChildHandlingStyle';
import { IMessage, TargetOptions, IOutsideMessage, UserStatus } from '../types/global';
import { API_URL } from '../config';

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

export const addMessage = (payload: string, _id?: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.post(`${API_URL}/users/message`, { content: payload, userId: _id }, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        });
        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }))
        dispatch(stopRequest());
    } catch (err) {
        err.response.data.message ?
            dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
            dispatch(errorRequest({ isError: true, message: 'Something went wrong' }));
    }
}

export const removeMessage = (messageId: string, isUser: boolean): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction | SetIsRemoved
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.delete(`${API_URL}/admin/messages`,
            {
                data: { messageId, isUser }, headers: {
                    'Authorization': localStorage.getItem('tokenFDD')
                }
            })
        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }));
        dispatch(stopRequest());
        dispatch(setIsRemoved(true));
    } catch (err) {
        err.response.data.message ?
            dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
            dispatch(errorRequest({ isError: true, message: 'Something went wrong' }));
    }
}

export const addOutsideMessage = (payload: Omit<IOutsideMessage, '_id' | 'created' | 'new' | 'answer'>): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.post(`${API_URL}/auth/message`, payload);
        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }))
        dispatch(stopRequest());
    } catch (err) {
        err.response.data.message ?
            dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
            dispatch(errorRequest({ isError: true, message: 'Something went wrong' }));
    }
}

export const addAnswerToOutsideMessage = (content: string, email: string, name: string, messageId: string | undefined): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.put(`${API_URL}/admin/messages/update/answer`, { messageId, content, email, name }, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        });
        if (res.status === 201) dispatch(setUserToast({ isOpen: true, content: `Odpowiedź do ${name} na email ${email} została wysłana.`, variant: "success" }));
        dispatch(stopRequest());
    } catch (err) {
        err.response.data.message ?
            dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
            dispatch(errorRequest({ isError: true, message: 'Something went wrong' }));
    }
}

export const sendMessageByEmail = (content: string, email: string, name: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction
> => async (dispatch, getState) => {
    dispatch(startRequest());
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.post(`${API_URL}/admin/messages/email`, { content, email, name }, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        });
        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }));
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

export const getAdminMessages = (target: TargetOptions, page: number, rowsPerPage: number): ThunkAction<
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
        let res: AxiosResponse = await axios.get(`${API_URL}/admin/messages/${target}/${start}/${limit}`, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })
        // console.log(res.data);
        dispatch(loadUserMessages(res.data.messages, res.data.quantity));
        dispatch(stopRequest());

    } catch (err) {
        err.response.data.message ?
            dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
            dispatch(errorRequest({ isError: true, message: 'Something went wrong' }));
    }
}

export const getAdminMessagesByUser = (isParent: boolean, user: string, page: number, rowsPerPage: number): ThunkAction<
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
        let res: AxiosResponse = await axios.get(`${API_URL}/admin/messages/user/${isParent}/${user}/${start}/${limit}`, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })
        // console.log(res.data);
        dispatch(loadUserMessages(res.data.messages, res.data.quantity));
        dispatch(stopRequest());
    } catch (err) {
        err.response.data.message ?
            dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
            dispatch(errorRequest({ isError: true, message: 'Something went wrong' }));
    }
}

export const updateMessageIsReaded = (_id: IMessage["_id"], isAdmin: boolean, isUser: boolean | undefined): ThunkAction<
    Promise<void>,
    any,
    RootState,
    ErrorRequestAction | SetMessageIsReaded
> => async (dispatch, getState) => {

    try {
        let res: AxiosResponse = await axios.put(`${API_URL}/users/messages/readed`, { _id, isAdmin, isUser }, {
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

export const addChildToParent = (payload: IChildData, userId?: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction | AddChildToUserAction
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.post(`${API_URL}/users/child/${userId}`, payload, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })

        if (getState().user.status === UserStatus.parent) {
            dispatch(addChildToUser(res.data.child));
        }
        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }));
        dispatch(stopRequest());
    } catch (err) {
        err.response.data.message ?
            dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
            dispatch(errorRequest({ isError: true, message: 'Something went wrong' }));
    }
}

export const addImageToChild = (image: File, childId: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const formData = new FormData();
        formData.append('image', image)
        let res: AxiosResponse = await axios.post(`${API_URL}/users/child/image/${childId}`, formData, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })

        console.log(res.data)
        dispatch(stopRequest());
    } catch (err) {
        err.response.data.message ?
            dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
            dispatch(errorRequest({ isError: true, message: 'Something went wrong' }));
    }
}