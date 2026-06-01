import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";

export default function LoadingProjectDetails() {
  return (
    <>
      <Navigation />
      <main className="detail">
        <div className="container">
          <div id="detail">
            <div className="back">
              <span className="pd-skeleton" style={{ width: 110, height: 16 }} />
            </div>

            <div className="pd-layout">
              <aside className="pd-left">
                <div className="pd-skeleton" style={{ width: 120, height: 14, marginBottom: 16 }} />
                <div className="pd-skeleton" style={{ width: "70%", height: 52, marginBottom: 22 }} />
                <div className="pd-skeleton" style={{ width: "100%", height: 16, marginBottom: 10 }} />
                <div className="pd-skeleton" style={{ width: "82%", height: 16, marginBottom: 24 }} />
                <div className="pd-skeleton" style={{ width: "55%", height: 16, marginBottom: 14 }} />
                <div className="pd-skeleton" style={{ width: 180, height: 44, borderRadius: 999 }} />
              </aside>

              <section className="pd-center">
                <div className="pd-shot">
                  <div className="pd-skeleton" style={{ width: "100%", aspectRatio: "4 / 3" }} />
                </div>
                <div className="pd-shot">
                  <div className="pd-skeleton" style={{ width: "100%", aspectRatio: "4 / 3" }} />
                </div>
              </section>

              <aside className="pd-right">
                <div className="pd-stats">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <span
                      className="pd-skeleton"
                      key={index}
                      style={{ width: 110, height: 28, borderRadius: 8 }}
                    />
                  ))}
                </div>
                <div className="pd-socials">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <span
                      className="pd-skeleton"
                      key={index}
                      style={{ width: 38, height: 38, borderRadius: "50%" }}
                    />
                  ))}
                </div>
                <div className="pd-meta-card">
                  <div className="pd-skeleton" style={{ width: 64, height: 13 }} />
                  <div className="pd-skeleton" style={{ width: "80%", height: 13 }} />
                  <div className="pd-skeleton" style={{ width: "55%", height: 13 }} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
