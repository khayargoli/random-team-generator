import React, { useEffect, useState, forwardRef } from "react";

import useDebounce from '../hooks/debounceHook';
import Button from "./ui/Button";

const TeamItem = forwardRef(({ team, onUpdateName, onDelete }, ref) => {
    const [name, setName] = useState(team.name);
    const [error, setError] = useState("");
    const debouncedName = useDebounce(name, 500);

    useEffect(() => {
        if (debouncedName === team.name) return;
        
        if (debouncedName.trim().length === 0) {
            setError("Name must be at least 1 character");
            return;
        }

        setError("");
        onUpdateName(team._id, debouncedName);
    }, [debouncedName, team._id]);



    return (
        <div className="flex items-center space-x-4">
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ref={ref}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>


            <Button onClick={() => onDelete(team._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                Delete
            </Button>

        </div>
    );
});

export default TeamItem;