import { FaGithub, FaGlobe } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
const AboutUs = () => {
     return (
          <div className="max-w-7xl min-h-screen mx-auto mt-8 md:mt-20 p-6 text-gray-800">
               <h1 className="text-3xl font-bold mb-4 text-[#007777] text-center">About the Developer</h1>

               <div className="bg-white shadow-md rounded-lg p-6">
                    {/* Developer Info */}
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                         <img
                              src="https://i.ibb.co/Wpd8P66D/193255466.jpg"
                              alt="Developer"
                              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow"
                         />

                         <div>
                              <h2 className="text-2xl font-semibold">Md Abdul Halim</h2>
                              <p className="mt-2 text-gray-600">
                                   A passionate full-stack web developer from Bangladesh with experience in building
                                   dynamic, responsive, and scalable web applications using MERN stack.
                              </p>
                              <p className="mt-2 text-sm text-blue-500 font-medium">
                                   Total Projects: <span className="text-black">12+</span>
                              </p>

                              <div className="flex gap-4 mt-4 text-xl text-gray-600">
                                   <a href="https://github.com/halim1122" target="_blank" rel="noreferrer">
                                        <FaGithub className="hover:text-black" />
                                   </a>
                                   <a href="https://linkedin.com/in/halimdev" target="_blank" rel="noreferrer">
                                        <FaSquareTwitter className="hover:text-blue-700" />
                                   </a>
                                   <a href="https://halimdev-portfolio.netlify.app" target="_blank" rel="noreferrer">
                                        <FaGlobe className="hover:text-green-600" />
                                   </a>
                              </div>
                         </div>
                    </div>

                    {/* Project List */}
                    <div className="mt-8">
                         <h3 className="text-xl font-semibold mb-3">Featured Projects:</h3>
                         <ul className="list-disc pl-6 space-y-2 text-blue-600">
                              <li>
                                   <a href="https://tour-haven.netlify.app" target="_blank" rel="noreferrer" className="hover:underline">
                                        Tour Haven - Travel Booking Web App
                                   </a>
                              </li>
                              <li>
                                   <a href="https://parcelxpress.netlify.app" target="_blank" rel="noreferrer" className="hover:underline">
                                        ParcelXpress - Courier Delivery Platform
                                   </a>
                              </li>
                              <li>
                                   <a href="https://assignmenthubbd.netlify.app" target="_blank" rel="noreferrer" className="hover:underline">
                                        AssignmentHubBD - Student Assignment Submission System
                                   </a>
                              </li>
                         </ul>
                    </div>
               </div>
          </div>
     );
};

export default AboutUs;
