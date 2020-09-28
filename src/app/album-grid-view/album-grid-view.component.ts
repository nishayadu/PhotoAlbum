import { Component, OnInit, Input } from '@angular/core';

import { AlbumData } from '../interfaces/album-data';

@Component({
  selector: 'app-album-grid-view',
  templateUrl: './album-grid-view.component.html',
  styleUrls: ['./album-grid-view.component.scss'],
})
export class AlbumGridViewComponent implements OnInit {
  constructor() {}
  // to get data from dashboard component
  @Input() albumData: AlbumData;
  ngOnInit(): void {}
}
