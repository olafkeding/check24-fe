import { get, AJAX_SUCCESS } from "./ajax.js";
import  { hide, createOption, removeAllChildren } from "./domUtils.js";

const PLZ_ENDPOINT = "plz_lookup.php";

export const plzSearch = (plzElement, selectElement, spanElement, errorElement) => {
    plzElement && plzElement.addEventListener("input", async function() {
        const plz = this.value;

        if(plz.length === 5) {
            const response = await get(PLZ_ENDPOINT, {plz});

            hide(selectElement);
            hide(spanElement);
            hide(errorElement);
            if(response.status === AJAX_SUCCESS) {
                const data = response.data;
                if(data.length > 1) {
                    //select
                    removeAllChildren(selectElement);
                    selectElement.appendChild(createOption("-- Bitte wählen --", "null"));
                    data.forEach(entry =>{
                        selectElement.appendChild(createOption(entry));
                        selectElement.style.display = "inline-block";
                    });

                } else if(data.length === 1) {
                    //span
                    spanElement.innerText = data[0];
                    spanElement.style.display = "inline-block";
                } else {
                    //error
                    errorElement.innerText = "bitte geben Sie eine gültige PLZ ein";
                    errorElement.style.display = "block";

                }
            } else {
                errorElement.style.display = "block";
                errorElement.innerText = "es ist ein Fehler aufgetreten";
            }
        }
    });
};

