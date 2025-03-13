import GenerateForm from "../components/GenerateForm";
import PlayerList from "../components/PlayerList";
import TeamList from "../components/TeamList";

const Home = () => {
    return (
        <div className="p-6">
            <h1 className="text-center text-3xl font-bold mb-5">Random Team Generator</h1>
            <div>
                <h1 className="text-2xl font-bold mb-5">Player Management</h1>
                <PlayerList />
            </div>

            <div>
                <h1 className="text-2xl font-bold mb-5 mt-5">Team Management</h1>
                <TeamList />
            </div>

            <div>
                <h1 className="text-2xl font-bold mb-5 mt-5">Generate Team</h1>
                <GenerateForm />
            </div>
        </div>
    );
};

export default Home;