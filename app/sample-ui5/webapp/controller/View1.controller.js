sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sampleui5.controller.View1", {
            onInit: function () {

            },

            onUpdate: async function () {
                var oModel = this.getView().getModel();
                var authorId = this.byId("inputID").getValue();
                var fName = this.byId("inputfName").getValue();
                var lName = this.byId("inputlName").getValue();

                var oObjectToModify = ""
                oObjectToModify = oModel.bindContext(`/Authors('${authorId}')`, undefined, {});
                var oSuccess = ""
                oSuccess = oObjectToModify.getBoundContext().setProperty("firstname", fName)
                oSuccess = oObjectToModify.getBoundContext().setProperty("lastname", lName)
                await oSuccess.then(function (result) {
                    return MessageToast.show("Author updated successfully");
                }.bind(this), function (error) {
                    console.error(error)
                    return MessageToast.show(error)
                })
            }
        });
    });
