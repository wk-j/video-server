module VideoServer.Finder

open System.IO
open System.Diagnostics

type UrlFinder() =

    static member FindYoutubeUrls(path) =
        let dir = DirectoryInfo(path: string)
        let files = dir.GetFiles("*.youtube", SearchOption.AllDirectories)
        files |> Array.map (fun x ->
            File.ReadAllLines(x.FullName)
            |> Array.map (fun x -> x.Trim())
            |> Array.filter(System.String.IsNullOrEmpty >> not)
        )
        |> Array.collect(id)

    static member ConvertToVideoUrl(youtube: string) =
        let info = ProcessStartInfo()
        info.FileName <- "yturl"
        info.Arguments <- sprintf "%s -q high" youtube
        info.UseShellExecute <- false
        info.RedirectStandardOutput <- true

        let ps = new Process()
        ps.StartInfo <- info
        ps.Start() |> ignore
        ps.WaitForExit()

        let videoUrl = ps.StandardOutput.ReadToEnd()
        printfn "-- %s" videoUrl

        videoUrl


type InitialData = {
    Urls: string[]
}
