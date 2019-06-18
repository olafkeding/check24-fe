;(function(){
    function documentReady(callback) {
        if (document.readyState === "complete") {
            callback();
        } else {
            document.addEventListener("DOMContentLoaded", callback);
        }
    };

    //TODO #2
    //- change function so that it receives a parameter object as second argument {paramKey1 : "param1Value", paramKey2 : "param3Value"}
    //- make the get function accessible through a wrapper function "ajax" ajax(url).get(data, callback)
    //- add a function ajax(url).post(data, callback) that uses "POST" instead of "GET" as method
    //- don't duplicate code
    //- make sure the common function is private (not accessible through ajax().)

    function get(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                try {
                    callback({status: "SUCCESS", data : JSON.parse(request.responseText)});
                } catch (error) {
                    callback({status: "ERROR", message : "cannot parse response"});
                }

            } else {
                // We reached our target server, but it returned an error
                callback({status: "ERROR", message : "no data"});

            }
        };

        request.onerror = function(event) {
            // There was a connection error of some sort
            callback({status: "ERROR", message : event});
        };

        request.send();
    }

    /*Form Events*/
    documentReady(function(){
        var plzElement = document.getElementById("plz");
        plzElement.addEventListener("input", function(event) {
            //TODO #1
            //- use the get function (or ajax().get) to load the ort options form the server. The API supports two plz: "81539" and "16845"
            //- only dispatch the call if the user entered 5 digits
            //- if the server does not return a plz, show an error
            //- if the server does return one option, display it in a span with the class "ort-label"
            //- if the server returns more than one option, display then in the select element with the name "ort"
            console.log(this.value);
        });
    });

}());
