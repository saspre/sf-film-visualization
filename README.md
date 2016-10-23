

# SF Film and Localization 
The project is created as a demo of one way of representing data. The bubble chart presentation is not the most precise way of representing size differences, but it does have its merits. 

## Code Structure 
The app consists of several components that can exist by themselves. The primary is the Visualization component. 
It is configurable and can exist more or less indepent from the others. It only depends on an implementation of the ISelectorManager interface. 
The repository layer is added to ensure that the data provider can be switched with minimum effort. 


## Dependencies 
I have avoided using larger frameworks such as AngularJS, Vue, React, Ember, because I wanted to minimise dependencies and the idea behind this project is more to be used as an extension in other projects. 
The following is a list of dependencies and why they are included: 


## Whats Missing?

 - Should use api token for accessing the Soda api.
 - Should be responsive (currently only desktop is supported)
 - Translations
 - Split bundle.js into app.js and vendor.js 
 - Add cache busting

## What would be cool to add?

 - Circles should be clicable and shold show more info
 - Add framework support 
