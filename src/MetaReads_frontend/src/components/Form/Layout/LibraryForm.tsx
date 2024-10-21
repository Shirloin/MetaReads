import { Principal } from "@dfinity/principal";
import { useState } from "react";

interface LibraryFormProps {
    name?: string;
    onSubmit: (e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement> | null, name: string | undefined) => void;
}
export default function LibraryForm({ name, onSubmit }: LibraryFormProps) {
    const [editedName, setEditedName] = useState<string | undefined>(name);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    };

    const handleBlurOrEnter = (e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
        onSubmit(e, editedName)
    };
    return (
        <div>
            <input
                type="text"
                value={editedName}
                onChange={handleNameChange}
                onBlur={handleBlurOrEnter}
                onKeyDown={handleBlurOrEnter}
                className="bg-transparent text-white text-base outline-none border-b-2 border-white w-full"
                autoFocus
            />
        </div>
    )
}