({
    doInit : function(component, event, helper) {
        let action = component.get("c.getItems");
        
        action.setCallback(this, function(response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.items", response.getReturnValue());
            } else {
                console.log("Faled with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
    
    clickCreateItem : function(component, event, helper) {
        var validItem = component.find('itemform').reduce(function(validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        
        if(validItem) {            
            var newItem = component.get("v.newItem");
            helper.createItem(component, newItem);            
        }
	}
})