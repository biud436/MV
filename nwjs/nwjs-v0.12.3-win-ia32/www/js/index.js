$(function() {

    "use strict";

    $("#embedpollfileinput").change(function(e) {

        /** @type {File} */
        const file = e.target.files[0];
        const fileReader = new FileReader();

        $("#input-path").val(file.name);

        fileReader.readAsText(file);
        fileReader.onload = function(e) {
            $("#input-context").append(
                `<span style="white-space: pre-line">${e.target.result}</span>`
            );
        };

        if(file.type === "text/html") {
            window.open(file.path, "_self");
        }

    });

});

$().ready(function() {
    $("#input-path").attr("placeholder", location.href);
});