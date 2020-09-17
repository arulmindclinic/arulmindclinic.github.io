import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { Blog } from './../../../core/model/blog.model';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  content: string;
  id: FormControl = new FormControl();
  title: FormControl = new FormControl();
  constructor(
    private blogsService: BlogsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get('id'));
      this.blogsService
        .getBlog(params.get('id'))
        .valueChanges()
        .subscribe(data => {
          this.id.setValue(params.get('id'));
          this.title.setValue(data.title);
          this.content = data.content;
        });
    });
  }

  addUpdateBlog() {
    let blog: Blog = {
      title: this.title.value,
      content: this.content,
      likes: 0
    };
    // call update for existing record
    if (this.id.value && this.id.value != 0) {
      this.updateBlog(this.id.value, blog);
    } else {
      this.addBlog(blog);
    }
    this.router.navigate(['/admin']);
  }

  addBlog(blog) {
    this.blogsService.addBlog(blog);
    console.log('blog has been saved');
  }

  updateBlog(id, blog) {
    this.blogsService.updateBlog(id, blog);
  }
}
