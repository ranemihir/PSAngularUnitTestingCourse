import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES: Hero[];

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        HEROES = [
            { id: 1, name: 'Spider Man', strength: 12 },
            { id: 2, name: 'Iron Man', strength: 44 },
            { id: 3, name: 'Captain America', strength: 36 }
        ];

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            providers: [
                {
                    provide: HeroService,
                    useValue: mockHeroService
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should render each hero as HeroComponent', () => {
        // arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        // act

        // assert
        const heroDebugElement = fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect(fixture.componentInstance.heroes.length).toBe(3);
        expect(heroDebugElement.length).toBe(3);

        for (let i = 0; i < HEROES.length; i++) {
            expect(heroDebugElement[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });
});