import { devServer } from "../buildConfig";

(() => {
    const { host, websocket, port } = devServer;

    const socket = new WebSocket(`ws://${host}:${websocket}`);
    socket.onmessage = (event) => {
        switch (event.data) {
            case "reload":
                console.log("[userscript-esbuild-ts] hotreload");
                window.location.reload();
                break;
            case "connect":
                console.log(
                    "[userscript-esbuild-ts] hotreload server connected"
                );
                break;
        }
    };

    import(`http://${host}:${port}/script`);
})();
