({
	createItem : function(component, item) {        
		let action = component.get("c.saveItem");
            action.setParams({
                "item": item
            });
        
        action.setCallback(this, function(response) {
        	let state = response.getState();
                
            if(state === "SUCCESS") {
            	let theItems = component.get("v.items");
                    theItems.push(response.getReturnValue());
                    component.set("v.items", theItems);
                
                // Create toast message
            	var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "Items value provider has changed."
                });
                toastEvent.fire();
                
                component.set("v.newItem",{'sobjectType':'Camping_Item__c',
                'Name': '',
                'Quantity__c': 0,
                'Price__c': 0,
                'Packed__c': false});
            } else {
    	        console.log("Failed during creation with"
                                + " state: " + state);
            }                    
        });
        $A.enqueueAction(action);
	}
})