import React, { useEffect, useState } from "react";

const apiKey =
    "patZqW6kq6eJpR1rr.af975adfba875ba01c385ff086a6712767221ea337eac18af43624d004685335";
const baseId = "appnTJyNgaBLsKObm";
const tableName = "Contributors";

export default function Contributors() {
    const [contributors, setContributors] = useState([]);
    const [photoUrls, setPhotoUrls] = useState([]);

    useEffect(() => {
        fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setContributors(data.records);
            })
            .catch(error => console.error(error));

    }, []);
    console.log("contributors", contributors);

    return (
        <div className="contributors-page" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <h1 className="title" style={{
               "--pad": "16px",
               "--block": "45px",
               "--inline": "22px",
               display: "grid",
               gridTemplateColumns: "repeat(3, auto)",
               gap: "calc(2 * var(--pad))",
               overflowX: "auto",
               marginBlock: "var(--block)",
               paddingInline: "var(--pad)"
            }}>Past Contributors</h1>
            <ul className="contributors" style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              listStyle: "none",
              padding: "0",
              margin: "0"
            }}>
              {contributors.map(contributor => (
                <div key={contributor.id} style={{flexBasis: "25%"}}>
                  <li className="card" style={{
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "10px",
                    padding: "20px 10px",
                    backgroundColor: "#DFEEF5",
                    boxShadow: "2px 2px 4px gray",
                    fontFamily: 'Didact Gothic, sans-serif',
                    letterSpacing: "1.6px",
                    lineHeight: "200%",
                    "--radius": "24px",
                    position: "relative",
                    isolation: "isolate",
                    display: "grid",
                    placeItems: "center",
                    paddingBlock: "var(--block)",
                    paddingInline: "var(--inline)",
                    borderRadius: "var(--radius)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    color: "black",
                    width: "350px",
                    height: "300px"
                  }}>
                    {contributor.fields.profilepic[0].url ?
                    (<div>
                        <img className="card-img" style={{
                        top: "10px",
                        left: "10px",
                        width: "100px",
                        height: "100px",
                        backgroundImage: `url(${contributor.fields.profilepic[0].url})`,
                        backgroundSize: "cover",
                        borderRadius: "50%"
                        }}/>
                    </div>) : (
                            <h3 style={{fontSize: "40px"}}>
                                <span className="emoji" style={{fontSize: "48px", marginRight: "10px"}}>{contributor.fields.emoji}</span>
                            </h3>
                    )}
                     <h3 style={{fontSize: "40px"}}>
                     <span style={{fontSize: "24px"}}>{contributor.fields.Name}</span>
                     </h3>
                    <p className="contribution" style={{margin: "5px 0"}}>
                      contribution: <span style={{fontWeight: "bold"}}>{contributor.fields["Contribution Type"]}</span>
                    </p>
                    <p className="socials" style={{margin: "5px 0"}}>
                      <img className="github-icon" src="../../public/images/github-mark.png" alt="github" style={{width: "20px", height: "20px", marginRight: "5px"}}/>
                      <span style={{fontWeight: "bold"}}>{contributor.fields["GitHub/Social"]}</span>
                    </p>
                    <p className="favouriteSeaAnimal" style={{margin: "5px 0"}}>
                      favorite sea animal: <span style={{fontWeight: "bold"}}>{contributor.fields["Favorite Sea Animal"]}</span>
                    </p>
                  </li>
                </div>
              ))}
            </ul>
        </div>
    );
}
