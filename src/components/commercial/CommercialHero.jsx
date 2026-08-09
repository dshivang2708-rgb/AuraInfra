import { Link } from "@tanstack/react-router";

export default function CommercialHero() {
  return (
    <section
      className="py-16 px-4 md:px-8 border-b border-gray-100"
      style={{
        background:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)) center center / cover no-repeat, url('https://lh3.googleusercontent.com/aida-public/AB6AXuDG-R0g-pycJ1SeyjueQ2eoJG-PZ_JvBrmsIi08MOBf7GSMXywC5hla16GLkGGeErLTnYRGS1etNlR80lNFgppBoXrAnQ-vjaRToI5nq9lECn52ZUpLRwkyoFlzlOAnZ9Nbd20gobpZvTbkjQG3RZpYtCvXmqvEi7vb8sjSuwQdxze0KlrYxKbCOAh5wZbdfgUFp5S-WaDPqS64gxreLVTA4FWdaqrGJH8tjr7mGVmAJjKQ5livbK9CXA-w7Grpx8cfOQ=w2400')",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <nav aria-label="Breadcrumb" className="flex text-sm text-gray-200 mb-6">
          <Link to="/" className="hover:text-green-300 cursor-pointer">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-white font-medium">Commercial Properties</span>
        </nav>

        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
            Commercial Properties
            <br />
            For Every <span className="text-green-400">Business Need</span>
          </h1>
          <p className="max-w-2xl text-lg text-white">
            Discover premium commercial spaces in prime locations that elevate your business to the
            next level.
          </p>
        </div>
      </div>
    </section>
  );
}