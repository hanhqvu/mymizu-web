import React, { useEffect, useState } from "react";

const apiKey =
  "patZqW6kq6eJpR1rr.af975adfba875ba01c385ff086a6712767221ea337eac18af43624d004685335";
const baseId = "appnTJyNgaBLsKObm";
const tableName = "Contributors";

export default function Contributors() {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setContributors(data.records);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="contributors-page">
      <h1 className="title"> Past Contributors </h1>
      <ul className="contributors">
        {contributors.map((contributor) => (
          <li
            key={contributor.id}
            className="card"
            style={{
              display: "flex",
              letterSpacing: "1.6px",
              lineHeight: "200%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",

              width: "300px",
              boxSizing: "content-box",
              margin: "10px",
              padding: "20px 10px",
              backgroundColor: "#DFEEF5",
              /*    color: white;*/
              boxShadow: "2px 2px 4px gray",
            }}
          >
            <h3 style={{ fontSize: "40px" }} aria-label="contributor-name">
              <span className="emoji" data-testid="contributor-emoji">
                {contributor.fields.emoji}
              </span>{" "}
              {contributor.fields.Name}{" "}
            </h3>
            <p className="contribution" data-testid="contributor-type">
              contribution : {contributor.fields["Contribution Type"]}
            </p>
            <p className="socials" data-testid="contributor-socials">
              <img
                style={{ width: "20px", height: "20px" }}
                src="../../public/images/github-mark.png"
                alt="github"
              />{" "}
              : {contributor.fields["GitHub/Social"]}
            </p>
            <p
              className="favouriteSeaAnimal"
              data-testid="contributor-favorite-sea-animal"
            >
              favourite sea animal : {contributor.fields["Favorite Sea Animal"]}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
