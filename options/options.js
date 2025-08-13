window.addEventListener("load", () => {
  let optionMenus = document.querySelectorAll(".options-section");
  optionMenus.forEach((menu) => {
    menu
      .querySelector(".section-title")
      .addEventListener("click", (evt) =>
        menu.classList.toggle("options-section_open")
      );
    menu
      .querySelector(".section-handler")
      .addEventListener("click", (evt) =>
        menu.classList.toggle("options-section_open")
      );
  });

  // Saves options to chrome.storage
  const saveOptions = () => {
    let activateExtension = document
      .querySelector("#extension-option .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;
    let activateDarkmode = document
      .querySelector("#dark-mode .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;
    let pos = document
      .querySelector("#position .option__select-items");
    let position = pos.options[pos.selectedIndex].value;
      
    let links = document
      .querySelectorAll(".option_links .link").length > 0
      ? document.querySelectorAll(".option_links .link")
      : [];
    let linksToadd = [];
    links.forEach((l) => {
      linksToadd.push({
        title: l.querySelector(".link__title-container .link__input").value,
        url: l.querySelector(".link__url-container .link__input").value
      });
    });

      let dao = document
      .querySelector("#dao-sandbox .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;

      let lending = document
      .querySelector("#lending-sandbox .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;

      let branch = document
      .querySelector("#branch-sandbox .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;

    


    chrome.storage.sync.set(
      {
        extension: activateExtension,
        datafeed: activateDarkmode,
        position: position,
        linksList: linksToadd,
        dao: dao,
        lending: lending,
        branch: branch,
      },
      () => {
        // Update status to let user know options were saved.
        const status = document.querySelector(".action__status");
        status.textContent = "Options saved!";
        setTimeout(() => {
          status.textContent = "";
        }, 750);
        setTimeout(() => {
          chrome.runtime.reload();
        }, 1500);
      }
    );
  };

  // Reset options after saving
  const resetOptions = () => {
    chrome.storage.sync.set(
      {
        extension: true,
        datafeed: true,
        position: "right-bottom",
        linksList: [],
        dao: true,
        lending: true,
        branch: true,
      },
      () => {
        // Update status to let user know options were saved.
        const status = document.querySelector(".action__status");
        status.textContent = "Options Reseted!";
        setTimeout(() => {
          status.textContent = "";
        }, 750);
        setTimeout(() => {
          chrome.runtime.reload();
        }, 1500);
      }
    );
  };
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      {
        extension: true,
        datafeed: true,
        position: "right-bottom",
        linksList: [],
        dao: true,
        lending: true,
        branch: true,
      },
      (items) => {
        items.extension
          ? document
              .querySelector("#extension-option .option__selection")
              .classList.add("option__selection_selected")
          : "";
        items.datafeed
          ? document
              .querySelector("#dark-mode .option__selection")
              .classList.add("option__selection_selected")
          : "";
          let pos = document
            .querySelectorAll("#position .option__select-item");
            pos.forEach((item) => {
              items.position == item.value ? item.selected = true : item.removeAttribute('selected');
            });
          items.dao
          ? document
              .querySelector("#dao-sandbox .option__selection")
              .classList.add("option__selection_selected")
          : "";
          items.lending
          ? document
              .querySelector("#lending-sandbox .option__selection")
              .classList.add("option__selection_selected")
          : "";
          items.branch
          ? document
              .querySelector("#branch-sandbox .option__selection")
              .classList.add("option__selection_selected")
          : "";
          
        if ( items.linksList.length > 0 ) {
          let cont = document.querySelector(".option_links");
          items.linksList.forEach((l) => {
            let newLink = document.createElement("div");
            newLink.classList.add("link");
            newLink.innerHTML = `
            <div class="link__title-container">
              <p class="link__title">Title:</p>
              <input class="link__input" type="text" max="30" value="${l.title}">
            </div>
            <div class="link__url-container">
              <p class="link__title">Url:</p>
              <input class="link__input" type="text" value="${l.url}">
            </div>
            <p class="link__delete">Delete Link</p>
            `;
            cont.append(newLink);
          });
          document.querySelectorAll(".link").forEach((item) => {
            item.querySelector(".link__delete").addEventListener("click", () => {
              item.remove();
            });
          });
          items.linksList.length == 10 ? document.querySelector("#links-options .option__button").classList.add("option__button_disable") : document.querySelector("#links-options .option__button").classList.remove("option__button_disable");
        }

        if (
          !document
            .querySelector("#extension-option .option__selection")
            .classList.contains("option__selection_selected")
        ) {
          document
            .querySelector("#general-options")
            .classList.add("options-section_disable");
          document
            .querySelector("#links-options")
            .classList.add("options-section_disable");
          document
            .querySelector("#extra-options")
            .classList.add("options-section_disable");
        }
      }
    );
  };

  let options = document.querySelectorAll(".option__selection");
  options.forEach((op) => {
    op.addEventListener("click", (evt) => {
      op.classList.toggle("option__selection_selected");

      // Handle general options
      if (
        op.parentNode.id == "extension-option" &&
        op.classList.contains("option__selection_selected")
      ) {
        document
          .querySelector("#general-options")
          .classList.remove("options-section_disable");
        document
          .querySelector("#links-options")
          .classList.remove("options-section_disable");
        document
          .querySelector("#extra-options")
          .classList.remove("options-section_disable");
      } else if (op.parentNode.id == "extension-option") {
        document
          .querySelector("#general-options")
          .classList.add("options-section_disable");
        document
          .querySelector("#links-options")
          .classList.add("options-section_disable");
        document
          .querySelector("#extra-options")
          .classList.add("options-section_disable");
      }
    });
  });

  restoreOptions();
  /* EVENT LISTENERS */
  // Save Option
  document
    .querySelector("#save .action__button")
    .addEventListener("click", saveOptions);
    // Reset Option
  document
    .querySelector("#reset .action__button")
    .addEventListener("click", resetOptions);
    // Add New Link Option
    let linkCont = document
      .querySelector("#links-options");
    let linkAddcont = linkCont.querySelector(".option_links");
    linkCont
      .querySelector(".option__button").addEventListener("click", () => {
        if (linkCont.querySelectorAll(".link").length < 10) {
          let newLink = document.createElement("div");
          newLink.classList.add("link");
          newLink.innerHTML = `
          <div class="link__title-container">
            <p class="link__title">Title:</p>
            <input class="link__input" type="text" max="30" value="">
          </div>
          <div class="link__url-container">
            <p class="link__title">Url:</p>
            <input class="link__input" type="text" value="">
          </div>
          <p class="link__delete">Delete Link</p>
          `;
          linkAddcont.append(newLink);
          newLink.querySelector(".link__delete").addEventListener("click", () => {
            newLink.remove();
            linkAddcont.querySelectorAll(".link").length < 10 ? linkCont
      .querySelector(".option__button").classList.remove("option__button_disabled") : "";
          });
          linkAddcont.querySelectorAll(".link").length < 10 ? "" : linkCont
      .querySelector(".option__button").classList.add("option__button_disabled");
        }        
      });
});
