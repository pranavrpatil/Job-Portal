import Companies from "../Components/Landing Page/Companies";
import DreamJob from "../Components/Landing Page/DreamJob";
import JobCategory from "../Components/Landing Page/JobCategory";
import Subscribe from "../Components/Landing Page/Subscribe";
import Testimonials from "../Components/Landing Page/Testimonials";
import Working from "../Components/Landing Page/Working";

const HomePage = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
            <DreamJob />
            <Companies />
            <JobCategory />
            <Working />
            <Testimonials />
            <Subscribe />
        </div>

    )
}

export default HomePage;