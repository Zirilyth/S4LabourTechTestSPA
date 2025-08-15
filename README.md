# S4LabourTechTest

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Tech Test Notes

I have used tailwind for basic styling and layouts. I would have made nicer styles or added more components if I had more time.

The search functionality uses a debounce rxjs pipe to reduce the number of changes to the search results.

I have spent some time during this to experiment with the new angular Resource API, which I've used for the data handling;
it's quite nice, once I figured out how it wanted to be used. It allows a much simpler way of reloading and retrying to get data from the API as well as cancelling requests.
If you want to have a look, the code is in the `src/app/services` folder. And the documentation for it is here [Angular Resource API](https://angular.dev/guide/signals/resource)

## Performance

I would like to implement a pagination system for the employee results. This would allow larger datasets without slowing down the initial page load.
This can build on the search functionality, as a virtual scroll which would grab the data as it goes, as well as not having to load all the components.

## Notes for improvement

I would like to add some nicer loading animations for the search results as well as a loading bar for the page navigation, in case it takes a while to load.
I would like to split the service into a seperate notes service and a employee service, much like the API. This would allow for more flexibility,
be more testable and be more maintainable.
I would also like to add more unit tests as well as to move some of the data manipulation (such as the fullName function) into the service.
