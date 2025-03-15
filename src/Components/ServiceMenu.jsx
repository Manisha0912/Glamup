// import React from 'react'
// import {makeupService} from '../assets/assets'
// import {Link} from 'react-router-dom'

// const ServiceMenu = () => {
//   return (
//     <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id="service">
//     <h1 className=' text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center px-4 font-medium'>Explore Our Beauty Services</h1>
 
//     <p className='sm-w:1/3 text-center text-xl'>Flawless beauty for every occasion—weddings, parties, or special days. Pick your perfect look!</p>
//     {/* <div className="grid grid grid-cols-6 sm:justify-center gap-2 pt-5 w-full overflow-scroll"> */}
//     <div className=" bg-black grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-5 py-5 w-full rounded-2xl">
  
// {makeupService.slice(0,11).map((item,index)=>(
  
//     <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center  cursor-pointer flex-shrink-0 hover:translate-all duration-500 text-white text-lg ' key={index} to={`/beautician/${item.service}`} >
// <div className='overflow-hidden transform hover:scale-105 hover:translate-y-2 transition-transform duration-300 mb-2'>

// <img className='w-40 h-40 object-cover rounded-lg shadow-md ' src={item.image} alt=""/>
// </div>
// <p>{item.service}</p>

// </Link>

// ))}

    
//     </div>
//     </div>
//   )
// }

// export default ServiceMenu



import React, { useState } from 'react';
import { makeupService } from '../assets/assets';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ServiceMenu = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const services = makeupService.slice(0, 12);
  const imagesPerPage = 3;
  const totalPages = Math.ceil(services.length / imagesPerPage);

  const nextSlide = () => {
    setCurrentPage((prevPage) => 
      prevPage === totalPages - 1 ? 0 : prevPage + 1
    );
  };

  const prevSlide = () => {
    setCurrentPage((prevPage) => 
      prevPage === 0 ? totalPages - 1 : prevPage - 1
    );
  };

  const getPageServices = () => {
    const startIndex = currentPage * imagesPerPage;
    return services.slice(startIndex, startIndex + imagesPerPage);
  };

  return (
    <div className="mt-10 w-full py-6 bg-black ">
      <h2 className="text-2xl font-bold text-center text-white mb-4">
        Explore Our Beauty Services
      </h2>
      <p className="text-center text-white mb-6">
        Flawless beauty for every occasion—weddings, parties, or special days. Pick your perfect look!
      </p>
      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-lg bg-black relative px-4">
          <div className={`flex transition-transform duration-500 ease-in-out`}>
            <div className="w-full flex justify-center gap-4">
              {getPageServices().map((service, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Link 
                    onClick={() => scrollTo(0, 0)}
                    className="flex flex-col items-center cursor-pointer flex-shrink-0 text-white"
                    to={`/beautician/${service.service}`}
                  >
                    <div className="overflow-hidden transform hover:scale-105 transition-transform duration-300 mb-2">
                      <img
                        src={service.image}
                        alt={service.service}
                        className="w-52 h-60 object-cover rounded-lg shadow-md hover:brightness-110 transition-all duration-500"
                      />
                    </div>
                    <p className="text-center text-white hover:text-pink-200 transition-colors duration-300">
                      {service.service}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/3 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1 z-10 transition-colors duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/3 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1 z-10 transition-colors duration-300"
          aria-label="Next slide"
        >
          <ChevronRight size={16} />
        </button>
        {/* Dot indicators */}
        <div className="flex justify-center gap-1 mt-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                index === currentPage ? 'bg-white' : 'bg-gray-600'
              } hover:bg-white/70`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceMenu;