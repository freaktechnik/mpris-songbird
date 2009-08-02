/*
 * Written by Logan F. Smyth � 2009
 * http://logansmyth.com
 * me@logansmyth.com
 * 
 * Feel free to use/modify this code, but if you do
 * then please at least tell me!
 *
 */


Components.utils.import("resource://gre/modules/XPCOMUtils.jsm"); 

// Make a namespace.
if (typeof Mpris == 'undefined') {
  var Mpris = {};
}


Mpris.Controller = {
  prefs: null,
  debug_mode: false,
  handler: null,

  onLoad: function() {

    this.handler = Components.classes['@logansmyth.com/Songbird/MprisPlugin;1'].createInstance(Components.interfaces.sbIMprisPlugin);
  
    startup();
  
    this.handler.init();

    // initialization code
    this._initialized = true;
    
  },
  onUnLoad: function() {
    shutdown();
    this._initialized = false;
  },
  
  
  startup: function() {
    this.prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("mpris.");
    this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
    this.prefs.addObserver("", this, false);

    this.debug_mode = this.prefs.getBoolPref("debug_mode");
  
    alert(this.dbus);
  },
  shutdown: function( ){
    this.prefs.removeObserver("", this);
  },
  observe: function(subject, topic, data) {
     if (topic != "nsPref:changed") return;
 
     switch(data) {
       case "symbol":
         this.debug_mode = this.prefs.getBoolPref("debug_mode");
	alert(this.dbus);
         break;
     }
   },

};

window.addEventListener("load", function(e) { Mpris.Controller.onLoad(e); }, false);
window.addEventListener("unload", function(e) { Mpris.Controller.onUnLoad(e); }, false);

