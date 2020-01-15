import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "../app/api";
import { actions, ActionTypes } from "../app/store";

function* getPerson() {
  const personDto = yield call(api.getPerson);
  const isOld = personDto.age >= 30;
  yield put(actions.getPersonSuccess(personDto, isOld));
}

function* watchGetPersonRequest() {
  yield takeEvery(ActionTypes.GetPersonRequest, getPerson);
}

export { watchGetPersonRequest };
