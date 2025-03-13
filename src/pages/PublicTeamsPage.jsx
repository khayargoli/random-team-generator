import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../communicator/apiClient";
import BalancedTeamList from "../components/BalanncedTeamList";

const PublicTeamsPage = () => {
    const { id } = useParams();
    const [teams, setTeams] = useState([]);
    const [title, setTitle] = useState("");
    const [participantCount, setParticipantCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTeamDistribution = async () => {
            try {
                const data = await apiClient.get(`/api/teams/generated-teams/${id}`);

                if (data) {
                    setTeams(data.teams);
                    setTitle(data.title);

                    const count = data.teams.reduce(
                        (total, team) => total + team.players.length,
                        0
                    );
                    setParticipantCount(count);
                } else {
                    setError("Team distribution not found");
                }
            } catch (error) {
                setError("Error fetching team distribution");
            } finally {
                setLoading(false);
            }
        };

        fetchTeamDistribution();
    }, [id]);

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-600">{error}</div>;
    }


    return (
        <div className="p-6">
            <BalancedTeamList title={title} participantCount={participantCount} teams={teams} />
        </div>
    );
};

export default PublicTeamsPage;