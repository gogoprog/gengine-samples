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

        var sceneEntity = Gengine.getScene().getAsEntity();
        sceneEntity.add(new PhysicsWorld2D());
        sceneEntity.get(PhysicsWorld2D).setGravity(new Vector2(0, -1000));

        var e = new Entity();
        e.add(new StaticSprite2D());
        var staticSprite2D:StaticSprite2D = e.get(StaticSprite2D);
        staticSprite2D.setSprite(Gengine.getResourceCache().getSprite2D("logo.png", true));
        e.add(new RigidBody2D());
        e.get(RigidBody2D).setBodyType(2);
        e.add(new CollisionCircle2D());
        e.get(CollisionCircle2D).setRadius(128);
        e.get(CollisionCircle2D).setFriction(0.5);
        e.position = new Vector3(0, 300, 0);
        engine.addEntity(e);

        var e = new Entity();
        e.add(new RigidBody2D());
        e.add(new CollisionBox2D());
        e.get(CollisionBox2D).setSize(new Vector2(600, 64));
        e.position = new Vector3(0, -300, 0);
        engine.addEntity(e);

        Gengine.getRenderer().getDefaultZone().setFogColor(new Color(0.5, 0.5, 0.5, 1));
    }
}
