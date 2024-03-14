import GroupCard from "./GroupCard"

function Groups() {
    return (
        <div className="bg-white rounded-xl py-4">
            <h1 className="text-lg font-semibold mx-4 mb-2">Groups</h1>
            <GroupCard />
            <GroupCard />
        </div>
    )
}

export default Groups
