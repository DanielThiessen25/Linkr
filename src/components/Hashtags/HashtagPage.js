import { useHistory, useParams } from "react-router";
import Header from "../utils/Header";
import { TimelinePage, Title, Content, Posts } from '../Timeline';
import Hashtags from "./Hashtags";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import Post from "../utils/Post";
import InfiniteScroll from 'react-infinite-scroller';
import { useHistory } from 'react-router-dom';

export default function HashtagPage(){
    const { hashtag } = useParams();
    const { userInformation, setUserInformation} = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [lastPost, setLastPost] = useState(0);
    const [isMore, setIsMore] = useState(true);
    const information = JSON.parse(localStorage.getItem("userInformation"));
    const history = useHistory();
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

    useEffect(() => {
        if(!!userInformation){
            setUserInformation(information)
        }

    },[])

    function getHashtagPosts(){
        if(!userInformation){
            return;
        }
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`;
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const requestPromise = axios.get(url, config);
        requestPromise.then((request)=>{
            setPosts(request.data.posts)
            setLastPost(request.data.posts[request.data.posts.length - 1].id)
        });
        requestPromise.catch(()=>{
            window.alert('Não foi possível carregar as hashtags')
        })
    }

    function loadMorePosts(){
        if(posts.length > 0 && isMore){
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts" + "?olderThan=" + lastPost
            const requisicao = axios.get(url, config);
            requisicao.then(resposta => {
                if(resposta.data.posts.length > 0){
                    setPosts([...resposta.data.posts]);
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



    if(!userInformation){
        history.push("/");
    }
    return(
        <TimelinePage>
            <Header/>
            <Title># {hashtag}</Title>
            <Content>
            <InfiniteScroll
                            pageStart={0}
                            hasMore={isMore}
                            loadMore={loadMorePosts}
                            threshold={0}>
                        <Posts>
                            {getHashtagPosts()}
                            {posts.length === 0 ?
                                <h2>Carregando posts dessa hashtag</h2>
                            :   posts.map((post)=>{
                                    return(
                                        <Post object={post}
                                        token={token}
                                        id={id}
                                        />
                                    );
                            })
                            }
                        </Posts>
                </InfiniteScroll>
                {userInformation ?
                <Hashtags token={userInformation.token}/>
                : ''}

            </Content>
        </TimelinePage>
    );
}

