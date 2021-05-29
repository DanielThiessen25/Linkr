import styled from 'styled-components'
import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import UserContext from './contexts/UserContext'
import Loader from 'react-loader-spinner'

export default function Login(){
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const history = useHistory()
    const { setUserInformation } = useContext(UserContext)
    const [ isLoading, setLoading ] = useState(false)

    function signIn(){
        if(email==="" || password===""){
            alert("Preencha todos os campos")
            return
        } 
        setLoading(true)
        const body = { email, password }
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in", body)
        request.then(reply => {
            setUserInformation(reply.data)
            history.push('/timeline')
        })
        request.catch(() => {
            alert("email ou senha incorreto(s)")
            setLoading(false)
        })
    }

    return(
        <LoginPage>
            <Logo>
                <Title>linkr</Title>
                <Subtitle>save, share and discover the best links on the web</Subtitle>
            </Logo>
            <LoginArea isLoading={isLoading}>
                <input disabled={isLoading} type="text" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)} onKeyPress={e => {if(e.key === 'Enter') signIn()}} />
                <input disabled={isLoading} type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} onKeyPress={e => {if(e.key === 'Enter') signIn()}} />
                <button disabled={isLoading} onClick={signIn}>
                    {(isLoading) ? <Loader type="ThreeDots" color="#FFF"  /> : 'Log In' }
                </button>
                <SignUpLink disabled={isLoading} onClick={() => history.push('/sign-up')}>First time? Create an account!</SignUpLink>
            </LoginArea>
        </LoginPage>      
    )
}

const SignUpLink = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    color: #FFFFFF;
    text-decoration: underline;
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    text-underline-position: under;
    cursor: pointer;
`

const LoginPage = styled.div`
    width: 100%;
    height: 100%;
    background: #333333;
    
`

const Logo = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 65%;
    height: 100%;
    background: #151515;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
    color: #FFFFFF;
    padding: 0 0 150px 150px;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;
`
const Title = styled.div`
    font-family: 'Passion One', cursive;
    font-size: 106px;
    
`
const Subtitle = styled.div`
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    width: 55%;
`

const LoginArea = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 35%;
    background: #333333;
    padding: 0 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    input {
        background: ${props => (props.isLoading) ? '#DBDBDB' : '#FFFFFF'};
        width: 100%;
        height: 65px;
        margin-bottom: 15px;
        border: none;
        padding: 0 10px 5px 10px;
        border-radius: 6px;
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    input::placeholder{
        color: #9F9F9F;
        
    }
    button{
        background: #1877F2;
        width: 100%;
        height: 65px;
        border: none;
        border-radius: 6px;
        color: #FFFFFF;
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        margin-bottom: 25px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`