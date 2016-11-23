$(function () {

    var model = {
        init: function () {
            this.currentColorId = undefined;
            if (!localStorage.colors) {
                var colors = [
                    { name: "rgb(179, 210, 52)", color: "rgb(179, 210, 52)", clicks: 0 },
                    { name: "#F79420", color: "#F79420", clicks: 0 }
                ];
                localStorage.colors = JSON.stringify(colors);
            }
        },
        getAllColors: function () {
            return JSON.parse(localStorage.colors);
        },
        getColorById: function (id) {
            return JSON.parse(localStorage.colors)[id];
        },
        getCurrentColorObj: function(){
            if(this.currentColorId >= 0)
            return this.getColorById(this.currentColorId);
        },
        incrementClickCountOfColor: function (id) {
            var colors = JSON.parse(localStorage.colors);
            colors[id].clicks++;
            localStorage.colors = JSON.stringify(colors);
        },
        setCurrent: function(colorId){
            this.currentColorId = colorId;
        },
        updateColor: function(name, clicks){
            var colors = JSON.parse(localStorage.colors);
            var color = colors[this.currentColorId];
            color.name = name;
            color.clicks = clicks;
            color.color = name;
            colors[this.currentColorId] = color;
            localStorage.colors = JSON.stringify(colors);
        }
    };
    var octopus = {
        
        init: function () {
            model.init();
            viewListColors.init();
            viewCatView.init();
            formView.init();
        },
        getColors: function () {
            return model.getAllColors();
        },
        getColor: function (id) {
            return model.getColorById(id);

        },
        incrementClickCount: function (id) {
            model.incrementClickCountOfColor(id);
            this.renderColor(id);
        },
        renderColor: function (id) {
            viewCatView.render(id);
            formView.render();
        },
        renderList: function(){
            viewListColors.render();
        },
        renderCurrentColor: function(){
            if(model.currentColorId >= 0)
            this.renderColor(model.currentColorId);
        },
        setCurrentColor: function(colorId){
            model.setCurrent(colorId);
        },
        getCurrentColorId: function(){
            return model.currentColorId;
        },
        getCurrentColorObj: function(){
            return model.getCurrentColorObj();
        },
        updateColorAttributes: function(name, clicks){
            model.updateColor(name, clicks);
        }
    };
    var viewListColors = {
        init: function () {
            this.colorList = $('#color-list');
            this.render();
        },
        render: function () {
            this.colorList.html('');
            var colors = octopus.getColors();
            for (var i = 0; i < colors.length; i++) {
                var style =
                    "background-color:" + colors[i].color + ";" +
                    "cursor: pointer;" +
                    "text-align:center; ";
                var li = document.createElement("li");
                li.setAttribute("style", style);
                li.setAttribute("id", i);
                li.textContent = colors[i].name;
                li.addEventListener("click", this.handleLisClick, false);
                this.colorList.append(li);
            }
        },
        handleLisClick: function () {
            var id = parseInt(this.getAttribute("id"));
            octopus.renderColor(id);
        }
    };
    var viewCatView = {
        init: function () {
            this.$name = $("#cbn");
            this.$clickCount = $("#cbt");
            this.$cb = $("#cb");
            this.$cb.click(this.handleClickCountForBox);

        },
        render: function (colorId) {
            var color = octopus.getColor(colorId);
            var style = "background-color:" + color.color;
            this.$cb.attr("style", style);
            this.$name.text(color.name);
            this.$clickCount.text(color.clicks);
            octopus.setCurrentColor(colorId);
        },
        handleClickCountForBox: function () {
            var currentColor = octopus.getCurrentColorId();
            if (currentColor == undefined) return false;
            octopus.incrementClickCount(currentColor);

        }
    };
    var formView = {
        init: function(){
            var self = this;
             self.$color = $("#form_color_picker");
             self.$colorClicks = $("#form_color_clicks");
             var $adminForm = $("#admin-form"); 
             $adminForm.submit(function(e){
                e.preventDefault();
                var colorName = self.$color.val();
                var colorClicks = self.$colorClicks.val();
                if(colorName && colorClicks){
                    octopus.updateColorAttributes(colorName, colorClicks);
                    octopus.renderCurrentColor();
                    octopus.renderList();
                    $adminForm.addClass("hide");
                }
             });  
             $("#show-admin").click(function(){
                 $adminForm.toggleClass("hide");
             });      
            },
            render: function(){
                var color = octopus.getCurrentColorObj();
                if(color) {
                    this.$color.val(color.name);
                    this.$colorClicks.val(color.clicks);
                }
            }

    };

    octopus.init();
});