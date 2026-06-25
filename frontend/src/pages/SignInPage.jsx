import { ArrowLeft } from "lucide-react";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage({ isMockMode, setView, loadData }) {
  return (
    <div className="ss-landing ss-signin-page landing-page-container">
      {/* ============ NAVBAR ============ */}
      <header className="ss-navbar">
        <div className="ss-nav-inner">
          <div
            className="ss-nav-brand"
            onClick={() => setView("landing")}
            style={{ cursor: "pointer" }}
          >
            <div className="ss-logo">
              <img
                src="/logo_symbol.png"
                alt="StudyStack"
                className="ss-logo-img"
              />
            </div>
            <span className="ss-logo-text">StudyStack</span>
          </div>
          <div className="ss-nav-actions">
            <button className="ss-btn-ghost" onClick={() => setView("landing")}>
              <ArrowLeft size={14} style={{ marginRight: 6 }} />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* ============ SIGN IN CONTENT ============ */}
      <div className="ss-signin-wrapper">
        <section className="ss-auth-copy">
          <div className="ss-auth-badge">Secure student vault</div>
          <h1>Welcome back</h1>
          <p>
            Sign in to keep your study links, notes, and playlists organized in
            one clean workspace.
          </p>

          <div className="ss-auth-points">
            <div className="ss-auth-point">
              <span className="ss-auth-point-icon">1</span>
              <div>
                <strong>Fast access</strong>
                <p>Jump straight into your dashboard and recent resources.</p>
              </div>
            </div>
            <div className="ss-auth-point">
              <span className="ss-auth-point-icon">2</span>
              <div>
                <strong>Secure auth</strong>
                <p>
                  Clerk keeps your account protected with a modern sign-in flow.
                </p>
              </div>
            </div>
            <div className="ss-auth-point">
              <span className="ss-auth-point-icon">3</span>
              <div>
                <strong>Clean experience</strong>
                <p>Designed to match the polished StudyStack landing page.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="ss-signin-card">
          <div className="signin-header">
            <h2>Sign in to StudyStack</h2>
            <p>Welcome back! Please sign in to continue</p>
          </div>

          <div className="signin-form-area">
            {isMockMode ? (
              <div className="ss-mock-auth">
                <div className="ss-mock-badge">Developer Preview Mode</div>
                <p>
                  Running locally without Clerk API keys. Enter the workspace
                  directly using a mock student profile.
                </p>
                <button
                  className="ss-btn-primary-lg ss-auth-action"
                  onClick={() => {
                    loadData();
                    setView("dashboard");
                  }}
                >
                  Enter Workspace
                </button>
              </div>
            ) : (
              <SignIn
                forceRedirectUrl="/?login=success"
                signUpForceRedirectUrl="/?login=success"
                appearance={{
                  elements: {
                    rootBox: { width: "100%" },
                    cardBox: {
                      width: "100%",
                      maxWidth: "100%",
                    },
                    card: {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      border: "none",
                      padding: "0",
                      margin: "0 auto",
                      width: "100%",
                    },
                    main: { width: "100%" },
                    headerTitle: {
                      color: "#0f172a",
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "1.4rem",
                      fontWeight: "800",
                    },
                    headerSubtitle: { color: "#64748b", fontSize: "0.9rem" },
                    socialButtonsBlockButton: {
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      color: "#0f172a",
                      borderRadius: "12px",
                      minHeight: "46px",
                      boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
                    },
                    socialButtonsBlockButtonText: {
                      fontWeight: "600",
                      color: "#334155",
                    },
                    socialButtonsBlockButtonArrow: { color: "#94a3b8" },
                    formFieldInput: {
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      color: "#0f172a",
                      borderRadius: "12px",
                      minHeight: "46px",
                      boxShadow: "none",
                    },
                    formButtonPrimary: {
                      background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                      boxShadow: "0 4px 14px rgba(124, 58, 237, 0.3)",
                      borderRadius: "12px",
                      minHeight: "46px",
                      fontWeight: "700",
                    },
                    formFieldLabel: { color: "#334155", fontWeight: "600" },
                    formFieldHintText: { color: "#64748b" },
                    footerAction: { backgroundColor: "transparent" },
                    footerActionLink: { color: "#7c3aed" },
                    footer: { backgroundColor: "transparent" },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
