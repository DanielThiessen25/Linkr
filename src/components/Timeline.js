import { useContext, useState } from 'react'
import UserContext from './contexts/UserContext'
import styled from 'styled-components'
import Header from './utils/Header'
import axios from 'axios'
import Post from "./utils/Post";
import { useEffect } from 'react';
import Hashtags from "./Hashtags/Hashtags";
import Loader from 'react-loader-spinner'


export default function Timeline(){
    const { userInformation, showMenu, setShowMenu } = useContext(UserContext)
    const avatar = (!!userInformation) ? userInformation.user.avatar : ''
    const [ newPostLink, setNewPostLink ] = useState('')
    const [ newPostComment, setNewPostComment ] = useState('')
    const [ isPublishing, setIsPublishing ] = useState(false)
    const [listPosts, setListPosts] = useState(null);
    const [isError, setIsError] = useState(false);

    const [followingUsers, setFollowingUsers] = useState([]);

    function getFollowingUsers(){
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows";
        const config = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            }
        }
        const requestFollowing = axios.get(url, config);
        requestFollowing.then((response)=>{
            setFollowingUsers(response.data.users);
        });
    }

    function loadPosts(){
        const config = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            }
        }
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts"
        const requisicao = axios.get(url, config);
        requisicao.then(resposta => {
            setListPosts([...resposta.data.posts]);
        });
        requisicao.catch(err =>{
            alert(err);
        })
    }

    useEffect(() => {
        loadPosts();
    }, []);

    function showPosts() {
        if (listPosts !== null && listPosts.length && listPosts.length === 0){
            return(<h2>Nenhuma publicação encontrada.</h2>);
        }
        if (listPosts !== null) {
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

    function publish(){
        if(newPostLink === ''){
            alert("Preencha o campo do link a ser postado")
            return
        }
        setIsPublishing(true)
        const body = { text: newPostComment , link: newPostLink }
        const config = {
            headers: {
                "Authorization": `Bearer ${userInformation.token}`
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

    return(
        <TimelinePage onClick={() => {if(showMenu) setShowMenu(false)}}>
            <Header/>
            <Title>timeline</Title>
            <Content>
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
                    {getFollowingUsers()}
                    {followingUsers.length === 0 ?
                    <h2>Você não segue ninguém ainda, procure por perfis na busca</h2>
                    : showPosts()}

                </Posts>
                <Hashtags token={userInformation.token}/>
            </Content>
              
        </TimelinePage>
    )
}

export const TimelinePage = styled.div`
    padding: 125px 20px 0 20px;
    margin: 0 auto;
    width: 70%;
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
`
export const Posts = styled.div`
    width: 65%;
    
`

const CreatePost = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    font-family: 'Lato', sans-serif;
`
const UserPicture = styled.div`
    padding: 18px 16px;
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

`
const CreatePostTitle = styled.div`
    font-weight: 300;
    font-size: 20px;
    color: #707070;
    margin-bottom: 15px;
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