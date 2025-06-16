const fs = require('fs');
const teamData = require('../public/data/team.json');

const lines = teamData.map(member =>
  JSON.stringify({
    _type: 'fighterStats',
    name: member.name,
    totalFights: member.totalFights,
    record: member.record,
    accomplishments: member.accomplishments,
  })
);

fs.writeFileSync('fighterStats.ndjson', lines.join('\n'));
console.log('fighterStats.ndjson generated!');
