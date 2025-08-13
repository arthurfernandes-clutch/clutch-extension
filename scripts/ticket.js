window.addEventListener("load", () => {
    let transactionBlock = document.querySelector("#transaction-block");
   
    if (window.location.href.includes("adminDetailsMerchant.cfm")) {
        const observer = new MutationObserver(() => {
            if (transactionBlock.querySelector("#transDisplayClassic") != null) {
                appendColor();
            }
        });
        
        observer.observe(transactionBlock, {
            subtree: true,
            childList: true,
        });
    }

    // Decode URL
  const decodeUrl = (inp, container, placeContainer) => {
        if (placeContainer.querySelector(".decode-transaction__decoded") == null) {
            let decodedUrl = decodeURIComponent(inp);
            let mainUrl =
            decodedUrl.indexOf("?") > 0 ? decodedUrl.split("?")[0] : false;
            let queryParams = mainUrl
            ? decodedUrl.split("?")[1].split("&")
            : decodedUrl.split("&");

            container.innerHTML = `<p class="decode-transaction__pixel">${decodedUrl}</p>`

            queryParams.forEach((param) => {
                if (param != "" && param != "Full Query String:") {
                    let newParam = document.createElement("p");
                    newParam.classList.add("decode-transaction__parameter");
                    newParam.textContent = param;
                    
                    switch (param.substring(0, param.indexOf("=")).toLowerCase().trim()) {
                        case "sscid":
                            newParam.classList.add("color-guide__bullet_itp");
                            break;
                        case "sscidmode":
                            newParam.classList.add("color-guide__bullet_itp");
                            break;
                        case "currency":
                            newParam.classList.add("color-guide__bullet_currency");
                            break;
                        case "quantitylist":
                            newParam.classList.add("color-guide__bullet_sku");
                            break;
                        case "skulist":
                            newParam.classList.add("color-guide__bullet_sku");
                            break;
                        case "pricelist":
                            newParam.classList.add("color-guide__bullet_sku");
                            break;
                        case "couponcode":
                            newParam.classList.add("color-guide__bullet_coupon");
                            break;
                        case "storeid":
                            newParam.classList.add("color-guide__bullet_storesconnect");
                            break;
                        case "amount":
                            newParam.classList.add("color-guide__bullet_amount");
                            break;
                        case "v":
                            newParam.classList.add("color-guide__bullet_version");
                            break;
                        case "xtype":
                            newParam.classList.add("color-guide__bullet_xtype");
                            break;
                        case "tracking":
                            newParam.classList.add("color-guide__bullet_tracking");
                            break;
                        case "newcustomer":
                            newParam.classList.add("color-guide__bullet_newcustomer");
                            break;
                        case "transtype":
                            newParam.classList.add("color-guide__bullet_transtype");
                            break;
                        case "version":
                            newParam.classList.add("color-guide__bullet_api");
                            break;
                        case "format":
                            newParam.classList.add("color-guide__bullet_api");
                            break;
                        case "devopts":
                            newParam.classList.add("color-guide__bullet_api");
                            break;
                        case "cart":
                            newParam.classList.add("color-guide__bullet_api");
                            break;
                        case "userid":
                            newParam.classList.add("color-guide__bullet_api");
                            break;
                        case "token":
                            newParam.classList.add("color-guide__bullet_api");
                            break;
                        case "xmlformat":
                            newParam.classList.add("color-guide__bullet_api");
                            break;
                        case "action":
                            newParam.classList.add("color-guide__bullet_api");
                            break;
                    }
                    container.append(newParam);
                }
            });

            placeContainer.append(container);
        } else {
            placeContainer.querySelector(".decode-transaction__decoded").remove();
        }
    };

    const appendColor = () => {
        if (document.querySelector("#color-guide") == null) {
            let style = document.createElement("style");
            style.id = "sas-ext-style";
            style.innerHTML = `
                .color-guide {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                    column-gap: 15px;
                    row-gap: 5px;
                    margin: 0;
                    padding: 10px;
                }
                .color-guide__title {
                    text-align: center;
                    font-weight: 700;
                    width: 100%;
                    margin: 0;
                    padding: 0;
                    margin-bottom: 5px;
                    border-bottom: 1px solid #919191;
                }
                .color-guide__item {
                    margin: 0;
                    padding: 5px 10px;
                    border-radius: 4px;
                }
                .color-guide__item_itp {
                    background: #ff5a1e;
                }
                .color-guide__item_currency {
                    background: #e6c200;
                }
                .color-guide__item_sku {
                    background: #839deb;
                }
                .color-guide__item_coupon {
                    background: #44c17b;
                }
                .color-guide__item_storesconnect {
                    background: #ffaf4d;
                }
                .color-guide__item_amount {
                    background: #0b6655;
                    color: #ffffff;
                }
                .color-guide__item_version {
                    background: #72e600;
                }
                .color-guide__item_xtype {
                    background: #e499e2;
                }
                .color-guide__item_tracking {
                    background: #890000;
                    color: #ffffff;
                }
                .color-guide__item_newcustomer {
                    background: #b2ffe5;
                }
                .color-guide__item_transtype {
                    background: #676767;
                    color: #ffffff;
                }
                .color-guide__item_api {
                    background: #2c5b99;
                    color: #ffffff;
                }
                .decode-transaction__button {
                    width: fit-content;
                    background: #0852a5;
                    color: #ffffff;
                    text-transform: uppercase;
                    padding: 5px 10px;
                    margin: 10px 0;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all .75s ease;
                    opacity: 1;
                }
                .decode-transaction__button:hover {
                    opacity: .5;
                }
                .decode-transaction__decoded {
                    display: flex;
                    flex-wrap: wrap;
                    column-gap: 5%;
                    font-size: 16px;
                }
                .decode-transaction__pixel {
                    width: 100%;
                    margin: 0;
                    margin-bottom: 10px;
                    padding: 0;
                    word-break: break-all;
                }
                .decode-transaction__parameter {
                    display: flex;
                    align-items: center;
                    column-gap: 5px;
                    width: 30%;
                    max-width: 30%;
                    word-break: break-word;
                    overflow-wrap: break-word;
                    line-height: 1;
                    margin: 0;
                    padding: 5px 0;
                }
                .decode-transaction__parameter:before {
                    content: "";
                    width: 9px;
                    height: 9px;
                    max-width: 9px;
                    max-height: 9px;
                    min-width: 9px;
                    min-height: 9px;
                    border-radius: 50%;
                    background: #676767;
                }
                .color-guide__bullet_itp:before {
                    background: #ff5a1e;
                }
                .color-guide__bullet_currency:before {
                    background: #e6c200;
                }
                .color-guide__bullet_sku:before {
                    background: #839deb;
                }
                .color-guide__bullet_coupon:before {
                    background: #44c17b;
                }
                .color-guide__bullet_storesconnect:before {
                    background: #ffaf4d;
                }
                .color-guide__bullet_amount:before {
                    background: #0b6655;
                }
                .color-guide__bullet_version:before {
                    background: #72e600;
                }
                .color-guide__bullet_xtype:before {
                    background: #e499e2;
                }
                .color-guide__bullet_tracking:before {
                    background: #890000;
                }
                .color-guide__bullet_newcustomer:before {
                    background: #b2ffe5;
                }
                .color-guide__bullet_transtype:before {
                    background: #676767;
                }
                .color-guide__bullet_api:before {
                    background: #2c5b99;
                }
            `;
            document.querySelector("#transSearch").append(style);
            let subContainer = document.querySelector("#transSearch .detailsSearchBox");
            let subtitle = document.createElement("div");
            subtitle.id = "color-guide", subtitle.classList.add("color-guide");
            subtitle.innerHTML = `
            <p class="color-guide__title">Advanced Tracking Parameters</p>
            <p class="color-guide__item color-guide__item_itp">ITP Compliant</p>
            <p class="color-guide__item color-guide__item_currency">Currency</p>
            <p class="color-guide__item color-guide__item_sku">Product SKU parameters</p>
            <p class="color-guide__item color-guide__item_coupon">Coupon</p>
            <p class="color-guide__item color-guide__item_storesconnect">StoresConnect</p>
            <p class="color-guide__item color-guide__item_amount">Amount</p>
            <p class="color-guide__item color-guide__item_version">Version</p>
            <p class="color-guide__item color-guide__item_xtype">Xtype</p>
            <p class="color-guide__item color-guide__item_tracking">Order ID</p>
            <p class="color-guide__item color-guide__item_newcustomer">New Customer</p>
            <p class="color-guide__item color-guide__item_transtype">TransType</p>
            <p class="color-guide__item color-guide__item_api">API</p>
            `;

            subContainer.append(subtitle);

            let transactions = document.querySelector("#transDisplayClassic tbody").querySelectorAll("b");
            transactions.forEach((b) => {
                switch (b.textContent.toLowerCase().trim()) {
                    case "sscid":
                        b.classList.add("color-guide__item_itp");
                        break;
                    case "sscidmode":
                        b.classList.add("color-guide__item_itp");
                        break;
                    case "currency":
                        b.classList.add("color-guide__item_currency");
                        break;
                    case "quantitylist":
                        b.classList.add("color-guide__item_sku");
                        break;
                    case "skulist":
                        b.classList.add("color-guide__item_sku");
                        break;
                    case "pricelist":
                        b.classList.add("color-guide__item_sku");
                        break;
                    case "couponcode":
                        b.classList.add("color-guide__item_coupon");
                        break;
                    case "storeid":
                        b.classList.add("color-guide__item_storesconnect");
                        break;
                    case "amount":
                        b.classList.add("color-guide__item_amount");
                        break;
                    case "v":
                        b.classList.add("color-guide__item_version");
                        break;
                    case "xtype":
                        b.classList.add("color-guide__item_xtype");
                        break;
                    case "tracking":
                        b.classList.add("color-guide__item_tracking");
                        break;
                    case "newcustomer":
                        b.classList.add("color-guide__item_newcustomer");
                        break;
                    case "transtype":
                        b.classList.add("color-guide__item_transtype");
                        break;
                    case "version":
                        b.classList.add("color-guide__item_api");
                        break;
                    case "format":
                        b.classList.add("color-guide__item_api");
                        break;
                    case "devopts":
                        b.classList.add("color-guide__item_api");
                        break;
                    case "cart":
                        b.classList.add("color-guide__item_api");
                        break;
                    case "userid":
                        b.classList.add("color-guide__item_api");
                        break;
                    case "token":
                        b.classList.add("color-guide__item_api");
                        break;
                    case "xmlformat":
                        b.classList.add("color-guide__item_api");
                        break;
                    case "action":
                        b.classList.add("color-guide__item_api");
                        break;
                    case "full query string":
                        let currTr = b.parentElement.parentElement;
                        if (currTr.textContent.toLowerCase().trim() != "full query string:") {                       
                            let trBtn = document.createElement("p");
                            trBtn.classList.add("decode-transaction__button");
                            trBtn.textContent = "Decode this transaction";
                            currTr.append(trBtn);
                            
                            trBtn.addEventListener("click", () => {
                                trBtn.classList.toggle("decode-transaction__button_decoded");
                                trBtn.textContent = trBtn.classList.contains("decode-transaction__button_decoded") ?
                                "Reset" :
                                "Decode this transaction";
                            
                                let container = document.createElement("div");
                                container.classList.add("decode-transaction__decoded");
                                
                                decodeUrl(currTr.querySelector("font").textContent.trim().replace("Full Query String: ", ""), container, currTr);

                            });
                        }
                        break;
                }
            });

        }
    }

    if (window.location.href.includes("adminAjax.cfc")) {
        appendColor();
    }
    
});
