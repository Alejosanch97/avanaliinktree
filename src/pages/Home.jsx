import { useState, useEffect } from "react";
import "../Styles/home.css";
import logoUrl from "../assets/img/avana2.png"; // reemplaza por tu logo

const LINKS = [
	{ label: "Catálogo", sublabel: "Explora la colección · WhatsApp", url: "https://wa.me/c/573225109005", tag: "01" },
	{ label: "Sitio Web", sublabel: "avanaleather.com.co", url: "https://avanaleather.com.co/", tag: "02" },
	{ label: "TikTok", sublabel: "@avanaleather", url: "https://www.tiktok.com/@avanaleather", tag: "03" },
	{ label: "Facebook", sublabel: "Avana Leather", url: "https://www.facebook.com/495147590345700", tag: "04" },
];

const SOCIALS = [
	{ label: "IG", url: "https://www.instagram.com/avanaleather/" },
	{ label: "WA", url: "https://wa.me/573225109005" },
	{ label: "WEB", url: "https://avanaleather.com.co/" },
];

export const Home = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const onMove = (e) => {
		const t = e.currentTarget;
		const r = t.getBoundingClientRect();
		t.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
		t.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
	};

	return (
		<div className={`av-wrap ${mounted ? "av-ready" : ""}`}>
			<div className="av-grain" />
			<div className="av-vignette" />

			<div className="av-corner tl" />
			<div className="av-corner tr" />
			<div className="av-corner bl" />
			<div className="av-corner br" />

			<main className="av-card">
				<div className="av-logo-frame">
					<span className="av-lf-corner c1" />
					<span className="av-lf-corner c2" />
					<span className="av-lf-corner c3" />
					<span className="av-lf-corner c4" />
					<div className="av-logo-box">
						<img src={logoUrl} alt="Avana Leather" className="av-logo" />
					</div>
				</div>

				<h1 className="av-name">AVANA</h1>
				<p className="av-sub">LEATHER</p>

				<p className="av-tag">
					<span className="av-line" />
					Marroquinería artesanal · Sur de Colombia
					<span className="av-line" />
				</p>

				<p className="av-quote">«No vendemos cuero. Honramos legados.»</p>

				<div className="av-links">
					{LINKS.map((l, i) => (
						<a
							key={l.label}
							href={l.url}
							target="_blank"
							rel="noopener noreferrer"
							className="av-link"
							onMouseMove={onMove}
							style={{ "--d": `${i * 0.09 + 0.35}s` }}
						>
							<span className="av-link-glow" />
							<span className="av-link-tag">{l.tag}</span>
							<span className="av-link-text">
								<strong>{l.label}</strong>
								<small>{l.sublabel}</small>
							</span>
							<span className="av-arrow">
								<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</span>
						</a>
					))}
				</div>

				<div className="av-socials">
					{SOCIALS.map((s, i) => (
						<a
							key={s.label}
							href={s.url}
							target="_blank"
							rel="noopener noreferrer"
							className="av-social"
							style={{ "--d": `${i * 0.1 + 0.8}s` }}
						>
							{s.label}
						</a>
					))}
				</div>

				<p className="av-foot">© {new Date().getFullYear()} · AVANA LEATHER · UN LEGADO HECHO A MANO</p>
			</main>
		</div>
	);
};

export default Home;