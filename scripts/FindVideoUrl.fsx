open System.Diagnostics

let ps = new Process()

let info = ProcessStartInfo()
info.FileName <- "yturl"
info.Arguments <- sprintf "%s -q high" "https://www.youtube.com/watch?v=mIxlvVlOIS0"
info.UseShellExecute <- false
info.RedirectStandardOutput <- true

ps.StartInfo <- info

ps.Start()
ps.WaitForExit()

let rs = ps.StandardOutput.ReadToEnd()
printfn "(%A)" rs