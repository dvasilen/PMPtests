(function($) {$.fn.randomize = function(childElem) {return this.each(function() {var $this = $(this);var elems = $this.children(childElem);elems.sort(function() { return (Math.round(Math.random())-0.5); });$this.empty();for(var i=0; i < elems.length; i++)$this.append(elems[i]);});}})(jQuery);


$(document).ready(function(){

    $("#Dropables").hide();$("#Draggables").hide();
    
    $.each(ProcessPool["Processes"], function(index, value) {
      ProcessName=ProcessPool["Processes"][index]["Process"];
      ProcessNameTrim=ProcessName.replace(/ /g,'')
      ProcessDef=ProcessPool["Processes"][index]["Definition"];
      ProcessKey=ProcessPool["Processes"][index]["Key"];
      $("#Dropables").append("<p>"+ProcessName+' <b>definition</b>:</p><div id="'+ProcessNameTrim+'-definition" class="DropableBox GreyBox"></div><p>'+ProcessName+' <b>key benefit</b>:</p><div id="'+ProcessNameTrim+'-key" class="GreyBox"></div>');
      $("#Draggables").append('<div id="'+ProcessNameTrim+'-definition-drag" class="DraggableBox BlueBox">'+ProcessDef+'</div><div id="'+ProcessNameTrim+'-key-drag" class="DraggableBox BlueBox">'+ProcessKey+'</div>');
      $("#Draggables").randomize("div.DraggableBox");
    });
    
    $.each(ProcessPool["Processes"], function(index, value) {
      ProcessName=ProcessPool["Processes"][index]["Process"];
      ProcessNameTrim=ProcessName.replace(/ /g,'')
      ProcessDef=ProcessPool["Processes"][index]["Definition"];
      ProcessKey=ProcessPool["Processes"][index]["Key"];
        $( "#"+ProcessNameTrim+"-definition-drag" ).draggable({ revert: "invalid" });
        $( "#"+ProcessNameTrim+"-key-drag" ).draggable({ revert: "invalid" });
        $( "#"+ProcessNameTrim+"-definition" ).droppable({
          accept: "#"+ProcessNameTrim+"-definition-drag",
          drop: function( event, ui ) {
            Text=$(ui.draggable).html();
            $(ui.draggable).remove();
            $(this).html(Text).addClass("GreenBox");
          }
        });
        $( "#"+ProcessNameTrim+"-key" ).droppable({
          accept: "#"+ProcessNameTrim+"-key-drag",
          drop: function( event, ui ) {
            Text=$(ui.draggable).html();
            $(ui.draggable).remove();
            $(this).html(Text).addClass("GreenBox");
          }
        });
      $("#Dropables").slideDown( "slow", function() {});
      $("#Draggables").slideDown( "slow", function() {});
    });

    $.each($("#Dropables > div"), function(index, value) {
      if (index<12) {$(this).attr("style","background-color:#A3E0FF;")};
      if (index>=12 && index<24) {$(this).attr("style","background-color:#94FF70;")};
      if (index>=24 && index<38) {$(this).attr("style","background-color:#FFA366;")};
      if (index>=38 && index<46) {$(this).attr("style","background-color:#FFFF4D;")};
      if (index>=46 && index<52) {$(this).attr("style","background-color:#CD9BFF;")};
      if (index>=52 && index<60) {$(this).attr("style","background-color:#DBFFFF;")};
      if (index>=60 && index<66) {$(this).attr("style","background-color:#C2FFAD;")};
      if (index>=66 && index<78) {$(this).attr("style","background-color:#B2E0F0;")};
      if (index>=78 && index<86) {$(this).attr("style","background-color:#E6B280;")};
      if (index>=86) {$(this).attr("style","background-color:#F0F0F0;")};
    });


});

