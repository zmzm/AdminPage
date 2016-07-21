import React from 'react';
import {Link} from 'react-router';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div className='navbar navbar-default navbar-fixed-top'>
                    <div className='container'>
                        <div className='navbar-header'>
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <a className='navbar-brand'>ADMIN PAGE</a>
                        </div>
                        <div className='navbar-collapse collapse navbar-right'>
                            <ul className='nav navbar-nav'>
                                <li><Link to="/">HOME</Link></li>
                                <li><Link to="/users">USERS</Link></li>
                                <li><Link to="/groups">GROUPS</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='headerwrap'>
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
                <div id="footerwrap">
                    <div className="container">
                        <div className="col-lg-5">
                            <h4><i className='fa fa-copyright' />2016 mycompany, all rights reserved.
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}