export function Footer() {
  return (
    <footer
      id="footer"
      className="py-4 md:py-6 px-4 backdrop-blur border-t border-slate-200/50 dark:border-slate-700/50 mt-auto"
    >
      <div className="max-w-4xl mx-auto text-center text-xs md:text-sm">
        <p>
          Powered by{" "}
          <a
            href="https://scryfall.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-medium"
          >
            Scryfall API
          </a>
        </p>
        <p className="mt-1">Magic: The Gathering is © Wizards of the Coast</p>
        <p className="mt-1">Project developed by Carlos Galiano</p>
      </div>
    </footer>
  );
}
