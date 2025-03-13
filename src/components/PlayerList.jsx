import React, { useEffect, useState, useRef } from "react";
import { apiClient } from '../communicator/apiClient';
import PlayerItem from "./PlayerItem";
import Dialog from "./Dialog";

const PlayerList = () => {
    // State to store the list of players
    const [players, setPlayers] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [playerToDelete, setPlayerToDelete] = useState(null);
    const inputRef = useRef(null);

    // Fetch players from the back-end
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await apiClient.get(`/api/players`);

                setPlayers(data);
            } catch (error) {
                console.error("Error fetching players:", error);
            }
        };

        fetchPlayers();
    }, []);


    const handleAddPlayer = async () => {
        try {
            const newPlayer = { name: "New Player", skill: 1 };
            const data = await apiClient.post(`/api/players`, newPlayer);

            setPlayers([...players, data]);

            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 10);
        } catch (error) {
            console.error("Error adding player:", error);
        }
    };

    const handleUpdateName = async (id, newName) => {
        try {
            const updatedPlayer = { name: newName };
            const data = await apiClient.put(`/api/players/${id}`, updatedPlayer);

            // Update the player in the list
            setPlayers(
                players.map((player) =>
                    player._id === id ? { ...player, name: data.name } : player
                )
            );
        } catch (error) {
            console.error("Error updating player name:", error);
        }
    };

    const handleUpdateSkill = async (id, newSkill) => {
        try {
            const updatedPlayer = { skill: newSkill };
            const data = await apiClient.put(`/api/players/${id}`, updatedPlayer);

            // Update the player in the list
            setPlayers(
                players.map((player) =>
                    player._id === id ? { ...player, skill: data.skill } : player
                )
            );
        } catch (error) {
            console.error("Error updating player skill:", error);
        }
    };

    const confirmDeletePlayer = (id) => {
        setPlayerToDelete(id);
        setIsDialogOpen(true);
    };

    const handleDeletePlayer = async () => {
        try {
            if (playerToDelete) {
                await apiClient.delete(`/api/players/${playerToDelete}`);
                setPlayers(players.filter(player => player._id !== playerToDelete));
            }
        } catch (error) {
            console.error("Error deleting player:", error);
        } finally {
            setIsDialogOpen(false);
            setPlayerToDelete(null);
        }
    };

    return (

        <>
            <div className="space-y-2">
                {players.map((player, index) => (
                    <PlayerItem
                        key={player._id}
                        player={player}
                        onUpdateName={handleUpdateName}
                        onUpdateSkill={handleUpdateSkill}
                        onDelete={() => confirmDeletePlayer(player._id)}
                        ref={index === players.length - 1 ? inputRef : null}
                    />
                ))}
            </div>

            <button
                onClick={handleAddPlayer}
                className="px-4 py-2 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
                Add Player
            </button>

            <Dialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleDeletePlayer}
                message="Are you sure you want to delete this player?"
            />
        </>

    );
};

export default PlayerList;