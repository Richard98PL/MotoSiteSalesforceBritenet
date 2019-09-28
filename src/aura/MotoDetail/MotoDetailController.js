({

    doInit: function(cmp,event,helper){

        helper.doInitHelper(cmp,event);

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