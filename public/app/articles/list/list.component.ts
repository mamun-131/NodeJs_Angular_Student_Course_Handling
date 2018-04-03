import { Component } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'list',
    templateUrl: 'app/articles/list/list.template.html'
})
export class ListComponent {
    articles: any;
    errorMessage: string;
    constructor(private _articlesService: ArticlesService,
        private _router: Router,
        private _route: ActivatedRoute,) { }
    ngOnInit() {
        this._articlesService.list().subscribe(articles => {
            console.log(articles);
            this.articles = articles}
        );
    }

    aaa () {
        this._router.navigateByUrl('/articles/create');
};
}

