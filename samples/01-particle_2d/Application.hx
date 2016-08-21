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
        Gengine.setWindowSize(new IntVector2(640, 480));
        Gengine.setWindowTitle("01-particle_2d");
    }

    public static function start(engine:Engine)
    {
        engine.addSystem(new ExitSystem(), 0);

        var e = new Entity();
        e.add(new ParticleEmitter2D());
        var particleEmitter2D:ParticleEmitter2D = e.get(ParticleEmitter2D);
        particleEmitter2D.setEffect(Gengine.getResourceCache().getParticleEffect2D("sun.pex", true));
        engine.addEntity(e);

        e = new Entity();
        e.add(new ParticleEmitter2D());
        particleEmitter2D = e.get(ParticleEmitter2D);
        particleEmitter2D.setEffect(Gengine.getResourceCache().getParticleEffect2D("greenspiral.pex", true));
        engine.addEntity(e);

        Gengine.getRenderer().getDefaultZone().setFogColor(new Color(0,0,0,1));
    }
}
