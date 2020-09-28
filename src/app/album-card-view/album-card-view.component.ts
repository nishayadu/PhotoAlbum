import { Component, OnInit, Input } from '@angular/core';

import { AlbumData } from '../interfaces/album-data';

@Component({
  selector: 'app-album-card-view',
  templateUrl: './album-card-view.component.html',
  styleUrls: ['./album-card-view.component.scss'],
})
export class AlbumCardViewComponent implements OnInit {
  constructor() {}

  // to get Data from Dashboard component
  @Input() albumData: AlbumData;
  ngOnInit(): void {}
}
