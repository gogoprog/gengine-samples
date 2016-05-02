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
        Gengine.setWindowTitle("02-physics");
    }

    public static function start(engine:Engine)
    {
        engine.addSystem(new ExitSystem(), 0);

        var e = new Entity();
        e.add(new StaticSprite2D());
        var staticSprite2D:StaticSprite2D = e.get(StaticSprite2D);
        staticSprite2D.setSprite(Gengine.getResourceCache().getSprite2D("logo.png", true));
        engine.addEntity(e);

        Gengine.getRenderer().getDefaultZone().setFogColor(new Color(0.5, 0.5, 0.5, 1));

        var sceneEntity = Gengine.getScene().getAsEntity();
        sceneEntity.add(new PhysicsWorld2D());
        sceneEntity.get(PhysicsWorld2D).setGravity(new Vector2(0, -1000));
    }
}
