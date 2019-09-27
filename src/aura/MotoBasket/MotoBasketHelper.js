({

    SearchHelper: function(cmp, event, helper) {

        let apexName = event.getParam("keywordName");
		let apexCountry = event.getParam("keywordCountry");

        cmp.find("Id_spinner").set("v.class" , 'slds-show');

        let action = cmp.get("c.FetchAccount");
        action.setParams({
            'searchKeyWord': apexName,
            'searchKeyWordCountry': apexCountry,
        });

        action.setCallback(this, function(response) {

            cmp.find("Id_spinner").set("v.class" , 'slds-hide');
            let state = response.getState();
            cmp.set("v.toggle", true);

            if (state === "SUCCESS") {

                let toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success",
                        "message": "Divisions"
                    });
                    toastEvent.fire();

                let storeResponse = response.getReturnValue();

                if(storeResponse.length == 0) {

                    cmp.set("v.Message", true);

                }else {

                    cmp.set("v.Message", false);
                    let EnablingButtonEvent = $A.get("e.c:EnablingButtonEvent");
                    EnablingButtonEvent.fire();

                }

                cmp.set("v.TotalNumberOfRecord", storeResponse.length);
                cmp.set("v.searchResult", storeResponse);

            }else if (state === "INCOMPLETE") {

                alert('Response is Incompleted');

            }else if (state === "ERROR") {

                var errors = response.getError();
                if (errors) {

                    if (errors[0] && errors[0].message) {

                    let toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Error",
                        "message": errors[0].message
                    });
                    toastEvent.fire();

                    }
                }else {

                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Error",
                        "message": "Error."
                    });
                    toastEvent.fire();

                }
            }
        });

        $A.enqueueAction(action);

    },

    ClearSearchHelper : function(cmp, event, helper){

        sessionStorage.clear();
        cmp.set("v.toggle", false);

    },

    MapShowHelper : function(cmp, event, helper){

        let tableRowID = event.currentTarget.id;

        if(sessionStorage.getItem("lastRowNumber") != null){

            if(JSON.parse(sessionStorage.getItem("lastRowNumber"))%2){

                 document.getElementById(JSON.parse(sessionStorage.getItem("lastRowNumber")).concat('tablerow')).className ='';

                }else{

                    document.getElementById(JSON.parse(sessionStorage.getItem("lastRowNumber")).concat('tablerow')).className ='tier-one';

                }
            }

        document.getElementById(tableRowID).className ='tier-two';

        let str = tableRowID.slice(0, (tableRowID.length-'tablerow'.length));
        sessionStorage.setItem('lastRowNumber', JSON.stringify(str));

        cmp.find("Id_spinner").set("v.class" , 'slds-show');
        let datasetIdOfResult = event.currentTarget.dataset.value;
        console.log(datasetIdOfResult);

        let TableClickEvent = $A.get("e.c:TableClickEvent");
        TableClickEvent.setParams({"id":datasetIdOfResult});
        TableClickEvent.fire();

    },

    ResultReceiverHelper : function(cmp, event, helper){

        cmp.find("Id_spinner").set("v.class" , 'slds-hide');

    },
})