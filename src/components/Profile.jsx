import { useEffect, useState } from "react"
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'

export default function Profile(props) {
    const [message,setMessage] = useState('')

    // hit authlocked on backend
    useEffect(() => {
        const getPrivateMessage = async () => {
            try {
                // get jwt from localStorage
                const token = localStorage.getItem('jwtToken')

                // make up auth headers
                const authHeaders = {
                    Authorization: token
                }

                // hit the auth locked endpoint
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, { headers: authHeaders })
                
                // set state with data from the server
                setMessage(response.data.msg)

            } catch(err) {
                console.log(err)
                // log user out
                props.handleLogout()
            }
        }
        getPrivateMessage()
    },[props])

    // redirect if there is not user in state
    if(!props.currentUser) return <Redirect to='/login' component={ Login } currentUser={ props.currentUser } />

    return (
        <div>
            <h4>greetings {props.currentUser.name} </h4>
            <h5> your email is {props.currentUser.email}</h5>

            <div>
                <p>you have a secret message from the authorized user area:</p>

                <p>{message}</p>
            </div>
        </div>
    )
}