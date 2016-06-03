import { Component } from "angular2/core";
import { Router } from "angular2/router";

import { Hero } from "./hero.ts!typescript";
import { HeroService } from "./hero.service.ts!typescript";

@Component({
  selector: "my-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];

    constructor(
        private router: Router,
        private heroService: HeroService) { }

    ngOnInit() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
    }

    gotoDetail(hero: Hero) {
        let link = ["HeroDetail", { id: hero.id }];
        this.router.navigate(link);
    }
}