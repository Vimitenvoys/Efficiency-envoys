$("document").ready(function(){
    //$("#").click()
    $("#img1").click(function(){
        $("#img1").animate({"margin-right":"900%","width":"10%"},{duration:9000});
        $("#img2").animate({"margin-left":"900%"});
        $("#img3").animate({"margin-left":"900%"});
        $("#img4").animate({"margin-left":"900%"},{delay:100});

    });

    $("#img2").click(function(){
        $(".gridLayout").animate({"grid-template-columns":"0fr 0fr 1fr 1fr 0fr 0fr 0fr 0fr"});


});
$("#back").click(function(){
    $("#img1").animate({"transform":"translateX(90%)"});
    $("#img2").animate({"margin-left":"-900%"},{delay:100});
    $("#img3").animate({"margin-left":"-900%"});
    $("#img4").animate({"margin-left":"900%"},{delay:100});

});

$("#img2").click(function(){
    document.getElementById("#img1").classList.add("active")
});
$("#img4").click(function(){
    $("#img1").animate({"margin-left":"-900%"});
    $("#img2").animate({"margin-left":"-900%"},{delay:100});
    $("#img3").animate({"margin-left":"-900%"});
    $("#img4").animate({"margin-right":"-900%"},{delay:100});

});



});

