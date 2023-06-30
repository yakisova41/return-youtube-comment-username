export async function getUserName(id: string): Promise<string> {
  const data = await fetch(
    `https://www.youtube.com/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false`,
    {
      method: "POST",
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "ja",
        "content-type": "application/json",
        dnt: "1",
        referer: `https://www.youtube.com/channel/${id}`,
      },
      body: JSON.stringify({
        context: {
          client: {
            hl: window.yt.config_.HL,
            gl: window.yt.config_.GL,
            remoteHost: "1919:8a10:1145:1419:e1c9:b81a:09db:ff3a",
            clientName: "WEB",
            clientVersion: "2.20230628.01.00",
            platform: "DESKTOP",
            acceptHeader:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          },
          user: { lockedSafetyMode: false },
          request: {
            useSsl: true,
            internalExperimentFlags: [],
            consistencyTokenJars: [],
          },
          clickTracking: {
            clickTrackingParams: "UnkoBuuriiiiiiiicuuusssaiMAJIDE=",
          },
        },
        browseId: id,
        params: "a",
      }),
    }
  )
    .then(async (res) => await res.text())
    .then((text) => {
      const data = JSON.parse(text);
      const name: string = data.header.c4TabbedHeaderRenderer.title;

      return name;
    });
  return data;
}
