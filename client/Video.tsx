import styled from "styled-components";
import React from "react"

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

export class Video extends React.Component<FrameProps, {}> {
    render() {
        let url = `api/video/getVideoContent?file=${encodeURI(this.props.video)}`
        return (
            <V src={url} autoPlay> </V>
        )
    }
}
