var Test2Layer = cc.Layer.extend({
    bg:null,
    sprite:null,
    act3:null,
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
        item1.attr({x: 1*80, y: cc.winSize.height - 40});

        var item2 = new cc.MenuItemFont('Test2', this.test2, this);
        item2.attr({x: 2*80, y: cc.winSize.height - 40});

        var item3 = new cc.MenuItemFont('Test3', this.test3, this);
        item3.attr({x: 3*80, y: cc.winSize.height - 40});

        var item4 = new cc.MenuItemFont('Test4', this.test4, this);
        item4.attr({x: 4*80, y: cc.winSize.height - 40});

        var item5 = new cc.MenuItemFont('Test5', this.test5, this);
        item5.attr({x: 5*80, y: cc.winSize.height - 40});

        var item6 = new cc.MenuItemFont('Test6', this.test6, this);
        item6.attr({x: 6*80, y: cc.winSize.height - 40});

        var menu = new cc.Menu(item1, item2, item3, item4, item5,item6);
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

        this.act3 = cc.repeatForever(animAct);
        this.sprite.runAction(this.act3);
        //this.sprite.runAction(act2);



        return true;
    },

    test1: function () {
        var ff = new cc.Follow(this.sprite);
        this.bg.runAction(ff);
    },

    test2: function () {
        var moveLeftTop = cc.moveTo(0.5,
            this.sprite.width/2,
            cc.winSize.height - this.sprite.height/2);

        var moveRightTop = cc.moveTo(0.5,
            cc.winSize.width-this.sprite.width/2,
            cc.winSize.height - this.sprite.height/2);

        var moveRightBottom = cc.moveTo(0.5,
            cc.winSize.width-this.sprite.width/2,
            this.sprite.height/2);

        var moveLeftBottom = cc.moveTo(0.5,
            this.sprite.width/2,
            this.sprite.height/2);

        var moveCenter = cc.moveTo(0.5,
            cc.winSize.width/2,
            cc.winSize.height/2);

        var moves = [moveLeftTop, moveRightTop, moveRightBottom, moveLeftBottom, moveCenter];
        var acts = new cc.Sequence(moves);
        this.sprite.runAction(acts);

    },
    test3: function () {
        var moveLeftTop = cc.moveTo(1,
            this.sprite.width/2,
            cc.winSize.height - this.sprite.height/2);

        var i1 = new cc.CallFunc(this.i1, this, "1");

        var moveRightTop = cc.moveTo(1,
            cc.winSize.width-this.sprite.width/2,
            cc.winSize.height - this.sprite.height/2);

        var i2 = new cc.CallFunc(this.i1, this, "2");

        var moveRightBottom = cc.moveTo(0.5,
            cc.winSize.width-this.sprite.width/2,
            this.sprite.height/2);

        var moveLeftBottom = cc.moveTo(0.5,
            this.sprite.width/2,
            this.sprite.height/2);

        var moveCenter = cc.moveTo(0.5,
            cc.winSize.width/2,
            cc.winSize.height/2);

        var moves = [moveLeftTop, i1, moveRightTop, i2, moveRightBottom,
            moveLeftBottom, moveCenter];
        var acts = new cc.Sequence(moves);
        this.sprite.runAction(acts);

    },

    test4: function(){
        var moveLeft = cc.moveTo(0.5,
            this.sprite.width/2,
            cc.winSize.height/2);
        this.sprite.runAction(moveLeft);
    },

    test5: function(){
        var moveRight = cc.moveTo(4,
            cc.winSize.width-this.sprite.width/2,
            cc.winSize.height/2);
        var aa = new cc.Speed(moveRight, 4);
        this.sprite.runAction(aa);
    },

    test6: function(){
        var moveRight = cc.moveTo(4,
            cc.winSize.width-this.sprite.width/2,
            cc.winSize.height/2);
        this.sprite.runAction(moveRight);
    },

    i1: function (target, mesg) {
        // target is-a action node => this.sprite
        if (mesg == '2'){
            target.stopAction(target.getParent().act3);

            cc.audioEngine.playMusic(res.win_wav, false);

        }
    },

    i2: function (target, mesg) {
        cc.log("i2 = " + mesg);
    }

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