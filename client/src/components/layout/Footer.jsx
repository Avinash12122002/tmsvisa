import { Link } from "react-router-dom";

// ── DATA ────────────────────────────────────────────────────────────────────

const quickLinks = [
  { label: "About Us",       to: "/about" },
  { label: "Blog",           to: "/blog" },
  { label: "Contact Us",     to: "/contact" },
  { label: "Visa Predictor", to: "/visa-predictor" },
  { label: "FAQ",            to: "/faq" },
];

const services = [
  { label: "Tourist Visa",         to: "/tourist-visa" },
  { label: "Work Visa",            to: "/work-visa" },
  { label: "Visa Courses",         to: "/visa-courses" },
  { label: "Free Consultation",    to: "/consultation" },
  { label: "Document Assistance",  to: "/document-assistance" },
];

const blogs = [
  { label: "Australia Visa Guide",   to: "/blog/australia-visa" },
  { label: "Canada Visa Guide",      to: "/blog/canada-visa" },
  { label: "New Zealand Visa Guide", to: "/blog/new-zealand-visa" },
  { label: "UK Visa Guide",          to: "/blog/uk-visa" },
  { label: "Work Abroad Tips",       to: "/blog/work-abroad" },
];

// flagcdn.com 2-letter ISO codes
const countries = [
  { code: "au", name: "Australia",      tourist: "/australia-tourist-visa",    work: "/australia-work-visa" },
  { code: "ca", name: "Canada",         tourist: "/canada-tourist-visa",        work: "/canada-work-visa" },
  { code: "nz", name: "New Zealand",    tourist: "/new-zealand-tourist-visa",   work: "/new-zealand-work-visa" },
  { code: "gb", name: "United Kingdom", tourist: "/uk-tourist-visa",            work: "/uk-work-visa" },
  { code: "de", name: "Germany",        tourist: "/germany-tourist-visa",       work: "/germany-work-visa" },
  { code: "us", name: "United States",  tourist: "/usa-tourist-visa",           work: "/usa-work-visa" },
  { code: "ae", name: "UAE",            tourist: "/uae-tourist-visa",           work: "/uae-work-visa" },
  { code: "sg", name: "Singapore",      tourist: "/singapore-tourist-visa",     work: "/singapore-work-visa" },
  { code: "ie", name: "Ireland",        tourist: "/ireland-tourist-visa",       work: "/ireland-work-visa" },
  { code: "nl", name: "Netherlands",    tourist: "/netherlands-tourist-visa",   work: "/netherlands-work-visa" },
  { code: "fr", name: "France",         tourist: "/france-tourist-visa",        work: "/france-work-visa" },
  { code: "it", name: "Italy",          tourist: "/italy-tourist-visa",         work: "/italy-work-visa" },
  { code: "es", name: "Spain",          tourist: "/spain-tourist-visa",         work: "/spain-work-visa" },
  { code: "ch", name: "Switzerland",    tourist: "/switzerland-tourist-visa",   work: "/switzerland-work-visa" },
  { code: "at", name: "Austria",        tourist: "/austria-tourist-visa",       work: "/austria-work-visa" },
  { code: "fi", name: "Finland",        tourist: "/finland-tourist-visa",       work: "/finland-work-visa" },
  { code: "jp", name: "Japan",          tourist: "/japan-tourist-visa",         work: "/japan-work-visa" },
  { code: "kr", name: "South Korea",    tourist: "/south-korea-tourist-visa",   work: "/south-korea-work-visa" },
];

// ── SVG ICONS ────────────────────────────────────────────────────────────────

const PhoneIcon = () => (
  <svg width="15" height="15" fill="none" stroke="#e8472a" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0 mt-0.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.39 19a19.45 19.45 0 0 1-6-6 19.79 19.79 0 0 1-3.94-8.36A2 2 0 0 1 3.42 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="15" height="15" fill="#25D366" viewBox="0 0 24 24" className="shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.118 1.524 5.847L0 24l6.335-1.507A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.213-3.724.886.936-3.617-.234-.372A9.773 9.773 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" fill="none" stroke="#e8472a" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0 mt-0.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="15" height="15" fill="none" stroke="#e8472a" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0 mt-0.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="15" height="15" fill="none" stroke="#e8472a" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0 mt-0.5">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

// Social SVGs
const IgIcon = () => (
  <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/>
  </svg>
);

// ── COMPONENT ────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer style={{ fontFamily: "'DM Sans', sans-serif" }} className="bg-[#f5f5f5] text-[#333] border-t border-gray-200">

    {/* ── MAIN 5-COL GRID ── */}
    <div className="max-w-[1300px] mx-auto px-10 pt-10 pb-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 border-b border-gray-300">

      {/* COL 1 — ABOUT */}
      <div className="pb-10">
        <Link to="/" className="text-[22px] font-bold text-[#111] no-underline leading-none">
          TMS<span className="text-[#e8472a]">VISA</span>
        </Link>
        <span className="block text-[11px] text-gray-400 mt-0.5 mb-3 tracking-wide">
          The Migration School
        </span>
        <p className="text-[13.5px] text-[#666] leading-[1.75]">
          TMS Visa is a professional visa consultancy helping individuals explore tourist visas,
          work visas, and international opportunities for Australia, Canada, New Zealand, and the
          United Kingdom.
        </p>
      </div>

      {/* COL 2 — QUICK LINKS */}
      <FooterCol title="Quick Links">
        {quickLinks.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-[13.5px] text-[#555] no-underline hover:text-[#e8472a] transition-colors duration-150">
              {l.label}
            </Link>
          </li>
        ))}
      </FooterCol>

      {/* COL 3 — SERVICES */}
      <FooterCol title="Our Services">
        {services.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-[13.5px] text-[#555] no-underline hover:text-[#e8472a] transition-colors duration-150">
              {l.label}
            </Link>
          </li>
        ))}
      </FooterCol>

      {/* COL 4 — BLOGS */}
      <FooterCol title="Blogs">
        {blogs.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-[13.5px] text-[#555] no-underline hover:text-[#e8472a] transition-colors duration-150">
              {l.label}
            </Link>
          </li>
        ))}
      </FooterCol>

      {/* COL 5 — CONTACT */}
      <div className="pb-10">
        <ColTitle>Contact Us</ColTitle>
        <ContactRow icon={<PhoneIcon />}>
          <a href="tel:+918950546462" className="text-[13.5px] text-[#555] no-underline hover:text-[#e8472a] transition-colors">
            +91 89505 46462
          </a>
        </ContactRow>
        <ContactRow icon={<WhatsAppIcon />}>
          <a href="https://wa.me/918950546462" target="_blank" rel="noreferrer"
             className="text-[13.5px] text-[#555] no-underline hover:text-[#e8472a] transition-colors">
            +91 89505 46462
          </a>
        </ContactRow>
        <ContactRow icon={<MailIcon />}>
          <a href="mailto:info@tmsvisa.com" className="text-[13.5px] text-[#555] no-underline hover:text-[#e8472a] transition-colors">
            info@tmsvisa.com
          </a>
        </ContactRow>
        <ContactRow icon={<MapPinIcon />}>
          <span className="text-[13.5px] text-[#555]">Bahadurgarh, Haryana</span>
        </ContactRow>
        <ContactRow icon={<ClockIcon />}>
          <span className="text-[13.5px] text-[#555]">Mon–Sat: 10AM – 6PM IST</span>
        </ContactRow>
      </div>
    </div>

    {/* ── COUNTRIES STRIP ── */}
    <div className="max-w-[1300px] mx-auto px-10 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-7 border-b border-gray-300">
      {countries.map((c) => (
        <div key={c.code}>
          {/* Flag image + name */}
          <div className="flex items-center gap-2 mb-2">
            <img
              src={`https://flagcdn.com/w20/${c.code}.png`}
              srcSet={`https://flagcdn.com/w40/${c.code}.png 2x`}
              width="20"
              height="14"
              alt={c.name}
              className="rounded-[2px] object-cover shrink-0 shadow-sm"
              style={{ aspectRatio: "20/14" }}
            />
            <span className="text-[12px] font-bold uppercase tracking-[1px] text-[#111] leading-tight">
              {c.name}
            </span>
          </div>
          <Link to={c.tourist} className="block text-[12.5px] text-[#555] no-underline leading-[1.9] hover:text-[#e8472a] transition-colors">
            Tourist Visa
          </Link>
          <Link to={c.work} className="block text-[12.5px] text-[#555] no-underline leading-[1.9] hover:text-[#e8472a] transition-colors">
            Work Visa
          </Link>
        </div>
      ))}
    </div>

    {/* ── BOTTOM / COPYRIGHT ── */}
    <div className="bg-[#1a1a1a]">
      <div className="max-w-[1300px] mx-auto px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">

        {/* Left — copyright */}
        <p className="text-[12.5px] text-[#888] order-2 md:order-1">
          © 2025 TMS Visa (The Migration School). All rights reserved.
        </p>

        {/* Center — social icons */}
        <div className="flex items-center gap-3 order-1 md:order-2">
          <span className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#666] mr-1">
            Follow Us
          </span>
          <SocialBtn href="https://instagram.com/tmsvisa" label="Instagram">
            <IgIcon />
          </SocialBtn>
          <SocialBtn href="https://g.page/tmsvisa" label="Google">
            <GoogleIcon />
          </SocialBtn>
        </div>

        {/* Right — policy links */}
        <div className="flex flex-wrap gap-5 order-3">
          <a href="https://app.tmsvisa.com/privacy-policy"
             className="text-[12.5px] text-[#888] no-underline hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="https://app.tmsvisa.com/refund-policy"
             className="text-[12.5px] text-[#888] no-underline hover:text-white transition-colors">
            Refund &amp; Cancellation
          </a>
          <a href="https://app.tmsvisa.com/terms"
             className="text-[12.5px] text-[#888] no-underline hover:text-white transition-colors">
            Terms &amp; Conditions
          </a>
        </div>

      </div>
    </div>

  </footer>
);

// ── HELPERS ──────────────────────────────────────────────────────────────────

const ColTitle = ({ children }) => (
  <p className="text-[11px] font-bold tracking-[1.6px] uppercase text-[#111] mb-[18px]">
    {children}
  </p>
);

const FooterCol = ({ title, children }) => (
  <div className="pb-10">
    <ColTitle>{title}</ColTitle>
    <ul className="list-none m-0 p-0 space-y-[10px]">{children}</ul>
  </div>
);

const ContactRow = ({ icon, children }) => (
  <div className="flex items-start gap-[10px] mb-[13px]">
    {icon}
    {children}
  </div>
);

const SocialBtn = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="w-9 h-9 rounded-full bg-[#333] flex items-center justify-center text-white no-underline transition-all duration-200 hover:bg-[#e8472a] hover:-translate-y-0.5"
  >
    {children}
  </a>
);

export default Footer;