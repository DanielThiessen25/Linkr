import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Hashtags(props){
    const [hashtags, setHashtaghs] = useState([]);
    const [typedHash, setTypedHash] = useState("");
    const history = useHistory();

    useEffect(()=>{
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending";
        const config = {
            headers: {
                "Authorization": `Bearer ${props.token}`
            }
        }
        const requestPromise = axios.get(url, config);
        requestPromise.then((response)=>{
            setHashtaghs(response.data.hashtags);
            console.log(response.data);
        })
    }, []);

    function linkTypedHash(e){
        e.preventDefault();
        setTypedHash("");
        const hashTrim = typedHash.trim();
        if(hashTrim.length === 0){
            return;
        }
        const url = `/hashtag/${hashTrim}`;
        history.push(url);
    }

    return(
        <HashTagStyles>
            <Title>
                <h2>trending</h2>
            </Title>
            <Divider/>
            <HashLinks>
                {hashtags.map((hash, idx)=>{
                    return(
                        <li key={idx}>
                            <Link to={`/hashtag/${hash.name}`}># {hash.name}</Link>
                        </li>
                    );
                })}
            </HashLinks>
            <FormHashtag onSubmit={e => linkTypedHash(e)}>
                <HashtagTyped placeholder="type a hashtag"
                value={typedHash}
                onChange={e => setTypedHash(e.target.value)}
                />
                <FixedHash><h2>#</h2></FixedHash>
            </FormHashtag>
        </HashTagStyles>
    );
}

const HashTagStyles = styled.div`
    background: #171717;
    border-radius: 16px;
    width: 301px;
    height: 100%;
    margin-left: 20px;
    h2{
        font-family: 'Oswald', sans-serif;
        font-weight: bold;
        font-size: 27px;
        color: #FFFFFF;
    }
`;
const Title = styled.div`
    padding-left: 16px;
    padding-top: 9px;
    padding-bottom: 12px;
`;

const Divider = styled.div`
    width: 100%auto;
    height: 1px;
    background: #484848;
`;

const HashLinks = styled.ul`
    padding-left: 16px;
    padding-top: 22px;
    li{
        margin-bottom: 5px;
    }
    li a{
        font-family: 'Lato';
        font-weight: bold;
        font-size: 19px;
        color: #FFFFFF;
    }
`;

const HashtagTyped = styled.input`
    background: #252525;
    border: none;
    border-radius: 8px;
    width: 100%;
    height: 35px;
    padding-left: 24px;
    font-weight: bold;
    font-size: 19px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    &::placeholder{
        font-family: 'Lato';
        color: #575757;
        font-style: italic;
        font-weight: normal;
    }
`;

const FormHashtag = styled.form`
    margin-top: 15px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 15px;
    position: relative;
`;

const FixedHash = styled.div`
    position: absolute;
    top: 6px;
    left: 29px;
    h2{
        font-size: 19px;
    }
`;
