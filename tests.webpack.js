var context = require.context('./src', true, /-test\.t$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);