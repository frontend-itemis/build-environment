import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { RouteSegment } from "@angular/router";

import { Hero } from "./hero.ts!typescript";
import { HeroService } from "./hero.service.ts!typescript";

@Component({
  selector: "my-hero-detail",
  templateUrl: "hero-detail.component.html"
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    error: any;
    navigated = false; // true if navigated here

    constructor(
        private _heroService: HeroService,
        private _routeSegment: RouteSegment) { }

    ngOnInit() {
        if (this._routeSegment.getParam("id") !== null) {
            let id = +this._routeSegment.getParam("id");
            this.navigated = true;
            this._heroService.getHero(id)
                .then(hero => this.hero = hero);
        } else {
            this.navigated = false;
            this.hero = new Hero();
        }
    }

    save() {
        this._heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero; // saved hero, w/ id if new
                this.goBack(hero);
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        if (this.navigated) {
            window.history.back();
        }
    }
}
