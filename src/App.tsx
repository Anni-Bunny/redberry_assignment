import {Route, Routes} from "react-router-dom";
import {AllTasks} from "./pages/AllTasks.tsx";
import {Header} from "./components/Header.tsx";
import {SingleTask} from "./pages/SingleTask.tsx";
import {CreateNewTask} from "./pages/CreateNewTask.tsx";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<AllTasks/>}/>
                <Route path="/tasks/:id" element={<SingleTask/>}/>
                <Route path="/createNewTask" element={<CreateNewTask/>}/>
            </Routes>
        </>
    );
}

export default App
