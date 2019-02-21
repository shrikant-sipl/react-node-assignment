import React from "react";
import { Route, Switch } from "react-router-dom"
import DashBoard from "./components/DashBoard";
import NotFoundPage from "./common/NotFoundPage";
import HomePage from "./components/HomePage";
import CardList from "./components/CardList"

/**
 * @name customRoutes
 * @param {*}
 * @description creating custom routes for navigation
 */
const customRoutes = (props) => {
    return (
        <Switch>

            {/* Routes of Logout User */}
            {(!props.isLoggedIn &&
                <Switch>
                    <Route exact path="/" render={() => <HomePage />} />
                                    </Switch>
            )}

            {/* Routes of Login User */}
            {props.isLoggedIn &&
                <Switch>
                    <Route exact path="/dashboard" render={() => <DashBoard {...props} />} />
                    <Route exact path="/profileCards" render={() => <CardList {...props} />} />
                    <Route exact path="/" render={() => <DashBoard />} />
                    {/* Routes of Logout Link */}
                    <Route path="/logOut" render={() => {
                        //Call logout User from props
                        props.logUserOut();
                    }
                    } />
                    <Route render={() => <NotFoundPage />} />

                </Switch>
            }
        </Switch>

    )
}

export default customRoutes;