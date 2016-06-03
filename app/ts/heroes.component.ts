import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Hero } from "./hero.ts!typescript";
import { HeroDetailComponent } from "./hero-detail.component.ts!typescript";
import { HeroService } from "./hero.service.ts!typescript";

@Component({
  selector: "my-heroes",
  templateUrl: "heroes.component.html",
  directives: [HeroDetailComponent],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit {
  heroes = Hero[0];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getHeroes() {
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }

  gotoDetail() {
    this.router.navigate(["/detail", this.selectedHero.id]);
  }
}
