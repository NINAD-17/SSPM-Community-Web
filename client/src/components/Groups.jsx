import GroupCard from "./GroupCard"

function Groups() {
    return (
        <div className="bg-white rounded-xl">
            <h1 className="text-lg font-semibold mx-4 py-2">Groups</h1>
            <GroupCard />
            <GroupCard />
        </div>
    )
}

export default Groups
