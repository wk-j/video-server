import { hubConnection } from "./hub"
import React from "react"
import ReactDom from "react-dom"

type State = {
    image: string
}

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
            <div>
                <img src={this.state.image} />
                {/* <div style={{ backgroundSize: "cover", width: "500px", height: "500px", backgroundImage: `url(${this.state.image})` }}>A</div> */}
            </div>
        )
    }
}

var el = document.getElementById("root")

ReactDom.render(<App />, el)