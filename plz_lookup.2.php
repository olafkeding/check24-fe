<?php
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    if(isset($_POST["plz"])) {
        $plz = $_POST["plz"];
        if($plz === "81539") {
            echo json_encode(["München"]);
        } else if($plz === "16845") {
            echo json_encode(["Rohrlack", "Bückwitz", "Großderschau", "Breddin", "Barsikow", "Ganzer", "Kantow", "Segeletz Bahnhof", "Stüdenitz-Schönermark", "Sieversdorf-Hohenofen"]);
        } else if($plz === "52511") {
            echo json_encode(["Geilenkirchen"]);
        } else {
            echo json_encode([]);
        }
    }
