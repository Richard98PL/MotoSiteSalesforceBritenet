<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>MailToLead</fullName>
        <description>MailToLead</description>
        <protected>false</protected>
        <recipients>
            <field>Email</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/MailToLead</template>
    </alerts>
    <alerts>
        <fullName>SurveyEmail</fullName>
        <description>SurveyEmail</description>
        <protected>false</protected>
        <recipients>
            <field>Email</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/MailToLeadBeforeConvert</template>
    </alerts>
</Workflow>
