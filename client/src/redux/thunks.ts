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
    errorAddingRequest,
    StartMessagesRequestAction,
    StopMessagesRequestAction,
    ErrorMessagesRequestAction,
    startMessagesRequest,
    stopMessagesRequest,
    errorMessagesRequest,
    StartReportingRequestAction,
    StopReportingRequestAction,
    ErrorReportingRequestAction,
    startReportingRequest,
    stopReportingRequest,
    errorReportingRequest
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
    UpdateUserDataAction,
    UpdateChildStatusAction,
    updateChildStatus
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
    SetSelectedChild,
    setSelectedPerson,
    SetSelectedPersonAction,
    UpdateSelectedPersonChildDataAction,
    updateSelectedPersonChildData,
    UpdateSelectedPersonChildImagesListAction,
    updateSelectedPersonalChildImagesList,
    UpdateSelectedPersonChildAvatarAction,
    updateSelectedPersonalChildAvatar,
    UpdateSelectedPersonChildStatusAction,
    updateSelectedPersonalChildStatus,
    AddChildToSelectedPersonAction,
    addChildToSelectedPerson,
    UpdateSelectedPersonUserDataAction,
    updateSelectedPersonUserData,
    SetSelectedQuantityAction,
    setSelectedQuantity,
    UpdateSelectedPersonChildInvoicesListAction,
    updateSelectedPersonalChildInvoicesList,
    SetAllNewsAction,
    setAllNews,
    UpdatePicturesOfCurrentNewsAction,
    updatePicturesOfCurrentNews,
    UpdateNewsOfPublicationAction,
    updateNewsOfPublication,
    updateNewsOfData,
    UpdateNewsOfDataAction,
    SetChildrenListAction,
    setChildrenList,
    SetAvailableReportsYearsAction,
    setAvailableReportsYears,
    SetReportsOfSelectedYearAction,
    setReportsOfSelectedYear,
    UpdateReportItemAction,
    updateReportItem,
    AddReportItemAction,
    addReportItem,
    RemoveReportItemAction,
    removeReportItem
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
    UpdateUserTypeData,
    SearchUserType,
    InvoiceState,
    NewsState,
    NewsDataUpdate,
    ChildBasicState,
    ReportState
} from '../types/global';
import {
    SetUsersQuantityAction,
    SetChildrenQuantityAction,
    SetPublicatedNewsQuantityAction,
    SetInvoicesQuantityAction,
    SetCurrentYearReportIsPublicatedAction,
    SetUnpublicatedChildrenAction,
    SetParentsWithoutAnyChildrenAction,
    setUsersQuantity,
    setChildrenQuantity,
    setPublicatedNewsQuantity,
    setInvoicesQuantity,
    setCurrentYearReportIsPublicated,
    setUnpublicatedChildren,
    setParentsWithoutAnyChildren
} from './actions/reportsActions';
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

export const getAllNewsRequest = (): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction |
    SetAllNewsAction
> => async (dispatch, getState) => {
    dispatch(startUpdatingRequest());

    try {
        // await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.get(`${API_URL}/auth/news`);
        const news: NewsState[] = res.data.news;
        if (news.length) {
            news.forEach((item: NewsState) => {
                item.images = item.images.map((image: string) => {
                    return `${URL}${image}`
                })
            })
            dispatch(setAllNews(news));
        }
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

export const updateUserStatus = (userId: string, status: UserStatus): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction |
    SetToastAction | SetSelectedPersonAction
> => async (dispatch, getState) => {
    dispatch(startUpdatingRequest());

    try {
        let res: AxiosResponse = await axios.put(`${API_URL}/admin/user/status/${userId}`, { status }, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        });
        dispatch(setSelectedPerson(null));
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

export const updateUser = (payload: any, dataType: UpdateUserTypeData, userId: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction |
    SetToastAction | UpdateUserDataAction | UpdateSelectedPersonUserDataAction
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
        const userAfterUpdated = res!.data.user;
        if (getState().user.status === UserStatus.parent) {
            dispatch(updateUserData({
                firstName: userAfterUpdated.firstName,
                lastName: userAfterUpdated.lastName,
                email: userAfterUpdated.email,
                phone: userAfterUpdated.phone,
                adress: userAfterUpdated.adress,
            }))
        } else {
            dispatch(updateSelectedPersonUserData({
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

export const getPersonByIdRequest = (type: SearchUserType, id: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartAddingRequestAction | StopAddingRequestAction | ErrorAddingRequestAction |
    SetSelectedPersonAction | SetSelectedChild | SetSelectedQuantityAction
> => async (dispatch, getState) => {
    dispatch(startAddingRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.get(`${API_URL}/admin/people/${type}/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        });
        if (type === SearchUserType.child) {
            dispatch(setSelectedQuantity(res.data.quantity));
            let person: ChildState = res.data.person;
            person.avatar = `${URL}${person.avatar}`;
            person.images = person.images.map(item => {
                return `${URL}${item}`
            })
            person.invoices.forEach((invoice: InvoiceState) => {
                invoice.content = invoice.content.map(item => {
                    return `${URL}${item}`
                })
            })
            dispatch(setSelectedPerson(person));
            dispatch(setSelectedChild(person._id));
        } else {
            let person: UserState = {
                _id: res.data.person._id,
                status: res.data.person.status,
                firstName: res.data.person.firstName,
                lastName: res.data.person.lastName,
                email: res.data.person.email,
                phone: res.data.person.phone,
                children: res.data.person.children,
                adress: {
                    zipCode: res.data.person.zipCode,
                    town: res.data.person.town,
                    street: res.data.person.street,
                    number: res.data.person.number
                }
            };
            if (type === SearchUserType.parent) {

                person.children.forEach(child => {
                    child.avatar = `${URL}${child.avatar}`;
                    child.images = child.images.map(image => {
                        return `${URL}${image}`
                    })
                })
            }
            dispatch(setSelectedPerson(person));
        }
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

export const addMessage = (payload: string, _id?: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartMessagesRequestAction | StopMessagesRequestAction | ErrorMessagesRequestAction | SetToastAction
> => async (dispatch, getState) => {
    dispatch(startMessagesRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.post(`${API_URL}/users/message`, { content: payload, userId: _id }, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        });
        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }))
        dispatch(stopMessagesRequest());
    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorMessagesRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorMessagesRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorMessagesRequest({ isError: true, message: 'Coś poszło nie tak!' }));
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
    StartMessagesRequestAction | StopMessagesRequestAction | ErrorMessagesRequestAction | SetToastAction
> => async (dispatch, getState) => {
    dispatch(startMessagesRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.put(`${API_URL}/admin/messages/update/answer`, { messageId, content, email, name }, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        });
        if (res.status === 201) dispatch(setUserToast({ isOpen: true, content: `Odpowiedź do ${name} na email ${email} została wysłana.`, variant: "success" }));
        dispatch(stopMessagesRequest());
    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorMessagesRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorMessagesRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorMessagesRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
    }
}

export const sendMessageByEmail = (content: string, email: string, name: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartMessagesRequestAction | StopMessagesRequestAction | ErrorMessagesRequestAction | SetToastAction
> => async (dispatch, getState) => {
    dispatch(startMessagesRequest());
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.post(`${API_URL}/admin/messages/email`, { content, email, name }, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        });
        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }));
        dispatch(stopMessagesRequest());
    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorMessagesRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorMessagesRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorMessagesRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
    }
}

export const getUserMessages = (target: TargetOptions, page: number, rowsPerPage: number): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartMessagesRequestAction | StopMessagesRequestAction | ErrorMessagesRequestAction | LoadMessagesAction
> => async (dispatch, getState) => {
    dispatch(startMessagesRequest());
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
        dispatch(stopMessagesRequest());
    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorMessagesRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorMessagesRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorMessagesRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
    }
}

export const getAdminMessages = (target: TargetOptions, page: number, rowsPerPage: number): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartMessagesRequestAction | StopMessagesRequestAction | ErrorMessagesRequestAction | LoadMessagesAction
> => async (dispatch, getState) => {
    dispatch(startMessagesRequest());
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
        dispatch(stopMessagesRequest());

    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorMessagesRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorMessagesRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorMessagesRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
    }
}

export const getAdminMessagesByUser = (isParent: boolean, user: string, page: number, rowsPerPage: number): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartMessagesRequestAction | StopMessagesRequestAction | ErrorMessagesRequestAction | LoadMessagesAction
> => async (dispatch, getState) => {
    dispatch(startMessagesRequest());
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
        dispatch(stopMessagesRequest());
    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorMessagesRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorMessagesRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorMessagesRequest({ isError: true, message: 'Coś poszło nie tak!' }));
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
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction |
    UpdateChildDataAction | UpdateSelectedPersonChildDataAction | UpdateChildStatusAction
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.put(`${API_URL}/users/child/${childId}`, payload, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })

        if (getState().user.status === UserStatus.parent) {
            dispatch(updateChildData(childId, res.data.child));
            dispatch(updateChildStatus(childId, res.data.child.active));
        } else {
            dispatch(updateSelectedPersonChildData(res.data.child));
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

export const addChildToParent = (payload: IChildData, userId?: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction |
    AddChildToUserAction | SetSelectedChild | AddChildToSelectedPersonAction
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
        } else {
            dispatch(addChildToSelectedPerson(res.data.child));
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

export const updateReportRequest = (payload: { reportId: string, reportFile: File, reportTitle: string }): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction |
    SetToastAction | UpdateReportItemAction
> => async (dispatch, getState) => {

    if (getState().general.selectedYearPeriod !== null) {
        const result = getState().general.selectedYearPeriod.find((report: ReportState) => report._id === payload.reportId);
        if (result) {
            const fileName = result.report.substring(result.report.lastIndexOf('/') + 1, result.report.length)
            if (fileName === payload.reportFile.name && result.title === payload.reportTitle) {
                dispatch(setUserToast({ isOpen: true, content: 'Nie dokonano zmian. Aktualizacja niemożliwa', variant: "info" }));
            } else {
                const formData = new FormData();
                if (fileName !== payload.reportFile.name) {
                    formData.append('image', payload.reportFile);
                }
                if (result.title !== payload.reportTitle) {
                    formData.append('title', payload.reportTitle);
                }
                dispatch(startUpdatingRequest());

                try {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    let res: AxiosResponse = await axios.put(`${API_URL}/admin/reports/${payload.reportId}`, formData, {
                        headers: {
                            'Authorization': localStorage.getItem('tokenFDD'),
                            "Content-type": "multipart/form-data",
                        },
                    })
                    if (res.data.report) {
                        let updatedReport: ReportState = res.data.report;
                        updatedReport.report = `${URL}${updatedReport.report}`;
                        dispatch(updateReportItem(updatedReport));
                        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }));
                    }
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
        } else {
            dispatch(setUserToast({ isOpen: true, content: 'Nie znaleziono danych sprawozdania', variant: "info" }));
        }
    }
}

export const removeReportRequest = (id: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction | RemoveReportItemAction
> => async (dispatch, getState) => {

    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.delete(`${API_URL}/admin/reports/${id}`,
            {
                headers: {
                    'Authorization': localStorage.getItem('tokenFDD')
                }
            })
        if (res.status === 201) dispatch(removeReportItem(id));
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

export const addReportRequest = (payload: { reportFile: File, reportTitle: string }): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartAddingRequestAction | StopAddingRequestAction | ErrorAddingRequestAction |
    SetToastAction | AddReportItemAction
> => async (dispatch, getState) => {
    dispatch(startAddingRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const formData = new FormData();
        formData.append('image', payload.reportFile);
        formData.append('title', payload.reportTitle);
        let res: AxiosResponse = await axios.post(`${API_URL}/admin/reports`, formData, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD'),
                "Content-type": "multipart/form-data",
            },
        })
        dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }));
        if (getState().general.selectedYearPeriod !== null && getState().general.selectedYearPeriod.length) {
            if (res.data.newReport) {
                let newReport = res.data.newReport;
                if (newReport.createdAt.substring(0, 4) === getState().general.selectedYearPeriod[0].createdAt.substring(0, 4)) {
                    newReport.report = `${URL}${newReport.report}`;
                    dispatch(addReportItem(newReport))
                }
            }
        }
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

export const addInvoiceToChild = (payload: any, childId: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartAddingRequestAction | StopAddingRequestAction | ErrorAddingRequestAction |
    SetToastAction
> => async (dispatch, getState) => {
    dispatch(startAddingRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const formData = new FormData();
        if (payload.files[0] !== null) formData.append('image', payload.files[0]);
        if (payload.files[1] !== null) formData.append('image', payload.files[1]);
        formData.append('description', payload.description)
        let res: AxiosResponse = await axios.post(`${API_URL}/users/child/invoice/add/${childId}`, formData, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD'),
                "Content-type": "multipart/form-data",
            },
        })
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

export const addAvatarToChild = (avatar: File, childId: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartAddingRequestAction | StopAddingRequestAction | ErrorAddingRequestAction |
    SetToastAction | SetChildAvatarAction | UpdateSelectedPersonChildAvatarAction |
    UpdateChildStatusAction
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
        if (getState().user.status === UserStatus.parent) {
            dispatch(setChildAvatar(childId, result));
            dispatch(updateChildStatus(childId, res.data.isActive));
        } else {
            dispatch(updateSelectedPersonalChildAvatar(result));
        }
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

export const addPictureToNewsRequest = (picture: File, newsId: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartAddingRequestAction | StopAddingRequestAction | ErrorAddingRequestAction |
    SetToastAction | UpdatePicturesOfCurrentNewsAction
> => async (dispatch, getState) => {
    dispatch(startAddingRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const formData = new FormData();
        formData.append('image', picture);
        let res: AxiosResponse = await axios.post(`${API_URL}/admin/news/picture/${newsId}`, formData, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })
        const images = res.data.images.map((image: string) => {
            return `${URL}${image}`
        })
        dispatch(updatePicturesOfCurrentNews(newsId, images));
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
    SetToastAction | SetChildImagesListAction | UpdateSelectedPersonChildImagesListAction |
    UpdateChildStatusAction
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
        if (getState().user.status === UserStatus.parent) {
            dispatch(setChildImagesList(childId, images));
            dispatch(updateChildStatus(childId, res.data.isActive));
        } else {
            dispatch(updateSelectedPersonalChildImagesList(images));
        }
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

export const updatePicturesListRequest = (payload: ImagesLists): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction |
    SetToastAction | UpdatePicturesOfCurrentNewsAction
> => async (dispatch, getState) => {
    dispatch(startUpdatingRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const contentList = payload.contentList.map((item: string) => item.replace(URL, ''));
        const removeList = payload.removeList.map((item: string) => item.replace(URL, ''));
        const data: ImagesLists = {
            contentList,
            removeList,
            id: payload.id
        }
        let res: AxiosResponse = await axios.put(`${API_URL}/admin/news/pictures`, data, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })
        if (payload.id !== null) {
            dispatch(updatePicturesOfCurrentNews(payload.id, payload.contentList))
        }
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

export const updateImagesList = (payload: ImagesLists): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction |
    SetToastAction | SetChildImagesListAction | UpdateSelectedPersonChildImagesListAction |
    UpdateChildStatusAction
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
        if (getState().user.status === UserStatus.parent) {
            dispatch(setChildImagesList(payload.id!, payload.contentList));
            if (payload.id !== null) {
                dispatch(updateChildStatus(payload.id, res.data.isActive))
            }
        } else {
            dispatch(updateSelectedPersonalChildImagesList(payload.contentList));
        }
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

export const getChildrenBasicDataRequest = (page: number, rowsPerPage: number): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction |
    SetSelectedQuantityAction | SetChildrenListAction | SetSelectedQuantityAction

> => async (dispatch, getState) => {
    dispatch(startUpdatingRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        let res: AxiosResponse = await axios.get(`${API_URL}/auth/children/basic/data?page=${page}&rowsPerPage=${rowsPerPage}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let { quantity, children } = res.data;
        if (children.length) {
            children = children.map((child: ChildBasicState) => {
                child.avatar = `${URL}${child.avatar}`;
                return child;
            })
            dispatch(setChildrenList(children));
            dispatch(setSelectedQuantity(quantity));
        }
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

export const getChildByIdRequest = (childId: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction |
    SetSelectedPersonAction | SetSelectedChild
> => async (dispatch, getState) => {
    dispatch(startUpdatingRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        let res: AxiosResponse = await axios.get(`${API_URL}/auth/child/${childId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const { child } = res.data;
        child.avatar = `${URL}${child.avatar}`;
        child.images = child.images.map(item => {
            return `${URL}${item}`
        });
        dispatch(setSelectedPerson(child));
        dispatch(setSelectedChild(child._id));
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

export const getCurrentlyInvoicesList = (childId: string, page: number, rowsPerPage: number): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction |
    SetSelectedQuantityAction | UpdateSelectedPersonChildInvoicesListAction

> => async (dispatch, getState) => {
    try {
        dispatch(startUpdatingRequest());
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.get(`${API_URL}/admin/child/invoices/${childId}?page=${page}&rowsPerPage=${rowsPerPage}`, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })
        let { quantity, invoices } = res.data;
        if (invoices.length) {
            invoices.forEach(invoice => {
                invoice.content = invoice.content.map(item => {
                    return `${URL}${item}`
                })
            })
            dispatch(updateSelectedPersonalChildInvoicesList(invoices));
        }
        dispatch(setSelectedQuantity(quantity));
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

export const addNewsRequest = (payload: NewsState): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.post(`${API_URL}/admin/news`, payload, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })
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

export const updateNewsPublication = (newsId: string, isPublication: boolean): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction |
    SetToastAction | UpdateNewsOfPublicationAction
> => async (dispatch, getState) => {
    const payload = { newsId, isPublication };
    dispatch(startUpdatingRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.put(`${API_URL}/admin/news/publication`, payload, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })
        dispatch(updateNewsOfPublication(newsId, isPublication));
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

export const updateNewsDataRequest = (payload: NewsDataUpdate): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction |
    SetToastAction | UpdateNewsOfDataAction
> => async (dispatch, getState) => {
    dispatch(startUpdatingRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.put(`${API_URL}/admin/news/data`, payload, {
            headers: {
                'Authorization': localStorage.getItem('tokenFDD')
            },
        })

        dispatch(updateNewsOfData(payload));
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

export const removeCurrentNewsRequest = (newsId: string, images: string[]): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction | SetIsRemoved
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        if (images.length) {
            images = images.map((item: string) => item.replace(URL, ''));
        }
        let res: AxiosResponse = await axios.delete(`${API_URL}/admin/news`,
            {
                data: { newsId, images }, headers: {
                    'Authorization': localStorage.getItem('tokenFDD')
                }
            })
        dispatch(setIsRemoved(true));
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

export const getReportsYearsRequest = (): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetAvailableReportsYearsAction
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.get(`${API_URL}/auth/reports/years`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (res.data.availableYears) {
            dispatch(setAvailableReportsYears(res.data.availableYears));
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

export const getReportsByYearRequest = (year: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetReportsOfSelectedYearAction
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.get(`${API_URL}/auth/reports/${year}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (res.data.selectedYearReports.length) {
            const reports = res.data.selectedYearReports.map((item: ReportState) => {
                item.report = `${URL}${item.report}`;
                return item
            })
            dispatch(setReportsOfSelectedYear(reports));
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

export const updateChildStatusRequest = (_id: string, isActive: boolean): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | UpdateSelectedPersonChildStatusAction
> => async (dispatch, getState) => {
    dispatch(startRequest());
    const payload = { _id, isActive }

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.put(`${API_URL}/admin/child/status`, payload,
            {
                headers: {
                    'Authorization': localStorage.getItem('tokenFDD')
                }
            })
        if (res.status === 201) {
            dispatch(updateSelectedPersonalChildStatus(isActive));
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

export const removeChildRequest = (_id: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction |
    SetSelectedChild | SetSelectedPersonAction
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.delete(`${API_URL}/admin/child/${_id}`,
            {
                headers: {
                    'Authorization': localStorage.getItem('tokenFDD')
                }
            })
        if (res.status === 201) {
            dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }));
            dispatch(setSelectedChild(null));
            dispatch(setSelectedPerson(null));
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

export const removeUserRequest = (_id: string): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction | StopRequestAction | ErrorRequestAction | SetToastAction |
    SetSelectedPersonAction
> => async (dispatch, getState) => {
    dispatch(startRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.delete(`${API_URL}/admin/user/${_id}`,
            {
                headers: {
                    'Authorization': localStorage.getItem('tokenFDD')
                }
            })
        if (res.status === 201) {
            dispatch(setUserToast({ isOpen: true, content: res.data.message, variant: "success" }));
            dispatch(setSelectedPerson(null));
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

export const getReportsRequest = (): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartReportingRequestAction | StopReportingRequestAction | ErrorReportingRequestAction | SetUsersQuantityAction |
    SetChildrenQuantityAction | SetPublicatedNewsQuantityAction | SetInvoicesQuantityAction |
    SetCurrentYearReportIsPublicatedAction | SetUnpublicatedChildrenAction | SetParentsWithoutAnyChildrenAction
> => async (dispatch, getState) => {
    dispatch(startReportingRequest());

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let res: AxiosResponse = await axios.get(`${API_URL}/admin/reports`,
            {
                headers: {
                    'Authorization': localStorage.getItem('tokenFDD')
                }
            })
        if (res.data) {
            const {
                parentsQuantity,
                childrenQuantity,
                publicatedNewsQuantity,
                invoicesQuantity,
                isReportDone,
                unpublicatedChildren,
                parentsWithoutChildren
            } = res.data;
            dispatch(setUsersQuantity(parentsQuantity));
            dispatch(setChildrenQuantity(childrenQuantity));
            dispatch(setPublicatedNewsQuantity(publicatedNewsQuantity));
            dispatch(setInvoicesQuantity(invoicesQuantity));
            dispatch(setCurrentYearReportIsPublicated(isReportDone));
            dispatch(setUnpublicatedChildren(unpublicatedChildren));
            dispatch(setParentsWithoutAnyChildren(parentsWithoutChildren));
        }
        dispatch(stopReportingRequest());
    } catch (err) {
        if (err.response !== undefined) {
            err.response.data.message ?
                dispatch(errorReportingRequest({ isError: true, message: err.response.data.message })) :
                dispatch(errorReportingRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        } else {
            dispatch(errorReportingRequest({ isError: true, message: 'Coś poszło nie tak!' }));
        }
    }
}
