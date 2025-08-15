const setIframe = (id = "new-ext-iframe", style = {}, classes = [], htmlContent) => {
    let iframe = document.createElement("iframe");
    iframe.id = id;
    classes.forEach((cl) => {
        iframe.classList.add(cl);
    });
    let iframeStyle = "";
    Object.entries(style).forEach((st) => {
        iframeStyle += `${st[0]}: ${st[1]}; `;
    });
    iframe.setAttribute('style', iframeStyle);

    
    
    document.querySelector("html").append(iframe);

    let addedIframe = document.querySelector(`#${id}`);
    addedIframe.contentWindow.document.body.innerHTML = htmlContent;
    addedIframe.contentWindow.document.body.classList.add("body");
    addedIframe.contentWindow.document.body.classList.add("dark-mode");

    /*
    ADDING LINKS
     */
    [
        ["https://fonts.googleapis.com", "preconnect", ""],
        ["https://fonts.gstatic.com", "preconnect", "crossorigin"],
        ["https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,100..900;1,100..900&display=swap", "stylesheet", ""]
    ].forEach((font) => {
        let tempFont = document.createElement("link");
        tempFont.href = font[0],
        tempFont.rel = font[1];
        tempFont[2] != ""? tempFont.crossOrigin = "crossorigin" : "";
        addedIframe.contentWindow.document.head.append(tempFont);
    });

    /*
    ADDING STYLES
     */
    let st = document.createElement("style");
    let stContent = `
    html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
  box-sizing: border-box;
}
body {
  line-height: 1;
  box-sizing: border-box;
}
ol,
ul {
  list-style: none;
  box-sizing: border-box;
}
blockquote,
q {
  quotes: none;
  box-sizing: border-box;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
  box-sizing: border-box;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  box-sizing: border-box;
}
    `
    st.innerHTML = stContent +`

:root {
    --clutch-theme: #7146B5;
    --clutch-theme-light: #EEE6F5;
    --clutch-theme-dark: #424242;
    --font-size: 14px;
    --font-color-light: #ffffff;
    --font-color-dark: #424242;
}

* {
    font-family: "Albert Sans", "Albert Sans Placeholder", sans-serif;
    box-sizing: border-box;
    transition: all .75s ease;
}
.body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--clutch-theme-light);
    color: var(--font-color-dark);
}
.body.dark-mode {
    background: var(--clutch-theme-dark);
    color: var(--font-color-light);
}

/* EXT BUTTON */
.ext-btn__container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.ext-btn__link-container {
    width: 50%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px var(--clutch-theme) solid;
    cursor: pointer;
}
.ext-btn__clutch-container {
    width: 50%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px var(--clutch-theme) solid;
    cursor: pointer;
}
.body.dark-mode .ext-btn__link-container {
    border-right: 1px var(--clutch-theme-light) solid;
}
.body.dark-mode .ext-btn__clutch-container {
    border-left: 1px var(--clutch-theme-light) solid;
}
.ext-btn__link-container svg {
    width: 25px;
}
.body.dark-mode .ext-btn__link-container svg {
    filter: invert(100%);
}
.ext-btn__clutch-container img {
    width: 25px;
    filter: invert(100%);
}
.body.dark-mode .ext-btn__clutch-container img {
    filter: inherit;
}
.ext-btn__link-container:hover svg {
    width: 30px;
}
.ext-btn__clutch-container:hover img {
    width: 30px;
}
.ext-btn__clutch-container.ext-btn__clutch-container_ticket-match img {
    filter: brightness(0) saturate(100%) invert(33%) sepia(18%) saturate(3652%) hue-rotate(232deg) brightness(93%) contrast(92%) !important;
}
.body.dark-mode .ext-btn__clutch-container.ext-btn__clutch-container_ticket-match img {
    filter: brightness(0) saturate(100%) invert(71%) sepia(4%) saturate(4818%) hue-rotate(215deg) brightness(90%) contrast(82%) !important;
}
    `
    addedIframe.contentWindow.document.head.append(st);

    return addedIframe;

}

const getOptions = () => {
    chrome.storage.sync.get(
      {
        extension: true,
        datafeed: true,
        position: "right-bottom",
        linksList: [],
        dao: true,
        lending: true,
        branch: true,
        taktile: true,
        freshdesk: true,
      },
      (options) => {
        console.log(options);
        if (options.extension) {
            let iframeId = "clutch-ext-iframe"
            let styleObj = {
                "background": "black", 
                "color": "#454545", 
                "display": "flex",
                "justify-content": "center",
                "align-items": "center",
                "width": "125px",
                "height": "50px",
                "position": "fixed",
                "z-index": "999999",
                "border": "none",
                "border-radius": "20% 80% 20% 80% / 100% 0% 100% 0%"

            };
            switch (options.position) {
                case "right-bottom":
                    styleObj.right = "60px";
                    styleObj.left = "unset";
                    styleObj.bottom = "60px";
                    styleObj.top = "unset";
                    break
                case "left-bottom":
                    styleObj.right = "unset";
                    styleObj.left = "60px";
                    styleObj.bottom = "60px";
                    styleObj.top = "unset";
                    break
                case "left-top":
                    styleObj.right = "unset";
                    styleObj.left = "60px";
                    styleObj.bottom = "unset";
                    styleObj.top = "60px";
                    break
                case "right-top":
                    styleObj.right = "60px";
                    styleObj.left = "unset";
                    styleObj.bottom = "unset";
                    styleObj.top = "60px";
                    break
            }

            let htmlContent = `
            <div class="ext-btn__container">
                <div class="ext-btn__link-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z"/></svg>
                </div>
                <div class="ext-btn__clutch-container">
                    <img src="https://arthurfernandes-clutch.github.io/clutch-extension/images/Clutch_logo_white.png" alt="Clutch logo" class="ext-btn__logo">
                </div>
            </div>
            `;

            let iframeClasses = ["clutch-ext-iframe"];
            let iframe = setIframe(iframeId, styleObj, iframeClasses, htmlContent);
            console.log(iframe);
        }
      }
    );
  };
  getOptions();