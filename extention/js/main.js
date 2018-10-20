$(document).ready(function() {
    console.log(localStorage.getItem("af-id"));

    var userID = localStorage.getItem("af-id");
    var url = "http://activeflow.kosmose.online";

    var importance_match = {
        0: 'panel-info',
        1: 'panel-warning',
        2: 'panel-danger'
    };

    var completeTask = function (_id) {
        $.ajax({
            url: url+"/complete/"+userID,
            type: "POST",
            data: _id,
            dataType: 'json'
        }).done(function (msg) {
            location.reload();
        });
    };

    var deleteTask = function (_id) {
        $.ajax({
            url: url+"/delete/"+userID,
            type: "POST",
            data: _id,
            dataType: 'json'
        }).done(function (msg) {
            location.reload();
        });
    };

    var restageTask = function (_id, _stage) {
        $.ajax({
            url: url + "/restage/"+_stage+"/"+userID,
            type: "POST",
            data: _id,
            dataType: 'json'
        }).done(function (msg) {
            location.reload();
        })
    };

    var setData = function (msg) {
        var data = {
            "todo": [],
            "progress": [],
            "backlog": []
        };

        console.log(msg);

        for(var i = 0; i < msg.length; i++) {
            var taskToRender = {};

            taskToRender.title = msg[i].title;
            taskToRender.description = msg[i].description;
            taskToRender.id = msg[i]._id.$oid;
            taskToRender.importance = importance_match[msg[i].importance];
            taskToRender.stage = msg[i].stage;

            data[taskToRender.stage].push(taskToRender);
        }

        var listTmpl = $.templates("#listItemTemplate");
        if(msg.length > 0) {
            $("#tasksListTodo").html(listTmpl.render(data["todo"]));
            $("#tasksListProgress").html(listTmpl.render(data["progress"]));
            $("#tasksListBacklog").html(listTmpl.render(data["backlog"]));
        }

        $('.deleteButton').click(function () {
            deleteTask($(this).data("site"));
        });

        $('.completeButton').click(function () {
            completeTask($(this).data("site"));
        });

        $('.restageButton').click(function () {
            restageTask(
                $(this).data("site"),
                $(this).data("stage")
            );
        });
    };

    if(userID) {
        if(localStorage.getItem(userID)) {
            setData(JSON.parse(localStorage.getItem(userID)));
        }

        $.ajax({
            url: url+"/get/"+userID,
            dataType: "json"
        }).done(function(msg) {
            setData(msg);
            localStorage.setItem(userID, JSON.stringify(msg));
        });
    }

    $("#new-post").click(function () {
        formData = {
            title: $("#title-new").val(),
            importance: $("#importance-new").val(),
            description: $("#desc").val()
        };

        $.ajax({
            url: url+"/add/"+userID,
            type: "POST",
            data: JSON.stringify(formData),
            dataType: "json"
        }).done(function (msg) {
            console.log(msg);
            location.reload();
        });
    });

    $("#new-but").click(function () {
        if(localStorage.getItem("af-id")) {
            $("#form").collapse('toggle');
        } else {
            $("#notifyier").collapse('toggle');
        }
    });

    $('#desc').summernote({
        height: 100,
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link']]
        ],
        placeholder: "Description"
    });
    $('select').selectpicker({
        style: 'btn-default',
        size: 3
    });
});
