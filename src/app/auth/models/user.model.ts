export class User {
  constructor(
    public uid: string | null | undefined,
    public name: string,
    public email: string | null | undefined,
  ) {}
}
