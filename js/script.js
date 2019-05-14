;(function(){
    function documentReady(callback) {
        if (document.readyState === "complete") {
            callback();
        } else {
            document.addEventListener("DOMContentLoaded", callback);
        }
    };

    function removeAllChildren(node) {
        while(node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    //TODO
    //- change function so that it receives a parameter object as second argument {paramKey1 : "param1Value", paramKey2 : "param3Value"}
    //- make the get function accessible through a wrapper function "ajax" ajax(url).get(data, callback)
    //- add a function ajax(url).post(data, callback) that uses "POST" instead of "GET" as method
    //  - don't duplicate code
    //  - make sure the common function is private (not accessible through ajax().)

    function ajax(url) {
        var POST = "POST";
        var GET = "GET";

        function doRequest(method, data, callback){
            var request = new XMLHttpRequest();
            var paramsString = "";

            for(var key in data){
                if(data.hasOwnProperty(key)) {
                    paramsString += key + "=" + data[key] + "&";
                }
            }

            if(method === GET) {
                url += "?" + paramsString;
            }

            request.open(method, url, true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    try {
                        callback({status: "SUCCESS", data : JSON.parse(request.responseText)});
                    } catch (error) {
                        callback({status: "ERROR", message : "cannot parse response: " + error.message});
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

            if(method === POST) {
                http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                request.send(paramsString);
            } else {
                request.send();
            }
        }

        return {
            get: function(data, callback) {doRequest(GET, data, callback)},
            post: function(data, callback) {doRequest(POST, data, callback)}
        }
    }

    /*Form Events*/
    documentReady(function(){
        var plzElement = document.getElementById("plz");
        plzElement.addEventListener("input", function(event) {
            //TODO
            //- use the get function (or ajax().get) to load the ort options form the server. The API supports two plz: "81539" and "16845"
            //- only dispatch the call if the user entered 5 digits
            //- if the server does not return a plz, show an error
            //- if the server does return one option, display it in a span with the class "ort-label"
            //- if the server returns more than one option, display then in the select element with the name "ort"
            var val = this.value;
            if(val.length === 5) {
                ajax("/plz_lookup.php").get({plz: val}, function(response){
                    var data;
                    var select = document.querySelector('#field_plzort select[name="ort"]');
                    var span = document.querySelector('#field_plzort .ort-label');
                    var error = document.querySelector('#field_plzort .error-text');
                    select.style.display = "none";
                    span.style.display = "none";
                    error.style.display = "none";
                    if(response.status === "SUCCESS") {
                        data = response.data;
                        if(data.length > 1) {
                            //select
                            removeAllChildren(select);
                            var nullOption = document.createElement("option");
                            nullOption.value = "null";
                            nullOption.innerText = "-- Bitte wählen --";
                            select.appendChild(nullOption);
                            data.forEach(function(entry){
                                var opt = document.createElement("option");
                                opt.value = entry;
                                opt.innerText = entry;
                                select.appendChild(opt);
                                select.style.display = "inline-block";
                            });

                        } else if(data.length === 1) {
                            //span
                            span.innerText = data[0];
                            span.style.display = "inline-block";
                        } else {
                            //error
                            error.innerText = "bitte geben Sie eine gültige PLZ ein";
                            error.style.display = "block";

                        }
                    } else {
                        error.style.display = "block";
                        span.innerText = "es ist ein Fehler aufgetreten";
                    }
                });
            }
        });
    });

}());
