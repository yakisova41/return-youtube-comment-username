import packageJson from "../../package.json";
(() => {
    const { host, websocket, port } = packageJson?.userScript?.devServer;

    const socket = new WebSocket(`ws://${host}:${websocket}`);
    socket.onmessage = (event) => {
        switch (event.data) {
            case "reload":
                console.log("[userscript-esbuild-ts] hotreload...");
                window.location.reload();
                break;
            case "connect":
                console.log(
                    "[userscript-esbuild-ts] hotreload server connecting ok"
                );
                break;
        }
    };

    import(`http://${host}:${port}/script`);
})();
