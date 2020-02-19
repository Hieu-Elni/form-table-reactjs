import React from 'react';
import {
    Switch,
    Route,
  } from "react-router-dom";

  import Form from './Component/Form';
  import BasicForm from './Component/BasicForm/BasicFormCom';
const routes = () =>{
    return(

            <Switch>
                 
                <Route path="/form" exact component={Form}>
                 
                 </Route>
                 <Route path="/basic" exact component={BasicForm}>
                 
                 </Route>
            </Switch>

    )
}

export default routes