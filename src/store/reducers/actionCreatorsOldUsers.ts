import axios from "axios";
import { AppDispatch } from "../store";
import { userSlice } from "./userSlice";
import { IUser } from "../../models/IUser";

export const fetchOldUsers = () => async (dispatch: AppDispatch) => {
  function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
  }

  try {
    dispatch(userSlice.actions.usersFetching());
    const response = await axios.get<IUser[]>(
      "https://bla-bla/old/users"
    );
    dispatch(userSlice.actions.usersFetchingSuccess(response.data));
  } catch (e) {
    dispatch(userSlice.actions.usersFetchingError(getErrorMessage(e)));
  }
};
