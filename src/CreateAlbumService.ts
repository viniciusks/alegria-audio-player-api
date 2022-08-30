interface Album {
  name: string;
  owner: string;
  musics: Array<object>;
}

class CreateAlbumService {
  execute({ name, owner, musics }: Album) {
    console.log(name, owner, musics);
  }
}

export default new CreateAlbumService();

// Album
// ID - uuid
// name - string
// owner - string
// musics - List
