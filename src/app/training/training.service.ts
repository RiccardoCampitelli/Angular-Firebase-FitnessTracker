import { AuthService } from "./../auth/auth.service";
import { UiService } from "./../shared/ui.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Exercise } from "./exercise.model";
import { Subject, Subscription } from "rxjs";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private fbsubs: Subscription[] = [];
  private runningExercise: Exercise;
  private availableExercises: Exercise[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService) {}

  getAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbsubs.push(
      this.db
        .collection("availableExercises")
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                ...doc.payload.doc.data()
              };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
            this.uiService.loadingStateChanged.next(false);
          },
          error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(
              "Fetching failed, please try again later",
              null,
              3000
            );
          }
        )
    );
  }

  startExercise(selectedId: string) {
    console.log(this.availableExercises);
    this.runningExercise = this.availableExercises.find(
      e => e.name === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise(uId) {
    this.AddToDataBase({
      ...this.runningExercise,
      date: new Date(),
      state: "completed",
      uId: uId
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number, uId) {
    this.AddToDataBase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: "cancelled",
      uId: uId
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchCompletedOrCancelledExercises(uId) {
    this.fbsubs.push(
      this.db
        .collection("finishedExercises")
        .valueChanges()
        .pipe(
          map((exercises: Exercise[]) => {
            var ex = [
              ...exercises.filter(e => {
                if (e.uId == uId) return e;
              })
            ];

            return ex;
          })
        )

        .subscribe((exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises);
        })
    );
  }

  AddToDataBase(exercise: Exercise) {
    this.db.collection("finishedExercises").add(exercise);
  }

  CancelSubscriptions() {
    this.fbsubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
