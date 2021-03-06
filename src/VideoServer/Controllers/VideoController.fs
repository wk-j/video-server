namespace VideoServer.Controllers

open System.IO
open Microsoft.AspNetCore.Mvc
open VideoServer.Finder
open Microsoft.AspNetCore.SignalR
open VideoServer.Hubs

type FileInfo = {
    Url: string
}

[<CLIMutable>]
type NewImageRequest = {
    Image: string
}

type Result = {
    Success:bool
}

[<Route("api/[controller]/[action]")>]
type VideoController(init: InitialData, hub: IHubContext<VideoHub>) =

    inherit ControllerBase()

    [<HttpPost>]
    member __.NewImage([<FromBody>]request: NewImageRequest) =
        HubFunctions.NewImage(hub.Clients, request.Image) |> ignore
        { Success = true }

    [<HttpGet>]
    member __.GetVideos() =

        let localVideos =
            DirectoryInfo(".").GetFiles("*.mp4",  SearchOption.AllDirectories)
            |> Array.map(fun x ->
                sprintf "/api/video/getVideoContent?file=%s" (System.Net.WebUtility.UrlEncode x.Name)
            )

        Array.append init.Urls localVideos

    [<HttpGet>]
    member this.GetVideoContent(file: string) =
        let u = System.Net.WebUtility.UrlDecode(file)

        let files = DirectoryInfo(".").GetFiles(u, SearchOption.AllDirectories)
        let video = files |> Array.tryHead

        match video with
        | Some v ->
            let fullName = v.FullName
            let stream = new System.IO.FileStream(fullName, FileMode.Open, FileAccess.Read)
            new FileStreamResult(stream, System.Net.Http.Headers.MediaTypeHeaderValue("video/mp4").MediaType)
                :> IActionResult
        | None  ->
            this.BadRequest() :> IActionResult