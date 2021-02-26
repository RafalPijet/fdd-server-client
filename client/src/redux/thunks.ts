import { ThunkAction } from "redux-thunk";
import { RootState } from './store';
import { IUserLogin } from "../components/pages/LoginPage/LoginPageStyle";
import { StartRequestAction } from './actions/requestActions';

export const loginUser = (payload: IUserLogin): ThunkAction<
    Promise<void>,
    any,
    RootState,
    StartRequestAction
> => async (dispatch, getState) => {
    console.log(payload)
}