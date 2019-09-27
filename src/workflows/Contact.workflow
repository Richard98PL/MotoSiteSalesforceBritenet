<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>BirthdayIsTomorrow</fullName>
        <description>BirthdayIsTomorrow</description>
        <protected>false</protected>
        <recipients>
            <recipient>ryszard.rogalski@britenet.com.pl</recipient>
            <type>user</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>unfiled$public/TomorrowBirthdayReminder</template>
    </alerts>
    <fieldUpdates>
        <fullName>NextBirthdayAdd</fullName>
        <description>NextBirthdayAdd</description>
        <field>Next_Birthday__c</field>
        <formula>IF(DATE(YEAR(TODAY()),MONTH(Birthdate),DAY(Birthdate)) &lt;= TODAY(), DATE(YEAR(TODAY())+1,MONTH(Birthdate),DAY(Birthdate)), DATE(YEAR(TODAY()),MONTH(Birthdate),DAY(Birthdate)))</formula>
        <name>NextBirthdayAdd</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Next_Birthday</fullName>
        <description>Update Next Birthday</description>
        <field>Birthdate</field>
        <formula>IF(
DATE(YEAR(TODAY()),MONTH(Birthdate),DAY(Birthdate)) &lt;= TODAY(), DATE(YEAR(TODAY())+1,MONTH(Birthdate),DAY(Birthdate)), DATE(YEAR(TODAY()),MONTH(Birthdate),DAY(Birthdate))
)</formula>
        <name>Update Next Birthday</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Next_Birthday2</fullName>
        <description>Update Next Birthday</description>
        <field>Next_Birthday__c</field>
        <formula>IF(
DATE(YEAR(TODAY()),MONTH(Birthdate),DAY(Birthdate)) &lt;= TODAY(), DATE(YEAR(TODAY())+1,MONTH(Birthdate),DAY(Birthdate)), DATE(YEAR(TODAY()),MONTH(Birthdate),DAY(Birthdate))
)</formula>
        <name>Update Next Birthday2</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>TomorrowBirthdayReminder</fullName>
        <actions>
            <name>BirthdayIsTomorrow</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Update_Next_Birthday2</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.Birthdate</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <description>TomorrowBirthdayReminder</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Update_Next_Birthday</name>
                <type>FieldUpdate</type>
            </actions>
            <offsetFromField>Contact.Next_Birthday__c</offsetFromField>
            <timeLength>30</timeLength>
            <workflowTimeTriggerUnit>Hours</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
        <workflowTimeTriggers>
            <actions>
                <name>BirthdayIsTomorrow</name>
                <type>Alert</type>
            </actions>
            <offsetFromField>Contact.Next_Birthday__c</offsetFromField>
            <timeLength>-1</timeLength>
            <workflowTimeTriggerUnit>Hours</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
</Workflow>
