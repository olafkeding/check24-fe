;(function () {
    function documentReady(callback) {
        if (document.readyState === "complete") {
            callback();
        } else {
            document.addEventListener("DOMContentLoaded", callback);
        }
    };

    function removeAllChildren(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    };

    function hideElement(element) {
        element.style.display = "none";
    };

    function createOption(text, value) {
        const opt = document.createElement("option");
        opt.value = typeof value !== "undefined" ? value : text;
        opt.innerText = text;
        return opt;
    };

    //TODO #2
    //- the old Plz-Api has ben deprecated (oh no!)
    //- this is the new api, it only supports POST : http://schulung.bloffen.de/ajax/plz_lookup.2.php
    //- change  the function below, so that it receives a parameter object as second argument {paramName1 : "param1Value", paramName2 : "param3Value"}
    //- make the get function accessible through a wrapper function "ajax" ajax(url).get(data, callback)
    //- add a function ajax(url).post(data, callback) that uses "POST" instead of "GET" as method
    //   - use the header 'Content-Type': 'application/x-www-form-urlencoded' (request.setRequestHeader)
    //   - POST parameters are passes as a query string in the request body (request.send(paramsString))
    //- use that function int the plz lookup
    //- don't duplicate code
    //- make sure the common function is private (not accessible through ajax().)

    function get(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                try {
                    var parsedData = JSON.parse(request.responseText);

                } catch (error) {
                    callback({status: "ERROR", message: "cannot parse response"});
                }
                callback({status: "SUCCESS", data: parsedData});

            } else {
                // We reached our target server, but it returned an error
                callback({status: "ERROR", message: "no data"});

            }
        };

        request.onerror = function (event) {
            // There was a connection error of some sort
            callback({status: "ERROR", message: event});
        };

        request.send();
    }

    /*Form Events*/
    documentReady(function () {
        var plzElement = document.getElementById("zipcode");
        plzElement.addEventListener("input", function (event) {
            //TODO #1
            //- use the get function to load the ort options form the server
            //- Url: http://schulung.bloffen.de/ajax/plz_lookup.php?plz={PLZ_VALUE}
            //- the API supports two plz: "81539" and "16845"
            //- only dispatch the call if the user entered 5 digits
            //- if the serverreturns an empty list, show an error in the element with the class "error"
            //- if the server does return one option, display it in a span with the class "ort-label"
            //- if the server returns more than one option, display then in the select element with the name "city"
            //- sync the value of the city into the hidden input field with the ID city
            //- if both zipcode and city have a valid value, show th button <button type="submit">SEND</button>
            console.log(this.value);
        });
    });

}());
