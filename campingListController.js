({
	clickCreateItem : function(component, event, helper) {
        var validItem = component.find('itemform').reduce(function(validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        
        if(validItem) {
            var newItem = JSON.parse(JSON.stringify(component.get("v.newItem")));
            var theItems = component.get("v.items");            
            theItems.push(newItem);
            
            // Create toast message
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Success!",
                "message": "Items value provider has changed."
            });
            toastEvent.fire();
            
            component.set("v.items", theItems);
            component.set("v.newItem",{'sobjectType':'Camping_Item__c',
                'Name': '',
                'Quantity__c': 0,
                'Price__c': 0,
                'Packed__c': false});
        }
	}
})