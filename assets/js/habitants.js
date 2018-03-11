var mouseX;
var mouseY;
$(document).mousemove( function(e) {
   // mouse coordinates
   mouseX = e.pageX; 
   mouseY = e.pageY;

});      

function showHabitant(parcel) {
    var name = $("#"+parcel+ " td:nth-child(1)").text();
    var address = $("#"+parcel+ " td:nth-child(2)").text();
   
    // populate tooltip string
    $('#tooltip span').html(name + " <br> " + address);        
    
    // show tooltip
    $('#tooltip').stop(false, true).fadeIn(1);

    // position tooltip relative to mouse coordinates
    $(this).mousemove(function() {
      $('#tooltip').css({'top':mouseY - 200,'left':mouseX - 350});   
    }); 
}

function hideHabitant() {
    // hide tooltip
    $('#tooltip').stop(false, true).fadeOut(1);
}


$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});