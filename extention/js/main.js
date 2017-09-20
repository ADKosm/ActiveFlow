$(document).ready(function() {
    console.log(localStorage.getItem("af-id"));

    var userID = localStorage.getItem("af-id");
    var url = "http://localhost:9494";

    if(userID) {
        $.ajax({
            url: url+"/get/"+userID,
            dataType: "json"
        }).done(function (msg) {
            var data = [];

            console.log(msg);

            for(var i = 0; i < msg.length; i++) {
                var taskToRender = {};

                taskToRender.title = msg[i].title;
                taskToRender.description = msg[i].desc;

                data.push(taskToRender);
            }

            var listTmpl = $.templates("#listItemTemplate");
            if(msg.length > 0) $("#tasksList").html( listTmpl.render(data) );
        });
    }
});