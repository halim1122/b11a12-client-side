import { FaGithub, FaGlobe } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";

const AboutUs = () => {
  // Fake Data
  const developers = [
    {
      name: "Md Abdul Halim",
      photo: "https://i.ibb.co/Wpd8P66D/193255466.jpg",
      bio: "A passionate full-stack web developer from Bangladesh with experience in building dynamic, responsive, and scalable web applications using MERN stack.",
      projects: [
        { name: "Tour Haven", link: "https://tour-haven.netlify.app" },
        { name: "ParcelXpress", link: "https://parcelxpress.netlify.app" },
        { name: "AssignmentHubBD", link: "https://assignmenthubbd.netlify.app" },
      ],
      github: "https://github.com/halim1122",
      twitter: "https://linkedin.com/in/halimdev",
      website: "https://halimdev-portfolio.netlify.app",
      totalProjects: 12,
    },
    {
      name: "Atik Hossain",
      photo: "https://i.ibb.co.com/6LHLMvz/174959048.jpg", // Replace with real fake image
      bio: "Front-end developer focused on creating beautiful, user-friendly websites with React and TailwindCSS.",
      projects: [
        { name: "React Shop", link: "#" },
        { name: "Portfolio Site", link: "#" },
        { name: "Blog Platform", link: "#" },
      ],
      github: "https://github.com/fakeuser",
      twitter: "https://twitter.com/fakeuser",
      website: "#",
      totalProjects: 8,
    },
  ];

  return (
    <div className="max-w-7xl min-h-screen mx-auto mt-8 md:mt-20 p-6 text-gray-800 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-[#007777] text-center">About Developers</h1>

      {developers.map((dev, idx) => (
        <div key={idx} className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img
              src={dev.photo}
              alt={dev.name}
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow"
            />
            <div>
              <h2 className="text-2xl font-semibold">{dev.name}</h2>
              <p className="mt-2 text-gray-600">{dev.bio}</p>
              <p className="mt-2 text-sm text-blue-500 font-medium">
                Total Projects: <span className="text-black">{dev.totalProjects}+</span>
              </p>

              <div className="flex gap-4 mt-4 text-xl text-gray-600">
                <a href={dev.github} target="_blank" rel="noreferrer">
                  <FaGithub className="hover:text-black" />
                </a>
                <a href={dev.twitter} target="_blank" rel="noreferrer">
                  <FaSquareTwitter className="hover:text-blue-700" />
                </a>
                <a href={dev.website} target="_blank" rel="noreferrer">
                  <FaGlobe className="hover:text-green-600" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Featured Projects:</h3>
            <ul className="list-disc pl-6 space-y-2 text-blue-600">
              {dev.projects.map((proj, i) => (
                <li key={i}>
                  <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline">
                    {proj.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
