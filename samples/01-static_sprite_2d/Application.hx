import gengine.*;
import gengine.math.*;
import gengine.components.*;

class MainSystem extends System
{
    private var logoEntity:Entity;
    private var time:Float = 0.0;

    public function new()
    {
        super();
    }

    override public function addToEngine(engine:Engine):Void
    {
        logoEntity = new Entity();
        logoEntity.add(new StaticSprite2D());
        var staticSprite2D:StaticSprite2D = logoEntity.get(StaticSprite2D);
        staticSprite2D.setSprite(Gengine.getResourceCache().getSprite2D("logo.png", true));
        engine.addEntity(logoEntity);
    }

    override public function update(dt:Float):Void
    {
        time += dt;

        var position = logoEntity.position;
        position.x = Math.cos(time * 2) * 128;
        logoEntity.position = position;

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
        Gengine.setWindowSize(new IntVector2(640, 480));
        Gengine.setWindowTitle("01-static_sprite_2d");
    }

    public static function start(engine:Engine)
    {
        engine.addSystem(new MainSystem(), 0);
        engine.addSystem(new ScreenshotSystem(), 0);

        Gengine.getRenderer().getDefaultZone().setFogColor(new Color(0.5, 0.5, 0.5, 1));
    }
}
