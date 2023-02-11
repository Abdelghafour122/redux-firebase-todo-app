import NavLinksUL from "./Navbar/NavLinksUL";

const Navbar = () => {
  return (
    <nav className="py-2 px-2 min-h-screen h-screen bg-neutral-400 dark:bg-neutral-900 shadow-sm flex flex-col items-center justify-start gap-2 w-max">
      {/* <div className="flex flex-col items-center justify-start gap-2 h-full w-max"> */}
      <p className="text-2xl text-orange-600  dark:text-orange-300 font-sans font-extrabold border-b-2 border-b-stone-200 dark:border-b-stone-500">
        Dooit
      </p>
      <NavLinksUL />
    </nav>
  );
};

export default Navbar;
