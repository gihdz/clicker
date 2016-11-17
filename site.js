var boxes = document.getElementsByClassName('click-box')
var dataClick = 'data-clickc';
var handleClickCountForBoxes = function(e){
    var clickCount = parseInt(this.getAttribute(dataClick));
    clickCount++;
    var spanText = "<span class='click-box-text'>" + clickCount + "</span>";
    this.innerHTML = spanText;
    this.setAttribute(dataClick, clickCount);
};
for(var i = 0; i < boxes.length; i++){
    boxes[i].addEventListener("click", handleClickCountForBoxes, false);
}
