export function Footer() {
  return (
    <footer
      id="footer"
      className="py-4 md:py-6 px-4 border-t border-slate-100 bg-white/50 backdrop-blur"
    >
      <div className="max-w-4xl mx-auto text-center text-xs md:text-sm text-slate-400">
        <p>
          Powered by{" "}
          <a
            href="https://scryfall.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Scryfall API
          </a>
        </p>
        <p className="mt-1">Magic: The Gathering is © Wizards of the Coast</p>
      </div>
    </footer>
  );
}
