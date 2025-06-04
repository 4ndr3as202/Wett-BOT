// Simple value bet detection bot
// Provides a function to evaluate matches and identify value bets

function isValueBet(probability, odds) {
  const expected = probability * odds;
  return { isValue: expected > 1, expectedReturn: expected };
}

function findValueBets(matches) {
  return matches.map(match => {
    const outcomes = [];
    if (match.oddsTeam1 && match.probTeam1 !== undefined) {
      const res = isValueBet(match.probTeam1, match.oddsTeam1);
      outcomes.push({ outcome: `${match.team1} win`, ...res });
    }
    if (match.oddsDraw && match.probDraw !== undefined) {
      const res = isValueBet(match.probDraw, match.oddsDraw);
      outcomes.push({ outcome: 'draw', ...res });
    }
    if (match.oddsTeam2 && match.probTeam2 !== undefined) {
      const res = isValueBet(match.probTeam2, match.oddsTeam2);
      outcomes.push({ outcome: `${match.team2} win`, ...res });
    }
    return { match: `${match.team1} vs ${match.team2}`, outcomes };
  });
}

// Example usage with sample data
const sampleMatches = [
  {
    team1: 'Team A',
    team2: 'Team B',
    probTeam1: 0.45,
    probDraw: 0.25,
    probTeam2: 0.30,
    oddsTeam1: 2.8,
    oddsDraw: 3.2,
    oddsTeam2: 2.6,
  },
];

const valueBets = findValueBets(sampleMatches);
console.log('Value bet analysis:');
valueBets.forEach(match => {
  console.log(`\n${match.match}`);
  match.outcomes.forEach(o => {
    const status = o.isValue ? 'VALUE BET' : 'no value';
    console.log(`${o.outcome}: ${status} (expected return: ${o.expectedReturn.toFixed(2)})`);
  });
});

module.exports = { isValueBet, findValueBets };
