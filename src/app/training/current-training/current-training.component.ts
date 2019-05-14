import { AuthService } from "./../../auth/auth.service";
import { Exercise } from "./../exercise.model";
import { StopTrainingComponent } from "./stop-training.component";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { TrainingService } from "../training.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"]
})
export class CurrentTrainingComponent implements OnInit {
  exercise: Exercise;
  progress = 0;
  timer: number;
  currentUserId: string;
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.startOrResumeTimer();
    this.authService.getUserId().subscribe(u => (this.currentUserId = u.uid));
  }

  startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration * 10;

    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise(this.currentUserId);
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress, this.currentUserId);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
