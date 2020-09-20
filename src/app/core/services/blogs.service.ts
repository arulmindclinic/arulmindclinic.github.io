import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Blog } from './../model/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  blogs: AngularFirestoreCollection<Blog>;
  blogDoc: AngularFirestoreDocument<Blog>;

  constructor(private afs: AngularFirestore) {
    this.blogs = this.afs.collection<Blog>('blogs');
  }

  addBlog(blog: Blog) {
    this.blogs.add(blog);
  }

  getBlog(pageType,id) {
    this.blogDoc = this.afs.doc<Blog>(`${pageType}/${id}`);
    return this.blogDoc;
  }

  updateBlog(pageType,id: string, blog: Blog) {
    this.blogDoc = this.afs.doc<Blog>(`${pageType}/${id}`);
    this.blogDoc.update(blog);
  }

  deleteBlog(pageType,id: string) {
    this.blogDoc = this.afs.doc<Blog>(`${pageType}/${id}`);
    this.blogDoc.delete();
  }
}
