import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

export default function FollowingUser({user}){
    const history = useHistory();

    function goToUserPage(){
        history.push(`/user/${user.id}`)
    }
    return(
        <User key={user.id} onClick={goToUserPage} >
            <img src={user.avatar} />
            <UserName>{user.username}</UserName>
            <IsFollowing>
                <Dot/>
                Following
            </IsFollowing>
        </User> 
    )
}

const User = styled.div`
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
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
const IsFollowing = styled.div`
    color:#c5c5c5;
    display: flex;
    align-items: center;
    font-size: 16px;
`
const Dot = styled.div`
    width: 6px;
    height: 6px;
    border-radius:  50%;
    background-color: #c5c5c5;
    margin-right: 8px;
    margin-top: 3px;
`