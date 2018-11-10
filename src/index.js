'use strict';

const {Elm} = require('./Main');
var app = Elm.Main.init();

app.ports.fileSelected.subscribe(id => {
    var node = document.getElementById(id);
    if (node === null) {
        return;
    }

    // Only supports the upload of one file atm
    var file = node.files[0];
    var reader = new FileReader();

    // FileReader API is evnt based. Once a file
    // is selected, it fires events. We hook into
    // `onload` event for our reader.
    reader.onload = (event => {
        // The event carries the `target`, which
        // is the file that was selected. The result
        // is base64 encoded contents of the file.
        var base64encoded = event.target.result;
        // We build up the `FilePortData` object here
        // that will be passed to our Elm runtime
        // through the `fileContentRead` subscription
        var portData = {
            contents: base64encoded,
            filename: file.name
        };

        // We call the `fileContentRead` port with the
        // file data which will be sent to our Elm
        // runtime via Subscriptions.
        app.ports.fileContentRead.send(portData);
    });

    // Connect our FileReader with the file was
    // selected in our `input` node.
    reader.readAsDataURL(file);
});
