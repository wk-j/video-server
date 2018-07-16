import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { Video } from "./Video"
import { getVideos } from "./Api"

import "./Style.css"

type AppState = {
    videos: string[]
    currentVideo: string
}

const AppDiv = styled.div`
    height: 100%;
    display:flex;
    /* padding: 50px; */
    flex-direction: column;
    /* background: green; */
`

const Grow = styled.div`
    flex-grow: 1;
`

class App extends React.Component<{}, AppState> {

    constructor(props) {
        super(props)
        this.state = {
            videos: [],
            currentVideo: ""
        }

        document.body.addEventListener("keydown", ev => {
            if (ev.keyCode === 39) {
            }
        });
    }

    next = (e) => {
        var current = this.state.currentVideo
        var videos = this.state.videos
        var index = videos.findIndex(x => x === current)
        var newIndex = (index + 1) % videos.length
        var newVideo = videos[newIndex]
        this.setState({
            currentVideo: newVideo
        })
        console.log(newVideo)
    }

    componentDidMount() {
        var request = getVideos()
        request.then(data => {
            var videos = data.data;
            this.setState({
                videos: videos,
                currentVideo: data.data.length > 0 ? videos[0] : ""
            })
        })
    }

    render() {
        return (
            <AppDiv onClick={this.next}>
                <Grow></Grow>
                {this.state.currentVideo
                    ? <Video video={this.state.currentVideo} />
                    : <h1></h1>
                }
                <Grow></Grow>
            </AppDiv>
        )
    }
}

var root = document.getElementById("root")
ReactDOM.render(<App />, root)