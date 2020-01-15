import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "../api";
import { actions, ActionTypes } from "../store";
import { YieldReturn } from "./saga-utils";

function* getPerson()  {
  const personDto: YieldReturn<typeof api.getPerson> = yield call(
    api.getPerson
  );
  const isOld = personDto.age >= 30;
  //const isMale = personDto.sex === 1; // Have to comment this line out, because now we get an error.
  yield put(actions.getPersonSuccess(personDto, isOld));
}

function* watchGetPersonRequest() {
  yield takeEvery(ActionTypes.GetPersonRequest, getPerson);
}

export { watchGetPersonRequest };
