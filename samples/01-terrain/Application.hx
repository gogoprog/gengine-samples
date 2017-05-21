import gengine.*;
import gengine.components.*;
import gengine.math.*;
import gengine.graphics.*;

class GameSystem extends System
{
    private var terrainEntity:Entity;

    public function new()
    {
        super();
    }

    override public function addToEngine(engine:Engine):Void
    {
        terrainEntity = new Entity();
        terrainEntity.add(new Terrain());

        terrainEntity.get(Terrain).setPatchSize(64);
        terrainEntity.get(Terrain).setSpacing(new Vector3(2.0, 0.5, 2.0));
        terrainEntity.get(Terrain).setSmoothing(true);
        terrainEntity.get(Terrain).setHeightMap(Gengine.getResourceCache().getImage('HeightMap.png', true));
        terrainEntity.get(Terrain).setMaterial(Gengine.getResourceCache().getMaterial('Terrain.xml', true));
        terrainEntity.setPosition(new Vector3(-0.7, 0, -0.2));

        engine.addEntity(terrainEntity);
    }

    override public function update(dt:Float):Void
    {
        terrainEntity.yaw(dt * 20);

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
        Gengine.setWindowTitle("01-terrain");
    }

    public static function start(engine:Engine)
    {
        engine.addSystem(new GameSystem(), 2);

        var cameraEntity = new Entity();
        cameraEntity.add(new Camera());
        engine.addEntity(cameraEntity);
        cameraEntity.setPosition(new Vector3(0.0, 15.0, -30.0));
        cameraEntity.lookAt(new Vector3(0, 1, 0));

        var viewport:Viewport = new Viewport(Gengine.getContext());
        viewport.setScene(Gengine.getScene());
        viewport.setCamera(cameraEntity.get(Camera));
        Gengine.getRenderer().setViewport(0, viewport);

        var lightEntity = new Entity();
        lightEntity.add(new Light());
        engine.addEntity(lightEntity);
        lightEntity.setPosition(new Vector3(0.0, 5.0, -5.0));
        lightEntity.setDirection(new Vector3(0.0, -1.0, 1.0));
        lightEntity.get(Light).setLightType(1);

        Gengine.getRenderer().getDefaultZone().setAmbientColor(new Color(0.75,0.75,0.75,1));
    }
}
