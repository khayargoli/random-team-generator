
export const generateTeams = (players, teams) => {
    // Sort players by skill level in descending order
    const sortedPlayers = [...players].sort((a, b) => b.skill - a.skill);

    // Initialize teams with empty players arrays and zero skill
    const teamData = teams.map(team => ({
        ...team,
        players: [],
        totalSkill: 0
    }));
    
    for (let i = 0; i < sortedPlayers.length; i++) {
        const player = sortedPlayers[i];

        // Find team with lowest total skill
        let lowestSkillTeam = teamData[0];
        let lowestSkill = teamData[0].totalSkill;

        for (let j = 1; j < teamData.length; j++) {
            if (teamData[j].totalSkill < lowestSkill) {
                lowestSkill = teamData[j].totalSkill;
                lowestSkillTeam = teamData[j];
            }
        }

        // Add player to that team
        lowestSkillTeam.players.push(player);
        lowestSkillTeam.totalSkill += player.skill;
    }

    return teamData;
};