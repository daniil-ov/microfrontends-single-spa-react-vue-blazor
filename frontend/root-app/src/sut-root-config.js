import {registerApplication, start} from "single-spa";
import {
    constructApplications,
    constructRoutes,
    constructLayoutEngine,
} from 'single-spa-layout';

registerApplication({
    name: "@sut/html-editor-new",
    app: () => System.import("@sut/html-editor-new"),
    activeWhen: ["/"],
});

registerApplication({
    name: "@sut/vue-app-new",
    app: () => System.import("@sut/vue-app-new"),
    activeWhen: ["/"],
});

const routes = constructRoutes(document.querySelector('#single-spa-layout'));
const applications = constructApplications({
    routes,
    loadApp({ name }) {
        return System.import(name);
    },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

// applications.forEach(registerApplication);

start({
    urlRerouteOnly: true,
});
