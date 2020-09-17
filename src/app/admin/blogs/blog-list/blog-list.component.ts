import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blog } from './../../../core/model/blog.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs: Observable<any[]>;
  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private blogsService: BlogsService
  ) {}

  ngOnInit() {
    this.blogs = this.afs
      .collection('blogs')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            //Get document data
            const data = a.payload.doc.data() as Blog;
            //Get document id
            const id = a.payload.doc.id;
            //Use spread operator to add the id to the document data
            return { id, ...data };
          });
        })
      );
  }

  addBlog() {
    this.router.navigate(['/admin/blogs', 0]);
  }

  editBlog(id) {
    this.router.navigate(['/admin/blogs', id]);
  }
}
