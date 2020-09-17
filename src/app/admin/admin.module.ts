import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BlogComponent } from './blogs/blog/blog.component';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { BlogsComponent } from './blogs/blogs.component';

@NgModule({
  declarations: [BlogComponent, AdminComponent, BlogListComponent, BlogsComponent],
  imports: [SharedModule, AdminRoutingModule]
})
export class AdminModule {}
