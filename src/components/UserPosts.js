import styled from 'styled-components';
import React, { useDebugValue } from 'react';
import Header from "./utils/Header";
import Post from "./utils/Post";
import { useContext } from 'react'
import UserContext from './contexts/UserContext'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Hashtags from "./Hashtags/Hashtags";
import { useHistory, useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner'

export default function UserPosts() {
    const { userInformation, setUserInformation, showMenu, setShowMenu } = useContext(UserContext);
    const [listPosts, setListPosts] = useState();
    const  idUser  = useParams();
    const [name, setName] = useState("");
    const [isError, setIsError] = useState(false);
    const history = useHistory();
    const [isFollow, setIsFollow] = useState(false);
    const [clickFollow, setClickFollow] = useState(false);

    function loadPosts(){
        if(!userInformation){
            return;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            }
        }
        const requestNome = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/"+ idUser.id, config);
        requestNome.then(resposta => setName(resposta.data.user.username));
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/" + idUser.id + "/posts", config);
        request.then(resposta => {
            setListPosts([...resposta.data.posts]);
        });
        request.catch(()=>setIsError(true));
    }

    useEffect(() => {
        loadPosts();
        const config = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            }
        }
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows", config);
        request.then(checkFollowed);
    }, []);


    function checkFollowed(resposta){
        for(let i=0; i<resposta.data.users.length; i++){
            if(resposta.data.users[i].id == idUser.id){
                setIsFollow(true);
            }
        }
        
    }

    function showPosts() {
        if(!userInformation){
            return;
        }
        if (listPosts != null) {
            return (
                    listPosts.map(item =>
                        <Post object={item} token={userInformation.token} id={userInformation.user.id}/>
                    )
            );
        }
        else if(isError === true){
            return(<Warning>There was an error, please refresh the page...</Warning>);
        }
        else if(listPosts == []){
            return(<Warning>No posts found</Warning>);
        }
        else{
            return(
                <Loading>Loading <Loader type="ThreeDots" color="#FFF" size="5em" /></Loading>   
              
            );
        }
    }
    if(!userInformation){
        history.push("/");
    }

    function publishFollow(){
        const config = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            }
        }


        if(isFollow == false){
            setClickFollow(true);
            const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/" + idUser.id + "/follow", {}, config);
            request.then(()=>{
                setClickFollow(false);
                setIsFollow(true);
                
            });
        }
        else{
            setClickFollow(true);
            const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/" + idUser.id + "/unfollow", {}, config);
            request.then(()=>{
                setClickFollow(false);
                setIsFollow(false);
            });
        }
        
        
    }

    return (
        <UserPostsPage onClick={() => {if(showMenu) setShowMenu(false)}}>
            <Header />
            <Title>{name+"'s posts"}
            <button disabled={clickFollow} onClick={publishFollow}>{(isFollow) ? <Unfollow>UnFollow</Unfollow> : <Follow>Follow</Follow>}</button>
            </Title>
            <Content>
            <Posts>
            {showPosts()}
            </Posts>

            { userInformation ?
            <Hashtags token={userInformation.token}/>
            : ''}
            </Content>
        </UserPostsPage>

    );

}

const UserPostsPage = styled.div`
    padding: 125px 20px 0 20px;
    margin: 0 auto;
    width: 70%;
    @media(max-width: 600px){
        width: 100%;
        padding: 125px 0px 0 0px;
    }
    
`

const Posts = styled.div`
    width: 65%;
    display: flex;
    flex-direction: column;
    @media(max-width: 600px){
        width: 100%;
    }
    
`

const Title = styled.div`
    width: 100%;
    color: #FFFFFF;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 43px;
    margin-bottom: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    @media(max-width: 600px){
        padding-left:20px;
    }
    button{
        background: none;
        border: none;
        cursor: pointer;
        font-family: Lato;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;
    }
`
const Unfollow = styled.div`
        width: 112px;
        height: 31px;
        border-radius: 5px;         
        background: #FFFFFF;
        color: #1877F2;
        display: flex;
        align-items: center;
        justify-content: center;
`;
const Follow = styled.div`
        width: 112px;
        height: 31px;
        border-radius: 5px;
        background: #1877F2;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const Loading = styled.div`
margin-left: 25%;
    color: #FFFFFF;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 43px;
`;

const Warning = styled.div`
    margin-left: 15%;
    color: #FFFFFF;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 35px;
`;