import NavLinksUL from "./Navbar/NavLinksUL";

const Navbar = () => {
  return (
    <nav className="navbar">
      <p className="text-xl md:text-2xl text-orange-600  dark:text-orange-300 font-sans font-extrabold border-b-2 border-b-stone-200 dark:border-b-stone-500">
        Dooit
      </p>
      <NavLinksUL />
    </nav>
  );
};

export default Navbar;
