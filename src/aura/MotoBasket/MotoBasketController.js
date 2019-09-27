({

    doInit : function(cmp,event,helper){

        cmp.find("Id_spinner").set("v.class" , 'slds-show');
        let action = cmp.get("c.FetchPrices");
        action.setCallback(this, function(response) {

            cmp.find("Id_spinner").set("v.class" , 'slds-hide');
            let state = response.getState();

            if (state === "SUCCESS") {
                console.log("SUCCESS");
                let storeResponse = response.getReturnValue();
                //console.log(storeResponse);
                //console.log(storeResponse[0].getOwnPropertyDescriptor);
                //console.log(Object.getOwnPropertyNames(storeResponse[0]));
                //console.log(Object.keys(storeResponse[0]));
                //
                let priceMap = new Map();
                for(let i=0;i<storeResponse.length;i++){

                        console.log(Object.getOwnPropertyDescriptor(storeResponse[i],"Product2Id").value);
                        console.log(Object.getOwnPropertyDescriptor(storeResponse[i],"UnitPrice").value);

                    priceMap.set(
                        Object.getOwnPropertyDescriptor(storeResponse[i],"Product2Id").value.toString(),
                        Object.getOwnPropertyDescriptor(storeResponse[i],"UnitPrice").value.toString()
                    );
                }
                console.log(priceMap.get('01t2o000009gl6vAAA'));

                let tablicaId = [];
        		let tablicaCount = [];

     			var i;

                for (i = 0; i < sessionStorage.length; i++) {
                    if( sessionStorage.key(i).length == 18){
                        tablicaId.push(sessionStorage.key(i)) ;
                    }else if(sessionStorage.key(i).length == 23){
                        tablicaCount.push(sessionStorage.getItem(sessionStorage.key(i)));
                    }
                }

                sessionStorage.setItem("DifferentProducts",tablicaId.length);


                let tablicaJSON = [];
        		let fullprice = 0;
                for(let i=0;i<tablicaId.length;i++){

                    tablicaJSON.push({
                        id: tablicaId[i],
                        count : tablicaCount[i],
                        price : priceMap.get(tablicaId[i]),
                        fullprice : priceMap.get(tablicaId[i])*tablicaCount[i]
                    });

                    fullprice += priceMap.get(tablicaId[i])*tablicaCount[i];
                };

                 console.log("session storage");
                for (i = 0; i < sessionStorage.length; i++) {
                 console.log(sessionStorage.key(i) + "=[" + sessionStorage.getItem(sessionStorage.key(i)) + "]");
                }

                //tablicaId.forEach(function(item){console.log(item);});
                cmp.set("v.fullprice",fullprice);
                cmp.set("v.TotalNumberOfRecord", sessionStorage.getItem("BasketNumber"));
                cmp.set("v.family",tablicaJSON);

                cmp.find("Id_spinner").set("v.class" , 'slds-hide');

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

	Search: function(cmp, event, helper) {

        helper.SearchHelper(cmp, event, helper);

    },

    ClearSearch : function (cmp,event,helper){

        helper.ClearSearchHelper(cmp, event, helper);

    },

    MapShow : function (cmp,event,helper){

        helper.MapShowHelper(cmp, event, helper);

    },

    ResultReceiver : function(cmp,event,helper){

        helper.ResultReceiverHelper(cmp,event,helper);

    },

    Greenish : function(cmp, event, helper){

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

    },

    handleClear : function(cmp,event,helper){
        sessionStorage.clear();
        location.reload();
    },

    handleOrder : function(cmp,event,helper){

        console.log("handleOrder");


                let x = JSON.parse(sessionStorage.getItem("DifferentProducts"));
        		console.log(x);



         		let tablicaId = [];
        		let tablicaCount = [];

     			var i;

                for (i = 0; i < sessionStorage.length; i++) {
                    if( sessionStorage.key(i).length == 18){
                        tablicaId.push(sessionStorage.key(i)) ;
                    }else if(sessionStorage.key(i).length == 23){
                        tablicaCount.push(sessionStorage.getItem(sessionStorage.key(i)));
                    }
                }
        let OrderMap = [];
                  for(let i=0; i<x ;i++){
                      let tmpObj = new Object();
                      tmpObj.key = tablicaId[i] ;
                      tmpObj.value =  tablicaCount[i] ;

					console.log(tmpObj);
				OrderMap.push(tmpObj);
                }

			console.log(OrderMap);


         let action2 = cmp.get("c.CreateOrder");

                action2.setParams({
                    'JSONorder' : JSON.stringify(OrderMap)
                });
        console.log(JSON.stringify(OrderMap));

                action2.setCallback(this, function(response2) {

                    cmp.find("Id_spinner").set("v.class" , 'slds-hide');
                    let state2 = response2.getState();

                    if (state2 === "SUCCESS") {

                        //sessionStorage.clear();
                		//location.reload();
                 let toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                "title": "Success",
                                "message": "Złożyłeś zamówienie."
                            });
                            toastEvent.fire();

                    }else if (state2 === "INCOMPLETE") {

                        let toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                "title": "INCOMPLETE",
                                "message": "INCOMPLETE."
                            });
                            toastEvent.fire();

                    }else if (state2 === "ERROR") {

                        let toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                "title": "ERROR",
                                "message": "ERROR."
                            });
                            toastEvent.fire();

                        var errors = response2.getError();
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

                            let toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                "title": "Error",
                                "message": "Error."
                            });
                            toastEvent.fire();

                        }
                    }
                });

                $A.enqueueAction(action2);

    },

})