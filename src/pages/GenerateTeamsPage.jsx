import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../communicator/apiClient";
import BalancedTeamList from "../components/BalanncedTeamList";
import Button from "../components/ui/Button";

const GenerateTeamsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = location.state || {};
  const [teams, setTeams] = useState([]);
  const [publicLink, setPublicLink] = useState("");
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [participantCount, setParticipantCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeneratedTeams = async () => {
      try {
        const payload = { title: title };
        const data = await apiClient.post("/api/teams/generate", payload);
        setTeams(data.teams);
        const count = data.teams.reduce(
          (total, team) => total + team.players.length,
          0
        );
        setParticipantCount(count);
        const domain = window.location.origin;
        setPublicLink(`${domain}/team/${data.id}`);
      } catch (error) {
        console.error("Error generating teams:", error);
        alert(error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (title) {
      fetchGeneratedTeams();
    }
  }, [title, navigate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicLink).then(() => {
      setIsLinkCopied(true);
    });
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Generating teams...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {publicLink && (
        <div className="mb-6">
          <p className="text-sm text-gray-600">Shareable link:</p>
          <a
            href={publicLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {publicLink}
          </a>

          <Button
            onClick={copyToClipboard}
            className="ml-2 px-2 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {isLinkCopied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      )}
      <BalancedTeamList
        title={title}
        participantCount={participantCount}
        teams={teams}
      />
    </div>
  );
};

export default GenerateTeamsPage;