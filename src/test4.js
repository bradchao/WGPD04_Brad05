var Test4Layer = cc.Layer.extend({
    sprite:null,
    space:null,
    ctor:function () {
        this._super();

        this.initPhysics();
        this.initMouse(this);

        this.scheduleUpdate();

        return true;
    },

    initPhysics: function () {
        this.space = new cp.Space();
        this.space.gravity = cp.v(0, -98);

        // 四面牆壁
        var staticBody = this.space.staticBody;
        var walls = [
            new cp.SegmentShape(staticBody,
                cp.v(0,0),
                cp.v(cc.winSize.width,0),0),
            new cp.SegmentShape(staticBody,
                cp.v(cc.winSize.width,0),
                cp.v(cc.winSize.width,cc.winSize.height),0),
            new cp.SegmentShape(staticBody,
                cp.v(cc.winSize.width,cc.winSize.height),
                cp.v(0,cc.winSize.height),0),
            new cp.SegmentShape(staticBody,
                cp.v(0,cc.winSize.height),
                cp.v(0,0),0),
        ];

        for (var i=0; i<walls.length; i++){
            var wall = walls[i];
            wall.setElasticity(0.5);
            wall.setFriction(1);
            this.space.addStaticShape(wall);
        }
    },

    initMouse: function (layer) {
        var listener = {
            event: cc.EventListener.MOUSE,
            onMouseDown: function (e) {
                layer.addBox(e.getLocation());
            }
        };
        cc.eventManager.addListener(listener, this);
    },


    addBox: function (p) {
        var body = new cp.Body(1, cp.momentForBox(1, 64, 64));
        body.setPos(p);
        this.space.addBody(body);

        var shape = new cp.BoxShape(body, 64, 64);
        shape.setElasticity(1);
        shape.setFriction(0.5);
        this.space.addShape(shape);

        var boxSprite = new cc.PhysicsSprite(res.box);
        boxSprite.setBody(body);
        boxSprite.setPosition(cc.p(p.x, p.y));
        this.addChild(boxSprite)

    },

    update: function () {
        this.space.step(0.03);
    }


});

var Test4Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test4Layer();
        this.addChild(layer);
    }
});

