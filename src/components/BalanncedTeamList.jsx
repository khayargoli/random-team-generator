import React from 'react';

const BalancedTeamList = ({ title, participantCount, teams }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">{title}</h1>
            <h1 className="text-lg font-bold mb-6">Participants: {participantCount} Teams: {teams.length}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white border border-gray-200 rounded-md shadow-sm flex flex-col" // Added flex-col
                    >
                        <h2 className="text-lg font-semibold mb-2">{team.name}</h2>

                        <div className="flex flex-col space-y-2 flex-grow"> {/* Added flex-grow */}
                            {team.players.map((player, playerIndex) => (
                                <div
                                    key={playerIndex}
                                    className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md"
                                >
                                    <span className="text-sm text-gray-700">{player.name}</span>
                                    <span className="text-sm text-white bg-green-500 px-2 py-1 min-w-3">{player.skill}</span>
                                </div>
                            ))}
                        </div>

                        <div className="text-sm mt-4 flex justify-between items-center p-[10px]">
                            <div>Total Skill:</div>
                            <div className="text-sm text-white bg-green-500 px-2 py-1 min-w-3">{team.totalSkill}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BalancedTeamList;