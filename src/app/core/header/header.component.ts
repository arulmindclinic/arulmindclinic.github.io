import { Component, OnInit } from '@angular/core';
import { AuthcontextService } from '../services/authcontext.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProgressBarService } from '../services/progress-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //currentUser: any;
  authUserObs: Observable<firebase.User>;
  constructor(
    private authctxService: AuthcontextService,
    private router: Router,
    private progressBarService: ProgressBarService
  ) {}
  progressBarMode: string;

  ngOnInit() {
    this.authUserObs = this.authctxService.authObserver();
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
  }

  signIn() {
    this.authctxService.signIn();
  }

  signOut() {
    this.authctxService.signOut().then(() => {
      console.log('logged out successfully');
      this.router.navigate(['/home']);
    });
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }
}
