import './Leaderboard.css';
import Container from '../../Container.tsx';
import SectionHeader from '../../SectionHeader.tsx';
import Button from '../../Button.tsx';

const ROWS = [
  { rank: 1, who: 'm.cho',    solved: 218, streak: 47, xp: 14820, top: true  },
  { rank: 2, who: 'devereux', solved: 211, streak: 32, xp: 14210             },
  { rank: 3, who: 'priya.k',  solved: 209, streak: 41, xp: 13960             },
  { rank: 4, who: 'fern_io',  solved: 204, streak: 18, xp: 13420             },
  { rank: 5, who: 'you',      solved: 138, streak:  6, xp:  9120, you: true  },
];

function LeaderboardCard() {
  return (
    <div className="lb-card">
      <div className="lb-card__header">
        <span className="lb-card__period">This week · global</span>
        <span className="lb-card__live">● live</span>
      </div>
      {ROWS.map(r => (
        <div key={r.who} className="lb-card__row" data-you={r.you ? '' : undefined}>
          <span className="lb-card__rank" data-top={r.top ? '' : undefined}>
            {String(r.rank).padStart(2, '0')}
          </span>
          <span className="lb-card__handle" data-you={r.you ? '' : undefined}>
            @{r.who}
            {r.you && <span className="lb-card__you-tag">(you)</span>}
          </span>
          <span className="lb-card__solved">{r.solved} solved</span>
          <span className="lb-card__streak">{r.streak}d streak</span>
          <span className="lb-card__xp">{r.xp.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export default function Leaderboard() {
  return (
    <section className="lb-section">
      <Container>
        <div className="lb-section__grid">
          <div className="lb-section__left">
            <SectionHeader
              eyebrow="Leaderboard"
              title="Climb against 18,400 React devs."
              sub="Daily, weekly and all-time boards. Streaks count. So does elegant code — peer-rated solutions earn a multiplier."
            />
            <div className="lb-section__btns">
              <Button>See your rank →</Button>
              <Button variant="ghost">How scoring works</Button>
            </div>
          </div>
          <LeaderboardCard />
        </div>
      </Container>
    </section>
  );
}
