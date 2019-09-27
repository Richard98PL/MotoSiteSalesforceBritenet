({
    doInit: function(cmp,event,helper){

        let action = cmp.get("c.FetchPrices");
        action.setCallback(this, function(response) {

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

    handleClick : function(cmp,event,helper){

        let ID = window.location.href;
        ID = ID.substring(ID.length-18,ID.length);

        let AddToBasketEvent = $A.get("e.c:AddToBasketEvent");
        AddToBasketEvent.setParams({
            'id': ID,
        });
        AddToBasketEvent.fire();

    }
})