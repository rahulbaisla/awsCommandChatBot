# AWS Commands Slack Bot App
This is a  small dummy project to create a Slack chat bot app which can 
- Accept user input i.e service and action 
- Retrieve corresponding values from Dynamo DB
- Transform raw values to create AWS CLI commands and return

AWS Services used in this bot are 
- Amazon Lex
- AWS Lambda
- Amazon Dynamo DB

# Instructions to create AWS Commands Slack Bot

1. Create an Amazon Lex Bot
    * Go to AWS Console -> Lex
    * Choose Region. 
        Current supported regions are US East(N Virginia), EU(Ireland) and US West(Oregon)
    * Choose Create
    * Choose Custom Bot
        * Enter Bot name e.g. awsCommandBot
        * Choose output voice
        * Enter Session timeout Duration
        * Select Yes or No as option 
          Whether your use of this bot is subject to the  Children's Online Privacy Protection Act(COPPA)
        * Select Create

2. Create a Slack Application
    * Open https://api.slack.com/slack-apps and login
    * Search for Button Create a Slack app
    * Enter App Name e.g. awsCommandSlackBotApp
    * Select your Development Slack Workspace
    * Select Create App
    * Go to awsCommandSlackBotApp -> Basic Information
        Confirm you can see your application credentials i.e.Client Id, Client Secret, and Verification Token
    * Select Interactive Components 
    * Turn Interactivity On
    * Enter any valid URL e.g. http://slack.com
        Note: At this moment we need to enter any valid url to get verification token. We would need to change it in later stages.
    * Save Changes


3. Integrate the Slack Application with the Amazon Lex Bot
    * Go to AWS Console -> Lex -> awsCommandBot -> Channels -> Slack
    * Enter name of channel e.g.awsCommandBotSlackChannel
    * Enter Description
    * Choose default "aws/lex" as KMS key 
        Note: You can also create a KMS key using AWS KMS service and provide it here.
    * Navigate to Settings -> Aliases
        * Enter Alias Name and Latest as version
        * Click Add to save
    * Navigate back to Channels -> Slack
    * Enter Client Id, Client Secret, and Verification Token
    of slack app created in step 1
    * Click Activate Button

    You should be able to see awsCommandBotSlackChannel created at the bottom of screen with two URLs Postback URL and OAuth URL. These will be used in next step to complete slack integration.

4. Complete Slack Integration
    * Go to the Slack API console
    * Choose the app you created in step 2
    * Choose Interactive Components from left menu
        Note: Copy Postback URL created for awsCommandBotSlackChannel in the above step and paste it to Request URL field.
    * Choose OAuth & Permissions from left menu
        * Click Add New Redirect URL
            Note: Copy OAuth URL created for awsCommandBotSlackChannel in the above step and paste it to Redirect URL field and Add.
        * Click Save URLs
        * In Scopes section, choose add following permissions
            chat:write:bot
            team:read
        * Save Changes
    * Choose Event Subscriptions from left menu and turn toggle switch to On.
        Note: Copy Postback URL created for                 awsCommandBotSlackChannel in the above step and paste it to Request URL field.
        * In the Subscribe to Bot Events, add message.im bot event
    * Select Bot Users from left menu 
        * Enter Display Name and Default Username
        * Switch On  Always Show My Bot as Online 
        * Save Changes
    * Add App to Slack
        * Slack API Console -> Manage Distribution
        * Click Add to Slack Button
        * Once redirected to Slack Team you should be able to see and send messages to awsCommandSlackBotApp in Direct Messages.

5. Create Lambda function with the source code in the repository.

6. Go To AWS Console -> Dynamo DB -> Create Table 
    *  Enter name "awsCommands"
    * Enter Primary key "servicename"
    * Enter Sort Key "methodname"
    * After table is created, Use CLI commands in "CLI Commands.txt" to populate Dynamo DB.

7. Set up awsCommandBot
    * Go to AWS Console -> Lex -> awsCommandBot -> Editor
    * Create Intent with name awscommands
    * Enter "aws" in utterance. Click Add button
    * create slot type
        * Enter slot type name 'Action'
        * Select Expand Values
        * Enter value 'create-function'
    * create slot type
        * Enter slot type name 'Aws_Service'
        * Select Expand Values
        * Enter value 'lambda'
    * Next In Editor, Add Slots
        * Create slot with Name as service
        * Slot type as Aws_Service
        * Prompt as "Which service ?"
        * Create another slot with  Name as Action
        * Slot type as Aws_Service
        * Prompt as "Which service ?"
        * Make them both as required.
    * In fulfillment, Select AWS Lambda function
    * Choose lambda function from list
    * Click OK for Add permission to Lambda Function pop up
    * Scroll down and save the Intent.
    * Build the Intent.
    * publish the Intent -> choose Alias and Publish

8. Test End to End Slack Bot
   * In Slack -> Direct Messages. Choose awsCommandSlackBotApp
   * Enter aws
   * When asked Which Service ?
   * Enter Lambda
   * When asked Which action ?
   * Enter create
   * aws lambda create-function  --function-name VALUE_HERE --role VALUE_HERE --runtime VALUE_HERE --handler VALUE_HERE --code VALUE_HERE

![alt text](https://github.com/rahulbaisla/awsCommandChatBot/blob/master/AWS%20Command%20Slack%20Bot.png)
