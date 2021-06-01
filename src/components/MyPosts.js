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
    const [user, setUser] = useState();
    const [listPosts, setListPosts] = useState();
    const [token, setToken] = useState();


    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            }
        }
        const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/" + userInformation.user.id + "/posts", config);
        requisicao.then(resposta => {
            setListPosts(resposta.data.posts);
        });
    }, []);

    function showPosts() {
        if (listPosts != null) {
            console.log(listPosts);
            return (
                    listPosts.map(item =>
                        <Post object={item} token={userInformation.token} />
                    )
            );
        }
    }

    return (
        <Screen>
            <Header></Header>
            <Content>
                <PageName>my posts</PageName>
                <ContainerPosts></ContainerPosts>
                {showPosts()}

            </Content>

        </Screen>

    );

}

const Screen = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display:flex;
    flex-direction: column;
    align-items: center;
`;

const PageName = styled.div`
    margin-top: 53px;
    font-family: Oswald;
    font-style: normal;
    font-weight: bold;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
     
`;

const Content = styled.div`
    width: 70%;
    position: fixed;
    top: 72px;

    
`;

const ContainerPosts = styled.div`
    margin-top: 42px;

`;