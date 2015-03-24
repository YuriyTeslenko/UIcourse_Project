$(function() {
  
var linkys = document.getElementsByClassName('dropdown-toggle');
for (var i = 0; i < linkys.length; ++i) {
  linkys[i].onclick = function(e) {
    //if this isn't an http/https link
    this.focus(); 
    //e.preventDefault();
  };
}

});