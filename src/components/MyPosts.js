import styled from 'styled-components';
import React, { useDebugValue } from 'react';
import Header from "./utils/Header";
import Post from "./utils/Post";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyPosts() {
   
    const contaTeste = {
        email: "email@dominio.com",
        password: "senha_super_hiper_ultra_secreta"
    };
    const [user, setUser] = useState();
    const [listaPosts, setListaPosts] = useState();
    const [token, setToken] = useState();


    useEffect(() => {
        const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in", contaTeste);
        requisicao.then(resposta => {
            setUser(resposta.data);
            setToken(resposta.data.token);
            alert(resposta.data.token);
            loadPosts(resposta.data.token);
        });
    }, []);

  

    function loadPosts(myToken) {
        const config = {
            headers: {
                Authorization: "Bearer " + myToken
            }
        }
        const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/" + 1 + "/posts", config);

        requisicao.then(resposta => {
            setListaPosts(resposta.data.posts);
        });
    }

    function showPosts() {
        if (listaPosts != null) {
            console.log(listaPosts);
            return (
                    listaPosts.map(item =>
                        <Post object={item} token={token} />
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