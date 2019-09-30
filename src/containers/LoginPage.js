import React, { Component } from 'react'
import Logo from '../components/Logo'
import { Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class LoginPage extends Component {

    constructor () {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogIn = () => {
        let username = this.state.username
        this.props.onLogIn(this.state)
    }

    handleOnUsernameChange = (e) => {
        console.log(e.target.value)
        let newUsername = e.target.value
        this.setState((prevState) => ({
            ...prevState,
            username: newUsername
        }))
    }

    handleOnPasswordChange = (e) => {
        console.log(e.target.value)
        let newPassword = e.target.value
        this.setState((prevState) => ({
            ...prevState,
            password: newPassword
        }))
    }

    render(){

        return( 
        <div>
            LoginPage
            <Form onSubmit={this.handleLogIn} >
                <Form.Field>
                    <input id='username' placeholder='Username' value={this.state.username} onChange={this.handleOnUsernameChange} />
                    <input id='password' placeholder='Password' value={this.state.password} onChange={this.handleOnPasswordChange} />
                </Form.Field>
                <Button type='submit' >Submit</Button>
            </Form>
            <Link to="/signup">
                <Button>Signup Here</Button>
            </Link>
        </div>
        )
    }


}

export default LoginPage