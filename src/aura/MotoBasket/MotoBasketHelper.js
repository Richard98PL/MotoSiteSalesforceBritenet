({
  doInitHelper : function (cmp,event){

    cmp.find("Id_spinner").set("v.class" , 'slds-show');
            let action = cmp.get("c.FetchPrices");

            action.setCallback(this, function(response) {

                cmp.find("Id_spinner").set("v.class" , 'slds-hide');
                let state = response.getState();

                if (state === "SUCCESS") {

                    console.log("SUCCESS");

                    let storeResponse = response.getReturnValue();

                    let priceMap = new Map();

                    for(let i=0;i<storeResponse.length;i++){

                        priceMap.set(

                            Object.getOwnPropertyDescriptor(storeResponse[i],"Product2Id").value.toString(),
                            Object.getOwnPropertyDescriptor(storeResponse[i],"UnitPrice").value.toString()

                        );
                    }

                    let tablicaId = [];
            		let tablicaCount = [];

                    for (let i = 0; i < sessionStorage.length; i++) {

                        if( sessionStorage.key(i).length == 18){

                            tablicaId.push(sessionStorage.key(i));

                        }else if(sessionStorage.key(i).length == 23){

                            tablicaCount.push(sessionStorage.getItem(sessionStorage.key(i)));

                        }
                    }

                    sessionStorage.setItem("DifferentProducts",tablicaId.length);

                    let tablicaJSON = [];
            		let fullprice = 0;

                    for(let i = 0; i < tablicaId.length; i++){

                        tablicaJSON.push({

                            id: tablicaId[i],
                            count : tablicaCount[i],
                            price : priceMap.get(tablicaId[i]),
                            fullprice : priceMap.get(tablicaId[i])*tablicaCount[i]

                        });

                        fullprice += priceMap.get(tablicaId[i])*tablicaCount[i];

                    };

                    /*console.log("session storage");
                    for (i = 0; i < sessionStorage.length; i++) {

                     console.log(sessionStorage.key(i) + "=[" + sessionStorage.getItem(sessionStorage.key(i)) + "]");

                    }*/

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

  HandleOrderHelper : function (cmp,event){

     let howManyDifferentProducts = JSON.parse(sessionStorage.getItem("DifferentProducts"));

            let tablicaId = [];
            let tablicaCount = [];

            for (let i = 0; i < sessionStorage.length; i++) {
             if( sessionStorage.key(i).length == 18){

                  tablicaId.push(sessionStorage.key(i)) ;

              }else if(sessionStorage.key(i).length == 23){

                   tablicaCount.push(sessionStorage.getItem(sessionStorage.key(i)));

               }
            }

            let OrderMap = [];
            for(let i = 0; i < howManyDifferentProducts ;i++){

                 let tmpObj = new Object();
                 tmpObj.key = tablicaId[i] ;
                 tmpObj.value =  tablicaCount[i] ;
                 OrderMap.push(tmpObj);

               }

             let action = cmp.get("c.CreateOrder");

                    action.setParams({
                        'JSONorder' : JSON.stringify(OrderMap)
                    });
            action.setCallback(this, function(response2) {

                    cmp.find("Id_spinner").set("v.class" , 'slds-hide');
                    let state = response.getState();

                    if (state === "SUCCESS") {

                         sessionStorage.clear();
                         location.reload();

                         let toastEvent = $A.get("e.force:showToast");
                                    toastEvent.setParams({
                                        "title": "Success",
                                        "message": "Złożyłeś zamówienie."
                                    });
                                    toastEvent.fire();

                    }else if (state === "INCOMPLETE") {

                        let toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                "title": "INCOMPLETE",
                                "message": "INCOMPLETE."
                            });
                            toastEvent.fire();

                    }else if (state === "ERROR") {

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