function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

$(document).ready(function() {
    var savedID = localStorage.getItem("af-id");
    if(savedID) {
        $("#id-in").val(savedID);
    }

    $("#gen-but").click(function () {
        var newID = uuidv4();
        $("#id-in").val(newID);
        localStorage.setItem("af-id", newID);
    });

    $("#save-but").click(function () {
        var id = $("#id-in").val();
        localStorage.setItem("af-id", id);
    });
});