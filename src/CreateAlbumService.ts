interface Album {
  name: string;
  owner: string;
  musics: Array<object>;
  link: string;
}

class CreateAlbumService {
  execute({ name, owner, musics, link }: Album) {
    console.log(name, owner, musics, link);
  }
}

export default new CreateAlbumService();

// Album
// ID - uuid
// name - string
// owner - string
// musics - List
