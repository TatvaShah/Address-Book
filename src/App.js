import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import RouterComponent from "./router";
import { getAllUsers } from './redux/actions/userActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <RouterComponent/>
  );
}

export default App;
