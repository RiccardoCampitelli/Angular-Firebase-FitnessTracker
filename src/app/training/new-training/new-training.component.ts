import { Exercise } from "./../exercise.model";
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Injectable
} from "@angular/core";
import { TrainingService } from "../training.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
@Injectable()
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[];
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
