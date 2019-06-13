import { documentReady } from "./domUtils.js";
import { plzSearch } from "./plzSearch.js";

documentReady(() => {
    plzSearch(document.getElementById("plz"),
              document.querySelector('#field_plzort select[name="ort"]'),
              document.querySelector('#field_plzort .ort-label'),
              document.querySelector('#field_plzort .error-text')
        );
});