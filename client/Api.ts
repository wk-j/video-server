import axios from "axios"

export function getVideos() {
    var api = "/api/video/getVideos"
    return axios.get<Array<string>>(api)
}

export function newImage(image: string) {
    var api = "/api/video/newImage"
    return axios.post(api, { image: image })
}