import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { BlogComponent } from './blogs/blog/blog.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'blogs', pathMatch: 'full' },
      {
        path: 'blogs',
        component: BlogsComponent,
        children: [
          { path: '', component: BlogListComponent },
          { path: ':id', component: BlogComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
