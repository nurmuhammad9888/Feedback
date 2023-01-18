import { useContext } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import { Admin } from './pages/Admin/Admin';
import { CommitPage } from './pages/CommitPage/CommitPage';
import { Login } from './pages/Login/Login';
import {AddFeedback} from './pages/AddFeedback/AddFeedback';
import { PostPage } from './pages/PostPage/PostPage';
import { Register } from './pages/Register/Register';
import './styles.css';
import { EditFeedback } from './pages/EditFeedback/EditFeedback';
import { EditAdmin } from './pages/EditAdmin/EditAdmin';

function App() {
	const {token} = useContext(AuthContext);
	const navgates = useNavigate()
	if(token){
		// navgates(<PostPage/>)
			return(
			<Routes>
				<Route path="/" element={<Navigate to="/home/All" replace={true}/>}/>
				<Route path="/home/:id" element={<PostPage />} />
				<Route path="/commit/:id" element={<CommitPage />} />
				<Route path="/settings" element={<Admin />} />
				<Route path="/editAdmin" element={<EditAdmin />} />
				<Route path="/adminFeedback" element={<AddFeedback />} />
				<Route path="/editFeedback/:id" element={<EditFeedback />} />
			</Routes>
			)
	}else{
		// navgates(<Register/>)
		return(
			<Routes>
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			</Routes>
		)
	}
	
	// return (
	// 	<>
	// 		<div className="app">
	// 			<Routes>
	// 				<Route path="/register" element={<Register />} />
	// 				<Route path="/login" element={<Login />} />
	// 			</Routes>
	// 			<Routes>
	// 				<Route path="/" element={<PostPage />} />
	// 				<Route path="/commit/:id" element={<CommitPage />} />
	// 				<Route path="/settings" element={<Admin />} />
	// 				<Route path="/editAdmin" element={<EditAdmin />} />
	// 				<Route path="/adminFeedback" element={<AddFeedback />} />
	// 				<Route path="/editFeedback/:id" element={<EditFeedback />} />
	// 			</Routes>
	// 		</div>
	// 	</>
	// )

}

export default App;
