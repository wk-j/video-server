namespace VideoServer.Controllers

open System.IO
open Microsoft.AspNetCore.Mvc

type FileInfo = {
    Name: string
}

[<Route("api/[controller]/[action]")>]
type VideoController() =
    inherit ControllerBase()

    [<HttpGet>]
    member __.GetVideos() =
        let dir = new DirectoryInfo(".")
        let files = dir.GetFiles("*.mp4", SearchOption.AllDirectories)

        files |> Array.map(fun x ->
         { Name = x.Name }
        )

    [<HttpGet>]
    member this.GetVideoContent(file: string) =
        let u = System.Net.WebUtility.UrlDecode(file)
        printfn "-- %A" file
        printfn "-- %A" u

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

