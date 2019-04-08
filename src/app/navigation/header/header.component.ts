import { AuthService } from "./../../auth/auth.service";
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      authStatus => {
        this.isAuth = authStatus;
      }
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
