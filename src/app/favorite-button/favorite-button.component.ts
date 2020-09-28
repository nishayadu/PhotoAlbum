import { Component, OnInit, Input } from "@angular/core";
import { AlbumDataServiceService } from "../services/album-data.service";
import { AlbumItem } from "../interfaces/album-data";

@Component({
  selector: "app-favorite-button",
  templateUrl: "./favorite-button.component.html",
  styleUrls: ["./favorite-button.component.scss"],
})
export class FavoriteButtonComponent implements OnInit {
  constructor(private _albumDataService: AlbumDataServiceService) {}
  // to get album item from the card or grid view
  @Input() albumItem : AlbumItem;
  ngOnInit(): void {}

  toggleFavorite() {
    // adding item to the favorite list based on item id
    this._albumDataService.toggleFavourite(this.albumItem.id);
    // to change the icon when item is added to the favorite list
    this.albumItem.favorite = !this.albumItem.favorite;
  }
}
