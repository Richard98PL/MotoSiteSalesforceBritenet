({
    HandleClickHelper : function(cmp,event){

        let searchText = component.get('v.searchText');
              let action = component.get('c.searchForIds');

              action.setParams({

                  searchText: searchText

                  });

              action.setCallback(this, function(response) {

                let state = response.getState();

                if (state === 'SUCCESS') {

                  let ids = response.getReturnValue();

                  	sessionStorage.setItem('customSearch--recordIds', JSON.stringify(ids));
                    let navEvt = $A.get('e.force:navigateToURL');
                    navEvt.setParams({url: '/moto-search-results'});
                    navEvt.fire();

                }
              });

              $A.enqueueAction(action);

    },

})