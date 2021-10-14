import { TestBed } from "@angular/core/testing";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HeroService } from "./hero.service";


describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let heroService: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                {
                    provide: MessageService,
                    useValue: mockMessageService
                }
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        heroService = TestBed.inject(HeroService);
    });

    describe('getHero', () => {
        it('should call correct URL', () => {
            // call getHero()
            heroService.getHero(4).subscribe();

            // test that the URL is correct
            const req = httpTestingController.expectOne('api/heroes/4');

            req.flush({
                id: 4,
                name: 'Batman',
                strength: 40
            });

            expect(req.request.method).toBe('GET');

            httpTestingController.verify();
        });
    });
});