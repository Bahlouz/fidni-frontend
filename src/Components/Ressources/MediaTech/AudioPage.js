import React from "react";
import Audio from "./Audio";
import "./audio.css"
import { Container,Row,Col } from "react-bootstrap";
function AudioPage(){
    return(
            <div>
            <Container className="mt-4">
            </Container>
                <Container fluid className="p-0 audio-list">
                 <Audio /> 
    </Container>
    </div>
    );
}
export default AudioPage;