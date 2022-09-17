import { ObjectId } from "mongodb";

export class Album {
  constructor(
    public name: string,
    public owner: string,
    public musics: Array<object>,
    public link: string,
    public createdAt: Date,
    public _id?: ObjectId
  ) {}
}
