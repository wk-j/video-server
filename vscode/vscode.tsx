import { hubConnection } from "./hub"
import React, { CSSProperties } from "react"
import ReactDom from "react-dom"

type State = {
    image: string
}

const style = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
} as CSSProperties

export class App extends React.Component<{}, State> {
    constructor(props) {
        super(props)

        this.state = { image: "" }

        hubConnection.on("newImage", image => {
            if (image) {
                var url = `${image}`
                this.setState({ image: url })
            }
        });
    }

    render() {
        return (
            <div style={style}>
                <img src={this.state.image} />
                <img src={this.state.image} />
                <img src={this.state.image} />
                <img src={this.state.image} />
                <img src={this.state.image} />
                <img src={this.state.image} />
                <img src={this.state.image} />
            </div>
        )
    }
}

var el = document.getElementById("root")

ReactDom.render(<App />, el)