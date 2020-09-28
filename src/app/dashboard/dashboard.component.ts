import { Component, OnInit } from "@angular/core";
import { AlbumDataServiceService } from "../services/album-data.service";
import { Subject, Subscription } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";

import { AlbumItem, AlbumData } from "../interfaces/album-data";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  searchStr: string = "";
  showOnlyFavorite: boolean;
  searchStrSubject = new Subject<string>();
  albumData: AlbumData = [];
  subscribe : Subscription;

  // fetching data from local storage so that if user refresh the page, the view selected before refresh will render
  layout: string = localStorage.getItem("album-layout") || "card";

// to show message while loading the data
  get resultMessage() {
     if (this.loading) return 'Loading results...'
     else if (this.showOnlyFavorite) return 'Showing favorite results.'
     else if (this.searchStr !== '') return 'Showing result for ' + this.searchStr + '.';
     else return 'Showing all results.' 
  }

  constructor(private _albumDataService: AlbumDataServiceService) {
  this.subscribe=  this.searchStrSubject
      .pipe(
        // when search data change fetch data with debounce of 200ms
        debounceTime(200),
        //keep the response mapped with search string
        switchMap((searchStr: string) => {
          this.loading = true;
          return this._albumDataService.getAlbumData(
            searchStr,
            this.showOnlyFavorite
          );
        })
      )
      .subscribe((data) => {
        this.loading = false;
        this.albumData = data;
      });
    // when removing favorites from the item, item will  be removed from the show favorites
    this._albumDataService.onFavoriteToggle.subscribe((itemId) => {
      if (this.showOnlyFavorite) {
        this.albumData = this.albumData.filter(
          (albumItem) => albumItem.albumId !== itemId
        );
      }
    });
  }

ngOnDestroy(){
  this.subscribe.unsubscribe();
}
  ngOnInit(): void {
    this.loadAlbumData();
  }

  // setting the local storage so that same layout will be rendered, if user refresh the page
  public changeLayout(layout) {
    this.layout = layout;
    localStorage.setItem("album-layout", layout);
    
    if (this.showOnlyFavorite) {
      // reset favorite flag
      this.showOnlyFavorite = false;
      this.loadAlbumData();
    }
   }

  // when user search for any string in searchbox
  public onSearchStrChange(searchStr: string) {
    this.searchStrSubject.next(searchStr);
  }

  // for toggling the data for favorite result
  public toggleFavoriteAlbum() {
    // toggle favorite
    this.showOnlyFavorite = !this.showOnlyFavorite;
    // reset the search string
    this.searchStr = "";
    this.loadAlbumData();
  }

// to load complete album data 
  private loadAlbumData() {
    this.loading = true;
    this._albumDataService
      .getAlbumData(this.searchStr, this.showOnlyFavorite)
      .subscribe((data) => {
        this.loading = false;
        this.albumData = data;
      });
  }
}
