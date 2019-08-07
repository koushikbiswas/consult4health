import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';


import { DemoMaterialModule } from "../material-module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MetaModule } from "@ngx-meta/core";
import { LandingComponent, SuccessModal } from "./landing/landing.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ReactiveFormsModule, FormsModule} from '@angular/forms';


import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SuccessModal
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    MetaModule.forRoot(),
    DemoMaterialModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SuccessModal]
})
export class AppModule {}
