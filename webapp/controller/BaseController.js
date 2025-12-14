sap.ui.define([
 "sap/ui/core/mvc/Controller"
],
function (Controller){
     "use strict";
    return Controller.extend(productslist.controller.BaseController,{
        setModel  : function(eName){
            return this.getView().setModel(eName)
        },
        getModel : function(){
            return this.getView().getModel();
        }
    });
});