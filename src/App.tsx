import {Route, Routes} from "react-router-dom";
import {AllTasks} from "./pages/AllTasks.tsx";
import {Header} from "./components/Header.tsx";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<AllTasks/>}/>
            </Routes>
        </>
    );
}

export default App
