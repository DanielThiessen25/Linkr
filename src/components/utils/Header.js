import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import styled from 'styled-components';
import { IoChevronDown, IoSearch } from "react-icons/io5";
import { IconContext } from "react-icons";
import {DebounceInput} from 'react-debounce-input';
import axios from 'axios';
import FollowingUser from './FollowingUser';
import PossibleUser from './PossibleUser';



export default function Header(){
    const { userInformation, setUserInformation, showMenu, setShowMenu, followingUsers, setFollowingUsers } = useContext(UserContext);
    const avatar = (!!userInformation) ? userInformation.user.avatar : '';
    const history = useHistory();
    const [ userSearchName, setUserSearchName ] = useState('');
    const [ possibleUsers, setPossibleUsers ] = useState([]);
    const [ alreadyFollowing, setAlreadyFollowing ] = useState([]);
    

    function logout(){
        setUserInformation(null)
        localStorage.removeItem("userInformation")
        history.push("/")
    }
    
    function goToMyPosts(){
        setShowMenu(false)
        history.push('/my-posts')
    }

    function goToMyLikes(){
        setShowMenu(false)
        history.push('/my-likes')
    }

    function searchForUsers(event){
        const searchedName = event.target.value;
        setUserSearchName(searchedName);
        const config = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            }
        }
        if(searchedName.length > 2){
            const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search?username=${searchedName}`, config);
            request.then((reply) => {
                console.log(reply.data)
                console.log(followingUsers)
                console.log(reply.data.users.filter(user => user.isFollowingLoggedUser === true))
                setAlreadyFollowing([...reply.data.users.filter(user => user.isFollowingLoggedUser === true)])
                setPossibleUsers([...reply.data.users.filter(user => user.isFollowingLoggedUser === false)])
            });
        }
    }

    function showFollowingUsers(){
        return(
                alreadyFollowing.map(user => 
                    <FollowingUser user={user} />    
                )
        )
    }


    function showPossibleUsers(){
        return(
            possibleUsers.map(user => 
                <PossibleUser user={user} token={userInformation.token} />    
            )
        )
    }

    
    return(
        <Navbar onClick={() => {if(showMenu) setShowMenu(false)}}>
            <Logo onClick={() => history.push('/timeline')}>linkr</Logo>
            <DropdownMenu showMenu={showMenu} >
                <DropdownButton showMenu={showMenu} onClick={() => setShowMenu(true)} >
                    <IconContext.Provider value={{className: "set-icon"}}>
                        <IoChevronDown />
                    </IconContext.Provider>
                </DropdownButton>
                <img className="user-picture" alt="user" src={avatar} onClick={() => setShowMenu(true)} />
                <ul className="dropdown-content">
                    <li onClick={goToMyPosts}>My posts</li>
                    <li onClick={goToMyLikes}>My likes</li>
                    <li onClick={logout}>Logout</li>
                </ul>
            </DropdownMenu>
            <UserSearcher>
                <DebounceInput 
                        type="text"
                        placeholder="Search for people and friends"
                        className="input"
                        minLength={3}
                        debounceTimeout={300}
                        value={userSearchName}
                        onChange={searchForUsers} />
                {(userSearchName.length > 2) ?
                <SearchResults>
                    {showFollowingUsers()}
                    {showPossibleUsers()}
                </SearchResults>
                :
                ''
                }
                
                <IconContext.Provider value={{className: "search-icon"}}>
                    <IoSearch />
                </IconContext.Provider>
            </UserSearcher>
        </Navbar>
        
    )
}

const Navbar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background: #151515;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 100;
`

const Logo = styled.div`
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    font-family: 'Passion One', cursive;
    color: #FFFFFF;
    cursor: pointer;
    @media(max-width: 600px){
        font-size: 45px;
        line-height: 50px;
    }
`
const DropdownMenu = styled.div`
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
    img {
        height: 53px;
        width: 53px;
        border-radius: 50%;
        cursor: pointer;
    }
    .dropdown-content {
        display: ${props => props.showMenu ? 'flex' : 'none'};
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 100%;
        background-color: #171717;
        width: 150px;
        border-radius: 0px 0px 20px 20px;
        color: #FFFFFF;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        font-family: 'Lato', sans-serif;
        padding: 20px 0 10px 0;
        animation: growDown .5s ease-in-out forwards;
        transform-origin: top center;
    }
    @keyframes growDown {
        0% {
          transform: scaleY(0)
        }
        80% {
          transform: scaleY(1.1)
        }
        100% {
          transform: scaleY(1)
        }
      }

    .dropdown-content li{
        margin: 0 25px 10px 0;
        cursor: pointer;
    }
    @media(max-width: 600px){
        img {
            width: 44px;
            height: 44px;
        }
        .dropdown-content{
            font-size: 15px;
            line-height: 18px;
        }
        .dropdown-content li{
            margin-right: 45px;  
        }
    }
    
`
const DropdownButton = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    .set-icon{
        color: #FFFFFF;
        font-size: 30px;
        margin-right: 18px;
        transition: transform .3s;
        transform: ${props => props.showMenu ? 'rotate(180deg)' : 'rotate(0deg)'};
    }
    @media(max-width: 600px){
        .set-icon{
            font-size: 20px;
        }
    }
    
`
const UserSearcher = styled.div`
    position: absolute;
    width: 40%;
    top: 10px;
    left: calc(30%);
    border-radius: 8px;
    background-color: #e7e7e7;
    .input{
        width: 100%;
        height: 45px;
        background-color: #FFFFFF;
        border-radius: inherit;
        border: none;
        font-family: 'Lato', sans-serif;
        font-size: 19px;
        font-weight: 400;
        padding: 0 15px;  
    }
    .input::placeholder{
        color: #C6C6C6;
    }
    .search-icon{
        width: 21px;
        height: 21px;
        position: absolute;
        top: calc(45px/2 - 21px/2);
        right: 15px;
        color: #c6c6c6;
    }
`
const SearchResults = styled.div`
    width: 100%;
    background-color: #e7e7e7;   
    border-radius: inherit;
    padding: 10px 10px 0 10px;
`
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