import "reflect-metadata";
// workaround for https://github.com/angular/angular/issues/6007
import Zone from "zone.js";
window.zone = Zone;

// The usual bootstrapping imports
import { bootstrap } from "@angular/platform-browser-dynamic";
import { HTTP_PROVIDERS } from "@angular/http";

import { AppComponent } from "./app.component.ts!typescript";

bootstrap(AppComponent, [
    HTTP_PROVIDERS
]);
