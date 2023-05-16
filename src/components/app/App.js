import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Spinner from "../spinner/spinner";
import SingleCharacterLayout from '../pages/singleCharacterLayout/SingleCharacterLayout';
import SingleComicLayout from "../pages/singleComicLayout/SingleComicLayout"

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
/* const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout')); */


const App = () => {

 
        return (
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Suspense fallback={<Spinner/>}>
                            <Routes>
                                <Route path="/" element={<MainPage/>}/>
                                <Route path="/comics" element={<ComicsPage/>}/>
                                <Route path="/comics/:comicId" element={<SingleComicLayout/>}/>
                                <Route path="/characters/:charId" element={<SingleCharacterLayout/>}/>
                                <Route path="*" element={<Page404/>}></Route>
                            </Routes>
                        </Suspense>
                    </main>
                </div>
            </Router>
        )
}

export default App;