import styled from "styled-components";
import React from "react"

type FrameProps = {
    video: string
}

const VideoContainer = styled.div`
    padding-top: 50px;
    display: flex;
    justify-content: center;
    flex-direction: row;
`

const VideoDiv = styled.div`
    flex-grow: 1;
`

export class Video extends React.Component<FrameProps, {}> {
    render() {
        let url = `api/video/getVideoContent?file=${this.props.video}`
        return (
            <VideoContainer>
                <video src={url}> </video>
            </VideoContainer>
        )
    }
}
