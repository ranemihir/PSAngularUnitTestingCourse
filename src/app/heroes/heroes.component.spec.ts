import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES: Hero[];
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'Spider Man', strength: 12 },
            { id: 2, name: 'Iron Man', strength: 44 },
            { id: 3, name: 'Captain America', strength: 36 }
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        component = new HeroesComponent(mockHeroService);
    });

    describe('delete', () => {
        it('should remove the indicated hero from the heroes list', () => {
            // arrange
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            // act
            component.delete(HEROES[2]);

            // assert
            expect(component.heroes.length).toBe(2);

            component.heroes.forEach(hero => {
                expect(hero != HEROES[2]).toBe(true);
            });
        });

        it('should call heroService.deleteHero', () => {
            // arrange
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            // act
            component.delete(HEROES[2]);

            // assert
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });
    });
});