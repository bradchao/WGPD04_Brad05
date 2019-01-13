var Test2Layer = cc.Layer.extend({
    bg:null,
    sprite:null,
    ctor: async function () {
        this._super();

        this.bg = new cc.Sprite(res.bg_png);
        this.bg.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height/2,
        })
        this.addChild(this.bg);
        this.bg.scaleX = 3; this.bg.scaleY = 3;

        var item1 = new cc.MenuItemFont('Test1', this.test1, this);
        item1.attr({x: 1*40, y: cc.winSize.height - 40});

        var menu = new cc.Menu(item1);
        menu.attr({x:0, y:0});
        this.addChild(menu);

        this.sprite = new cc.Sprite(res.s1_0025_png);
        this.sprite.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height/2,
        })
        this.addChild(this.sprite);

        cc.spriteFrameCache.addSpriteFrames(res.s1_plist, res.s1_png);
        var animFrames = [];
        for (var i=1; i<=25; i++){
            var pname = "s1_00" + (i>=10?'':'0') + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(pname);
            animFrames.push(frame);
        }

        var anim = new cc.Animation(animFrames, 1/16, 1);
        var animAct = new cc.Animate(anim);     // Action

        var act2 = cc.moveTo(3, 100, 100);

        await sleep(2*1000);

        this.sprite.runAction(cc.repeatForever(animAct));
        this.sprite.runAction(act2);



        return true;
    },

    test1: function () {
        var ff = new cc.Follow(this.sprite);
        this.bg.runAction(ff);
    },


});

var Test2Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test2Layer();
        this.addChild(layer);
    }
});


function sleep(ms){
    return new Promise(a => setTimeout(a, ms));
}