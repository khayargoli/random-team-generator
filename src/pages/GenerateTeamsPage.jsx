import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../communicator/apiClient";
import BalancedTeamList from "../components/BalanncedTeamList";

const GenerateTeamsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = location.state || {};
  const [teams, setTeams] = useState([]);

  const [publicLink, setPublicLink] = useState("");
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [participantCount, setParticipantCount] = useState(0);

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
      }
    };

    if (title) {
      fetchGeneratedTeams();
    }
  }, [title, navigate]);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicLink).then(() => {
      setIsLinkCopied(true)
    });
  };


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
          <button
            onClick={copyToClipboard}
            className="ml-2 px-2 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {isLinkCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <BalancedTeamList title={title} participantCount={participantCount} teams={teams} />
    </div>
  );
};

export default GenerateTeamsPage;