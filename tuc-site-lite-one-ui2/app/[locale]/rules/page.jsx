
export default function Page({ params }) {
  const { locale } = params;

  const copy = {
    nl: {
      title: "Toernooiopzet & Regels",
      intro: "Basis: FIBA-regels, met compact TUC-kader.",
      sections: [
        {
          h: "Format",
          items: [
            "8 teams → 2 poules (A & B), iedereen speelt tegen elkaar.",
            "Nr. 1 naar halve finale; nr. 2–3 spelen kruislings play-ins; nr. 4 ligt eruit.",
            "Daarna troostfinale en finale."
          ]
        },
        {
          h: "Speeltijd & klok",
          items: [
            "2 × 10 minuten doorlopende tijd.",
            "Uitzonderingen:",
            "• Laatste 2 min van elke helft: klok stopt bij dode bal (out, fout, time-out).",
            "• Laatste 2 min van 2e helft: klok stopt óók na gemaakte scores.",
            "5–10 min warming-up; 45 min per wedstrijdslot incl. wissel/omloop."
          ]
        },
        {
          h: "Start & balbezit",
          items: [
            "Sprongbal bij start. Het verliezende team start met bal in de 2e helft.",
            "Elke held ball is een sprongbal (NBA-regel).",
            "Er is geen possession-pijl."
          ]
        },
        {
          h: "Time-outs",
          items: [ "1 per team per helft (niet overdraagbaar).", "In overtime: 1 extra per team." ]
        },
        {
          h: "Wissels",
          items: [ "Alleen bij dode bal; eerst melden bij de jurytafel." ]
        },
        {
          h: "Scoren",
          items: [ "Binnen de arc = 2 punten; buiten de arc = 3 punten; vrije worp = 1 punt." ]
        },
        {
          h: "Fouten",
          items: [
            "5 persoonlijke fouten = speler uitgesloten.",
            "Teamfouten: vanaf de 5e per helft → 2 vrije worpen.",
            "Technisch: 1 FT + bal. Onsportief: 2 FT + bal. Diskwalificerend: uitsluiting."
          ]
        },
        {
          h: "Vrije worpen",
          items: [
            "Schotfout op 2-punter → 2 FT; op 3-punter → 3 FT;",
            "Score + fout → and-1 (extra FT)."
          ]
        },
        {
          h: "Schotklok",
          items: [
            "Met schotklok: 24 s; over de middenlijn in 8 s.",
            "Zonder schotklok: scheidsrechters handhaven tempo (aanmaning → balverlies bij vertraging)."
          ]
        },
        {
          h: "Overtime",
          items: [
            "Gelijkspel → 2 min OT (klok stopt in laatste minuut).",
            "Teamfouten lopen door; 1 time-out per team."
          ]
        },
        {
          h: "Tiebreakers poule",
          items: [
            "Als meerdere teams hetzelfde aantal W's hebben, wordt de eindstand van de poule bepaald op:",
            "1) Onderling resultaat",
            "2) Puntenverschil",
            "3) Gescoorde punten"
          ]
        }
      ]
    },

    en: {
      title: "Format & Rules",
      intro: "Base: FIBA rules, with a compact TUC framing.",
      sections: [
        {
          h: "Format",
          items: [
            "8 teams → 2 pools (A & B), round-robin within each pool.",
            "No. 1 advances to the semifinal; No. 2–3 play cross play-ins; No. 4 is eliminated.",
            "Then 3rd-place game and the final."
          ]
        },
        {
          h: "Game time & clock",
          items: [
            "2 × 10 minutes running clock.",
            "Exceptions:",
            "• Last 2 minutes of each half: clock stops on dead balls (out, foul, time-out).",
            "• Last 2 minutes of the 2nd half: clock also stops after made baskets.",
            "5–10 min warm-up; 45-min slots per game incl. changeover."
          ]
        },
        {
          h: "Start & possession",
          items: [
            "Jump ball to start. The losing team starts with the ball in the 2nd half.",
            "Every held ball is a jump ball (NBA rule).",
            "There is no possession arrow."
          ]
        },
        {
          h: "Time-outs",
          items: [ "1 per team per half (not carried over).", "In overtime: 1 extra per team." ]
        },
        {
          h: "Substitutions",
          items: [ "Only on dead balls; report at the scorer's table first." ]
        },
        {
          h: "Scoring",
          items: [ "Inside the arc = 2 pts; beyond the arc = 3 pts; free throw = 1 pt." ]
        },
        {
          h: "Fouls",
          items: [
            "5 personal fouls = player disqualified.",
            "Team fouls: from the 5th in a half → 2 free throws.",
            "Technical: 1 FT + ball. Unsportsmanlike: 2 FT + ball. Disqualifying: ejection."
          ]
        },
        {
          h: "Free throws",
          items: [
            "Shooting foul on a 2-pointer → 2 FT; on a 3-pointer → 3 FT;",
            "Made basket + foul → and-1 (one extra FT)."
          ]
        },
        {
          h: "Shot clock",
          items: [
            "With a shot clock: 24 s; 8 s to advance into frontcourt.",
            "Without a shot clock: officials keep pace (delay → turnover)."
          ]
        },
        {
          h: "Overtime",
          items: [
            "Tie → 2-minute OT (clock stops in the final minute).",
            "Team fouls carry over; 1 time-out per team."
          ]
        },
        {
          h: "Pool tiebreakers",
          items: [
            "If multiple teams have the same number of wins, the final pool standings are determined by:",
            "1) Head-to-head result",
            "2) Point differential",
            "3) Points scored"
          ]
        }
      ]
    }
  };

  const t = locale === "nl" ? copy.nl : copy.en;

  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t.title}</h1>
      <p className="mt-2 text-white/80 dark:text-white/80">{t.intro}</p>

      <div className="mt-8 space-y-8">
        {t.sections.map((sec, idx) => (
          <section key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-xl font-semibold">{sec.h}</h2>
            <ul className="mt-3 space-y-2">
              {sec.items.map((it, i) => (
                <li key={i} className="text-black/80 dark:text-white/80">{it}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
