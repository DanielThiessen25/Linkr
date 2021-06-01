import styled from 'styled-components'
import { useState, useContext, useEffect } from 'react'
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
    
    useEffect(() => {
        checkIfLogged()
    })
    
    function checkIfLogged(){
        const userInformation = localStorage.getItem("userInformation")
        if(!!userInformation){
            setUserInformation(JSON.parse(userInformation))
            history.push('/timeline')
        }
    }

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
            localStorage.setItem("userInformation", JSON.stringify(reply.data))
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
    @media(max-width: 600px){
        font-size: 17px;
    }
`

const LoginPage = styled.div`
    width: 100%;
    height: 100%;
    background: #333333;
    display: flex;
    @media(max-width: 600px) {
        flex-direction: column;
    }
`

const Logo = styled.div`
    
    width: 65%;
    height: 100vh;
    background: #151515;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
    color: #FFFFFF;
    padding: 0 0 150px 150px;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;
    @media(max-width: 600px) {
        width: 100%;
        height: 175px;
        padding: 0 15%;
        align-items: center;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
`
const Title = styled.div`
    font-family: 'Passion One', cursive;
    font-size: 106px;
    letter-spacing: 0.05em;
    @media(max-width: 600px){
        font-size: 76px;
    }
`
const Subtitle = styled.div`
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    line-height: 64px;
    width: 55%;
    @media(max-width: 600px){
        font-size: 23px;
        width: 100%;
        text-align: center;
        line-height: 34px;
    }
`

const LoginArea = styled.div`
    
    height: 100vh;
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
    @media(max-width: 600px) {
        width: 100%;
        height: calc(100% - 175px);
        padding: 40px 25px 0 25px;
        button {
            font-size: 22px;
            height: 55px;
        }
        input {
            font-size: 22px;
            height: 55px;
        }
    }
`