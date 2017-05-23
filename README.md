

# SF Film and Localization 
The project is created as a demo of one way of representing data. 
The bubble chart presentation is not the most precise way of representing size differences, but it does have its merits. 

The app allows a user to select two selectors. The data (in this case movies and their location sets in SF) are then grouped by first the primary then the secondary selector. 
E.g. if the primary is **Locations** and the secondary is **Movie**, each bubble shows a location. The size of the bubble represents the number of movies recorded at that location.

[Demo](https://rasmusprentow.github.io/sf-film-visualization/)

## Code Structure 
The app consists of several components that can exist by themselves. The primary is the Node-Hiearchy component. 

### Node-Hiearchy Component 
The Node-Hiearchy component is configurable and can exist more or less indepent from the others as it only depends on `d3`. 

### Store and Services
The store comprises the data layer in the app. They utilize `Observables` from `rxjs` to store current application state and emit events across the application. 

### Other components 
The other components merely acts as demonstration for the visualization components and helps providing control to it. 


## Dependencies 
The app is based on Angular as a primary framework, while the node-hierachy uses d3 as a dependency. The node-hiearchy is not dependent on angular and no angular component is dependent on d3. The node-hiearchy is infact not a Angular component.  


## Code Usage 

Install using:
```bash
yarn
```

Run tests:
```bash
npm run test
```

Make production build:
```bash
ng build -prod
```

Test Server: 
```bash
npm run serve
```

## Next Step

### Whats Missing?
 - Should use api token for accessing the Soda api.
 - Translations
 - Automated End2end test





