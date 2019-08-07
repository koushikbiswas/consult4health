import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { DemoMaterialModule } from "../material-module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MetaModule } from "@ngx-meta/core";
import { LandingComponent } from "./landing/landing.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent, LandingComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    MetaModule.forRoot(),
    DemoMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
