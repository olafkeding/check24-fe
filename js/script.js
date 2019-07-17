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

    function ajax(url) {
        var POST = "POST";
        var GET = "GET";

        function doRequest(method, data, callback){
            var request = new XMLHttpRequest();
            var paramsString = "";

            Object.keys(data).forEach(function(key) {
                paramsString += key + "=" + data[key] + "&";
            });

            if(method === GET) {
                url += "?" + paramsString;
            }

            request.open(method, url, true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    var parsedData;
                    try {
                        parsedData = JSON.parse(request.responseText);

                    } catch (error) {
                        callback({status: "ERROR", message: "cannot parse response"});
                    }
                    callback({status: "SUCCESS", data: parsedData});

                } else {
                    // We reached our target server, but it returned an error
                    callback({status: "ERROR", message: "no data"});

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
            //TODO #1
            //- use the get function to load the ort options form the server
            //- Url: http://schulung.bloffen.de/ajax/plz_lookup.php?plz={PLZ_VALUE}
            //- the API supports two plz: "81539" and "16845"
            //- only dispatch the call if the user entered 5 digits
            //- if the server returns an empty list, show an error in the element with the class "error"
            //- if the server does return one option, display it in a span with the class "ort-label"
            //- if the server returns more than one option, display then in the select element with the name "city"
            //- sync the value of the city into the hidden input field with the ID city
            //- if both zipcode and city have a valid value, show th button <button type="submit">SEND</button>
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
