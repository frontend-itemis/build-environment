import { Component } from "@angular/core";
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "@angular/router";

import { HeroService } from "./hero.service.ts!typescript";
import { HeroesComponent } from "./heroes.component.ts!typescript";
import { HeroDetailComponent } from "./hero-detail.component.ts!typescript";
import { DashboardComponent } from "./dashboard.component.ts!typescript";

@Component({
    selector: "my-app",
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['/']">Dashboard</a>
            <a [routerLink]="['/heroes']">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HeroService
    ]
})
@Routes([
    {
        path: "/heroes",
        component: HeroesComponent
    },
    {
        path: "/",
        component: DashboardComponent
    },
    {
        path: "/detail/:id",
        component: HeroDetailComponent
    }
])
export class AppComponent {
    title = "Tour of Heroes";
}
