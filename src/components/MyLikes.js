import styled from 'styled-components';
import React, { useDebugValue } from 'react';
import Header from "./utils/Header";
import Post from "./utils/Post";
import { useContext } from 'react'
import UserContext from './contexts/UserContext'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Hashtags from "./Hashtags/Hashtags";
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router';


export default function MyLikes() {
    const { userInformation, setUserInformation, showMenu, setShowMenu } = useContext(UserContext);
    const [listPosts, setListPosts] = useState();
    const [isError, setIsError] = useState(false);
    const history = useHistory();

    function loadPosts(){
        if(!userInformation){
            return;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            }
        }
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked", config);
        request.then(resposta => {
            setListPosts([...resposta.data.posts]);
        });
        request.catch(()=>setIsError(true));
    }

    useEffect(() => {
        loadPosts();
    }, []);


    if(!userInformation){
        history.push("/");
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

    return (
        <TimelinePage onClick={() => {if(showMenu) setShowMenu(false)}}>
            <Header />
            <Title>my likes</Title>
            <Content>
            <Posts>
            {showPosts()}
            </Posts>
            
            {userInformation ?
            <Hashtags token={userInformation.token}/>
            : ''}
            </Content>

        </TimelinePage>

    );

}

const TimelinePage = styled.div`
    padding: 125px 20px 0 20px;
    margin: 0 auto;
    width: 70%;
`

const Posts = styled.div`
    width: 65%;
    display: flex;
    flex-direction: column;
    
`

const Title = styled.div`
    width: 100%;
    color: #FFFFFF;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 43px;
    margin-bottom: 45px;
`

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