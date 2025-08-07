// components/PrivacyBanner.js
import { useState, useEffect } from "react";
import styles from "../styles/components/privacyBanner.module.css";

export default function PrivacyBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("privacyConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("privacyConsent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className={styles.banner}>
      <p>
        We use Google Analytics to improve your experience. By continuing to use
        this site, you agree to our{" "}
        <a href="/privacy" target="_blank">
          Privacy Policy
        </a>
        .
      </p>
      <button onClick={handleAccept}>Accept</button>
    </div>
  );
}
