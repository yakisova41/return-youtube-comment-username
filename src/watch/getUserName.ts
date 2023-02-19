export async function getUserName(href: string) {
    const id = href.split("/")[4];

    const data = await fetch(
        `https://yt-returnname-api.pages.dev/api/idToName?id=${id}`,
        {
            method: "POST",
        }
    ).then((res) => res.text());
    return data;
}
