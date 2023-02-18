export async function getUserName(href: string) {
    const id = href.split("/")[4];

    const data = await fetch(
        `https://yt-returnname-api.vercel.app/api/idToName/${id}`,
        {
            method: "POST",
        }
    ).then((res) => res.text());

    return data;
}
