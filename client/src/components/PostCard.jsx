
function PostCard() {
    return (
        <div className="bg-white p-6 shadow rounded-xl mb-4">
            <div className="flex items-center space-x-2">
                <img className="h-12 w-12 rounded-full mr-2" src="https://media.licdn.com/dms/image/D4D03AQEmLM1-sdclrg/profile-displayphoto-shrink_100_100/0/1686311935075?e=1715212800&v=beta&t=GScHG9iR2mPgwvLQIQNVhzc4TIpni14KY_eoLKWMB3c" alt="" />
                <div>
                    <h2 className="font-semibold text-md hover:underline cursor-pointer">Ninad Dhulap</h2>
                    <p className="text-gray-500 text-sm">7 hr</p>
                </div>
            </div>
            <div className="my-3">
                <div className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aut ut expedita laborum? Aut nostrum fuga optio dolores ratione vero suscipit incidunt eius voluptates omnis. Molestias ad tempore vel soluta.
                </div>
                <div className="post-img my-3 overflow-hidden">
                    <img className="rounded object-cover" src="https://media.licdn.com/dms/image/D5622AQGQks0CkLD-FA/feedshare-shrink_800/0/1709865411351?e=1712793600&v=beta&t=DKwkbeGg0cdob8v_VcxrX_4Wwx7qfg59aBaVhDo8Dew" alt="" />
                </div>
            </div>
            <div className="bottom-icons flex justify-between text-blue-800 px-8">
                <div className="likes">
                    <span className="material-symbols-outlined hover:text-blue-400 cursor-pointer">thumb_up</span>
                </div>
                <div className="comments">
                    <span className="material-symbols-outlined hover:text-blue-400 cursor-pointer">comment</span>
                </div>
                <div className="share">
                    <span className="material-symbols-outlined hover:text-blue-400 cursor-pointer">share</span>
                </div>
                


            </div>

        </div>
    )
}

export default PostCard
