import React, { useEffect, useState, useRef } from "react";
import { apiClient } from '../communicator/apiClient';
import TeamItem from "./TeamItem";
import Dialog from "./Dialog";
import Button from "./ui/Button";

const TeamList = () => {
    // State to store the list of teams
    const [teams, setTeams] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState(null);
    const inputRef = useRef(null);

    // Fetch teams
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await apiClient.get(`/api/teams`);
                setTeams(data);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        fetchTeams();
    }, []);


    const handleAddTeam = async () => {
        try {
            const newTeam = { name: "New Team", skill: 1 };
            const data = await apiClient.post(`/api/teams`, newTeam);

            setTeams([...teams, data]);
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 10);
        } catch (error) {
            console.error("Error adding team:", error);
        }
    };

    const handleUpdateName = async (id, newName) => {
        try {
            const updatedTeam = { name: newName };
            const data = await apiClient.put(`/api/teams/${id}`, updatedTeam);

            // Update the team in the list
            setTeams(
                teams.map((team) =>
                    team._id === id ? { ...team, name: data.name } : team
                )
            );
        } catch (error) {
            console.error("Error updating team name:", error);
        }
    };



    const confirmDeleteTeam = (id) => {
        setTeamToDelete(id);
        setIsDialogOpen(true);
    };

    const handleDeleteTeam = async () => {
        try {
            if (teamToDelete) {
                await apiClient.delete(`/api/teams/${teamToDelete}`);
                setTeams(teams.filter((team) => team._id !== teamToDelete));
            }
        } catch (error) {
            console.error("Error deleting team:", error);
        } finally {
            setIsDialogOpen(false);
            setTeamToDelete(null);
        }
    };


    return (
        <>
            <div className="space-y-2">
                {teams.map((team) => (
                    <TeamItem
                        key={team._id}
                        team={team}
                        onUpdateName={handleUpdateName}
                        onDelete={() => confirmDeleteTeam(team._id)}
                        ref={inputRef}
                    />
                ))}
            </div>

            <Button onClick={handleAddTeam}
                className="px-4 py-2 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600">
                Add Team
            </Button>

            <Dialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleDeleteTeam}
                message="Are you sure you want to delete this team?"
            />
        </>
    );
};

export default TeamList;