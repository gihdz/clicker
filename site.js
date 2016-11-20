var dataClick = 'data-id';
var clickers = [
    {name: "Green", color: "rgb(179, 210, 52)", clicks: 0},
    {name: "Orange", color: "#F79420", clicks: 0}
]
var ol = document.createElement("ol");
var cb = document.getElementById("cb");
var cbn = document.getElementById("cbn");
var cbt = document.getElementById("cbt");

var handleLisClick = function(){
    var id = parseInt(this.getAttribute("id"));
    var clicker = clickers[id];
    var style = "background-color:" + clicker.color;
    cb.setAttribute(dataClick, id);
    cb.setAttribute("style", style);
    cbn.innerHTML = clicker.name;
    cbt.innerHTML = clicker.clicks;

}
var handleClickCountForBox = function(e){
    var id = parseInt(this.getAttribute(dataClick));
    var clicker = clickers[id];
    clicker.clicks++;    
    cbt.innerHTML = clicker.clicks;
};
cb.addEventListener("click", handleClickCountForBox, false);

for(var i = 0; i < clickers.length; i++){
    var style = 
    "background-color:" + clickers[i].color + ";" +
    "cursor: pointer;";
    var li = document.createElement("li");
    li.setAttribute("style", style);
    li.setAttribute("id", i);
    li.addEventListener("click", handleLisClick, false);
ol.appendChild(li);

}

var listContainer = document.getElementsByClassName('click-box-list-container')[0];
listContainer.appendChild(ol);
