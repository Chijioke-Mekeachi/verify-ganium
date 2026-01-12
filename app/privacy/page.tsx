import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Privacy Policy</h1>
      <p style={styles.updated}>Last updated: January 2026</p>

      <section style={styles.section}>
        <p>
          Ganium AI ("Ganium", "we", "our", or "us") values your privacy.
          This Privacy Policy explains how information is handled when you use
          the Ganium AI mobile application and related services (the "Service").
        </p>
      </section>

      <section style={styles.section}>
        <h2>1. Information We Collect</h2>
        <p>
          Ganium is designed with a <strong>privacy-first architecture</strong>.
        </p>

        <h3>User-Provided Content</h3>
        <p>
          When using the scanner features, you may paste:
        </p>
        <ul>
          <li>Text messages</li>
          <li>Links (URLs)</li>
          <li>Cryptocurrency wallet addresses</li>
          <li>QR codes for wallet scanning</li>
        </ul>
        <p>
          This content is processed for scam and fraud detection
          and is <strong> stored</strong> by Ganium.
        </p>

        <h3>Automatically Collected Information</h3>
        <p>
          We may collect limited technical information such as:
        </p>
        <ul>
          <li>Email, Crash logs and performance data</li>
        </ul>
        <p>
          This data does not identify you personally.
        </p>
      </section>

      <section style={styles.section}>
        <h2>2. How We Use Information</h2>
        <p>Information is used solely to:</p>
        <ul>
          <li>Analyze messages, links, and wallet addresses for scams</li>
          <li>Provide real-time scan results and confidence scores</li>
          <li>Improve detection accuracy and app stability</li>
        </ul>
        <p>
          We do <strong>not</strong> sell data, track users across apps,
          or create personal profiles.
        </p>
      </section>

      <section style={styles.section}>
        <h2>3. AI Processing</h2>
        <p>
          Ganium uses AI-based pattern recognition and threat analysis to detect
          phishing, scams, fraudulent links, and malicious wallet addresses.
        </p>
        <p>
          Scanning occurs locally on the device or through secure, ephemeral
          processing. Data is discarded immediately after analysis.
        </p>
      </section>

      <section style={styles.section}>
        <h2>4. Data Storage & Retention</h2>
        <ul>
          <li>scan content is stored</li>
          <li>scan history is retained</li>
          <li>personal accounts are created</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>5. Data Sharing</h2>
        <p>
          Ganium does not share scanned content or personal data with third
          parties. Anonymous analytics may be used solely to maintain and
          improve the Service.
        </p>
      </section>

      <section style={styles.section}>
        <h2>6. Children’s Privacy</h2>
        <p>
          Ganium is not directed to children under the age of 13. We do not
          knowingly collect personal information from children.
        </p>
        <p>
          If you believe a child has provided data through the Service,
          please contact us.
        </p>
      </section>

      <section style={styles.section}>
        <h2>7. Security</h2>
        <p>
          We use industry-standard security measures including encrypted
          communication and restricted system access.
        </p>
      </section>

      <section style={styles.section}>
        <h2>8. Your Choices</h2>
        <ul>
          <li>Use the app without creating an account</li>
          <li>Uninstall the app at any time</li>
          <li>Avoid scanning sensitive content if desired</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>9. Changes to This Policy</h2>
        <p>
          This Privacy Policy may be updated periodically. Changes will be
          posted on this page with a revised date.
        </p>
      </section>

      <section style={styles.section}>
        <h2>10. Contact Us</h2>
        <p>
          Email: <a href="mailto:ganium.team@gmail.com">ganium.team@gmail.com</a>
        </p>
        <p>
          Website: <a href="https://verify-ganium.vercel.app">Our Website</a>
        </p>
      </section>
    </main>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    lineHeight: 1.6,
    color: "#111",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  },
  updated: {
    color: "#555",
    marginBottom: "2rem",
  },
  section: {
    marginBottom: "2rem",
  },
};

export default PrivacyPolicy;
