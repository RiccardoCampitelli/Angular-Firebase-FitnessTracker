import { NewTrainingComponent } from "./../../training/new-training/new-training.component";
import { Subscription } from "rxjs";
import { UiService } from "./../../shared/ui.service";
import { AuthService } from "./../auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = false;
  loadingSubs: Subscription;
  constructor(private authService: AuthService, private uiService: UiService) {}

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(loading => {
      this.loading = loading;
    });
  }

  ngOnDestroy() {
    if (this.loadingSubs) this.loadingSubs.unsubscribe();
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
