import React from 'react';

import './App.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/router";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { DropdownOrderContext } from "./hoc/DropdownOrderContext";

function App() {
  return (
    <>
        <DropdownOrderContext>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </DropdownOrderContext>
    </>
  );
}

export default App;
