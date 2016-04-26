import gengine.*;
import gengine.components.*;
import gengine.math.*;
import gengine.graphics.*;

class GameSystem extends System
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
        Gengine.setWindowSize(new IntVector2(1024, 768));
        Gengine.setWindowTitle("50-menu");
        Gengine.setGuiFilename("gui/menu.html");
    }

    public static function start(engine:Engine)
    {
        engine.addSystem(new GameSystem(), 2);

        var e:Entity = new Entity();
        var staticSprite2D = new StaticSprite2D(Gengine.getResourceCache().getSprite2D('bg.jpg', true));
        staticSprite2D.setDrawRect(new Rect(new Vector2(-512, -384), new Vector2(512, 384)));
        e.add(staticSprite2D);
        engine.addEntity(e);

        var cameraEntity = new Entity();
        cameraEntity.add(new Camera());
        engine.addEntity(cameraEntity);
        cameraEntity.setPosition(new Vector3(0.0, 5.0, -5.0));
        cameraEntity.setDirection(new Vector3(0.0, -1.0, 1.0));

        var viewport:Viewport = new Viewport(Gengine.getContext());
        viewport.setScene(Gengine.getScene());
        viewport.setCamera(cameraEntity.get(Camera).getCamera());
        Gengine.getRenderer().setViewport(0, viewport);

        var lightEntity = new Entity();
        lightEntity.add(new Light());
        engine.addEntity(lightEntity);
        lightEntity.setPosition(new Vector3(0.0, 5.0, -5.0));
        lightEntity.setDirection(new Vector3(0.0, -1.0, 1.0));
        lightEntity.get(Light).setLightType(1);

        var modelEntity = new Entity();
        modelEntity.add(new StaticModel());
        modelEntity.get(StaticModel).setModel(Gengine.getResourceCache().getModel('Ninja.mdl', true));
        modelEntity.get(StaticModel).setMaterial(Gengine.getResourceCache().getMaterial('Ninja.xml', true));

        engine.addEntity(modelEntity);
    }
}
