//randomize
(function($) {$.randomize = function(arr) {for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);return arr;};})(jQuery);

INDEX = 0;
TOTAL = 0;
Answers=[];
Marked=[];

$(document).ready(function(){
    $("#Welcome").slideDown( "slow", function() {});
    $(function() {
        $( "#slider-range-max" ).slider({
            range: "max",
            min: 1,
            max: QuestionPool["Questions"].length,
            value: 200,
            slide: function( event, ui ) {$( "#QuestionsBank" ).val( ui.value );}});$( "#QuestionsBank" ).val( $( "#slider-range-max" ).slider( "value" ) 
        );
    });
    $(function() {
        $( "#rita-slider-range-max" ).slider({
            range: "max",
            min: 1,
            max: RitaPool["Questions"].length,
            value: RitaPool["Questions"].length,
            slide: function( event, ui ) {$( "#RitaBank" ).val( ui.value );}});$( "#RitaBank" ).val( $( "#rita-slider-range-max" ).slider( "value" ) 
        );
    });
    $(function() {
        $( "#att-slider-range-max" ).slider({
            range: "max",
            min: 1,
            max: ATTPool["Questions"].length,
            value: ATTPool["Questions"].length,
            slide: function( event, ui ) {$( "#ATTBank" ).val( ui.value );}});$( "#ATTBank" ).val( $( "#att-slider-range-max" ).slider( "value" ) 
        );
    });
    $(function() {
        $( "#pmppractice-slider-range-max" ).slider({
            range: "max",
            min: 1,
            max: PMPpractice["Questions"].length,
            value: PMPpractice["Questions"].length,
            slide: function( event, ui ) {$( "#PMPpracticeBank" ).val( ui.value );}});$( "#PMPpracticeBank" ).val( $( "#pmppractice-slider-range-max" ).slider( "value" ) 
        );
    });
    $(function() {
        $( "#pmpexam-slider-range-max" ).slider({
            range: "max",
            min: 1,
            max: PMPExam["Questions"].length,
            value: PMPExam["Questions"].length,
            slide: function( event, ui ) {$( "#PMPExamBank" ).val( ui.value );}});$( "#PMPExamBank" ).val( $( "#pmpexam-slider-range-max" ).slider( "value" ) 
        );
    });
    $("#StartExam").click(function(){
        TOTAL=parseInt($("#QuestionsBank").val(), 10);
        if(TOTAL>QuestionPool["Questions"].length){TOTAL=QuestionPool["Questions"].length;}
        $("#Welcome").slideUp( "slow", function() {});
        SelectedQuestionPool = QuestionPool;
        StartExam();
        timer = new _timer;timer.mode(1);timer.start(1000);
    });
    $("#StartRita").click(function(){
        TOTAL=parseInt($("#RitaBank").val(), 10);
        $("#Welcome").slideUp("slow", function() {});
        SelectedQuestionPool = RitaPool;
        StartExam();
        timer = new _timer;timer.mode(1);timer.start(1000);
    });
    $("#StartATT").click(function(){
        TOTAL=parseInt($("#ATTBank").val(), 10);
        $("#Welcome").slideUp("slow", function() {});
        SelectedQuestionPool = ATTPool;
        StartExam();
        timer = new _timer;timer.mode(1);timer.start(1000);
    });
    $("#StartPMPpractice").click(function(){
        TOTAL=parseInt($("#ATTBank").val(), 10);
        $("#Welcome").slideUp("slow", function() {});
        SelectedQuestionPool = PMPpractice;
        StartExam();
        timer = new _timer;timer.mode(1);timer.start(1000);
    });
    $("#StartPMPExam").click(function(){
        TOTAL=parseInt($("#PMPExamBank").val(), 10);
        $("#Welcome").slideUp("slow", function() {});
        SelectedQuestionPool = PMPExam;
        StartExam();
        timer = new _timer;timer.mode(1);timer.start(1000);
    });
});



function EndExam() {
    Correct=0;Incorrect=0;NoResponse=0;
    $("#Exam").hide();
    PrintAnswers="";
    AllQuestions="";
    $.each(LocalQuestionPool, function(index, value) {
        AnswerId="";
        if(Answers[index]=="R1"){AnswerId="#A"+index};if(LocalQuestionPool[index]["Correct"]=="R1"){CorrectId="#A"+index};
        if(Answers[index]=="R2"){AnswerId="#B"+index};if(LocalQuestionPool[index]["Correct"]=="R2"){CorrectId="#B"+index};
        if(Answers[index]=="R3"){AnswerId="#C"+index};if(LocalQuestionPool[index]["Correct"]=="R3"){CorrectId="#C"+index};
        if(Answers[index]=="R4"){AnswerId="#D"+index};if(LocalQuestionPool[index]["Correct"]=="R4"){CorrectId="#D"+index};
        $("#AllQuestions").append('<div id="Q'+index+'">'+(index+1)+'/'+TOTAL+'. '+LocalQuestionPool[index]["Question"]+'</div><div id="A'+index+'">A. '+LocalQuestionPool[index]["R1"]+'</div><div id="B'+index+'">B. '+LocalQuestionPool[index]["R2"]+'</div><div id="C'+index+'">C. '+LocalQuestionPool[index]["R3"]+'</div><div id="D'+index+'">D. '+LocalQuestionPool[index]["R4"]+'</div><hr>');
        if(Answers[index] === undefined){
            NoResponse+=1;
            $("#A"+index).addClass("text-warning");
            $("#B"+index).addClass("text-warning");
            $("#C"+index).addClass("text-warning");
            $("#D"+index).addClass("text-warning");
        }
        else{
            if(Answers[index]==LocalQuestionPool[index]["Correct"]){Correct+=1;$(AnswerId).addClass("text-success");}
            else{Incorrect+=1;$(AnswerId).addClass("text-error");}
        };
        $(CorrectId).addClass("text-success");
    });    
    $("#Score").html("<h1>Score: "+Math.round((Correct*100/TOTAL)*100)/100+"%</h1>").addClass("text-success");
    $("#Correct").html("Correct: "+Correct).addClass("text-success");
    $("#Incorrect").html("Incorrect: "+Incorrect).addClass("text-error");
    $("#NoResponse").html("NoResponse: "+NoResponse).addClass("text-warning");
    $("#AllQuestions").slideDown( "slow", function() {});
    $("#Results").slideDown( "slow", function() {});    
}




function StartExam() {
    $("#Exam").show();
    function SaveStatus(LocalQuestionPool,INDEX,TOTAL) {

    }
    function InsertQuestion(LocalQuestionPool,INDEX,TOTAL) {
        $("#actualQuestion").hide();
        $("#gridBox").hide();
        $('#QuestionGroup').children('.active').removeClass("active");
        ShowIndex=INDEX+1;
        $('#Question').html("<b>"+ShowIndex+"/"+TOTAL+".</b> "+LocalQuestionPool[INDEX]["Question"]);
        $('#bR1').html('<input type="radio" name="optionsRadios" id="R1" value="R1"><b>A. </b>'+LocalQuestionPool[INDEX]["R1"]);if(Answers[INDEX]=="R1"){$("#R1").attr('checked', 'checked');}else{$("#mark").attr('checked', '');};
        $('#bR2').html('<input type="radio" name="optionsRadios" id="R2" value="R2"><b>B. </b>'+LocalQuestionPool[INDEX]["R2"]);if(Answers[INDEX]=="R2"){$("#R2").attr('checked', 'checked');}else{$("#mark").attr('checked', '');};
        $('#bR3').html('<input type="radio" name="optionsRadios" id="R3" value="R3"><b>C. </b>'+LocalQuestionPool[INDEX]["R3"]);if(Answers[INDEX]=="R3"){$("#R3").attr('checked', 'checked');}else{$("#mark").attr('checked', '');};
        $('#bR4').html('<input type="radio" name="optionsRadios" id="R4" value="R4"><b>D. </b>'+LocalQuestionPool[INDEX]["R4"]);if(Answers[INDEX]=="R4"){$("#R4").attr('checked', 'checked');}else{$("#mark").attr('checked', '');};
        $("#actualQuestion").slideDown( "fast", function() {});
        if(INDEX==0){$("#prev").addClass("disabled")}else{$("#prev").removeClass("disabled") };
        if(INDEX==TOTAL-1){$("#next").addClass("disabled")}else{$("#next").removeClass("disabled") };
        if ($.inArray(INDEX,Marked)!==-1){$("#mark").addClass("btn-warning");}else{{$("#mark").removeClass("btn-warning");}}

    }        
    LocalQuestionPool=$.randomize(SelectedQuestionPool["Questions"]).slice(0,TOTAL);
    InsertQuestion(LocalQuestionPool,INDEX,TOTAL);
    $("#next").click(function(){
        if(!$(this).hasClass("disabled")){
            Answers[INDEX]=$('input[name=optionsRadios]:checked').attr("id");
            if(INDEX<TOTAL){INDEX=INDEX+1;};
            InsertQuestion(LocalQuestionPool,INDEX,TOTAL);
        }   
    });
    $("#prev").click(function(){
        if(!$(this).hasClass("disabled")){
            Answers[INDEX]=$('input[name=optionsRadios]:checked').attr("id");
            if(INDEX>0){INDEX=INDEX-1;};
            InsertQuestion(LocalQuestionPool,INDEX,TOTAL);
        }   
    });

    $("#mark").click(function(){
        $(this).toggleClass("btn-warning");
        if($(this).hasClass("btn-warning")){
            Marked.push(INDEX);
        }
        else{
            Marked.splice($.inArray(INDEX,Marked),1);
        }
    });
    $("#grid").click(function(){
        Answers[INDEX]=$('input[name=optionsRadios]:checked').attr("id");
        $(this).toggleClass("btn-primary");
        if($(this).hasClass("btn-primary")){
            $("#actualQuestion").slideUp( "fast", function() {
                $("#gridCol1").html("");$("#gridCol2").html("");$("#gridCol3").html("");
                $.each(LocalQuestionPool, function(index, value) {
                    if (index<TOTAL/3){Column="#gridCol1";}else{if (index<2*TOTAL/3){Column="#gridCol2";}else{Column="#gridCol3";};};
                    if(Answers[index] === undefined){ResponseValue='';}else{ResponseValue=Answers[index];if(ResponseValue=="R1"){ResponseValue="A"};if(ResponseValue=="R2"){ResponseValue="B"};if(ResponseValue=="R3"){ResponseValue="C"};if(ResponseValue=="R4"){ResponseValue="D"};};
                    ButtonToAdd='<button class="btn btn-large btn-block ToQuestion" type="button" index="'+index+'">Q'+(index+1)+': '+ResponseValue+'</button>';
                    if ($.inArray(index,Marked)!==-1){ButtonToAdd=$(ButtonToAdd).addClass("btn-warning");};
                    $(Column).append(ButtonToAdd);
                });

                $(".ToQuestion").click(function(){
                    INDEX=parseInt($(this).attr("index"));
                    $("#grid").toggleClass("btn-primary");
                    InsertQuestion(LocalQuestionPool,INDEX,TOTAL);
                });
                 $("#gridBox").slideDown( "fast", function() {});
            });
        }
        else{
            $("#gridBox").slideUp( "fast", function() {
                 $("#actualQuestion").slideDown( "fast", function() {});
            });
        }
    });
    $("#end").click(function(){
        Answers[INDEX]=$('input[name=optionsRadios]:checked').attr("id");
        EndExam();
    });
}