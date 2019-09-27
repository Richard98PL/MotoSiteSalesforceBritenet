trigger SalesrepsIdUpdate on Lead (before insert) {

   

	String name = 'Salesreps';
    List<CollaborationGroup> cg=[select id from CollaborationGroup where Name=:name LIMIT 1];
    String groupId = cg[0].Id;
    
    for(Lead obj: Trigger.new){
  	 obj.salesrepsId__c = groupId;
    }
    
}