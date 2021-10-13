import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES: Hero[];

    @Component({
        selector: 'app-hero',
        template: '<div></div>'
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
    }

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        HEROES = [
            { id: 1, name: 'Spider Man', strength: 12 },
            { id: 2, name: 'Iron Man', strength: 44 },
            { id: 3, name: 'Captain America', strength: 36 }
        ];

        TestBed.configureTestingModule({
            declarations: [HeroesComponent, FakeHeroComponent],
            providers: [
                {
                    provide: HeroService,
                    useValue: mockHeroService
                }
            ],
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should set heroes correctly from the service', () => {
        // arrange

        // act
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        // assert
        expect(fixture.componentInstance.heroes).toEqual(HEROES);
    });

    it('should create one <li> element for each hero', () => {
        // arrange

        // act
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        // assert
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });
});