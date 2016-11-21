$(function () {

    var model = {
        init: function () {
            if (!localStorage.colors) {
                var colors = [
                    { name: "Green", color: "rgb(179, 210, 52)", clicks: 0 },
                    { name: "Orange", color: "#F79420", clicks: 0 }
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
        incrementClickCountOfColor: function (id) {
            var colors = JSON.parse(localStorage.colors);
            colors[id].clicks++;
            localStorage.colors = JSON.stringify(colors);

        }
    };
    var octopus = {
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
        },
        init: function () {
            model.init();
            viewListColors.init();
            viewCatView.init();
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
                    "cursor: pointer;";
                var li = document.createElement("li");
                li.setAttribute("style", style);
                li.setAttribute("id", i);
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
            this.colorId = undefined;
            this.$cb.click(this.handleClickCountForBox);

        },
        render: function (colorId) {
            var color = octopus.getColor(colorId);
            var style = "background-color:" + color.color;
            this.$cb.attr("style", style);
            this.$name.text(color.name);
            this.$clickCount.text(color.clicks);
            this.colorId = colorId;
        },
        handleClickCountForBox: function () {
            if (viewCatView.colorId == undefined) return false;
            octopus.incrementClickCount(viewCatView.colorId);

        }
    };

    octopus.init();
});