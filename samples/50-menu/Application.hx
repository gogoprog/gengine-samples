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
    }
}
