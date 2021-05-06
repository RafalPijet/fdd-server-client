import { ThunkAction } from "redux-thunk";
import axios, { AxiosResponse } from 'axios';
import { RootState } from './store';
import { IUserLogin, Register } from "../components/pages/LoginPage/LoginPageStyle";
import {
    StartRequestAction,
    StopRequestAction,
    ErrorRequestAction,
    startRequest,
    stopRequest,
    errorRequest,
    StartUpdatingRequestAction,
    StopUpdatingRequestAction,
    ErrorUpdatingRequestAction,
    startUpdatingRequest,
    stopUpdatingRequest,
    errorUpdatingRequest,
    StartAddingRequestAction,
    StopAddingRequestAction,
    ErrorAddingRequestAction,
    startAddingRequest,
    stopAddingRequest,
    errorAddingRequest
} from './actions/requestActions';
import {
    addCurrentUser,
    addChildToUser,
    setChildImagesList,
    setChildAvatar,
    updateChildData,
    updateUserData,
    AddUserAction,
    AddChildToUserAction,
    SetChildImagesListAction,
    SetChildAvatarAction,
    UpdateChildDataAction,
    UpdateUserDataAction
} from './actions/userActions';
import {
    loadUserMessages,
    LoadMessagesAction,
    SetMessageIsReaded,
    setMessageIsReaded
} from './actions/messageActions';
import {
    setUserToast,
    SetToastAction,
    setIsRemoved,
    SetIsRemoved,
    setSelectedChild,
    SetSelectedChild
} from './actions/generalActions';
import { State as ImagesLists } from '../components/common/RemovingImage/RemovingImageStyle';
import {
    IMessage,
    TargetOptions,
    IOutsideMessage,
    UserStatus,
    UserState,
    ChildState,
    IChildData,
    UpdateUserTypeData
} from '../types/global';
import { API_URL, URL } from '../config';

export const loginUser = (payload: IUserLogin): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | AddUserAction | SetSelectedChild
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
        const user: UserState = res.data.dto;
        if (user.children.length) {
            user.children.forEach((child: ChildState) => {
                if (child.avatar.length !== 0) {
                    child.avatar = `${URL}${child.avatar}`;
                }
                child.images = child.images.map((image: string) => {
                    return `${URL}${image}`
                })
            })
            dispatch(addCurrentUser(user));
            dispatch(setSelectedChild(user.children[0]._id));
        } else {
            dispatch(addCurrentUser(user));
        }
        dispatch(stopRequest());

    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
    }
}

export const addUser = (payload: Register): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction
> => async (dispatch, getState) => {
    dispatch(startRequest())
    payload.prepare();

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await axios.post(`${API_URL}/auth/user`, payload.getContent())
        dispatch(stopRequest());
    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
    }

}

export const updateUser = (payload: any, dataType: UpdateUserTypeData, userId: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction | SetToastAction | UpdateUserDataAction
> => async (dispatch, getState) => {
    dispatch(startUpdatingRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse;
        if (dataType === UpdateUserTypeData.all) {
            res = await axios.put(`${API_URL}/users/user/alldata/${userId}`, payload, {
                headers: {
                    'Authorization': localStorage.getItem('tokenFDD')
                },
            });
        } else if (dataType === UpdateUserTypeData.data) {
            res = await axios.put(`${API_URL}/users/user/data/${userId}`, payload.getContent(), {
                headers: {
                    'Authorization': localStorage.getItem('tokenFDD')
                },
            });
        } else if (dataType === UpdateUserTypeData.password) {
            res = await axios.put(`${API_URL}/users/user/password/${userId}`, payload, {
                headers: {
                    'Authorization': localStorage.getItem('tokenFDD')
                },
            });
        }
        if (getState().user.status === UserStatus.parent) {
            const userAfterUpdated = res!.data.user;
            dispatch(updateUserData({
                firstName: userAfterUpdated.firstName,
                lastName: userAfterUpdated.lastName,
                email: userAfterUpdated.email,
                phone: userAfterUpdated.phone,
                adress: userAfterUpdated.adress,
            }))
        }
        dispatch(setUserToast({ isOpen: true, content: res!.data.message, variant: "success" }));
        dispatch(stopUpdatingRequest());
    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorUpdatingRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorUpdatingRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorUpdatingRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
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
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
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
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
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
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
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
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
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
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
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
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
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
        dispatch(loadUserMessages(res.data.messages, res.data.quantity));
        dispatch(stopRequest());

    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
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
        dispatch(loadUserMessages(res.data.messages, res.data.quantity));
        dispatch(stopRequest());
    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
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
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
    }
}

export const updateChildDataRequest = (payload: IChildData, childId: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction | UpdateChildDataAction
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.put(`${API_URL}/users/child/${childId}`, payload, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })
        dispatch(updateChildData(childId, res.data.child));
        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }));
        dispatch(stopRequest());
    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
    }
}

export const addChildToParent = (payload: IChildData, userId?: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction | AddChildToUserAction | SetSelectedChild
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
            dispatch(setSelectedChild(res.data.child._id));
        }
        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }));
        dispatch(stopRequest());
    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
    }
}

export const addAvatarToChild = (avatar: File, childId: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartAddingRequestAction | StopAddingRequestAction | ErrorAddingRequestAction |
    SetToastAction | SetChildAvatarAction
> => async (dispatch, getState) => {
    dispatch(startAddingRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const formData = new FormData();
        formData.append('image', avatar);
        let res: AxiosResponse = await axios.put(`${API_URL}/users/child/avatar/${childId}`, formData, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })
        const result = `${URL}${res.data.avatar}`;
        dispatch(setChildAvatar(childId, result));
        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }));
        dispatch(stopAddingRequest());
    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorAddingRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorAddingRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorAddingRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }

    }
}

export const addImageToChild = (image: File, childId: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartAddingRequestAction | StopAddingRequestAction | ErrorAddingRequestAction |
    SetToastAction | SetChildImagesListAction
> => async (dispatch, getState) => {
    dispatch(startAddingRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const formData = new FormData();
        formData.append('image', image)
        let res: AxiosResponse = await axios.post(`${API_URL}/users/child/image/${childId}`, formData, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })
        const images = res.data.images.map((image: string) => {
            return `${URL}${image}`
        })
        dispatch(setChildImagesList(childId, images));
        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }));
        dispatch(stopAddingRequest());
    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorAddingRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorAddingRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorAddingRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
    }
}

export const updateImagesList = (payload: ImagesLists): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction |
    SetToastAction | SetChildImagesListAction
> => async (dispatch, getState) => {
    try {
        dispatch(startUpdatingRequest());
        await new Promise(resolve => setTimeout(resolve, 2000));
        const contentList = payload.contentList.map((item: string) => item.replace(URL, ''));
        const removeList = payload.removeList.map((item: string) => item.replace(URL, ''));
        const data: ImagesLists = {
            contentList,
            removeList,
            id: payload.id
        }
        let res: AxiosResponse = await axios.put(`${API_URL}/users/child/images`, data, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })
        dispatch(setChildImagesList(payload.id!, payload.contentList));
        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }));
        dispatch(stopUpdatingRequest());
    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorUpdatingRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorUpdatingRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorUpdatingRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
    }
}