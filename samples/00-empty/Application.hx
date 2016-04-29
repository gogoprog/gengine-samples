import gengine.*;
import gengine.math.*;

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
        Gengine.setWindowSize(new IntVector2(320, 200));
        Gengine.setWindowTitle("00-empty");
    }

    public static function start(engine:Engine)
    {
        engine.addSystem(new ExitSystem(), 0);
        trace("Empty application started.");
    }
}
