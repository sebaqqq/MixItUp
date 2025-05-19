import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container-custom py-6 pt-24">
        <Outlet />
      </main>
      <footer className="bg-white/95 backdrop-blur-sm border-t border-gray-200">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm text-gray-600">
                Data provided by{" "}
                <a
                  href="https://www.thecocktaildb.com/api.php"
                  target="_blank"
                  rel="noreferrer"
                  className="text-mint-600 hover:text-mint-700 transition-colors"
                >
                  TheCocktailDB
                </a>
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <p>© {new Date().getFullYear()} MixItUp. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
