document.addEventListener("DOMContentLoaded", () => {
    const popupLinks = document.querySelectorAll("[data-popup-link]");
    const popupModals = document.querySelectorAll(".popup");
    const body = document.body;

    function popupShow(popup) {
        popupModals.forEach(elem => elem.classList.remove("show"));
        popup.classList.add("show");
        body.style.cssText = `
            overflow: hidden;
            padding-right: ${getWidthScrollBar()}px;
            `;
    }

    function popupHidden() {
        popupModals.forEach(elem => elem.classList.remove("show"));
        body.style.cssText = `
            overflow: "",
            margin-right: 0,
        `;
    }

    function getWidthScrollBar() {
        const body = document.querySelector("body");

        let div = document.createElement("div"),
            result = null;

        div.style.cssText = `
          width: 50px;
          height: 50px;
          overflow-y: scroll;
          visibility: hidden;
        `;

        body.append(div);

        result = div.offsetWidth - div.clientWidth;
        div.remove();

        return result;
    }

    popupLinks.forEach(elem => {
        elem.addEventListener("click", function () {
            const popupWindow = this.parentNode.querySelector(".popup");

            if (popupWindow && !popupWindow.classList.contains("show")) {
                popupShow(popupWindow)
            }

            if (popupWindow && popupWindow.classList.contains("show")) {
                popupWindow.addEventListener("click", (event) => {
                    if (event.target.closest(".popup_close-btn") ||
                        event.target.classList.contains("popup_content-wrapper") ||
                        event.target.classList.contains("popup")) {
                        popupHidden();
                    }
                })
            }
        })
    })
})