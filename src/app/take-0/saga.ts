import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "../api";
import { actions, ActionTypes } from "../store";

function* getPerson() {
  const personDto = yield call(api.getPerson);
  const isMale = personDto.sex === 1; // This property doesn't exist on IPersonDto, but no error.
  const isOld = personDto.age >= 30 || isMale;
  yield put(actions.getPersonSuccess(personDto, isOld));
}

function* watchGetPersonRequest() {
  yield takeEvery(ActionTypes.GetPersonRequest, getPerson);
}

export { watchGetPersonRequest };
