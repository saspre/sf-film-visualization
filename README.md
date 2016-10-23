

# SF Film and Localization 
The project is created as a demo of one way of representing data. 
The bubble chart presentation is not the most precise way of representing size differences, but it does have its merits. 

The app allows an user to select a two selectors. The data (in this case movies and their location sets in SF) are then grouped by first the primary then the secondary selector. . 
E.g. if the primary is **LocationMovie** and the secondary is **Movie**, each bubble shows a location. The size of the bubble represents the number of movies recorded at that location.

[Demo](https://rasmusprentow.github.io/sf-film-visualization/)

## Code Structure 
The app consists of several components that can exist by themselves. The primary is the Visualization component. 

### Visualization Component 
The visualization component is configurable and can exist more or less indepent from the others. It only depends on two interfaces, namely the `ISelectorManager` interface and the `IGroupRepository`. 
The component consists of 2 subcomponents. A loader and a node hierarchy. 
The latter utlized `d3.layout.pack()` to place nodes on the svg. 

### Repository
The repository is built on top of the SODA Api. I Decided not to use the Soda-Js library as it seemed poorly documented and the API itself is very simple. 


### Other components 
The other components merely acts as demonstration for the visualization components and helps providing control to it. 


## Dependencies 
I have avoided using larger frameworks such as AngularJS, Vue, React, Ember, because I wanted to minimise dependencies and the idea behind this project is more to be used as an extension in other projects. 
Major dependencies include D3 and jQuery. D3 is a primary driver in the layouting, while jQuery should preferably be removed and should only be used for the control UI and not the Visualiser. 

## Code Usage 

Install using:
```bash
npm install
```

Run tests:
```bash
npm test 
```

Make production build:
```bash
npm run build
```

## Next Step

### Whats Missing?
 - Should use api token for accessing the Soda api.
 - Should be responsive (currently only desktop is supported)
 - Translations
 - Split bundle.js into app.js and vendor.js 
 - Add cache busting

### What would be cool to add?
 - Circles should be clicable and shold present info
 - Add framework support 


