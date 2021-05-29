import styled from 'styled-components'
import { useState } from 'react'
import { useHistory } from 'react-router'
import Loader from 'react-loader-spinner'
import axios from 'axios'

export default function SignUp(){
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ picture, setPicture ] = useState('')
    const [ isLoading, setLoading ] = useState(false)
    const history = useHistory()

    function signUp(){
        if( email === "" || password === "" || username === "" || picture === ""){
            alert("preencha todos os campos")
            return
        }
        setLoading(true)
        const body = { email, password, username, pictureUrl: picture}
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up", body)
        request.then(reply => {
            console.log(reply.data)
            history.push("/")
        })
        request.catch(() => {
            alert("o email já foi cadastrado")
            setLoading(false)
        })
    }

    return(
        <SignUpPage>
            <Logo>
                <Title>linkr</Title>
                <Subtitle>save, share and discover the best links on the web</Subtitle>
            </Logo>
            <SignUpArea isLoading={isLoading}>
                <input disabled={isLoading} type="text" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)} onKeyPress={e => {if(e.key === 'Enter') signUp()}} />
                <input disabled={isLoading} type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} onKeyPress={e => {if(e.key === 'Enter') signUp()}} />
                <input disabled={isLoading} type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} onKeyPress={e => {if(e.key === 'Enter') signUp()}} />
                <input disabled={isLoading} type="text" placeholder="picture url" value={picture} onChange={e => setPicture(e.target.value)} onKeyPress={e => {if(e.key === 'Enter') signUp()}} />
                <button disabled={isLoading} onClick={signUp}>
                    {(isLoading) ? <Loader type="ThreeDots" color="#FFF"  /> : 'Sign Up' }
                </button>
                <LoginLink disabled={isLoading} onClick={() => history.push('/')}>Switch back to log in</LoginLink>
            </SignUpArea>
        </SignUpPage>
    )
}

const LoginLink = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    color: #FFFFFF;
    text-decoration-line: underline;
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    text-underline-position: under;
    cursor: pointer;
`

const SignUpPage = styled.div`
    width: 100%;
    height: 100%;
    
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
const SignUpArea = styled.div`
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