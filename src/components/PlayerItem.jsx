import React, { useEffect, useState, forwardRef } from "react";

import useDebounce from '../hooks/debounceHook';
import Button from "./ui/Button";

const PlayerItem = forwardRef(({ player, onUpdateName, onUpdateSkill, onDelete }, ref) => {
  const [name, setName] = useState(player.name);
  const [error, setError] = useState("");
  const debouncedName = useDebounce(name, 500);

  useEffect(() => {
    if (debouncedName.trim().length === 0) {
      setError("Name must be at least 1 character");
      return;
    }

    setError("");
    onUpdateName(player._id, debouncedName);
  }, [debouncedName, player._id]);

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

      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((skillLevel) => (
          <button
            key={skillLevel}
            onClick={() => onUpdateSkill(player._id, skillLevel)}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${player.skill === skillLevel
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
              } hover:bg-blue-500 hover:text-white transition-colors`}
          >
            {skillLevel}
          </button>
        ))}
      </div>

      <Button onClick={() => onDelete(player._id)}
        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
        Delete
      </Button>
    </div>
  );
});

export default PlayerItem;