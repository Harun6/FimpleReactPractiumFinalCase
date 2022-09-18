import React, { useEffect, useState } from 'react';
import "./Assets/Css/App.css"
import Navbar from "./Pages/Common/Navbar"
import Main from "./Pages/Main"
import Create from "./Pages/Main/Create"
import Edit from "./Pages/Main/Edit"
import Detail from "./Pages/Main/Detail"
import { withRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainContext, DetailContext, useContext } from "./Context"

function App() {

  const [calcList, setcalcList] = useState([])
  const [Detailobj, setDetailobj] = useState({})
  const Data = {
    calcList,
    setcalcList
  }

  const Detaildata = {
    Detailobj,
    setDetailobj
  }

  return (
    <MainContext.Provider value={Data}>
      <DetailContext.Provider value={Detaildata}>
        <Navbar />
        <div className='container'>
          <div className='Contentwrapper'>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/Newdata" component={Create} />
              <Route exact path="/Edit/:DataID" component={Edit} />
              <Route exact path="/Details/:DataID" component={Detail} />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </DetailContext.Provider>
    </MainContext.Provider>
  );
}

export default withRouter(App);
