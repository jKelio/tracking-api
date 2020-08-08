export class SecurityEntity {
  private successfull: boolean;
  private accessToken: string;

  constructor(successfull: boolean, accessToken: string) {
    this.successfull = successfull;
    this.accessToken = accessToken;
  }

  public isSuccessfull(): boolean {
    return this.successfull;
  }

  public getAccessToken(): string {
    return this.accessToken;
  }
}
