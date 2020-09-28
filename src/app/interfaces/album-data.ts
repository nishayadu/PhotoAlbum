export type AlbumItem = {
  id, number,
  albumId: string,
  title: string,
  url: string,
  thumbnailUrl: string,
  postedBy: string,
  postedAt: string,
  favorite: boolean,
}

export type AlbumData = Array<AlbumItem>;