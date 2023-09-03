import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

const Home = (props) => {
	return <h1>Welcome!</h1>;
};

const SimpleDestination = (props) => {
	const { route } = useParams();

	return <>{isNaN(route) ? <h2>The word is: {route}</h2> : <h2>The number is: {route}</h2>}</>;
};

const ComplexDestination = (props) => {
	const { route, textColor, bgColor } = useParams();

	return (
		<>
			{isNaN(route) ? (
				<h2 className="py-3" style={{ color: `${textColor}`, backgroundColor: `${bgColor}` }}>
					The word is: {route}
				</h2>
			) : (
				<h2 className="py-3" style={{ color: `${textColor}`, backgroundColor: `${bgColor}` }}>
					The number is: {route}
				</h2>
			)}
		</>
	);
};

function App() {
	const [route, setRoute] = useState("");
	const [textColor, setTextColor] = useState("");
	const [bgColor, setBgColor] = useState("");

	const splitRoute = () => {
		const splitRoute = route.split("/");
		setRoute(splitRoute[0]);
		setTextColor(splitRoute[1]);
		setBgColor(splitRoute[2]);
		const output = `/${route}/${textColor}/${bgColor}`;
		return output;
	};

	const navigate = useNavigate();

	const handleRoute = (e) => {
		e.preventDefault();

		if (!route.includes("/")) {
			navigate(`/${route}`);
			setRoute("");
		} else {
			console.log(splitRoute(route));

			navigate(splitRoute(route));
			setRoute("");
			setTextColor("");
			setBgColor("");
		}
	};

	useEffect(() => {
		navigate("/home");
	}, []);

	return (
		<div className="container mt-5 text-center">
			<div className="mb-3">
				<h4>Enter Route Path</h4>
				<form onSubmit={handleRoute}>
					<input type="text" value={route} onChange={(e) => setRoute(e.target.value)} />
					<button className="btn btn-primary ms-3">Submit</button>
				</form>
			</div>

			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/:route" element={<SimpleDestination />} />
				<Route path="/:route/:textColor/:bgColor" element={<ComplexDestination />} />
			</Routes>
		</div>
	);
}

export default App;
