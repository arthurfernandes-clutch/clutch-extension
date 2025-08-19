const setIframe = (id = "new-ext-iframe", style = {}, classes = [], htmlContent, darkMode) => {
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
    addedIframe.contentWindow.document.body.id = "body__clutch-ext";
    darkMode ? addedIframe.contentWindow.document.body.classList.add("dark-mode") : "";

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
a {
text-decoration: none;
}
    `
    st.innerHTML = stContent +`

:root {
    --clutch-theme: #7146B5;
    --clutch-theme-light: #EEE6F5;
    --clutch-theme-dark: #424242;
    --background: #f9f7fc;
    --font-size: 14px;
    --font-color-light: #ffffff;
    --font-color-dark: #424242;
}

* {
    font-family: "Albert Sans", "Albert Sans Placeholder", sans-serif;
    box-sizing: border-box;
    transition: all .75s ease;
    font-size: var(--font-size);
}
.body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background: var(--background);
    color: var(--font-color-dark);
    overflow: hidden;
}
.body_active {
    width: 100%;
    height: fit-content;
}
.body.dark-mode {
    background: var(--clutch-theme-dark);
    color: var(--font-color-light);
}

/* EXT BUTTON */
.body:not(.body_active) .ext-btn__container {
    width: 100%;
    height: 100%;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.body.body_active .ext-btn__container {
    width: 0px;
    height: 0px;
    opacity: 0;
    overflow: hidden;
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
    cursor: pointer;
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
.body_active .ext-btn__container {
    display: none;
}
/* CONTENT CONTAINER */
.body.body_active .content-container {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    align-items: center;
    padding: 10px 15px;
    margin: 0;
    opacity: 1;
}
.body:not(.body_active) .content-container {
    width: 0px;
    height: 0px;
    opacity: 0;
    overflow: hidden;
}

/* HEADER */
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
}
.header__logo {
    width: 200px;
}
.body.dark-mode .header__logo {
    filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(268deg) brightness(107%) contrast(101%);
}
.close__button {
    margin-left: auto;
    top: 5px;
    right: 5px;
    width: 0;
    opacity: 0;
    transition: all .5s ease;
}
.body.dark-mode .close__button {
    filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(268deg) brightness(107%) contrast(101%);
}
.body_active .close__button {
    width: 20px;
    opacity: 1;
    cursor: pointer;
}
.close__button:hover {
    width: 22px;
    opacity: .5;
}
/* CLUTCH CONTAINER */
.clutch-container {
    margin: 35px auto 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 35px;
}
.main-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    row-gap: 10px;
    column-gap: 15px;
}
.input-container {
    width: 100%;
    displey: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}
.main-container__input {
    width: 100%;
    margin: 0 auto;
    border: none;
    outline: none;
    padding: 10px;
    color: var(--font-color-dark);
    background: var(--clutch-theme-light);
    border-radius: 4px;
}
.input__selection-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 0px;
    max-height: 150px;
    position: absolute;
    top: 40px;
    left: 0;
    background: white;
    z-index: 10000000000;
    overflow: hidden;
    overflow-y: scroll;
}
#partner-alias:focus ~ .input__selection-list, .input__selection-list:hover {
    height: fit-content;
}
.input__selection-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 5px;
    margin: 0;
    color: var(--font-color-dark);
    font-size: 13px;
    cursor: pointer;
}
.input__selection-item_invalid {
    display: none;
}
.main-container__button {
    min-width: 25%;
    padding: 5px 10px;
    border-radius: 4px;
    background: var(--clutch-theme);
    color: var(--font-color-light);
    display: flex;
    justify-content: center;
    align-items: center;
}
.main-container__button:hover {
    opacity: .35;
}
.add-container, .links-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    row-gap: 10px;
    column-gap: 10px;
}
.add-continer__button {
    width: 40%;
    padding: 5px 10px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--clutch-theme);
    color: var(--font-color-light);
}
.add-continer__link {
    min-width: 40%;
    padding: 5px 10px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--clutch-theme);
    color: var(--font-color-light);
}
.add-continer__button:hover, .add-continer__link:hover {
    opacity: .35;
}
/* FOOTER */
.body.body_active .footer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin: 0 auto;
}
.body:not(.body_active) .footer {
    width: 0px;
    height: 0px;
    opacity: 0;
    overflow: hidden;
}
.hide-extension {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    border-radius: 4px;
    background: var(--clutch-theme-dark);
    color: var(--clutch-theme-light);
    cursor: pointer;
}
.body.dark-mode .hide-extension {
    background: var(--clutch-theme-light);
    color: var(--font-color-dark);
}
.hide-extension:hover {
    opacity: .35;
}
    `
    addedIframe.contentWindow.document.head.append(st);
    return addedIframe;

}

const setOpenCloseEvent = (iframeId) => {
    let closeAtt = `width: 50px; height: 50px; border-radius: 100%; min-height: 0px;`;
    let iframe = document.querySelector(`#${iframeId}`);

    window.addEventListener("click", (evt) => {
        if (evt.target.closest("body").id != "body__clutch-ext") {
            iframe.contentWindow.document.body.classList.remove("body_active");
            iframe.setAttribute('style', iframe.getAttribute('style') + closeAtt);
        }
    });

    iframe.contentWindow.document.querySelector(".ext-btn__clutch-container").addEventListener("click", () => {
        iframe.contentWindow.document.body.classList.add("body_active");
        iframe.setAttribute('style', iframe.getAttribute('style') + `width: 350px; height: 460px; border-radius: 10px; min-height: 300px; max-height: 460px;`);

        let h = document.querySelector(`#${iframeId}`).contentWindow.document.querySelector(".content-container").scrollHeight;
        iframe.setAttribute('style', iframe.getAttribute('style') + `width: 350px; height: ${h}px; border-radius: 10px; min-height: 300px;`);
    });
    iframe.contentWindow.document.querySelector(".close__button").addEventListener("click", () => {
        iframe.contentWindow.document.body.classList.remove("body_active");
        iframe.setAttribute('style', iframe.getAttribute('style') + closeAtt);
    })
}

const handleAliaslist = (list, iframeId, contClass, elClass, inputId) => {        
    let cont = document.querySelector(`#${iframeId}`).contentWindow.document.querySelector(`.${contClass}`);
    let aliasInput = document.querySelector(`#${iframeId}`).contentWindow.document.querySelector(`#${inputId}`);
    list.forEach((item) => {
        let tempItem = document.createElement("p");
        tempItem.classList.add(`${elClass}`);
        tempItem.textContent = item;
        cont.append(tempItem);
    });

    cont.querySelectorAll(`.${elClass}`).forEach((item) => {
        item.addEventListener("click", () => {
            aliasInput.value = "";
            aliasInput.value = item.textContent;
            document.querySelector(`#${iframeId}`).contentWindow.document.querySelector("#dao").href = `https://${aliasInput.value}.sandbox.clutchapi.dev/account-opening`;
        document.querySelector(`#${iframeId}`).contentWindow.document.querySelector("#lending").href = `https://${aliasInput.value}.sandbox.clutchapi.dev`;
        document.querySelector(`#${iframeId}`).contentWindow.document.querySelector("#branch").href = `https://${aliasInput.value}.branch-portal.sandbox.clutchapi.dev/login?returnTo=%2F`;
        });
    });
    
    aliasInput.addEventListener("input", () => {
        cont.querySelectorAll(`.${elClass}`).forEach((item) => {
            if (item.textContent.includes(aliasInput.value)) {
                item.classList.remove("input__selection-item_invalid");
            } else {
                item.classList.add("input__selection-item_invalid");
            }
        });
        document.querySelector(`#${iframeId}`).contentWindow.document.querySelector("#dao").href = `https://${aliasInput.value}.sandbox.clutchapi.dev/account-opening`;
        document.querySelector(`#${iframeId}`).contentWindow.document.querySelector("#lending").href = `https://${aliasInput.value}.sandbox.clutchapi.dev`;
        document.querySelector(`#${iframeId}`).contentWindow.document.querySelector("#branch").href = `https://${aliasInput.value}.branch-portal.sandbox.clutchapi.dev/login?returnTo=%2F`;
    });
    


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
        darkMode: true
    },
    (options) => {
        if (options.extension) {
            let iframeId = "clutch-ext-iframe"
            let styleObj = {
                "background": "black", 
                "color": "#454545", 
                "display": "flex",
                "justify-content": "center",
                "align-items": "center",
                "width": "50px",
                "height": "50px",
                "position": "fixed",
                "z-index": "999999",
                "border": "none",
                "border-radius": "50%",
                "max-height": "460px",
                "transition": "all .25s ease",
                "-webkit-box-shadow": "2px 2px 10px 0px rgba(66, 66, 66, 0.5)",
                "-moz-box-shadow": "2px 2px 10px 0px rgba(66, 66, 66, 0.5)",
                "box-shadow": "2px 2px 10px 0px rgba(66, 66, 66, 0.5)"

            };
            switch (options.position) {
                case "right-bottom":
                    styleObj.right = "20px";
                    styleObj.left = "unset";
                    styleObj.bottom = "90px";
                    styleObj.top = "unset";
                    break
                case "left-bottom":
                    styleObj.right = "unset";
                    styleObj.left = "20px";
                    styleObj.bottom = "90px";
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

            let daoLendingBranch = ``;
            if (options.dao || options.lending || options.branch) {
                let dao = options.dao ? `<a class="main-container__button" id="dao" href="#" target="_parent">DAO</a>` : "";
                let lending = options.lending ? `<a class="main-container__button" id="lending" href="#" target="_parent">Lending</a>` : "";
                let branch = options.branch ? `<a class="main-container__button" id="branch" href="#" target="_parent">Branch Portal</a>`: "";
                daoLendingBranch = `
                <div class="main-container">
                        <div class="input-container">
                            <input type="text" max="30" class="main-container__input main-container__input_search" id="partner-alias" placeholder="Partner Alias">
                            <div class="input__selection-list">
                            </div>
                        </div>
                        ${dao}
                        ${lending}
                        ${branch}
                    </div>
                `;
            }
            
            let freshdesk = options.freshdesk ? `<a href="https://withclutch.freshdesk.com/a/tickets/filters/544307" class="add-continer__button" id="tickets" target="_parent">Tickets</a>`: "";
            let taktile = options.taktile ? `<a href="https://app.taktile.com/" class="add-continer__button" id="taktile" target="_parent">Taktile</a>` : "";

            let linksToadd = ``;
            options.linksList.forEach((l) => {
                linksToadd += `<a href="${l.url}" class="add-continer__link" target="_parent">${l.title}</a>`;
            });

            //linksToadd add link check here

            let htmlContent = `
            <div class="ext-btn__container">
                <div class="ext-btn__clutch-container">
                    <img src="https://arthurfernandes-clutch.github.io/clutch-extension/images/Clutch_logo_white.png" alt="Clutch logo" class="ext-btn__logo">
                </div>
            </div>
            <div class="content-container">
                <div class="header">
                    <img src="https://arthurfernandes-clutch.github.io/clutch-extension/images/Clutch_logo2.png" alt="WithClutch Logo" class="header__logo">
                    <svg class="close__button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg>
                </div>
                <div class="clutch-container">
                    ${daoLendingBranch}
                    <div class="add-container">
                        ${freshdesk}
                        ${taktile}
                    </div>
                </div>
                <div class="links-container">
                        ${linksToadd}
                </div>
            </div>
            <div class="footer">
                <p class="hide-extension">Hide Extension</p>
            </div>
            `;

            /* Handle close and opening buttons */
            let iframeClasses = ["clutch-ext-iframe"];
            let iframe = setIframe(iframeId, styleObj, iframeClasses, htmlContent, options.darkMode);
            setOpenCloseEvent(iframe.id);

            /* Partner Alias list adding */
            let aliasList = ["1stadvantage","1stnorcalcu","1stunitedcu","3riversfcu","4frontcu","aacreditunion","aafcu","abnbfcu","aboundcu","accessibility-demo","account-opening-automated-test-partner","account-opening-feature-test-partner","account-opening-test-partner","achievacu","acme","acuonline","acutx","additionfi","adelfi","advantiscu","adventurecu","adviacu","aerofed","afcu","affinityfcu","affinityplus","alabamacu","alabamaone","alaskausa","allegacy","alliantcreditunion","allinapproval","allincu","allincu-yaa","allsouth","alohapacific","altaone","altaonefcu","altavistacu","altra","alturacu","ameliacu","americafirst","americafirst-demo","americafirst-turo","americafirst-yag","americaneagle","americanheritagecu","americaschristiancu","americascu","americu","amfirst","amocofcu","andrewsfcu","apcu","aplusfcu","applefcu","arapahoecu","ardentcu","arrowheadcu","ascend","ascentcu","atlanticfcu","authteam","avadiancu","avant","azcentralcu","bayfed","bayportcu","bcu","beaconcu","becu","belco","bellco","beneficialstatebank","bethpagefcu","bfcu","bfsfcu","bhfcu","blucurrent","bluefcu","business-account-opening-test-partner","c1stcreditunion","cabrillocu","cafcu","calcoastcu","caltechefcu","campuscu","campusfederal","canvas","capcomfcu","capedcu","cardinalcu","carolinatrust","carterfcu","cccu","ccculv","ccuflorida","ccuky","cdcfcu","cefcu","centennial-lending","centerparc","centricity","centrisfcu","cfcu","chartway","chartway-youth","chevronfcu","chevronfcu-fastlane","citadelbanking","clearviewfcu","clutchpartner","clutchsymitardev","cmcu","cmefcu","coastal","coastal24","coasthills","cobaltcu","collinscu","comfedcu","comfirstcu","communityamerica","communitychoicecu","communityfirstcu","communityfirstfl","congressionalfcu","connexcu","connexuscu","consumerscu","copperstatecu","cornerstonecu","corningcu","covantagecu","credentials-inbox","credithuman","creditunion1","cu-aedemo","cudenver","cu-loanspq","cuofamerica","cuofamerica-test","cuofco","cuone","cusocal","cu-sync1","cutx","cuwest","cyfairfcu","cypruscu","dao","daoredteam","dayair","dcecu","dcu","dealershipguy","default","deltacommunitycu","demo","demo10","demo11","demo12","demo13","demo14","demo15","demo16","demo2","demo3","demo4","demo5","demo6","demo7","demo8","demo9","dfcu","dfcufinancial","diamondcu","directionscu","doverfcu","dupaco","dupagecu","dutchpoint","e2e-tests-partner","eaglecu","eaglecuportal","eastman","ecu","eecu","eecu-branch","eecu-ck","eecu-txu","eecu-yaa","efirstflight","elevationscu","elgacu","empowerfcu","enrichmentfcu","ent","envisioncu","esfcu","esl","etpcu","everwisecu","evolvefcu","fairwinds","familytrust","fcfcu","ffnm","fibrecu","figfcu","figma","firstccu","firstcitycu","firstcomcu","firstcommercecu","firstcommunity","firstcu","firstent","firstfcu","firstfinancial","firstflorida","firstlightfcu","firstmarkcu","firsttechfed","firstus","fitzsimonscu","flcu","fmfcu","fncu","foothillcu","forumcu","foundersfcu","foxcredit","foxcu","fpcu","freedomcu","freedomfirst","freeway","frontierccu","frontiercreditunion","frontwavecu","frontwavecu-military","fsucu","ftwccu","gatherfcu","gaya","gcefcu","gecreditunion","georgiasown","gesa","getrevvup","gfafcu","glcu","goaffcu","goamplify","gogulfwinds","golden1","gpcu","greatbasin","greenstate","greenteam","greenvillefcu","growfinancial","gtfcu","guardiancu","gucu","gucu-fastlane","gucu-yaa","gwcu","hawaiistatefcu","hawaiiusafcu","hcu","hebfcu","hfcuvt","hicommfcu","hiwaycu","hondafcu","honorcu","huecu","hughesfcu","huntingtonbeachcu","hvcu","iccreditunion","iccu","iceberg","idbglobalfcu","idealcu","ie-demo","ihcreditunion","ihmvcu","ihmvcu-train","ilendingdirect","imaginefcu","imcu","industrialcu","infuzecu","inovafederal","interiorfcu","interracu","iqcu","itcu","iucu","jaimecu","jakeonboarding","jaxfcu","jdcu","jfcu","jhfcu","jillsandbox","jimmycu","joaocu","jovia","kctcu","kellycommunity","kemba","kfcu","kinecta","kirtlandfcu","kitsapcu","kohlercu","kpcu","lacapfcu","lafcu","laketrust","langleyfcu","lapfcu","launchcu","lemonade-team","levine","lfcu","lgeccu","libertyfcu","lily-sandbox","listerhill","loancenter","loancenterportal","loansbyworld","logixbanking","macu","mainestatecu","mapscu","mariana-sandbox","marinefederalcu","mattbrocu","mayocreditunion","mazuma","mccu","mecu","memberonefcu","membersalliance","membersccu","merckcu","meriwest","metrocu","michedcu","michiganfirst","midflorida","minnco","missionfed","mitfcu","mmfcu","mocse","msdfcu","mvcu","mvfcu","mwafcu","mycccu","myconsumers","mydccu","myeecu","mygenfcu","myguardiancu","myhorizoncu","mymagnifi","mymax","mymeridiantrust","myncu","myoccu","mypsfcu","mypsfcucashout","myspire","mysunwest","myzing","nasafcu","navigatorcu","navyarmyccu","ncsecu","nechesfcu","necu","nefcu","neighborscu","neighborsfcu","ngfcu","nihfcu","noblecu","northcountry","northparkccu","nufcu","numarkcu","numericacu","nusenda","nuvisionfederal","nwcu","nymcu","oe3","oefederal","oliveira-demo","oneazcu","onecu","onenevada","orangecountyscu","oregonstatecu","ornlfcu","p1fcu","pacificservice","palisadesfcu","palmettocitizens","parkcitycu","parkcommunity","partnersfcu","patelco","patriotfcu","pccu","peachstatefcu","pedro-onboarding","penair","penfed","pfcu","pffcu","pimafederal","pmcu","poirotcu","premieramerica","progressive","providentcu","pscunow","psecu","psfcu","purduefed","purpleteam","quorumfcu","radiantcu","radificu","rategenius","rbfcu","rcu","redcanoecu","redcrown","redfcu","redteam","redteam-loanspq-api","red-team-sb","redwoodcu","refijet","revfcu","rfcu","rivermarkcu","rizecu","robinsfcu","rockvalleycreditunion","rockvalleycu","roguecu","rrcu","rtn","safecu","safefed","salalcu","samplenationalbank","sandia","sanfranciscofcu","scccu","sccfcu","sccu","scefcu","schoolsfirstfcu","scu","sdccu","sdfcu","seacomm","seattlecu","secumd","secunm","security-sandbox","secu.slb","se-demo1","se-demo10","se-demo2","se-demo3","se-demo4","se-demo5","se-demo6","se-demo7","se-demo8","se-demo9","se-demo-bao1","sefcu","selco","self-helpfcu","selfrelianceny","servicecu","sesloc","sfcu","sffirecu","sharonview","shellfcu","sierracentral","sikorskycu","silverstatecu","siskiyoucu","skylacu","skyone","slfcu","smcu","solaritycu","soundcu","southeastfinancial","southlandcu","spectrumcu","spero","srpfcu","ssfcu","starone","star-techfcu","startnewfinancial","statefarmfcu","statewidefcu","stcu","stmarysbank","stpaulfcu","suffolkcu","summitcreditunion","summitcu","summitfcu","suncoastcreditunion","suncoastcreditunion-fastlane","suneast","sunmark","swacu","swfinancial","sync1demo","synergyfcu","tctfcu","tcunet","tdecu","teachersfcu","techcu","telhio","tencu","test-cu","testyoel","texanscu","texastechfcu","texastrustcu","tfcu","thepolicecu","thriventcu","togethercu","towerfcu","training-1","training-2","training-3","transcendcu","traviscu","trianglecu","triusfcu","tropicalfcu","truecar","trueskycu","truitycu","truliantfcu","trumarkonline","trustage","trustonefinancial","truwest","ttcu","tucoemas","tulsafederalcu","tulsateacherscu","tvacreditunion","tvfcu","twinstarcu","tyndall","uccu","ucu","ufcu","ufirstcu","uhcu","uhfcu","umecreditunion","unclecu","unfcu","unifyfcu","unitedone","unitusccu","usalliance","usccreditunion","useagle","usecu","usffcu","ussfcu","uwcu","vacu","valleyfirstcu","valleystrong","vantagewest","vccuonline","vcu","velocitycu","veridiancu","veritycu","vermontcreditunions","verveacu","vibecreditunion","vibrantcreditunion","visionsfcu","vystarcu","wasatchpeaks","wccucreditunion","wcu","wealthcu","wecu","wellbyfinancial","weokie","wesaveyou","wescom","westconsincu","westerlyccu","westerracu","westmark","whitefishcu","widgetfinancial","wildfirecu","wingsfinancial","wingsfinancial-yaa","withclutch","wpccu","wpcu","wsecu","wsfcu","y12fcu","yellowteam","youracu","zealcu"];
            handleAliaslist(aliasList, "clutch-ext-iframe", "input__selection-list", "input__selection-item", "partner-alias");

            
        }
    }
    );
};
getOptions();