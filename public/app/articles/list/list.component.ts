import { Component } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
@Component({
    selector: 'list',
    templateUrl: 'app/articles/list/list.template.html'
    
})
export class ListComponent {
    user: any;
    articles: any;
    errorMessage: string;
    constructor(private _articlesService: ArticlesService,
        private _router: Router,
        private _route: ActivatedRoute,private _authenticationService: AuthenticationService) { }
    ngOnInit() {
        this.user = this._authenticationService.user;
        this._articlesService.list().subscribe(articles => this.articles
            = articles);
    }

    aaa () {
        this._router.navigateByUrl('/articles/create');
};
}

