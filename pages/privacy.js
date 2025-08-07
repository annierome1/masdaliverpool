import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/components/privacy.module.css";

export default function Privacy() {
  const lastUpdated = "August 7, 2025";

  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta
          name="description"
          content="Privacy policy describing how we use Google Analytics and cookies."
        />
      </Head>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: {lastUpdated}</p>

        <p>
          We respect your privacy. This website uses <strong>Google Analytics</strong> to
          understand how visitors use the site so we can improve content and usability. We do not
          sell or rent your personal information.
        </p>

        <h2 id="what-we-collect">Information We Collect</h2>
        <p>
          Through Google Analytics, we may collect anonymized usage data such as pages visited,
          time on page, approximate location (city/country), device and browser information, and
          referring sites. We do not use Google Analytics to collect names, emails, or other
          directly identifying information.
        </p>

        <h2 id="how-we-use-it">How We Use This Information</h2>
        <ul>
          <li>Measure site traffic and performance</li>
          <li>Identify popular pages and improve navigation</li>
          <li>Fix bugs and enhance overall user experience</li>
        </ul>

        <h2 id="cookies">Cookies</h2>
        <p>
          Google Analytics sets cookies to recognize returning visitors and understand aggregate
          behavior on the site. You can manage or disable cookies in your browser settings.
        </p>

        <h2 id="opt-out">Your Choices (Opt‑Out)</h2>
        <ul>
          <li>
            Install the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noreferrer"
            >
              Google Analytics Opt‑out Browser Add‑on
            </a>
            .
          </li>
          <li>Block or delete cookies via your browser settings.</li>
          <li>
            Use the consent banner at the bottom of our site to accept analytics. If you’ve already
            accepted and want to clear your choice, click{" "}
            <button
              onClick={() => {
                try {
                  localStorage.removeItem("privacyConsent");
                  alert("Consent cleared. Reload the page to see the banner again.");
                } catch {}
              }}
            >
              here
            </button>
            .
          </li>
        </ul>

        <h2 id="data-sharing">Data Sharing</h2>
        <p>
          We do not sell your data. Google may process analytics data on our behalf as a service
          provider. For details on how Google handles data, see{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noreferrer"
          >
            Google’s “How Google uses information from sites or apps that use our services”
          </a>
          .
        </p>

        <h2 id="data-retention">Data Retention</h2>
        <p>
          We use Google Analytics’ standard retention settings to store aggregated, non‑identifying
          reports. Aggregated analytics cannot reasonably be used to identify you.
        </p>

        <h2 id="children">Children’s Privacy</h2>
        <p>
          This site is not directed to children under 13, and we do not knowingly collect personal
          information from children.
        </p>

        <h2 id="changes">Changes to This Policy</h2>
        <p>
          We may update this policy as our site evolves or to reflect changes to legal or
          technical requirements. We’ll update the “Last updated” date at the top of this page.
        </p>

        <h2 id="contact">Contact</h2>
        <p>
          Questions about this policy?{" "}
          <Link href="/contact">Contact us</Link>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}