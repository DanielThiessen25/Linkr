import { useContext, useState } from 'react'
import UserContext from './contexts/UserContext'
import styled from 'styled-components'
import Header from './utils/Header'
import axios from 'axios'
import Post from "./utils/Post";
import { useEffect } from 'react';

export default function Timeline(){
    const { userInformation, showMenu, setShowMenu } = useContext(UserContext)
    const avatar = (!!userInformation) ? userInformation.user.avatar : ''
    const [ newPostLink, setNewPostLink ] = useState('')
    const [ newPostComment, setNewPostComment ] = useState('')
    const [ isPublishing, setIsPublishing ] = useState(false)
    const [listPosts, setListPosts] = useState();

    function loadPosts(){

        const config = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            }
        }
        const requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts", config);
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
                    
                    {showPosts()}

                </Posts>
                <Hashtags token={userInformation.token}/>
            </Content>
              
        </TimelinePage>
    )
}

const TimelinePage = styled.div`
    padding: 125px 20px 0 20px;
    margin: 0 auto;
    width: 70%;
`
const Content = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const Title = styled.div`
    width: 100%;
    color: #FFFFFF;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 43px;
    margin-bottom: 45px;
`
const Posts = styled.div`
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