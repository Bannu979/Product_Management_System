export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="brand">TrendyMart</div>
        {/* Swap positions: show social where links were */}
        <div className="social">
          <a aria-label="Email" href="mailto:contact@trendymart.com" title="Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
          <a aria-label="LinkedIn" href="https://www.linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4.1 0 4.9 2.7 4.9 6.2V24h-4v-7.1c0-1.7 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V24h-4V8z"/></svg>
          </a>
          <a aria-label="WhatsApp" href="https://wa.me/0000000000" target="_blank" rel="noreferrer" title="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.95C.16 5.281 5.443 0 12.057 0c3.17 0 6.167 1.236 8.413 3.482a11.82 11.82 0 013.49 8.414c-.002 6.615-5.284 11.897-11.9 11.897a11.9 11.9 0 01-5.93-1.594L.057 24zm6.597-3.807c1.78.995 3.063 1.591 5.392 1.593 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.45 0-9.885 4.434-9.888 9.884a9.86 9.86 0 001.69 5.519l-.999 3.648 3.797-.867zm11.387-5.464c-.074-.124-.272-.198-.57-.346-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.148-.669.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-
372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.58-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414z"/></svg>
          </a>
        </div>
        {/* And place links with copyright inside the meta area */}
        <div className="meta">
          <div className="links">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/products">Products</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="copyright">© {year} TrendyMart. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}


