import styled from 'styled-components';
import React, { useDebugValue } from 'react';
import Header from "./utils/Header";
import Post from "./utils/Post";
import { useContext } from 'react'
import UserContext from './contexts/UserContext'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Hashtags from "./Hashtags/Hashtags";

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
            

            <Hashtags token={userInformation.token}/>
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

