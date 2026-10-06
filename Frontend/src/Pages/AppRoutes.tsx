import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Divider } from '@mantine/core';
import HomePage from './HomePage';
import FindJobs from './FindJobs';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import FindTalentPage from '../Pages/FindTalentPage';
import TalentProfilePage from '../Pages/TalentProfilePage';
import PostJobPage from '../Pages/PostJobPage';
import JobDescPage from '../Pages/JobDescPage';
import ApplyJobPage from '../Pages/ApplyJobPage';
import CompanyProfilePage from '../Pages/CompanyProfilePage';
import PostedJobsPage from '../Pages/PostedJobsPage';
import JobHistoryPage from '../Pages/JobHistoryPage';
import SignUpPage from '../Pages/SignUpPage';
import ProfilePage from '../Pages/ProfilePage';
import { useSelector } from "react-redux";

const AppRoutes = () => {
    const user = useSelector((state: any) => state.user);
    return (
        <BrowserRouter>
            <div className='relative'>
                <Header />
                <Divider size="xs" />
                <Routes>
                    <Route path='/find-jobs' element={<FindJobs />} />
                    <Route path='/find-talent' element={<FindTalentPage />} />
                    <Route path='/jobs' element={<JobDescPage />} />
                    <Route path='/apply-job' element={<ApplyJobPage />} />
                    <Route path='/post-jobs' element={<PostJobPage />} />
                    <Route path='/posted-jobs' element={<PostedJobsPage />} />
                    <Route path='/company' element={<CompanyProfilePage />} />
                    <Route path='/job-history' element={<JobHistoryPage />} />
                    <Route path='/login' element={user ? <Navigate to="/" /> : <SignUpPage />} />
                    <Route path='/signup' element={user ? <Navigate to="/" /> : <SignUpPage />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/talent-profile' element={<TalentProfilePage />} />
                    <Route path='*' element={<HomePage />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default AppRoutes;