import { Subscription } from "rxjs";
import { UiService } from "./../../shared/ui.service";
import { AuthService } from "./../auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  loadingSubs: Subscription;
  constructor(private authService: AuthService, private uiService: UiService) {}

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(loading => {
      this.isLoading = loading;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    if (this.loadingSubs) this.loadingSubs.unsubscribe();
  }
}
