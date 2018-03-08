import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import { raiselyConstants } from '../_constants';

import FacebookLogin from 'react-facebook-login';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            orguuid: raiselyConstants.organisationUUID,
            campaignuuid: raiselyConstants.campaignUUID,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }



    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, orguuid, campaignuuid } = this.state;
        const { dispatch } = this.props;
        if (password && orguuid && campaignuuid) {
            dispatch(userActions.login(username, password, orguuid, campaignuuid));
        }
    }


    render() {
        const { loggingIn } = this.props;
        const { username, password, orguuid, campaignuuid, submitted } = this.state;
        function responseFacebook(response) {
              console.log(response);
        }
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Raisely Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !orguuid ? ' has-error' : '')}>
                        <label htmlFor="orguuid">Organisation UUID</label>
                        <input type="text" className="form-control" name="orguuid" value={orguuid} onChange={this.handleChange} />
                        {submitted && !orguuid &&
                            <div className="help-block">Organisation UUID is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !campaignuuid ? ' has-error' : '')}>
                        <label htmlFor="campaignuuid">Campaign UUID</label>
                        <input type="text" className="form-control" name="campaignuuid" value={campaignuuid} onChange={this.handleChange} />
                        {submitted && !campaignuuid &&
                            <div className="help-block">Campaign UUID is required</div>
                        }
                    </div>
                    <FacebookLogin
                      appId="187532265311099"
                      autoLoad={true}
                      fields="name,email,picture"
                      callback={responseFacebook} />
                    <h2>Or</h2>
                    <div className={'form-group'}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <p>
                            <Link to="/reset">Forgotten Password</Link>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
