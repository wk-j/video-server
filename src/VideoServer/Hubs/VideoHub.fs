module VideoServer.Hubs
open Microsoft.AspNetCore.SignalR

type HubFunctions =
    static member NewImage(client: IHubClients , image: string) =
        client.All.SendAsync("newImage", image);

type VideoHub() = inherit Hub()