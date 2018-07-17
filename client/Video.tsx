import styled from "styled-components";
import React, { RefObject } from "react"

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
        }, 10)
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
        context.drawImage(video, 0, 0, 220, 150);
        var dataURL = canvas.toDataURL();

        this.setState({
            currentImage: dataURL
        })
    }

    render() {
        let url = `${this.props.video}`
        return (
            <div>
                <canvas ref={this.updateCanvasRef}></canvas>
                <video controls onDurationChange={this.onDurationChange}
                    ref={this.updateVideoRef}
                    onTimeUpdate={this.onTimeUpdate}
                    src={url} autoPlay> </video>
                <img src="" />
            </div>
        )
    }
}
