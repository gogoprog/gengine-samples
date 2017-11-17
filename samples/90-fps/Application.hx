import gengine.*;
import gengine.components.*;
import gengine.math.*;
import gengine.graphics.*;
import gengine.components.Light;

class PlayerSystem extends System
{
    private var playerEntity:Entity;
    private var cameraEntity:Entity;
    private var terrainEntity:Entity;
    private var weaponEntity:Entity;

    private var pitch:Float = 0.0;
    private var yaw:Float = 0.0;
    private var time:Float = 0.0;

    private var weaponMove:Float = 0.0;

    public function new()
    {
        super();
    }

    override public function addToEngine(engine:Engine):Void
    {
        playerEntity = cast engine.getEntityByName("player");
        terrainEntity = cast engine.getEntityByName("terrain");
        cameraEntity = cast engine.getEntityByName("camera");
        weaponEntity = cast engine.getEntityByName("weapon");
    }

    override public function update(dt:Float)
    {
        var direction = new Vector3(0, 0, 0);
        time += dt;

        if(Gengine.getInput().getMouseButtonDown(1))
        {
            var move = Gengine.getInput().getMouseMove();

            pitch += move.y;
            yaw += move.x;

            playerEntity.setDirection(Vector3.FORWARD);

            playerEntity.yaw(yaw);
            playerEntity.pitch(pitch);
        }

        if(Gengine.getInput().getScancodeDown(26))
        {
            direction.z += 1;
        }

        if(Gengine.getInput().getScancodeDown(22))
        {
            direction.z -= 1;
        }

        if(Gengine.getInput().getScancodeDown(4))
        {
            direction.x -= 1;
        }

        if(Gengine.getInput().getScancodeDown(7))
        {
            direction.x += 1;
        }

        if(Maths.getVector3Length(direction) > 0)
        {
            var ndirection = Maths.getNormalizedVector3(direction);
            playerEntity.translate(ndirection * 8.0 * dt);
            time += dt * 10;
        }

        var position = playerEntity.position;
        var h = terrainEntity.get(Terrain).getHeight(position) + 1.0;
        playerEntity.setPosition(new Vector3(position.x, h, position.z));

        weaponEntity.setDirection(Vector3.FORWARD * -1);
        weaponEntity.pitch(0.7 * (Math.cos(time) - 0.5));
        weaponEntity.yaw(0.7 * (Math.cos(time) - 0.5));
    }
}

class GameSystem extends System
{
    public function new()
    {
        super();
    }

    override public function addToEngine(engine:Engine):Void
    {
        var playerEntity = new Entity();
        playerEntity.name = "player";
        playerEntity.setPosition(new Vector3(0.0, 0.0, 0.0));
        playerEntity.lookAt(new Vector3(0, 0.0, -1.0));

        var terrainEntity = new Entity();
        terrainEntity.name = "terrain";
        terrainEntity.add(new CollisionShape());
        terrainEntity.add(new Terrain());
        terrainEntity.get(Terrain).setPatchSize(64);
        terrainEntity.get(Terrain).setSpacing(new Vector3(1.0, 0.9, 1.0));
        terrainEntity.get(Terrain).setSmoothing(true);
        terrainEntity.get(Terrain).setCastShadows(true);
        terrainEntity.get(Terrain).setHeightMap(Gengine.getResourceCache().getImage('Map.png', true));
        terrainEntity.get(Terrain).setMaterial(Gengine.getResourceCache().getMaterial('Terrain.xml', true));
        engine.addEntity(terrainEntity);

        var weaponEntity = new Entity();
        weaponEntity.name = "weapon";
        weaponEntity.add(new AnimatedModel());
        weaponEntity.get(AnimatedModel).setModel1(Gengine.getResourceCache().getModel('Weapon.mdl', true), false);
        weaponEntity.get(AnimatedModel).setMaterial1(Gengine.getResourceCache().getMaterial('Materials/Weapon.xml', true));
        weaponEntity.get(AnimatedModel).setCastShadows(true);
        weaponEntity.scale = new Vector3(0.002, 0.002, 0.002);

        var cameraEntity = new Entity();
        cameraEntity.name = "camera";
        cameraEntity.add(new Camera());
        cameraEntity.setPosition(new Vector3(0.0, 1.0, 0.0));
        cameraEntity.get(Camera).setFov(50);
        cameraEntity.parent = playerEntity;

        var viewport:Viewport = new Viewport(Gengine.getContext());
        viewport.setScene(Gengine.getScene());
        viewport.setCamera(cameraEntity.get(Camera));
        Gengine.getRenderer().setViewport(0, viewport);

        var lightEntity = new Entity();
        var light = new Light();
        light.setLightType(0);
        light.setCastShadows(true);
        light.setColor(new Color(0.7, 0.7, 0.7, 1));
        light.setShadowBias(new BiasParameters(0.00025, 0.5, 0));
        light.setShadowCascade(new CascadeParameters(10.0, 50.0, 200.0, 0.0, 0.8, 1.0));
        light.setSpecularIntensity(0.5);
        lightEntity.add(light);
        lightEntity.setDirection(new Vector3(0.6, -1.0, 0.8));

        engine.addEntity(lightEntity);

        var skyEntity = new Entity();
        skyEntity.setScale(new Vector3(100,100,100));
        skyEntity.add(new Skybox());
        skyEntity.get(Skybox).setModel(Gengine.getResourceCache().getModel('Box.mdl', true));
        skyEntity.get(Skybox).setMaterial1(Gengine.getResourceCache().getMaterial('Skybox.xml', true));
        engine.addEntity(skyEntity);

        weaponEntity.parent = playerEntity;

        weaponEntity.position = new Vector3(0.15, 0.75, 0.35);

        cameraEntity.setDirection(Vector3.FORWARD);

        engine.addEntity(playerEntity);
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
        Gengine.setWindowSize(new IntVector2(1024, 768));
        Gengine.setWindowTitle("90-fps");
    }

    public static function start(engine:Engine)
    {
        engine.addSystem(new GameSystem(), 2);
        engine.addSystem(new PlayerSystem(), 3);
        engine.addSystem(new ScreenshotSystem(), 0);

        Gengine.getRenderer().getDefaultZone().setAmbientColor(new Color(0.15, 0.15, 0.15, 1));
    }
}
