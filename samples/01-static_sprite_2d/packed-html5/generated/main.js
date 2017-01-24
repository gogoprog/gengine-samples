(function (console, $global) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ash_core_System = function() {
	this.priority = 0;
};
ash_core_System.__name__ = ["ash","core","System"];
ash_core_System.prototype = {
	addToEngine: function(engine) {
	}
	,removeFromEngine: function(engine) {
	}
	,update: function(time) {
	}
	,__class__: ash_core_System
};
var ExitSystem = function() {
	ash_core_System.call(this);
};
ExitSystem.__name__ = ["ExitSystem"];
ExitSystem.__super__ = ash_core_System;
ExitSystem.prototype = $extend(ash_core_System.prototype,{
	update: function(dt) {
		if(gengine.getInput().getScancodePress(41)) gengine.exit();
	}
	,__class__: ExitSystem
});
var Application = function() { };
Application.__name__ = ["Application"];
Application.init = function() {
	gengine.setWindowSize(Module.IntVector2(320,200));
	gengine.setWindowTitle("01-static_sprite_2d");
};
Application.start = function(engine) {
	engine.addSystem(new ExitSystem(),0);
	var e = new gengine_Entity();
	e.add(new gengine_components_StaticSprite2D());
	var staticSprite2D = e.get(gengine_components_StaticSprite2D);
	staticSprite2D.setSprite(gengine.getResourceCache().getSprite2D("logo.png",true));
	engine.addEntity(e);
	gengine.getRenderer().getDefaultZone().setFogColor(Module.Color(1,1,1,1));
};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = ["haxe","IMap"];
var ash_ClassMap = function() {
	this.keyMap = new haxe_ds_StringMap();
	this.valueMap = new haxe_ds_StringMap();
};
ash_ClassMap.__name__ = ["ash","ClassMap"];
ash_ClassMap.__interfaces__ = [haxe_IMap];
ash_ClassMap.prototype = {
	get: function(k) {
		return this.valueMap.get(Type.getClassName(k));
	}
	,set: function(k,v) {
		var name = Type.getClassName(k);
		this.keyMap.set(name,k);
		this.valueMap.set(name,v);
	}
	,exists: function(k) {
		return this.valueMap.exists(Type.getClassName(k));
	}
	,remove: function(k) {
		var name = Type.getClassName(k);
		this.keyMap.remove(name);
		return this.valueMap.remove(name);
	}
	,keys: function() {
		return this.keyMap.iterator();
	}
	,iterator: function() {
		return this.valueMap.iterator();
	}
	,toString: function() {
		return this.valueMap.toString();
	}
	,__class__: ash_ClassMap
};
var ash_GenericListIterator = function(head) {
	this.previous = { next : head};
};
ash_GenericListIterator.__name__ = ["ash","GenericListIterator"];
ash_GenericListIterator.prototype = {
	hasNext: function() {
		return this.previous.next != null;
	}
	,next: function() {
		var node = this.previous.next;
		this.previous = node;
		return node;
	}
	,__class__: ash_GenericListIterator
};
var ash_core_IFamily = function() { };
ash_core_IFamily.__name__ = ["ash","core","IFamily"];
ash_core_IFamily.prototype = {
	__class__: ash_core_IFamily
};
var ash_core_ComponentMatchingFamily = function(nodeClass,engine) {
	this.nodeClass = nodeClass;
	this.engine = engine;
	this.init();
};
ash_core_ComponentMatchingFamily.__name__ = ["ash","core","ComponentMatchingFamily"];
ash_core_ComponentMatchingFamily.__interfaces__ = [ash_core_IFamily];
ash_core_ComponentMatchingFamily.prototype = {
	init: function() {
		this.nodeList = new ash_core_NodeList();
		this.entities = new haxe_ds_ObjectMap();
		this.components = this.nodeClass._getComponents();
		this.nodePool = new ash_core_NodePool(this.nodeClass,this.components);
	}
	,newEntity: function(entity) {
		this.addIfMatch(entity);
	}
	,componentAddedToEntity: function(entity,componentClass) {
		this.addIfMatch(entity);
	}
	,componentRemovedFromEntity: function(entity,componentClass) {
		if(this.components.valueMap.exists(Type.getClassName(componentClass))) this.removeIfMatch(entity);
	}
	,removeEntity: function(entity) {
		this.removeIfMatch(entity);
	}
	,addIfMatch: function(entity) {
		if(!(this.entities.h.__keys__[entity.__id__] != null)) {
			var $it0 = this.components.keyMap.iterator();
			while( $it0.hasNext() ) {
				var componentClass = $it0.next();
				if(!entity.has(componentClass)) return;
			}
			var node = this.nodePool.get();
			node.entity = entity;
			var $it1 = this.components.keyMap.iterator();
			while( $it1.hasNext() ) {
				var componentClass1 = $it1.next();
				Reflect.setField(node,this.components.valueMap.get(Type.getClassName(componentClass1)),entity.get(componentClass1));
			}
			this.entities.set(entity,node);
			this.nodeList.add(node);
		}
	}
	,removeIfMatch: function(entity) {
		if(this.entities.h.__keys__[entity.__id__] != null) {
			var node = this.entities.h[entity.__id__];
			this.entities.remove(entity);
			this.nodeList.remove(node);
			if(this.engine.updating) {
				this.nodePool.cache(node);
				this.engine.updateComplete.add($bind(this,this.releaseNodePoolCache));
			} else this.nodePool.dispose(node);
		}
	}
	,releaseNodePoolCache: function() {
		this.engine.updateComplete.remove($bind(this,this.releaseNodePoolCache));
		this.nodePool.releaseCache();
	}
	,cleanUp: function() {
		var _g = new ash_GenericListIterator(this.nodeList.head);
		while(_g.previous.next != null) {
			var node = _g.next();
			this.entities.remove(node.entity);
		}
		this.nodeList.removeAll();
	}
	,__class__: ash_core_ComponentMatchingFamily
};
var ash_core_Engine = function() {
	this.familyClass = ash_core_ComponentMatchingFamily;
	this.entityList = new ash_core_EntityList();
	this.entityNames = new haxe_ds_StringMap();
	this.systemList = new ash_core_SystemList();
	this.families = new ash_ClassMap();
	this.entityAdded = new ash_signals_Signal1();
	this.entityRemoved = new ash_signals_Signal1();
	this.updateComplete = new ash_signals_Signal0();
	this.updating = false;
};
ash_core_Engine.__name__ = ["ash","core","Engine"];
ash_core_Engine.prototype = {
	addEntity: function(entity) {
		if(this.entityNames.exists(entity.name)) throw new js__$Boot_HaxeError("The entity name " + entity.name + " is already in use by another entity.");
		this.entityList.add(entity);
		this.entityNames.set(entity.name,entity);
		entity.componentAdded.add($bind(this,this.componentAdded));
		entity.componentRemoved.add($bind(this,this.componentRemoved));
		entity.nameChanged.add($bind(this,this.entityNameChanged));
		var $it0 = this.families.valueMap.iterator();
		while( $it0.hasNext() ) {
			var family = $it0.next();
			family.newEntity(entity);
		}
		this.entityAdded.dispatch(entity);
	}
	,removeEntity: function(entity) {
		entity.componentAdded.remove($bind(this,this.componentAdded));
		entity.componentRemoved.remove($bind(this,this.componentRemoved));
		entity.nameChanged.remove($bind(this,this.entityNameChanged));
		var $it0 = this.families.valueMap.iterator();
		while( $it0.hasNext() ) {
			var family = $it0.next();
			family.removeEntity(entity);
		}
		this.entityNames.remove(entity.name);
		this.entityList.remove(entity);
		this.entityRemoved.dispatch(entity);
	}
	,entityNameChanged: function(entity,oldName) {
		if(this.entityNames.get(oldName) == entity) {
			this.entityNames.remove(oldName);
			this.entityNames.set(entity.name,entity);
		}
	}
	,getEntityByName: function(name) {
		return this.entityNames.get(name);
	}
	,removeAllEntities: function() {
		while(this.entityList.head != null) this.removeEntity(this.entityList.head);
	}
	,get_entities: function() {
		return this.entityList;
	}
	,componentAdded: function(entity,componentClass) {
		var $it0 = this.families.valueMap.iterator();
		while( $it0.hasNext() ) {
			var family = $it0.next();
			family.componentAddedToEntity(entity,componentClass);
		}
	}
	,componentRemoved: function(entity,componentClass) {
		var $it0 = this.families.valueMap.iterator();
		while( $it0.hasNext() ) {
			var family = $it0.next();
			family.componentRemovedFromEntity(entity,componentClass);
		}
	}
	,getNodeList: function(nodeClass) {
		if(this.families.valueMap.exists(Type.getClassName(nodeClass))) return this.families.valueMap.get(Type.getClassName(nodeClass)).nodeList;
		var family = Type.createInstance(this.familyClass,[nodeClass,this]);
		this.families.set(nodeClass,family);
		var _g = new ash_GenericListIterator(this.entityList.head);
		while(_g.previous.next != null) {
			var entity = _g.next();
			family.newEntity(entity);
		}
		return family.nodeList;
	}
	,releaseNodeList: function(nodeClass) {
		if(this.families.valueMap.exists(Type.getClassName(nodeClass))) {
			this.families.valueMap.get(Type.getClassName(nodeClass)).cleanUp();
			this.families.remove(nodeClass);
		}
	}
	,addSystem: function(system,priority) {
		if(this.updating) throw new js__$Boot_HaxeError("Systems cannot be added during engine update. The updateComplete signal should be used.");
		system.priority = priority;
		system.addToEngine(this);
		this.systemList.add(system);
	}
	,getSystem: function(type) {
		return this.systemList.get(type);
	}
	,get_systems: function() {
		return this.systemList;
	}
	,removeSystem: function(system) {
		if(this.updating) throw new js__$Boot_HaxeError("Systems cannot be removed during engine update. The updateComplete signal should be used.");
		this.systemList.remove(system);
		system.removeFromEngine(this);
	}
	,removeAllSystems: function() {
		while(this.systemList.head != null) {
			var system = this.systemList.head;
			this.systemList.head = this.systemList.head.next;
			system.previous = null;
			system.next = null;
			system.removeFromEngine(this);
			this.removeSystem(this.systemList.head);
		}
		this.systemList.tail = null;
	}
	,update: function(time) {
		this.updating = true;
		var _g = new ash_GenericListIterator(this.systemList.head);
		while(_g.previous.next != null) {
			var system = _g.next();
			system.update(time);
		}
		this.updating = false;
		this.updateComplete.dispatch();
	}
	,__class__: ash_core_Engine
};
var ash_core_Entity = function(name) {
	if(name == null) name = "";
	this.componentAdded = new ash_signals_Signal2();
	this.componentRemoved = new ash_signals_Signal2();
	this.nameChanged = new ash_signals_Signal2();
	this.components = new ash_ClassMap();
	if(name != "") this.set_name(name); else this.set_name("_entity" + ++ash_core_Entity.nameCount);
};
ash_core_Entity.__name__ = ["ash","core","Entity"];
ash_core_Entity.prototype = {
	set_name: function(value) {
		if(this.name != value) {
			var previous = this.name;
			this.name = value;
			this.nameChanged.dispatch(this,previous);
		}
		return value;
	}
	,add: function(component,componentClass) {
		if(componentClass == null) if(component == null) componentClass = null; else componentClass = js_Boot.getClass(component);
		if(this.components.valueMap.exists(Type.getClassName(componentClass))) this.remove(componentClass);
		this.components.set(componentClass,component);
		this.componentAdded.dispatch(this,componentClass);
		return this;
	}
	,remove: function(componentClass) {
		var component = this.components.valueMap.get(Type.getClassName(componentClass));
		if(component != null) {
			this.components.remove(componentClass);
			this.componentRemoved.dispatch(this,componentClass);
			return component;
		}
		return null;
	}
	,get: function(componentClass) {
		return this.components.valueMap.get(Type.getClassName(componentClass));
	}
	,getAll: function() {
		var componentArray = [];
		var $it0 = this.components.valueMap.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			componentArray.push(component);
		}
		return componentArray;
	}
	,has: function(componentClass) {
		return this.components.valueMap.exists(Type.getClassName(componentClass));
	}
	,__class__: ash_core_Entity
};
var ash_core_EntityList = function() {
};
ash_core_EntityList.__name__ = ["ash","core","EntityList"];
ash_core_EntityList.prototype = {
	add: function(entity) {
		if(this.head == null) {
			this.head = this.tail = entity;
			entity.next = entity.previous = null;
		} else {
			this.tail.next = entity;
			entity.previous = this.tail;
			entity.next = null;
			this.tail = entity;
		}
	}
	,remove: function(entity) {
		if(this.head == entity) this.head = this.head.next;
		if(this.tail == entity) this.tail = this.tail.previous;
		if(entity.previous != null) entity.previous.next = entity.next;
		if(entity.next != null) entity.next.previous = entity.previous;
	}
	,removeAll: function() {
		while(this.head != null) {
			var entity = this.head;
			this.head = this.head.next;
			entity.previous = null;
			entity.next = null;
		}
		this.tail = null;
	}
	,iterator: function() {
		return new ash_GenericListIterator(this.head);
	}
	,__class__: ash_core_EntityList
};
var ash_core_Node = function() { };
ash_core_Node.__name__ = ["ash","core","Node"];
ash_core_Node.prototype = {
	__class__: ash_core_Node
};
var ash_core_NodeList = function() {
	this.nodeAdded = new ash_signals_Signal1();
	this.nodeRemoved = new ash_signals_Signal1();
};
ash_core_NodeList.__name__ = ["ash","core","NodeList"];
ash_core_NodeList.prototype = {
	add: function(node) {
		if(this.head == null) {
			this.head = this.tail = node;
			node.next = node.previous = null;
		} else {
			this.tail.next = node;
			node.previous = this.tail;
			node.next = null;
			this.tail = node;
		}
		this.nodeAdded.dispatch(node);
	}
	,remove: function(node) {
		if(this.head == node) this.head = this.head.next;
		if(this.tail == node) this.tail = this.tail.previous;
		if(node.previous != null) node.previous.next = node.next;
		if(node.next != null) node.next.previous = node.previous;
		this.nodeRemoved.dispatch(node);
	}
	,removeAll: function() {
		while(this.head != null) {
			var node = this.head;
			this.head = this.head.next;
			node.previous = null;
			node.next = null;
			this.nodeRemoved.dispatch(node);
		}
		this.tail = null;
	}
	,get_empty: function() {
		return this.head == null;
	}
	,iterator: function() {
		return new ash_GenericListIterator(this.head);
	}
	,swap: function(node1,node2) {
		if(node1.previous == node2) {
			node1.previous = node2.previous;
			node2.previous = node1;
			node2.next = node1.next;
			node1.next = node2;
		} else if(node2.previous == node1) {
			node2.previous = node1.previous;
			node1.previous = node2;
			node1.next = node2.next;
			node2.next = node1;
		} else {
			var temp = node1.previous;
			node1.previous = node2.previous;
			node2.previous = temp;
			temp = node1.next;
			node1.next = node2.next;
			node2.next = temp;
		}
		if(this.head == node1) this.head = node2; else if(this.head == node2) this.head = node1;
		if(this.tail == node1) this.tail = node2; else if(this.tail == node2) this.tail = node1;
		if(node1.previous != null) node1.previous.next = node1;
		if(node2.previous != null) node2.previous.next = node2;
		if(node1.next != null) node1.next.previous = node1;
		if(node2.next != null) node2.next.previous = node2;
	}
	,insertionSort: function(sortFunction) {
		if(this.head == this.tail) return;
		var remains = this.head.next;
		var node = remains;
		while(node != null) {
			remains = node.next;
			var other = node.previous;
			while(other != null) {
				if(sortFunction(node,other) >= 0) {
					if(node != other.next) {
						if(this.tail == node) this.tail = node.previous;
						node.previous.next = node.next;
						if(node.next != null) node.next.previous = node.previous;
						node.next = other.next;
						node.previous = other;
						node.next.previous = node;
						other.next = node;
					}
					break;
				}
				other = other.previous;
			}
			if(other == null) {
				if(this.tail == node) this.tail = node.previous;
				node.previous.next = node.next;
				if(node.next != null) node.next.previous = node.previous;
				node.next = this.head;
				this.head.previous = node;
				node.previous = null;
				this.head = node;
			}
			node = remains;
		}
	}
	,mergeSort: function(sortFunction) {
		if(this.head == this.tail) return;
		var lists = [];
		var start = this.head;
		var end;
		while(start != null) {
			end = start;
			while(end.next != null && sortFunction(end,end.next) <= 0) end = end.next;
			var next = end.next;
			start.previous = end.next = null;
			lists.push(start);
			start = next;
		}
		while(lists.length > 1) lists.push(this.merge(lists.shift(),lists.shift(),sortFunction));
		this.tail = this.head = lists[0];
		while(this.tail.next != null) this.tail = this.tail.next;
	}
	,merge: function(head1,head2,sortFunction) {
		var node;
		var head;
		if(sortFunction(head1,head2) <= 0) {
			head = node = head1;
			head1 = head1.next;
		} else {
			head = node = head2;
			head2 = head2.next;
		}
		while(head1 != null && head2 != null) if(sortFunction(head1,head2) <= 0) {
			node.next = head1;
			head1.previous = node;
			node = head1;
			head1 = head1.next;
		} else {
			node.next = head2;
			head2.previous = node;
			node = head2;
			head2 = head2.next;
		}
		if(head1 != null) {
			node.next = head1;
			head1.previous = node;
		} else {
			node.next = head2;
			head2.previous = node;
		}
		return head;
	}
	,__class__: ash_core_NodeList
};
var ash_core_NodePool = function(nodeClass,components) {
	this.nodeClass = nodeClass;
	this.components = components;
};
ash_core_NodePool.__name__ = ["ash","core","NodePool"];
ash_core_NodePool.prototype = {
	get: function() {
		if(this.tail != null) {
			var node = this.tail;
			this.tail = this.tail.previous;
			node.previous = null;
			return node;
		} else return Type.createEmptyInstance(this.nodeClass);
	}
	,dispose: function(node) {
		var $it0 = this.components.valueMap.iterator();
		while( $it0.hasNext() ) {
			var componentName = $it0.next();
			node[componentName] = null;
		}
		node.entity = null;
		node.next = null;
		node.previous = this.tail;
		this.tail = node;
	}
	,cache: function(node) {
		node.previous = this.cacheTail;
		this.cacheTail = node;
	}
	,releaseCache: function() {
		while(this.cacheTail != null) {
			var node = this.cacheTail;
			this.cacheTail = node.previous;
			node.next = null;
			node.previous = this.tail;
			this.tail = node;
		}
	}
	,__class__: ash_core_NodePool
};
var ash_core_SystemList = function() {
};
ash_core_SystemList.__name__ = ["ash","core","SystemList"];
ash_core_SystemList.prototype = {
	add: function(system) {
		if(this.head == null) {
			this.head = this.tail = system;
			system.next = system.previous = null;
		} else {
			var node = this.tail;
			while(node != null) {
				if(node.priority <= system.priority) break;
				node = node.previous;
			}
			if(node == this.tail) {
				this.tail.next = system;
				system.previous = this.tail;
				system.next = null;
				this.tail = system;
			} else if(node == null) {
				system.next = this.head;
				system.previous = null;
				this.head.previous = system;
				this.head = system;
			} else {
				system.next = node.next;
				system.previous = node;
				node.next.previous = system;
				node.next = system;
			}
		}
	}
	,remove: function(system) {
		if(this.head == system) this.head = this.head.next;
		if(this.tail == system) this.tail = this.tail.previous;
		if(system.previous != null) system.previous.next = system.next;
		if(system.next != null) system.next.previous = system.previous;
	}
	,removeAll: function() {
		while(this.head != null) {
			var system = this.head;
			this.head = this.head.next;
			system.previous = null;
			system.next = null;
		}
		this.tail = null;
	}
	,get: function(type) {
		var system = this.head;
		while(system != null) {
			if(js_Boot.__instanceof(system,type)) return system;
			system = system.next;
		}
		return null;
	}
	,iterator: function() {
		return new ash_GenericListIterator(this.head);
	}
	,__class__: ash_core_SystemList
};
var ash_signals_ListenerNode = function() {
};
ash_signals_ListenerNode.__name__ = ["ash","signals","ListenerNode"];
ash_signals_ListenerNode.prototype = {
	__class__: ash_signals_ListenerNode
};
var ash_signals_ListenerNodePool = function() {
};
ash_signals_ListenerNodePool.__name__ = ["ash","signals","ListenerNodePool"];
ash_signals_ListenerNodePool.prototype = {
	get: function() {
		if(this.tail != null) {
			var node = this.tail;
			this.tail = this.tail.previous;
			node.previous = null;
			return node;
		} else return new ash_signals_ListenerNode();
	}
	,dispose: function(node) {
		node.listener = null;
		node.once = false;
		node.next = null;
		node.previous = this.tail;
		this.tail = node;
	}
	,cache: function(node) {
		node.listener = null;
		node.previous = this.cacheTail;
		this.cacheTail = node;
	}
	,releaseCache: function() {
		while(this.cacheTail != null) {
			var node = this.cacheTail;
			this.cacheTail = node.previous;
			node.next = null;
			node.previous = this.tail;
			this.tail = node;
		}
	}
	,__class__: ash_signals_ListenerNodePool
};
var ash_signals_SignalBase = function() {
	this.listenerNodePool = new ash_signals_ListenerNodePool();
	this.numListeners = 0;
};
ash_signals_SignalBase.__name__ = ["ash","signals","SignalBase"];
ash_signals_SignalBase.prototype = {
	startDispatch: function() {
		this.dispatching = true;
	}
	,endDispatch: function() {
		this.dispatching = false;
		if(this.toAddHead != null) {
			if(this.head == null) {
				this.head = this.toAddHead;
				this.tail = this.toAddTail;
			} else {
				this.tail.next = this.toAddHead;
				this.toAddHead.previous = this.tail;
				this.tail = this.toAddTail;
			}
			this.toAddHead = null;
			this.toAddTail = null;
		}
		this.listenerNodePool.releaseCache();
	}
	,getNode: function(listener) {
		var node = this.head;
		while(node != null) {
			if(Reflect.compareMethods(node.listener,listener)) break;
			node = node.next;
		}
		if(node == null) {
			node = this.toAddHead;
			while(node != null) {
				if(Reflect.compareMethods(node.listener,listener)) break;
				node = node.next;
			}
		}
		return node;
	}
	,nodeExists: function(listener) {
		return this.getNode(listener) != null;
	}
	,add: function(listener) {
		if(this.getNode(listener) != null) return;
		var node = this.listenerNodePool.get();
		node.listener = listener;
		this.addNode(node);
	}
	,addOnce: function(listener) {
		if(this.getNode(listener) != null) return;
		var node = this.listenerNodePool.get();
		node.listener = listener;
		node.once = true;
		this.addNode(node);
	}
	,addNode: function(node) {
		if(this.dispatching) {
			if(this.toAddHead == null) this.toAddHead = this.toAddTail = node; else {
				this.toAddTail.next = node;
				node.previous = this.toAddTail;
				this.toAddTail = node;
			}
		} else if(this.head == null) this.head = this.tail = node; else {
			this.tail.next = node;
			node.previous = this.tail;
			this.tail = node;
		}
		this.numListeners++;
	}
	,remove: function(listener) {
		var node = this.getNode(listener);
		if(node != null) {
			if(this.head == node) this.head = this.head.next;
			if(this.tail == node) this.tail = this.tail.previous;
			if(this.toAddHead == node) this.toAddHead = this.toAddHead.next;
			if(this.toAddTail == node) this.toAddTail = this.toAddTail.previous;
			if(node.previous != null) node.previous.next = node.next;
			if(node.next != null) node.next.previous = node.previous;
			if(this.dispatching) this.listenerNodePool.cache(node); else this.listenerNodePool.dispose(node);
			this.numListeners--;
		}
	}
	,removeAll: function() {
		while(this.head != null) {
			var node = this.head;
			this.head = this.head.next;
			this.listenerNodePool.dispose(node);
		}
		this.tail = null;
		this.toAddHead = null;
		this.toAddTail = null;
		this.numListeners = 0;
	}
	,__class__: ash_signals_SignalBase
};
var ash_signals_Signal0 = function() {
	ash_signals_SignalBase.call(this);
};
ash_signals_Signal0.__name__ = ["ash","signals","Signal0"];
ash_signals_Signal0.__super__ = ash_signals_SignalBase;
ash_signals_Signal0.prototype = $extend(ash_signals_SignalBase.prototype,{
	dispatch: function() {
		this.startDispatch();
		var node = this.head;
		while(node != null) {
			node.listener();
			if(node.once) this.remove(node.listener);
			node = node.next;
		}
		this.endDispatch();
	}
	,__class__: ash_signals_Signal0
});
var ash_signals_Signal1 = function() {
	ash_signals_SignalBase.call(this);
};
ash_signals_Signal1.__name__ = ["ash","signals","Signal1"];
ash_signals_Signal1.__super__ = ash_signals_SignalBase;
ash_signals_Signal1.prototype = $extend(ash_signals_SignalBase.prototype,{
	dispatch: function(object1) {
		this.startDispatch();
		var node = this.head;
		while(node != null) {
			node.listener(object1);
			if(node.once) this.remove(node.listener);
			node = node.next;
		}
		this.endDispatch();
	}
	,__class__: ash_signals_Signal1
});
var ash_signals_Signal2 = function() {
	ash_signals_SignalBase.call(this);
};
ash_signals_Signal2.__name__ = ["ash","signals","Signal2"];
ash_signals_Signal2.__super__ = ash_signals_SignalBase;
ash_signals_Signal2.prototype = $extend(ash_signals_SignalBase.prototype,{
	dispatch: function(object1,object2) {
		this.startDispatch();
		var node = this.head;
		while(node != null) {
			node.listener(object1,object2);
			if(node.once) this.remove(node.listener);
			node = node.next;
		}
		this.endDispatch();
	}
	,__class__: ash_signals_Signal2
});
var ash_tools_ListIteratingSystem = function(nodeClass,nodeUpdateFunction,nodeAddedFunction,nodeRemovedFunction) {
	ash_core_System.call(this);
	this.nodeClass = nodeClass;
	this.nodeUpdateFunction = nodeUpdateFunction;
	this.nodeAddedFunction = nodeAddedFunction;
	this.nodeRemovedFunction = nodeRemovedFunction;
};
ash_tools_ListIteratingSystem.__name__ = ["ash","tools","ListIteratingSystem"];
ash_tools_ListIteratingSystem.__super__ = ash_core_System;
ash_tools_ListIteratingSystem.prototype = $extend(ash_core_System.prototype,{
	addToEngine: function(engine) {
		this.nodeList = engine.getNodeList(this.nodeClass);
		if(this.nodeAddedFunction != null) {
			var _g = new ash_GenericListIterator(this.nodeList.head);
			while(_g.previous.next != null) {
				var node = _g.next();
				this.nodeAddedFunction(node);
			}
			this.nodeList.nodeAdded.add(this.nodeAddedFunction);
		}
		if(this.nodeRemovedFunction != null) this.nodeList.nodeRemoved.add(this.nodeRemovedFunction);
	}
	,removeFromEngine: function(engine) {
		if(this.nodeAddedFunction != null) this.nodeList.nodeAdded.remove(this.nodeAddedFunction);
		if(this.nodeRemovedFunction != null) this.nodeList.nodeRemoved.remove(this.nodeRemovedFunction);
		this.nodeList = null;
	}
	,update: function(time) {
		if(this.nodeUpdateFunction != null) {
			var _g = new ash_GenericListIterator(this.nodeList.head);
			while(_g.previous.next != null) {
				var node = _g.next();
				this.nodeUpdateFunction(node,time);
			}
		}
	}
	,__class__: ash_tools_ListIteratingSystem
});
var gengine_Entity = function(node) {
	this._children = [];
	ash_core_Entity.call(this);
	if(node == null) {
		this.node = new Module.Node(gengine.getContext()); this.node.addRef();;
	} else {
		this.node = node;;
	}
};
gengine_Entity.__name__ = ["gengine","Entity"];
gengine_Entity.__super__ = ash_core_Entity;
gengine_Entity.prototype = $extend(ash_core_Entity.prototype,{
	add: function(component,componentClass) {
		if(js_Boot.__instanceof(component,gengine_components_UrhoComponent)) this.node.addComponent((js_Boot.__cast(component , gengine_components_UrhoComponent)).object,0,0);
		return ash_core_Entity.prototype.add.call(this,component,componentClass);
	}
	,remove: function(componentClass) {
		var component = ash_core_Entity.prototype.remove.call(this,componentClass);
		if(component != null && js_Boot.__instanceof(component,gengine_components_UrhoComponent)) this.node.removeComponent((js_Boot.__cast(component , gengine_components_UrhoComponent)).object);
		return component;
	}
	,set_position: function(position) {
		this.node.setPosition(position);
		return position;
	}
	,get_position: function() {
		return this.node.getPosition();
	}
	,set_scale: function(scale) {
		this.node.setScale(scale);
		return scale;
	}
	,get_scale: function() {
		return this.node.getScale();
	}
	,setPosition: function(position) {
		this.node.setPosition(position);
		return position;
	}
	,getPosition: function() {
		return this.node.getPosition();
	}
	,setScale: function(scale) {
		this.node.setScale(scale);
		return scale;
	}
	,getScale: function() {
		return this.node.getScale();
	}
	,setRotation2D: function(angle) {
		this.node.setRotation2D(angle);
	}
	,getRotation2D: function() {
		return this.node.getRotation2D();
	}
	,setDirection: function(direction) {
		this.node.setDirection(direction);
	}
	,getDirection: function() {
		return this.node.getDirection();
	}
	,getUp: function() {
		return this.node.getUp();
	}
	,getRight: function() {
		return this.node.getRight();
	}
	,setWorldPosition: function(position) {
		this.node.setWorldPosition(position);
	}
	,getWorldPosition: function() {
		return this.node.getWorldPosition();
	}
	,setWorldRotation2D: function(angle) {
		this.node.setWorldRotation2D(angle);
	}
	,getWorldRotation2D: function() {
		return this.node.getWorldRotation2D();
	}
	,setWorldScale: function(scale) {
		this.node.setWorldScale(scale);
	}
	,getWorldScale: function() {
		return this.node.getWorldScale();
	}
	,setParent: function(parent) {
		if(this._parent != null) HxOverrides.remove(this._parent._children,this);
		if(parent != null) {
			parent._children.push(this);
			this.node.setParent(parent.node);
			this._parent = parent;
		} else {
			this.node.setParent(null);
			this._parent = null;
		}
	}
	,getParent: function() {
		return this._parent;
	}
	,set_parent: function(parent) {
		if(this._parent != null) HxOverrides.remove(this._parent._children,this);
		if(parent != null) {
			parent._children.push(this);
			this.node.setParent(parent.node);
			this._parent = parent;
		} else {
			this.node.setParent(null);
			this._parent = null;
		}
		return parent;
	}
	,get_parent: function() {
		return this._parent;
	}
	,roll: function(angle,transformSpace) {
		if(transformSpace == null) transformSpace = 0;
		this.node.roll(angle,transformSpace);
	}
	,yaw: function(angle,transformSpace) {
		if(transformSpace == null) transformSpace = 0;
		this.node.yaw(angle,transformSpace);
	}
	,pitch: function(angle,transformSpace) {
		if(transformSpace == null) transformSpace = 0;
		this.node.pitch(angle,transformSpace);
	}
	,lookAt: function(position,upVector,transformSpace) {
		if(transformSpace == null) transformSpace = 2;
		if(upVector == null) upVector = Module.Vector3(0,1,0);
		this.node.lookAt(position,upVector,transformSpace);
	}
	,__class__: gengine_Entity
});
var gengine_Main = function() { };
gengine_Main.__name__ = ["gengine","Main"];
gengine_Main.main = function() {
	window.Main = gengine_Main;;
};
gengine_Main.init = function() {
	console.log("[gengine] Initializing...");
	Application.init();
};
gengine_Main.start = function() {
	console.log("[gengine] Starting...");
	gengine_Main.engine = new ash_core_Engine();
	gengine_Main.engine.entityAdded.add(gengine_Main.onEntityAdded);
	gengine_Main.engine.entityRemoved.add(gengine_Main.onEntityRemoved);
	window.dummyNode = gengine.getScene().createChild(0, 0, false);;
	window.dummyNode.setEnabled(false);
	gengine_Main.engine.addSystem(new gengine_systems_Physics2DSystem(),1);
	Application.start(gengine_Main.engine);
};
gengine_Main.update = function(dt) {
	gengine_Main.engine.update(dt);
};
gengine_Main.onEntityAdded = function(entity) {
	var scene = gengine.getScene();
	var gentity;
	gentity = js_Boot.__cast(entity , gengine_Entity);
	if(gentity._parent == null) {
		scene.addChild(entity.node, 1000);
	}
	var r = entity.get(gengine_components_RigidBody2D);
	if(r != null) gengine_systems_Physics2DSystem.addEntity(r.object,entity);
	var _g = 0;
	var _g1 = gentity._children;
	while(_g < _g1.length) {
		var c = _g1[_g];
		++_g;
		gengine_Main.engine.addEntity(c);
	}
};
gengine_Main.onEntityRemoved = function(entity) {
	var scene = gengine.getScene();
	var gentity;
	gentity = js_Boot.__cast(entity , gengine_Entity);
	if(gentity._parent == null) {
		scene.removeChild(entity.node);
	}
	var _g = 0;
	var _g1 = gentity._children;
	while(_g < _g1.length) {
		var c = _g1[_g];
		++_g;
		gengine_Main.engine.removeEntity(c);
	}
};
gengine_Main.onGuiLoaded = function() {
	var app = Application;
	if(typeof app.onGuiLoaded === "function") { app.onGuiLoaded(); }
};
gengine_Main.onPhysicsBeginContact2D = function(idA,idB) {
	var app = Application;
	if(typeof app.onPhysicsBeginContact2D === "function") {
		var entityA = gengine_systems_Physics2DSystem.urhoBodyToEntity.h[idA];
		var entityB = gengine_systems_Physics2DSystem.urhoBodyToEntity.h[idB];
		app.onPhysicsBeginContact2D(entityA, entityB);
	}
};
var gengine_components_UrhoComponent = function() {
};
gengine_components_UrhoComponent.__name__ = ["gengine","components","UrhoComponent"];
gengine_components_UrhoComponent.prototype = {
	__class__: gengine_components_UrhoComponent
};
var gengine_components_Camera = function() {
	gengine_components_UrhoComponent.call(this);
	this.object = new Module.Camera(gengine.getContext());
	window.dummyNode.addComponent(this.object, 0, 0);;
};
gengine_components_Camera.__name__ = ["gengine","components","Camera"];
gengine_components_Camera.__super__ = gengine_components_UrhoComponent;
gengine_components_Camera.prototype = $extend(gengine_components_UrhoComponent.prototype,{
	setOrthoSize: function(size) {
		this.object.setOrthoSize(size);
	}
	,setOrthographic: function(orthographic) {
		this.object.setOrthographic(orthographic);
	}
	,setNearClip: function(distance) {
		this.object.setNearClip(distance);
	}
	,setFarClip: function(distance) {
		this.object.setFarClip(distance);
	}
	,setFov: function(fov) {
		this.object.setFov(fov);
	}
	,setAspectRatio: function(ratio) {
		this.object.setAspectRatio(ratio);
	}
	,setAutoAspectRatio: function(autoAspectRatio) {
		this.object.setAutoAspectRatio(autoAspectRatio);
	}
	,setZoom: function(zoom) {
		this.object.setZoom(zoom);
	}
	,getZoom: function() {
		return this.object.getZoom();
	}
	,worldToScreenPoint: function(worldPoint) {
		return this.object.worldToScreenPoint(worldPoint);
	}
	,screenToWorldPoint: function(screenPoint) {
		return this.object.screenToWorldPoint(screenPoint);
	}
	,__class__: gengine_components_Camera
});
var gengine_components_RigidBody2D = function() {
	gengine_components_UrhoComponent.call(this);
	this.object = new Module.RigidBody2D(gengine.getContext());
};
gengine_components_RigidBody2D.__name__ = ["gengine","components","RigidBody2D"];
gengine_components_RigidBody2D.__super__ = gengine_components_UrhoComponent;
gengine_components_RigidBody2D.prototype = $extend(gengine_components_UrhoComponent.prototype,{
	setBodyType: function(bodyType) {
		this.object.setBodyType(bodyType);
	}
	,setMass: function(mass) {
		this.object.setMass(mass);
	}
	,setInertia: function(inertia) {
		this.object.setInertia(inertia);
	}
	,setMassCenter: function(center) {
		this.object.setMassCenter(center);
	}
	,setLinearDamping: function(linearDamping) {
		this.object.setLinearDamping(linearDamping);
	}
	,setAngularDamping: function(angularDamping) {
		this.object.setAngularDamping(angularDamping);
	}
	,setFixedRotation: function(fixedRotation) {
		this.object.setFixedRotation(fixedRotation);
	}
	,setBullet: function(bullet) {
		this.object.setBullet(bullet);
	}
	,setGravityScale: function(gravityScale) {
		this.object.setGravityScale(gravityScale);
	}
	,setLinearVelocity: function(linearVelocity) {
		this.object.setLinearVelocity(linearVelocity);
	}
	,setAngularVelocity: function(angularVelocity) {
		this.object.setAngularVelocity(angularVelocity);
	}
	,applyForce: function(force,point,wake) {
		this.object.applyForce(force,point,wake);
	}
	,applyForceToCenter: function(force,wake) {
		this.object.applyForceToCenter(force,wake);
	}
	,applyTorque: function(torque,wake) {
		this.object.applyTorque(torque,wake);
	}
	,applyLinearImpulse: function(impulse,point,wake) {
		this.object.applyLinearImpulse(impulse,point,wake);
	}
	,applyAngularImpulse: function(impulse,wake) {
		this.object.applyAngularImpulse(impulse,wake);
	}
	,__class__: gengine_components_RigidBody2D
});
var gengine_components_StaticSprite2D = function(sprite) {
	gengine_components_UrhoComponent.call(this);
	this.object = new Module.StaticSprite2D(gengine.getContext());
	window.dummyNode.addComponent(this.object, 0, 0);;
	if(sprite != null) this.object.setSprite(sprite);
};
gengine_components_StaticSprite2D.__name__ = ["gengine","components","StaticSprite2D"];
gengine_components_StaticSprite2D.__super__ = gengine_components_UrhoComponent;
gengine_components_StaticSprite2D.prototype = $extend(gengine_components_UrhoComponent.prototype,{
	setSprite: function(sprite) {
		this.object.setSprite(sprite);
	}
	,setDrawRect: function(rect) {
		this.object.setDrawRect(rect);
	}
	,setTextureRect: function(rect) {
		this.object.setTextureRect(rect);
	}
	,getDrawRect: function() {
		return this.object.getDrawRect();
	}
	,getTextureRect: function() {
		return this.object.getTextureRect();
	}
	,setUseDrawRect: function(useDrawRect) {
		this.object.setUseDrawRect(useDrawRect);
	}
	,setUseTextureRect: function(useTextureRect) {
		this.object.setUseTextureRect(useTextureRect);
	}
	,getUseDrawRect: function() {
		return this.object.getUseDrawRect();
	}
	,getUseTextureRect: function() {
		return this.object.getUseTextureRect();
	}
	,setLayer: function(layer) {
		this.object.setLayer(layer);
	}
	,getLayer: function() {
		return this.object.getLayer();
	}
	,setOrderInLayer: function(order) {
		this.object.setOrderInLayer(order);
	}
	,getOrderInLayer: function() {
		return this.object.getOrderInLayer();
	}
	,setHotSpot: function(hotSpot) {
		this.object.setHotSpot(hotSpot);
	}
	,setUseHotSpot: function(useHotSpot) {
		this.object.setUseHotSpot(useHotSpot);
	}
	,setColor: function(color) {
		this.object.setColor(color);
	}
	,setAlpha: function(alpha) {
		this.object.setAlpha(alpha);
	}
	,__class__: gengine_components_StaticSprite2D
});
var gengine_math__$Vector2_Vector2_$Impl_$ = {};
gengine_math__$Vector2_Vector2_$Impl_$.__name__ = ["gengine","math","_Vector2","Vector2_Impl_"];
gengine_math__$Vector2_Vector2_$Impl_$._new = function(x,y) {
	return Module.Vector2(x,y);
};
gengine_math__$Vector2_Vector2_$Impl_$.mul = function(a,b) {
	return Module.Vector2(a.x * b,a.y * b);
};
gengine_math__$Vector2_Vector2_$Impl_$.div = function(a,b) {
	return Module.Vector2(a.x / b,a.y / b);
};
gengine_math__$Vector2_Vector2_$Impl_$.add = function(a,b) {
	return Module.Vector2(a.x + b.x,a.y + b.y);
};
gengine_math__$Vector2_Vector2_$Impl_$.min = function(a,b) {
	return Module.Vector2(a.x - b.x,a.y - b.y);
};
var gengine_math__$Vector3_Vector3_$Impl_$ = {};
gengine_math__$Vector3_Vector3_$Impl_$.__name__ = ["gengine","math","_Vector3","Vector3_Impl_"];
gengine_math__$Vector3_Vector3_$Impl_$._new = function(x,y,z) {
	return Module.Vector3(x,y,z);
};
gengine_math__$Vector3_Vector3_$Impl_$.mul = function(a,b) {
	return Module.Vector3(a.x * b,a.y * b,a.z * b);
};
gengine_math__$Vector3_Vector3_$Impl_$.div = function(a,b) {
	return Module.Vector3(a.x / b,a.y / b,a.z / b);
};
gengine_math__$Vector3_Vector3_$Impl_$.add = function(a,b) {
	return Module.Vector3(a.x + b.x,a.y + b.y,a.z + b.z);
};
gengine_math__$Vector3_Vector3_$Impl_$.min = function(a,b) {
	return Module.Vector3(a.x - b.x,a.y - b.y,a.z - b.z);
};
var gengine_nodes_Physics2DNode = function() { };
gengine_nodes_Physics2DNode.__name__ = ["gengine","nodes","Physics2DNode"];
gengine_nodes_Physics2DNode._getComponents = function() {
	if(gengine_nodes_Physics2DNode._components == null) {
		gengine_nodes_Physics2DNode._components = new ash_ClassMap();
		gengine_nodes_Physics2DNode._components.set(gengine_components_RigidBody2D,"body");
	}
	return gengine_nodes_Physics2DNode._components;
};
gengine_nodes_Physics2DNode.__super__ = ash_core_Node;
gengine_nodes_Physics2DNode.prototype = $extend(ash_core_Node.prototype,{
	__class__: gengine_nodes_Physics2DNode
});
var gengine_systems_Physics2DSystem = function() {
	ash_tools_ListIteratingSystem.call(this,gengine_nodes_Physics2DNode,null,null,$bind(this,this.onNodeRemoved));
};
gengine_systems_Physics2DSystem.__name__ = ["gengine","systems","Physics2DSystem"];
gengine_systems_Physics2DSystem.addEntity = function(urhoBody,entity) {
	var key = urhoBody.getID();
	gengine_systems_Physics2DSystem.urhoBodyToEntity.h[key] = entity;
};
gengine_systems_Physics2DSystem.getEntity = function(urhoBody) {
	if(urhoBody == null) return null; else {
		var key = urhoBody.getID();
		return gengine_systems_Physics2DSystem.urhoBodyToEntity.h[key];
	}
};
gengine_systems_Physics2DSystem.__super__ = ash_tools_ListIteratingSystem;
gengine_systems_Physics2DSystem.prototype = $extend(ash_tools_ListIteratingSystem.prototype,{
	onNodeRemoved: function(node) {
		var key = node.body.object.getID();
		gengine_systems_Physics2DSystem.urhoBodyToEntity.remove(key);
	}
	,__class__: gengine_systems_Physics2DSystem
});
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var keys = this.arrayKeys();
		var _g1 = 0;
		var _g = keys.length;
		while(_g1 < _g) {
			var i = _g1++;
			var k = keys[i];
			if(k == null) s.b += "null"; else s.b += "" + k;
			s.b += " => ";
			s.add(Std.string(__map_reserved[k] != null?this.getReserved(k):this.h[k]));
			if(i < keys.length) s.b += ", ";
		}
		s.b += "}";
		return s.b;
	}
	,__class__: haxe_ds_StringMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
ash_core_Entity.nameCount = 0;
gengine_systems_Physics2DSystem.urhoBodyToEntity = new haxe_ds_IntMap();
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = {}.toString;
gengine_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
