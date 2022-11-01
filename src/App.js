import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, NavLink, Route, Switch, useHistory } from 'react-router-dom';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import Header from './components/Home/Header/Header';
import Modal from './HOC/Modal/Modal';
import About from './pages/About/About';
import BaiTapToDoListSaga from './pages/BaiTapToDoListSaga/BaiTapToDoListSaga';
import Contact from './pages/Contact/Contact';
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import LoginJira from './pages/Login/LoginJira';
import JiraCyberbug from './pages/CyberBugPage/JiraCyberbug';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import Todolist from './pages/Todolist/Todolist';
import ToDoListRedux from './pages/Todolist/ToDoListRedux';
import TodolistRFC from './pages/Todolist/TodolistRFC';
import { ADD_HISTORY, GET_PROJECT_CATEGORY } from './redux/constants/CyberBugConst';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { LoginJiraTemplet } from './templates/JiraTemplate/LoginJizaTemplet';
import Test from './Test/Test';
import { CyberBugTemplate } from './templates/HomeTemplate/CyberBugTemplate';
import CreateProjectCyberbug from './components/Cyberbug/CreateProjectCyberbug';
import MainCyberbug from './components/Cyberbug/MainCyberbug';
import ProjectManagerment from './components/Cyberbug/ProjectManagerment';

function App() {

  const dispatch = useDispatch();
  let history = useHistory();


  // console.log(history);

  useEffect(() => {
    dispatch({ type: ADD_HISTORY, history: history })
    dispatch({ type: GET_PROJECT_CATEGORY })
  }, [])

  return (
    <>
      <Modal />
      <LoadingComponent />


      {/* <Test/> */}
      <Switch>

        {/* <Route exact path='/home'  render={(propsRoute)=>{
          return <div>
                <Header />
                <Home {...propsRoute} />
          </div>
        }}/> */}
        <LoginJiraTemplet exact path='/loginjira' Component={LoginJira} />
        <CyberBugTemplate exact path='/' Component={MainCyberbug} />
        <CyberBugTemplate exact path='/main' Component={MainCyberbug} />
        <CyberBugTemplate exact path='/createproject' Component={CreateProjectCyberbug} />
        <CyberBugTemplate exact path='/projectmanagerment' Component={ProjectManagerment} />

        {/* <HomeTemplate path="/home" exact Component={Home} /> */}
        

        {/* <HomeTemplate exact path='/contact' Component={Contact} />
        <HomeTemplate exact path='/about' Component={About} />
        <HomeTemplate exact path='/login' Component={Login} />
        <HomeTemplate exact path='/detail/:id' Component={Detail} />
        <HomeTemplate exact path='/profile' component={Profile} />
        <HomeTemplate exact path='/todolistrfc' Component={TodolistRFC} />
        <HomeTemplate exact path='/todolistrcc' Component={Todolist} />
        <HomeTemplate exact path='/todolistredux' Component={ToDoListRedux} />
        <HomeTemplate exact path='/todolistsaga' Component={BaiTapToDoListSaga} />
        <HomeTemplate exact path='/demohocmodal' Component={DemoHOCModal} /> */}

        
        <HomeTemplate exact path='/' Component={Home} />
        <HomeTemplate path="*" component={PageNotFound} />

      </Switch>

    </>
  );
}

export default App;
