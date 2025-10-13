
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-auto">
      <div className="container mx-auto px-6 py-4 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} Stagewise. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
