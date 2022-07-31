import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { get } from "../components/utils";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [names, setNames] = useState([]);
  useEffect(() => {
    const getInfo = async () => {
      let res;
      try {
        res = await get("getInfo");
      } catch (e) {
        res = [];
      }
      setNames(res);
    };

    getInfo();

    return () => {};
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Airtable Webhooks</title>
        <meta name="description" content="Airtable Webhooks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Airtable Webhooks</h1>
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/shrrBoiTlPxQX6Pw3?backgroundColor=cyan"
          frameBorder="0"
          width="50%"
          height="533"
          style={{
            background: "transparent",
            border: "1px solid #ccc",
            marginTop: "15px",
          }}
        ></iframe>
        <hr style={{ width: "50%", backgroundColor: "white" }} />

        <div>
          {names.length ? <h2>Entered Names:</h2> : null}
          <table
            style={{
              border: "2px solid white",
              borderCollapse: "collapse",
              minWidth: "50vw",
            }}
          >
            {names.map((name) => {
              if (!name) return;
              console.log(name);

              return (
                <tr>
                  <td style={{ border: "thin solid white", padding: 5 }}>
                    {name?.Name}
                  </td>
                  <td style={{ border: "thin solid white", padding: 5 }}>
                    {name?.First}
                  </td>
                  <td style={{ border: "thin solid white", padding: 5 }}>
                    {name?.Last}
                  </td>
                  <td
                    style={{
                      border: "thin solid white",
                      padding: 5,
                      textAlign: "right",
                    }}
                  >
                    {new Date(name?.createdAt).toDateString()}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

// export async function getStaticProps(context) {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch(`http://localhost:3000/api/getInfo`);
//   const names = await res.json();
//   return {
//     props: { names }, // will be passed to the page component as props
//   };
// }
