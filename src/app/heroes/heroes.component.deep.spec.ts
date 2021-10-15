import { Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

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
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                {
                    provide: HeroService,
                    useValue: mockHeroService
                }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
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

    it('should call heroService.deleteHero when the HeroComponent delete button is clicked', () => {
        // arrange
        spyOn(fixture.componentInstance, 'delete');

        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        (<HeroComponent>heroComponents[0].componentInstance).delete.emit();

        // act

        // assert
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('should add a new hero to a hero list when the add button is clicked', () => {
        // arrage
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const name = "Dr. Strange";
        mockHeroService.addHero.and.returnValue(of({
            id: 5,
            name,
            strength: 67
        }));

        const input = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        input.value = name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

        expect(heroText).toContain(name);
    });

    it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        let routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);

        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navigatedTo).toBe('/detail/1');
    });
});