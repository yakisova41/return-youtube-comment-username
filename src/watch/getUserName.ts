export async function getUserName(href: string) {
    const data = await fetch(href).then((res) => res.text());

    const root = document.createElement("div");
    root.innerHTML = data;

    const name = root.querySelector("title");

    return name.innerHTML.split(" - ")[0];
}
