({
    BasketPage : function(component, event, helper) {

        window.location = "https://ryszard-rogalski-developer-edition.eu25.force.com/motorcyclespl/s/basket";

    },

    changeColorGreen : function() {

        document.getElementById('b').style.backgroundColor = 'lightgreen';
        document.getElementById('lblCartCount').style.backgroundColor = 'lightgreen';

    },

    changeColorNone : function() {

        document.getElementById('b').style.backgroundColor = 'transparent';
        document.getElementById('lblCartCount').style.backgroundColor = 'red';



    },

    AddToBasket : function(cmp,event,helper){

        let id = event.getParam("id");
        console.log(id);


        if(JSON.parse(sessionStorage.getItem("BasketNumber")) === null){

            cmp.set("v.BasketNumber",'1');
            sessionStorage.setItem("BasketNumber",'1');
            sessionStorage.setItem(id,true);
            sessionStorage.setItem(id+'count','1');

        }else{

            let a = JSON.parse(sessionStorage.getItem("BasketNumber"));

            let b = a+1;
            let c = b.toString();

            sessionStorage.setItem("BasketNumber",c);
            cmp.set("v.BasketNumber",JSON.parse(sessionStorage.getItem("BasketNumber")));

            if( JSON.parse(sessionStorage.getItem(id)) === null ){

                sessionStorage.setItem(id,true);
                sessionStorage.setItem(id+'count','1');

            }else{

                let beforeCount = JSON.parse(sessionStorage.getItem(id+'count'));
                let d = beforeCount + 1;
                let e = d.toString();
            	sessionStorage.setItem(id+'count',e);

        }
        }

    },

    doInit : function(cmp){
        if(JSON.parse(sessionStorage.getItem("BasketNumber")) === null){
        cmp.set("v.BasketNumber",'0');
        }
        else{
            cmp.set("v.BasketNumber",JSON.parse(sessionStorage.getItem("BasketNumber")));
        }

    },


})