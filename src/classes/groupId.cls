public class groupId {

    @InvocableMethod
    public static void setGroupId(List<String> args){
    
    String name = args.get(0);
    Integer leadId =  Integer.valueOf(args.get(1));
        
    List<CollaborationGroup> cg=[select id from CollaborationGroup where Name=:name LIMIT 1];
    String groupId = cg[0].Id;
    
    //arg[0] = groupName
    //arg[1] = leadId
    //
    
    }
}