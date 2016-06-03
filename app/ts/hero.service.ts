import { Injectable } from "angular2/core";

import { Hero } from "./hero.ts!typescript";
import { HEROES } from "./mock-heroes.ts!typescript";

@Injectable()
export /**
 * HeroService
 */
class HeroService {

    getHeroes() {
        return Promise.resolve(HEROES);
    }

    getHeroesSlowly() {
        return new Promise<Hero[]>(resolve =>
            setTimeout(() => resolve(HEROES), 1000)
        );
    }

    getHero(id: number) {
        return this.getHeroes()
            .then(heroes => heroes.filter(hero => hero.id === id)[0]);
    }
}
