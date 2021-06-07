import styled from 'styled-components';
import React, { useDebugValue } from 'react';
import Header from "./utils/Header";
import Post from "./utils/Post";
import { useContext } from 'react'
import UserContext from './contexts/UserContext'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Hashtags from "./Hashtags/Hashtags";
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner'

export default function MyPosts() {
    const { userInformation, setUserInformation, showMenu, setShowMenu } = useContext(UserContext);
    const [listPosts, setListPosts] = useState();
    const history = useHistory();
    const [lastPost, setLastPost] = useState(0);
    const [isMore, setIsMore] = useState(true);
    const information = JSON.parse(localStorage.getItem("userInformation"));
    const [isError, setIsError] = useState(false);
    let token, id;


    checkIfLogged();
    function checkIfLogged(){
        if(!!information){
            token = information.token
            id = information.user.id
            
        } else {
            history.push("/")
            
        }
    }
    

    function loadPosts(){
        if(!userInformation){
            return;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/" + userInformation.user.id + "/posts", config);
        request.then(resposta => {
            setListPosts([...resposta.data.posts]);
            setLastPost(lastPost + 5)
        });
        request.catch(()=>setIsError(true));
    }

    function loadMorePosts(){
        if(!!listPosts && isMore){
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts" + "?offset=" + lastPost
            const requisicao = axios.get(url, config);
            requisicao.then(resposta => {
                if(resposta.data.posts.length > 0){
                    setListPosts([...resposta.data.posts]);
                    setLastPost(lastPost + 5)
                }
                else{
                    setIsMore(false)
                }
            });
            requisicao.catch(err =>{
                alert(err);
            })
        }
        
    }

    useEffect(() => {
        if(!!information){
            setUserInformation(information)
        }
        loadPosts();
    }, []);

    function showPosts() {
        if (listPosts != null) {
            return (
                    listPosts.map(item =>
                        <Post object={item} key={item.id} token={token} id={id} listPosts={listPosts} setListPosts={setListPosts} userId={id} />
                    )
            );
        }
        else if(listPosts == []){
            return(<Warning>No posts found</Warning>);
        }
        else if(isError === true){
            return(<Warning>There was an error, please refresh the page...</Warning>);
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
    return (
        <MyPostsPage onClick={() => {if(showMenu) setShowMenu(false)}}>
            <Header />
            <Title>my posts</Title>
            <Content>
                <Posts>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={isMore}
                        loadMore={loadMorePosts}
                        threshold={0}>
                            {showPosts()}                    
                    </InfiniteScroll>
                </Posts>

            { userInformation ? 
            <Hashtags token={userInformation.token}/>
            : '' }
            </Content>

        </MyPostsPage>

    );

}

const MyPostsPage = styled.div`
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
    @media(max-width: 600px){
        padding-left:20px;
    }
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