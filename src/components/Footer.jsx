export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t text-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Placement Pipeline</h3>
          <p className="mt-3 text-sm leading-relaxed">
            Helping college placement cells streamline student opportunities with
            smoother workflows and connections.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/about" className="hover:text-gray-900">About</a></li>
            <li><a href="/features" className="hover:text-gray-900">Features</a></li>
            <li><a href="/contact" className="hover:text-gray-900">Contact</a></li>
            <li><a href="/support" className="hover:text-gray-900">Support</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
          <p className="mt-3 text-sm">connect@launchboard.com</p>
          <p className="text-sm">+91 XXXXX XXXXX</p>
        </div>
      </div>

      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Placement Pipeline. All rights reserved.
      </div>
    </footer>
  );
}
