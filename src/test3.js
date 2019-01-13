var Test3Layer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var item1 = new cc.MenuItemFont('Test1', function(){
            var ajax = cc.loader.getXMLHttpRequest();
            ajax.open("GET", "http://url");
            ajax.send();



        }, this);
        item1.attr({x: 1*80, y: cc.winSize.height - 40});

        var item2 = new cc.MenuItemFont('Test2', function(){
            var ajax = cc.loader.getXMLHttpRequest();
            ajax.open("GET", "http://www.bradchao.com/apptest/bradtest1.php?key1=brad&key2=iii");
            ajax.setRequestHeader('Access-Control-Allow-Origin', 'http://www.bradchao.com');
            ajax.setRequestHeader('Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, OPTIONS');
            ajax.setRequestHeader('Access-Control-Allow-Headers',
                'X-Requested-With, Content-Type, Accept');
            ajax.onreadystatechange = function(){
                if (ajax.readyState == 4 && ajax.status == 200){
                    cc.log(ajax.responseText);
                }
            };
            ajax.send();

        }, this);
        item2.attr({x: 2*80, y: cc.winSize.height - 40});


        var menu = new cc.Menu(item1, item2);
        menu.attr({x:0, y:0});
        this.addChild(menu);


        return true;
    },

});

var Test3Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test3Layer();
        this.addChild(layer);
    }
});

