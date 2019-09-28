
({

    AddToBasketHelper : function(cmp,event){

        let id = event.getParam("id");

                if(JSON.parse(sessionStorage.getItem("BasketNumber")) === null){

                    cmp.set("v.BasketNumber",'1');
                    sessionStorage.setItem("BasketNumber",'1');
                    sessionStorage.setItem(id,true);
                    sessionStorage.setItem(id+'count','1');

                }else{

                    let number_BasketNumber = JSON.parse(sessionStorage.getItem("BasketNumber"));
                    let number_BasketNumberPlusOne = number_BasketNumber + 1;
                    let string_BasketNumberPluseOne = number_BasketNumberPlusOne.toString();

                    sessionStorage.setItem("BasketNumber", string_BasketNumberPluseOne);
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

})