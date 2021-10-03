export class File {
    id?: number;
    name?: string;
    description?: string;
    img?: string;
    status?: string;

    constructor(name: string, description: string, img: string, status: string) {
        this.name = name;
        this.description = description;
        this.img = img;
        this.status = status;
    }   
}