"use client";

import { useEffect, useRef, useState } from "react";

export default function OrderPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
    model: "",
  });

  const [status, setStatus] = useState({ type: "idle", message: "" });
  const iframeRef = useRef(null);


  // 🖼️ Lightbox
  // ⭐ Rating + ⏳ Countdown
  const RATING = { score: 4.9, count: 120 };
  const DISCOUNT_SECONDS = 2 * 60 * 60 + 15 * 60 + 10; // 02:15:10
  const [secondsLeft, setSecondsLeft] = useState(DISCOUNT_SECONDS);

  const [lightbox, setLightbox] = useState({ open: false, item: null });

  const PRODUCT = {
    name: "Олон үйлдэлт ухаалаг массажны матрас",
    price: 35000,
    link: "https://online-zahialga.vercel.app",
    media: [
      // 1) Imgur direct image
      { type: "image", src: "https://i.imgur.com/mCfNsqo.jpeg" },
      // 2) Нэмэлт зураг (placeholder) — өөрийн direct link-ээр солиорой
      {
        type: "image",
        src: "https://i.imgur.com/E5eeP6r.jpeg",
      },
      // 3) Imgur direct image
      { type: "image", src: "https://i.imgur.com/u7XG27d.jpeg" },
      // 4) Нэмэх 4 дэх зураг — өөрийн direct link-ээр солиорой
      {
        type: "image",
        src: "https://i.imgur.com/7hRB36P.jpeg",
      },
      // { type: "video", src: "https://.../product.mp4" },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    setStatus({ type: "loading", message: "Илгээж байна…" });

    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      setStatus({ type: "success", message: "✅ Амжилттай захиалга илгээгдлээ!" });
      setForm({ name: "", phone: "", address: "", quantity: 1, model: "" });
      iframe.removeEventListener("load", onLoad);
    };

    iframe.addEventListener("load", onLoad);
  };

  const openLightbox = (item) => setLightbox({ open: true, item });
  const closeLightbox = () => setLightbox({ open: false, item: null });

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (lightbox.open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox.open]);

  // ⏳ Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const pageWrap = {
    minHeight: "100vh",
    padding: "32px 16px",
    background:
      "radial-gradient(900px 400px at 20% 0%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(800px 380px at 80% 20%, rgba(16,185,129,0.10), transparent 55%), #ffffff",
  };

  const cardStyle = {
    maxWidth: 460,
    margin: "20px auto",
    padding: 16,
    border: "1px solid #eee",
    borderRadius: 18,
    boxShadow: "0 10px 35px rgba(0,0,0,0.06)",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(6px)",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px", // ⬅️ багасгасан
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: 14,
  };

  const labelStyle = { fontSize: 12, marginBottom: 4, color: "#374151" };

  const buttonStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(90deg, #22c55e, #16a34a)",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 16,
    letterSpacing: "0.02em",
    position: "relative",
    overflow: "hidden",
    transition: "transform .2s ease, box-shadow .2s ease, opacity .2s ease",
    animation: "ctaPulse 2s ease-in-out infinite",
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 10px",
    borderRadius: 999,
    background: "#f3f4f6",
    fontSize: 12,
    color: "#374151",
  };

  const statusBoxStyle = (type) => ({
    marginTop: 12,
    padding: "10px 12px",
    borderRadius: 12,
    fontSize: 13,
    border: "1px solid",
    borderColor:
      type === "success" ? "#bbf7d0" : type === "loading" ? "#fde68a" : "#fecaca",
    background:
      type === "success" ? "#f0fdf4" : type === "loading" ? "#fffbeb" : "#fef2f2",
    color:
      type === "success" ? "#166534" : type === "loading" ? "#92400e" : "#991b1b",
  });

// 📐 Нэг багана, цуваа байрлал
const mediaGrid = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  marginBottom: 16,
};
// 🖼️ Зургийн хэмжээг өөрчлөхгүй (natural size)
const mediaTileWrap = {
  width: "100%",
  borderRadius: 14,
  overflow: "hidden",
  border: "1px solid #eef2f7",
  boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
  background: "#f3f4f6",
  cursor: "zoom-in",
};
  const mediaTileImg = {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "contain",
  };

  const mediaTileVideo = {
    width: "100%",
    height: "auto",
    display: "block",
    cursor: "default",
  };

  const lightboxOverlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.72)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    zIndex: 9999,
  };

  const lightboxContent = {
    width: "min(920px, 95vw)",
    borderRadius: 16,
    overflow: "hidden",
    background: "#000",
    border: "1px solid rgba(255,255,255,0.12)",
  };

  const lightboxTop = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    background: "rgba(0,0,0,0.55)",
    color: "#fff",
    fontSize: 13,
  };

  const closeBtn = {
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "#fff",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: 700,
  };
  return (
    <div style={pageWrap}>
      <style>{`
        @keyframes titleIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ctaPulse {
          0% { transform: scale(1); box-shadow: 0 6px 16px rgba(0,0,0,0.15); }
          50% { transform: scale(1.03); box-shadow: 0 10px 26px rgba(0,0,0,0.25); }
          100% { transform: scale(1); box-shadow: 0 6px 16px rgba(0,0,0,0.15); }
        }
        @keyframes ctaShine {
          0% { transform: translateX(-140%) skewX(-20deg); opacity: 0; }
          12% { opacity: 1; }
          28% { transform: translateX(140%) skewX(-20deg); opacity: 0.9; }
          100% { transform: translateX(140%) skewX(-20deg); opacity: 0; }
        }
        .ctaBtn {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .ctaBtn::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: translateX(-140%) skewX(-20deg);
          animation: ctaShine 3s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }
        .ctaBtn > span {
          position: relative;
          z-index: 1;
        }
        .ctaBtn:hover { transform: translateY(-1px) scale(1.01); }
        .ctaBtn:active { transform: translateY(0px) scale(0.99); }
      `}</style>
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 900,
              lineHeight: 1.2,
              textAlign: "center",
              letterSpacing: "-0.02em",
              background: "linear-gradient(90deg, #f97316, #fb7185)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "titleIn 0.8s ease-out forwards",
              opacity: 0,
              transform: "translateY(12px)",
            }}>
              {PRODUCT.name}
            </h1>
            <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ ...badgeStyle, background: "#fee2e2", color: "#991b1b" }}>🔥 Хямдрал</span>
              <span style={{ ...badgeStyle, background: "#ecfeff", color: "#155e75" }}>🎁 Үнэгүй хүргэлт</span>
            </div>
            <div style={{ marginTop: 6, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ ...badgeStyle, background: "#fff7ed", color: "#9a3412" }}>
                ⏳ Хямдрал дуусахад: {String(Math.floor(secondsLeft / 3600)).padStart(2, "0")}:
                {String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0")}:
                {String(secondsLeft % 60).padStart(2, "0")}
              </span>
              
            </div>
          </div>
          <span style={badgeStyle}>🛒 Онлайн захиалга</span>
        </div>

        <p style={{ marginTop: 14, marginBottom: 10, color: "#111827", fontSize: 16, fontWeight: 600 }}>
          Үнэ: <b>{PRODUCT.price.toLocaleString()}₮</b>
        </p>

        {/* 🎯 Гол давуу талууд – Premium */}
        <div style={{
          marginBottom: 18,
          padding: 16,
          borderRadius: 18,
          background: "linear-gradient(180deg, #ffffff, #f8fafc)",
          border: "1px solid #e5e7eb",
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        }}>
          <div style={{
            fontWeight: 900,
            fontSize: 16,
            marginBottom: 12,
            color: "#111827",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            ✨ Яагаад манай матрасыг сонгох вэ?
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ fontSize: 18 }}>🛏️</span>
              <div>
                <div style={{ fontWeight: 700 }}>Бүх биеийн массаж</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>Нуруу, хүзүү, хөлд зэрэг нөлөөлнө</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ fontSize: 18 }}>🔥</span>
              <div>
                <div style={{ fontWeight: 700 }}>Дулаан + чичиргээт горим</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>Булчинг суллаж, цусны эргэлтийг сайжруулна</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ fontSize: 18 }}>🏠</span>
              <div>
                <div style={{ fontWeight: 700 }}>Гэрийн нөхцөлд ашиглана</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>Хэвтэж амрах зуур массаж хийлгэнэ</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ fontSize: 18 }}>⏱️</span>
              <div>
                <div style={{ fontWeight: 700 }}>Өдөрт 15–20 минут</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>Богино хугацаанд үр дүн мэдрэгдэнэ</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ fontSize: 18 }}>🎁</span>
              <div>
                <div style={{ fontWeight: 700 }}>Үнэгүй хүргэлт</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>Аюулгүй, баталгаатай үйлчилгээ</div>
              </div>
            </div>
          </div>

        {/* 🖼️ Барааны зураг / 🎬 вид{/* 🖼️ Барааны зураг / 🎬 видео */}

        <div style={mediaGrid}>
          {PRODUCT.media.map((m, i) => (
            <div key={i}>
              {m.type === "image" ? (
                <div style={mediaTileWrap} onClick={() => openLightbox(m)}>
                  <img
                    src={m.src}
                    alt={`${PRODUCT.name} ${i + 1}`}
                    style={mediaTileImg}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div style={{ ...mediaTileWrap, cursor: "default" }}>
                  <video src={m.src} controls style={mediaTileVideo} />
                </div>
              )}

              {/* ⭐ Том рейтинг блок — зөвхөн эхний зурагны доор */}
              {i === 0 && (
                <div
                  style={{
                    marginTop: 10,
                    marginBottom: 12,
                    padding: 14,
                    borderRadius: 14,
                    border: "1px solid #e5e7eb",
                    background: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 24, lineHeight: 1 }}>⭐</div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "#111827" }}>
                        {RATING.score} ★
                      </div>
                      <div style={{ fontSize: 13, color: "#6b7280" }}>
                        ({RATING.count}+ захиалга) • Итгэлцлийн үнэлгээ
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280", textAlign: "right" }}>
                    ✅ Баталгаатай үйлчилгээ<br />
                    🚚 Үнэгүй хүргэлт
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* iframe рүү submit хийгээд, хэрэглэгчийг өөр тийш үсрүүлэхгүй */}f} name="hidden_iframe" title="hidden_iframe" style={{ display: "none" }} />

        <form
          method="POST"
          target="hidden_iframe"
          action="https://script.google.com/macros/s/AKfycbwzRFSEqXSzBETnTQjj9haE76etgFvOHFx-OXYzxvJYbcuoAUTIck1FkVNb1myOyduc/exec"
          onSubmit={handleSubmit}
        >
          {/* hidden fields */}
          <input type="hidden" name="date" value={new Date().toLocaleString()} />
          <input type="hidden" name="product" value={PRODUCT.name} />
          <input type="hidden" name="price" value={PRODUCT.price} />
          <input type="hidden" name="link" value={PRODUCT.link} />

          <div style={{ display: "grid", gap: 8 }}>
            <div>
              <div style={labelStyle}>Нэр *</div>
              <input
                style={inputStyle}
                name="name"
                placeholder="Жишээ: Бат"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <div style={labelStyle}>Утас *</div>
              <input
                style={inputStyle}
                name="phone"
                placeholder="Жишээ: 9999-9999"
                required
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <div style={labelStyle}>Хаяг</div>
              <input
                style={inputStyle}
                name="address"
                placeholder="Дүүрэг / Хороо / Байр…"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <div style={labelStyle}>Загвар</div>
              <input
                style={inputStyle}
                name="model"
                placeholder="Жишээ: Хар / M size"
                value={form.model}
                onChange={handleChange}
              />
            </div>

            <div>
              <div style={labelStyle}>Тоо ширхэг</div>
              <input
                style={inputStyle}
                name="quantity"
                type="number"
                min="1"
                value={form.quantity}
                onChange={handleChange}
              />
            </div>

            <button
              className="ctaBtn"
              style={{
                ...buttonStyle,
                opacity: status.type === "loading" ? 0.75 : 1,
                transform: status.type === "loading" ? "scale(0.99)" : undefined,
              }}
              type="submit"
              disabled={status.type === "loading"}
            >
              <span>{status.type === "loading" ? "Илгээж байна…" : "Захиалах"}</span>
            </button>
          </div>
        </form>

        {status.type !== "idle" && <div style={statusBoxStyle(status.type)}>{status.message}</div>}

        <div style={{ marginTop: 14, fontSize: 12, color: "#6b7280" }}>
          * Манайхаар үйлчлүүлсэнд баярлалаа.Бид тун удахгүй тантай холбогдох болно.
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div style={lightboxOverlay} onClick={closeLightbox}>
          <div style={lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div style={lightboxTop}>
              <div>
                Томоор харах • <span style={{ opacity: 0.8 }}>Esc дарж хааж болно</span>
              </div>
              <button style={closeBtn} onClick={closeLightbox}>
                Хаах ✕
              </button>
            </div>
            {lightbox.item?.type === "image" ? (
              <img
                src={lightbox.item.src}
                alt="preview"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            ) : (
              <video
                src={lightbox.item?.src}
                controls
                autoPlay
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
