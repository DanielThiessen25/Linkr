import styled from 'styled-components';
import React, { useDebugValue } from 'react';
import Header from "./utils/Header";
import Post from "./utils/Post";
import { useContext } from 'react'
import UserContext from './contexts/UserContext'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyPosts() {
    const { userInformation, setUserInformation, showMenu, setShowMenu } = useContext(UserContext);
    const contaTeste = {
        email: "email@dominio.com",
        password: "senha_super_hiper_ultra_secreta"
    };
    const [listPosts, setListPosts] = useState();

    function loadPosts(){
        const config = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            }
        }
        const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/" + userInformation.user.id + "/posts", config);
        requisicao.then(resposta => {
            setListPosts([...resposta.data.posts]);
        });
    }

    useEffect(() => {
        loadPosts();
    }, []);

    function showPosts() {
        if (listPosts != null) {
            return (
                    listPosts.map(item =>
                        <Post object={item} token={userInformation.token} id={userInformation.user.id}/>
                    )
            );
        }
    }

    return (
        <TimelinePage onClick={() => {if(showMenu) setShowMenu(false)}}>
            <Header />
            <Title>my posts</Title>
            <Content>
            <Posts>
            {showPosts()}
            </Posts>
            

            <TrendingHashtags>
                    <Trending>trending</Trending>
                    <Hashtags>
                        <Hashtag># javascript</Hashtag>
                        <Hashtag># react</Hashtag>
                        <Hashtag># react-native</Hashtag>
                        <Hashtag># material</Hashtag>
                        <Hashtag># web-dev</Hashtag>
                        <Hashtag># mobile</Hashtag>
                        <Hashtag># css</Hashtag>
                        <Hashtag># html</Hashtag>
                        <Hashtag># node</Hashtag>
                        <Hashtag># sql</Hashtag>
                    </Hashtags>
                </TrendingHashtags>
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

const TrendingHashtags = styled.div`
    width: 32%;
    height: 100%;
    background-color: #171717;
    border-radius: 16px;
` 
const Trending = styled.div`
    width: 100%;
    color: #FFFFFF;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 27px;
    border-bottom: 1px solid #484848;
    padding: 15px;
`
const Hashtags = styled.div`
    width: 100%;
    padding: 22px 15px;
    font-weight: bold;
    font-size: 19px;
    font-family: 'Lato', sans-serif;
    color: #FFFFFF;
    letter-spacing: 0.05em;

`
const Hashtag = styled.div`

`