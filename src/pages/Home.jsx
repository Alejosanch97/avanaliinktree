import { useState, useEffect, useRef, useCallback } from "react";
import "../Styles/home.css";
import logoUrl from "../assets/img/avana2.png"; // reemplaza por tu logo

/* ================== DATA ================== */
const WA = "573225109005";
const waLink = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const LINKS = [
	{
		label: "Catálogo",
		sublabel: "Explora la colección · WhatsApp",
		url: "https://wa.me/c/573225109005",
		num: "I",
		icon: "bag",
		featured: true,
	},
	{ label: "Sitio Web", sublabel: "avanaleather.com.co", url: "https://avanaleather.com.co/", num: "II", icon: "web" },
	{ label: "TikTok", sublabel: "@avanaleather", url: "https://www.tiktok.com/@avanaleather", num: "III", icon: "tt" },
	{ label: "Facebook", sublabel: "Avana Leather", url: "https://www.facebook.com/495147590345700", num: "IV", icon: "fb" },
	{
		label: "WhatsApp",
		sublabel: "Escríbenos directo",
		url: waLink("¡Hola Avana! Quiero información sobre sus piezas 👜"),
		num: "V",
		icon: "wa",
	},
];

const SOCIALS = [
	{ label: "Instagram", icon: "ig", url: "https://www.instagram.com/avanaleather/" },
	{ label: "WhatsApp", icon: "wa", url: `https://wa.me/${WA}` },
	{ label: "TikTok", icon: "tt", url: "https://www.tiktok.com/@avanaleather" },
	{ label: "Facebook", icon: "fb", url: "https://www.facebook.com/495147590345700" },
	{ label: "Sitio web", icon: "web", url: "https://avanaleather.com.co/" },
];

const STEPS = [
	{ t: "Diseño", icon: "pencil", c: "Cada pieza empieza como un boceto." },
	{ t: "Corte", icon: "cut", c: "El cuero se corta pieza por pieza." },
	{ t: "Costura", icon: "needle", c: "Puntada a puntada, a mano." },
	{ t: "Acabado", icon: "spark", c: "Bordes, herrajes y detalle final." },
];

/* polvo dorado de taller (posiciones fijas, sin Math.random en render) */
const DUST = Array.from({ length: 22 }, (_, i) => {
	const r = (n) => {
		const x = Math.sin(i * 9301 + n * 49297) * 233280;
		return x - Math.floor(x);
	};
	return {
		left: `${(r(1) * 100).toFixed(2)}%`,
		size: 2 + r(2) * 4,
		dur: `${(10 + r(3) * 12).toFixed(1)}s`,
		delay: `${(-r(4) * 20).toFixed(1)}s`,
		drift: `${((r(5) - 0.5) * 120).toFixed(0)}px`,
	};
});

/* ================== ICONS ================== */
const Icon = ({ name, size = 20 }) => {
	const p = {
		viewBox: "0 0 24 24",
		width: size,
		height: size,
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.6,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": true,
	};
	switch (name) {
		case "bag":
			return (
				<svg {...p}>
					<path d="M5 8.5h14l-1.2 11.5H6.2z" />
					<path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
					<path d="M9.5 12.5h5" />
				</svg>
			);
		case "web":
			return (
				<svg {...p}>
					<circle cx="12" cy="12" r="9" />
					<path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
				</svg>
			);
		case "tt":
			return (
				<svg {...p}>
					<path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
					<path d="M14 4c.6 2.5 2.4 4 5 4.2" />
				</svg>
			);
		case "fb":
			return (
				<svg {...p}>
					<path d="M14.5 21v-7.5h2.8l.5-3.3h-3.3V8.4c0-1 .4-1.7 1.8-1.7H18V3.8A20 20 0 0 0 15.6 3.6c-2.6 0-4.3 1.6-4.3 4.4v2.2H8.5v3.3h2.8V21" />
				</svg>
			);
		case "ig":
			return (
				<svg {...p}>
					<rect x="3" y="3" width="18" height="18" rx="5" />
					<circle cx="12" cy="12" r="4" />
					<circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
				</svg>
			);
		case "wa":
			return (
				<svg {...p}>
					<path d="M4 20l1.3-3.9A8.5 8.5 0 1 1 8 19z" />
					<path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2z" />
				</svg>
			);
		case "pencil":
			return (
				<svg {...p}>
					<path d="M4 20l4-1 11-11-3-3L5 16z" />
					<path d="M14 6l3 3" />
				</svg>
			);
		case "cut":
			return (
				<svg {...p}>
					<circle cx="6" cy="7" r="2.5" />
					<circle cx="6" cy="17" r="2.5" />
					<path d="M8.2 8.3L20 18M8.2 15.7L20 6" />
				</svg>
			);
		case "needle":
			return (
				<svg {...p}>
					<path d="M5 19L17.5 6.5" />
					<path d="M17.5 6.5l1.8-1.8a1.3 1.3 0 0 0-1.8-1.8l-1.8 1.8" />
					<path d="M4 20c2.5.4 4-1.5 6.5-1.2S14 21 16 20" />
				</svg>
			);
		case "spark":
			return (
				<svg {...p}>
					<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
					<path d="M19 17l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
				</svg>
			);
		case "arrow":
			return (
				<svg {...p} strokeWidth={2}>
					<path d="M5 12h14M13 6l6 6-6 6" />
				</svg>
			);
		default:
			return null;
	}
};

/* ================== INTRO: la solapa del bolso se abre ================== */
function Flap({ onOpen, onDone }) {
	const [open, setOpen] = useState(false);
	const go = useCallback(() => setOpen(true), []);

	useEffect(() => {
		const t = setTimeout(go, 2700);
		return () => clearTimeout(t);
	}, [go]);

	useEffect(() => {
		if (!open) return;
		onOpen();
		const t = setTimeout(onDone, 1600);
		return () => clearTimeout(t);
	}, [open, onOpen, onDone]);

	return (
		<div className={`av-flap ${open ? "is-open" : ""}`} onClick={go} aria-hidden="true">
			<div className="flap-leaf leather">
				<svg className="flap-stitch" width="100%" height="100%">
					<defs>
						<mask id="avFlapMask">
							<rect className="flap-stitch-draw" x="4%" y="4%" width="92%" height="88%" rx="26" pathLength="1" />
						</mask>
					</defs>
					<rect className="flap-stitch-line" x="4%" y="4%" width="92%" height="88%" rx="26" mask="url(#avFlapMask)" />
				</svg>

				<div className="flap-center">
					<p className="flap-kicker">Marroquinería artesanal</p>
					<p className="flap-brand">AVANA</p>
					<p className="flap-sub">LEATHER</p>
					<span className="clasp">
						<span className="clasp-bar" />
					</span>
					<p className="flap-hint">Toca para abrir</p>
				</div>
			</div>
		</div>
	);
}

/* ================== Sello de lacre giratorio ================== */
function Seal() {
	return (
		<div className="seal rv rv-pop" style={{ "--d": "0.9s" }} aria-hidden="true">
			<svg className="seal-ring" viewBox="0 0 120 120">
				<defs>
					<path id="avSealPath" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
				</defs>
				<text textLength="290" lengthAdjust="spacing">
					<textPath href="#avSealPath">HECHO A MANO · 100% COLOMBIANO · CUERO ·</textPath>
				</text>
			</svg>
			<span className="seal-wax">
				<i>A</i>
			</span>
		</div>
	);
}

/* ================== Del taller a tus manos ================== */
function Process({ reduce }) {
	const [a, setA] = useState(0);
	const paused = useRef(false);

	useEffect(() => {
		if (reduce) return;
		const id = setInterval(() => {
			if (!paused.current) setA((v) => (v + 1) % STEPS.length);
		}, 2000);
		return () => clearInterval(id);
	}, [reduce]);

	return (
		<section
			className="proc rv"
			style={{ "--d": "1.35s" }}
			aria-label="Nuestro proceso artesanal"
			onMouseLeave={() => {
				paused.current = false;
			}}
		>
			<div className="proc-track">
				<span className="proc-thread">
					<span className="proc-fill" style={{ width: `${(a / (STEPS.length - 1)) * 100}%` }} />
				</span>
				{STEPS.map((s, i) => (
					<button
						type="button"
						key={s.t}
						className={`proc-step ${i <= a ? "is-done" : ""} ${i === a ? "is-on" : ""}`}
						onClick={() => setA(i)}
						onMouseEnter={() => {
							paused.current = true;
							setA(i);
						}}
						aria-pressed={i === a}
					>
						<span className="proc-dot">
							<Icon name={s.icon} size={18} />
						</span>
						<span className="proc-t">{s.t}</span>
					</button>
				))}
			</div>
			<p className="proc-cap" key={a}>
				{STEPS[a].c}
			</p>
		</section>
	);
}

const SectionLabel = ({ children, d }) => (
	<p className="av-sec rv" style={{ "--d": d }}>
		<span className="av-sec-line" />
		<span className="av-sec-gem" />
		{children}
		<span className="av-sec-gem" />
		<span className="av-sec-line" />
	</p>
);

/* ================== HOME ================== */
export const Home = () => {
	const [reduce] = useState(
		() => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
	);
	const [showIntro, setShowIntro] = useState(() => {
		if (reduce) return false;
		try {
			return !sessionStorage.getItem("av-intro-seen");
		} catch {
			return true;
		}
	});
	const [ready, setReady] = useState(false);
	const [stamps, setStamps] = useState([]);
	const wrapRef = useRef(null);
	const raf = useRef(0);

	const openStage = useCallback(() => setReady(true), []);
	const endIntro = useCallback(() => {
		try {
			sessionStorage.setItem("av-intro-seen", "1");
		} catch {
			/* noop */
		}
		setShowIntro(false);
	}, []);

	useEffect(() => {
		if (showIntro) return;
		const id = requestAnimationFrame(() => setReady(true));
		return () => cancelAnimationFrame(id);
	}, [showIntro]);

	useEffect(() => () => cancelAnimationFrame(raf.current), []);

	/* lámpara de taller + inclinación de la etiqueta */
	const onPointerMove = (e) => {
		if (reduce) return;
		const x = e.clientX;
		const y = e.clientY;
		cancelAnimationFrame(raf.current);
		raf.current = requestAnimationFrame(() => {
			const el = wrapRef.current;
			if (!el) return;
			el.style.setProperty("--lx", `${x}px`);
			el.style.setProperty("--ly", `${y}px`);
			el.style.setProperty("--tilt", `${((x / window.innerWidth - 0.5) * 8).toFixed(2)}deg`);
		});
	};

	/* sello "A" estampado donde tocas */
	const onPointerDown = (e) => {
		if (reduce || showIntro) return;
		const id = `${Date.now()}-${Math.random()}`;
		setStamps((s) => [...s.slice(-4), { id, x: e.clientX, y: e.clientY }]);
		setTimeout(() => setStamps((s) => s.filter((t) => t.id !== id)), 950);
	};

	const onCardMove = (e) => {
		const el = e.currentTarget;
		const r = el.getBoundingClientRect();
		el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
		el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
	};

	return (
		<div
			ref={wrapRef}
			className={`av-wrap ${ready ? "av-ready" : ""}`}
			onPointerMove={onPointerMove}
			onPointerDown={onPointerDown}
		>
			{showIntro && <Flap onOpen={openStage} onDone={endIntro} />}

			{stamps.map((s) => (
				<span key={s.id} className="av-stamp" style={{ left: s.x, top: s.y }} aria-hidden="true">
					<i>A</i>
				</span>
			))}

			{/* ---------- Atmósfera ---------- */}
			<div className="av-hide" aria-hidden="true" />
			<div className="av-lamp" aria-hidden="true" />
			<div className="av-dust" aria-hidden="true">
				{DUST.map((d, i) => (
					<span
						key={i}
						style={{
							left: d.left,
							width: d.size,
							height: d.size,
							"--dur": d.dur,
							"--delay": d.delay,
							"--drift": d.drift,
						}}
					/>
				))}
			</div>
			<div className="av-vignette" aria-hidden="true" />

			<div className="av-corner tl" aria-hidden="true" />
			<div className="av-corner tr" aria-hidden="true" />
			<div className="av-corner bl" aria-hidden="true" />
			<div className="av-corner br" aria-hidden="true" />

			{/* ---------- Contenido ---------- */}
			<main className="av-card">
				{/* Etiqueta de cuero colgante */}
				<div className="hero">
					<div className="tag-rig rv rv-drop" style={{ "--d": "0.05s" }}>
						<div className="tag-tilt">
							<div className="tag-swing">
								<span className="tag-cord" aria-hidden="true" />
								<div className="tag leather">
									<svg className="tag-stitch" viewBox="0 0 168 214" aria-hidden="true">
										<polygon points="30,9 138,9 159,30 159,205 9,205 9,30" />
									</svg>
									<span className="tag-grommet" aria-hidden="true" />
									<div className="tag-logo">
										<img src={logoUrl} alt="Avana Leather" />
									</div>
									<span className="tag-label">HECHO A MANO</span>
								</div>
							</div>
						</div>
					</div>
					<Seal />
				</div>

				{/* Wordmark */}
				<h1 className="wm" aria-label="Avana Leather">
					<span className="wm-name" aria-hidden="true">
						{"AVANA".split("").map((c, i) => (
							<span key={i} style={{ "--i": i }}>
								{c}
							</span>
						))}
					</span>
					<span className="wm-sub" aria-hidden="true">
						LEATHER
					</span>
				</h1>

				<p className="motto rv" style={{ "--d": "0.95s" }}>
					Un legado hecho a mano
				</p>

				<p className="av-tag rv" style={{ "--d": "1.05s" }}>
					<span className="av-line" />
					Marroquinería artesanal · Sur de Colombia
					<span className="av-line" />
				</p>

				{/* Costura con aguja */}
				<div className="stitch" style={{ "--d": "1.1s" }} aria-hidden="true">
					<span className="stitch-thread" />
					<span className="needle">
						<svg viewBox="0 0 44 10">
							<path d="M43 5 L12 3.4 Q5 3.6 4 5 Q5 6.4 12 6.6 Z" />
							<ellipse cx="9" cy="5" rx="2.6" ry="0.8" />
						</svg>
					</span>
				</div>

				<SectionLabel d="1.2s">La colección</SectionLabel>

				<nav className="lps" aria-label="Enlaces de Avana Leather">
					{LINKS.map((l, i) => (
						<div key={l.label} className="lp-slot rv rv-rise" style={{ "--d": `${1.25 + i * 0.08}s` }}>
							<a
								href={l.url}
								target="_blank"
								rel="noopener noreferrer"
								className={`lp leather ${l.featured ? "is-featured" : ""}`}
								onMouseMove={onCardMove}
							>
								<span className="lp-num">{l.num}</span>
								<span className="lp-icon">
									<Icon name={l.icon} />
								</span>
								<span className="lp-text">
									<strong>{l.label}</strong>
									<small>{l.sublabel}</small>
								</span>
								{l.featured && <em className="lp-badge">Ver colección</em>}
								<span className="lp-rivet">
									<Icon name="arrow" size={16} />
								</span>
							</a>
						</div>
					))}
				</nav>

				<SectionLabel d="1.3s">Del taller a tus manos</SectionLabel>
				<Process reduce={reduce} />

				<div className="rivets">
					{SOCIALS.map((s, i) => (
						<div key={s.label} className="rv rv-pop" style={{ "--d": `${1.5 + i * 0.07}s` }}>
							<a href={s.url} target="_blank" rel="noopener noreferrer" className="rivet" aria-label={s.label}>
								<Icon name={s.icon} size={19} />
								<span className="rivet-tip">{s.label}</span>
							</a>
						</div>
					))}
				</div>

				<footer className="av-foot rv" style={{ "--d": "1.85s" }}>
					<span className="tricolor" aria-hidden="true" />
					<span className="av-foot-made">Hecho a mano en Colombia</span>
					<span>© {new Date().getFullYear()} · AVANA LEATHER · UN LEGADO HECHO A MANO</span>
				</footer>
			</main>
		</div>
	);
};

export default Home;