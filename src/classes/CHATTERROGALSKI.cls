public class CHATTERROGALSKI {

@InvocableMethod
    public static void sendToChatterGroup(List<String> groupName){
        String name= groupName.get(0);
       List<CollaborationGroup> cg=[select id from CollaborationGroup where Name=:name LIMIT 1];
       String groupId = cg[0].Id;

    
    FeedItem post = new FeedItem();
        post.Title = 'My Title';
        post.Body = 'My message body';
        post.ParentId = groupId;
        insert post;
    }
}