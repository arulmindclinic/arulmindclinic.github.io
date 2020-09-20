import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { Blog } from './../../../core/model/blog.model';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as SimpleMDE from 'simplemde';
import { Simplemde } from 'ng2-simplemde';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  content: string;
  id: FormControl = new FormControl();
  title: FormControl = new FormControl();
  pageType: string;
  options :SimpleMDE.Options = {};
  @ViewChild('simplemde', { static: true }) private readonly simplemde: Simplemde;

  constructor(
    private blogsService: BlogsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    // this.pageType = this.activatedRoute.snapshot.queryParamMap.get('pageType');
    
   //  this.renderer.setStyle(this.simplemde.textarea.nativeElement,'text-align','left');
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.blogsService
        .getBlog(params.get('pageType'),params.get('id'))
        .valueChanges()
        .subscribe(data => {
          this.id.setValue(params.get('id'));
          this.pageType = params.get('pageType');
          this.title.setValue(data.title);
          console.log(data.content);
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
    this.blogsService.updateBlog(this.pageType,id, blog);
  }
}
