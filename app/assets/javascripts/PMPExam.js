//alert("Has escrito:"+QuestionPool["Questions"][34]["Question"]);

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
            value: QuestionPool["Questions"].length/2,
            slide: function( event, ui ) {$( "#amount" ).val( ui.value );}});$( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) 
        );
    });
    $("#StartExam").click(function(){
        TOTAL=parseInt($("#amount").val(), 10);
        $("#Welcome").slideUp( "slow", function() {});
        StartExam();
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
            if(Answers[index]==LocalQuestionPool[index]["Correct"]){
                Correct+=1;
                $(AnswerId).addClass("text-success");
            }
            else{
                Incorrect+=1;
                $(AnswerId).addClass("text-error");
            }
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
    function InsertQuestion(LocalQuestionPool,INDEX,TOTAL) {
        $("#Exam").hide();
        $('#QuestionGroup').children('.active').removeClass("active");
        ShowIndex=INDEX+1;
        $('#Question').html("<b>"+ShowIndex+"/"+TOTAL+".</b> "+LocalQuestionPool[INDEX]["Question"]);
        $('#bR1').html("<b>A. </b>"+LocalQuestionPool[INDEX]["R1"]);if(Answers[INDEX]=="R1"){$("#R1").addClass("active");}else{$("#mark").removeClass("active");};
        $('#bR2').html("<b>B. </b>"+LocalQuestionPool[INDEX]["R2"]);if(Answers[INDEX]=="R2"){$("#R2").addClass("active");}else{$("#mark").removeClass("active");};
        $('#bR3').html("<b>C. </b>"+LocalQuestionPool[INDEX]["R3"]);if(Answers[INDEX]=="R3"){$("#R3").addClass("active");}else{$("#mark").removeClass("active");};
        $('#bR4').html("<b>D. </b>"+LocalQuestionPool[INDEX]["R4"]);if(Answers[INDEX]=="R4"){$("#R4").addClass("active");}else{$("#mark").removeClass("active");};
        $("#Exam").slideDown( "fast", function() {});
        if(INDEX==0){$("#prev").addClass("disabled")}else{$("#prev").removeClass("disabled") };
        if(INDEX==TOTAL-1){$("#next").addClass("disabled")}else{$("#next").removeClass("disabled") };
        if ($.inArray(INDEX,Marked)!==-1){$("#mark").addClass("btn-warning");}else{{$("#mark").removeClass("btn-warning");}}

    }        
    LocalQuestionPool=$.randomize(QuestionPool["Questions"]).slice(0,TOTAL);
    InsertQuestion(LocalQuestionPool,INDEX,TOTAL);
    $("#next").click(function(){
        if(!$(this).hasClass("disabled")){
            Answers[INDEX]=$('#QuestionGroup').children('.active').attr("id");
            if(INDEX<TOTAL){INDEX=INDEX+1;};
            InsertQuestion(LocalQuestionPool,INDEX,TOTAL);
        }   
    });
    $("#prev").click(function(){
        if(!$(this).hasClass("disabled")){
            Answers[INDEX]=$('#QuestionGroup').children('.active').attr("id");
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
        EndExam();
    });
    $("#end").click(function(){
        EndExam();
    });
}





