import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import styled from 'styled-components';
import Header from './utils/Header';
import axios from 'axios';
import Post from "./utils/Post";
import { useEffect } from 'react';
import Hashtags from "./Hashtags/Hashtags";
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner'

import useInterval from 'react-useinterval'
import { useHistory } from 'react-router'

export default function Timeline(){
    const { userInformation, setUserInformation , showMenu, setShowMenu, followingUsers, setFollowingUsers } = useContext(UserContext)
    const avatar = (!!userInformation) ? userInformation.user.avatar : ''
    const [ newPostLink, setNewPostLink ] = useState('')
    const [ newPostComment, setNewPostComment ] = useState('')
    const [ isPublishing, setIsPublishing ] = useState(false)
    const [listPosts, setListPosts] = useState(null);
    const [lastPost, setLastPost] = useState(0);
    const [isMore, setIsMore] = useState(true);
    const history = useHistory()
    const information = JSON.parse(localStorage.getItem("userInformation"));
    let token, id;
    const [isError, setIsError] = useState(false);
    const history = useHistory();

    checkIfLogged();
    function checkIfLogged(){
        if(!!information){
            token = information.token
            id = information.user.id
            
        } else {
            history.push("/")
            
        }
    }

    function getFollowingUsers(){
        if(!userInformation){
            return;
        }
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestFollowing = axios.get(url, config);
        requestFollowing.then((response)=>{
            setFollowingUsers(response.data.users);
        });
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
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts"
        const requisicao = axios.get(url, config);
        requisicao.then(resposta => {
            if(resposta.data.posts.length > 0){
                setListPosts([...resposta.data.posts]);
                setLastPost(resposta.data.posts[resposta.data.posts.length - 1].id)
            }
            else{
                setIsMore(false)
            }
        });
        requisicao.catch(err =>{
            alert(err);
        })
    }

    function loadMorePosts(){
        if(!!listPosts && isMore){
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts" + "?olderThan=" + lastPost
            const requisicao = axios.get(url, config);
            requisicao.then(resposta => {
                if(resposta.data.posts.length > 0){
                    setListPosts([...resposta.data.posts]);
                    setLastPost(resposta.data.posts[resposta.data.posts.length - 1].id)
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
    useInterval(loadPosts, 15000, 15000)

    useEffect(() => {
        if(!!information){
            setUserInformation(information)
        }
        loadPosts();
    }, []);

    function showPosts() {
        if (listPosts !== null && listPosts.length && listPosts.length === 0){
            return(<h2>Você não segue ninguém ainda, procure alguém na busca</h2>);
        }
        if (listPosts !== null) {
            return (
                    listPosts.map((item,i) =>
                        <Post object={item} token={token} id={id} key={i} />
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

    function publish(){
        if(newPostLink === ''){
            alert("Preencha o campo do link a ser postado")
            return
        }
        setIsPublishing(true)
        const body = { text: newPostComment , link: newPostLink }
        const config = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            } 
        }
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts", body, config)
        request.then(reply => {
            alert("post publicado com sucesso!")
            setIsPublishing(false)
            setNewPostLink('')
            setNewPostComment('')
        })
        request.catch(() => {
            alert("Houve um erro ao publicar seu link")
            setIsPublishing(false)
        })
    }

    if(!userInformation){
        history.push("/");
    }


    return(
        <TimelinePage onClick={() => {if(showMenu) setShowMenu(false)}}  >
            <Header />
            <Title>timeline</Title>
            <Content >
                <Posts>
                    <CreatePost>
                        <UserPicture>
                            <img src={avatar} alt=""/> 
                        </UserPicture>
                        <NewPostInformations>
                            <CreatePostTitle>O que você tem pra favoritar hoje?</CreatePostTitle>
                            <input disabled={isPublishing} className="link" type="text" placeholder="http://..." value={newPostLink} onChange={e => setNewPostLink(e.target.value)} />
                            <textarea disabled={isPublishing} className="comment" placeholder="Muito irado esse link falando de #javascript" value={newPostComment} onChange={e => setNewPostComment(e.target.value)} />
                            <button disabled={isPublishing} onClick={publish} >{isPublishing ? 'Publicando' : 'Publicar'}</button>
                        </NewPostInformations>
                    </CreatePost>
                    <InfiniteScroll
                            pageStart={0}
                            hasMore={isMore}
                            loadMore={loadMorePosts}
                            threshold={0}>
                            
                                {getFollowingUsers()}
                                {followingUsers.length === 0 ?
                                <h2>Você não segue ninguém ainda, procure por perfis na busca</h2>
                                : showPosts()}

                    </InfiniteScroll>
                    

                </Posts>
                {userInformation ? 
                <Hashtags token={userInformation.token}/>
                : ''}
            </Content>
              
        </TimelinePage>
    )
}

export const TimelinePage = styled.div`
    padding: 125px 20px 0 20px;
    margin: 0 auto;
    width: 70%;
    @media(max-width: 600px){
        width: 100%;
        padding: 125px 0px 0 0px;
    }
`
export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    
`

export const Title = styled.div`
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
export const Posts = styled.div`
    width: 65%;
    color: #FFFFFF;

    h2{
        color: #ffffff;
    }

    @media(max-width: 600px){
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        h2{
            width: 80%;
        }
    }


`

const CreatePost = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    font-family: 'Lato', sans-serif;
    @media(max-width: 600px){
        width: 100%;
        border-radius: 0px;
        flex-direction: column;
        align-items: center;
    }
    
`
const UserPicture = styled.div`
    padding: 18px 16px;
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    @media(max-width: 600px){
        display: none;
    }

`
const CreatePostTitle = styled.div`
    font-weight: 300;
    font-size: 20px;
    color: #707070;
    margin-bottom: 15px;
    @media(max-width: 600px){
        text-align: center;
    }
    
`
const NewPostInformations = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 20px 16px 0;
    
    .link {
        height: 30px;
        background: #EFEFEF;
        border-radius: 5px;
        border: none;
        margin-bottom: 5px;
        width: 100%;
        padding: 8px;
    }
    .link::placeholder{
        font-weight: 300;
        font-size: 15px;
        color: #949494;
    }
    .comment {
        height: 66px;
        background: #EFEFEF;
        border-radius: 5px;
        border: none;
        margin-bottom: 5px;
        width: 100%;
        resize: none;
        padding: 8px;
    }
    .comment::placeholder{
        font-weight: 300;
        font-size: 15px;
        color: #949494;
    }
    button {
        width: 112px;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;
        border: none;
        margin-left: calc(100% - 112px);
        font-weight: bold;
        font-size: 14px;
        color: #FFFFFF;
        cursor: pointer;
    }


    @media(max-width: 600px){
        width: 90%;
        flex-direction: column;
        align-items: center;
        padding:20px 0px 16px 0px;
    }
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