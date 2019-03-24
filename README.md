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
    1. Go to AWS Console -> Lex
    2. Choose Region. 
        Current supported regions are US East(N Virginia), EU(Ireland) and US West(Oregon)
    3. Choose Create
    4. Choose Custom Bot
        * Enter Bot name e.g. awsCommandBot
        * Choose output voice
        * Enter Session timeout Duration
        * Select Yes or No as option 
          Whether your use of this bot is subject to the  Children's Online Privacy Protection Act(COPPA)
        * Select Create

2. Create a Slack Application
    1. Open https://api.slack.com/slack-apps and login
    2. Search for Button Create a Slack app
    3. Enter App Name e.g. awsCommandSlackBotApp
    4. Select your Development Slack Workspace
    5. Select Create App
    6. Go to awsCommandSlackBotApp -> Basic Information
        Confirm you can see your application credentials i.e.Client Id, Client Secret, and Verification Token
    7. Select Interactive Components 
    8. Turn Interactivity On
    9. Enter any valid URL e.g. http://slack.com
        Note: At this moment we need to enter any valid url to get verification token. We would need to change it in later stages.
    10. Save Changes


3. Integrate the Slack Application with the Amazon Lex Bot
    1. Go to AWS Console -> Lex -> awsCommandBot -> Channels -> Slack
    2. Enter name of channel e.g.awsCommandBotSlackChannel
    3. Enter Description
    4. Choose default "aws/lex" as KMS key 
        Note: You can also create a KMS key using AWS KMS service and provide it here.
    5. Navigate to Settings -> Aliases
        * Enter Alias Name and Latest as version
        * Click Add to save
    6. Navigate back to Channels -> Slack
    7. Enter Client Id, Client Secret, and Verification Token
    of slack app created in step 1
    8. Click Activate Button

    You should be able to see awsCommandBotSlackChannel created at the bottom of screen with two URLs Postback URL and OAuth URL. These will be used in next step to complete slack integration.

4. Complete Slack Integration
    1. Go to the Slack API console
    2. Choose the app you created in step 2
    3. Choose Interactive Components from left menu
        Note: Copy Postback URL created for awsCommandBotSlackChannel in the above step and paste it to Request URL field.
    5. Choose OAuth & Permissions from left menu
        * Click Add New Redirect URL
            Note: Copy OAuth URL created for awsCommandBotSlackChannel in the above step and paste it to Redirect URL field and Add.
        * Click Save URLs
        * In Scopes section, choose add following permissions
            chat:write:bot
            team:read
        * Save Changes
    6. Choose Event Subscriptions from left menu and turn toggle switch to On.
        Note: Copy Postback URL created for                 awsCommandBotSlackChannel in the above step and paste it to Request URL field.
        * In the Subscribe to Bot Events, add message.im bot event
    7. Select Bot Users from left menu 
        * Enter Display Name and Default Username
        * Switch On  Always Show My Bot as Online 
        * Save Changes
    8. Add App to Slack
        * Slack API Console -> Manage Distribution
        * Click Add to Slack Button
        * Once redirected to Slack Team you should be able to see and send messages to awsCommandSlackBotApp in Direct Messages.

5. Create Lambda function with the source code in the repository.

6. Set up awsCommandBot
    1. Go to AWS Console -> Lex -> awsCommandBot -> Editor
    2. Create Intent with name awscommands
    3. Enter "aws" in utterance. Click Add button
    4. create slot type
        * Enter slot type name 'Action'
        * Select Expand Values
        * Enter value 'create-function'
    5. create slot type
        * Enter slot type name 'Aws_Service'
        * Select Expand Values
        * Enter value 'lambda'
    6. Next In Editor, Add Slots
        * Create slot with Name as service
        * Slot type as Aws_Service
        * Prompt as "Which service ?"
        * Create another slot with  Name as Action
        * Slot type as Aws_Service
        * Prompt as "Which service ?"
        * Make them both as required.
    7. In fulfillment, Select AWS Lambda function
    8. Choose lambda function from list
    9. Click OK for Add permission to Lambda Function pop up
    10. Scroll down and save the Intent.
    11. Build the Intent.
    12. publish the Intent -> choose Alias and Publish

7. Test End to End Slack Bot
   1. In Slack -> Direct Messages. Choose awsCommandSlackBotApp
   2. Enter aws
   3. When asked Which Service ?
   4. Enter Lambda
   5. When asked Which action ?
   6. Enter create
   7. aws lambda create-function  --function-name VALUE_HERE --role VALUE_HERE --runtime VALUE_HERE --handler VALUE_HERE --code VALUE_HERE
