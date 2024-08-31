// socialLinks.js
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaDiscord, FaLinkedinIn, FaStackOverflow } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const socialLinks = [
  {
    href: "https://github.com/Dhruvermafz",
    icon: <AiFillGithub />,
  },
  {
    href: "https://twitter.com/thenerdy_guy",
    icon: <AiOutlineTwitter />,
  },
  {
    href: "https://www.linkedin.com/in/dhruvermafz/",
    icon: <FaLinkedinIn />,
  },
  {
    href: "https://www.instagram.com/dhruvermafz/",
    icon: <AiFillInstagram />,
  },
  {
    href: "https://leetcode.com/u/thenerdy_guy/",
    icon: <SiLeetcode />,
  },
  {
    href: "https://stackoverflow.com/users/19765859/dhruv-verma",
    icon: <FaStackOverflow />,
  },
  {
    href: "https://discord.gg/FBSB8ZWE",
    icon: <FaDiscord />,
  },
];

export default socialLinks;
