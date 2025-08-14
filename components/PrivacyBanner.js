import { useState, useEffect } from "react";
import styles from "../styles/components/privacyBanner.module.css";

export default function PrivacyBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Only run on client
    try {
      const consent = localStorage.getItem("privacyConsent");
      if (!consent) setShowBanner(true);
    } catch {
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
      localStorage.setItem("privacyConsent", "true");
    } catch {}
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
          We use Google Analytics to improve your experience. By continuing to
          use this site, you agree to our{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
        </p>

        <div className={styles.actions}>
          <button className={styles.button} onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
