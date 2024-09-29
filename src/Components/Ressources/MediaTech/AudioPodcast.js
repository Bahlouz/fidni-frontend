import React from "react";
import Podcast from "./Podcast";
import AudioPage from "./AudioPage";

function AudioPodcast(){
    return(
        <div className="audioandpodcast">
            <Podcast />
            <AudioPage />
        </div>
    );
}
export default AudioPodcast;