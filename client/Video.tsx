import styled from "styled-components";
import React, { RefObject } from "react"
import { newImage } from "./Api";

type FrameProps = {
    video: string
}

const VideoContainer = styled.div`
    /* display: flex; */
    /* justify-content: center; */
    /* flex-direction: column; */
    /* align-items: center; */
`

const V = styled.video`
    align-items: center;
    /* padding: 50px; */
`

const VideoDiv = styled.div`
    align-items: center;
    display:flex;
    flex-direction: row;
    justify-content: center;
`

type VideoState = {
    videoRef?: HTMLVideoElement
    canvasRef?: HTMLCanvasElement
    currentImage: string
}

export class Video extends React.Component<FrameProps, VideoState> {
    constructor(props) {
        super(props)
        this.state = {
            currentImage: "https://avatars2.githubusercontent.com/u/860704?s=460&v=4"
        }
        setInterval(() => {
            this.generateImage();
        }, 50)
    }

    onDurationChange = (e) => { }

    onTimeUpdate = (e) => { }

    updateVideoRef = (input) => {
        this.setState({
            videoRef: input
        })
    }
    updateCanvasRef = (input) => {
        this.setState({
            canvasRef: input
        })
    }

    generateImage() {
        var canvas = this.state.canvasRef
        var video = this.state.videoRef

        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, video.videoWidth / 5, video.videoHeight / 5)

        var dataURL = canvas.toDataURL();
        newImage(dataURL)
    }

    render() {
        let url = `${this.props.video}`
        return (
            <VideoDiv>
                <canvas ref={this.updateCanvasRef}></canvas>
                <video controls onDurationChange={this.onDurationChange}
                    ref={this.updateVideoRef}
                    onTimeUpdate={this.onTimeUpdate}
                    src={url} autoPlay> </video>
            </VideoDiv>
        )
    }
}
