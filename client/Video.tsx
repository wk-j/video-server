import styled from "styled-components";
import React, { RefObject } from "react"
import { newImage } from "./Api";

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

type FrameProps = {
    video: string
}

type VideoState = {
    videoRef?: HTMLVideoElement
    canvasRef?: HTMLCanvasElement
    playing: boolean
}

export class Video extends React.Component<FrameProps, VideoState> {
    constructor(props) {
        super(props)
        this.state = {
            playing: false
        }
        setInterval(() => {
            if (this.state.playing) {
                this.generateImage();
            }
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

    onPlaying = (e) => {
        this.setState({
            playing: true
        })
    }

    onPause = (e) => {
        this.setState({
            playing: false
        })
    }

    render() {
        let url = `${this.props.video}`
        return (
            <VideoDiv>
                <canvas ref={this.updateCanvasRef}></canvas>
                <video onPause={this.onPause} onPlaying={this.onPlaying} controls onDurationChange={this.onDurationChange}
                    ref={this.updateVideoRef}
                    onTimeUpdate={this.onTimeUpdate}
                    src={url} autoPlay> </video>
            </VideoDiv>
        )
    }
}
