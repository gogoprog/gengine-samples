import gengine.*;
import gengine.math.*;
import gengine.components.*;

class ScreenshotSystem extends System
{
    private var enabled = false;
    private var timeLeft = 2.0;

    public function new()
    {
        super();
    }

    override public function addToEngine(engine:Engine):Void
    {
        var str = Gengine.getStartupString();
        if(str == "screenshot")
        {
            enabled = true;
        }
    }

    override public function update(dt:Float):Void
    {
        if(enabled)
        {
            timeLeft -= dt;
            if(timeLeft < 0)
            {
                Gengine.takeScreenshot("screenshot.png");
                Gengine.exit();
            }
        }
    }
}
