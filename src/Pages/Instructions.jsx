// const Instructions = () => {
//     return ( 
//         <>
//             <h1>INSTRUCTIONS</h1>
//         </>
//      );
// }
 
// export default Instructions;/
import { useNavigate } from "react-router-dom";

const Instructions = () => {
    const navigate = useNavigate();

    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">INSTRUCTIONS</h1>
            <button 
                onClick={() => navigate("/questions")} 
                className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
                Go to Questions
            </button>
        </div>
    );
}

export default Instructions;