'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { getMenuItems } from '../api/wp';

export default function Menu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getMenuItems()
      .then(setMenuItems)
      .catch((err) => console.error('Menu load error:', err));
  }, []);

  const topLevelItems = menuItems.filter((item) => item.parent === "0");
  const getChildren = (id) => menuItems.filter((item) => item.parent === String(id));

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2 text-white font-bold">
            <img className="h-12 w-auto" src="/fkab-white-logo.png" alt="Site Logo" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:gap-x-10">
          {topLevelItems.map((item) => (
            <a
              key={item.ID}
              href={item.url}
              className="text-sm font-semibold leading-6 text-white hover:text-gray-300"
            >
              {item.title}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/contact"
            className="inline-block bg-white text-blue-900 font-semibold px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Get in touch
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <img className="h-8 w-auto" src="/fkab-dark-logo.png" alt="Site Logo" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700" 
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-300/10">
              <div className="space-y-2 py-6">
                {topLevelItems.map((item) => (
                  <a
                    key={item.ID}
                    href={item.url}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="/contact"
                  className="block rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-blue-800 text-center"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
