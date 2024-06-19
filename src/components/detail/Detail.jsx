import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css";

const Detail = () => {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
        useChatStore();
    const { currentUser } = useUserStore();

    const handleBlock = async () => {
        if (!user) return;

        const userDocRef = doc(db, "users", currentUser.id);

        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });
            changeBlock();
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogout = () => {
        auth.signOut();
        resetChat()
    };


    return (
        <div className="detail">
            <div className="user">
                <img src={user?.avatar || "./avatar.png"} alt="" />
                <h2>{user?.username}</h2>
                <p></p>
            </div>
            <div className="info">
                
                 <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://images.pexels.com/photos/18023668/pexels-photo-18023668/free-photo-of-close-up-of-blossoms-in-spring.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt=""
                                />
                                <span>photo.png</span>
                            </div>
                            
                            <img src="./download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://images.pexels.com/photos/2026960/pexels-photo-2026960.jpeg?auto=compress&cs=tinysrgb&w=600"
                                    alt=""
                                />
                                <span>photo.png</span>
                            </div>
                            
                            <img src="./download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://images.pexels.com/photos/3648977/pexels-photo-3648977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt=""
                                />
                                <span>photo.png</span>
                            </div>
                            
                            <img src="./download.png" alt="" className="icon" />
                        </div>
                    </div>
                </div> 
                
                <button onClick={handleBlock}>
                    {isCurrentUserBlocked
                        ? "You are Blocked!"
                        : isReceiverBlocked
                            ? "User blocked"
                            : "Block User"}
                </button>
                <button className="logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Detail;