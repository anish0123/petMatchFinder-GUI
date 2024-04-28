import NavBar from "../components/NavBar";
import UpdateProfileForm from "../components/UpdateProfileForm";

const UpdateProfilePage = () => {
    return (
        <div className="w-screen h-screen grid grid-rows-8">
            <NavBar />
        <UpdateProfileForm />
        </div>
    );
}

export default UpdateProfilePage;