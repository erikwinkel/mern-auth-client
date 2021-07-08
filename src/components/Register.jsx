import { useState } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Redirect } from 'react-router-dom'
import Profile from './Profile'

export default function Register(props) {
    // state for the controlled form
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    // state for the falsh message from the server
    const [message,setMessage] = useState('')

    // function to handle form submission
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            // make a req body
            const requestBody = {
                name: name,
                email: email,
                password: password
            }

            // post registration data to server
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, requestBody)

            // take the token out of the response
            const { token } = response.data
            
            //set token in local storage
            localStorage.setItem('jwtToken', token)

            // decode the token
            const decoded = jwt.decode(token)

            // set the user in the app
            props.setCurrentUser(decoded)

        } catch(err) {
            if(err.response.status === 400) {
                setMessage(err.response.data.msg)
            }
        }
    }
    // redirect if user is logged in
    if(props.currentUser) return <Redirect to='/profile' component={ Profile } currentUser={props.currentUser} />

    return (
        <div>
            <h3>Register a new account:</h3>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name-input'>name:</label>
                <input
                    id='name-input'
                    type='text'
                    placeholder='enter your name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <label htmlFor='email-input'>email:</label>
                <input
                    id='email-input'
                    type='email'
                    placeholder='enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                
                <label htmlFor='password-input'>password:</label>
                <input
                    id='password-input'
                    type='password'
                    placeholder='enter a password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                
                
                <input
                    type='submit'
                    value='create account'
                />

            </form>
        </div>
    )
}