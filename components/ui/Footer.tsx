import Link from "next/link";
import { FaDiscord, FaFacebook, FaGithub, FaTwitter } from "react-icons/fa6";

const socialMediaLinks = [
  {
    href: "http://facebook.com",
    icon: <FaFacebook className="h-4 w-4" />,
    srLabel: "Facebook page",
  },
  {
    href: "http://discord.com",
    icon: <FaDiscord className="h-4 w-4" />,
    srLabel: "Discord community",
  },
  {
    href: "http://twitter.com",
    icon: <FaTwitter className="h-4 w-4" />,
    srLabel: "Twitter page",
  },
  {
    href: "http://github.com",
    icon: <FaGithub className="h-4 w-4" />,
    srLabel: "GitHub account",
  },
];

const Footer = () => {
  return (
    <footer className="relative z-10 bg-gray-800">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 md:grid-cols-4 lg:py-8">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
              Company
            </h2>
            <ul className="font-medium text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Brand Center
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
              Help center
            </h2>
            <ul className="font-medium text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Discord Server
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
              Legal
            </h2>
            <ul className="font-medium text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Licensing
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
              Download
            </h2>
            <ul className="font-medium text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  iOS
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Android
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Windows
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  MacOS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-700">
        <div className="mx-auto w-full max-w-screen-xl px-4 py-6 md:flex md:items-center md:justify-between">
          <span className="text-sm sm:text-center dark:text-gray-300">
            © 2024 <Link href="/">MI STORE™</Link>. All Rights Reserved.
          </span>

          <div className="mt-4 flex space-x-5 sm:justify-center md:mt-0 rtl:space-x-reverse">
            {socialMediaLinks.map(({ href, icon, srLabel }) => (
              <a
                key={srLabel}
                href={href}
                target="_blank"
                className="hover: text-gray-400 dark:hover:text-white"
              >
                {icon}
                <span className="sr-only">{srLabel}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
