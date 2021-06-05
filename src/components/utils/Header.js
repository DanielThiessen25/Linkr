import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import styled from 'styled-components'
import { IoChevronDown } from "react-icons/io5"
import { IconContext } from "react-icons"

export default function Header(){
    const { userInformation, setUserInformation, showMenu, setShowMenu } = useContext(UserContext)
    const avatar = (!!userInformation) ? userInformation.user.avatar : ''
    const history = useHistory()

    
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

    return(
        <Navbar onClick={() => {if(showMenu) setShowMenu(false)}}>
            <Logo>linkr</Logo>
            <DropdownMenu showMenu={showMenu} >
                <DropdownButton showMenu={showMenu} onClick={() => setShowMenu(true)} >
                    <IconContext.Provider value={{className: "react-icon"}}>
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
    z-index: 1;
`

const Logo = styled.div`
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    font-family: 'Passion One', cursive;
    color: #FFFFFF;
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
    .react-icon{
        color: #FFFFFF;
        font-size: 30px;
        margin-right: 18px;
        transition: transform .3s;
        transform: ${props => props.showMenu ? 'rotate(180deg)' : 'rotate(0deg)'};
    }
    @media(max-width: 600px){
        .react-icon{
            font-size: 20px;
        }
    }
    
`

