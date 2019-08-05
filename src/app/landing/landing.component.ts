import { Component, OnInit } from "@angular/core";
import { MetaService } from "@ngx-meta/core";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})
export class LandingComponent implements OnInit {
  constructor(private readonly meta: MetaService) {
    this.meta.setTitle("consult 4 health");
    this.meta.setTag("og:description", "consult 4 health ");
    this.meta.setTag("og:title", "consult 4 health ");
    this.meta.setTag("og:type", "https://consult4health.com");
    this.meta.setTag(
      "og:image",
      "https://consult4health.com/assets/images/logo.png"
    );
  }

  ngOnInit() {}
}
