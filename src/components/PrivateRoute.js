import React from "react";
import { loggedin } from "../api";
import { Route, Redirect } from "react-router-dom";
//High order component
class PrivateRoute extends React.Component {
  state = {
    isLoading: true,
    isLoggedIn: false,
  };
  async componentDidMount() {
    const response = await loggedin();
    if (response.data._id) {
      this.setState({
        isLoading: false,
        isLoggedIn: true,
      });
    } else {
      this.setState({
        isLoading: false,
        isLoggedIn: false,
      });
    }
  }
  render() {
    const { isLoggedIn, isLoading } = this.state;
    const { path, exact, component } = this.props;
    return isLoading ? null : isLoggedIn ? (
      <Route path={path} component={component} exact={exact} />
    ) : (
      <Redirect to="/login" />
    );
  }
}
export default PrivateRoute;

