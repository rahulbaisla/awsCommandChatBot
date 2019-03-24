// Load the SDK and UUID
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();
var constants = require('constants');

exports.handler = async (event) => {
    //--------------------------------------------------------------------------
    // Variables
    //--------------------------------------------------------------------------
    let currentIntent = event.currentIntent;
    let slotDetails = currentIntent.slotDetails;
    let service = slotDetails.service.originalValue;
    let action = slotDetails.action.originalValue;
    var command = constants.AWS;
   
    //--------------------------------------------------------------------------
    // Transform the action input to match values in Dynamo DB 
    //--------------------------------------------------------------------------
    if (service == constants.LAMBDA) {
        if (action.indexOf(constants.CREATE) > -1) {
            action = constants.ACTION_CREATE_FUNCTION;
        } else if (action.indexOf(constants.LIST) > -1) {
            action = constants.ACTION_LIST_FUNCTION;
        } else if (action.indexOf(constants.DELETE) > -1) {
            action = constants.ACTION_DELETE_FUNCTION;
        } else if (action.indexOf(constants.INVOKE) > -1) {
            action = constants.INVOKE;
        }
    }
    
    //--------------------------------------------------------------------------
    // Create parameters required for getItem DynamoDB action and fetch the item
    //--------------------------------------------------------------------------
    
    var params = {
      Key: {
       "servicename": {
         S: service
        }, 
       "methodname": {
         S: action
        }
      }, 
      TableName: process.env.DDB_COMMAND_TABLE
     };
     
     try {
        command = command + ' ' + service + ' ' + action + ' ';
         
        var data = await dynamodb.getItem(params).promise();
        var parameters = data.Item.parameters.L;

        parameters.forEach(function(value) {
            command = command + ' --' + value.S + ' VALUE_HERE' ;
        });
    }
    catch (err) {
        console.log(err);
        return err;
    }

    //--------------------------------------------------------------------------
    // Create and return response
    //--------------------------------------------------------------------------
    const response = {
          "dialogAction": {
          "type": "Close",
          "fulfillmentState": "Fulfilled",
           "message": {
              "contentType": "PlainText",
              "content": command
            }
        }
    };
    return response;
};
