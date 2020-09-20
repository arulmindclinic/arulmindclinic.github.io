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
  homeBlogs: Observable<any[]>;
  services: Observable<any[]>;
  aboutBlogs: Observable<any[]>;
  contacts: Observable<any[]>;
  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private blogsService: BlogsService
  ) {}

  ngOnInit() {
    this.homeBlogs = this.afs
      .collection('home')
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

      this.services = this.afs
      .collection('services')
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

      this.contacts = this.afs
      .collection('contact')
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

      this.aboutBlogs = this.afs
      .collection('about')
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

  editBlog(pageType,id) {
    this.router.navigate(['/admin/pages', id,{pageType: pageType}]);
  }
}
