import { AuthModule } from "./auth/auth.module";
import { AngularFireModule } from "angularfire2";
import { AuthGuard } from "./auth/auth.guard";
import { AuthService } from "./auth/auth.service";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";
import { TrainingService } from "./training/training.service";
import { environment } from "../environments/environment";
import { UiService } from "./shared/ui.service";
import { TrainingModule } from "./training/training.module";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    AuthModule,
    TrainingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthService, AuthGuard, TrainingService, UiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
