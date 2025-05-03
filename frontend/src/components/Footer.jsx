import React from "react";

const Footer = () => (
  <footer className="text-center py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
    &copy; {new Date().getFullYear()} Countries API. All rights reserved.
  </footer>
);

export default Footer;