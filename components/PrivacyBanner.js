import { useState, useEffect } from "react";
import styles from "../styles/components/privacyBanner.module.css";

export default function PrivacyBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("privacyConsent");
      if (!consent) setShowBanner(true);
    } catch {
      // localStorage unavailable
    }
  }, []);

  useEffect(() => {
    if (showBanner) {
      document.documentElement.style.setProperty("--banner-space", "76px");
    } else {
      document.documentElement.style.removeProperty("--banner-space");
    }
    return () => {
      document.documentElement.style.removeProperty("--banner-space");
    };
  }, [showBanner]);

  const handleAccept = () => {
    try {
      localStorage.setItem("privacyConsent", "accepted");
    } catch {}

    // Grant analytics consent and fire the initial pageview
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "granted" });
      window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
      });
    }

    setShowBanner(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem("privacyConsent", "rejected");
    } catch {}
    // Consent stays denied — no gtag update needed
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className={styles.banner}
      role="region"
      aria-label="Privacy notice"
    >
      <div className={styles.inner}>
        <p className={styles.content}>
          We use Google Analytics to improve your experience. Read our{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
        </p>

        <div className={styles.actions}>
          <button className={styles.buttonSecondary} onClick={handleReject}>
            Reject
          </button>
          <button className={styles.button} onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
