/**
 * Created by abhilekhsingh on 3/31/17.
 */



$(document).ready(function() {

    setRandomProblem();

    $(".tags-dropdown").find("li a").click(function(){
        $("#tags-button").html($(this).text()+' <span class="caret"></span>');
    });

    $(".levels-dropdown").find("li a").click(function(){
        $("#levels-button").html($(this).text()+' <span class="caret"></span>');
    });


    $('#next-button').click(function(){
        setRandomProblem();
    });


    function setRandomProblem() {
        $.get("problems/random", function(data, status){
            var submitButton = $("#submit-button");
            submitButton.attr('href', data['submitUrl']);
            //submitButton.removeAttr('style');
            $("#includedContent").html(data["html"]);
        });
    }
});

