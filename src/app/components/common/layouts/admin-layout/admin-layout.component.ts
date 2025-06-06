import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
    Router,
    NavigationEnd,
    RouteConfigLoadStart,
    RouteConfigLoadEnd,
    ResolveStart,
    ResolveEnd
} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {MatSidenav} from '@angular/material';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {ThemeService} from '../../../../services/theme/theme.service';
import * as domHelper from '../../../../helpers/dom.helper';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.template.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
    private isMobile;
    isSidenavOpen: Boolean = false;
    isModuleLoading: Boolean = false;
    moduleLoaderSub: Subscription;
    @ViewChild(MatSidenav) private sideNave: MatSidenav;

    constructor(private router: Router,
                public translate: TranslateService,
                public themeService: ThemeService) {
        // Close sidenav after route change in mobile
        router.events.filter(event => event instanceof NavigationEnd)
            .subscribe((routeChange: NavigationEnd) => {
                if (this.isNavOver()) {
                    this.sideNave.close();
                }
            });

        // Translator init
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }

    ngOnInit() {
        // Initialize Perfect scrollbar for sidenav
        const navigationHold = document.getElementById('scroll-area');
        const ps = new PerfectScrollbar(navigationHold, {
            suppressScrollX: true
        });

        // FOR MODULE LOADER FLAG
        this.moduleLoaderSub = this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.isModuleLoading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.isModuleLoading = false;
            }
        });
    }

    ngOnDestroy() {
        this.moduleLoaderSub.unsubscribe();
    }

    isNavOver() {
        const isSm = window.matchMedia(`(max-width: 960px)`).matches;

        // Disable collapsed menu in small screen
        if (isSm && domHelper.hasClass(document.body, 'collapsed-menu')) {
            domHelper.removeClass(document.body, 'collapsed-menu');
        }
        return isSm;
    }
}
