import gengine.*;
import gengine.math.*;
import gengine.components.*;

class ExitSystem extends System
{
    public function new()
    {
        super();
    }

    override public function update(dt:Float):Void
    {
        if(Gengine.getInput().getScancodePress(41))
        {
            Gengine.exit();
        }
    }
}

class Application
{
    public static function init()
    {
        Gengine.setWindowSize(new IntVector2(800, 600));
        Gengine.setWindowTitle("01-animated_sprite_2d");
    }

    public static function start(engine:Engine)
    {
        engine.addSystem(new ExitSystem(), 0);
        engine.addSystem(new ScreenshotSystem(), 0);

        var e = new Entity();
        e.add(new AnimatedSprite2D());
        var animatedSprite2D:AnimatedSprite2D = e.get(AnimatedSprite2D);
        var animationSet = Gengine.getResourceCache().getAnimationSet2D("spriter/player.scml", true);
        animatedSprite2D.setAnimationSet(animationSet);
        animatedSprite2D.setAnimation("walk", 1);
        e.position = new Vector3(-200, -200, 0);
        engine.addEntity(e);

        var e = new Entity();
        e.add(new AnimatedSprite2D());
        var animatedSprite2D:AnimatedSprite2D = e.get(AnimatedSprite2D);
        var animationSet = Gengine.getResourceCache().getAnimationSet2D("spine/spineboy.json", true);
        animatedSprite2D.setAnimationSet(animationSet);
        animatedSprite2D.setAnimation("walk", 1);
        e.position = new Vector3(200, -200, 0);
        e.scale = new Vector3(0.5, 0.5, 1);
        engine.addEntity(e);

        Gengine.getRenderer().getDefaultZone().setFogColor(new Color(1,1,1,1));
    }
}
