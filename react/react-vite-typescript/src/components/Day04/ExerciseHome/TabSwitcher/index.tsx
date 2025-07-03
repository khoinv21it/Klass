import React, { useState } from "react";
import styles from "./TabSwitcher.module.css";

const TABS = ["HISTORY", "APPROACH", "CULTURE", "METHOD"];

const CONTENT = {
  HISTORY: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
  APPROACH: "Contenido de tabNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
  CULTURE: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est.",
  METHOD: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae."
};

type TabStyle = "block" | "underline";

interface TabSwitcherProps {
  type?: TabStyle;
}

export default function TabSwitcher({ type = "block" }: TabSwitcherProps) {
  const [active, setActive] = useState("HISTORY");

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.tab_container} ${styles[type]}`}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab_button} ${active === tab ? styles.active : ""}`}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.tab_content}>
        <p>{CONTENT[active as keyof typeof CONTENT]}</p>
      </div>
    </div>
  );
}
