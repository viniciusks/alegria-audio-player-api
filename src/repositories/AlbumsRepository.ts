import { Album } from "../model/Album";

interface ICreateAlbumDTO {
  name: string;
  owner: string;
  musics: Array<object>;
  link: string;
}

export class AlbumsRepository {
  private albums: Album[];

  constructor() {
    this.albums = [];
  }

  create({ name, owner, musics, link }: ICreateAlbumDTO): void {
    const album = new Album(name, owner, musics, link, new Date());

    // TODO: Insert para o banco
    this.albums.push(album);
  }

  get(): Album[] {
    // TODO: Get do banco
    return this.albums;
  }

  findByName(name: string): Album {
    // TODO: Find no banco
    return this.albums.find((album) => album.name === name);
  }
}
