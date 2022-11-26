import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, NavLink, Route, Switch, useHistory } from 'react-router-dom';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import Modal from './HOC/Modal/Modal';
import LoginJira from './pages/Login/LoginJira';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { ADD_HISTORY, GET_ALL_TASK_CATEGORY, GET_ALL_TASK_CATEGORY_PRIORITY, GET_ALL_TYPE_TASK_SAGA, GET_PROJECT_CATEGORY } from './redux/constants/CyberBugConst';
import { LoginJiraTemplet } from './templates/JiraTemplate/LoginJizaTemplet';
import Test from './Test/Test';
import { CyberBugTemplate } from './templates/HomeTemplate/CyberBugTemplate';
import CreateProjectCyberbug from './components/Cyberbug/CreateProjectCyberbug';
import MainCyberbug from './components/Cyberbug/MainCyberbug';
import ProjectManagerment from './components/Cyberbug/ProjectManagerment';


import ModalTaskDetail from './components/Cyberbug/ModalTaskDetail';
import SignUp from './pages/SignUp/SignUp';
import UserManagerment from './components/Cyberbug/UserManagerment';
import EditInformation from './components/Cyberbug/EditInformation';
import ModalConfirm from './components/Cyberbug/ModalConfirm';

function App() {

  const dispatch = useDispatch();
  let history = useHistory();
  const user = useSelector(state => state.InfoUserLogInReducer.useLogin)

  useEffect(() => {
    dispatch({ type: ADD_HISTORY, history: history })
    dispatch({ type: GET_PROJECT_CATEGORY })
    dispatch({ type: GET_ALL_TASK_CATEGORY })
    dispatch({ type: GET_ALL_TASK_CATEGORY_PRIORITY })
    dispatch({ type: GET_ALL_TYPE_TASK_SAGA })
  }, [])




  return (
    <>

      <Modal />
      <ModalTaskDetail />
      <LoadingComponent />
      <ModalConfirm history={history} />


      {/* <Test /> */}
      <Switch>


        {user.id ? <CyberBugTemplate exact path='/' Component={CreateProjectCyberbug} /> : <LoginJiraTemplet exact path='/' Component={LoginJira} />}
        <CyberBugTemplate exact path='/createproject' Component={CreateProjectCyberbug} />
        <LoginJiraTemplet exact path='/loginjira' Component={LoginJira} />
        <LoginJiraTemplet exact path='/signup' Component={SignUp} />
        <CyberBugTemplate exact path='/main/:projectid' Component={MainCyberbug} />
        <CyberBugTemplate exact path='/projectmanagerment' Component={ProjectManagerment} />
        <CyberBugTemplate exact path='/editinformation' Component={EditInformation} />
        <CyberBugTemplate exact path='/usermanagerment' Component={UserManagerment} />
      </Switch>

    </>
  );
}

export default App;
