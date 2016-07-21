import React, {Component} from 'react'
import {Link} from 'react-router'

export default class NotFound extends Component {
    render() {
        return (
            <div className="col-lg-offset-1">
                <img src={'../../../image/404.jpg'}/>
                <Link to='/'><h1>на главную?</h1></Link>
            </div>
        )
    }
}