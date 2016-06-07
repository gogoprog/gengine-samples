import gengine.*;
import gengine.math.*;
import gengine.components.*;

class FactorySystem extends System
{
    private var engine:Engine;

    public function new()
    {
        super();
    }

    override public function addToEngine(_engine:Engine)
    {
        engine = _engine;
    }

    public function spawnCrate(size:Float, position:Vector3)
    {
        var hsize = size * 0.5;
        var e = new Entity();
        e.add(new StaticSprite2D());
        e.get(StaticSprite2D).setSprite(Gengine.getResourceCache().getSprite2D("crate.png", true));
        e.get(StaticSprite2D).setDrawRect(new Rect(new Vector2(-hsize, -hsize), new Vector2(hsize, hsize)));
        e.add(new RigidBody2D());
        e.get(RigidBody2D).setBodyType(2);
        e.add(new CollisionBox2D());
        e.get(CollisionBox2D).setSize(new Vector2(size, size));
        e.get(CollisionBox2D).setDensity(1);
        e.get(CollisionBox2D).setFriction(0.5);
        e.get(CollisionBox2D).setRestitution(0.1);
        e.position = position;
        engine.addEntity(e);
    }
}

class InputSystem extends System
{
    private var engine:Engine;
    private var camera:Camera;

    public function new(_camera:Camera)
    {
        super();
        camera = _camera;
    }

    override public function addToEngine(_engine:Engine)
    {
        engine = _engine;
    }

    override public function update(dt:Float):Void
    {
        var input = Gengine.getInput();

        if(input.getScancodePress(41))
        {
            Gengine.exit();
        }

        var mousePosition = input.getMousePosition();

        if(input.getMouseButtonPress(1))
        {
            var mouseWorldPosition = camera.screenToWorldPoint(new Vector3(mousePosition.x / 800, mousePosition.y / 600, 0));
            engine.getSystem(FactorySystem).spawnCrate(64, mouseWorldPosition);
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
        var cameraEntity = new Entity();
        cameraEntity.add(new Camera());
        cameraEntity.get(Camera).setOrthoSize(new Vector2(800, 600));
        cameraEntity.get(Camera).setOrthographic(true);
        engine.addEntity(cameraEntity);

        engine.addSystem(new InputSystem(cameraEntity.get(Camera)), 0);
        engine.addSystem(new FactorySystem(), 0);

        var sceneEntity = Gengine.getScene().getAsEntity();
        sceneEntity.add(new PhysicsWorld2D());
        sceneEntity.get(PhysicsWorld2D).setGravity(new Vector2(0, -100));
        sceneEntity.get(PhysicsWorld2D).setSubStepping(false);
        sceneEntity.get(PhysicsWorld2D).setContinuousPhysics(false);

        var e = new Entity();
        e.add(new RigidBody2D());
        e.add(new CollisionBox2D());
        e.get(CollisionBox2D).setSize(new Vector2(512, 512));
        e.add(new StaticSprite2D());
        e.get(StaticSprite2D).setSprite(Gengine.getResourceCache().getSprite2D("crate.png", true));
        e.get(StaticSprite2D).setDrawRect(new Rect(new Vector2(-256, -256), new Vector2(256, 256)));
        e.position = new Vector3(0, -400, 0);
        engine.addEntity(e);

        Gengine.getRenderer().getDefaultZone().setFogColor(new Color(0.5, 0.5, 0.5, 1));

        engine.getSystem(FactorySystem).spawnCrate(64, new Vector3(0, 300, 0));
    }
}
