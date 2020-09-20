import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blog } from 'src/app/core/model/blog.model';
import { BlogsService } from 'src/app/core/services/blogs.service';

@Component({
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  blogs: Observable<any[]>;

  constructor(private afs: AngularFirestore, private blogsService: BlogsService) {}

  ngOnInit() {
    this.blogs = this.afs
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
    
  }

}
