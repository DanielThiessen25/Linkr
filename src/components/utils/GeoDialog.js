import styled from "styled-components"
import { EntirePage, DialogBox, LineControls } from "./LinkDialog";
import { IoClose } from 'react-icons/io5';
import GoogleMapReact from 'google-map-react';


export default function GeoDialog(props){
    const apiGoogleKey = 'AIzaSyBKaeTCA2-3SmNXKYQiDPBbNn3xsRXNPDY'
    return(
        <EntirePage>
            <DialogBox>
            <LineControls>
                <h2>{props.name}'s location</h2>
                <IoClose size={'25px'} color={'#FFFFFF'}
                    onClick={()=>props.setDialogState(false)}
                />
            </LineControls>
            <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${apiGoogleKey}&q=Space+Needle,Seattle+WA`}>
            </iframe>
            </DialogBox>
        </EntirePage>
    );
}

const mapStyles = {
    width: '100%',
    height: '100%',
};
