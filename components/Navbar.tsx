export default function Navbar() {
  return (
    <section className="sticky z-50 top-0 h-[75px] px-20 py-3 w-full bg-white shadow-lg flex items-center justify-between">
      <img src="/fleksa_logo.webp" className="object-contain h-full" />

      <div className="flex items-center">
        <div className="mx-1 px-5 py-1 cursor-pointer transition-all duration-300 hover:primary-highlight">
          <p className="text-lg font-bold">HOME</p>
        </div>
        <div className="mx-1 px-5 py-1 cursor-pointer transition-all duration-300 primary-highlight">
          <p className="text-lg font-bold">MENU</p>
        </div>
        <div className="mx-1 px-5 py-1 cursor-pointer transition-all duration-300 hover:primary-highlight">
          <p className="text-lg font-bold">DISCOVER</p>
        </div>
        <div className="mx-1 px-5 py-1 cursor-pointer transition-all duration-300 hover:primary-highlight">
          <p className="text-lg font-bold">RESERVATION</p>
        </div>
        <div className="mx-1 px-5 py-1 cursor-pointer transition-all duration-300 hover:primary-highlight">
          <p className="text-lg font-bold">GALLERY</p>
        </div>
        <div className="mx-1 px-5 py-1 cursor-pointer transition-all duration-300 hover:primary-highlight">
          <p className="text-lg font-bold">CONTACT</p>
        </div>
        <div className="mx-1 px-5 py-1 cursor-pointer transition-all duration-300 hover:primary-highlight">
          <p className="text-lg font-bold">LOGIN</p>
        </div>
      </div>
    </section>
  );
}
