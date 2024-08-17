import React, { useState, useEffect } from "react";

interface SearchProps {
    onFilterChange: (filter: string) => void;
}

export const Search: React.FC<SearchProps> = ({ onFilterChange }) => {
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        const handler = setTimeout(() => {
            onFilterChange(inputValue);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, onFilterChange]);

    return (
        <>
            <span>Search: </span>
            <input
                type="text"
                placeholder="Filter by name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </>
    );
};