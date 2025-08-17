import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OurPackages from './OurPackages';
import ChooseYourTourGuides from './ChooseYourTourGuides';

const TravelGuideSection = () => {

     return (
    <section className="py-16 px-4 md:px-20">
      <h2 className="text-4xl font-bold text-center mb-10 text-[#007777]">Tourism & Travel Guide</h2>

      <Tabs>
        <TabList className="flex justify-center gap-6 mb-8">
          <Tab className="btn btn-outline btn-accent">Our Packages</Tab>
          <Tab className="btn btn-outline btn-accent">Meet Our Tour Guides</Tab>
        </TabList>

        {/* Packages */}
        <TabPanel>
          <OurPackages></OurPackages>
        </TabPanel>

        {/* Guides */}
        <TabPanel>
         <ChooseYourTourGuides />
        </TabPanel>
      </Tabs>
    </section>
     );
};

export default TravelGuideSection;
