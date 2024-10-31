import React from 'react';
import './App.css';
import {MainLayout} from './components/MainLayout';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Axios from "./pages/Axios";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ReactQuery from "./pages/ReactQuery";

function App() {
    const queryClient = new QueryClient(
        {
            defaultOptions: {
                queries: {
                    staleTime: 1000 * 60 * 5, // 5 minutes (cache invalidation time - how long to wait before refetching)
                },
            },
        }
    );

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path='axios' element={<Axios/>}/>
                        <Route path='react-query' element={<ReactQuery />}/>
                        <Route path='about' element={<About/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
