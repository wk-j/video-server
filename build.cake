#addin "wk.StartProcess"
#addin "wk.ProjectParser"

using PS = StartProcess.Processor;
using ProjectParser;

var npi = EnvironmentVariable("npi");
var name = "VideoServer";

var currentDir = new DirectoryInfo(".").FullName;
var info = Parser.Parse($"src/{name}/{name}.fsproj");

Task("Pack").Does(() => {
    // CleanDirectory($"src/{name}/wwwroot");
    CleanDirectory("publish");
    DotNetCorePack($"src/{name}", new DotNetCorePackSettings {
        OutputDirectory = "publish"
    });
});

Task("Publish-NuGet")
    .IsDependentOn("Pack")
    .Does(() => {
        var nupkg = new DirectoryInfo("publish").GetFiles("*.nupkg").LastOrDefault();
        var package = nupkg.FullName;
        NuGetPush(package, new NuGetPushSettings {
            Source = "https://www.nuget.org/api/v2/package",
            ApiKey = npi
        });
});

Task("Install")
    .IsDependentOn("Build")
    .IsDependentOn("Pack")
    .Does(() => {
        var home = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        PS.StartProcess($"dotnet tool uninstall -g {info.PackageId}");
        PS.StartProcess($"dotnet tool install   -g {info.PackageId}  --add-source {currentDir}/publish --version {info.Version}");
    });

Task("Build").Does(() => {
    PS.StartProcess($"parcel build --no-cache -d src/{name}/wwwroot/ --public-url / client/index.html");
    PS.StartProcess($"parcel build --no-cache -d src/{name}/wwwroot/ --public-url / vscode/vscode.html");
});

Task("Start").Does(() => {
    PS.StartProcess($"parcel watch --no-cache -d src/{name}/wwwroot/ --public-url / client/index.html");
});

Task("Start-Code").Does(() => {
    PS.StartProcess($"parcel --no-cache -d src/{name}/wwwroot/ --public-url / vscode/vscode.html");
});

var target = Argument("target", "Start");
RunTarget(target);