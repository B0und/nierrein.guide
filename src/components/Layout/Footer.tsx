import { CREDITS } from "config/constants";
import Image from "next/image";
import slugify from "slugify";

export default function Footer(): JSX.Element {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-14 border-t border-white border-opacity-20">
      <div className="container">
        <section className="flex flex-col flex-wrap mt-14 w-full">
          <h2>Wonderful people that are working on this website</h2>

          <ul className="grid grid-cols-1 place-items-center sm:grid-cols-2 sm:place-items-start md:grid-cols-3 lg:grid-cols-4 gap-y-6 mt-8 md:mt-0">
            {CREDITS.map((credit) => (
              <Contributor key={credit.name} credit={credit} />
            ))}
          </ul>

          <p className="mt-8">
            If you are missing please let us know on our Discord !
          </p>
        </section>

        <div className="text-center mt-8">
          <p>
            NieR Re[in] Guide is not affiliated with or endorsed by SQUARE ENIX
            CO. LTD.
          </p>
          <p>All game assets used belongs to © SQUARE ENIX CO. LTD.</p>
        </div>
      </div>
    </footer>
  );
}

function Contributor({ credit }): JSX.Element {
  const Content = (
    <li className="flex items-center gap-x-6 hover-bg w-full p-2">
      <Image
        height="64"
        width="64"
        className="h-16"
        src={`/credits/${slugify(credit.name, { lower: true })}.png`}
        alt={`NieR Avatar of ${credit.name}`}
        loading="lazy"
      />
      <span className="serif text-2xl w-44 lg:w-auto">{credit.name}</span>
    </li>
  );

  if (credit.link) {
    return (
      <a
        key={credit.name}
        href={credit.link}
        rel="noopener noreferrer"
        target="_blank"
        className="w-full"
      >
        {Content}
      </a>
    );
  }

  return <>{Content}</>;
}
