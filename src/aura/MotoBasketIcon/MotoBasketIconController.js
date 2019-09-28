({
    BasketPage : function(component, event, helper) {

        window.location = "https://ryszard-rogalski-developer-edition.eu25.force.com/motorcyclespl/s/basket";

    },

    ChangeColorGreen : function() {

        document.getElementById('b').style.backgroundColor = 'lightgreen';
        document.getElementById('lblCartCount').style.backgroundColor = 'lightgreen';

    },

    ChangeColorNone : function() {

        document.getElementById('b').style.backgroundColor = 'transparent';
        document.getElementById('lblCartCount').style.backgroundColor = 'red';

    },

    AddToBasket : function(cmp,event,helper){

        helper.AddToBasketHelper(cmp,event);

    },

    doInit : function(cmp){

        if(JSON.parse(sessionStorage.getItem("BasketNumber")) === null){

             cmp.set("v.BasketNumber",'0');

        }else {

            cmp.set("v.BasketNumber",JSON.parse(sessionStorage.getItem("BasketNumber")));

        }

    },

})