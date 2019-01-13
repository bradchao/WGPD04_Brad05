var Test1Layer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.Brad_plist, res.Brad_png);

        this.sprite = new cc.Sprite("#bird.png");
        this.sprite.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height/2,
        });
        this.addChild(this.sprite);



        return true;
    }
});

var Test1Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test1Layer();
        this.addChild(layer);
    }
});

