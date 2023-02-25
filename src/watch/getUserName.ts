export async function getUserName(href: string) {
    const id = href.split("/")[4];

    const data = await fetch(
        `https://www.youtube.com/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false`,
        {
            method: "POST",
            headers: {
                accept: "*/*",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "ja",
                "content-type": "application/json",
                cookie: `GPS=1; YSC=sHEZ9k4QSS0; DEVICE_INFO=DEVICE_INFO; VISITOR_INFO1_LIVE=LLIIVVEE; PREF=f6=40000000&tz=Asia.Tokyo; ST-o2eza2=itct=itct&endpoint=%7B%22clickTrackingParams%22%3A%22CBQQ8JMBGAciEwjNqtCN86H9AhXnm1YBHABY%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2F%40FUCKYOUTUBE%2Fchannels%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_CHANNEL%22%2C%22rootVe%22%3A3611%2C%22apiUrl%22%3A%22%2Fyoutubei%2Fv1%2Fbrowse%22%7D%7D%2C%22browseEndpoint%22%3A%7B%22browseId%22%3A%22${id}%22%2C%22params%22%3A%22EghjaGFubmVsc_IGBAoCUgA%253D%22%2C%22canonicalBaseUrl%22%3A%22%2F%40FUCK_YOUTUBE%22%7D%7D`,
                dnt: "1",
                referer: `https://www.youtube.com/channel/${id}`,
                "sec-ch-ua": `"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"`,
                "sec-ch-ua-arch": "x86",
                "sec-ch-ua-bitness": "64",
                "sec-ch-ua-full-version": "110.0.5481.104",
                "sec-ch-ua-full-version-list": `"Chromium";v="110.0.5481.104", "Not A(Brand";v="24.0.0.0", "Google Chrome";v="110.0.5481.104"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "Windows",
                "sec-ch-ua-platform-version": "15.0.0",
                "sec-ch-ua-wow64": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "same-origin",
                "sec-fetch-site": "same-origin",
                "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
                "x-client-data": "x-client-data",
                "x-goog-authuser": "0",
                "x-goog-visitor-id": "visitorData",
                "x-origin": "https://www.youtube.com",
                "x-youtube-bootstrap-logged-in": "true",
                "x-youtube-client-name": "1",
                "x-youtube-client-version": "2.20230217.01.00",
            },
            body: JSON.stringify({
                context: {
                    client: {
                        hl: "ja",
                        gl: "JP",
                        remoteHost: "1919:8a10:1145:1419:e1c9:b81a:09db:ff3a",
                        deviceMake: "",
                        deviceModel: "",
                        visitorData: "visitorData",
                        userAgent:
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36,gzip(gfe)",
                        clientName: "WEB",
                        clientVersion: "2.20230217.01.00",
                        osName: "Windows",
                        osVersion: "10.0",
                        originalUrl:
                            "https://www.youtube.com/@FUCK_YOUTUBE/channels",
                        platform: "DESKTOP",
                        clientFormFactor: "UNKNOWN_FORM_FACTOR",
                        configInfo: {
                            appInstallData: "appInstallData",
                        },
                        userInterfaceTheme: "USER_INTERFACE_THEME_DARK",
                        timeZone: "Asia/Tokyo",
                        browserName: "Chrome",
                        browserVersion: "110.0.0.0",
                        acceptHeader:
                            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                        deviceExperimentId: "deviceExperimentId",
                        screenWidthPoints: 599,
                        screenHeightPoints: 937,
                        screenPixelDensity: 1,
                        screenDensityFloat: 1,
                        utcOffsetMinutes: 540,
                        memoryTotalKbytes: "8000000",
                        mainAppWebInfo: {
                            graftUrl: "/@FUCK_YOUTUBE/channels",
                            pwaInstallabilityStatus:
                                "PWA_INSTALLABILITY_STATUS_CAN_BE_INSTALLED",
                            webDisplayMode: "WEB_DISPLAY_MODE_BROWSER",
                            isWebNativeShareAvailable: true,
                        },
                    },
                    user: { lockedSafetyMode: false },
                    request: {
                        useSsl: true,
                        internalExperimentFlags: [],
                        consistencyTokenJars: [],
                    },
                    clickTracking: {
                        clickTrackingParams:
                            "CCgQ8JMBGAgiEwiW5Pey8qH9AhVVSA8CHUHLAGc=",
                    },
                    adSignalsInfo: {
                        params: [
                            { key: "dt", value: "1676820301790" },
                            { key: "flash", value: "0" },
                            { key: "frm", value: "0" },
                            { key: "u_tz", value: "540" },
                            { key: "u_his", value: "1" },
                            { key: "u_h", value: "1080" },
                            { key: "u_w", value: "1920" },
                            { key: "u_ah", value: "1040" },
                            { key: "u_aw", value: "1920" },
                            { key: "u_cd", value: "24" },
                            { key: "bc", value: "31" },
                            { key: "bih", value: "937" },
                            { key: "biw", value: "582" },
                            {
                                key: "brdim",
                                value: "-1920,0,-1920,0,1920,0,1920,1040,599,937",
                            },
                            { key: "vis", value: "1" },
                            { key: "wgl", value: "true" },
                            { key: "ca_type", value: "image" },
                        ],
                    },
                },
                browseId: id,
                params: "EghjaGFubmVsc_IGBAoCUgA%3D",
            }),
        }
    )
        .then((res) => res.text())
        .then((text) => {
            const data = JSON.parse(text);
            const name = data["header"]["c4TabbedHeaderRenderer"]["title"];

            return name;
        });
    return data;
}
