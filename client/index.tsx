import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { Video } from "./Video"
import { getVideos } from "./Api";

type AppState = {
    videos: { name: string }[]
    currentVideo: string
}

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
        var index = videos.findIndex(x => x.name === current)
        var newIndex = index + 1 % videos.length
        var newVideo = videos[newIndex].name
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
                currentVideo: data.data.length > 0 ? videos[0].name : ""
            })
        })
    }

    render() {
        return (
            <div onClick={this.next}>
                <Video video={this.state.currentVideo} />
            </div>
        )
    }
}

var root = document.getElementById("root")
ReactDOM.render(<App />, root)