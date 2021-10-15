import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";

describe('HeroDetail Component', () => {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute, mockLocation, mockHeroService;

    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: () => '3'
                }
            }
        };

        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);

        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                HeroDetailComponent
            ],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provice: Location, useValue: mockLocation },
                { provide: HeroService, useValue: mockHeroService }
            ]
        });

        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({ id: 5, name: 'Batman', strength: 35 }));
    });

    it('should render hero name in h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('BATMAN');
    });
});