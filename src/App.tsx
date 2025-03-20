import {Route, Routes, useLocation} from "react-router-dom";
import {AllTasks} from "./pages/AllTasks.tsx";
import {Header} from "./components/Header.tsx";
import {SingleTask} from "./pages/SingleTask.tsx";
import {CreateNewTask} from "./pages/CreateNewTask.tsx";
import {setDefaultOptions} from 'date-fns/setDefaultOptions';
import {ka} from 'date-fns/locale';
import {useEffect, useState} from "react";

setDefaultOptions({locale: ka})

function App() {

    const [lastVisitedUrl, setLastVisitedUrl] = useState<string | null>(null);
    const location = useLocation();  // Access the current location (URL)

    // Update last visited URL whenever the location changes
    useEffect(() => {
        setLastVisitedUrl(location.pathname);
    }, [location]); // This effect will run every time the location changes

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<AllTasks lastVisitedUrl={lastVisitedUrl}/>}/>
                <Route path="/tasks/:id" element={<SingleTask/>}/>
                <Route path="/createNewTask" element={<CreateNewTask/>}/>
            </Routes>
        </>
    );
}

export default App
