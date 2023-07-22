export async function getUserName(id: string): Promise<string> {
  const data = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`,
    {
      method: "GET",
      cache: "default",
      keepalive: false,
    }
  )
    .then(async (res) => await res.text())
    .then((text) => {
      const match = text.match("<title>([^<].*)</title>");
      if (match !== null) {
        return match[1];
      } else {
        return "API ERROR";
      }
    });
  return data;
}
