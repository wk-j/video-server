#addin "wk.StartProcess"

using PS = StartProcess.Processor;

Task("Start").Does(() => {
    PS.StartProcess("parcel --no-cache -d src/VideoServer/wwwroot/ --public-url / client/index.html");
});

var target = Argument("target", "Start");
RunTarget(target);