//Şehir arama kutusu 
import { useState } from "react";
import type { FormEvent } from "react";

interface SearchBarProps {
    onSearch: (city: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {

    const [text, setText] = useState("");
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const trimCity = text.trim();
        if (!trimCity) {
            alert('Lütfen şehir ismi yazınız!')
            return
        }
        onSearch(trimCity);
        setText("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Şehir ara"
                    value={text}
                    onChange={(e) => setText(e.target.value)} />
                    <button type="submit">Ara</button>
            </form>
        </div>
    )
}
export default SearchBar;