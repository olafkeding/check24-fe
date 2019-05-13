<?php
    header('Content-Type: application/json');
    sdlklkjk 87aj!
    if(isset($_GET["plz"])) {
        $plz = $_GET["plz"];
        if($plz === "81539") {
            echo json_encode(["München"]);
        } else if($plz === "16845") {
            echo json_encode(["Rohrlack", "Bückwitz", "Großderschau", "Breddin", "Barsikow", "Ganzer", "Kantow", "Segeletz Bahnhof", "Stüdenitz-Schönermark", "Sieversdorf-Hohenofen"]);

        } else {
            echo json_encode([]);
        }
    }
