({
    doInitHelper : function(cmp,event) {

         let action = cmp.get("c.FetchPrices");
                action.setCallback(this, function(response) {

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

                       	let ID = window.location.href;
                		ID = ID.substring(ID.length-18,ID.length);
                        let priceOfProduct = priceMap.get(ID);

                        if(ID.length == 18){

                            cmp.set('v.fields',['Name','Description']);
                            cmp.set("v.recordId", ID);

                        }else{

                            cmp.set('v.fields',['Name','Description']);
                            cmp.set("v.recordId", '01t2o000009gl6vAAA')

                        }

                		cmp.set("v.price",priceOfProduct);

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

})