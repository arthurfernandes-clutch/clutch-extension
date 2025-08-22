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
    let resetSt = document.createElement("link");
    resetSt.rel = "stylesheet";
    resetSt.href = "https://arthurfernandes-clutch.github.io/clutch-extension/source/reset.css";

    let styleSt = document.createElement("link");
    styleSt.rel = "stylesheet";
    styleSt.href = "https://arthurfernandes-clutch.github.io/clutch-extension/source/source.css";
    
    addedIframe.contentWindow.document.head.append(resetSt),
    addedIframe.contentWindow.document.head.append(styleSt);
    return addedIframe;

}

const setOpenCloseEvent = (iframeId) => {
    let closeAtt = `width: 50px; height: 50px; border-radius: 100%; min-height: 0px;`;
    let iframe = document.querySelector(`#${iframeId}`);

    window.addEventListener("click", (evt) => {
        if (evt.target.closest("body").id != "body__clutch-ext") {
            iframe.contentWindow.document.body.classList.remove("body_active");
            iframe.setAttribute('style', iframe.getAttribute('style') + closeAtt);
            cleanInputs(["#partner-alias"],iframe.contentWindow.document);
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
        cleanInputs(["#partner-alias"],iframe.contentWindow.document);
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

const cleanInputs = (inputs = [], container) => {
    inputs.forEach((i) => {
        container.querySelector(i).value = "";
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