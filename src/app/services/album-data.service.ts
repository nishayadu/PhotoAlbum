import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AlbumItem, AlbumData } from "../interfaces/album-data";

@Injectable({
  providedIn: "root",
})
export class AlbumDataServiceService {
   @Output() onFavoriteToggle = new EventEmitter<string>();
  private favourites: any = JSON.parse(
    localStorage.getItem("favoriteList") || "{}"
  );
  constructor(private _httpClient: HttpClient) {}

  // to fetch data from json file and filtering data based on search text
  public getAlbumData(searchStr, showOnlyFavorite = false) {
    // mocking album API
    return this._httpClient.get("assets/album-data.json").pipe(
      map((data: AlbumData) => {
        return data
          // add favorite flag on each item
          .map((item) => {
            return { ...item, favorite: !!this.favourites[item.id] };
          })
          // sort albumItem on the basis of Date
          .sort((a, b) => {
            return (
              new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
            );
          })
          // filter data to show only favorite items if showOnlyFavorite param is sent
          .filter((item) => {
            if (showOnlyFavorite) return item.favorite;
            return true;
          })
          // filter data when user search with title or posted by
          .filter((item: AlbumItem) => {
            searchStr = searchStr.toLowerCase();
            const title = item.title.toLowerCase();
            const postedBy = item.postedBy.toLowerCase();

            return (
              title.startsWith(searchStr) || postedBy.startsWith(searchStr)
            );
          });
      })
    );
  }

  public toggleFavourite(itemId: any) {
    this.favourites[itemId] = !this.favourites[itemId];
    localStorage.setItem("favoriteList", JSON.stringify(this.favourites));
    this.onFavoriteToggle.emit(itemId);
  }
}
