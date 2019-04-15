import { UiService } from "./../../shared/ui.service";
import { Component, OnInit, Injectable, OnDestroy } from "@angular/core";
import { TrainingService } from "../training.service";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, Subscription } from "rxjs";
import { Exercise } from "../exercise.model";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
@Injectable()
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  loadingSubs: Subscription;
  loading = false;
  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(loading => {
      this.loading = loading;
    });
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.getAvailableExercises();
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) this.exerciseSubscription.unsubscribe();

    if (this.loadingSubs) this.loadingSubs.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
