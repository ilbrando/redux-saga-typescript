import { IPersonDto } from "./api";
import { Reducer } from "redux";

export enum ActionTypes {
  GetPersonRequest = "GET_PERSON_REQUEST",
  GetPersonSuccess = "GET_PERSON_SUCCESS"
}

export const actions = {
  getPersonRequest: () => ({ type: ActionTypes.GetPersonRequest }),
  getPersonSuccess: (person: IPersonDto, isOld: boolean) => ({
    type: ActionTypes.GetPersonSuccess,
    person,
    isOld
  })
};

export interface IState {
  fetching: boolean;
  person?: IPersonDto;
  isOld?: boolean;
}

export const reducer: Reducer<IState> = (
  state = { fetching: false },
  action: any
): IState => {
  switch (action.type) {
    case ActionTypes.GetPersonRequest:
      return { ...state, fetching: true };
    case ActionTypes.GetPersonSuccess:
      return { fetching: false, person: action.person, isOld: action.isOld };
    default:
      return state;
  }
};
