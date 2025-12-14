sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("productslist.controller.View1", {
        fetchData : function(oModel,spath){
            return new Promise((resolve,reject)=>{
                oModel.read(spath,{
                success : (odata) => resolve(odata),
                error : (msg) => reject(msg)
                })
            })
        },
       async onInit () {
            var prodModel = this.getOwnerComponent().getModel();
           await this.fetchData(prodModel,'/ProductSet')
            .then((x)=>{
                
                var json1 = new sap.ui.model.json.JSONModel();
                json1.setData(x.results);
                this.getView().setModel(json1,'bp');

                // bind aggregation
                 let oComboBox = this.getView().byId("comboid");
                        var oItemTemplate = new sap.ui.core.Item({
                            key:"{bp>ProductID}",
                            text: "{bp>ProductID}"
                        
            });
                        oComboBox.bindAggregation("items", {
                        path: "bp>/",
                        template: oItemTemplate,
                        templateShareable: false
                        });

                var json2 = new sap.ui.model.json.JSONModel();
                json2.setData(x.results[0]);
                this.getView().setModel(json2,'p');
                this.getView().byId('idtxt1').bindProperty('text','p>/ProductID');

                this.byId("empPanel").bindElement("p>/");
            })
            .catch((error)=>{

            })
        }
    });
});
