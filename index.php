<?php include "includes/top.php" ?>

<div id="my_app_container" class="container">

    <div class="statusbar">
        <div class="item visited">
            <div class="bubble">1</div>
            <div class="text">Kontakt</div>
        </div>
        <div class="item active">
            <div class="bubble">2</div>
            <div class="text">Antrag</div>
        </div>
        <div class="item">
            <div class="bubble">3</div>
            <div class="text">Zahlung</div>
        </div>
        <div class="item">
            <div class="bubble">&#x2714;</div>
            <div class="text">Fertig</div>
        </div>
    </div>

    <section class="form-container">
        <form name="data" action="/data">
            <section class="form-section">
                <h2 class="section-headline">Teil 1</h2>
                <div class="formrow">
                    <label for="dob_day">Geburtsdatum</label>
                    <div class="control-wrapper control-date" id="field_dob" data-help="help_dob">
                        <input type="text" id="dob_day" placeholder="TT" />
                        <input type="text" id="dob_month" placeholder="MM" />
                        <input type="text" id="dob_year" placeholder="YYYY" />
                        <input type="hidden" name="dob" />
                    </div>
                    <div class="help">
                        <span>?</span>
                    </div>
                </div>
            </section>

            <section class="form-section">
                <h2 class="section-headline">Teil 2</h2>
                <div class="formrow">
                    <label for="plz">Geburtsdatum</label>
                    <div class="control-wrapper control-plz" id="field_plzort" data-help="help_plzort">
                        <input type="text" id="plz" name="plz" />
                        <select name="ort">
                            <option name="dummy1">Dummy1</option>
                            <option name="dummy2">Dummy2</option>
                            <option name="dummy3">Dummy3</option>
                        </select>
                    </div>
                    <div class="help">
                        <span>?</span>
                    </div>
                </div>
            </section>

        </form>

        <div class="helpbar">
            <div class="help-content">
                <!-- Filled by JS -->
                <div class="help-text">
                    <div id="help_dob">
                        <h3>Knecht's Leben</h3>
                        <p>Mit seiner Aufnahme in die Elite war Knechts Leben auf eine andre Ebene verpflanzt, es war der erste
                            und entscheidende Schritt in seiner Entwicklung geschehen. </p>
                    </div>
                    <div id="help_plzort">
                        <h3>Aufnahme</h3>
                        <p>
                            Es geht durchaus nicht allen Eliteschülern
                            so, daß die amtliche Aufnahme in die Elite mit dem innern Erlebnis der Berufung zusammenfällt.
                            Das ist Gnade, oder wenn man es banal ausdrücken will: es ist ein Glücksfall.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="submit-container">
        <a href="/back">&laquo; zurück</a>
        <button class="submit-button">weiter &raquo;</button>
    </section>
</div>
<!-- EMBED:CHECK24_CONTENT_END -->

<?php include "includes/bottom.php" ?>
