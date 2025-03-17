import {Route, Routes} from "react-router-dom";
import {AllTasks} from "./pages/AllTasks.tsx";
import {Header} from "./components/Header.tsx";
import {SingleTask} from "./pages/SingleTask.tsx";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<AllTasks/>}/>
                <Route path="/tasks/:id" element={<SingleTask/>}/>
            </Routes>
        </>
    );
}

export default App
