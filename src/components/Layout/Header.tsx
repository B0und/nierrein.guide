import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { NAVIGATION } from "config/constants";
import Lottie from "react-lottie-player";
import logoData from "../../lottie/logo.json";
import { useEffect, useState } from "react";
import styled from "styled-components";

const NavItem = styled.li`
  img {
    clip-path: polygon(
      30% 0%,
      70% 0%,
      100% 30%,
      100% 70%,
      70% 100%,
      30% 100%,
      0% 70%,
      0% 30%
    );
  }

  &:hover,
  .active {
    img {
      clip-path: polygon(
        0 28%,
        52% 0,
        100% 30%,
        94% 50%,
        98% 70%,
        51% 100%,
        0 69%,
        6% 50%
      );
    }

    span {
      /* @apply text-beige-light; */
    }
  }
`;

export default function Header(): JSX.Element {
  const router = useRouter();
  const defaultAnimationPosition = 80;
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPosition] = useState(defaultAnimationPosition);

  function start() {
    setIsAnimating(true);
  }

  function done() {
    setIsAnimating(false);
  }

  useEffect(() => {
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="container px-4 lg:px-8">
      <div className="flex flex-col justify-center items-center flex-wrap gap-y-8 px-8 py-6">
        <Link href="/" passHref={true}>
          <a
            className="flex items-center relative group"
            onMouseEnter={start}
            onMouseLeave={done}
          >
            <span className="h-20 w-20 mr-4 z-0 absolute -top-16 left-1/2 transform -translate-x-1/2 scale-100 group-hover:scale-110 transition-transform ease-out-cubic">
              <Lottie
                animationData={logoData}
                play={isAnimating}
                goTo={animationPosition}
                speed={0.7}
                style={{ width: 84, height: 84 }}
              />
            </span>
            <h1 className="text-3xl text-center z-10 drop-shadow-xl mt-4">
              NieR Re[in] Guide
            </h1>
          </a>
        </Link>

        <nav className="nav w-full lg:w-auto">
          <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {NAVIGATION.map((nav) => (
              <NavItem
                key={nav.label}
                className="nav-item lg:flex lg:justify-center lg:w-28 group"
              >
                <Link href={nav.href} passHref={true}>
                  <a
                    className={classNames(
                      "flex items-center justify-center lg:flex-col",
                      router.asPath === nav.href ? "active" : null
                    )}
                  >
                    <Image
                      height={75}
                      width={75}
                      placeholder="blur"
                      src={nav.icon}
                      alt={`${nav.label} icon`}
                      className="transition-all ease-out-cubic group-hover:bg-beige-dark"
                    />
                    <span className="w-44 mt-4 text-center serif text-2xl lg:text-xl lg:w-auto group-hover:text-beige-light">
                      {nav.label}
                    </span>
                  </a>
                </Link>
              </NavItem>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
