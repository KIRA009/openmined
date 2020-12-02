import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useUser } from 'reactfire';

const Homepage = lazy(() => import('./homepage'));
const Signup = lazy(() => import('./users/sign-up'));
const Signin = lazy(() => import('./users/sign-in'));
const Settings = lazy(() => import('./users/settings'));
const Profile = lazy(() => import('./users/profile'));
const CourseOverview = lazy(() => import('./courses/overview'));
const CoursesSearch = lazy(() => import('./courses/search'));
const PolicyAndTerms = lazy(() => import('./policy-and-terms'));
const MyCourses = lazy(() => import('./courses/my'));
const NoMatch = lazy(() => import('./no-match'));

const AuthRoute = (props) => {
  const user = useUser();

  return user ? <Route {...props} /> : <Navigate to="/" />;
};

const UnauthRoute = (props) => {
  const user = useUser();

  return !user ? <Route {...props} /> : <Navigate to="/" />;
};

export default () => (
  <Routes>
    <Route path="/" element={<Homepage />} />
    <UnauthRoute path="signup" element={<Signup />} />
    <UnauthRoute path="signin" element={<Signin />} />
    <Route path="users">
      <Route path="/" element={<Navigate to="/" />} />
      <AuthRoute path="settings" element={<Settings />} />
      <Route path=":uid" element={<Profile />} />
    </Route>
    <Route path="courses">
      <Route path="/" element={<CoursesSearch />} />
      <Route path=":slug" element={<CourseOverview />} />
    </Route>
    <Route path="policy" element={<PolicyAndTerms />} />
    <Route path="terms" element={<PolicyAndTerms />} />
    <AuthRoute path="my-courses" element={<MyCourses />} />
    <Route path="*" element={<NoMatch />} />
  </Routes>
);
