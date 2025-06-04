function generiereTipp(spiel) {
  const { team1, team2, score, time } = spiel;

  let tendenz = 'Unentschieden wahrscheinlich';
  let empfehlung = '→ Kein Tipp';

  if (score) {
    const tore = score.split(':').map(Number);
    if (tore[0] > tore[1]) {
      tendenz = `Sieg für ${team1}`;
      empfehlung = `Tipp: ${team1} gewinnt`;
    } else if (tore[0] < tore[1]) {
      tendenz = `Sieg für ${team2}`;
      empfehlung = `Tipp: ${team2} gewinnt`;
    }
  } else if (time) {
    tendenz = `Spiel startet um ${time}`;
    empfehlung = `Tipp nicht möglich (noch nicht gespielt)`;
  }

  return {
    match: `${team1} vs ${team2}`,
    tendenz,
    empfehlung,
  };
}

module.exports = { generiereTipp };
