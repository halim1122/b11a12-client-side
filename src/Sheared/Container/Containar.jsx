import React from 'react';

const Container = ({ children }) => {
     return (
          <div  className="w-full max-w-screen-xl xl:max-w-[1650px] 2xl:max-w-[1800px] mx-auto md:px-6 lg:px-8">
               {children}
          </div>
     );
};

export default Container;