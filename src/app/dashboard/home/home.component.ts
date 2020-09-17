import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { BlogsService } from './../../core/services/blogs.service';
import { Observable } from 'rxjs';
import { Blog } from './../../core/model/blog.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //public content: string;
  // @ViewChild('mde') mde: SimpleMDE;
  //public htmlContent: string;

  blogs: Observable<any[]>;

  constructor(private afs: AngularFirestore, private blogsService: BlogsService) {}

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
    /* this.content = `# This is my first blog
    * list1
    * list2
    * list3

 #  title

       1. asda
       2. asdsa
       3. asd

   Colons can be used to align columns.

   | Tables        | Are           | Cool  |
   | ------------- |:-------------:| -----:|
   | col 3 is      | right-aligned | $1600 |
   | col 2 is      | centered      |   $12 |
   | zebra stripes | are neat      |    $1 |

           ![sample text](https://via.placeholder.com/250https://placeholder.com/)`;*/
    // this.editor.nativeElement.
    /*this.mde.codemirror.on('change', () => {
      console.log(this.mde.value);
    });*/
    /*this.mde.codemirror.on('change', () => {
      console.log('content changed');
      // this.htmlContent = this.mde.options.previewRender(this.mde.value());
    });*/
    // this.mde.
  }
}
