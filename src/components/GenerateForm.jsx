import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";

const GenerateForm = () => {

    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleGenerateTeams = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError("Title is required");
            return;
        }
        setError("");
        navigate("/generate", { state: { title } });
    };

    return (
        <form onSubmit={handleGenerateTeams} className="space-y-4" >
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter a title for the team generation"
                />
                {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
            </div>

            <Button type="submit"
                className="px-4 py-2 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600">
                Generate Teams
            </Button>
        </form >
    );
}

export default GenerateForm;