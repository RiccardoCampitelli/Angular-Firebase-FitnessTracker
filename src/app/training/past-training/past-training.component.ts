import { Exercise } from "./../exercise.model";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { TrainingService } from "../training.service";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";

@Component({
  selector: "app-past-training",
  templateUrl: "./past-training.component.html",
  styleUrls: ["./past-training.component.css"]
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns = ["date", "name", "duration", "calories", "state"];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) page: MatPaginator;
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.page;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
