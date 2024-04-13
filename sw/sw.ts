import manifest from "../manifest.json";
import Encoding from "encoding-japanese";
import markdownit from "markdown-it";
import { titlePlugin } from "@mdit-vue/plugin-title";

chrome.runtime.onInstalled.addListener((e) => {
  if (e.reason === "install" || e.reason === "update") {
    getReleaseNotes(`v${manifest.version}`).then((releaseNote) => {
      const changeLogHtmlDataUri = createChangeLog(releaseNote);
      chrome.tabs.create({
        url: changeLogHtmlDataUri,
      });
    });
  }
});

function createChangeLog(releaseNote: ReleaseNote) {
  const icon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAWJAAAFiQFtaJ36AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABI5JREFUaIHVml1ok1cYx39v4pT6Ebdo0baoWCd+VsEPNqfthigOi0IZnRc1XgxFELwQBGE474eIV1UoOqsw9MILSzsv1G4wRQe1zG9RWdGWVBgSMGldrab/XTy2Sc2bj2aZSf5wyMk5zzn5P5/nzUkcSYzAcT4GAsDXwGpgHIWBIaAT+AU4idQ/MiPJGnwpeC5Qgbeg4LNh3vHkXxUAuUzbP4L1knAEfuARMD0/0ZE1eoElHmA3xUceoBz4zgN8k28m/wGbHUEfMCnfTLLE344gCnjyzSRLyEOhkV+2DM6dg5s34exZqKpKLV8AJTHWNm2SBgY0CgMD0saNydYMOQIl1a6iAmpqYOZMCIehsxNu3cqxyd9h3Djo6oJZsxLnnj2DefMgGn1/Ru4eqKyULlyQhoaUgBs3pMWLc2/95csTPyseVVWuHkhUYMUK6cULW9TWJgUCUk2NtGWLdOqUFI1KoZC0cGFuFVi6NLUC7kZ7TwGfT+ruNpINDZLjSAsWSFOmxGR27LANr13LjNj69bZPOjmPR3ryxJ38o0c2n1aBgwdtwZEj0rRpRlIyj1y/bv1AQLp6NZVbR7eWFqm11YyTTnbdOikSGU0+HJbWrk2axKMVuH/f4r6iQjp50jZ48EA6fTq2YXW1dPiw9XftSk+qtdVk79yR5s5NL19ZKR07Jl2+LDU2plszFHveHz8eFi2C7m4IBqG+3sa3b4fbt6GhAbxeePoUXr60uUnvDvCSEvD73atLSYm9VlVBRwds2wbt7cmrUTgM589DeTn09kIkkrp6jWjj95ul7t6VJk6MWdznk5Yssf7goOT1Ss3N9r6uztYGAqkTMB5v3kgHDiRas7zc9nU7B5qbpbIyVw/EzgHHgYEB6OuD0lLTfsYMOHMGVq0y70SjsHcvHD1qsnPmmMWmTnWv3wCzZ8PkySYfDMbG792D16+tv3o1tLRAWVlyS/f2wtatdhbF23+URu3tpvWGDVZtBgft/aVL0r59MauEQlJtbW7KZ2mpFAxm5r2eHmn69BRJXFdngl1dVj79fmn+/Nj8ypVSfb1VqFyQB6mpKfPwk6Tjx5OE0DAaG2HPHnN5W5u5GixcNm+GpiY4dCh1YmUKn89CY9IYnuYjEUvwvj6XEBpuO3dKDx8mav/4sbR7d+6sX109NusPY80alzIajxMnrFVUWHL291sChkI5MfwIvF64cmXs6yZMGO6leRotfLwqrC8zY0ePB7v1KlbcdQRvAW++mWSJWkcwCHyUbyZZ4A/gCw/FmcR/Ad8iqRgVuAh8jtQDdn2eiQIXgf60UrnHZOziLQTcA35Duh8vkMn9/+9Itf8DuZwgXRkVsP8DcckK6XLgZ6SOD0UmGziCCBZr8RBWXhcgPfvwtDJHMg84wJFCJw/mgZeAL25MwAvgU6RwfmhlDrckdoAfioE8mAdCwCdxYw+BZUhv88RpTHDzwP5iIQ+JP278inQxL0yyRHwVGqLADy03xIfQT0h/5pNMNnAEz4EpwHyk5/kmNFYM58CPxUgezAMdwFfE/wOkiOABvi9W8gD/AtVVmDkJXLSNAAAAAElFTkSuQmCC";

  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
  }).use(titlePlugin);

  const releaseNoteBodyParsed = md.render(releaseNote.body);

  const htmlContent = `
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${chrome.i18n.getMessage("Name")}</title>
    </head>
    <body>
      <div class="container">
          <div class="primary">     
            <div class="primary-contents">
              <img src="${icon}"/>
              <h1>${chrome.i18n.getMessage("Name")} v${
                manifest.version
              } ${chrome.i18n.getMessage("Installed")}</h1>          
              
              <div class="btns">
                <button class="btn btn-primary donate-btn">
                  <a href="https://www.patreon.com/yakisova41"> 
                    ${chrome.i18n.getMessage("Support")}
                  </a>
                </button>
                <button class="btn github-btn">
                  <a href="https://github.com/yakisova41/return-youtube-comment-username">
                    GitHub
                  </a>
                </button>
                <button class="btn">
                  <a href="https://rycu.yakisova.com/">
                    ${chrome.i18n.getMessage("OfficialSite")}
                  </a>
                </button>
              </div>
            </div>
          </div> 
              
          <div class="secondary">
            <p>${releaseNoteBodyParsed}</p>
          </div>
      </div>

      

      <style>  
        body {
          background-color: #201a1a;
          color: #ece0df;
          padding: 10px;
          font-family: sans-serif;
        }

        a {
          color: #e6bdbc;
        }
    
        .header {
          display: flex;
          align-items: center;
          gap: 0 10px;
        }
    
        .btns {
          display: flex;
          gap: 0 7px;
        }
    
        .btn {
          height: 40px;
          background-color: #7e2a30;
          border: none;
          border-radius: 20px;
          cursor: pointer;
        }

        .btn > a {
          color: #ffdad9;
          text-decoration: none;
          width: 100%;
          height: 100%;
          display: flex;
          padding: 0 20px;
          align-items: center;
        }
    
        .btn-primary {
          background-color: #ffb3b3;
        }

        .btn-primary  > a {
          color: #5f131b;
        }

        .container {
          display: flex;
          height: 100%;
        }

        .primary {
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .secondary {
          width: 50%;
          height: 100%;
          overflow-y: scroll;
        }
      </style>
    </body>
  </html>
  `;
  const array = new TextEncoder().encode(htmlContent);

  const changelogDataurl =
    "data:text/html;base64," + Encoding.base64Encode(array);

  return changelogDataurl;
}

async function getReleaseNotes(releaseName: string) {
  const response = await fetch(
    "https://api.github.com/repos/yakisova41/return-youtube-comment-username/releases",
  );
  const data: ReleaseNote[] = await response.json();

  return data.filter((releaseNote) => {
    if (releaseNote.name === releaseName) {
      return releaseNote;
    }
  })[0];
}

interface ReleaseNote {
  name: string;
  body: string;
}
