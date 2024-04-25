import { Animal } from "./Animal";
import { User } from "./User";

type AdoptionApplication = {
    id: string;
    adopter: User;
    animal: Animal;
    appliedDate: Date;
    description: string;
}

export type { AdoptionApplication };