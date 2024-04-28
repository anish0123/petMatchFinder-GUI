import { Animal } from "./Animal";
import { User } from "./User";

type AdoptionApplication = {
    id: string;
    adopter: User;
    animal: Animal;
    appliedDate: Date;
    description: string;
    applicationStatus: 'pending' | 'approved' | 'rejected';
}

export type { AdoptionApplication };