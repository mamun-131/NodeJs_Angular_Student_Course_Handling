import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { ViewByCourseComponent } from './viewByCourse/view.component';
import { ViewByStudentComponent } from './viewByStudent/view.component';
import { EditComponent } from './edit/edit.component';
export const ArticlesRoutes: Routes = [{
    path: 'articles',
    component: ArticlesComponent,
    children: [
        { path: '', component: ListComponent },
        { path: 'create', component: CreateComponent },
        { path: ':articleId', component: ViewComponent },
        { path: ':courseId/viewByCourse', component: ViewByCourseComponent },
        { path: ':studentId/viewByStudent', component: ViewByStudentComponent },
        { path: ':articleId/edit', component: EditComponent }
    ],
}];

