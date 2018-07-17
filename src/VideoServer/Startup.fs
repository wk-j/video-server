namespace VideoServer

open System
open System.Collections.Generic
open System.Linq
open System.Threading.Tasks
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.AspNetCore.HttpsPolicy;
open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection
open System.Reflection
open Microsoft.Extensions.FileProviders
open System.Diagnostics
open System.IO
open VideoServer.Finder
open Hubs
open Microsoft.AspNetCore.Http

type Startup private () =
    new (configuration: IConfiguration) as this =
        Startup() then
        this.Configuration <- configuration

    member __.ConfigureServices(services: IServiceCollection) =
        let youtubeUrls = UrlFinder.FindYoutubeUrls(".")
        let videoUrls = youtubeUrls |> Array.map UrlFinder.ConvertToVideoUrl
        let data = { Urls = videoUrls }


        services.AddCors(fun options ->
            options.AddPolicy("CorsPolicy", fun builder ->
                builder.AllowAnyHeader() |> ignore
                builder.AllowAnyMethod() |> ignore
                builder.AllowAnyOrigin() |> ignore
                builder.AllowCredentials() |> ignore
            ) |> ignore
        ) |> ignore

        services.AddSignalR() |> ignore

        services
            .AddSingleton<InitialData>(data)
            .AddMvc()
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_1) |> ignore

    member __.Configure(app: IApplicationBuilder, env: IHostingEnvironment) =
        if (env.IsDevelopment()) then
            app.UseDeveloperExceptionPage() |> ignore
        else
            app.UseHsts() |> ignore

        app.UseCors("CorsPolicy") |> ignore
        app.UseSignalR(fun builder ->
            builder.MapHub<VideoHub>("/videoHub" |> PathString)
        ) |> ignore


        // app.UseCors(fun config ->
        //     config.AllowAnyHeader() |> ignore
        //     config.AllowAnyMethod.antm () |> ignore
        //     config.AllowAnyOrigin() |> ignore
        //     config.AllowCredentials() |>ignore
        // ) |> ignore

        if (env.IsDevelopment()) then
            printfn "Env = Development"
            app .UseDefaultFiles()
                .UseStaticFiles()
                .UseMvc() |> ignore
        else
            printfn "Env = Production"
            let asm = Assembly.GetEntryAssembly()
            let asmName = asm.GetName().Name

            let defaultOptions = DefaultFilesOptions()
            defaultOptions.DefaultFileNames.Clear()
            defaultOptions.DefaultFileNames.Add("index.html")
            defaultOptions.FileProvider <- new EmbeddedFileProvider(asm, sprintf "%s.wwwroot" asmName)

            let staticOptions = StaticFileOptions()
            staticOptions.FileProvider <- new EmbeddedFileProvider(asm, sprintf "%s.wwwroot" asmName)

            app .UseDefaultFiles(defaultOptions)
                .UseStaticFiles(staticOptions)
                .UseMvc() |> ignore

    member val Configuration : IConfiguration = null with get, set