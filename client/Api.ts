import axios from "axios"

export function getVideos() {
    var api = "/api/video/getVideos"
    return axios.get<Array<string>>(api)
}