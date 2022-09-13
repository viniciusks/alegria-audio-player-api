import { v4 as uuidV4 } from "uuid";

export class Album {
  constructor(
    public name: string,
    public owner: string,
    public musics: Array<object>,
    public link: string,
    public createdAt: Date,
    public _id?: string
  ) {
    if (!this._id) {
      this._id = uuidV4();
    }
  }
}
