export class UserAccountResource {
    private id: string;
    private email: string;

    constructor(id: string, email: string) {
        this.id = id;
        this.email = email;
    }

    public getId(): string {
        return this.id;
    }

    public getEmail(): string {
        return this.email;
    }
}