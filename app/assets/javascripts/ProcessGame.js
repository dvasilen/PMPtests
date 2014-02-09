(function($) {$.fn.randomize = function(childElem) {return this.each(function() {var $this = $(this);var elems = $this.children(childElem);elems.sort(function() { return (Math.round(Math.random())-0.5); });$this.empty();for(var i=0; i < elems.length; i++)$this.append(elems[i]);});}})(jQuery);


$(document).ready(function(){

    $("#Dropables").hide();$("#Draggables").hide();
    $.each(ProcessPool["Processes"], function(index, value) {
      ProcessName=ProcessPool["Processes"][index]["Process"];
      ProcessNameTrim=ProcessName.replace(/ /g,'')
      ProcessDef=ProcessPool["Processes"][index]["Definition"];
      ProcessKey=ProcessPool["Processes"][index]["Key"];
      $("#Dropables").append("<p>"+ProcessName+' definition:</p><div id="'+ProcessNameTrim+'-definition" class="DropableBox GreyBox"></div><p>'+ProcessName+' key benefit:</p><div id="'+ProcessNameTrim+'-key" class="GreyBox"></div>');
      $("#Draggables").append('<div id="'+ProcessNameTrim+'-definition-drag" class="DraggableBox BlueBox">'+ProcessDef+'</div><div id="'+ProcessNameTrim+'-key-drag" class="BlueBox">'+ProcessKey+'</div>');
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












});

