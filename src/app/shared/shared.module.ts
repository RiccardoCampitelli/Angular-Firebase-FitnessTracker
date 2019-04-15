import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "./../material.module";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, FlexLayoutModule],
  exports: [BrowserModule, FormsModule, MaterialModule, FlexLayoutModule]
})
export class SharedModule {}
