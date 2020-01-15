import React from "react";

//import { initialize } from "./take-0/create-store";
//import { initialize } from "./take-1/create-store";
import { initialize } from "./take-2/create-store";
import { Person } from "./person";
import { Provider } from "react-redux";

const store = initialize();

const component: React.FC = () => (
  <Provider store={store}>
    <h1>DEMO Redux Saga Typescript</h1>
    <Person caption="Take-2" />
  </Provider>
);

export { component as App };
