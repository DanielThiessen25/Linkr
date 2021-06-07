import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function PossibleUser({user,token}){
    const history = useHistory();

    function goToUserPage(){
        history.push(`/user/${user.id}`)
    }

    return(
        <User key={user.id} onClick={goToUserPage} >
            <img src={user.avatar} />
            <UserName>{user.username}</UserName>
        </User> 
    )
}

const User = styled.div`
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
    img{
        height: 39px;
        width: 39px;
        border-radius: 50%;
        margin-right: 10px;
    }
`
const UserName = styled.div`
    color:#515151;
    margin-right: 8px;
`
