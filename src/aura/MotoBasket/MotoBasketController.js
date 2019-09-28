({

    doInit : function(cmp,event,helper){

        helper.doInitHelper(cmp,event);

    },

    HandleClear : function(cmp,event,helper){

        sessionStorage.clear();
        location.reload();

    },

    HandleOrder : function(cmp,event,helper){

        helper.HandleOrderHelper(cmp,event);

    },

})